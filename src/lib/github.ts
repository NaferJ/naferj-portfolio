// Server-only GitHub access for the contribution graph.
// The token is read from process.env and never reaches the client bundle.
//
// Public-only daily counts come from GitHub's public contribution graph page,
// which is exactly what a logged-out visitor sees (the rolling "last year" view).
// This avoids the GraphQL contributionCalendar that mixes public and private.

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

const GITHUB_USERNAME = process.env.GITHUB_USERNAME ?? "NaferJ";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Revalidate the contribution data every six hours.
const REVALIDATE_SECONDS = 60 * 60 * 6;

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionDay = {
  date: string;
  count: number;
  level: ContributionLevel;
  weekday: number;
};

export type ContributionWeek = {
  days: ContributionDay[];
};

export type TopRepository = {
  name: string;
  fullName: string;
  url: string;
  description: string | null;
  stars: number;
  contributions: number;
  language: { name: string; color: string | null } | null;
  owner: { login: string; avatarUrl: string };
};

export type ContributionSummary = {
  login: string;
  total: number;
  year: number;
  yearLabel: string;
  weeks: ContributionWeek[];
  topRepositories: TopRepository[];
};

const LEVEL_THRESHOLDS = [0, 1, 4, 8, 12] as const;

function levelFor(count: number): ContributionLevel {
  if (count >= LEVEL_THRESHOLDS[4]) return 4;
  if (count >= LEVEL_THRESHOLDS[3]) return 3;
  if (count >= LEVEL_THRESHOLDS[2]) return 2;
  if (count >= LEVEL_THRESHOLDS[1]) return 1;
  return 0;
}

const REPOSITORY_FIELDS = /* GraphQL */ `
  name
  nameWithOwner
  url
  description
  isPrivate
  stargazerCount
  primaryLanguage {
    name
    color
  }
  owner {
    login
    avatarUrl
  }
`;

const TOP_REPOSITORIES_QUERY = /* GraphQL */ `
  query ($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      login
      contributionsCollection(from: $from, to: $to) {
        commitContributionsByRepository(maxRepositories: 100) {
          repository { ${REPOSITORY_FIELDS} }
          contributions { totalCount }
        }
        pullRequestContributionsByRepository(maxRepositories: 100) {
          repository { ${REPOSITORY_FIELDS} }
          contributions { totalCount }
        }
        pullRequestReviewContributionsByRepository(maxRepositories: 100) {
          repository { ${REPOSITORY_FIELDS} }
          contributions { totalCount }
        }
        issueContributionsByRepository(maxRepositories: 100) {
          repository { ${REPOSITORY_FIELDS} }
          contributions { totalCount }
        }
      }
    }
  }
`;

type RawRepository = {
  name: string;
  nameWithOwner: string;
  url: string;
  description: string | null;
  isPrivate: boolean;
  stargazerCount: number;
  primaryLanguage: { name: string; color: string | null } | null;
  owner: { login: string; avatarUrl: string };
};

type ContributionsByRepository = {
  repository: RawRepository;
  contributions: { totalCount: number };
};

type TopRepositoriesResponse = {
  data?: {
    user?: {
      login: string;
      contributionsCollection: {
        commitContributionsByRepository: ContributionsByRepository[];
        pullRequestContributionsByRepository: ContributionsByRepository[];
        pullRequestReviewContributionsByRepository: ContributionsByRepository[];
        issueContributionsByRepository: ContributionsByRepository[];
      };
    };
  };
  errors?: Array<{ message: string }>;
};

const DAY_MS = 86_400_000;

// Matches a contribution graph cell and the adjacent tooltip.
// Example:
// <td ... data-date="2025-09-07" ...></td>
// <tool-tip ...>No contributions on September 7th.</tool-tip>
//
// Or with a count:
// <tool-tip ...>15 contributions on September 14th.</tool-tip>
// "1 contribution" (singular) is also supported.
const CELL_REGEX =
  /<td\b[^>]*data-date="([^"]+)"[^>]*>[\s\S]*?<\/td>\s*<tool-tip[^>]*>(?:No contributions|(\d+) contributions?) on[^<]*<\/tool-tip>/g;

const RANGE_REGEX =
  /data-from="(\d{4}-\d{2}-\d{2}) \d{2}:\d{2}:\d{2} UTC"\s+data-to="(\d{4}-\d{2}-\d{2}) \d{2}:\d{2}:\d{2} UTC"/;

function toIsoDateString(date: string, endOfDay = false): string {
  return `${date}T${endOfDay ? "23:59:59.999" : "00:00:00.000"}Z`;
}

async function fetchPublicContributionCalendar(
  username: string,
): Promise<{ dailyCounts: Map<string, number>; total: number; from: string; to: string } | null> {
  const url = `https://github.com/users/${username}/contributions`;

  let response: Response;
  try {
    response = await fetch(url, {
      headers: {
        "Accept-Language": "en-US,en;q=0.9",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(8000),
    });
  } catch {
    return null;
  }

  if (!response.ok) return null;

  const html = await response.text();

  const rangeMatch = RANGE_REGEX.exec(html);
  if (!rangeMatch) return null;

  const from = rangeMatch[1];
  const to = rangeMatch[2];

  const dailyCounts = new Map<string, number>();
  let total = 0;

  let match: RegExpExecArray | null;
  while ((match = CELL_REGEX.exec(html)) !== null) {
    const date = match[1];
    const count = match[2] ? Number.parseInt(match[2], 10) : 0;

    dailyCounts.set(date, count);
    total += count;
  }

  if (dailyCounts.size === 0) return null;

  return { dailyCounts, total, from, to };
}

async function fetchTopRepositories(
  username: string,
  from: string,
  to: string,
): Promise<TopRepository[] | null> {
  if (!GITHUB_TOKEN) return null;

  const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: TOP_REPOSITORIES_QUERY,
      variables: {
        login: username,
        from: toIsoDateString(from),
        to: toIsoDateString(to, true),
      },
    }),
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) return null;

  const payload = (await response.json()) as TopRepositoriesResponse;

  if (payload.errors || !payload.data?.user) return null;

  const collection = payload.data.user.contributionsCollection;
  const repositoryMap = new Map<
    string,
    { repository: RawRepository; contributions: number }
  >();

  const addNodes = (nodes: ContributionsByRepository[]) => {
    for (const node of nodes) {
      if (node.repository.isPrivate) continue;

      const existing = repositoryMap.get(node.repository.nameWithOwner);
      if (existing) {
        existing.contributions += node.contributions.totalCount;
      } else {
        repositoryMap.set(node.repository.nameWithOwner, {
          repository: node.repository,
          contributions: node.contributions.totalCount,
        });
      }
    }
  };

  addNodes(collection.commitContributionsByRepository);
  addNodes(collection.pullRequestContributionsByRepository);
  addNodes(collection.pullRequestReviewContributionsByRepository);
  addNodes(collection.issueContributionsByRepository);

  return Array.from(repositoryMap.values())
    .sort((a, b) => b.contributions - a.contributions)
    .slice(0, 5)
    .map(({ repository, contributions }) => ({
      name: repository.name,
      fullName: repository.nameWithOwner,
      url: repository.url,
      description: repository.description,
      stars: repository.stargazerCount,
      contributions,
      language: repository.primaryLanguage
        ? {
            name: repository.primaryLanguage.name,
            color: repository.primaryLanguage.color,
          }
        : null,
      owner: {
        login: repository.owner.login,
        avatarUrl: repository.owner.avatarUrl,
      },
    }));
}

export async function getContributions(): Promise<ContributionSummary | null> {
  const calendar = await fetchPublicContributionCalendar(GITHUB_USERNAME).catch(() => null);
  if (!calendar) return null;

  const topRepositories = (await fetchTopRepositories(
    GITHUB_USERNAME,
    calendar.from,
    calendar.to,
  ).catch(() => null)) ?? [];

  const firstDay = new Date(`${calendar.from}T00:00:00.000Z`);
  const firstWeekday = firstDay.getUTCDay();
  const firstSunday = new Date(firstDay.getTime() - firstWeekday * DAY_MS);

  // Build all 53 weeks so the total covers the full rolling year,
  // but only display the current calendar year (Jan 1 → today).
  const endYear = Number.parseInt(calendar.to.slice(0, 4), 10);
  const jan1 = new Date(Date.UTC(endYear, 0, 1));
  const jan1Weekday = jan1.getUTCDay();
  const firstShownSunday = new Date(jan1.getTime() - jan1Weekday * DAY_MS);

  const startOffsetDays = Math.round(
    (firstShownSunday.getTime() - firstSunday.getTime()) / DAY_MS,
  );
  const startWeekIndex = Math.floor(startOffsetDays / 7);
  const endDate = new Date();
  endDate.setUTCHours(23, 59, 59, 999);

  const weeks: ContributionWeek[] = [];
  for (let weekIndex = startWeekIndex; weekIndex < 53; weekIndex++) {
    const days: ContributionDay[] = [];
    for (let weekday = 0; weekday < 7; weekday++) {
      const date = new Date(
        firstSunday.getTime() + (weekIndex * 7 + weekday) * DAY_MS,
      );
      if (date > endDate) break;
      const dateString = date.toISOString().slice(0, 10);
      const count = calendar.dailyCounts.get(dateString) ?? 0;
      days.push({
        date: dateString,
        count,
        level: levelFor(count),
        weekday,
      });
    }
    if (days.length === 0) break;
    weeks.push({ days });
  }

  return {
    login: GITHUB_USERNAME,
    total: calendar.total,
    year: endYear,
    yearLabel: "the last year",
    weeks,
    topRepositories,
  };
}

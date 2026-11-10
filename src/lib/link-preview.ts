export type LinkDescription = { domain: string } & (
  | { kind: "pullRequest"; repo: string; number: string }
  | { kind: "issue"; repo: string; number: string }
  | { kind: "compare"; repo: string; range: string }
  | { kind: "repository"; repo: string }
  | { kind: "external" }
);

function describeGitHub(domain: string, segments: string[]): LinkDescription | undefined {
  if (domain !== "github.com") return undefined;
  const [owner, name, section, ...rest] = segments;
  if (!owner || !name) return undefined;
  const repo = `${owner}/${name}`;
  const value = rest.join("/");
  if (section === "pull" && value) return { domain, kind: "pullRequest", repo, number: value };
  if (section === "issues" && value) return { domain, kind: "issue", repo, number: value };
  if (section === "compare" && value) return { domain, kind: "compare", repo, range: value };
  if (!section) return { domain, kind: "repository", repo };
  return undefined;
}

export function describeLink(href: string): LinkDescription {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return { domain: "", kind: "external" };
  }
  const domain = url.hostname.replace(/^www\./, "");
  const segments = url.pathname.split("/").filter(Boolean);
  const github = describeGitHub(domain, segments);
  if (github) return github;
  const path = segments.length > 0 ? `/${segments.join("/")}` : "";
  return { domain: domain + path, kind: "external" };
}

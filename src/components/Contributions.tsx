import { getTranslations } from "next-intl/server";
import { unstable_cache } from "next/cache";
import { getContributions, getTopRepositories } from "@/lib/github";
import type { ContributionSummary, TopRepository } from "@/lib/github";
import { TopContributionsPanel } from "@/components/TopContributionsPanel";
import { HeatmapClient } from "@/components/HeatmapClient";
import { site } from "@/data/site";

const cachedGetContributions = unstable_cache(
  async () => {
    const data = await getContributions();
    if (!data) throw new Error("Contributions unavailable");
    return data;
  },
  ["github-contributions-v2"],
  { revalidate: 60 * 60 * 6 },
);

async function getCachedContributions(): Promise<ContributionSummary | null> {
  try {
    return await cachedGetContributions();
  } catch {
    return null;
  }
}

const cachedGetTopRepositories = unstable_cache(
  async (login: string, from: string, to: string) => {
    const repositories = await getTopRepositories(login, from, to);
    if (!repositories) throw new Error("Top repositories unavailable");
    return repositories;
  },
  ["github-top-repositories"],
  { revalidate: 60 * 60 * 6 },
);

async function getCachedTopRepositories(
  login: string,
  from: string,
  to: string,
): Promise<TopRepository[] | null> {
  try {
    return await cachedGetTopRepositories(login, from, to);
  } catch {
    return null;
  }
}

export async function Contributions() {
  const data = await getCachedContributions();
  const repositories = data
    ? await getCachedTopRepositories(data.login, data.from, data.to)
    : null;
  const t = await getTranslations("contributions");

  return (
    <section id="contributions" aria-labelledby="contributions-heading">
      <div className="rounded-2xl border border-rail bg-[#111111] p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 id="contributions-heading" className="text-xs font-medium text-neutral-300">{data ? t("contributionsIn", { count: new Intl.NumberFormat("en-US").format(data.total), year: data.yearLabel }) : t("onGitHub")}</h2>
          <a href={data ? `https://github.com/${data.login}` : site.github} target="_blank" rel="noopener noreferrer" className="text-[11px] text-muted-foreground transition-colors duration-200 ease-out hover:text-foreground">{t("viewProfile")} <span aria-hidden="true">↗</span></a>
        </div>
        {data ? (
          <>
            <HeatmapClient weeks={data.weeks} total={data.total} />
            <div className="mt-3 flex items-center justify-between gap-4 text-[10px] text-muted-foreground">
              <span>{t("activity", { year: data.year })}</span>
              <div aria-label="Contribution intensity from less to more" className="flex items-center gap-1.5"><span className="mr-1">{t("less")}</span>{[0.08, 0.3, 0.52, 0.76, 1].map((opacity) => <span key={opacity} aria-hidden="true" className="size-2 rounded-xs bg-highlight" style={{ opacity }} />)}<span className="ml-1">{t("more")}</span></div>
            </div>
            <TopContributionsPanel repositories={repositories} />
          </>
        ) : <p className="text-xs leading-6 text-muted-foreground">{t("fallback")}</p>}
      </div>
    </section>
  );
}

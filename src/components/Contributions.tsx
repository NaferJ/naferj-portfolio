import { getTranslations } from "next-intl/server";
import { getContributions } from "@/lib/github";
import { TopContributionsPanel } from "@/components/TopContributionsPanel";
import { HeatmapClient } from "@/components/HeatmapClient";
import { site } from "@/data/site";

export async function Contributions() {
  const data = await getContributions();
  const t = await getTranslations("contributions");

  return (
    <section id="contributions" aria-labelledby="contributions-heading">
      <div className="rounded-2xl border border-rail bg-[#111111] p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 id="contributions-heading" className="text-xs font-medium text-neutral-300">{data ? t("contributionsIn", { count: new Intl.NumberFormat("en-US").format(data.total), year: data.yearLabel }) : t("onGitHub")}</h2>
          <a href={data ? `https://github.com/${data.login}` : site.github} target="_blank" rel="noopener noreferrer" className="text-[11px] text-muted-foreground hover:text-foreground">{t("viewProfile")} <span aria-hidden="true">↗</span></a>
        </div>
        {data ? (
          <>
            <HeatmapClient weeks={data.weeks} total={data.total} />
            <div className="mt-3 flex items-center justify-between gap-4 text-[10px] text-muted-foreground">
              <span>{t("activity", { year: data.year })}</span>
              <div aria-label="Contribution intensity from less to more" className="flex items-center gap-1.5"><span className="mr-1">{t("less")}</span>{[0.08, 0.3, 0.52, 0.76, 1].map((opacity) => <span key={opacity} aria-hidden="true" className="size-2 rounded-xs bg-highlight" style={{ opacity }} />)}<span className="ml-1">{t("more")}</span></div>
            </div>
            {data.topRepositories.length ? <TopContributionsPanel repositories={data.topRepositories} /> : null}
          </>
        ) : <p className="text-xs leading-6 text-muted-foreground">{t("fallback")}</p>}
      </div>
    </section>
  );
}

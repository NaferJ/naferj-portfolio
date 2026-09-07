import { getContributions } from "@/lib/github";
import { TopContributionsPanel } from "@/components/TopContributionsPanel";
import { HeatmapClient } from "@/components/HeatmapClient";

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export async function Contributions() {
  const data = await getContributions();

  if (!data) {
    return (
      <p className="rounded-md border border-white/[0.08] bg-white/[0.02] px-4 py-6 text-sm text-neutral-600">
        Contribution activity is unavailable right now.
      </p>
    );
  }

  return (
    <section>
      <div className="relative max-w-full overflow-hidden rounded-[28px] bg-black p-6 pb-[76px]">
        <p className="mb-4 px-1.5 text-base font-medium text-neutral-200">
          {formatNumber(data.total)} contributions in {data.yearLabel}
        </p>

        <HeatmapClient weeks={data.weeks} total={data.total} />

        <TopContributionsPanel repositories={data.topRepositories} />
      </div>
    </section>
  );
}

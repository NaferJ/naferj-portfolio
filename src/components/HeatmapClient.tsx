"use client";

import { useEffect, useRef, useState } from "react";
import type { ContributionDay, ContributionSummary } from "@/lib/github";

const OPACITY_FOR_LEVEL = { 0: 0.08, 1: 0.3, 2: 0.52, 3: 0.76, 4: 1 } as const;

function describe(day: ContributionDay): string {
  const date = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${day.date}T00:00:00Z`));
  return `${day.count} contribution${day.count === 1 ? "" : "s"} on ${date}`;
}

export function HeatmapClient({ weeks, total }: Readonly<{ weeks: ContributionSummary["weeks"]; total: number }>) {
  const days = weeks.flatMap((week) => week.days);
  const [activeDate, setActiveDate] = useState(days.at(-1)?.date);
  const [selected, setSelected] = useState<ContributionDay | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const buttons = useRef(new Map<string, HTMLButtonElement>());

  useEffect(() => {
    if (scroller.current) scroller.current.scrollLeft = scroller.current.scrollWidth;
  }, []);

  function navigate(event: React.KeyboardEvent<HTMLButtonElement>, day: ContributionDay) {
    const index = days.findIndex((item) => item.date === day.date);
    const destinations: Record<string, number> = { ArrowLeft: index - 7, ArrowRight: index + 7, ArrowUp: index - 1, ArrowDown: index + 1, Home: 0, End: days.length - 1 };
    if (!(event.key in destinations)) return;
    event.preventDefault();
    const next = days[Math.max(0, Math.min(days.length - 1, destinations[event.key]))];
    if (next) buttons.current.get(next.date)?.focus();
  }

  return (
    <section aria-label={`Contribution activity; ${total} contributions in the last year`}>
      <p id="heatmap-instructions" className="sr-only">Use arrow keys to explore daily activity. Home and End jump to the first and last day.</p>
      <div ref={scroller} className="overflow-x-auto py-1" onMouseLeave={() => setSelected(null)}>
        <div className="flex min-w-max w-full gap-[3px]">
          {weeks.map((week, index) => (
            <div key={week.days[0]?.date ?? index} className="flex flex-1 flex-col gap-[3px]">
              {week.days.map((day) => (
                <button key={day.date} ref={(node) => { if (node) buttons.current.set(day.date, node); else buttons.current.delete(day.date); }} type="button" tabIndex={day.date === activeDate ? 0 : -1} aria-label={describe(day)} aria-describedby="heatmap-instructions" title={describe(day)} onFocus={() => { setActiveDate(day.date); setSelected(day); }} onBlur={() => setSelected(null)} onMouseEnter={() => setSelected(day)} onClick={() => setSelected(day)} onKeyDown={(event) => navigate(event, day)} className="aspect-square w-full rounded-[2px] bg-highlight" style={{ opacity: OPACITY_FOR_LEVEL[day.level] }} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <p aria-hidden="true" className="mt-2 min-h-4 text-[10px] text-muted-foreground">{selected ? describe(selected) : "Hover, tap, or use the arrow keys to explore."}</p>
    </section>
  );
}

"use client";

import { useState, useCallback } from "react";
import type { ContributionDay, ContributionSummary } from "@/lib/github";

const OPACITY_FOR_LEVEL = {
  0: 0,
  1: 0.3,
  2: 0.52,
  3: 0.76,
  4: 1,
} as const;

const CELL_SIZE = 11.8;
const CELL_GAP = 3;

type TooltipState = {
  visible: boolean;
  x: number;
  y: number;
  content: string;
};

export function HeatmapClient({
  weeks,
  total,
}: {
  weeks: ContributionSummary["weeks"];
  total: number;
}) {
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    content: "",
  });

  const show = useCallback(
    (event: React.MouseEvent, day: ContributionDay) => {
      setTooltip({
        visible: true,
        x: event.clientX,
        y: event.clientY,
        content: `${day.count} contribution${
          day.count === 1 ? "" : "s"
        } on ${formatDate(day.date)}`,
      });
    },
    [],
  );

  const move = useCallback((event: React.MouseEvent) => {
    setTooltip((prev) => ({
      ...prev,
      x: event.clientX,
      y: event.clientY,
    }));
  }, []);

  const hide = useCallback(() => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  }, []);

  return (
    <div
      className="relative w-full"
      role="img"
      aria-label={`${total} contributions`}
    >
      <div
        className="flex justify-end overflow-hidden"
        style={{ gap: CELL_GAP }}
      >
        {weeks.map((week, weekIndex) => (
          <div
            key={week.days[0]?.date ?? weekIndex}
            className="flex flex-col"
            style={{ gap: CELL_GAP }}
          >
            {week.days.map((day) => (
              <button
                key={day.date}
                type="button"
                className="shrink-0 rounded-[3px] bg-white/[0.08]"
                style={{ width: CELL_SIZE, height: CELL_SIZE }}
                onMouseEnter={(event) => show(event, day)}
                onMouseMove={move}
                onMouseLeave={hide}
                aria-label={`${day.count} contribution${
                  day.count === 1 ? "" : "s"
                } on ${formatDate(day.date)}`}
              >
                <div
                  className="h-full w-full rounded-[3px] bg-white"
                  style={{ opacity: OPACITY_FOR_LEVEL[day.level] }}
                />
              </button>
            ))}
          </div>
        ))}
      </div>

      {tooltip.visible ? (
        <div
          className="fixed z-50 rounded-md bg-white px-2 py-1 text-xs font-medium text-black shadow-lg"
          style={{
            left: tooltip.x + 10,
            top: tooltip.y - 34,
            pointerEvents: "none",
          }}
        >
          {tooltip.content}
        </div>
      ) : null}
    </div>
  );
}

function formatDate(date: string): string {
  const parsed = new Date(date);
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

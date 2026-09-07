"use client";

import { useState } from "react";
import Image from "next/image";
import type { TopRepository } from "@/lib/github";

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

type TopContributionsPanelProps = {
  repositories: TopRepository[];
};

export function TopContributionsPanel({
  repositories,
}: TopContributionsPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      id="top-contributions-panel"
      className="absolute inset-x-3 bottom-3 overflow-hidden rounded-[18px] bg-[#0d1117]/90 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <span className="truncate text-sm text-neutral-200">
          Top contributions in:
        </span>
        <div className="flex items-center gap-3">
          {repositories[0] ? (
            <span className="grid size-7 shrink-0 place-items-center overflow-hidden rounded-full bg-neutral-800 ring-2 ring-[#0d1117]">
              <Image
                src={repositories[0].owner.avatarUrl}
                alt=""
                width={28}
                height={28}
                className="size-full object-cover"
                unoptimized
              />
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-controls="top-contributions-panel"
            aria-label={open ? "Hide top repositories" : "Show top repositories"}
            className="grid size-7 shrink-0 place-items-center rounded-full bg-[#0d1117] transition-colors hover:bg-[#1c1c1c] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className={`size-7 text-[#3E4346] transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m16 10-4 4-4-4" />
            </svg>
          </button>
        </div>
      </div>

      <ul
        className={`divide-y divide-white/[0.06] transition-all duration-300 ease-in-out scrollbar-hide ${
          open
            ? "max-h-[160px] overflow-y-auto opacity-100"
            : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        {repositories.map((repository) => (
          <li key={repository.url}>
            <a
              className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
              href={repository.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="grid size-7 shrink-0 place-items-center overflow-hidden rounded-full bg-neutral-800 ring-2 ring-[#0d1117]">
                <Image
                  src={repository.owner.avatarUrl}
                  alt=""
                  width={28}
                  height={28}
                  className="size-full object-cover"
                  unoptimized
                />
              </span>
              <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-neutral-200 group-hover:text-white">
                    {repository.name}
                  </p>
                  {repository.language ? (
                    <p className="text-xs text-neutral-500">
                      {repository.language.name}
                    </p>
                  ) : null}
                </div>
                <span className="shrink-0 text-sm font-medium text-neutral-300">
                  {formatNumber(repository.contributions)}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

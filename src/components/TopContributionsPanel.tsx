"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/Icon";
import type { TopRepository } from "@/lib/github";

export function TopContributionsPanel({ repositories }: Readonly<{ repositories: TopRepository[] | null }>) {
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("contributions");

  useEffect(() => {
    if (!contentRef.current) return;
    if (open) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [open]);

  return (
    <div className="mt-4 rounded-xl border border-rail bg-muted">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="top-contributions-content"
        className="flex min-h-11 w-full list-none items-center justify-between gap-3 rounded-xl px-4 py-3 text-xs text-neutral-300"
      >
        <span>{t("topRepositories")} {repositories !== null ? <span className="ml-1 text-muted-foreground">({repositories.length})</span> : null}</span>
        <Icon name="chevron" className={`size-4 text-muted-foreground transition-transform duration-200 ease-out ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        id="top-contributions-content"
        aria-hidden={!open}
        inert={!open}
        className="overflow-hidden transition-[height] duration-200 ease-out"
        style={{ height: `${height}px` }}
      >
        <div ref={contentRef}>
          {repositories === null || repositories.length === 0 ? (
            <p className="border-t border-rail px-4 py-3 text-xs text-muted-foreground">
              {repositories === null ? t("repositoriesUnavailable") : t("noRepositories")}
            </p>
          ) : (
            <ul className="divide-y divide-rail border-t border-rail">
              {repositories.map((repository) => (
                <li key={repository.url}>
                  <a className="flex items-center gap-3 px-4 py-3 transition-colors duration-200 ease-out hover:bg-accent" href={repository.url} target="_blank" rel="noopener noreferrer">
                    <Image src={repository.owner.avatarUrl} alt="" width={24} height={24} className="size-6 shrink-0 rounded-md" unoptimized />
                    <div className="min-w-0 flex-1"><p className="truncate text-xs text-neutral-200">{repository.name}</p>{repository.language ? <p className="mt-1 text-[10px] text-muted-foreground">{repository.language.name}</p> : null}</div>
                    <span className="shrink-0 text-xs text-neutral-400" aria-label={`${repository.contributions} contributions`}>{new Intl.NumberFormat("en-US").format(repository.contributions)}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

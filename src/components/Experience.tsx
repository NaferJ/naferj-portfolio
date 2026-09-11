"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { getExperience } from "@/data/experience";

export function Experience() {
  const t = useTranslations("experience");
  const locale = useLocale();
  const experience = getExperience(locale);

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-16"
    >
      <h1 id="experience-heading" className="page-title">
        {t("title")}
      </h1>
      <p className="mt-2 text-[15px] leading-7 text-neutral-400">
        {t("description")}
      </p>

      <ul className="-mx-3 mt-8 flex flex-col gap-4 sm:gap-5">
        {experience.map((item) => {
          const content = (
            <>
              <Image
                src={item.logo}
                alt=""
                width={28}
                height={28}
                className="size-7 shrink-0 rounded-full"
              />
              <div className="min-w-0 flex-1">
                <div className="grid grid-cols-[minmax(0,auto)_minmax(1rem,1fr)_auto] items-center gap-2 sm:grid-cols-[auto_1fr_auto] sm:gap-3">
                  <h3 className="truncate text-base font-normal tracking-tight text-neutral-100">
                    {item.company}
                  </h3>
                  <span
                    className="block min-w-4 border-t border-white/[0.12] transition-colors group-hover:border-white/[0.2]"
                    aria-hidden="true"
                  />
                  <span className="flex items-center gap-1.5 whitespace-nowrap text-xs tabular-nums text-neutral-500">
                    {item.period}
                    <span
                      aria-hidden="true"
                      className="opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                    >
                      ↗
                    </span>
                  </span>
                </div>

                <ul className="mt-3 flex flex-col gap-2 sm:mt-2 sm:gap-1.5">
                  {item.roles.map((role) => (
                    <li
                      key={`${item.company}-${role.role}`}
                      className="flex flex-col justify-between gap-x-4 text-sm leading-6 sm:flex-row"
                    >
                      <span className="text-neutral-300/90">{role.role}</span>
                      <span className="shrink-0 text-xs tabular-nums text-neutral-500">
                        {role.period}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          );

          return (
            <li key={item.company}>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${item.company}`}
                  className="group flex cursor-pointer items-start gap-3 rounded-xl px-3 py-2 transition-colors duration-200 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
                >
                  {content}
                </a>
              ) : (
                <div className="flex items-start gap-3 rounded-xl px-3 py-2">
                  {content}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

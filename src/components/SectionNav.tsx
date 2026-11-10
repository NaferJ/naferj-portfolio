"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLayoutEffect, useRef } from "react";
import { MotionIcon } from "@/components/MotionIcon";
import { SocialLinks } from "@/components/SocialLinks";
import { site } from "@/data/site";

export function SectionNav({ locale }: Readonly<{ locale: string }>) {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const otherLocale = locale === "en" ? "es" : "en";
  const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`);
  const listRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLLIElement>(null);
  const measured = useRef(false);

  useLayoutEffect(() => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    if (!list || !indicator) return;
    const update = () => {
      const active = list.querySelector<HTMLElement>("a[aria-current='page']");
      if (!active) {
        indicator.style.opacity = "0";
        return;
      }
      indicator.style.opacity = "1";
      indicator.style.transform = `translate(${active.offsetLeft}px, ${active.offsetTop}px)`;
      indicator.style.width = `${active.offsetWidth}px`;
      indicator.style.height = `${active.offsetHeight}px`;
      if (!measured.current) {
        measured.current = true;
        requestAnimationFrame(() => indicator.classList.add("nav-indicator-ready"));
      }
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(list);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-rail bg-background/75 backdrop-blur-md lg:static lg:z-auto lg:border-r lg:border-b-0 lg:bg-transparent lg:backdrop-blur-none">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-4 sm:gap-4 sm:px-8 lg:sticky lg:top-0 lg:h-dvh lg:flex-col lg:flex-nowrap lg:justify-start lg:px-3 lg:py-8">
        <nav aria-label="Primary navigation" className="lg:mt-2 lg:w-full">
          <ul ref={listRef} className="relative flex flex-wrap items-center gap-1 lg:flex-col lg:gap-4">
            <li ref={indicatorRef} aria-hidden="true" className="nav-indicator pointer-events-none absolute left-0 top-0 opacity-0">
              <span className="absolute inset-0 rounded-lg bg-muted" />
              <span className="absolute -left-3 top-1/2 hidden h-5 w-px -translate-y-1/2 bg-highlight lg:block" />
            </li>
            {site.navigation.map((link) => {
              const href = `/${locale}${link.href === "/" ? "" : link.href}`;
              const active = link.href === "/" ? pathname === `/${locale}` || pathname === `/${locale}/` : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <li key={link.href} className="lg:w-full">
                  <Link href={href} aria-current={active ? "page" : undefined} className={`motion-trigger relative flex min-h-11 items-center justify-center gap-2 rounded-lg px-2 text-xs transition-colors duration-200 ease-out sm:px-2.5 lg:flex-col lg:gap-1.5 lg:px-1 lg:py-3 lg:text-2xs ${active ? "text-foreground" : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"}`}>
                    <MotionIcon name={link.icon} className="hidden size-5 sm:block" />
                    <span>{t(link.label)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-1 lg:ml-0 lg:mt-auto lg:flex-col lg:gap-2">
          <span aria-hidden="true" className="hidden h-px w-8 bg-rail lg:mb-1 lg:block" />
          <Link
            href={newPath}
            hrefLang={otherLocale}
            className="motion-trigger flex min-h-11 min-w-11 flex-row items-center justify-center gap-1.5 rounded-lg px-2 text-muted-foreground transition-colors duration-200 ease-out hover:bg-muted/40 hover:text-foreground lg:flex-col lg:gap-0.5 lg:px-1 lg:py-3"
            aria-label={t("switchLanguage")}
          >
            <MotionIcon name="globe" className="size-4 lg:size-5" />
            <span lang={otherLocale} className="text-xs lg:text-2xs">{otherLocale.toLocaleUpperCase(otherLocale)}</span>
          </Link>
          <SocialLinks className="hidden lg:flex lg:flex-col lg:items-center lg:gap-2" />
        </div>
      </div>
    </header>
  );
}

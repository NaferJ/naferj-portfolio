"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/Icon";
import { site } from "@/data/site";

export function SectionNav({ locale }: { locale: string }) {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const otherLocale = locale === "en" ? "es" : "en";
  const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <header className="border-b border-rail lg:border-r lg:border-b-0">
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:sticky lg:top-0 lg:h-dvh lg:flex-col lg:flex-nowrap lg:justify-start lg:px-3 lg:py-8">
        <nav aria-label="Primary navigation" className="lg:mt-2 lg:w-full">
          <ul className="flex flex-wrap items-center gap-1 lg:flex-col lg:gap-4">
            {site.navigation.map((link) => {
              const href = `/${locale}${link.href ? `/${link.href}` : ""}`;
              const active = link.href === "" ? pathname === `/${locale}` || pathname === `/${locale}/` : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <li key={link.href} className="lg:w-full">
                  <Link href={href} aria-current={active ? "page" : undefined} className={`relative flex min-h-11 items-center justify-center gap-2 rounded-lg px-2.5 text-xs transition-colors lg:flex-col lg:gap-1.5 lg:px-1 lg:py-3 lg:text-[10px] ${active ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                    <Icon name={link.icon} className="hidden size-[18px] sm:block" />
                    <span>{t(link.label)}</span>
                    {active ? <span aria-hidden="true" className="absolute -left-3 hidden h-5 w-px bg-highlight lg:block" /> : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-1 lg:mt-auto lg:flex-col lg:gap-2">
          <Link
            href={newPath}
            className="hidden size-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:flex"
            aria-label={`Switch to ${otherLocale === "es" ? "Spanish" : "English"}`}
          >
            <Icon name="globe" className="size-5" />
          </Link>
          <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label={`${site.name} on GitHub (opens in a new tab)`} className="hidden size-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:flex"><Icon name="github" className="size-5" /></a>
          <a href={site.twitter} target="_blank" rel="noopener noreferrer" aria-label={`${site.name} on X (opens in a new tab)`} className="hidden size-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:flex"><Icon name="twitter" className="size-5" /></a>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${site.name} on Instagram (opens in a new tab)`} className="hidden size-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:flex"><Icon name="instagram" className="size-5" /></a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${site.name} on LinkedIn (opens in a new tab)`} className="hidden size-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:flex"><Icon name="linkedin" className="size-5" /></a>
          <a href={site.coffee} target="_blank" rel="noopener noreferrer" aria-label={`Support ${site.name} (opens in a new tab)`} className="hidden size-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:flex"><Icon name="coffee" className="size-5" /></a>
        </div>
      </div>
    </header>
  );
}

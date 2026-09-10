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
          <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label={`${site.name} on GitHub (opens in a new tab)`} className="hidden size-11 items-center justify-center rounded-lg text-neutral-300 transition-colors hover:bg-muted hover:text-white lg:flex"><Icon name="github" className="size-5" /></a>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${site.name} on Instagram (opens in a new tab)`} className="hidden size-11 items-center justify-center rounded-lg transition-colors hover:bg-muted lg:flex">
            <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24">
              <defs>
                <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FEDA77" />
                  <stop offset="25%" stopColor="#FA7E1E" />
                  <stop offset="50%" stopColor="#D62976" />
                  <stop offset="75%" stopColor="#962FBF" />
                  <stop offset="100%" stopColor="#4F5BD5" />
                </linearGradient>
              </defs>
              <path fill="url(#instagram-gradient)" d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.12 1.38C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.12.66.66 1.33 1.07 2.12 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.86 5.86 0 0 0 2.12-1.38 5.86 5.86 0 0 0 1.38-2.12c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.38-2.12A5.86 5.86 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84M12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4m6.41-11.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44" />
            </svg>
          </a>
          <a href={site.twitter} target="_blank" rel="noopener noreferrer" aria-label={`${site.name} on Twitter (opens in a new tab)`} className="hidden size-11 items-center justify-center rounded-lg text-neutral-300 transition-colors hover:bg-muted hover:text-white lg:flex"><Icon name="twitter" className="size-5" /></a>
          <a href={site.coffee} target="_blank" rel="noopener noreferrer" aria-label={`Support ${site.name} (opens in a new tab)`} className="hidden size-11 items-center justify-center rounded-lg text-[#F16061] transition-colors hover:bg-muted lg:flex"><Icon name="coffee" className="size-5" /></a>
        </div>
      </div>
    </header>
  );
}

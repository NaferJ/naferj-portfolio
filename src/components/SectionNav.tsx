"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/Icon";
import { site } from "@/data/site";

type SocialLink = {
  name: "github" | "twitter" | "instagram" | "linkedin" | "coffee";
  href: string;
  label: string;
};

const socialLinks: SocialLink[] = [
  { name: "github", href: site.github, label: `${site.name} on GitHub (opens in a new tab)` },
  { name: "twitter", href: site.twitter, label: `${site.name} on X (opens in a new tab)` },
  { name: "instagram", href: site.instagram, label: `${site.name} on Instagram (opens in a new tab)` },
  { name: "linkedin", href: site.linkedin, label: `${site.name} on LinkedIn (opens in a new tab)` },
  { name: "coffee", href: site.coffee, label: `Support ${site.name} (opens in a new tab)` },
];

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
              const href = `/${locale}${link.href === "/" ? "" : link.href}`;
              const active = link.href === "/" ? pathname === `/${locale}` || pathname === `/${locale}/` : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <li key={link.href} className="lg:w-full">
                  <Link href={href} aria-current={active ? "page" : undefined} className={`relative flex min-h-11 items-center justify-center gap-2 rounded-lg px-2.5 text-xs transition-colors duration-200 ease-out lg:flex-col lg:gap-1.5 lg:px-1 lg:py-3 lg:text-[10px] ${active ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
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
            className="hidden size-11 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 ease-out hover:bg-muted hover:text-foreground lg:flex"
            aria-label={`Switch to ${otherLocale === "es" ? "Spanish" : "English"}`}
          >
            <Icon name="globe" className="size-5" />
          </Link>
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="group relative hidden size-11 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-300 ease-out hover:bg-muted hover:text-foreground lg:flex"
            >
              <Icon name={link.name} className="absolute size-5 transition-all duration-300 ease-out group-hover:scale-90 group-hover:opacity-0" />
              <Icon name={link.name} brand className="absolute size-5 scale-90 opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100" />
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

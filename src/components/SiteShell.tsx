import Link from "next/link";
import { useTranslations } from "next-intl";
import { SectionNav } from "@/components/SectionNav";
import { WritingRail } from "@/components/WritingRail";
import { site } from "@/data/site";

export function SiteShell({ children, locale }: Readonly<{ children: React.ReactNode; locale: string }>) {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();
  return (
    <div className="flex min-h-dvh flex-col lg:mx-auto lg:grid lg:max-w-[1180px] lg:grid-cols-[84px_minmax(0,1fr)_252px] lg:border-x lg:border-rail">
      <SectionNav locale={locale} />
      <div className="flex min-h-dvh min-w-0 flex-col">
        <main id="main-content" tabIndex={-1} className="page-content animate-fade-in-up mx-auto w-full max-w-[760px] flex-1 px-5 py-12 outline-none sm:px-10 sm:py-16 lg:px-10 xl:px-14">
          {children}
        </main>
        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-rail px-5 py-6 text-xs text-muted-foreground sm:px-10 xl:px-14">
          <span>&copy; {year} {site.name} &middot; {site.email}</span>
          <div className="flex items-center gap-5">
            <Link href={`/${locale}/writing`} className="transition-colors duration-200 ease-out hover:text-foreground">{t("writing")}</Link>
          </div>
        </footer>
      </div>
      <WritingRail locale={locale} />
    </div>
  );
}

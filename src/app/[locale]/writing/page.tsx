import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteShell } from "@/components/SiteShell";
import { WritingIndex } from "@/components/WritingIndex";
import { getPosts } from "@/data/writing";
import { getSiteUrl } from "@/data/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("writing");
  const siteUrl = getSiteUrl();
  const path = `/${locale}/writing`;
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: siteUrl ? path : undefined },
  };
}

export default async function WritingPage({ params }: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("writing");

  return (
    <SiteShell locale={locale}>
      <div className="flex items-end justify-between gap-4">
        <SectionHeading id="writing-heading" icon="writing" as="h1">{t("title")}</SectionHeading>
      </div>
      <p className="mt-4 text-sm leading-7 text-neutral-400">{t("description")}</p>
      <h2 className="sr-only">Articles</h2>
      <WritingIndex posts={getPosts(locale)} locale={locale} />
    </SiteShell>
  );
}

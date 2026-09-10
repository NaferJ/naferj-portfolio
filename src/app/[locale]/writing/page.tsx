import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { SiteShell } from "@/components/SiteShell";
import { WritingIndex } from "@/components/WritingIndex";
import { getPosts } from "@/data/writing";
import { getSiteUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on software, building useful things, and learning in public.",
  alternates: { canonical: getSiteUrl() ? "/writing" : undefined },
};

export default async function WritingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("writing");

  return (
    <SiteShell locale={locale}>
      <h1 className="page-title">{t("title")}</h1>
      <p className="mt-4 text-sm leading-7 text-neutral-400">{t("description")}</p>
      <h2 className="sr-only">Articles</h2>
      <WritingIndex posts={getPosts()} locale={locale} />
    </SiteShell>
  );
}

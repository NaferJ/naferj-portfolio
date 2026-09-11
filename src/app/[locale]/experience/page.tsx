import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Experience } from "@/components/Experience";
import { SiteShell } from "@/components/SiteShell";
import { getSiteUrl } from "@/data/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = getSiteUrl();
  const path = `/${locale}/experience`;
  return {
    title: "Experience",
    description: "My work across software engineering, web development, and technical support.",
    alternates: { canonical: siteUrl ? path : undefined },
  };
}

export default async function ExperiencePage({ params }: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <SiteShell locale={locale}>
      <Experience />
    </SiteShell>
  );
}

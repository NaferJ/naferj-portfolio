import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Experience } from "@/components/Experience";
import { SiteShell } from "@/components/SiteShell";
import { getSiteUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Experience",
  description: "My work across backend engineering, web development, and technical support.",
  alternates: { canonical: getSiteUrl() ? "/experience" : undefined },
};

export default async function ExperiencePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <SiteShell locale={locale}>
      <Experience />
    </SiteShell>
  );
}

import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Projects } from "@/components/Projects";
import { SiteShell } from "@/components/SiteShell";
import { getSiteUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of software projects, experiments, and case studies.",
  alternates: { canonical: getSiteUrl() ? "/projects" : undefined },
};

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <SiteShell locale={locale}>
      <Projects locale={locale} />
    </SiteShell>
  );
}

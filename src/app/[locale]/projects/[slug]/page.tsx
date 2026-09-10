import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { SiteShell } from "@/components/SiteShell";
import { getProject, projects } from "@/data/projects";
import { getSiteUrl, site } from "@/data/site";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: getSiteUrl() ? `/projects/${project.slug}` : undefined },
    robots: { index: site.indexable && !project.sample, follow: site.indexable && !project.sample },
    openGraph: { title: project.name, description: project.description },
    twitter: { card: "summary_large_image", title: project.name, description: project.description },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProject(slug);
  if (!project) notFound();
  const t = await getTranslations("projects");

  return (
    <SiteShell locale={locale}>
      <Link href={`/${locale}/projects`} className="text-xs text-muted-foreground hover:text-foreground">&larr; {t("allProjects")}</Link>
      <article className="mt-10">
        <h1 className="page-title">{project.name}</h1>
        <p className="mt-5 text-[15px] leading-7 text-neutral-400">{project.description}</p>
        <dl className="my-8 grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 border-y border-rail py-6 text-xs"><dt className="text-muted-foreground">{t("year")}</dt><dd>{project.year}</dd><dt className="text-muted-foreground">{t("builtWith")}</dt><dd className="flex flex-wrap gap-2">{project.stack.map((item) => <span key={item} className="rounded border border-rail px-2 py-1 text-neutral-300">{item}</span>)}</dd></dl>
        {project.sample ? <p className="rounded-lg border border-rail bg-muted/40 px-4 py-3 text-xs leading-6 text-muted-foreground">{t("sampleNotice")}</p> : null}
        {project.href ? <a href={project.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 rounded-full border border-border px-5 text-xs hover:bg-muted">{t("visitProject")} <span aria-hidden="true">↗</span></a> : null}
        <div className="article-body mt-8">{project.sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p className="mt-4">{section.text}</p></section>)}</div>
      </article>
      <div className="mt-12"><Link href={`/${locale}/projects`} className="text-xs text-neutral-300 hover:text-white">{t("exploreOthers")} &rarr;</Link></div>
    </SiteShell>
  );
}

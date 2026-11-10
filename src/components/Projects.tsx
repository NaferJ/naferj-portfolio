"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { PreviewLink } from "@/components/PreviewLink";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { getProjects } from "@/data/projects";

export function Projects({ locale, preview = false }: Readonly<{ locale?: string; preview?: boolean }>) {
  const t = useTranslations("sections");
  const tProjects = useTranslations("projects");
  const tCopy = useTranslations("projectCopy");
  const projects = getProjects();

  return (
    <section id="projects" aria-labelledby="projects-heading">
      <div className="flex items-end justify-between gap-4">
        <SectionHeading id="projects-heading" icon="projects" as={preview ? "h2" : "h1"}>{t("projects")}</SectionHeading>
        {preview ? (
          <Link href={`/${locale}/projects`} className="text-xs text-muted-foreground transition-colors duration-200 ease-out hover:text-foreground">{t("viewAll")} <span aria-hidden="true">→</span></Link>
        ) : null}
      </div>
      <p className="mt-3 text-sm leading-7 text-neutral-400">{t("projectsDescription")}</p>
      <ul className="-mx-3 mt-8 flex flex-col gap-1" aria-label="Projects">
        {projects.slice(0, preview ? 3 : undefined).map((project, index) => {
          const name = tCopy(`${project.slug}.name`);
          const description = tCopy(`${project.slug}.description`);
          const inner = (
            <>
              <span className="min-w-0 shrink break-words text-sm text-foreground sm:truncate">{name}</span>
              <span className="min-w-4 flex-1 border-t border-border transition-colors group-hover:border-foreground/20" aria-hidden="true" />
              <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                {project.type}
                <span aria-hidden="true" className="opacity-40 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">↗</span>
              </span>
            </>
          );
          const row = project.href ? (
            <PreviewLink
              href={project.href}
              block
              announce={false}
              ariaLabel={`${name}: ${description}`}
              preview={{ title: name, description, image: project.preview?.image }}
              className="group flex cursor-pointer items-center gap-3 rounded-full px-3 py-2 transition-colors duration-200 hover:bg-muted active:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {inner}
            </PreviewLink>
          ) : (
            <span className="flex items-center gap-3 rounded-full px-3 py-2">{inner}</span>
          );
          return (
            <li key={project.slug}>
              {preview ? row : <Reveal index={Math.min(index, 6)}>{row}</Reveal>}
            </li>
          );
        })}
      </ul>
      {projects.length === 0 ? <p className="mt-6 text-sm text-muted-foreground">{tProjects("empty")}</p> : null}
    </section>
  );
}

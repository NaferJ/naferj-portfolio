import Link from "next/link";
import { useTranslations } from "next-intl";
import { projects } from "@/data/projects";

export function Projects({ preview = false, locale = "en" }: { preview?: boolean; locale?: string }) {
  const t = useTranslations("sections");
  const tProjects = useTranslations("projects");
  const Heading = preview ? "h2" : "h1";

  return (
    <section id="projects" aria-labelledby="projects-heading">
      <div className="flex items-center justify-between gap-4">
        <Heading id="projects-heading" className={preview ? "section-title" : "page-title"}>{t("projects")}</Heading>
        {preview ? <Link href={`/${locale}/projects`} className="text-xs text-muted-foreground underline decoration-transparent underline-offset-4 transition-[text-decoration-color] hover:decoration-foreground/30 hover:text-foreground">{t("viewAll")}</Link> : null}
      </div>
      <p className="mt-3 text-sm leading-7 text-neutral-400">{t("projectsDescription")}</p>
      <ul className="-mx-3 mt-8 flex flex-col gap-1" aria-label="Projects">
        {projects.slice(0, preview ? 3 : undefined).map((project) => (
          <li key={project.slug}>
            <Link href={`/${locale}/projects/${project.slug}`} aria-label={`${project.name}: ${project.description}`} className="group flex cursor-pointer items-center gap-3 rounded-full px-3 py-2 transition-colors duration-200 hover:bg-muted active:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <span className="min-w-0 shrink break-words text-sm text-foreground sm:truncate">{project.name}</span>
              <span className="min-w-4 flex-1 border-t border-border transition-colors group-hover:border-foreground/20" aria-hidden="true" />
              <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                {project.sample ? <span className="sample-badge">Sample</span> : null}
                {project.type}
                <span aria-hidden="true" className="opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">↗</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {projects.length === 0 ? <p className="mt-6 text-sm text-muted-foreground">{tProjects("empty")}</p> : null}
    </section>
  );
}

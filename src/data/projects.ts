export type Project = {
  slug: string;
  type: string;
  year: string;
  stack: string[];
  sample?: boolean;
  href?: string;
};

const projectList: Project[] = [
  { slug: "personal-portfolio", type: "web", year: "2026", stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"], href: "https://naferj.com" },
  { slug: "poxyram", type: "API", year: "2025", stack: ["TypeScript", "Node.js", "PostgreSQL"], href: "https://api.poxyram.com" },
  { slug: "luisardito-shop", type: "web", year: "2025", stack: ["Next.js", "React", "TypeScript"], href: "https://luisardito.com" },
  { slug: "redlink-agency", type: "web", year: "2025", stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"], href: "https://redlinkagency.com" },
];

export const projects = projectList;

export function getProjects(): Project[] {
  return projectList;
}

export function getProject(slug: string): Project | undefined {
  return projectList.find((project) => project.slug === slug);
}

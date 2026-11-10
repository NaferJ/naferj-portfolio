export type Project = {
  slug: string;
  type: string;
  year: string;
  stack: string[];
  sample?: boolean;
  href?: string;
  preview?: { image: string };
};

const projectList: Project[] = [
  { slug: "luisardito-shop", type: "web", year: "2025", stack: ["Next.js", "React", "TypeScript"], href: "https://luisardito.com/shop", preview: { image: "/previews/luisardito.png" } },
  { slug: "ecobite", type: "API", year: "2026", stack: ["TypeScript", "Express", "Prisma", "PostgreSQL"], href: "https://ecobite-api-portal.vercel.app/", preview: { image: "/screenshots/ecobite-portal.png" } },
  { slug: "poxyram", type: "API", year: "2025", stack: ["TypeScript", "Node.js", "PostgreSQL"], href: "https://api.poxyram.com", preview: { image: "/previews/poxyram-api.png" } },
  { slug: "personal-portfolio", type: "web", year: "2026", stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"], href: "https://naferj.com", preview: { image: "/previews/naferj.png" } },
  { slug: "redlink-agency", type: "web", year: "2025", stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"], href: "https://redlinkagency.com", preview: { image: "/previews/redlink.png" } },
];

export const projects = projectList;

export function getProjects(): Project[] {
  return projectList;
}

export function getProject(slug: string): Project | undefined {
  return projectList.find((project) => project.slug === slug);
}

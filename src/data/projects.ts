export type Project = {
  slug: string;
  name: string;
  description: string;
  type: string;
  year: string;
  stack: string[];
  sample?: boolean;
  href?: string;
  sections: { title: string; text: string }[];
};

export const projects: Project[] = [
  {
    slug: "personal-portfolio",
    name: "Personal portfolio",
    description: "A home for my work, writing, and the things I learn along the way.",
    type: "web",
    year: "2026",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    href: "https://naferj.com",
    sections: [
      {
        title: "A place for the work",
        text: "This website brings projects, experience, and writing together in a quiet, readable space. The two-rail layout keeps recent writing close by while leaving the main column focused on the page you are reading.",
      },
      {
        title: "Built to stay simple",
        text: "Pages render on the server, while small interactive components handle navigation state and filtering. Profile information, projects, and posts live in typed data modules, separate from the presentation.",
      },
      {
        title: "Room to grow",
        text: "The writing section supports individual articles and an optional list of external publications. Content can move to a CMS later without redesigning the reading experience.",
      },
    ],
  },
  {
    slug: "poxyram",
    name: "Poxyram",
    description: "Backend platform and API for Poxyram Studio.",
    type: "API",
    year: "2025",
    stack: ["TypeScript", "Node.js", "PostgreSQL"],
    href: "https://api.poxyram.com",
    sections: [
      {
        title: "The platform",
        text: "Poxyram Studio needed a backend that could handle their platform operations end to end. I built the API from the ground up, covering data models, authentication, and the services their frontend depends on.",
      },
      {
        title: "The approach",
        text: "The backend is structured around clear service boundaries with typed contracts between layers. Every endpoint is documented and tested, and the database schema is versioned so migrations are predictable.",
      },
      {
        title: "The outcome",
        text: "The API is live and serving the platform. It handles the day-to-day operations of Poxyram Studio and is built to grow as the product does.",
      },
    ],
  },
  {
    slug: "luisardito-shop",
    name: "Luisardito Shop",
    description: "Online store for Luisardito.",
    type: "web",
    year: "2025",
    stack: ["Next.js", "React", "TypeScript"],
    href: "https://luisardito.com",
    sections: [
      {
        title: "The store",
        text: "An online store built for Luisardito. The frontend is fast, accessible, and easy to manage, with a checkout flow that stays out of the way.",
      },
      {
        title: "The approach",
        text: "Built with Next.js and TypeScript. Pages are server-rendered for speed and SEO, with client-side interactivity only where it is needed.",
      },
      {
        title: "The outcome",
        text: "The store is live and serving customers. It is designed to grow with the catalog without needing a rebuild.",
      },
    ],
  },
  {
    slug: "redlink-agency",
    name: "Redlink Agency",
    description: "Website for Redlink Agency.",
    type: "web",
    year: "2025",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    href: "https://redlinkagency.com",
    sections: [
      {
        title: "The site",
        text: "A website for Redlink Agency built to present their services and work.",
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

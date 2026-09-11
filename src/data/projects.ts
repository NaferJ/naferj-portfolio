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

type ProjectShared = {
  slug: string;
  type: string;
  year: string;
  stack: string[];
  href?: string;
  sample?: boolean;
};

type ProjectLocalized = {
  name: string;
  description: string;
  sections: { title: string; text: string }[];
};

const sharedProjects: ProjectShared[] = [
  { slug: "personal-portfolio", type: "web", year: "2026", stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"], href: "https://naferj.com" },
  { slug: "poxyram", type: "API", year: "2025", stack: ["TypeScript", "Node.js", "PostgreSQL"], href: "https://api.poxyram.com" },
  { slug: "luisardito-shop", type: "web", year: "2025", stack: ["Next.js", "React", "TypeScript"], href: "https://luisardito.com" },
  { slug: "redlink-agency", type: "web", year: "2025", stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"], href: "https://redlinkagency.com" },
];

const enCopy: Record<string, ProjectLocalized> = {
  "personal-portfolio": {
    name: "Personal portfolio",
    description: "A home for my work, writing, and the things I learn along the way.",
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
  poxyram: {
    name: "Poxyram",
    description: "Backend platform and API for Poxyram Studio.",
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
  "luisardito-shop": {
    name: "Luisardito Shop",
    description: "Online store for Luisardito.",
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
  "redlink-agency": {
    name: "Redlink Agency",
    description: "Website for Redlink Agency.",
    sections: [
      {
        title: "The site",
        text: "A website for Redlink Agency built to present their services and work.",
      },
    ],
  },
};

const esCopy: Record<string, ProjectLocalized> = {
  "personal-portfolio": {
    name: "Portafolio personal",
    description: "Un espacio para mi trabajo, escritos y lo que voy aprendiendo en el camino.",
    sections: [
      {
        title: "Un lugar para el trabajo",
        text: "Este sitio reúne proyectos, experiencia y escritos en un espacio tranquilo y legible. El diseño de dos columnas mantiene los escritos recientes a mano mientras deja la columna principal centrada en la página que se está leyendo.",
      },
      {
        title: "Hecho para seguir siendo sencillo",
        text: "Las páginas se renderizan en el servidor, mientras que pequeños componentes interactivos manejan el estado de navegación y los filtros. La información del perfil, los proyectos y las publicaciones residen en módulos de datos tipados, separados de la presentación.",
      },
      {
        title: "Espacio para crecer",
        text: "La sección de escritos admite artículos individuales y una lista opcional de publicaciones externas. El contenido puede migrarse a un CMS más adelante sin rediseñar la experiencia de lectura.",
      },
    ],
  },
  poxyram: {
    name: "Poxyram",
    description: "Plataforma backend y API para Poxyram Studio.",
    sections: [
      {
        title: "La plataforma",
        text: "Poxyram Studio necesitaba un backend que pudiera gestionar las operaciones de su plataforma de principio a fin. Construí la API desde cero, cubriendo los modelos de datos, la autenticación y los servicios de los que depende su frontend.",
      },
      {
        title: "El enfoque",
        text: "El backend está estructurado con límites de servicio claros y contratos tipados entre capas. Cada endpoint está documentado y probado, y el esquema de base de datos está versionado para que las migraciones sean predecibles.",
      },
      {
        title: "El resultado",
        text: "La API está en uso y sirviendo la plataforma. Gestiona las operaciones diarias de Poxyram Studio y está preparada para crecer junto con el producto.",
      },
    ],
  },
  "luisardito-shop": {
    name: "Luisardito Shop",
    description: "Tienda en línea para Luisardito.",
    sections: [
      {
        title: "La tienda",
        text: "Una tienda en línea construida para Luisardito. El frontend es rápido, accesible y fácil de gestionar, con un flujo de compra que no estorba.",
      },
      {
        title: "El enfoque",
        text: "Construida con Next.js y TypeScript. Las páginas se renderizan en el servidor para velocidad y SEO, con interactividad del lado del cliente solo donde se necesita.",
      },
      {
        title: "El resultado",
        text: "La tienda está en línea y atendiendo clientes. Está diseñada para crecer con el catálogo sin necesidad de reconstruirse.",
      },
    ],
  },
  "redlink-agency": {
    name: "Redlink Agency",
    description: "Sitio web para Redlink Agency.",
    sections: [
      {
        title: "El sitio",
        text: "Un sitio web para Redlink Agency construido para presentar sus servicios y trabajo.",
      },
    ],
  },
};

function buildProjects(shared: ProjectShared[], copy: Record<string, ProjectLocalized>): Project[] {
  return shared.map((project) => ({ ...project, ...copy[project.slug] }));
}

export const projectsEn: Project[] = buildProjects(sharedProjects, enCopy);
export const projectsEs: Project[] = buildProjects(sharedProjects, esCopy);

export const projects = projectsEn;

export function getProjects(locale?: string): Project[] {
  return locale === "es" ? projectsEs : projectsEn;
}

export function getProject(slug: string, locale?: string): Project | undefined {
  return getProjects(locale).find((project) => project.slug === slug);
}

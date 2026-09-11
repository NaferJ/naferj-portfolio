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

type LocalizedField = { en: string; es: string };
type LocalizedSection = { title: LocalizedField; text: LocalizedField };

type ProjectSeed = {
  slug: string;
  type: string;
  year: string;
  stack: string[];
  href?: string;
  sample?: boolean;
  name: LocalizedField;
  description: LocalizedField;
  sections: LocalizedSection[];
};

const seeds: ProjectSeed[] = [
  {
    slug: "personal-portfolio",
    type: "web",
    year: "2026",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    href: "https://naferj.com",
    name: { en: "Personal portfolio", es: "Portafolio personal" },
    description: {
      en: "A home for my work, writing, and the things I learn along the way.",
      es: "Un espacio para mi trabajo, escritos y lo que voy aprendiendo en el camino.",
    },
    sections: [
      {
        title: { en: "A place for the work", es: "Un lugar para el trabajo" },
        text: {
          en: "This website brings projects, experience, and writing together in a quiet, readable space. The two-rail layout keeps recent writing close by while leaving the main column focused on the page you are reading.",
          es: "Este sitio reúne proyectos, experiencia y escritos en un espacio tranquilo y legible. El diseño de dos columnas mantiene los escritos recientes a mano mientras deja la columna principal centrada en la página que se está leyendo.",
        },
      },
      {
        title: { en: "Built to stay simple", es: "Hecho para seguir siendo sencillo" },
        text: {
          en: "Pages render on the server, while small interactive components handle navigation state and filtering. Profile information, projects, and posts live in typed data modules, separate from the presentation.",
          es: "Las páginas se renderizan en el servidor, mientras que pequeños componentes interactivos manejan el estado de navegación y los filtros. La información del perfil, los proyectos y las publicaciones residen en módulos de datos tipados, separados de la presentación.",
        },
      },
      {
        title: { en: "Room to grow", es: "Espacio para crecer" },
        text: {
          en: "The writing section supports individual articles and an optional list of external publications. Content can move to a CMS later without redesigning the reading experience.",
          es: "La sección de escritos admite artículos individuales y una lista opcional de publicaciones externas. El contenido puede migrarse a un CMS más adelante sin rediseñar la experiencia de lectura.",
        },
      },
    ],
  },
  {
    slug: "poxyram",
    type: "API",
    year: "2025",
    stack: ["TypeScript", "Node.js", "PostgreSQL"],
    href: "https://api.poxyram.com",
    name: { en: "Poxyram", es: "Poxyram" },
    description: {
      en: "Backend platform and API for Poxyram Studio.",
      es: "Plataforma backend y API para Poxyram Studio.",
    },
    sections: [
      {
        title: { en: "The platform", es: "La plataforma" },
        text: {
          en: "Poxyram Studio needed a backend that could handle their platform operations end to end. I built the API from the ground up, covering data models, authentication, and the services their frontend depends on.",
          es: "Poxyram Studio necesitaba un backend que pudiera gestionar las operaciones de su plataforma de principio a fin. Construí la API desde cero, cubriendo los modelos de datos, la autenticación y los servicios de los que depende su frontend.",
        },
      },
      {
        title: { en: "The approach", es: "El enfoque" },
        text: {
          en: "The backend is structured around clear service boundaries with typed contracts between layers. Every endpoint is documented and tested, and the database schema is versioned so migrations are predictable.",
          es: "El backend está estructurado con límites de servicio claros y contratos tipados entre capas. Cada endpoint está documentado y probado, y el esquema de base de datos está versionado para que las migraciones sean predecibles.",
        },
      },
      {
        title: { en: "The outcome", es: "El resultado" },
        text: {
          en: "The API is live and serving the platform. It handles the day-to-day operations of Poxyram Studio and is built to grow as the product does.",
          es: "La API está en uso y sirviendo la plataforma. Gestiona las operaciones diarias de Poxyram Studio y está preparada para crecer junto con el producto.",
        },
      },
    ],
  },
  {
    slug: "luisardito-shop",
    type: "web",
    year: "2025",
    stack: ["Next.js", "React", "TypeScript"],
    href: "https://luisardito.com",
    name: { en: "Luisardito Shop", es: "Luisardito Shop" },
    description: {
      en: "Online store for Luisardito.",
      es: "Tienda en línea para Luisardito.",
    },
    sections: [
      {
        title: { en: "The store", es: "La tienda" },
        text: {
          en: "An online store built for Luisardito. The frontend is fast, accessible, and easy to manage, with a checkout flow that stays out of the way.",
          es: "Una tienda en línea construida para Luisardito. El frontend es rápido, accesible y fácil de gestionar, con un flujo de compra que no estorba.",
        },
      },
      {
        title: { en: "The approach", es: "El enfoque" },
        text: {
          en: "Built with Next.js and TypeScript. Pages are server-rendered for speed and SEO, with client-side interactivity only where it is needed.",
          es: "Construida con Next.js y TypeScript. Las páginas se renderizan en el servidor para velocidad y SEO, con interactividad del lado del cliente solo donde se necesita.",
        },
      },
      {
        title: { en: "The outcome", es: "El resultado" },
        text: {
          en: "The store is live and serving customers. It is designed to grow with the catalog without needing a rebuild.",
          es: "La tienda está en línea y atendiendo clientes. Está diseñada para crecer con el catálogo sin necesidad de reconstruirse.",
        },
      },
    ],
  },
  {
    slug: "redlink-agency",
    type: "web",
    year: "2025",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    href: "https://redlinkagency.com",
    name: { en: "Redlink Agency", es: "Redlink Agency" },
    description: {
      en: "Website for Redlink Agency.",
      es: "Sitio web para Redlink Agency.",
    },
    sections: [
      {
        title: { en: "The site", es: "El sitio" },
        text: {
          en: "A website for Redlink Agency built to present their services and work.",
          es: "Un sitio web para Redlink Agency construido para presentar sus servicios y trabajo.",
        },
      },
    ],
  },
];

function localize(seed: ProjectSeed, locale: "en" | "es"): Project {
  return {
    slug: seed.slug,
    type: seed.type,
    year: seed.year,
    stack: seed.stack,
    href: seed.href,
    sample: seed.sample,
    name: seed.name[locale],
    description: seed.description[locale],
    sections: seed.sections.map((section) => ({
      title: section.title[locale],
      text: section.text[locale],
    })),
  };
}

export const projectsEn: Project[] = seeds.map((seed) => localize(seed, "en"));
export const projectsEs: Project[] = seeds.map((seed) => localize(seed, "es"));

export const projects = projectsEn;

export function getProjects(locale?: string): Project[] {
  return locale === "es" ? projectsEs : projectsEn;
}

export function getProject(slug: string, locale?: string): Project | undefined {
  return getProjects(locale).find((project) => project.slug === slug);
}

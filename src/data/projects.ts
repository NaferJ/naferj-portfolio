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

type Locale = "en" | "es";

type LocalizedField = Record<Locale, string>;
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

function loc(en: string, es: string): LocalizedField {
  return { en, es };
}

function sec(enTitle: string, esTitle: string, enText: string, esText: string): LocalizedSection {
  return { title: loc(enTitle, esTitle), text: loc(enText, esText) };
}

const seeds: ProjectSeed[] = [
  {
    slug: "personal-portfolio",
    type: "web",
    year: "2026",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    href: "https://naferj.com",
    name: loc("Personal portfolio", "Portafolio personal"),
    description: loc(
      "A home for my work, writing, and the things I learn along the way.",
      "Un espacio para mi trabajo, escritos y lo que voy aprendiendo en el camino.",
    ),
    sections: [
      sec(
        "A place for the work",
        "Un lugar para el trabajo",
        "This website brings projects, experience, and writing together in a quiet, readable space. The two-rail layout keeps recent writing close by while leaving the main column focused on the page you are reading.",
        "Este sitio reúne proyectos, experiencia y escritos en un espacio tranquilo y legible. El diseño de dos columnas mantiene los escritos recientes a mano mientras deja la columna principal centrada en la página que se está leyendo.",
      ),
      sec(
        "Built to stay simple",
        "Hecho para seguir siendo sencillo",
        "Pages render on the server, while small interactive components handle navigation state and filtering. Profile information, projects, and posts live in typed data modules, separate from the presentation.",
        "Las páginas se renderizan en el servidor, mientras que pequeños componentes interactivos manejan el estado de navegación y los filtros. La información del perfil, los proyectos y las publicaciones residen en módulos de datos tipados, separados de la presentación.",
      ),
      sec(
        "Room to grow",
        "Espacio para crecer",
        "The writing section supports individual articles and an optional list of external publications. Content can move to a CMS later without redesigning the reading experience.",
        "La sección de escritos admite artículos individuales y una lista opcional de publicaciones externas. El contenido puede migrarse a un CMS más adelante sin rediseñar la experiencia de lectura.",
      ),
    ],
  },
  {
    slug: "poxyram",
    type: "API",
    year: "2025",
    stack: ["TypeScript", "Node.js", "PostgreSQL"],
    href: "https://api.poxyram.com",
    name: loc("Poxyram", "Poxyram"),
    description: loc(
      "Backend platform and API for Poxyram Studio.",
      "Plataforma backend y API para Poxyram Studio.",
    ),
    sections: [
      sec(
        "The platform",
        "La plataforma",
        "Poxyram Studio needed a backend that could handle their platform operations end to end. I built the API from the ground up, covering data models, authentication, and the services their frontend depends on.",
        "Poxyram Studio necesitaba un backend que pudiera gestionar las operaciones de su plataforma de principio a fin. Construí la API desde cero, cubriendo los modelos de datos, la autenticación y los servicios de los que depende su frontend.",
      ),
      sec(
        "The approach",
        "El enfoque",
        "The backend is structured around clear service boundaries with typed contracts between layers. Every endpoint is documented and tested, and the database schema is versioned so migrations are predictable.",
        "El backend está estructurado con límites de servicio claros y contratos tipados entre capas. Cada endpoint está documentado y probado, y el esquema de base de datos está versionado para que las migraciones sean predecibles.",
      ),
      sec(
        "The outcome",
        "El resultado",
        "The API is live and serving the platform. It handles the day-to-day operations of Poxyram Studio and is built to grow as the product does.",
        "La API está en uso y sirviendo la plataforma. Gestiona las operaciones diarias de Poxyram Studio y está preparada para crecer junto con el producto.",
      ),
    ],
  },
  {
    slug: "luisardito-shop",
    type: "web",
    year: "2025",
    stack: ["Next.js", "React", "TypeScript"],
    href: "https://luisardito.com",
    name: loc("Luisardito Shop", "Luisardito Shop"),
    description: loc(
      "Online store for Luisardito.",
      "Tienda en línea para Luisardito.",
    ),
    sections: [
      sec(
        "The store",
        "La tienda",
        "An online store built for Luisardito. The frontend is fast, accessible, and easy to manage, with a checkout flow that stays out of the way.",
        "Una tienda en línea construida para Luisardito. El frontend es rápido, accesible y fácil de gestionar, con un flujo de compra que no estorba.",
      ),
      sec(
        "The approach",
        "El enfoque",
        "Built with Next.js and TypeScript. Pages are server-rendered for speed and SEO, with client-side interactivity only where it is needed.",
        "Construida con Next.js y TypeScript. Las páginas se renderizan en el servidor para velocidad y SEO, con interactividad del lado del cliente solo donde se necesita.",
      ),
      sec(
        "The outcome",
        "El resultado",
        "The store is live and serving customers. It is designed to grow with the catalog without needing a rebuild.",
        "La tienda está en línea y atendiendo clientes. Está diseñada para crecer con el catálogo sin necesidad de reconstruirse.",
      ),
    ],
  },
  {
    slug: "redlink-agency",
    type: "web",
    year: "2025",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    href: "https://redlinkagency.com",
    name: loc("Redlink Agency", "Redlink Agency"),
    description: loc(
      "Website for Redlink Agency.",
      "Sitio web para Redlink Agency.",
    ),
    sections: [
      sec(
        "The site",
        "El sitio",
        "A website for Redlink Agency built to present their services and work.",
        "Un sitio web para Redlink Agency construido para presentar sus servicios y trabajo.",
      ),
    ],
  },
];

function localize(seed: ProjectSeed, locale: Locale): Project {
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

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

export const projectsEn: Project[] = [
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

export const projectsEs: Project[] = [
  {
    slug: "personal-portfolio",
    name: "Portafolio personal",
    description: "Un espacio para mi trabajo, escritos y lo que voy aprendiendo en el camino.",
    type: "web",
    year: "2026",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    href: "https://naferj.com",
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
  {
    slug: "poxyram",
    name: "Poxyram",
    description: "Plataforma backend y API para Poxyram Studio.",
    type: "API",
    year: "2025",
    stack: ["TypeScript", "Node.js", "PostgreSQL"],
    href: "https://api.poxyram.com",
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
  {
    slug: "luisardito-shop",
    name: "Luisardito Shop",
    description: "Tienda en línea para Luisardito.",
    type: "web",
    year: "2025",
    stack: ["Next.js", "React", "TypeScript"],
    href: "https://luisardito.com",
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
  {
    slug: "redlink-agency",
    name: "Redlink Agency",
    description: "Sitio web para Redlink Agency.",
    type: "web",
    year: "2025",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    href: "https://redlinkagency.com",
    sections: [
      {
        title: "El sitio",
        text: "Un sitio web para Redlink Agency construido para presentar sus servicios y trabajo.",
      },
    ],
  },
];

export const projects = projectsEn;

export function getProjects(locale?: string): Project[] {
  return locale === "es" ? projectsEs : projectsEn;
}

export function getProject(slug: string, locale?: string): Project | undefined {
  return getProjects(locale).find((project) => project.slug === slug);
}

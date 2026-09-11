export const site = {
  name: "NaferJ",
  initials: "NJ",
  description: "Full stack developer building software end to end — projects, experience, and notes on building useful things that last.",
  url: "https://naferj.com",
  indexable: true,
  avatar: "/profile/avatar.png",
  email: "contacto@naferj.com",
  github: "https://github.com/NaferJ",
  linkedin: "https://www.linkedin.com/in/naferj/",
  instagram: "https://www.instagram.com/naferjml/",
  twitter: "https://x.com/NaferJ1",
  coffee: "https://ko-fi.com/naferj",
  currentWork: {
    name: "Poxyram Studio",
    href: "https://www.instagram.com/poxyram/",
    image: "/logos/poxyram.svg",
  },
  navigation: [
    { href: "/", label: "overview", icon: "home" },
    { href: "/experience", label: "experience", icon: "experience" },
    { href: "/projects", label: "projects", icon: "projects" },
    { href: "/writing", label: "writing", icon: "writing" },
  ],
} as const;

export const siteDescriptionEs =
  "Desarrollador full stack construyendo software de extremo a extremo — proyectos, experiencia y notas sobre construir cosas que perduren.";

export function getSiteUrl(): URL | undefined {
  if (!site.url) return undefined;
  const url = new URL(site.url);
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("The portfolio URL must use HTTP or HTTPS.");
  }
  return url;
}

export function getDescription(locale?: string): string {
  return locale === "es" ? siteDescriptionEs : site.description;
}

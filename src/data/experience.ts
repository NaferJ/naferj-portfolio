export type ExperienceRole = {
  role: string;
  period: string;
};

export type Experience = {
  company: string;
  logo: string;
  period: string;
  roles: ExperienceRole[];
  href?: string;
  previewImage?: string;
};

export const experienceEn: Experience[] = [
  {
    company: "Talently Lab",
    logo: "/logos/talently-lab.png",
    period: "Oct 2026 to Present",
    href: "https://talentlylab.com.ar/",
    previewImage: "/previews/talentlylab.png",
    roles: [
      {
        role: "Backend Engineer · EcoBite",
        period: "Oct 2026 to Present",
      },
    ],
  },
  {
    company: "Poxyram Studio",
    logo: "/logos/poxyram.svg",
    period: "Jun 2026 to Aug 2026",
    href: "https://www.instagram.com/poxyram/",
    roles: [
      {
        role: "Backend Engineer · Contract",
        period: "Jun 2026 to Aug 2026",
      },
    ],
  },
  {
    company: "LM SOLUCIONES SAS",
    logo: "/logos/lm-soluciones.svg",
    period: "Jan 2023 to Oct 2025",
    href: "https://www.lmsoluciones.co/",
    previewImage: "/previews/lmsoluciones.png",
    roles: [
      {
        role: "Web Developer",
        period: "Dec 2023 to Oct 2025",
      },
      {
        role: "Technical Support Apprentice",
        period: "Jan 2023 to Dec 2023",
      },
    ],
  },
];

export const experienceEs: Experience[] = [
  {
    company: "Talently Lab",
    logo: "/logos/talently-lab.png",
    period: "Oct 2026 a la fecha",
    href: "https://talentlylab.com.ar/",
    previewImage: "/previews/talentlylab.png",
    roles: [
      {
        role: "Ingeniero de backend · EcoBite",
        period: "Oct 2026 a la fecha",
      },
    ],
  },
  {
    company: "Poxyram Studio",
    logo: "/logos/poxyram.svg",
    period: "Jun 2026 a Aug 2026",
    href: "https://www.instagram.com/poxyram/",
    roles: [
      {
        role: "Ingeniero de backend · Contrato",
        period: "Jun 2026 a Aug 2026",
      },
    ],
  },
  {
    company: "LM SOLUCIONES SAS",
    logo: "/logos/lm-soluciones.svg",
    period: "Jan 2023 a Oct 2025",
    href: "https://www.lmsoluciones.co/",
    previewImage: "/previews/lmsoluciones.png",
    roles: [
      {
        role: "Desarrollador web",
        period: "Dec 2023 a Oct 2025",
      },
      {
        role: "Aprendiz de soporte técnico",
        period: "Jan 2023 a Dec 2023",
      },
    ],
  },
];

export const experience = experienceEn;

export function getExperience(locale?: string): Experience[] {
  return locale === "es" ? experienceEs : experienceEn;
}

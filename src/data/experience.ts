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
};

export const experience: Experience[] = [
  {
    company: "Poxyram Studio",
    logo: "/logos/poxyram.svg",
    period: "Jun 2026 to Present",
    href: "https://www.instagram.com/poxyram/",
    roles: [
      {
        role: "Backend Engineer · Contract",
        period: "Jun 2026 to Present",
      },
    ],
  },
  {
    company: "LM SOLUCIONES SAS",
    logo: "/logos/lm-soluciones.svg",
    period: "Jan 2023 to Oct 2025",
    href: "https://www.lmsoluciones.co/",
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

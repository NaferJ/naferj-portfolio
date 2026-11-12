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

type Localized<T> = { en: T; es: T };

type ExperienceSource = Omit<Experience, "period" | "roles"> & {
  period: Localized<string>;
  roles: Localized<ExperienceRole>[];
};

const period = (from: string, to: string): Localized<string> => ({
  en: `${from} to ${to}`,
  es: to === "Present" ? `${from} a la fecha` : `${from} a ${to}`,
});

const role = (en: string, es: string, from: string, to: string): Localized<ExperienceRole> => {
  const p = period(from, to);
  return {
    en: { role: en, period: p.en },
    es: { role: es, period: p.es },
  };
};

const experienceData: ExperienceSource[] = [
  {
    company: "Talently Lab",
    logo: "/logos/talently-lab.png",
    href: "https://talentlylab.com.ar/",
    previewImage: "/previews/talentlylab.png",
    period: period("Oct 2026", "Present"),
    roles: [
      role(
        "Backend Developer (work simulation) · EcoBite",
        "Desarrollador backend (simulación laboral) · EcoBite",
        "Oct 2026",
        "Present",
      ),
    ],
  },
  {
    company: "Poxyram Studio",
    logo: "/logos/poxyram.svg",
    href: "https://www.instagram.com/poxyram/",
    period: period("Jun 2026", "Aug 2026"),
    roles: [role("Backend Engineer · Contract", "Ingeniero de backend · Contrato", "Jun 2026", "Aug 2026")],
  },
  {
    company: "RedLink Agency",
    logo: "/logos/redlink.png",
    href: "https://www.redlinkagency.com/",
    period: period("Apr 2026", "Jun 2026"),
    roles: [
      role(
        "Co-founder & Lead Developer",
        "Cofundador y desarrollador principal",
        "Apr 2026",
        "Jun 2026",
      ),
    ],
  },
  {
    company: "LM SOLUCIONES SAS",
    logo: "/logos/lm-soluciones.svg",
    href: "https://www.lmsoluciones.co/",
    previewImage: "/previews/lmsoluciones.png",
    period: period("Oct 2023", "Oct 2025"),
    roles: [
      role("Web Developer", "Desarrollador web", "Apr 2024", "Oct 2025"),
      role("Technical Support Apprentice", "Aprendiz de soporte técnico", "Oct 2023", "Mar 2024"),
    ],
  },
];

const localize = (locale: "en" | "es"): Experience[] =>
  experienceData.map(({ period: p, roles, ...shared }) => ({
    ...shared,
    period: p[locale],
    roles: roles.map((r) => r[locale]),
  }));

export const experienceEn: Experience[] = localize("en");
export const experienceEs: Experience[] = localize("es");

export const experience = experienceEn;

export function getExperience(locale?: string): Experience[] {
  return locale === "es" ? experienceEs : experienceEn;
}

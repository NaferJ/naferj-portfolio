export const site = {
  name: "NaferJ",
  initials: "NJ",
  description:
    "NaferJ's personal corner of the internet. Software, systems, and notes on building things that last.",
  url: "",
  indexable: false,
  avatar: "/profile/avatar.png",
  email: "",
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
    { href: "", label: "overview", icon: "home" },
    { href: "experience", label: "experience", icon: "experience" },
    { href: "projects", label: "projects", icon: "projects" },
    { href: "writing", label: "writing", icon: "writing" },
  ],
} as const;

export function getSiteUrl(): URL | undefined {
  if (!site.url) return undefined;
  const url = new URL(site.url);
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("The portfolio URL must use HTTP or HTTPS.");
  }
  return url;
}

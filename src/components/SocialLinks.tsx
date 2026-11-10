import { Icon } from "@/components/Icon";
import { site } from "@/data/site";

type SocialLink = {
  name: "github" | "twitter" | "instagram" | "linkedin" | "coffee";
  href: string;
  label: string;
};

const socialLinks: SocialLink[] = [
  { name: "github", href: site.github, label: `${site.name} on GitHub (opens in a new tab)` },
  { name: "twitter", href: site.twitter, label: `${site.name} on X (opens in a new tab)` },
  { name: "instagram", href: site.instagram, label: `${site.name} on Instagram (opens in a new tab)` },
  { name: "linkedin", href: site.linkedin, label: `${site.name} on LinkedIn (opens in a new tab)` },
  { name: "coffee", href: site.coffee, label: `Support ${site.name} (opens in a new tab)` },
];

export function SocialLinks({ className }: Readonly<{ className?: string }>) {
  return (
    <div className={className}>
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="group relative flex size-11 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-300 ease-out hover:bg-muted hover:text-foreground"
        >
          <Icon name={link.name} className="absolute size-5 transition-[opacity,transform] duration-300 ease-out group-hover:scale-90 group-hover:opacity-0" />
          <Icon name={link.name} brand className="absolute size-5 scale-90 opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:scale-100 group-hover:opacity-100" />
        </a>
      ))}
    </div>
  );
}

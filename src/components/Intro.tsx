import Image from "next/image";
import { Fragment } from "react";
import { useLocale, useTranslations } from "next-intl";
import { PreviewLink } from "@/components/PreviewLink";
import { RotatingWord } from "@/components/RotatingWord";
import { Sticker } from "@/components/Sticker";
import { getExperience } from "@/data/experience";
import { site } from "@/data/site";

const previousWork = [
  { key: "Poxyram Studio", name: "Poxyram", tilt: 1.5 },
  { key: "LM SOLUCIONES SAS", name: "LM Soluciones", tilt: -1 },
];

export function Intro() {
  const t = useTranslations("intro");
  const locale = useLocale();
  const experience = getExperience(locale);

  return (
    <header>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <Image src={site.avatar} alt={`${site.name} portrait`} width={64} height={64} priority className="size-16 rounded-full border border-border object-cover grayscale" />
          <div className="flex flex-col">
            <p className="text-sm font-medium text-foreground">{site.name}</p>
            <p className="text-xs text-muted-foreground">{site.email}</p>
          </div>
        </div>
      </div>
      <h1 className="max-w-xl text-pretty text-display leading-[1.45] font-medium tracking-[-0.04em] text-foreground sm:text-display-lg">
        {t("headlinePrefix")} <RotatingWord /><br /> {t("headlineSuffix")}<span className="text-highlight">.</span>
      </h1>
      <p className="mt-6 text-body leading-7 text-neutral-400">{t("intro")}</p>
      <p className="mt-3 text-body leading-7 text-neutral-400">
        {t("currentWorkPrefix")}{" "}
        <PreviewLink
          href={site.currentWork.href}
          preview={{ image: "/previews/talentlylab.png", logo: site.currentWork.image, title: t("currentWorkPreviewTitle"), description: t("currentWorkPreviewDescription") }}
        >
          <Sticker logo={site.currentWork.image} name={site.currentWork.name} tilt={-2} />
        </PreviewLink>,{" "}
        {t("currentWorkDescription")}
      </p>
      <p className="mt-3 text-body leading-7 text-neutral-400">
        {t("previouslyAt")}{" "}
        {previousWork.map((entry, index) => {
          const item = experience.find((e) => e.company === entry.key);
          if (!item?.href || !item.roles[0]) return null;
          return (
            <Fragment key={entry.key}>
              {index > 0 ? " & " : ""}
              <PreviewLink href={item.href} preview={{ title: item.company, description: `${item.roles[0].role} · ${item.period}`, image: item.previewImage, logo: item.logo }}>
                <Sticker logo={item.logo} name={entry.name} tilt={entry.tilt} />
              </PreviewLink>
            </Fragment>
          );
        })}
        {"."}
      </p>
    </header>
  );
}

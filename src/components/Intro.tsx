import Image from "next/image";
import { useTranslations } from "next-intl";
import { RotatingWord } from "@/components/RotatingWord";
import { site } from "@/data/site";

export function Intro() {
  const t = useTranslations("intro");

  return (
    <header>
      <div className="mb-8 flex items-center gap-4">
        <Image src={site.avatar} alt={`${site.name} portrait`} width={64} height={64} priority className="size-16 rounded-full border border-border object-cover grayscale" />
        <div>
          <p className="text-sm font-medium text-foreground">{site.name}</p>
          <p className="mt-1 text-xs text-muted-foreground">{t("title")}</p>
        </div>
      </div>
      <h1 className="max-w-xl text-pretty text-[28px] leading-[1.45] font-medium tracking-[-0.04em] text-foreground sm:text-[34px]">
        {t("headlinePrefix")} <RotatingWord /><br className="hidden sm:block" /> {t("headlineSuffix")}<span className="text-highlight">.</span>
      </h1>
      <p className="mt-6 text-[15px] leading-7 text-neutral-400">{t("intro")}</p>
      <p className="mt-3 text-[15px] leading-7 text-neutral-400">
        {t("currentWorkPrefix")}{" "}
        <a className="inline-flex items-center gap-1.5 rounded-md bg-muted px-1.5 py-px text-sm font-medium text-foreground hover:bg-accent" href={site.currentWork.href} target="_blank" rel="noopener noreferrer">
          <Image aria-hidden="true" src={site.currentWork.image} alt="" width={14} height={14} />
          {site.currentWork.name}
        </a>.<br className="hidden sm:block" /> {t("currentWorkDescription")}
      </p>
    </header>
  );
}

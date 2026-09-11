import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export function NotFoundContent() {
  const t = useTranslations("notFound");
  const locale = useLocale();
  return (
    <div className="flex flex-col items-start">
      <p className="eyebrow">404</p>
      <h1 className="page-title mt-4">{t("title")}</h1>
      <p className="mt-5 max-w-sm text-sm leading-7 text-neutral-400">{t("description")}</p>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link href={`/${locale}`} className="inline-flex items-center rounded-lg bg-muted px-4 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 ease-out hover:bg-accent">
          {t("backToOverview")}
        </Link>
        <Link href={`/${locale}/writing`} className="text-sm text-muted-foreground underline underline-offset-4 transition-colors duration-200 ease-out hover:text-foreground">
          {t("readWriting")}
        </Link>
      </div>
    </div>
  );
}

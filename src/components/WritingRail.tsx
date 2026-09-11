import Link from "next/link";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/Icon";
import { getPosts, readingMinutes } from "@/data/writing";

export function WritingRail({ locale }: Readonly<{ locale: string }>) {
  const t = useTranslations("writingRail");
  const tArticle = useTranslations("article");
  const posts = getPosts(locale).slice(0, 4);

  return (
    <aside aria-label="Writing index" className="hidden border-l border-rail lg:block">
      <div className="sticky top-0 flex min-h-dvh flex-col px-6 py-10">
        <Link href={`/${locale}/writing`} className="flex items-center justify-between text-xs font-medium text-foreground">
          {t("title")} <Icon name="writing" />
        </Link>
        <p className="mt-3 text-xs leading-6 text-muted-foreground">{t("description")}</p>
        <div className="mt-12">
          <h2 className="text-xs font-medium text-foreground">{t("recentWriting")}</h2>
        </div>
        <ul className="mt-3 flex flex-col gap-5">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/${locale}/writing/${post.slug}`} className="group flex flex-col">
                <span className="text-pretty text-[13px] leading-6 font-normal text-foreground underline decoration-transparent underline-offset-4 transition-[text-decoration-color] group-hover:decoration-foreground/30 group-focus-visible:decoration-foreground/30">{post.title}</span>
                <span className="mt-1 block text-[11px] text-muted-foreground transition-colors group-hover:text-neutral-400">{readingMinutes(post)} {tArticle("minRead")}{post.sample ? " \u00b7 Sample" : ""}</span>
              </Link>
            </li>
          ))}
        </ul>
        {posts.length === 0 ? <p className="mt-5 text-sm text-muted-foreground">{t("empty")}</p> : null}
        <Link href={`/${locale}/writing`} className="mt-5 inline-flex items-center gap-2 text-xs text-neutral-300 transition-colors duration-200 ease-out hover:text-white">{t("allWriting")} <Icon name="arrow" className="size-3.5" /></Link>
        <div className="mt-auto pt-16">
          <p className="text-xs leading-6 text-muted-foreground">{t("workInProgress")}<br />{t("byDesign")}</p>
        </div>
      </div>
    </aside>
  );
}

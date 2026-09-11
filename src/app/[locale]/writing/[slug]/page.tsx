import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { SiteShell } from "@/components/SiteShell";
import { getPost, getPosts, formatDate, readingMinutes, type ArticleBlock } from "@/data/writing";
import { getSiteUrl, site } from "@/data/site";
import { routing } from "@/i18n/routing";

type Props = Readonly<{ params: Promise<{ locale: string; slug: string }> }>;

function blockKey(block: ArticleBlock): string {
  if (block.type === "heading") return block.id;
  if (block.type === "list") return block.items.join("");
  return block.text;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getPosts(locale).map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug, locale);
  if (!post) return {};
  const siteUrl = getSiteUrl();
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: siteUrl ? `/${locale}/writing/${post.slug}` : undefined },
    robots: { index: site.indexable && !post.sample, follow: site.indexable && !post.sample },
    openGraph: { title: post.title, description: post.description },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default async function WritingPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPost(slug, locale);
  if (!post) notFound();
  const t = await getTranslations("article");

  const morePosts = getPosts(locale).filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <SiteShell locale={locale}>
      <Link href={`/${locale}/writing`} className="text-xs text-muted-foreground transition-colors duration-200 ease-out hover:text-foreground">&larr; {t("back")}</Link>
      <article className="mt-10">
        <h1 className="page-title">{post.title}</h1>
        <p className="mt-4 text-sm text-muted-foreground">{formatDate(post.date, locale)} &middot; {readingMinutes(post)} {t("minRead")}{post.sample ? " \u00b7 Sample" : ""}</p>
        {post.sample ? <p className="mt-5 rounded-lg border border-rail bg-muted/40 px-4 py-3 text-xs leading-6 text-muted-foreground">{t("sampleNotice")}</p> : null}
        <div className="article-body mt-8">
          {post.body.map((block) => {
            const key = blockKey(block);
            switch (block.type) {
              case "paragraph": return <p key={key}>{block.text}</p>;
              case "heading": return <h2 key={key} id={block.id}>{block.text}</h2>;
              case "quote": return <blockquote key={key}>{block.text}</blockquote>;
              case "list": return <ul key={key}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
              case "code": return <figure key={key}><figcaption className="mb-2 text-[10px] text-muted-foreground">{block.language}</figcaption><pre><code>{block.text}</code></pre></figure>;
              default: return null;
            }
          })}
        </div>
        <p className="mt-12 text-sm text-muted-foreground">{t("thanksForReading")}</p>
      </article>
      {morePosts.length > 0 ? (
        <section aria-labelledby="read-next-heading" className="mt-12">
          <h2 id="read-next-heading" className="section-title">{t("keepReading")}</h2>
          <div className="mt-6 flex flex-col gap-5">
            {morePosts.map((p) => (
              <Link key={p.slug} href={`/${locale}/writing/${p.slug}`} className="group flex flex-col">
                <h3 className="text-pretty text-[15px] leading-6 font-normal tracking-tight text-foreground underline decoration-transparent underline-offset-4 transition-[text-decoration-color] group-hover:decoration-foreground/30">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-neutral-300">{p.description}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </SiteShell>
  );
}

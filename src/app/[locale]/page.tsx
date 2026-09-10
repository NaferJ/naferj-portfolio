import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { AIAgents } from "@/components/AIAgents";
import { Contributions } from "@/components/Contributions";
import { Intro } from "@/components/Intro";
import { PostList } from "@/components/PostList";
import { Projects } from "@/components/Projects";
import { SiteShell } from "@/components/SiteShell";
import { getPosts } from "@/data/writing";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = getPosts().slice(0, 2);

  return (
    <SiteShell locale={locale}>
      <div className="space-y-12">
        <Intro />
        <Contributions />
        <AIAgents />
        <Projects preview locale={locale} />
        <WritingPreview posts={posts} locale={locale} />
      </div>
    </SiteShell>
  );
}

function WritingPreview({ posts, locale }: { posts: ReturnType<typeof getPosts>; locale: string }) {
  const t = useTranslations("sections");
  const tWriting = useTranslations("writing");
  return (
    <section aria-labelledby="writing-heading">
      <div className="flex items-center justify-between gap-4">
        <h2 id="writing-heading" className="section-title">{t("writing")}</h2>
      </div>
      <div className="mt-6"><PostList posts={posts} locale={locale} /></div>
      {posts.length === 0 ? <p className="mt-6 text-sm text-muted-foreground">{tWriting("empty")}</p> : null}
    </section>
  );
}

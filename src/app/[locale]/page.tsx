import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { AIAgents } from "@/components/AIAgents";
import { Contributions } from "@/components/Contributions";
import { Intro } from "@/components/Intro";
import { PostList } from "@/components/PostList";
import { Projects } from "@/components/Projects";
import { SiteShell } from "@/components/SiteShell";
import { getPosts } from "@/data/writing";

function ContributionsSkeleton() {
  return (
    <section id="contributions" aria-label="Contributions loading">
      <div className="rounded-2xl border border-rail bg-[#111111] p-5">
        <div className="mb-5 flex items-center gap-3">
          <div className="h-4 w-48 animate-pulse rounded bg-rail" />
          <div className="ml-auto h-3 w-20 animate-pulse rounded bg-rail" />
        </div>
        <div className="h-28 animate-pulse rounded bg-rail" />
        <div className="mt-3 flex items-center justify-between">
          <div className="h-3 w-24 animate-pulse rounded bg-rail" />
          <div className="h-3 w-32 animate-pulse rounded bg-rail" />
        </div>
      </div>
    </section>
  );
}

export default async function Home({ params }: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = getPosts(locale).slice(0, 2);

  return (
    <SiteShell locale={locale}>
      <div className="space-y-12">
        <Intro />
        <Suspense fallback={<ContributionsSkeleton />}>
          <Contributions />
        </Suspense>
        <AIAgents />
        <Projects locale={locale} preview />
        <WritingPreview posts={posts} locale={locale} />
      </div>
    </SiteShell>
  );
}

function WritingPreview({ posts, locale }: Readonly<{ posts: ReturnType<typeof getPosts>; locale: string }>) {
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

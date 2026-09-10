import { useTranslations } from "next-intl";
import { PostList } from "@/components/PostList";
import type { Post } from "@/data/writing";

export function WritingIndex({ posts, locale = "en" }: { posts: Post[]; locale?: string }) {
  const t = useTranslations("writing");
  return (
    <div className="mt-8">
      <PostList posts={posts} locale={locale} />
      {posts.length === 0 ? <p className="mt-6 text-sm text-muted-foreground">{t("empty")}</p> : null}
    </div>
  );
}

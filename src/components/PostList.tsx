import Link from "next/link";
import { type Post } from "@/data/writing";

export function PostList({ posts, locale = "en" }: Readonly<{ posts: Post[]; locale?: string }>) {
  return (
    <div className="flex flex-col gap-5">
      {posts.map((post) => (
        <Link key={post.slug} href={`/${locale}/writing/${post.slug}`} className="group flex flex-col">
          <h3 className="text-pretty text-[15px] leading-6 font-normal tracking-tight text-foreground underline decoration-transparent underline-offset-4 transition-[text-decoration-color] group-hover:decoration-foreground/30 group-focus-visible:decoration-foreground/30">{post.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-neutral-300">{post.description}</p>
        </Link>
      ))}
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { type Post } from "@/data/writing";

export function PostList({ posts, locale = "en", revealRows = false }: Readonly<{ posts: Post[]; locale?: string; revealRows?: boolean }>) {
  return (
    <div className="flex flex-col gap-5">
      {posts.map((post, index) => {
        const row = (
          <Link href={`/${locale}/writing/${post.slug}`} className="group flex items-start gap-4">
            {post.cover ? (
              <Image src={post.cover.src} alt="" width={56} height={56} className="size-14 shrink-0 rounded-lg border border-rail object-cover" />
            ) : null}
            <span className="flex min-w-0 flex-col">
              <h3 className="text-pretty text-body leading-6 font-normal tracking-tight text-foreground underline decoration-transparent underline-offset-4 transition-[text-decoration-color] group-hover:decoration-foreground/30 group-focus-visible:decoration-foreground/30">{post.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-neutral-300">{post.description}</p>
            </span>
          </Link>
        );
        return revealRows ? <Reveal key={post.slug} index={Math.min(index, 6)}>{row}</Reveal> : <div key={post.slug}>{row}</div>;
      })}
    </div>
  );
}

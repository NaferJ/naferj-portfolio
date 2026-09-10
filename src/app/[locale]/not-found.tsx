import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";

export default function NotFound() {
  return (
    <SiteShell locale="en">
      <div className="py-16">
        <h1 className="page-title">Nothing here. Yet.</h1>
        <p className="mt-5 max-w-sm text-sm leading-7 text-neutral-400">This page may have moved, or the link might not be quite right. There is still plenty to explore.</p>
        <div className="mt-8 flex flex-wrap gap-5 text-sm">
          <Link href="/en" className="text-foreground underline underline-offset-4">Back to the overview</Link>
          <Link href="/en/writing" className="text-muted-foreground hover:text-foreground">Read writing &rarr;</Link>
        </div>
      </div>
    </SiteShell>
  );
}

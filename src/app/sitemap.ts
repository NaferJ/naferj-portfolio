import type { MetadataRoute } from "next";
import { getSiteUrl, site } from "@/data/site";
import { getPosts } from "@/data/writing";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = getSiteUrl();
  if (!url || !site.indexable) return [];
  const pages = [
    "",
    "experience",
    "projects",
    "writing",
  ];
  return [
    ...routing.locales.flatMap((locale) =>
      pages.map((page) => ({ url: new URL(`/${locale}${page ? `/${page}` : ""}`, url).href }))
    ),
    ...routing.locales.flatMap((locale) =>
      getPosts(locale).filter((post) => !post.sample).map((post) => ({ url: new URL(`/${locale}/writing/${post.slug}`, url).href, lastModified: post.date }))
    ),
  ];
}

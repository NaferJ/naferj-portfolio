import type { MetadataRoute } from "next";
import { getSiteUrl, site } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  const url = getSiteUrl();
  const indexable = site.indexable && Boolean(url);
  return {
    rules: { userAgent: "*", ...(indexable ? { allow: "/" } : { disallow: "/" }) },
    sitemap: indexable && url ? new URL("/sitemap.xml", url).href : undefined,
  };
}

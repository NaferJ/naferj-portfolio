import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { getDescription, getSiteUrl, site } from "@/data/site";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const title = messages.intro.title;
  const description = getDescription(locale);
  const siteUrl = getSiteUrl();
  const twitterHandle = (() => {
    try {
      return site.twitter ? new URL(site.twitter).pathname.replace(/\//g, "") : undefined;
    } catch {
      return undefined;
    }
  })();
  const canonical = `/${locale}`;
  return {
    metadataBase: siteUrl ?? new URL("http://localhost:3000"),
    title: { default: `${site.name} · ${title}`, template: `%s · ${site.name}` },
    description,
    authors: [{ name: site.name }],
    robots: { index: site.indexable, follow: site.indexable },
    alternates: { canonical: siteUrl ? canonical : undefined },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: `${site.name} · ${title}`,
      description,
      locale: locale === "es" ? "es_ES" : "en_US",
    },
    twitter: { card: "summary_large_image", site: twitterHandle ? `@${twitterHandle}` : undefined, creator: twitterHandle ? `@${twitterHandle}` : undefined },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <a href="#main-content" className="skip-link">Skip to content</a>
      {children}
    </NextIntlClientProvider>
  );
}

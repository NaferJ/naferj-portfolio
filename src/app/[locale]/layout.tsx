import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { getSiteUrl, site } from "@/data/site";
import { routing } from "@/i18n/routing";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const title = messages.intro.title;
  return {
    metadataBase: getSiteUrl() ?? new URL("http://localhost:3000"),
    title: { default: `${site.name} — ${title}`, template: `%s · ${site.name}` },
    description: site.description,
    authors: [{ name: site.name }],
    robots: { index: site.indexable, follow: site.indexable },
    alternates: { canonical: getSiteUrl() ? `/${locale}` : undefined },
    openGraph: { type: "website", siteName: site.name, title: site.name, description: site.description, locale: locale === "es" ? "es_ES" : "en_US" },
    twitter: { card: "summary_large_image", title: site.name, description: site.description },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <a href="#main-content" className="skip-link">Skip to content</a>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NotFoundContent } from "@/components/NotFoundContent";
import { SiteShell } from "@/components/SiteShell";
import { routing } from "@/i18n/routing";
import { inter } from "@/lib/fonts";

export default async function NotFound() {
  const headersList = await headers();
  const headerLocale = headersList.get("x-next-intl-locale");
  const isValidLocale = headerLocale !== null && routing.locales.includes(headerLocale as "en" | "es");
  const locale = isValidLocale ? headerLocale : routing.defaultLocale;
  setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a href="#main-content" className="skip-link">Skip to content</a>
          <SiteShell locale={locale}>
            <NotFoundContent />
          </SiteShell>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

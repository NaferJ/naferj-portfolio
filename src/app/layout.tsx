import { routing } from "@/i18n/routing";
import "./globals.css";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

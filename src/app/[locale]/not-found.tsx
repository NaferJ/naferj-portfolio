import { useLocale } from "next-intl";
import { NotFoundContent } from "@/components/NotFoundContent";
import { SiteShell } from "@/components/SiteShell";

export default function NotFound() {
  const locale = useLocale();
  return (
    <SiteShell locale={locale}>
      <NotFoundContent />
    </SiteShell>
  );
}

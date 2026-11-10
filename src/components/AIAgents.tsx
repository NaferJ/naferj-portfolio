"use client";

import { useLocale, useTranslations } from "next-intl";
import { PreviewLink } from "@/components/PreviewLink";
import { SectionHeading } from "@/components/SectionHeading";
import { getAgentItems } from "@/data/ai-agents";

export function AIAgents() {
  const t = useTranslations("sections");
  const locale = useLocale();
  const agentItems = getAgentItems(locale);

  return (
    <section id="ai-agents" aria-labelledby="ai-agents-heading">
      <SectionHeading id="ai-agents-heading" icon="bot">{t("aiAgents")}</SectionHeading>
      <ul className="mt-6 flex flex-col gap-5">
        {agentItems.map((item) => (
          <li key={item.name} className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-normal leading-6 text-foreground">
                {item.href ? (
                  <PreviewLink href={item.href} preview={item.preview} className="underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-200 ease-out hover:decoration-foreground/30">{item.name}</PreviewLink>
                ) : (
                  item.name
                )}
                {item.sample ? <span className="sample-badge ml-2">Sample</span> : null}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">{item.status}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

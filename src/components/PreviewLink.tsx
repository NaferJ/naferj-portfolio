"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { describeLink } from "@/lib/link-preview";

type Preview = {
  title?: string;
  description?: string;
  image?: string;
  logo?: string;
};

type CardPosition = {
  top: number;
  left: number;
  placement: "top" | "bottom";
};

export function PreviewLink({
  href,
  children,
  preview,
  className,
  ariaLabel,
  block = false,
  announce = true,
}: Readonly<{
  href: string;
  children: ReactNode;
  preview?: Preview;
  className?: string;
  ariaLabel?: string;
  block?: boolean;
  announce?: boolean;
}>) {
  const t = useTranslations("preview");
  const [open, setOpen] = useState(false);
  const [cardPos, setCardPos] = useState<CardPosition | null>(null);
  const tooltipId = useId();
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const cardRef = useRef<HTMLSpanElement>(null);
  const openTimer = useRef<number | undefined>(undefined);
  const closeTimer = useRef<number | undefined>(undefined);
  const hovered = useRef(false);

  const link = describeLink(href);
  const title = preview?.title ?? (() => {
    switch (link.kind) {
      case "pullRequest": return t("pullRequest", { number: link.number });
      case "issue": return t("issue", { number: link.number });
      case "compare": return t("compare", { range: link.range });
      case "repository": return t("repository");
      default: return link.domain;
    }
  })();
  const detail = preview?.description ?? (link.kind === "external" ? t("externalLink") : t("inRepo", { repo: link.repo }));

  const position = useCallback(() => {
    const card = cardRef.current;
    const anchor = anchorRef.current;
    if (!card || !anchor) return;
    const rect = anchor.getBoundingClientRect();
    const cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight;
    const left = Math.min(rect.left, Math.max(8, window.innerWidth - 8 - cardWidth));
    let placement: CardPosition["placement"] = "bottom";
    let top = rect.bottom;
    if (top + cardHeight > window.innerHeight - 8) {
      placement = "top";
      top = Math.max(8, rect.top - cardHeight);
    }
    setCardPos({ top, left, placement });
  }, []);

  useLayoutEffect(() => {
    if (open) position();
  }, [open, position]);

  useEffect(() => {
    if (!open) return;
    let frame = 0;
    const schedule = () => {
      if (frame !== 0) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        position();
      });
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("scroll", schedule, { passive: true, capture: true });
    window.addEventListener("resize", schedule, { passive: true });
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("scroll", schedule, { capture: true });
      window.removeEventListener("resize", schedule);
      document.removeEventListener("keydown", onKeyDown);
      if (frame !== 0) cancelAnimationFrame(frame);
    };
  }, [open, position]);

  useEffect(() => () => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
  }, []);

  const Wrapper = block ? "div" : "span";
  const placement = cardPos?.placement ?? "bottom";

  return (
    <Wrapper
      className={block ? "relative" : "relative inline-block"}
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        hovered.current = true;
        window.clearTimeout(closeTimer.current);
        openTimer.current = window.setTimeout(() => setOpen(true), 120);
      }}
      onPointerLeave={() => {
        hovered.current = false;
        window.clearTimeout(openTimer.current);
        closeTimer.current = window.setTimeout(() => setOpen(false), 120);
      }}
    >
      <a
        ref={anchorRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={ariaLabel}
        aria-describedby={announce && open ? tooltipId : undefined}
        onFocus={(event) => {
          if (!event.currentTarget.matches(":focus-visible")) return;
          window.clearTimeout(closeTimer.current);
          setOpen(true);
        }}
        onBlur={() => {
          if (hovered.current) return;
          closeTimer.current = window.setTimeout(() => setOpen(false), 120);
        }}
      >
        {children}
        {ariaLabel ? null : <span className="sr-only"> {t("opensInNewTab")}</span>}
      </a>
      <span
        ref={cardRef}
        id={announce ? tooltipId : undefined}
        role={announce ? "tooltip" : undefined}
        aria-hidden={announce ? undefined : true}
        className={`fixed z-50 block w-72 max-w-[calc(100vw-2rem)] transition-[opacity,transform,visibility] duration-180 ease-out ${placement === "bottom" ? "pt-2" : "pb-2"} ${open ? "visible opacity-100" : "invisible opacity-0"}`}
        style={{ top: cardPos?.top ?? 0, left: cardPos?.left ?? 0, transform: `translateY(${open ? 0 : 4}px) scale(${open ? 1 : 0.98})` }}
      >
        <span className="block overflow-hidden rounded-xl border border-rail bg-[#111111] shadow-[0_16px_40px_-12px_rgb(0_0_0/0.9)]">
          {preview?.image ? (
            <span className="block border-b border-rail">
              <Image src={preview.image} alt="" width={288} height={180} className="aspect-[16/10] w-full object-cover object-top" />
            </span>
          ) : null}
          <span className="block p-3">
            <span className="flex items-center gap-1.5">
              {preview?.logo ? <Image src={preview.logo} alt="" width={16} height={16} className="h-3.5 w-auto rounded-[3px]" /> : null}
              <span className="text-sm font-medium text-foreground">{title}</span>
            </span>
            <span className="mt-0.5 block text-xs text-muted-foreground">{detail}</span>
            <span className="mt-1.5 block font-mono text-2xs text-muted-foreground/60">{link.domain}</span>
          </span>
        </span>
      </span>
    </Wrapper>
  );
}

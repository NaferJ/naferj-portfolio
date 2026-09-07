import Image from "next/image";
import { RotatingWord } from "@/components/RotatingWord";

const paragraphStyles = "text-[15px] leading-7 text-neutral-400";

export function Intro() {
  return (
    <header className="space-y-4">
      <h1 className="text-pretty text-xl font-normal leading-7 tracking-[-0.015em] text-neutral-100">
        <strong className="font-semibold">NaferJ</strong> builds <RotatingWord /> and
        ships products.
      </h1>
      <p className={paragraphStyles}>
        Orchestrator, engineer, technical lead, creator and author. Currently
        spearheading backend development at{" "}
        <a
          className="group inline-flex items-center gap-1.5 rounded-[4px] bg-white/[0.06] px-1.5 py-px text-sm font-medium text-neutral-100 transition-colors hover:bg-white/[0.1]"
          href="https://www.instagram.com/poxyram/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden="true"
            src="/brands/instagram.png"
            alt=""
            width={14}
            height={14}
          />
          <span>Poxyram Studio</span>
        </a>{" "}
        — backend engineering, QA, CI/CD, server setup, and pretty much everything
        in between.
      </p>
    </header>
  );
}

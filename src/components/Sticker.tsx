import Image from "next/image";
import type { CSSProperties } from "react";

export function Sticker({ logo, name, tilt = 0, logoAspect = 1 }: Readonly<{ logo: string; name: string; tilt?: number; logoAspect?: number }>) {
  return (
    <span
      className="sticker inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-[#171717] px-1.5 py-0.5 align-[-0.2em] text-sm font-medium text-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_4px_12px_-4px_rgb(0_0_0/0.7)]"
      style={{ "--tilt": `${tilt}deg` } as CSSProperties}
    >
      <Image src={logo} alt="" width={Math.round(16 * logoAspect)} height={16} className="h-4 w-auto" />
      {name}
    </span>
  );
}

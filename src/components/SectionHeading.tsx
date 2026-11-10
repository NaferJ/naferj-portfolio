import { MotionIcon, type MotionIconName } from "@/components/MotionIcon";
import type { ReactNode } from "react";

export function SectionHeading({ id, icon, children, as: Heading = "h2" }: Readonly<{ id: string; icon: MotionIconName; children: ReactNode; as?: "h1" | "h2" }>) {
  return (
    <div className="motion-trigger flex items-center gap-2">
      <MotionIcon name={icon} className={`${Heading === "h1" ? "size-6" : "size-5"} text-muted-foreground transition-colors duration-300`} />
      <Heading id={id} className={Heading === "h1" ? "page-title" : "section-title"}>{children}</Heading>
    </div>
  );
}

"use client";

import { useEffect } from "react";

export function ScrollEdges() {
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const root = document.documentElement;
      root.toggleAttribute("data-scrolled", window.scrollY > 8);
      root.toggleAttribute("data-at-end", window.innerHeight + window.scrollY >= root.scrollHeight - 8);
    };
    const schedule = () => {
      if (frame !== 0) return;
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame !== 0) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}

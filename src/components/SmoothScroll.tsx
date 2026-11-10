"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const create = () => {
      if (motionPreference.matches || lenisRef.current) return;
      lenisRef.current = new Lenis({ autoRaf: true, lerp: 0.09, anchors: false });
      lenisRef.current.scrollTo(window.scrollY, { immediate: true });
    };
    const destroy = () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
    const handleChange = () => {
      if (motionPreference.matches) destroy();
      else create();
    };
    const handlePopstate = () => {
      requestAnimationFrame(() => lenisRef.current?.scrollTo(window.scrollY, { immediate: true }));
    };
    create();
    motionPreference.addEventListener("change", handleChange);
    window.addEventListener("popstate", handlePopstate);
    return () => {
      destroy();
      motionPreference.removeEventListener("change", handleChange);
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  return null;
}

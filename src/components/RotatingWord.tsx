"use client";

import { useEffect, useState } from "react";

const words = ["software", "workspaces", "documentation", "designs"] as const;
const rotationInterval = 2800;
const exitDuration = 220;
const enterDuration = 620;

type Phase = "visible" | "exiting" | "entering";

type RotationState = {
  index: number;
  phase: Phase;
};

export function RotatingWord() {
  const [rotation, setRotation] = useState<RotationState>({
    index: 0,
    phase: "entering",
  });

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let interval: number | undefined;

    const stopRotation = () => {
      if (interval !== undefined) window.clearInterval(interval);
      interval = undefined;
    };

    const startRotation = () => {
      if (motionPreference.matches || interval !== undefined) return;
      interval = window.setInterval(() => {
        setRotation((current) =>
          current.phase === "visible"
            ? { ...current, phase: "exiting" }
            : current,
        );
      }, rotationInterval);
    };

    const handleMotionChange = () => {
      if (motionPreference.matches) stopRotation();
      else startRotation();
    };

    startRotation();
    motionPreference.addEventListener("change", handleMotionChange);

    return () => {
      stopRotation();
      motionPreference.removeEventListener("change", handleMotionChange);
    };
  }, []);

  useEffect(() => {
    if (rotation.phase === "visible") return;

    const duration = rotation.phase === "exiting" ? exitDuration : enterDuration;
    const timeout = window.setTimeout(() => {
      setRotation((current) =>
        current.phase === "exiting"
          ? { index: (current.index + 1) % words.length, phase: "entering" }
          : { ...current, phase: "visible" },
      );
    }, duration);

    return () => window.clearTimeout(timeout);
  }, [rotation.phase]);

  return (
    <strong className="rotating-word-frame" aria-label="software">
      <span
        aria-hidden="true"
        className={`rotating-word rotating-word-${rotation.phase}`}
      >
        {words[rotation.index]}
        <span className="rotating-word-underline" />
      </span>
    </strong>
  );
}

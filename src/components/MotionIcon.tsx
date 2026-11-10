export type MotionIconName = "home" | "experience" | "projects" | "writing" | "bot" | "globe";

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function MotionIcon({ name, className = "size-4" }: Readonly<{ name: MotionIconName; className?: string }>) {
  const classNames = `motion-icon motion-icon-${name} ${className}`;
  switch (name) {
    case "home":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className={classNames} {...strokeProps}>
          <path className="mi-roof" d="m3 10 9-7 9 7" />
          <path className="mi-body" d="M5 9v11h5v-6h4v6h5V9" />
        </svg>
      );
    case "experience":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className={classNames} {...strokeProps}>
          <path className="mi-handle" d="M8 6V4h8v2" />
          <path className="mi-case" d="M3 7h18v13H3zM3 12a24 24 0 0 0 18 0M10 12v3h4v-3" />
        </svg>
      );
    case "projects":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className={classNames} {...strokeProps}>
          <path className="mi-tl" d="M4 4h6v6H4z" />
          <path className="mi-tr" d="M14 4h6v6h-6z" />
          <path className="mi-bl" d="M4 14h6v6H4z" />
          <path className="mi-br" d="M14 14h6v6h-6z" />
        </svg>
      );
    case "writing":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className={classNames} {...strokeProps}>
          <path className="mi-left" d="M4 4h7a3 3 0 0 1 3 3v14a4 4 0 0 0-4-2H4z" />
          <path className="mi-right" d="M14 7a3 3 0 0 1 3-3h3v15h-2a4 4 0 0 0-4 2" />
        </svg>
      );
    case "bot":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className={classNames} fill="currentColor">
          <path className="mi-bot" d="M11.999 0c-2.25 0-4.5.06-6.6.21a5.57 5.57 0 00-5.19 5.1c-.24 3.21-.27 6.39-.06 9.6a5.644 5.644 0 005.7 5.19h3.15v-3.9h-3.15c-.93.03-1.74-.63-1.83-1.56-.18-3-.15-6 .06-9 .06-.84.72-1.47 1.56-1.53 2.04-.15 4.2-.21 6.36-.21s4.32.09 6.36.18c.81.06 1.5.69 1.56 1.53.24 3 .24 6 .06 9-.12.93-.9 1.62-1.83 1.59h-3.15l-6 3.9V24l6-3.9h3.15c2.97.03 5.46-2.25 5.7-5.19.21-3.18.18-6.39-.03-9.57a5.57 5.57 0 00-5.19-5.1c-2.13-.18-4.38-.24-6.63-.24zm-5.04 8.76c-.36 0-.66.3-.66.66v2.34c0 .33.18.63.48.78 1.62.78 3.42 1.2 5.22 1.26 1.8-.06 3.6-.48 5.22-1.26.3-.15.48-.45.48-.78V9.42c0-.09-.03-.15-.09-.21a.648.648 0 00-.87-.36c-1.5.66-3.12 1.02-4.77 1.05-1.65-.03-3.27-.42-4.77-1.08a.566.566 0 00-.24-.06z" />
        </svg>
      );
    case "globe":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className={classNames} {...strokeProps}>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <ellipse className="mi-meridian" cx="12" cy="12" rx="4.5" ry="10" />
        </svg>
      );
  }
}

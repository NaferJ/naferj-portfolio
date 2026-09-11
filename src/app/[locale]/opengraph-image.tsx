import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getDescription, site } from "@/data/site";
import { projects } from "@/data/projects";
import { postsEn } from "@/data/writing";
import { experienceEn } from "@/data/experience";

export const revalidate = 86400;
export const alt = `${site.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const rail = "#242424";
const muted = "#666666";

const socials = [
  { name: "GitHub", path: "M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z" },
  { name: "LinkedIn", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { name: "X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  { name: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
];

function getExperienceYears(): number {
  const earliestYear = experienceEn.reduce((min, exp) => {
    const match = exp.period.match(/(\d{4})/);
    return match ? Math.min(min, Number(match[1])) : min;
  }, new Date().getFullYear());
  return new Date().getFullYear() - earliestYear;
}

const stats = [
  { label: "projects", value: `${projects.length}` },
  { label: "posts", value: `${postsEn.length}` },
  { label: "experience", value: `${getExperienceYears()} yrs` },
  { label: "locale", value: "EN / ES" },
];

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const description = getDescription(locale);
  const [lead, ...rest] = description.split(". ");
  const body = rest.join(". ");

  const [avatar, interRegular, interMedium, interBold] = await Promise.all([
    readFile(join(process.cwd(), "public/profile/avatar.png")),
    readFile(join(process.cwd(), "src/assets/fonts/Inter-Regular.ttf")),
    readFile(join(process.cwd(), "src/assets/fonts/Inter-Medium.ttf")),
    readFile(join(process.cwd(), "src/assets/fonts/Inter-Bold.ttf")),
  ]);
  const avatarSrc = `data:image/png;base64,${avatar.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        background: "#0a0a0a",
        color: "#ededed",
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", height: 96, borderBottom: `1px solid ${rail}` }}>
        <div style={{ display: "flex", flex: 1 }} />
        <div style={{ display: "flex", width: 300, borderLeft: `1px solid ${rail}` }} />
      </div>
      <div style={{ display: "flex", alignItems: "stretch", flex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", padding: "0 56px" }}>
          <div style={{ display: "flex", fontSize: 100, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>
            {site.name}
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 32, lineHeight: 1.5, marginTop: 24 }}>
            <div style={{ display: "flex", fontWeight: 500, color: "#ededed" }}>{`${lead}.`}</div>
            {body.length > 0 && <div style={{ display: "flex", color: "#9b9b9b", marginTop: 4 }}>{body}</div>}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 300, borderLeft: `1px solid ${rail}` }}>
          <img src={avatarSrc} alt="" width={140} height={140} style={{ borderRadius: 24, boxShadow: "0 0 60px 8px rgba(255,255,255,0.08)" }} />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "stretch", height: 120, borderTop: `1px solid ${rail}` }}>
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 32px",
              borderRight: `1px solid ${rail}`,
              flex: 1,
            }}
          >
            <div style={{ display: "flex", fontSize: 15, fontWeight: 500, letterSpacing: 2, color: muted }}>{stat.label.toUpperCase()}</div>
            <div style={{ display: "flex", fontSize: 40, fontWeight: 600, marginTop: 8 }}>{stat.value}</div>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 300, borderLeft: `1px solid ${rail}` }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 40 }}>
            {socials.map((s) => (
              <div key={s.name} style={{ display: "flex" }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill={muted}>
                  <path d={s.path} />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
        { name: "Inter", data: interMedium, weight: 500, style: "normal" },
        { name: "Inter", data: interBold, weight: 700, style: "normal" },
      ],
    },
  );
}

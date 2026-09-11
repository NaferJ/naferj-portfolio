import { ImageResponse } from "next/og";
import { getDescription, site } from "@/data/site";

export const revalidate = 86400;
export const alt = `${site.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const description = getDescription(locale);
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#0a0a0a", color: "#ededed", padding: "60px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", width: "100%", border: "1px solid #303030" }}>
        <div style={{ display: "flex", width: 90, borderRight: "1px solid #303030", justifyContent: "center", paddingTop: 40, fontSize: 22, color: "#b7c7a1" }}>{site.initials}.</div>
        <div style={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "center", padding: 60 }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 2, color: "#929292", maxWidth: 800 }}>{description}</div>
          <div style={{ display: "flex", fontSize: 84, letterSpacing: -4, marginTop: 35 }}>{site.name}<span style={{ color: "#b7c7a1" }}>.</span></div>
        </div>
      </div>
    </div>,
    size,
  );
}

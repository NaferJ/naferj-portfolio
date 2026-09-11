import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getDescription, site } from "@/data/site";
import enMessages from "../../../messages/en.json";
import esMessages from "../../../messages/es.json";

export const revalidate = 86400;
export const alt = `${site.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const description = getDescription(locale);
  const role = (locale === "es" ? esMessages : enMessages).intro.title;

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
        width: "100%",
        height: "100%",
        background: "#0a0a0a",
        color: "#ededed",
        padding: 44,
        fontFamily: "Inter",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          border: "1px solid #262626",
          borderRadius: 28,
          padding: "56px 64px",
          background: "linear-gradient(160deg, #0d0d0d 55%, #131a12 100%)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 27, color: "#8f8f8f" }}>
            <div style={{ width: 11, height: 11, borderRadius: 999, background: "#b7c7a1", marginRight: 16 }} />
            naferj.com
          </div>
          <div style={{ display: "flex", fontSize: 27, fontWeight: 500, color: "#b7c7a1" }}>{`${site.initials}.`}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={avatarSrc} alt="" width={150} height={150} style={{ borderRadius: 30, border: "1px solid #2c3325" }} />
            <div style={{ display: "flex", flexDirection: "column", marginLeft: 48 }}>
              <div style={{ display: "flex", fontSize: 98, fontWeight: 700, letterSpacing: -4 }}>
                {site.name}
                <span style={{ color: "#b7c7a1" }}>.</span>
              </div>
              <div style={{ display: "flex", fontSize: 38, fontWeight: 500, color: "#b7c7a1", marginTop: 12 }}>{role}</div>
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 29, color: "#9b9b9b", lineHeight: 1.45, marginTop: 46, maxWidth: 780 }}>
            {description}
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

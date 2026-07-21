import { ImageResponse } from "next/og";
import { site } from "@/lib/data";

export const runtime = "edge";
export const alt = "Haode Power — Reliable Power Solutions for Mining & Construction";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #060D1A 0%, #0B1F3A 60%, #14335E 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: "#F26522",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 800,
              color: "white",
            }}
          >
            H
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 2 }}>
            HAODE <span style={{ color: "#FF8A3D" }}>POWER</span>
          </div>
        </div>
        <div style={{ fontSize: 58, fontWeight: 800, lineHeight: 1.1, maxWidth: 900, display: "flex" }}>
          Reliable Power Solutions for Mining &amp; Construction
        </div>
        <div style={{ fontSize: 24, color: "rgba(255,255,255,0.7)", marginTop: 24, maxWidth: 800, display: "flex" }}>
          Diesel Generators &amp; Mobile Light Towers — Exporting Worldwide
        </div>
        <div style={{ fontSize: 20, color: "#FF8A3D", marginTop: 40, display: "flex" }}>{site.domain}</div>
      </div>
    ),
    { ...size }
  );
}

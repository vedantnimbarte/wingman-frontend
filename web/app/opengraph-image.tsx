import { ImageResponse } from "next/og";
import { product } from "@/content/product";

export const dynamic = "force-static";

export const alt = `Wingman: ${product.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#06060b",
          padding: 88,
          color: "#f5f6fa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
            <path d="M4 14.5 L12 5 L20 14.5" stroke="#6b78e8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.5 18.5 L12 13 L16.5 18.5" stroke="#8f9bff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
          </svg>
          <span style={{ fontSize: 34, fontWeight: 600, letterSpacing: -1 }}>wingman</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 72, fontWeight: 500, letterSpacing: -2.5, lineHeight: 1.05, maxWidth: 960 }}>
            {product.tagline}
          </div>
          <div style={{ fontSize: 28, color: "#8a90a6", maxWidth: 900, lineHeight: 1.45 }}>
            A terminal coding agent that reads code through your language server and checks its own edits.
          </div>
        </div>

        <div style={{ display: "flex", gap: 20, fontSize: 24, color: "#8a90a6" }}>
          <span>
            {product.license}, {product.version}
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}

import { ImageResponse } from "next/og";

export const alt = "Wingman — the open coding agent for your terminal";
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
          background: "#010102",
          padding: 80,
          color: "#f7f8f8",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
            <path d="M4 14.5 L12 5 L20 14.5" stroke="#5e6ad2" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.5 18.5 L12 13 L16.5 18.5" stroke="#828fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
          </svg>
          <span style={{ fontSize: 34, fontWeight: 600, letterSpacing: -1 }}>wingman</span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 76, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05 }}>
            <span>Your terminal&rsquo;s&nbsp;</span>
            <span style={{ color: "#5e6ad2" }}>wingman.</span>
          </div>
          <div style={{ fontSize: 30, color: "#8a8f98", maxWidth: 900, lineHeight: 1.4 }}>
            The open, provider-agnostic coding agent — 73+ LLM providers, one terminal, no lock-in.
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 24, color: "#62666d" }}>
          <span style={{ display: "flex", height: 10, width: 10, borderRadius: 10, background: "#5e6ad2" }} />
          <span>Open-source</span>
          <span>·</span>
          <span>73+ providers</span>
          <span>·</span>
          <span>MIT / Apache-2.0</span>
        </div>
      </div>
    ),
    { ...size },
  );
}

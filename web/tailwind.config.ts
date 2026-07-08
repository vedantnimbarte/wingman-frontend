import type { Config } from "tailwindcss";

/**
 * Design tokens from DESIGN.md (Linear-inspired dark marketing system).
 * Everything the site paints with lives here — components never hard-code hex.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    // Fixed breakpoints per DESIGN.md (min-width).
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      colors: {
        canvas: "#010102",
        surface: {
          1: "#08090a",
          2: "#101113",
          3: "#17181a",
          4: "#202123",
        },
        hairline: {
          DEFAULT: "#23252a",
          strong: "#31333a",
          tertiary: "#1a1b1e",
        },
        ink: {
          DEFAULT: "#f7f8f8",
          muted: "#d0d6e0",
          subtle: "#8a8f98",
          tertiary: "#62666d",
        },
        primary: {
          DEFAULT: "#5e6ad2",
          hover: "#828fff",
          focus: "#5e69d1",
        },
        "on-primary": "#f7f8f8",
        success: "#27a644",
        "inverse-canvas": "#ffffff",
        "inverse-ink": "#08090a",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "SF Pro Display", "-apple-system", "system-ui", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SF Mono", "Menlo", "monospace"],
      },
      // Type scale: [size, { lineHeight, letterSpacing, fontWeight }].
      // Display sizes use clamp() so 80px -> ~36px on mobile automatically.
      fontSize: {
        "display-xl": ["clamp(2.25rem, 5.5vw + 1rem, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "600" }],
        "display-lg": ["clamp(2rem, 3.5vw + 1rem, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "600" }],
        "display-md": ["clamp(1.75rem, 2vw + 1rem, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" }],
        headline: ["1.75rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
        "card-title": ["1.375rem", { lineHeight: "1.25", letterSpacing: "-0.018em", fontWeight: "500" }],
        subhead: ["1.25rem", { lineHeight: "1.4", letterSpacing: "-0.01em", fontWeight: "400" }],
        "body-lg": ["1.125rem", { lineHeight: "1.5", letterSpacing: "-0.005em", fontWeight: "400" }],
        body: ["1rem", { lineHeight: "1.5", letterSpacing: "-0.003em", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5", letterSpacing: "0", fontWeight: "400" }],
        caption: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0", fontWeight: "400" }],
        button: ["0.875rem", { lineHeight: "1.2", letterSpacing: "0", fontWeight: "500" }],
        eyebrow: ["0.8125rem", { lineHeight: "1.3", letterSpacing: "0.03em", fontWeight: "500" }],
        mono: ["0.8125rem", { lineHeight: "1.5", letterSpacing: "0", fontWeight: "400" }],
      },
      spacing: {
        section: "96px",
      },
      maxWidth: {
        content: "1280px",
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        xxl: "24px",
      },
      boxShadow: {
        // "Subtle white edge highlight on the top edge of lifted panels."
        lift: "inset 0 1px 0 0 rgba(255,255,255,0.045)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        blink: "blink 1.1s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;

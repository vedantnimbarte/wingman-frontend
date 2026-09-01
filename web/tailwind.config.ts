import type { Config } from "tailwindcss";

/**
 * Design tokens. Everything the site paints with lives here — components never
 * hard-code hex.
 *
 * The palette encodes the product's central opposition rather than decorating:
 * `unresolved` (cool slate) is what grep gives you — name matches, guesses.
 * `resolved` (lavender, the brand) is what the language server gives you.
 * Any before/after on this site uses that pair, so color carries an argument.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      colors: {
        // Cool near-black with a real blue-violet undertone. Deep enough to
        // feel like void, lifted enough that a WebGL depth gradient reads
        // (pure #010102 flattens everything above it to noise).
        canvas: "#06060b",
        surface: {
          1: "#0b0b13",
          2: "#12121c",
          3: "#1a1a26",
          4: "#232331",
        },
        hairline: {
          DEFAULT: "#22222e",
          strong: "#32323f",
          tertiary: "#16161f",
        },
        ink: {
          DEFAULT: "#f5f6fa",
          muted: "#c3c6d8",
          subtle: "#8a90a6",
          tertiary: "#5c6076",
        },
        primary: {
          DEFAULT: "#6b78e8",
          hover: "#8f9bff",
          focus: "#5e6ad2",
        },
        /** Semantic pair — see the file header. */
        unresolved: "#8a90a6",
        resolved: "#6b78e8",
        /** The verification receipt, and nothing else. Once per page. */
        verify: "#3ddc97",
        "on-primary": "#ffffff",
        success: "#3ddc97",
        "inverse-canvas": "#ffffff",
        "inverse-ink": "#0b0b13",
      },
      fontFamily: {
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "-apple-system", "system-ui", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SF Mono", "Menlo", "monospace"],
      },
      // Display sizes clamp so 88px -> ~40px on mobile automatically.
      fontSize: {
        "display-xl": ["clamp(2.0625rem, 6vw + 0.5rem, 5.5rem)", { lineHeight: "0.98", letterSpacing: "-0.035em", fontWeight: "600" }],
        "display-lg": ["clamp(2.125rem, 4vw + 0.75rem, 3.75rem)", { lineHeight: "1.03", letterSpacing: "-0.03em", fontWeight: "600" }],
        "display-md": ["clamp(1.75rem, 2.2vw + 1rem, 2.75rem)", { lineHeight: "1.08", letterSpacing: "-0.025em", fontWeight: "600" }],
        headline: ["clamp(1.5rem, 1.5vw + 1rem, 2rem)", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" }],
        "card-title": ["1.3125rem", { lineHeight: "1.25", letterSpacing: "-0.018em", fontWeight: "500" }],
        subhead: ["1.25rem", { lineHeight: "1.45", letterSpacing: "-0.012em", fontWeight: "400" }],
        "body-lg": ["1.1875rem", { lineHeight: "1.6", letterSpacing: "-0.008em", fontWeight: "400" }],
        body: ["1.0625rem", { lineHeight: "1.65", letterSpacing: "-0.005em", fontWeight: "400" }],
        "body-sm": ["0.9375rem", { lineHeight: "1.6", letterSpacing: "0", fontWeight: "400" }],
        caption: ["0.8125rem", { lineHeight: "1.45", letterSpacing: "0", fontWeight: "400" }],
        button: ["0.9375rem", { lineHeight: "1.2", letterSpacing: "-0.005em", fontWeight: "500" }],
        // Eyebrows are set in the display face at wide tracking — the one
        // place small type is allowed to be a graphic element.
        eyebrow: ["0.75rem", { lineHeight: "1.3", letterSpacing: "0.14em", fontWeight: "600" }],
        mono: ["0.8125rem", { lineHeight: "1.6", letterSpacing: "0", fontWeight: "400" }],
        "mono-lg": ["0.9375rem", { lineHeight: "1.6", letterSpacing: "0", fontWeight: "400" }],
      },
      spacing: {
        // The page's vertical rhythm. Sections breathe on the canvas rather
        // than each living inside its own bordered card.
        section: "clamp(3.5rem, 6vw, 5.5rem)",
        "section-sm": "clamp(3rem, 5vw, 4.5rem)",
      },
      maxWidth: {
        content: "1240px",
        wide: "1440px",
        prose: "68ch",
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "20px",
        xxl: "28px",
      },
      boxShadow: {
        lift: "inset 0 1px 0 0 rgba(255,255,255,0.05)",
        // Depth from light, not from a dark blur under a card.
        plane: "inset 0 1px 0 0 rgba(255,255,255,0.06), 0 24px 60px -30px rgba(0,0,0,0.9)",
        glow: "0 0 0 1px rgba(107,120,232,0.25), 0 20px 60px -24px rgba(107,120,232,0.35)",
      },
      transitionTimingFunction: {
        // One easing for the whole site. Soft, no bounce, no overshoot.
        soft: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-10px,0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,0.61,0.36,1) both",
        blink: "blink 1.1s step-end infinite",
        drift: "drift 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

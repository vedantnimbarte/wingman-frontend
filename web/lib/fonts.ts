import { Inter, JetBrains_Mono } from "next/font/google";

// Open substitutes named in DESIGN.md; self-hosted by next/font (no runtime
// external requests). Inter for display + text, JetBrains Mono for terminals.
export const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-mono",
});

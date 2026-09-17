import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";

// Three roles, three faces. All self-hosted by next/font — no runtime
// external requests (a stated property of this site, don't break it).

/** Display only: h1/h2 and step numbers. Never body. */
export const display = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  weight: ["500"],
  variable: "--font-display",
});

/** Body, UI, everything that has to be read rather than looked at. */
export const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

/** Terminal captures, code, and any number that is a measurement. */
export const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-mono",
});

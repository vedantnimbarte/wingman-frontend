import type { Metadata, Viewport } from "next";
import { sans, mono } from "@/lib/fonts";
import { TopNav } from "@/components/nav/TopNav";
import { Footer } from "@/components/footer/Footer";
import { Analytics } from "@/components/Analytics";
import { getRepoStats } from "@/lib/github";
import { product } from "@/content/product";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#010102",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://wingman.dev"),
  title: {
    default: "Wingman — the open coding agent for your terminal",
    template: "%s · Wingman",
  },
  description: product.positioning,
  applicationName: product.name,
  keywords: [
    "coding agent",
    "terminal AI",
    "CLI",
    "open source",
    "Claude Code alternative",
    "Cursor alternative",
    "Aider alternative",
    "Rust",
    "LLM",
    "MCP",
  ],
  openGraph: {
    title: "Wingman — the open coding agent for your terminal",
    description: product.positioning,
    type: "website",
    siteName: product.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Wingman — the open coding agent for your terminal",
    description: product.positioning,
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { stars } = await getRepoStats();
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-surface-2 focus:px-4 focus:py-2 focus:text-body-sm focus:text-ink"
        >
          Skip to content
        </a>
        <TopNav stars={stars} />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

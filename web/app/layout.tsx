import type { Metadata, Viewport } from "next";
import { display, sans, mono } from "@/lib/fonts";
import { TopNav } from "@/components/nav/TopNav";
import { Footer } from "@/components/footer/Footer";
import { Analytics } from "@/components/Analytics";
import { getRepoStats } from "@/lib/github";
import { product } from "@/content/product";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#06060b",
};

const title = "Wingman — the coding agent that resolves instead of guessing";

export const metadata: Metadata = {
  metadataBase: new URL("https://wingman.dev"),
  title: {
    default: title,
    template: "%s · Wingman",
  },
  description: product.positioning,
  applicationName: product.name,
  keywords: [
    "coding agent",
    "terminal AI",
    "LSP",
    "language server",
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
    title,
    description: product.positioning,
    type: "website",
    siteName: product.name,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: product.positioning,
  },
  robots: { index: true, follow: true },
  alternates: {
    types: { "application/rss+xml": "/rss.xml" },
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { stars } = await getRepoStats();
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen">
        {/* Scroll-reveal hides content only when JS can un-hide it. Runs before
            the page below it parses, so nothing flashes. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
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

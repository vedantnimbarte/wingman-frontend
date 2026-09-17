import type { Metadata, Viewport } from "next";
import { display, sans, mono } from "@/lib/fonts";
import { Header, Footer } from "@/components/chrome";
import { Analytics } from "@/components/Analytics";
import { product, SITE } from "@/content/product";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#06060b",
};

const title = "Wingman: the coding agent that asks the compiler instead of guessing";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      {/* Extensions (e.g. ColorZilla) stamp attributes on <body> before hydration. */}
      <body suppressHydrationWarning>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

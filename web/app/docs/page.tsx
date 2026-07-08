import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/docs/DocPage";
import { DocHeading } from "@/components/docs/DocHeading";
import { CopyOneLiner } from "@/components/ui/CopyOneLiner";
import { Callout } from "@/components/docs/Callout";
import { docsNav } from "@/content/docs-nav";
import { product } from "@/content/product";

export const metadata: Metadata = {
  title: "Overview",
  description: "What Wingman is and how these docs are organized.",
};

const guides = docsNav.find((g) => g.group === "Guides")!.items;

export default function DocsOverview() {
  return (
    <DocPage
      path="/docs"
      group="Get started"
      title="Documentation"
      description="Wingman is an open, provider-agnostic coding agent for your terminal. This is the practical guide — install it, connect a model, and learn the core concepts."
    >
      <DocHeading as="h2">Install in one line</DocHeading>
      <p>No clone, no cargo, no build. Prebuilt binaries for Linux, macOS (Apple Silicon), and Windows.</p>
      <CopyOneLiner command={product.installOneLiner} />
      <Callout variant="tip" title="New here?">
        Start with the <Link href="/docs/quickstart">Quickstart</Link> — it takes you from install to
        your first task in about five minutes.
      </Callout>

      <DocHeading as="h2">Explore the guides</DocHeading>
      <p>Each guide is self-contained; the reference section covers every command and config key.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {guides.map((g) => (
          <Link
            key={g.href}
            href={g.href}
            className="rounded-lg border border-hairline bg-surface-1 p-4 no-underline transition-colors hover:border-hairline-strong"
          >
            <span className="text-body font-medium text-ink">{g.title}</span>
          </Link>
        ))}
      </div>

      <DocHeading as="h2">Reference</DocHeading>
      <ul>
        <li>
          <Link href="/docs/cli">CLI reference</Link> — every subcommand.
        </li>
        <li>
          <Link href="/docs/tui">TUI &amp; slash commands</Link> — in-session commands and keybindings.
        </li>
        <li>
          <Link href="/docs/troubleshooting">Troubleshooting</Link> — common issues and fixes.
        </li>
      </ul>
      <p>
        Exhaustive internals live in the{" "}
        <a href={product.docs} target="_blank" rel="noreferrer noopener">
          repository docs
        </a>
        .
      </p>
    </DocPage>
  );
}

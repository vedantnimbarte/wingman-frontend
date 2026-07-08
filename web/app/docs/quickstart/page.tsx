import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/docs/DocPage";
import { DocHeading } from "@/components/docs/DocHeading";
import { CopyOneLiner } from "@/components/ui/CopyOneLiner";
import { CodeBlock, Code } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { Terminal } from "@/components/Terminal";
import { product } from "@/content/product";

export const metadata: Metadata = {
  title: "Quickstart",
  description: "From install to your first task in about five minutes.",
};

export default function Quickstart() {
  return (
    <DocPage
      path="/docs/quickstart"
      group="Get started"
      title="Quickstart"
      description="Install Wingman, connect a provider, and run your first task — in about five minutes."
    >
      <DocHeading as="h2" id="install">1. Install</DocHeading>
      <p>Grab a prebuilt binary. No clone, no cargo, no build:</p>
      <CopyOneLiner command={product.installOneLiner} />
      <p>
        For all platforms (including Windows and from-source), see the{" "}
        <Link href="/install">install page</Link>. Verify it landed:
      </p>
      <CodeBlock>{`wingman --version`}</CodeBlock>

      <DocHeading as="h2" id="log-in">2. Connect a provider</DocHeading>
      <p>
        Wingman brings no keys of its own — you connect a model provider. This probes the key and
        stores it in your OS keyring:
      </p>
      <CodeBlock>{`wingman login anthropic     # or openai, gemini, openrouter, ollama, …`}</CodeBlock>
      <Callout variant="tip" title="Prefer local models?">
        Run <Code>wingman discover</Code> to auto-detect a running Ollama, LM Studio, or vLLM — no
        key required. See <Link href="/docs/providers">Providers &amp; models</Link>.
      </Callout>

      <DocHeading as="h2" id="first-session">3. Your first session</DocHeading>
      <p>Launch the interactive TUI and just ask:</p>
      <CodeBlock>{`wingman`}</CodeBlock>
      <Terminal name="hero" />
      <p>
        By default Wingman starts in <Code>read-only</Code> mode — it can read and search freely, and
        will prompt before any write or shell command. Switch modes live with <Code>/mode</Code>.
      </p>

      <DocHeading as="h2" id="headless">4. Run it headless</DocHeading>
      <p>The same agent works non-interactively — perfect for scripts and CI:</p>
      <CodeBlock>{`wingman --print "summarize what this repo does"
wingman --print --json "list the crates" | jq .   # NDJSON events`}</CodeBlock>

      <DocHeading as="h2" id="next">Next steps</DocHeading>
      <ul>
        <li>
          <Link href="/docs/concepts">Core concepts</Link> — providers, permission modes, the three
          surfaces.
        </li>
        <li>
          <Link href="/docs/configuration">Configuration</Link> — tune models, routing, and hooks.
        </li>
        <li>
          <Link href="/docs/pilot">Pilot mode</Link> — hand off a whole goal to a team of agents.
        </li>
      </ul>
    </DocPage>
  );
}

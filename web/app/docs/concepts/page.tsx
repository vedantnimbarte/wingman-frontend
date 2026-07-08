import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/docs/DocPage";
import { DocHeading } from "@/components/docs/DocHeading";
import { CodeBlock, Code } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { ReferenceTable } from "@/components/docs/ReferenceTable";
import { Terminal } from "@/components/Terminal";

export const metadata: Metadata = {
  title: "Core concepts",
  description: "Providers, permission modes, and the three ways to run Wingman.",
};

export default function Concepts() {
  return (
    <DocPage
      path="/docs/concepts"
      group="Guides"
      title="Core concepts"
      description="Three ideas explain most of Wingman: it's provider-agnostic, permission-gated, and runs on three surfaces."
    >
      <DocHeading as="h2" id="providers">Provider-agnostic</DocHeading>
      <p>
        Wingman talks to <strong>73+ providers</strong> through one streaming interface. Anthropic is
        the reference implementation; a single OpenAI-compatible adapter covers OpenAI, OpenRouter,
        LiteLLM, and local runtimes (Ollama, LM Studio, vLLM); Gemini and ChatGPT (OAuth) have their
        own adapters. Switch provider/model mid-session without losing history:
      </p>
      <Terminal name="model" />
      <p>
        Details and per-provider setup live in <Link href="/docs/providers">Providers &amp; models</Link>.
      </p>

      <DocHeading as="h2" id="permission-modes">Permission modes</DocHeading>
      <p>
        Every tool call is gated by the active mode. Set it at startup with <Code>--mode</Code>, or
        switch live with <Code>/mode</Code> — which re-gates the running agent, not just the status
        line.
      </p>
      <ReferenceTable
        head={["Mode", "Behavior"]}
        rows={[
          ["read-only", "Reads and searches are free; every write or shell call prompts. The default."],
          ["plan", "Read-only until the agent presents a plan via present_plan; once you approve, it promotes to auto-edit for the turn."],
          ["auto-edit", "Writes and shell inside the project tree are auto-allowed; out-of-tree paths and a destructive-command denylist still prompt."],
          ["yolo", "No prompts at all. Per-session only — never persisted."],
        ]}
      />
      <Callout variant="warning" title="yolo removes the guardrails">
        <Code>yolo</Code> runs writes and shell commands without asking. Use it only in a sandbox or a
        throwaway checkout — it&rsquo;s intentionally session-only and never saved to config.
      </Callout>

      <DocHeading as="h2" id="surfaces">Three surfaces</DocHeading>
      <p>The same agent, three ways to run it:</p>
      <ReferenceTable
        head={["Surface", "Command", "Use"]}
        rows={[
          ["TUI", "wingman", "Interactive coding sessions."],
          ["Headless", 'wingman --print "…"', "One-shot; add --json for machine-readable NDJSON events."],
          ["Batch", "wingman --batch prompts.jsonl", "Run a file of prompts non-interactively."],
        ]}
      />
      <p>
        The headless and batch formats are documented in <Link href="/docs/formats">Automation</Link>.
      </p>

      <DocHeading as="h2" id="config">Configuration &amp; memory</DocHeading>
      <p>
        Configuration is <Link href="/docs/configuration">layered</Link> (defaults → global → project
        → env → flags), and Wingman keeps a persistent, human-readable{" "}
        <Link href="/docs/memory">memory</Link> of you and your projects that compounds across
        sessions.
      </p>
      <CodeBlock>{`# every layer merges; later wins
~/.wingman/config.toml          # global
<project>/.wingman/config.toml  # project`}</CodeBlock>
    </DocPage>
  );
}

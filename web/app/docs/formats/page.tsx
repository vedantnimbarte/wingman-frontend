import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/docs/DocPage";
import { DocHeading } from "@/components/docs/DocHeading";
import { CodeBlock, Code } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { Terminal } from "@/components/Terminal";

export const metadata: Metadata = {
  title: "Automation",
  description: "Drive Wingman from scripts and CI with headless one-shots, JSON events, and batch runs.",
};

export default function Formats() {
  return (
    <DocPage
      path="/docs/formats"
      group="Guides"
      title="Automation"
      description="Beyond the TUI, Wingman runs headless — text or newline-delimited JSON — and in batches, so it drops cleanly into scripts and CI."
    >
      <DocHeading as="h2" id="print">Headless one-shot</DocHeading>
      <p>
        <Code>--print</Code> runs a single prompt and exits. Pipe the text straight into other tools:
      </p>
      <CodeBlock>{`wingman --print "summarize the changes on this branch"
wingman --print --mode auto-edit "add a CHANGELOG entry for v0.2.0"`}</CodeBlock>

      <DocHeading as="h2" id="json">JSON events</DocHeading>
      <p>
        Add <Code>--json</Code> to emit newline-delimited JSON events instead of text — one event per
        line, ready for <Code>jq</Code> or a log pipeline.
      </p>
      <Terminal name="print" />
      <p>
        Each line is a self-contained event (assistant text, tool calls, and a final stop event), so
        you can stream and react to them as they arrive.
      </p>

      <DocHeading as="h2" id="batch">Batch mode</DocHeading>
      <p>
        <Code>--batch</Code> runs a file of prompts non-interactively — one JSON object per line
        (JSONL):
      </p>
      <CodeBlock>{`# prompts.jsonl
{"prompt": "add a license header to new files"}
{"prompt": "write a README section for the config module"}`}</CodeBlock>
      <CodeBlock>{`wingman --batch prompts.jsonl`}</CodeBlock>

      <Callout variant="tip" title="CI-friendly">
        Combine <Code>--print --json</Code> with a permission mode and a{" "}
        <Link href="/docs/memory">stop hook</Link> to run Wingman as a reviewer or fixer in CI. Costs
        are tracked in <Code>~/.wingman/usage.json</Code> — see <Code>wingman cost</Code> in the{" "}
        <Link href="/docs/cli">CLI reference</Link>.
      </Callout>
    </DocPage>
  );
}

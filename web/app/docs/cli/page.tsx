import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/docs/DocPage";
import { DocHeading } from "@/components/docs/DocHeading";
import { CodeBlock, Code } from "@/components/ui/CodeBlock";
import { ReferenceTable } from "@/components/docs/ReferenceTable";

export const metadata: Metadata = {
  title: "CLI reference",
  description: "Every wingman subcommand and the global flags.",
};

export default function CliReference() {
  return (
    <DocPage
      path="/docs/cli"
      group="Reference"
      title="CLI reference"
      description="Run wingman with no subcommand to open the TUI, or use a subcommand for a specific task. wingman <command> --help prints details for any of them."
    >
      <DocHeading as="h2" id="global-flags">Global flags</DocHeading>
      <ReferenceTable
        head={["Flag", "Purpose"]}
        rows={[
          ["--mode <mode>", "Permission mode: read-only | plan | auto-edit | yolo."],
          ["--model <id>", "Model, optionally provider-prefixed (anthropic/claude-opus-4-8)."],
          ["--print <prompt>", "Print a single response and exit (headless)."],
          ["--batch <file>", "Run prompts from a JSONL file non-interactively."],
          ["--json", "Emit newline-delimited JSON events (with --print)."],
          ["-v, --verbose", "Increase log verbosity (-v, -vv)."],
          ["-q, --quiet", "Suppress non-error stderr output."],
        ]}
      />

      <DocHeading as="h2" id="subcommands">Subcommands</DocHeading>
      <ReferenceTable
        head={["Command", "Description"]}
        rows={[
          ["config", "Inspect or scaffold configuration."],
          ["init", "Generate or refresh WINGMAN.md by introspecting the project."],
          ["login", "Authenticate a provider — probe the key and store it in the keyring."],
          ["logout", "Remove a provider's stored credential."],
          ["discover", "Probe localhost for Ollama / LM Studio / vLLM and print models."],
          ["knows", "Show what Wingman knows about this project."],
          ["cost", "Per-model token + USD spend from ~/.wingman/usage.json."],
          ["session", "Session utilities (list, fork, resume)."],
          ["memory", "Memory pack utilities (export / import / diff)."],
          ["skill", "Skill utilities."],
          ["checkpoint", "Snapshot the working tree into a tagged git stash."],
          ["undo", "Restore the most recent checkpoint."],
          ["worktree", "git worktree helper — isolate an experiment under .wingman/worktrees."],
          ["diff", "Interactive diff viewer — accept/reject hunks."],
          ["review", "One-shot code review of a PR or local diff."],
          ["review-multi", "Multi-model review in parallel; merge findings."],
          ["schedule", "Run any [[schedule]] entries whose cadence is due."],
          ["pilot", "Plan a goal, delegate to worker agents, converge into a PR."],
        ]}
      />

      <DocHeading as="h2" id="examples">Examples</DocHeading>
      <CodeBlock>{`wingman                                   # interactive TUI
wingman --print "explain src/agent.rs"    # headless one-shot
wingman --model ollama/llama3.1           # pick a model
wingman review 42                         # review PR #42
wingman cost                              # spend so far
wingman pilot run "migrate to axum 0.7"   # multi-agent run`}</CodeBlock>
      <p>
        For in-session commands, see the <Link href="/docs/tui">TUI &amp; slash commands</Link>{" "}
        reference. Use <Code>wingman help &lt;command&gt;</Code> for full flag details.
      </p>
    </DocPage>
  );
}

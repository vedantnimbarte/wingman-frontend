import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/docs/DocPage";
import { DocHeading } from "@/components/docs/DocHeading";
import { CodeBlock, Code } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { ReferenceTable } from "@/components/docs/ReferenceTable";
import { Terminal } from "@/components/Terminal";

export const metadata: Metadata = {
  title: "Memory, skills & hooks",
  description: "The self-improving loop — persistent memory, learned skills, sessions, and lifecycle hooks.",
};

export default function Memory() {
  return (
    <DocPage
      path="/docs/memory"
      group="Guides"
      title="Memory, skills & hooks"
      description="Wingman gets better the more you use it: it remembers, learns skills, recalls past sessions, and can run your own hooks around every tool call."
    >
      <DocHeading as="h2" id="memory">Persistent memory</DocHeading>
      <p>
        Memories are plain markdown with frontmatter, stored under{" "}
        <Code>~/.wingman/memory</Code> (global) and <Code>&lt;project&gt;/.wingman/memory</Code>
        (project) — yours to read and edit. See what Wingman knows:
      </p>
      <Terminal name="knows" />
      <p>
        In the TUI, <Code>/memory</Code> lists saved memories (use <Code>forget &lt;name&gt;</Code> to
        delete one). The agent also has <Code>save_memory</Code> / <Code>recall_memory</Code> tools.
      </p>

      <DocHeading as="h2" id="skills">Skills</DocHeading>
      <p>
        Skills are reusable procedures Wingman refines from real work, scored by outcome. Manage them
        in the TUI:
      </p>
      <ReferenceTable
        head={["Command", "Does"]}
        rows={[
          ["/skills", "Browse and apply skills."],
          ["/skill <name>", "Queue a skill for the next prompt."],
          ["/skills new <name>", "Create a new skill in $EDITOR."],
          ["/skill stats [name]", "Usage and outcome counts."],
        ]}
      />

      <DocHeading as="h2" id="commands">User-defined commands</DocHeading>
      <p>
        Drop a markdown file at <Code>~/.wingman/commands/&lt;name&gt;.md</Code> (or under a
        project&rsquo;s <Code>.wingman/commands/</Code>) and it becomes <Code>/&lt;name&gt;</Code> in
        the TUI. <Code>$ARGS</Code> is substituted with whatever you pass.
      </p>

      <DocHeading as="h2" id="sessions">Sessions &amp; recall</DocHeading>
      <p>Sessions are recorded and searchable across projects:</p>
      <CodeBlock>{`wingman session list          # browse recent sessions
wingman session fork <id>     # fork (optionally truncate) and resume

# in the TUI
/resume                       # resume a previous session
/recall <query>               # semantic search across past sessions`}</CodeBlock>

      <DocHeading as="h2" id="hooks">Lifecycle hooks</DocHeading>
      <p>
        Run your own shell commands at well-known points in the agent loop. A hook that exits
        non-zero with <Code>block = true</Code> stops the tool call.
      </p>
      <ReferenceTable
        head={["Hook", "Fires"]}
        rows={[
          ["pre_tool_use", "Before a tool runs (can block it)."],
          ["post_tool_use", "After a tool completes."],
          ["stop", "When the agent finishes a turn."],
          ["user_prompt_submit", "When you submit a prompt."],
        ]}
      />
      <CodeBlock>{`[hooks]
pre_tool_use = [
  { command = "./scripts/guard.sh", match_tool = "run_shell", block = true, timeout_secs = 10 },
]`}</CodeBlock>
      <Callout variant="tip" title="Automate it">
        Pair hooks with <Code>[[schedule]]</Code> tasks (run by <Code>wingman schedule</Code>) to build
        recurring, guarded workflows. See <Link href="/docs/configuration">Configuration</Link>.
      </Callout>
    </DocPage>
  );
}

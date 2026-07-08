import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/docs/DocPage";
import { DocHeading } from "@/components/docs/DocHeading";
import { CodeBlock, Code } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { ReferenceTable } from "@/components/docs/ReferenceTable";

export const metadata: Metadata = {
  title: "Configuration",
  description: "Layered TOML configuration — models, routing, tools, hooks, and scheduled tasks.",
};

export default function Configuration() {
  return (
    <DocPage
      path="/docs/configuration"
      group="Guides"
      title="Configuration"
      description="Wingman reads layered TOML. Set a global baseline, override per project, and override again with env vars or flags."
    >
      <DocHeading as="h2" id="layering">Layering</DocHeading>
      <p>Later layers win, and TOML sub-tables merge rather than clobber:</p>
      <CodeBlock>{`defaults
  → ~/.wingman/config.toml         (global)
  → <project>/.wingman/config.toml (project)
  → WINGMAN_* environment variables
  → CLI flags (--model, --mode, …)`}</CodeBlock>
      <p>
        Scaffold a starter file with <Code>wingman config</Code>.
      </p>

      <DocHeading as="h2" id="example">Example config.toml</DocHeading>
      <CodeBlock>{`default_provider = "anthropic"
default_model    = "claude-opus-4-8"
permission_mode  = "read-only"      # read-only | plan | auto-edit | yolo

# Never run these shell patterns, even in yolo.
shell_denylist = ["rm -rf /", "git push --force"]

[providers.anthropic]
api_key = "\${ANTHROPIC_API_KEY}"   # env placeholder — not stored in plaintext

[tokens]
compact_at_tokens    = 120000        # compact history past this many tokens
prompt_cache         = true

[router]
fast_model      = "claude-haiku-4-5"
fallback_models = ["openai/gpt-4.1", "openrouter/anthropic/claude-opus-4-8"]

[tui]
theme            = "default"         # default | light | mono
show_token_usage = true

[mcp.github]
transport = "stdio"
command   = "npx"
args      = ["-y", "@modelcontextprotocol/server-github"]

[hooks]
pre_tool_use = [
  { command = "./scripts/guard.sh", match_tool = "run_shell", block = true, timeout_secs = 10 },
]

[[schedule]]
id         = "nightly-review"
every_secs = 86400
prompt     = "review today's diff and note regressions"`}</CodeBlock>

      <DocHeading as="h2" id="top-level">Top-level keys</DocHeading>
      <ReferenceTable
        head={["Key", "Default", "Purpose"]}
        rows={[
          ["default_provider", "—", "Provider used when none is passed."],
          ["default_model", "—", "Model used when none is passed."],
          ["permission_mode", "read-only", "Startup permission mode."],
          ["shell_denylist", "[]", "Command substrings always denied, even in yolo."],
          ["disabled_tools", "[]", "Built-in tools to turn off."],
          ["tool_output_max_lines", "—", "Global cap on a tool's output lines."],
        ]}
      />

      <DocHeading as="h2" id="tables">Tables</DocHeading>
      <ReferenceTable
        head={["Table", "Notable keys", "Purpose"]}
        rows={[
          ["[providers.<name>]", "api_key · base_url · model", "Per-provider credentials and endpoint."],
          ["[tokens]", "compact_at_tokens · prompt_cache", "History compaction + caching."],
          ["[router]", "fast_model · fallback_models · [router.classes]", "Model routing and failover."],
          ["[tui]", "theme · show_token_usage · [tui.colors]", "Terminal UI appearance."],
          ["[mcp.<name>]", "transport · command · args · url", "External MCP servers."],
          ["[hooks]", "pre_tool_use · post_tool_use · stop · user_prompt_submit", "Lifecycle shell hooks."],
          ["[[schedule]]", "id · every_secs · prompt · model", "Recurring tasks run by wingman schedule."],
          ["[pilot]", "tier · worker_model · max_concurrent_agents · max_usd", "Multi-agent pilot settings."],
          ["[verify]", "turn_gate · max_retries", "Post-edit verification gate."],
        ]}
      />

      <Callout variant="note" title="Env overrides">
        Any key can be overridden by a <Code>WINGMAN_*</Code> environment variable, and CLI flags win
        over everything. See the <Link href="/docs/cli">CLI reference</Link>.
      </Callout>
    </DocPage>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/docs/DocPage";
import { DocHeading } from "@/components/docs/DocHeading";
import { CodeBlock, Code } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { ReferenceTable } from "@/components/docs/ReferenceTable";

export const metadata: Metadata = {
  title: "Tools & MCP",
  description: "The built-in tool layer and how to add external MCP servers as first-class tools.",
};

export default function ToolsMcp() {
  return (
    <DocPage
      path="/docs/tools-mcp"
      group="Guides"
      title="Tools & MCP"
      description="Wingman ships a batteries-included tool layer, and hosts external MCP servers as first-class tools — all gated by the active permission mode."
    >
      <DocHeading as="h2" id="builtin">Built-in tools</DocHeading>
      <p>Every tool is subject to the active permission mode (reads free, writes/shell gated):</p>
      <ReferenceTable
        head={["Category", "Tools"]}
        rows={[
          ["Read & search", "read_file · list_dir · glob · grep · semantic_search"],
          ["Edit", "write_file · edit_file · edit_symbol · apply_patch (atomic multi-file)"],
          ["Run", "run_shell"],
          ["Web", "web_fetch · web_search"],
          ["Learning", "save_memory · recall_memory · invoke_skill · recall_session · read_session"],
        ]}
      />
      <Callout variant="note" title="Turn tools off">
        Disable any built-in with <Code>disabled_tools</Code> in config. <Code>apply_patch</Code> writes
        multi-file edits atomically — no partial writes on failure.
      </Callout>

      <DocHeading as="h2" id="mcp">MCP servers</DocHeading>
      <p>
        Declare Model Context Protocol servers in config. Their tools are namespaced{" "}
        <Code>mcp__&lt;server&gt;__&lt;tool&gt;</Code> and dispatched exactly like built-ins.
      </p>
      <CodeBlock>{`# ~/.wingman/config.toml

# stdio transport
[mcp.github]
transport = "stdio"
command   = "npx"
args      = ["-y", "@modelcontextprotocol/server-github"]

# HTTP transport
[mcp.search]
transport = "http"
url       = "http://localhost:8080/mcp"`}</CodeBlock>

      <DocHeading as="h2" id="managing">Managing servers live</DocHeading>
      <p>
        Inside the TUI, <Code>/mcp</Code> opens a manager to add, connect, disconnect, or remove
        servers without editing config by hand.
      </p>
      <CodeBlock>{`/mcp            # open the MCP manager`}</CodeBlock>
      <p>
        See the <Link href="/docs/tui">TUI reference</Link> for the full slash-command list.
      </p>
    </DocPage>
  );
}

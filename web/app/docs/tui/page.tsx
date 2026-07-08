import type { Metadata } from "next";
import { DocPage } from "@/components/docs/DocPage";
import { DocHeading } from "@/components/docs/DocHeading";
import { Code } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { ReferenceTable } from "@/components/docs/ReferenceTable";

export const metadata: Metadata = {
  title: "TUI & slash commands",
  description: "In-session slash commands and keyboard shortcuts for the Wingman terminal UI.",
};

export default function TuiReference() {
  return (
    <DocPage
      path="/docs/tui"
      group="Reference"
      title="TUI & slash commands"
      description="Inside the TUI, type / to run a command. Type @ to fuzzy-pick a file. Press ? for shortcuts."
    >
      <DocHeading as="h2" id="session">Session &amp; providers</DocHeading>
      <ReferenceTable
        head={["Command", "Does"]}
        rows={[
          ["/help", "Show the command list."],
          ["/clear", "Reset the conversation."],
          ["/login, /connect", "Set up a provider in a guided wizard."],
          ["/logout [provider]", "Remove a stored API key."],
          ["/model [provider/model]", "Switch model, or open a picker with no arg."],
          ["/mode [m]", "Switch permission mode, or open a picker."],
          ["/params", "Adjust temperature and max_tokens."],
          ["/resume", "Resume a previous session."],
          ["/export [md|json]", "Export the conversation to a file."],
          ["/quit", "Exit."],
        ]}
      />

      <DocHeading as="h2" id="tools-memory">Tools, memory &amp; skills</DocHeading>
      <ReferenceTable
        head={["Command", "Does"]}
        rows={[
          ["/add <path>", "Attach a file to the next prompt."],
          ["/mcp", "Manage MCP servers (add / connect / remove)."],
          ["/memory", "List saved memories (forget <name> to delete)."],
          ["/recall <query>", "Search across past sessions."],
          ["/skills", "Browse and apply skills."],
          ["/skill <name>", "Queue a skill for the next prompt."],
          ["/learn [status|reset]", "Self-learning loop dashboard."],
          ["/usage", "Per-model token + cost breakdown."],
        ]}
      />

      <DocHeading as="h2" id="git">Git &amp; safety</DocHeading>
      <ReferenceTable
        head={["Command", "Does"]}
        rows={[
          ["/commit", "Draft and create a commit."],
          ["/pr", "Open a pull request."],
          ["/undo", "Restore the most recent checkpoint."],
          ["/compact", "Compact the conversation history."],
          ["/find, /findnext, /findprev, /findclear", "Search within the transcript."],
        ]}
      />

      <DocHeading as="h2" id="keys">Keyboard shortcuts</DocHeading>
      <ReferenceTable
        head={["Key", "Action"]}
        rows={[
          ["Enter", "Submit the prompt."],
          ["Up / Down", "Cycle input history."],
          ["Esc", "Clear the input."],
          ["Ctrl-C", "Exit."],
          ["PgUp / PgDn or Shift+Up/Down", "Scroll the transcript."],
          ["Ctrl-B", "Toggle the file-tree sidebar."],
          ["@", "Fuzzy-pick a file from the project."],
          ["?", "Show shortcuts."],
        ]}
      />

      <Callout variant="tip" title="Make your own commands">
        Any markdown file at <Code>~/.wingman/commands/&lt;name&gt;.md</Code> becomes{" "}
        <Code>/&lt;name&gt;</Code>, with <Code>$ARGS</Code> substituted. Mouse-wheel scrolling is
        enabled too.
      </Callout>
    </DocPage>
  );
}

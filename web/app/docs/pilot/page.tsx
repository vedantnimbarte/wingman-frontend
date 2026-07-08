import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/docs/DocPage";
import { DocHeading } from "@/components/docs/DocHeading";
import { CopyOneLiner } from "@/components/ui/CopyOneLiner";
import { CodeBlock, Code } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { ReferenceTable } from "@/components/docs/ReferenceTable";
import { Terminal } from "@/components/Terminal";

export const metadata: Metadata = {
  title: "Pilot mode",
  description: "Hand a whole goal to a team of agents that plan, work in isolated worktrees, and open a PR.",
};

export default function Pilot() {
  return (
    <DocPage
      path="/docs/pilot"
      group="Guides"
      title="Pilot mode"
      description="Pilot plans a multi-task goal, delegates to worker agents in isolated git worktrees, reviews as it goes, and converges into a pull request."
    >
      <Callout variant="warning" title="Advanced feature">
        Pilot spawns multiple agents and can spend real tokens. It has trust-tiered approval gates and
        cost estimates, but treat it as the powerful, advanced surface it is — start on a branch.
      </Callout>

      <DocHeading as="h2" id="run">Running pilot</DocHeading>
      <CopyOneLiner command={'wingman pilot run "add pagination to the /users API"'} />
      <p>Pilot estimates cost and risk up front, then plans and delegates:</p>
      <Terminal name="pilot" />

      <DocHeading as="h2" id="approval">Approval tiers</DocHeading>
      <p>
        Before it acts, the plan is classified. Auto-approval fires only when the worst-case cost is
        under your cap and every write is inside the allowlist.
      </p>
      <ReferenceTable
        head={["Tier", "Behavior"]}
        rows={[
          ["auto", "Low-risk, cheap, allowlisted — proceeds silently."],
          ["notify-only", "Medium-risk — surfaces a veto window before proceeding."],
          ["hard", "High-risk or forced with --review — asks y/e/n."],
        ]}
      />

      <DocHeading as="h2" id="worktrees">Isolated worktrees</DocHeading>
      <p>
        Each worker runs in its own <Code>git worktree</Code>, so parallel agents never clobber each
        other. Work converges and rebases into an integration branch, then a PR. You can isolate an
        experiment yourself too:
      </p>
      <CodeBlock>{`wingman worktree create my-experiment`}</CodeBlock>

      <DocHeading as="h2" id="config">Configuring pilot</DocHeading>
      <p>Tune concurrency, budget, and models under <Code>[pilot]</Code>:</p>
      <CodeBlock>{`[pilot]
tier                  = "copilot"    # host | copilot | autopilot | assist
worker_model          = "claude-haiku-4-5"
max_concurrent_agents = 4
max_usd               = 10.0

[pilot.approval]
auto_approve_usd       = 1.00
auto_approve_max_tasks = 5`}</CodeBlock>
      <Callout variant="note" title="Discovery daemon">
        The optional daemon can discover work from GitHub issues (and, where configured, a local
        TODO/FIXME scan). Other sources are planned. See{" "}
        <Link href="/docs/cli">the CLI reference</Link> for <Code>wingman pilot</Code> subcommands.
      </Callout>
    </DocPage>
  );
}

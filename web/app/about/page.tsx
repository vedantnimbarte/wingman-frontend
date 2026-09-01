import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Button } from "@/components/ui/Button";
import { product } from "@/content/product";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Wingman exists: a terminal coding agent that resolves code through the language server, proves its work before finishing, and names its own limits.",
};

const shipsToday = [
  "LSP-backed resolution across 11 languages, with tree-sitter fallback",
  "A verification gate: build, affected tests, and LSP diagnostics before a turn ends",
  "73+ providers behind one Message contract, hosted or fully local",
  "wingman context and wingman cost --compare — the numbers, printed",
  "Memories and skills as plain markdown you can read, edit, and share over git",
  "Pilot mode, the board, and wingman serve (HTTP/SSE + web panel)",
  "Background shell jobs, run_plan, and a Claude Code hooks bridge",
  "MCP host and MCP server; ACP for Zed, JetBrains, Neovim, and Emacs",
];

const knownLimits = [
  "Shell containment on Windows uses a Job Object — it contains the process, not its file access",
  "The local-first router preset is a starting config, not a switch that redirects live traffic",
  "Pilot's copilot tier is user-validated against live providers, not CI-validated",
  "Visual verification needs an opt-in --features browser build, and fails open without one",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Built to be checked, not trusted."
        lead="Wingman is a terminal coding agent that resolves your code through the language server, proves a change before it says done, and prints the numbers other agents keep to themselves."
      />

      <section className="py-section-sm">
        <Container>
          <div className="mx-auto max-w-3xl space-y-6 text-body-lg text-ink-muted">
            <p>
              &ldquo;Where is this used, and what breaks if I change it?&rdquo; is a
              question a compiler can answer exactly. Most agents answer it by
              grepping and reading files until the context window fills. Wingman
              asks the <span className="text-ink">language server</span> and a local
              semantic index, so it resolves imports, types, and re-exports rather
              than matching names — and spends a fraction of the context doing it.
            </p>
            <p>
              It also has to <span className="text-ink">prove the work</span>. The
              verification gate runs your build, the affected tests, and the language
              server&rsquo;s diagnostics for the changed files before the agent may end
              a turn. On red it retries a bounded number of times, then stops and exits
              non-zero. Bounded correction, not loop-until-green.
            </p>
            <p>
              And there is <span className="text-ink">no lock-in</span>: one message
              contract over 73+ providers, hosted or fully local, with your keys in
              the OS keyring and what it learns stored as plain markdown under{" "}
              <code className="font-mono text-body text-ink">~/.wingman</code> — files
              you can read, edit, delete, and share over git.
            </p>
          </div>
        </Container>
      </section>

      {/* Honesty section */}
      <section className="py-section-sm">
        <Container>
          <h2 className="text-display-md text-ink">Honest about what ships</h2>
          <p className="mt-3 max-w-2xl text-body-lg text-ink-subtle">
An agent that will not tell you where it is weak is asking you to
            trust it anyway. Here is what ships, and where the edges are.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-hairline bg-surface-1/70 p-7">
              <h3 className="text-card-title text-ink">Ships today</h3>
              <ul className="mt-4 space-y-2.5">
                {shipsToday.map((s) => (
                  <li key={s} className="flex gap-3 text-body-sm text-ink-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-success" aria-hidden="true" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-hairline bg-surface-1/70 p-7">
              <h3 className="text-card-title text-ink">Known limits</h3>
              <ul className="mt-4 space-y-2.5">
                {knownLimits.map((s) => (
                  <li key={s} className="flex gap-3 text-body-sm text-ink-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-tertiary" aria-hidden="true" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Architecture + open source */}
      <section className="py-section-sm">
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-hairline bg-surface-1 p-8 shadow-lift">
              <h3 className="text-card-title text-ink">Built in Rust</h3>
              <p className="mt-3 text-body-sm text-ink-subtle">
                A multi-crate workspace — a streaming provider contract, a tool
                registry, a RAG/index layer, an MCP host, and the multi-agent
                orchestrator — each a focused crate.
              </p>
              <Button href={product.architectureDocs} external variant="secondary" className="mt-6">
                Read the architecture ↗
              </Button>
            </div>
            <div className="rounded-lg border border-hairline bg-surface-1 p-8 shadow-lift">
              <h3 className="text-card-title text-ink">Open source</h3>
              <p className="mt-3 text-body-sm text-ink-subtle">
                Licensed {product.license}. Contributions, issues, and
                discussions welcome — the roadmap is public and the codebase is
                yours to fork.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={product.repo} external variant="secondary">
                  GitHub
                </Button>
                <Button href={product.issues} external variant="tertiary">
                  Open an issue ↗
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}

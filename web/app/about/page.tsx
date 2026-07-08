import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Button } from "@/components/ui/Button";
import { product } from "@/content/product";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Wingman exists: an open, provider-agnostic, terminal-first coding agent that learns — with honest boundaries on what ships today.",
};

const shipsToday = [
  "Interactive TUI, headless --print, and --batch runner",
  "73+ providers behind one streaming interface",
  "Built-in tool layer (read/write/edit, grep, shell, semantic search, web)",
  "MCP host for external servers",
  "Learning loop: memories, skills, cross-session recall",
  "Permission modes with live /mode re-gating",
  "Checkpoints & undo, cost tracking, session fork/resume",
  "Pilot mode (advanced): plan → delegate → PR",
];

const planned = [
  "More pilot daemon discovery sources (CI failures, dependabot, coverage gaps)",
  "Richer verification receipts and team-shared memory",
  "Expanded provider-native adapters",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="An open alternative, built in the open."
        lead="Wingman is a terminal-first coding agent that doesn't lock you to one model vendor — and gets better at helping you the more you use it."
      />

      <section className="py-12">
        <Container>
          <div className="mx-auto max-w-3xl space-y-6 text-body-lg text-ink-muted">
            <p>
              Most coding agents pick a model for you and keep your context in
              their cloud. Wingman does the opposite: it speaks to{" "}
              <span className="text-ink">73+ providers</span> — hosted or fully
              local — through one streaming interface, keeps your keys in the OS
              keyring, and stores what it learns as plain markdown in your own{" "}
              <code className="font-mono text-body text-ink">~/.wingman</code>{" "}
              directory.
            </p>
            <p>
              It&rsquo;s <span className="text-ink">terminal-first</span> because
              that&rsquo;s where the work happens — a fast TUI for interactive
              sessions, and headless modes that pipe cleanly into scripts and CI.
              And it&rsquo;s <span className="text-ink">self-improving</span>:
              persistent memories, skills refined from real work, and semantic
              recall across sessions and projects.
            </p>
          </div>
        </Container>
      </section>

      {/* Honesty section */}
      <section className="py-12">
        <Container>
          <h2 className="text-display-md text-ink">Honest about what ships</h2>
          <p className="mt-3 max-w-2xl text-body-lg text-ink-subtle">
            We&rsquo;d rather under-promise. Here&rsquo;s what&rsquo;s in your
            hands today versus what&rsquo;s still on the roadmap.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-hairline bg-surface-1 p-6 shadow-lift">
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
            <div className="rounded-lg border border-hairline bg-surface-1 p-6 shadow-lift">
              <h3 className="text-card-title text-ink">Planned</h3>
              <ul className="mt-4 space-y-2.5">
                {planned.map((s) => (
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
      <section className="py-12">
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

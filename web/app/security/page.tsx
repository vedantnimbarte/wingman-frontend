import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { product } from "@/content/product";

export const metadata: Metadata = {
  title: "Security & privacy",
  description:
    "Your keys stay in the OS keyring, your code stays on your machine, and there's no telemetry. Open-source and auditable.",
};

const pillars = [
  {
    title: "Your keys stay in your keyring",
    body: "wingman login stores credentials in the OS keyring — not a plaintext dotfile. In config you can reference a key as a ${ENV_VAR} placeholder so nothing secret is written to disk.",
  },
  {
    title: "Your code stays on your machine",
    body: "Run fully local models (Ollama, LM Studio, vLLM) and nothing leaves your machine. With hosted providers, requests go straight to the provider you chose — Wingman has no server in the middle.",
  },
  {
    title: "No telemetry",
    body: "Wingman collects nothing. This website ships no third-party trackers by default; any analytics is opt-in, cookieless, and aggregate-only.",
  },
  {
    title: "Open source & auditable",
    body: "Licensed MIT / Apache-2.0. The whole agent — the provider contract, the tool layer, the permission gate — is yours to read, fork, and verify.",
  },
];

export default function SecurityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Security & privacy"
        title="Your keys, your models, your machine"
        lead="Wingman is built for people who don't want a black box between them and their code."
      />

      <section className="py-8">
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-lg border border-hairline bg-surface-1 p-6 shadow-lift">
                <h2 className="text-card-title text-ink">{p.title}</h2>
                <p className="mt-3 text-body-sm text-ink-subtle">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-8">
        <Container>
          <div className="rounded-xl border border-hairline bg-surface-1 p-6 shadow-lift md:p-8">
            <h2 className="text-display-md text-ink">Guardrails you control</h2>
            <p className="mt-3 max-w-2xl text-body-lg text-ink-subtle">
              Every tool call is gated by a permission mode, and you can tighten it further.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              <li className="rounded-lg border border-hairline bg-surface-2/50 p-4 text-body-sm text-ink-muted">
                <strong className="text-ink">Permission modes</strong> — read-only by default; writes and
                shell are gated. See <Link href="/docs/concepts" className="link-emphasis">core concepts</Link>.
              </li>
              <li className="rounded-lg border border-hairline bg-surface-2/50 p-4 text-body-sm text-ink-muted">
                <strong className="text-ink">Shell denylist</strong> — destructive command patterns are
                blocked even in yolo mode.
              </li>
              <li className="rounded-lg border border-hairline bg-surface-2/50 p-4 text-body-sm text-ink-muted">
                <strong className="text-ink">Lifecycle hooks</strong> — a pre-tool-use hook can block any
                call that fails your own check.
              </li>
              <li className="rounded-lg border border-hairline bg-surface-2/50 p-4 text-body-sm text-ink-muted">
                <strong className="text-ink">Checkpoints & undo</strong> — mutating tools snapshot the tree;
                <code className="ml-1 font-mono text-ink">wingman undo</code> restores it.
              </li>
            </ul>
          </div>
        </Container>
      </section>

      <section className="pb-4">
        <Container>
          <p className="text-body-sm text-ink-subtle">
            Found a security issue? Please report it privately via{" "}
            <a href={product.issues} target="_blank" rel="noreferrer noopener" className="link-emphasis">
              the repository
            </a>
            .
          </p>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}

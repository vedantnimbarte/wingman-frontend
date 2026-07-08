import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const points = [
  "Open-source (MIT / Apache-2.0), not a black box",
  "73+ providers — hosted or fully local, no lock-in",
  "Terminal-first, scriptable, and multi-agent",
  "Your keys in the OS keyring; your code on your machine",
];

export function CompareTeaser() {
  return (
    <section className="py-16">
      <Container>
        <div className="rounded-xl border border-hairline bg-surface-1 p-8 shadow-lift md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <h2 className="text-display-md text-ink">
                The open alternative to Claude Code, Cursor &amp; Aider
              </h2>
              <p className="mt-3 text-body-lg text-ink-subtle">
                Same terminal-native workflow — without vendor lock-in, a subscription, or a server
                between you and your code.
              </p>
              <div className="mt-6">
                <Button href="/compare" variant="primary">
                  See the full comparison
                </Button>
              </div>
            </div>
            <ul className="space-y-3">
              {points.map((p) => (
                <li key={p} className="flex gap-3 text-body text-ink-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

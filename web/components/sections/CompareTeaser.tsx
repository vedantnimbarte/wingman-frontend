import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Text";

const points = [
  "Open source (MIT / Apache-2.0) — read the loop, not a changelog",
  "Any provider, hosted or fully local, with no subscription in the way",
  "Your keys in the OS keyring; your code never leaves the machine",
  "Terminal-first, scriptable, and steerable from CI or a phone",
];

export function CompareTeaser() {
  return (
    <section className="py-section">
      <Container>
        <div className="rule" />
        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-20">
          <Reveal>
            <Eyebrow>Alternatives</Eyebrow>
            <h2 className="mt-5 max-w-[19ch] text-display-md text-ink">
              The open alternative to Claude Code, Cursor &amp; Aider
            </h2>
            <p className="mt-5 max-w-prose text-body-lg text-ink-subtle">
              The same terminal-native workflow, without vendor lock-in, a subscription,
              or a server between you and your code.
            </p>
            <div className="mt-8">
              <Button href="/compare" variant="primary" size="lg">
                See the full comparison
              </Button>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ul className="divide-y divide-hairline border-y border-hairline">
              {points.map((p) => (
                <li key={p} className="flex gap-4 py-5 text-body text-ink-muted">
                  <span
                    className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

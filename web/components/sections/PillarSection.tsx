import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Text";
import { Terminal } from "@/components/Terminal";
import { cn } from "@/lib/cn";
import type { Feature } from "@/content/features";
import { terminals } from "@/content/terminals";

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className="mt-1 shrink-0 text-primary" aria-hidden="true">
      <path d="M3 8.5 6.5 12 13 4" stroke="currentColor" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PillarSection({ feature, index }: { feature: Feature; index: number }) {
  const flip = index % 2 === 1;
  const hasTerminal = feature.terminal && feature.terminal in terminals;

  return (
    <section id={feature.id} className="scroll-mt-20 py-12">
      <Container>
        <div
          className={cn(
            "grid items-center gap-10 rounded-xl border border-hairline bg-surface-1 p-6 shadow-lift md:p-10",
            hasTerminal ? "lg:grid-cols-2" : "",
          )}
        >
          <div className={cn(flip && hasTerminal && "lg:order-2")}>
            <Eyebrow>{feature.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-display-md text-ink">{feature.title}</h2>
            <p className="mt-4 text-body-lg text-ink-subtle">{feature.blurb}</p>
            {feature.points ? (
              <ul className="mt-6 space-y-3">
                {feature.points.map((p) => (
                  <li key={p} className="flex gap-3 text-body text-ink-muted">
                    <Check />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          {hasTerminal ? (
            <div className={cn(flip && "lg:order-1")}>
              <Terminal name={feature.terminal as keyof typeof terminals} />
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Text";
import { Reveal } from "@/components/motion/Reveal";
import { Terminal } from "@/components/Terminal";
import { cn } from "@/lib/cn";
import type { Feature } from "@/content/features";
import { terminals } from "@/content/terminals";

function Check() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      className="mt-[0.45em] shrink-0 text-primary"
      aria-hidden="true"
    >
      <path
        d="M3 8.5 6.5 12 13 4"
        stroke="currentColor"
        strokeWidth="1.75"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * One argument per screen. Sections sit directly on the canvas and are
 * separated by rhythm and a single opening rule — not by a bordered card each,
 * which is what made the old page read as a stack of boxes.
 */
export function PillarSection({ feature, index }: { feature: Feature; index: number }) {
  const flip = index % 2 === 1;
  const hasTerminal = feature.terminal && feature.terminal in terminals;

  return (
    <section id={feature.id} className="scroll-mt-24 py-section-sm">
      <Container>
        <div className="rule" />
        <div
          className={cn(
            "mt-12 grid items-center gap-12 lg:gap-20",
            hasTerminal && "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)]",
          )}
        >
          <Reveal className={cn(flip && hasTerminal && "lg:order-2")}>
            <Eyebrow>{feature.eyebrow}</Eyebrow>
            <h2 className="mt-5 max-w-[19ch] text-display-md text-ink">{feature.title}</h2>
            <p className="mt-5 max-w-prose text-body-lg text-ink-subtle">{feature.blurb}</p>
            {feature.points ? (
              <ul className="mt-8 space-y-3.5">
                {feature.points.map((p) => (
                  <li key={p} className="flex max-w-prose gap-3.5 text-body text-ink-muted">
                    <Check />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </Reveal>

          {hasTerminal ? (
            <Reveal delay={120} className={cn(flip && "lg:order-1")}>
              <Terminal name={feature.terminal as keyof typeof terminals} />
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

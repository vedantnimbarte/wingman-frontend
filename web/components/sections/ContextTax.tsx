import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Terminal } from "@/components/Terminal";
import { contextTax } from "@/content/product";

/**
 * The number the README opens with. Every agent pays a per-turn context tax;
 * the differentiating act is printing it. Set in mono, because it is a
 * measurement, not a marketing figure.
 */
export function ContextTax() {
  return (
    <section className="py-section" aria-labelledby="context-tax-heading">
      <Container>
        <div className="rule" />
        <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-20">
          <Reveal>
            <p className="label text-primary">Before your prompt</p>
            <h2 id="context-tax-heading" className="mt-5 max-w-[19ch] text-display-md text-ink">
              Every agent charges you rent on the context window
            </h2>
            <p className="mt-5 max-w-prose text-body-lg text-ink-subtle">
              The system prompt and the tool schemas are billed on every single turn,
              before you have typed a word. Wingman prints the number.{" "}
              <span className="text-ink-muted">Run it in your own repo.</span>
            </p>

            <dl className="mt-10 flex flex-wrap items-end gap-x-12 gap-y-6">
              {contextTax.rows.map((row) => (
                <div key={row.label}>
                  <dt className="text-caption text-ink-tertiary">{row.label}</dt>
                  <dd className="mt-1 figure text-headline text-ink-muted">
                    {row.tokens.toLocaleString("en-US")}
                  </dd>
                </div>
              ))}
              <div className="border-l border-hairline pl-6">
                <dt className="text-caption text-primary">{contextTax.total.note}</dt>
                <dd className="mt-1 figure text-display-md text-ink">
                  {contextTax.total.tokens.toLocaleString("en-US")}
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={120}>
            <Terminal name="context" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

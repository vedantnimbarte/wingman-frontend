import { Container } from "@/components/ui/Container";
import { SectionHeading, Eyebrow } from "@/components/ui/Text";
import { Reveal } from "@/components/motion/Reveal";
import type { Feature } from "@/content/features";

export function FeatureGrid({
  eyebrow,
  title,
  lead,
  features,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  features: Feature[];
}) {
  return (
    <section className="py-section">
      <Container>
        <div className="rule" />
        <Reveal className="mt-12">
          <SectionHeading eyebrow={eyebrow} title={title} lead={lead} />
        </Reveal>

        {/* Hairline-separated cells rather than nine bordered cards — the grid
            reads as one table of contents, not a bag of tiles. */}
        <ul className="mt-16 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal
              as="li"
              key={f.id}
              delay={Math.min(i, 5) * 45}
              className="scroll-mt-24 bg-canvas p-8 transition-colors duration-300 ease-soft hover:bg-surface-1"
            >
              <div id={f.id}>
                <Eyebrow className="mb-4 text-ink-tertiary">{f.eyebrow}</Eyebrow>
                <h3 className="text-card-title text-ink">{f.title}</h3>
                <p className="mt-3.5 text-body-sm text-ink-subtle">{f.blurb}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

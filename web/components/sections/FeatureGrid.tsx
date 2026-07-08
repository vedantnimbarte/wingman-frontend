import { Container } from "@/components/ui/Container";
import { SectionHeading, Eyebrow } from "@/components/ui/Text";
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
    <section className="py-16">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} lead={lead} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.id}
              id={f.id}
              className="scroll-mt-20 rounded-lg border border-hairline bg-surface-1 p-6 shadow-lift transition-colors hover:border-hairline-strong"
            >
              <Eyebrow className="mb-3">{f.eyebrow}</Eyebrow>
              <h3 className="text-card-title text-ink">{f.title}</h3>
              <p className="mt-3 text-body-sm text-ink-subtle">{f.blurb}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Text";

export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
}) {
  return (
    <section className="pb-section-sm pt-16 md:pt-24">
      <Container>
        {eyebrow ? <Eyebrow className="mb-6">{eyebrow}</Eyebrow> : null}
        <h1 className="max-w-[18ch] text-display-lg text-ink">{title}</h1>
        {lead ? <p className="mt-6 max-w-prose text-body-lg text-ink-subtle">{lead}</p> : null}
        <div className="rule mt-14" />
      </Container>
    </section>
  );
}

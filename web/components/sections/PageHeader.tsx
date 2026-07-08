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
    <section className="border-b border-hairline/50 py-16 md:py-20">
      <Container>
        {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
        <h1 className="max-w-3xl text-display-lg text-ink">{title}</h1>
        {lead ? <p className="mt-5 max-w-2xl text-body-lg text-ink-subtle">{lead}</p> : null}
      </Container>
    </section>
  );
}

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { providers, providerCaption } from "@/content/providers";

export function ProviderMarquee() {
  return (
    <section className="py-section-sm">
      <Container>
        <div className="rule" />
        <Reveal className="mt-10">
          <p className="label text-ink-tertiary">One contract for every model</p>
          <ul className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
            {providers.map((p) => (
              <li key={p.name}>
                <span className="text-body font-medium text-ink">{p.name}</span>
                <span className="mt-1 block text-caption text-ink-tertiary">{p.note}</span>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-prose text-body-sm text-ink-subtle">{providerCaption}</p>
        </Reveal>
      </Container>
    </section>
  );
}

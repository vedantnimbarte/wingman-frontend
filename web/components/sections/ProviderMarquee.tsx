import { Container } from "@/components/ui/Container";
import { providers, providerCaption } from "@/content/providers";

export function ProviderMarquee() {
  return (
    <section className="border-y border-hairline/50 py-14">
      <Container>
        <p className="text-center text-eyebrow uppercase text-ink-tertiary">
          One interface for every model
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
          {providers.map((p) => (
            <li
              key={p.name}
              className="rounded-xs px-4 py-3 text-center sm:text-left"
            >
              <span className="text-body font-medium text-ink">{p.name}</span>
              <span className="mt-0.5 block text-caption text-ink-tertiary">{p.note}</span>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-8 max-w-2xl text-center text-body-sm text-ink-subtle">
          {providerCaption}
        </p>
      </Container>
    </section>
  );
}

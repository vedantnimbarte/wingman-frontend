import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { getRepoStats, formatCount } from "@/lib/github";

export async function SocialProof() {
  const { stars, forks } = await getRepoStats();

  const stats: { label: string; value: string }[] = [];
  if (stars > 0) stats.push({ label: "GitHub stars", value: formatCount(stars) });
  if (forks > 0) stats.push({ label: "Forks", value: formatCount(forks) });
  stats.push({ label: "Languages via LSP", value: "11" });
  stats.push({ label: "Providers", value: "73+" });
  stats.push({ label: "License", value: "MIT / Apache-2.0" });

  return (
    <section className="py-section-sm">
      <Container>
        <div className="rule" />
        <Reveal>
          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="label text-ink-tertiary">{s.label}</dt>
                <dd className="mt-3 figure text-display-md text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
          {stars > 0 ? (
            <p className="mt-10 text-body-sm">
              <a
                href="https://star-history.com/#vedantnimbarte/Wingman&Date"
                target="_blank"
                rel="noreferrer noopener"
                className="link-emphasis"
              >
                View the star history ↗
              </a>
            </p>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}

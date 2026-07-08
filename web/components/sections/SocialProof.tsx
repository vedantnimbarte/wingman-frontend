import { Container } from "@/components/ui/Container";
import { getRepoStats, formatCount } from "@/lib/github";

export async function SocialProof() {
  const { stars, forks } = await getRepoStats();

  const stats: { label: string; value: string }[] = [];
  if (stars > 0) stats.push({ label: "GitHub stars", value: formatCount(stars) });
  if (forks > 0) stats.push({ label: "Forks", value: formatCount(forks) });
  stats.push({ label: "Providers", value: "73+" });
  stats.push({ label: "License", value: "MIT / Apache-2.0" });
  stats.push({ label: "Built in", value: "Rust" });

  return (
    <section className="border-y border-hairline/50 py-14">
      <Container>
        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <dt className="text-caption uppercase tracking-wide text-ink-tertiary">{s.label}</dt>
              <dd className="mt-1 text-display-md text-ink">{s.value}</dd>
            </div>
          ))}
        </dl>
        {stars > 0 ? (
          <p className="mt-8 text-body-sm text-ink-subtle">
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
      </Container>
    </section>
  );
}

import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { getReleases } from "@/lib/releases";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Release history for Wingman, straight from GitHub Releases.",
};

export default async function ChangelogPage() {
  const releases = await getReleases();

  return (
    <>
      <PageHeader
        eyebrow="Changelog"
        title="What's shipped"
        lead="Every release, newest first — sourced from GitHub Releases."
      />

      <section className="pt-6">
        <Container>
          <a href="/rss.xml" className="text-body-sm link-emphasis">
            Subscribe via RSS ↗
          </a>
        </Container>
      </section>

      <section className="py-section-sm">
        <Container>
          <div className="mx-auto max-w-3xl">
            {releases.map((r) => (
              <article
                key={r.tag}
                id={r.tag}
                className="scroll-mt-20 border-b border-hairline py-8 last:border-0"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="text-headline text-ink">{r.name}</h2>
                  {r.date ? (
                    <time className="text-body-sm text-ink-tertiary" dateTime={r.date}>
                      {r.date}
                    </time>
                  ) : null}
                </div>
                {r.highlights.length > 0 ? (
                  <ul className="mt-4 space-y-2">
                    {r.highlights.map((h, i) => (
                      <li key={i} className="flex gap-3 text-body text-ink-muted">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/70" aria-hidden="true" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-4 inline-block text-body-sm link-emphasis"
                >
                  View release on GitHub ↗
                </a>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { getReleases } from "@/lib/releases";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Release history for Wingman, from GitHub Releases.",
};

export default async function ChangelogPage() {
  const releases = await getReleases();

  return (
    <section className="sec hero">
      <div className="wide">
        <h1>Changelog</h1>
        <p className="lede">
          Every release, newest first, from GitHub Releases. Follow along with the{" "}
          <a href="/rss.xml" className="inline-link">RSS feed</a>.
        </p>

        <ol className="releases">
          {releases.map((r) => (
            <li key={r.tag} id={r.tag}>
              <div>
                <h2>{r.tag}</h2>
                {r.date ? <time dateTime={r.date}>{r.date}</time> : null}
              </div>
              <div>
                {r.highlights.length > 0 ? (
                  <ul>
                    {r.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                ) : null}
                <a href={r.url} target="_blank" rel="noreferrer noopener">
                  Read the {r.tag} release notes on GitHub
                </a>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

import { getReleases } from "@/lib/releases";
import { product, SITE } from "@/content/product";

export const dynamic = "force-static";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function GET() {
  const releases = await getReleases();
  const items = releases
    .map((r) => {
      const desc = r.highlights.join(" ");
      return `    <item>
      <title>${esc(r.name)}</title>
      <link>${r.url}</link>
      <guid isPermaLink="true">${r.url}</guid>
      ${r.date ? `<pubDate>${new Date(r.date).toUTCString()}</pubDate>` : ""}
      <description>${esc(desc)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Wingman changelog</title>
    <link>${SITE}/changelog</link>
    <description>Releases of ${esc(product.name)}, the terminal coding agent that asks the compiler instead of guessing.</description>
    <language>en</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}

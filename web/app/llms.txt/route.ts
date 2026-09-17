import { product, SITE } from "@/content/product";
import { docsNav } from "@/content/docs-nav";

export const dynamic = "force-static";

// Follows the llms.txt convention (https://llmstxt.org): a Markdown map of the
// site for AI crawlers and assistants.
export async function GET() {
  const sections = docsNav
    .map((group) => {
      const links = group.items
        .map((i) => `- [${i.title}](${SITE}${i.href})${i.summary ? `: ${i.summary}` : ""}`)
        .join("\n");
      return `## ${group.group}\n\n${links}`;
    })
    .join("\n\n");

  const body = `# ${product.name}

> ${product.positioning}

Wingman is an open-source, terminal-first coding agent written in Rust. It works with
hosted or local model providers. License: ${product.license}. Latest release: ${product.version}.

- Repository: ${product.repo}
- Install: ${product.installOneLiner}

${sections}

## Site

- [Home](${SITE}/): what Wingman is, how one turn works, and how to start
- [Changelog](${SITE}/changelog)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

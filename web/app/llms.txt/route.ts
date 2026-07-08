import { product } from "@/content/product";
import { docsNav } from "@/content/docs-nav";

export const dynamic = "force-static";

const SITE = "https://wingman.dev";

// Follows the llms.txt convention (https://llmstxt.org): a Markdown map of the
// site for AI crawlers and assistants.
export async function GET() {
  const sections = docsNav
    .map((group) => {
      const links = group.items
        .filter((i) => i.href.startsWith("/"))
        .map((i) => `- [${i.title}](${SITE}${i.href})${i.keywords ? `: ${i.keywords}` : ""}`)
        .join("\n");
      return `## ${group.group}\n\n${links}`;
    })
    .join("\n\n");

  const body = `# ${product.name}

> ${product.positioning}

Wingman is an open-source, terminal-first coding agent written in Rust. Free,
provider-agnostic (73+ LLM providers), and self-hostable. License: ${product.license}.

- Repository: ${product.repo}
- Install: ${product.installOneLiner}

${sections}

## Marketing

- [Home](${SITE}/)
- [Features](${SITE}/features)
- [Compare](${SITE}/compare): vs Claude Code, Cursor, Aider
- [Use cases](${SITE}/use-cases)
- [Providers](${SITE}/providers)
- [Security & privacy](${SITE}/security)
- [Install](${SITE}/install)
- [Changelog](${SITE}/changelog)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

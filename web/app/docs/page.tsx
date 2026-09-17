import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/docs/DocPage";
import { docsNav } from "@/content/docs-nav";
import { product } from "@/content/product";

export const metadata: Metadata = {
  title: "Overview",
  description: "What Wingman is and how these docs are organized.",
};

export default function DocsOverview() {
  return (
    <DocPage
      path="/docs"
      title="Documentation"
      description="How to install Wingman, connect a model, and work with it day to day. New here? Start with the Quickstart."
    >
      {docsNav.map((group) => {
        const items = group.items.filter((i) => i.summary);
        return (
          <section key={group.group}>
            <h2 id={group.group.toLowerCase().replace(/\s+/g, "-")}>{group.group}</h2>
            <ul className="doc-index">
              {items.map((i) => (
                <li key={i.href}>
                  <Link href={i.href}>
                    <b>{i.title}</b>
                    <span>{i.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
      <p>
        Internals, like the crate layout and the agent loop, are documented in the{" "}
        <a href={product.docs} target="_blank" rel="noreferrer noopener">
          repository
        </a>
        .
      </p>
    </DocPage>
  );
}

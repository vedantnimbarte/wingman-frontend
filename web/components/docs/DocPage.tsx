import { Breadcrumbs } from "./Breadcrumbs";
import { PrevNext } from "./PrevNext";
import { Toc } from "./Toc";
import { CopyMarkdown } from "./CopyMarkdown";
import { product } from "@/content/product";

/**
 * Shared shell for a docs page: breadcrumbs, title, the article body, an
 * auto scroll-spy TOC on the right, and prev/next paging.
 */
export function DocPage({
  path,
  title,
  description,
  group,
  children,
}: {
  path: string;
  title: string;
  description?: string;
  group?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-5xl gap-12 px-6 py-10 md:px-10">
      <article id="doc-article" className="min-w-0 flex-1">
        <div className="mb-4 flex items-center justify-between gap-4">
          <Breadcrumbs group={group} title={title} />
          <CopyMarkdown title={title} description={description} path={path} />
        </div>
        <h1 className="text-display-lg text-ink">{title}</h1>
        {description ? <p className="mt-4 text-body-lg text-ink-subtle">{description}</p> : null}

        <div className="doc-prose mt-10">{children}</div>

        <div className="mt-12 border-t border-hairline pt-6 text-caption text-ink-tertiary">
          Something unclear or out of date?{" "}
          <a href={product.discussions} target="_blank" rel="noreferrer noopener" className="link-emphasis">
            Ask in Discussions
          </a>{" "}
          or{" "}
          <a href={product.issues} target="_blank" rel="noreferrer noopener" className="link-emphasis">
            open an issue
          </a>
          .
        </div>

        <PrevNext path={path} />
      </article>

      <aside className="w-52 shrink-0">
        <Toc />
      </aside>
    </div>
  );
}

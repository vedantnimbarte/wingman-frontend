import { PrevNext } from "./PrevNext";
import { Toc } from "./Toc";
import { CopyMarkdown } from "./CopyMarkdown";
import { product } from "@/content/product";

/** A docs page: title, lede, body, and a scroll-spy outline on wide screens. */
export function DocPage({
  path,
  title,
  description,
  children,
}: {
  path: string;
  title: string;
  description?: string;
  /** Unused since breadcrumbs went; kept so pages needn't change. */
  group?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="doc">
      <article id="doc-article" data-pagefind-body>
        <div className="doc-head">
          <h1>{title}</h1>
          <CopyMarkdown title={title} description={description} path={path} />
        </div>
        {description ? <p className="doc-lede">{description}</p> : null}

        <div className="prose">{children}</div>

        <p className="doc-foot" data-pagefind-ignore>
          Something unclear or out of date?{" "}
          <a href={product.discussions} target="_blank" rel="noreferrer noopener">
            Ask in Discussions
          </a>{" "}
          or{" "}
          <a href={product.issues} target="_blank" rel="noreferrer noopener">
            open an issue
          </a>
          .
        </p>
        <PrevNext path={path} />
      </article>
      <Toc />
    </div>
  );
}

import { terminals } from "@/content/terminals";
import { renderLine } from "@/components/terminalRender";

/** A Wingman terminal capture, rendered as real, selectable text. */
export function Terminal({ name, caption }: { name: keyof typeof terminals; caption?: string }) {
  const term = terminals[name];
  return (
    <figure className="term">
      <div className="term-title">{term.title}</div>
      <pre aria-label={term.summary}>
        <code>{term.lines.map((l, i) => renderLine(l, i))}</code>
      </pre>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

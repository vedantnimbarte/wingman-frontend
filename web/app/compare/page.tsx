import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { compareColumns, compareRows, type Cell } from "@/content/compare";
import { product } from "@/content/product";

export const metadata: Metadata = {
  title: "Compare",
  description:
    "How Wingman compares to Claude Code, Cursor, and Aider — open-source, provider-agnostic, terminal-first.",
};

function CellView({ value, highlight }: { value: Cell; highlight?: boolean }) {
  if (value === true)
    return (
      <span className={highlight ? "text-success" : "text-ink"} aria-label="yes">
        ✓
      </span>
    );
  if (value === false)
    return (
      <span className="text-ink-tertiary" aria-label="no">
        —
      </span>
    );
  return <span className={highlight ? "text-ink" : "text-ink-subtle"}>{value}</span>;
}

export default function ComparePage() {
  return (
    <>
      <PageHeader
        eyebrow="Compare"
        title="An open alternative to Claude Code, Cursor & Aider"
        lead="Wingman is open-source, provider-agnostic, and terminal-first — you own your keys, your models, and your data."
      />

      <section className="py-10">
        <Container>
          <div className="overflow-x-auto plane rounded-xl">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-hairline">
                  <th className="px-5 py-4 text-caption uppercase text-ink-tertiary">Feature</th>
                  {compareColumns.map((c, i) => (
                    <th
                      key={c}
                      className={
                        "px-5 py-4 text-body-sm font-medium " +
                        (i === 0 ? "text-primary" : "text-ink-subtle")
                      }
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={row.feature} className="border-b border-hairline/50 last:border-0">
                    <td className="px-5 py-4 text-body-sm text-ink">{row.feature}</td>
                    <td className="bg-primary/[0.06] px-5 py-4 text-body-sm">
                      <CellView value={row.wingman} highlight />
                    </td>
                    <td className="px-5 py-4 text-body-sm">
                      <CellView value={row.claude} />
                    </td>
                    <td className="px-5 py-4 text-body-sm">
                      <CellView value={row.cursor} />
                    </td>
                    <td className="px-5 py-4 text-body-sm">
                      <CellView value={row.aider} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-3xl text-caption text-ink-tertiary">
            This reflects our understanding of each tool at publish time and may lag their latest
            releases. Spot something wrong?{" "}
            <a href={product.issues} target="_blank" rel="noreferrer noopener" className="link-emphasis">
              Open an issue
            </a>{" "}
            and we&rsquo;ll fix it.
          </p>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}

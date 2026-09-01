import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { CopyOneLiner } from "@/components/ui/CopyOneLiner";
import { Eyebrow } from "@/components/ui/Text";
import { Terminal } from "@/components/Terminal";
import { useCases } from "@/content/usecases";
import { terminals } from "@/content/terminals";

export const metadata: Metadata = {
  title: "Use cases",
  description: "Practical recipes — CI review, multi-agent features, fully-local workflows, batch fixes, and more.",
};

export default function UseCasesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Use cases"
        title="Recipes for real work"
        lead="A few ways teams put Wingman to work — from CI review to multi-agent features to fully-offline coding."
      />

      <section className="py-section-sm">
        <Container>
          <div className="space-y-6">
            {useCases.map((uc, i) => {
              const hasTerminal = uc.terminal && uc.terminal in terminals;
              return (
                <div
                  key={uc.id}
                  id={uc.id}
                  className="grid items-start gap-8 rounded-xl border border-hairline bg-surface-1/70 p-7 md:p-8 lg:grid-cols-2"
                >
                  <div>
                    <Eyebrow>{`Recipe ${String(i + 1).padStart(2, "0")}`}</Eyebrow>
                    <h2 className="mt-3 text-card-title text-ink">{uc.title}</h2>
                    <p className="mt-3 text-body text-ink-subtle">{uc.blurb}</p>
                    {uc.command ? <CopyOneLiner command={uc.command} className="mt-5" /> : null}
                    {uc.points ? (
                      <ul className="mt-5 space-y-2">
                        {uc.points.map((p) => (
                          <li key={p} className="flex gap-3 text-body-sm text-ink-muted">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" aria-hidden="true" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                  {hasTerminal ? (
                    <Terminal name={uc.terminal as keyof typeof terminals} />
                  ) : (
                    <div className="hidden lg:block" />
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}

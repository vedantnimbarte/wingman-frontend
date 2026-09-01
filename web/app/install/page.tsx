import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { CopyOneLiner } from "@/components/ui/CopyOneLiner";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { platforms, glibcNote, installSteps, firstRun } from "@/content/platforms";
import { product } from "@/content/product";

export const metadata: Metadata = {
  title: "Install",
  description:
    "Install Wingman with a single command. Prebuilt binaries for Linux (x86_64/aarch64), macOS (Apple Silicon), and Windows; Intel macOS builds from source.",
};

export default function InstallPage() {
  return (
    <>
      <PageHeader
        eyebrow="Install"
        title="One command. No clone, no cargo, no build."
        lead="Download a prebuilt binary and drop it on your PATH. Then log in to a provider and go."
      />

      {/* One-liner hero */}
      <section className="py-section-sm">
        <Container>
          <div className="grid max-w-4xl gap-6 md:grid-cols-2">
            <div>
              <p className="label mb-3 text-ink-tertiary">macOS · Linux</p>
              <CopyOneLiner command={product.installOneLiner} />
            </div>
            <div>
              <p className="label mb-3 text-ink-tertiary">Windows · PowerShell</p>
              <CopyOneLiner
                command={product.installWindows}
                label="Copy Windows install command"
              />
            </div>
          </div>
          <p className="mt-5 text-body-sm text-ink-tertiary">
            Verify with <code className="font-mono text-ink-muted">wingman --version</code>. Pin a
            release with <code className="font-mono text-ink-muted">VERSION={product.version}</code>,
            or change the target directory with{" "}
            <code className="font-mono text-ink-muted">WINGMAN_INSTALL_DIR</code>.
          </p>
        </Container>
      </section>

      {/* Platform matrix */}
      <section className="py-section-sm">
        <Container>
          <h2 className="text-display-md text-ink">Supported platforms</h2>
          <div className="mt-8 overflow-x-auto plane rounded-xl">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-hairline text-caption uppercase text-ink-tertiary">
                  <th className="px-6 py-4 font-medium">OS</th>
                  <th className="px-6 py-4 font-medium">Architecture</th>
                  <th className="px-6 py-4 font-medium">Method</th>
                  <th className="px-6 py-4 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {platforms.map((p, i) => (
                  <tr key={i} className="border-b border-hairline/50 last:border-0">
                    <td className="px-6 py-4 text-body text-ink">{p.os}</td>
                    <td className="px-6 py-4 text-body-sm text-ink-muted">{p.arch}</td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-mono text-ink-muted">{p.method}</span>
                    </td>
                    <td className="px-6 py-4 text-body-sm text-ink-subtle">
                      {p.prebuilt ? (
                        <span className="mr-2 inline-flex items-center rounded-full bg-surface-2 px-2 py-0.5 text-caption text-success">
                          prebuilt
                        </span>
                      ) : (
                        <span className="mr-2 inline-flex items-center rounded-full bg-surface-2 px-2 py-0.5 text-caption text-ink-muted">
                          from source
                        </span>
                      )}
                      {p.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-3xl text-body-sm text-ink-tertiary">{glibcNote}</p>
        </Container>
      </section>

      {/* Per-OS commands */}
      <section className="py-section-sm">
        <Container>
          <div className="grid gap-4">
            {Object.values(installSteps).map((s) => (
              <div key={s.label} className="rounded-lg border border-hairline bg-surface-1 p-5 shadow-lift">
                <p className="mb-3 text-body-sm font-medium text-ink">{s.label}</p>
                <CopyOneLiner command={s.cmd} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* First run */}
      <section className="py-section-sm">
        <Container>
          <h2 className="text-display-md text-ink">First run</h2>
          <ol className="mt-8 space-y-4">
            {firstRun.map((step, i) => (
              <li key={step.cmd} className="flex flex-col gap-2 rounded-lg border border-hairline bg-surface-1 p-5 shadow-lift sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-hairline text-caption text-ink-subtle">
                    {i + 1}
                  </span>
                  <code className="font-mono text-mono text-ink">{step.cmd}</code>
                </div>
                <span className="pl-11 text-body-sm text-ink-subtle sm:pl-0 sm:text-right">{step.desc}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-body-sm text-ink-tertiary">
            Config lives at <code className="font-mono text-ink-muted">~/.wingman/config.toml</code>{" "}
            (global) and <code className="font-mono text-ink-muted">.wingman/config.toml</code> (per
            project). Full setup in the{" "}
            <a href="/docs" className="link-emphasis">
              docs
            </a>
            .
          </p>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}

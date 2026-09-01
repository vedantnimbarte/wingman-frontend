import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Text";
import { CopyOneLiner } from "@/components/ui/CopyOneLiner";
import { GitHubIcon } from "@/components/GitHubIcon";
import { SymbolGraph } from "@/components/three/SymbolGraph";
import { product, trustPoints } from "@/content/product";

/**
 * The thesis, stated in two words and two colours: most agents grep, this one
 * resolves. The drawing performs the same sentence.
 *
 * The headline runs full width rather than inside a column, so both lines hold
 * on one line each — the parallel is the whole point, and a wrap destroys it.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Container className="relative pb-section-sm pt-16 md:pt-24">
        <div className="animate-fade-up">
          <Eyebrow>Open-source coding agent · Rust</Eyebrow>
          <h1 className="mt-7 text-display-xl">
            <span className="block whitespace-nowrap text-unresolved">Most agents grep.</span>
            <span className="block whitespace-nowrap text-ink">
              This one <span className="text-resolved">resolves</span>.
            </span>
          </h1>
        </div>

        <div className="mt-14 grid gap-14 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-20">
          <div className="animate-fade-up [animation-delay:80ms]">
            <p className="max-w-prose text-body-lg text-ink-subtle">
              Wingman asks the language server and a local semantic index instead of
              matching names — so it follows imports, types, and re-exports, and spends
              a fraction of the context doing it.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="/install" variant="primary" size="lg" analytics="hero_install">
                Install Wingman
              </Button>
              <Button
                href={product.repo}
                external
                variant="secondary"
                size="lg"
                analytics="hero_github"
              >
                <GitHubIcon />
                Star on GitHub
              </Button>
            </div>

            <CopyOneLiner command={product.installOneLiner} className="mt-7" />

            <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-2 text-body-sm text-ink-tertiary">
              {trustPoints.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span
                    className="h-[3px] w-[3px] rounded-full bg-primary/80"
                    aria-hidden="true"
                  />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-up [animation-delay:160ms]">
            <SymbolGraph />
          </div>
        </div>
      </Container>
    </section>
  );
}

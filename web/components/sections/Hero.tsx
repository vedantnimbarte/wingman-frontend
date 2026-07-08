import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Text";
import { CopyOneLiner } from "@/components/ui/CopyOneLiner";
import { GitHubIcon } from "@/components/GitHubIcon";
import { Terminal } from "@/components/Terminal";
import { product, trustPoints } from "@/content/product";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-wash pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative py-20 md:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div className="animate-fade-up">
            <Eyebrow>Open-source coding agent</Eyebrow>
            <h1 className="mt-4 text-display-xl text-ink">
              Your terminal&rsquo;s
              <br />
              <span className="text-primary">wingman.</span>
            </h1>
            <p className="mt-6 max-w-xl text-body-lg text-ink-subtle">
              {product.positioning}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/install" variant="primary" size="lg" analytics="hero_install">
                Install
              </Button>
              <Button href={product.repo} external variant="secondary" size="lg" analytics="hero_github">
                <GitHubIcon />
                Star on GitHub
              </Button>
            </div>

            <CopyOneLiner command={product.installOneLiner} className="mt-6 max-w-xl" />

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-body-sm text-ink-tertiary">
              {trustPoints.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-primary/70" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-up [animation-delay:120ms]">
            <Terminal name="hero" animated />
          </div>
        </div>
      </Container>
    </section>
  );
}

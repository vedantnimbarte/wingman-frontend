import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { GitHubIcon } from "@/components/GitHubIcon";
import { product } from "@/content/product";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden py-section">
      {/* The page's light source, brought back down for the close. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px]"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 100%, rgba(107,120,232,0.14), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-display-lg text-ink">Stop guessing at your own codebase.</h2>
          <p className="mx-auto mt-6 max-w-xl text-body-lg text-ink-subtle">
            Free, open source, and yours to run — with any provider, or a model that
            never leaves your machine.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href="/install" variant="primary" size="lg" analytics="cta_install">
              Install Wingman
            </Button>
            <Button
              href={product.repo}
              external
              variant="secondary"
              size="lg"
              analytics="cta_github"
            >
              <GitHubIcon />
              Star on GitHub
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

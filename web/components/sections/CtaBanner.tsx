import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GitHubIcon } from "@/components/GitHubIcon";
import { product } from "@/content/product";

export function CtaBanner() {
  return (
    <section className="py-16">
      <Container>
        <div className="rounded-lg border border-hairline bg-surface-1 px-6 py-14 text-center shadow-lift md:px-12">
          <h2 className="mx-auto max-w-2xl text-headline text-ink">
            Give your terminal a wingman.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-body-lg text-ink-subtle">
            Free, open-source, and yours to run — with any provider or a fully
            local model.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/install" variant="primary" size="lg" analytics="cta_install">
              Install Wingman
            </Button>
            <Button href={product.repo} external variant="secondary" size="lg" analytics="cta_github">
              <GitHubIcon />
              Star on GitHub
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

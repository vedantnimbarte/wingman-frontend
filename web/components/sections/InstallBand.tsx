import { Container } from "@/components/ui/Container";
import { CopyOneLiner } from "@/components/ui/CopyOneLiner";
import { Button } from "@/components/ui/Button";
import { product } from "@/content/product";

export function InstallBand() {
  return (
    <section className="py-16">
      <Container>
        <div className="rounded-xl border border-hairline bg-surface-1 p-8 shadow-lift md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <h2 className="text-display-md text-ink">Up and running in one line</h2>
              <p className="mt-3 text-body-lg text-ink-subtle">
                No clone, no cargo, no build. Prebuilt binaries for Linux, macOS
                (Apple Silicon), and Windows.
              </p>
            </div>
            <div>
              <CopyOneLiner command={product.installOneLiner} />
              <div className="mt-4 flex flex-wrap gap-3">
                <Button href="/install" variant="secondary">
                  All install options
                </Button>
                <Button href="/docs" variant="tertiary">
                  Read the docs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

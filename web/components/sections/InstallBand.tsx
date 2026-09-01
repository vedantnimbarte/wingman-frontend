import { Container } from "@/components/ui/Container";
import { CopyOneLiner } from "@/components/ui/CopyOneLiner";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Text";
import { product } from "@/content/product";

export function InstallBand() {
  return (
    <section className="py-section">
      <Container>
        <Reveal className="plane rounded-xl p-8 md:p-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
            <div>
              <Eyebrow>Install</Eyebrow>
              <h2 className="mt-5 text-display-md text-ink">Running in one line</h2>
              <p className="mt-4 max-w-prose text-body-lg text-ink-subtle">
                No clone, no cargo, no build. Prebuilt binaries for Linux, macOS
                (Apple silicon), and Windows.
              </p>
            </div>
            <div>
              <p className="label mb-3 text-ink-tertiary">macOS · Linux</p>
              <CopyOneLiner command={product.installOneLiner} />
              <p className="label mb-3 mt-7 text-ink-tertiary">Windows · PowerShell</p>
              <CopyOneLiner
                command={product.installWindows}
                label="Copy Windows install command"
              />
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="/install" variant="secondary">
                  All install options
                </Button>
                <Button href="/docs/quickstart" variant="tertiary">
                  Read the quickstart →
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

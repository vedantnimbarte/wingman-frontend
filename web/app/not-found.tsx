import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-eyebrow uppercase text-primary">404</p>
      <h1 className="mt-4 text-display-md text-ink">This page wandered off.</h1>
      <p className="mt-3 max-w-md text-body-lg text-ink-subtle">
        The link may be broken or the page may have moved.
      </p>
      <div className="mt-8">
        <Button href="/" variant="primary" size="lg">
          Back to home
        </Button>
      </div>
    </Container>
  );
}

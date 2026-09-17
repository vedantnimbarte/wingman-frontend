import Link from "next/link";

export default function NotFound() {
  return (
    <section className="sec hero">
      <h1>This page doesn&apos;t exist.</h1>
      <p className="lede">
        The link may be old: this site was trimmed to the home page, the docs and the changelog.{" "}
        <Link href="/" className="inline-link">Go to the home page</Link> or{" "}
        <Link href="/docs" className="inline-link">read the docs</Link>.
      </p>
    </section>
  );
}

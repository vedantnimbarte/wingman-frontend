# Content Model

All product-facing facts live in `web/content/*.ts` — **typed, in one place, and
kept in sync with the product repo.** Components read from here; they don't
hard-code copy. This makes the site easy to update and gives the accuracy gate
(below) a single surface to check.

## Files

### `product.ts`
The core facts object + `trustPoints`.
```ts
product = {
  name, tagline, positioning, altTo[],
  repo, docs, architectureDocs, issues, discussions,
  license, version,
  installOneLiner,   // the exact curl … | sh command
  fromSource,        // cargo install --git …
}
```
Change the version, tagline, or install command here — it propagates everywhere.

### `providers.ts`
`providers[]` (`{ name, note }`) + `providerCaption`. The named adapters; the
caption covers "60+ more via the OpenAI-compatible adapter."

### `platforms.ts`
The install matrix and steps — **must match the release workflow + `install.sh`
in the product repo.**
```ts
platforms: { os, arch, method, prebuilt, note? }[]
glibcNote            // the glibc ≥ 2.38 caveat
installSteps         // { unix, windows, source }: { label, cmd }
firstRun             // { cmd, desc }[]
```

### `features.ts`
```ts
Feature = { id, eyebrow, title, blurb, points?, terminal? }
pillars: Feature[]            // the 4 headline pillars (index.md §pillars)
secondaryFeatures: Feature[]  // the "everything else" grid
```
`id` is used as the section anchor (`/features#mcp`). `terminal` names a fixture
in `terminals.ts` (optional).

### `terminals.ts`
The `<Terminal>` fixtures — captures as structured text.
```ts
Span = string | { t: string, c: 'accent'|'dim'|'ok'|'path'|'user' }
Line = Span | Span[]
Term = { title, summary, lines: Line[] }
terminals: Record<string, Term>
```
- `title` → window chrome label.
- `summary` → the `aria-label` (accessibility) and default caption text.
- `lines` → each line is a string, or an array of spans for per-token color.
- Keep colors **restrained** — `accent` (lavender), `dim`, `ok` (green), `path`,
  `user`. No rainbow (DESIGN.md).

### `nav.ts`
`navLinks` (top nav) and `footerColumns` (footer). External links carry
`external: true`.

## Accuracy gate (PRD §9)

The product repo values honest positioning; the site must match it. **Before
every deploy, cross-check `content/` against the repo:**

- Provider count/names, platform support, and the **glibc floor** match the repo.
- The install one-liner and `cargo install` command are verified working.
- No features claimed that are roadmap-only — mirror repo caveats (pilot is
  advanced; some daemon discovery sources are planned). The About page's "ships
  today vs planned" lists must stay honest.
- No fabricated testimonials, user counts, or logos of non-users. The
  `testimonial-card` pattern exists but stays unused until real quotes exist.

Because everything funnels through `content/`, this check is a diff of a handful
of files — not a page-by-page copy audit.

## How to edit

- **A fact changed in the product** (new version, new provider, platform tweak)
  → edit the relevant `content/*.ts`. Done.
- **New pillar / feature** → add a `Feature` to `features.ts`; optionally add a
  matching fixture to `terminals.ts` and reference it via `terminal`.
- **New nav/footer link** → edit `nav.ts`.

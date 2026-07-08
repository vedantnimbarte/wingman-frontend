# Component Reference

Every component lives under `web/components/`. Primitives are in `ui/`,
composable page blocks in `sections/`. Server components unless marked
**client**.

## UI primitives (`components/ui/`)

### `<Container>`
Centered content wrapper (`max-w-content` 1280px + responsive padding).
```tsx
<Container className="py-16">…</Container>
```
| Prop | Type | Default |
|---|---|---|
| `className` | `string` | — |
| `children` | `ReactNode` | — |

### `<Button>`
A link styled as a button (renders `next/link` for internal hrefs, `<a
target="_blank">` for external / `http…`).
```tsx
<Button href="/install" variant="primary" size="lg">Install</Button>
<Button href={product.repo} external variant="secondary"><GitHubIcon/> Star on GitHub</Button>
```
| Prop | Type | Default | Notes |
|---|---|---|---|
| `href` | `string` | — | required |
| `variant` | `primary \| secondary \| tertiary \| inverse` | `primary` | |
| `size` | `md \| lg` | `md` | md ≥ 40px tall, lg ≥ 44px (touch targets) |
| `external` | `boolean` | auto for `http…` | opens in new tab, `rel=noreferrer noopener` |

Variants: **primary** = lavender fill (the one CTA color) · **secondary** =
surface-1 + hairline · **tertiary** = text-only · **inverse** = white-on-dark.

### `<Surface>`
A lifted panel — surface background + hairline + top-edge highlight.
```tsx
<Surface level={2} rounded="xl">…</Surface>
```
| Prop | Type | Default |
|---|---|---|
| `level` | `1 \| 2 \| 3 \| 4` | `1` |
| `rounded` | `lg \| xl \| xxl` | `lg` |

Level ≥ 2 uses the stronger hairline. (Many sections apply the surface classes
directly for finer control; `<Surface>` is the shorthand.)

### `<Eyebrow>` / `<SectionHeading>` / `<StatusBadge>` (`ui/Text.tsx`)
```tsx
<SectionHeading eyebrow="Built-in" title="Everything else in the box" lead="…" as="h2" />
```
- `Eyebrow` — uppercase, positive-tracked, lavender. `{ children, className? }`
- `SectionHeading` — `{ eyebrow?, title, lead?, as?: 'h1'|'h2' (default 'h2'), className? }`
- `StatusBadge` — pill badge. `{ children }`

### `<CodeBlock>` / `<Code>` (`ui/CodeBlock.tsx`)
Multi-line code (config/command snippets) and inline mono tokens — used on `/docs`.
```tsx
<CodeBlock>{`[mcp.github]\ncommand = "npx"`}</CodeBlock>
<p>Switch live with <Code>/mode</Code>.</p>
```

### `<CopyOneLiner>` · **client**
Mono chip + one-click copy button; success announced to screen readers.
```tsx
<CopyOneLiner command={product.installOneLiner} />
```
| Prop | Type | Default |
|---|---|---|
| `command` | `string` | — |
| `label` | `string` | `"Copy install command"` |

## Brand & icons

- `<Wordmark className?/>` — lavender chevron + "wingman", links to `/`.
- `<GitHubIcon className?/>` — inline SVG (`fill: currentColor`).

## `<Terminal>` — the "product screenshot"

Renders a fixture from `content/terminals.ts` as real, selectable text inside a
window-chrome frame (`rounded-xl`, hairline, top-edge highlight).
```tsx
<Terminal name="hero" caption="The Wingman TUI." />
```
| Prop | Type | Notes |
|---|---|---|
| `name` | `keyof typeof terminals` | which fixture (`hero`, `model`, `print`, `knows`, `pilot`) |
| `caption` | `string?` | optional `<figcaption>` |

Coloring is driven by span color keys (`accent`, `dim`, `ok`, `path`, `user`)
mapped to a **restrained** on-dark palette — keep it narrow (no rainbow). To add
a capture, add a fixture (see [CONTENT.md](CONTENT.md)).

## Sections (`components/sections/`)

Composable blocks a page assembles top-down. Most take no props (they read from
`content/`); the reusable ones are parameterized.

| Component | Props | Used on |
|---|---|---|
| `Hero` | — | Home |
| `ProviderMarquee` | — | Home |
| `PillarSection` | `{ feature: Feature, index: number }` | Home, Features |
| `FeatureGrid` | `{ eyebrow?, title, lead?, features: Feature[] }` | Home, Features |
| `InstallBand` | — | Home |
| `CtaBanner` | — | Home, Features, Install, About |
| `PageHeader` | `{ eyebrow?, title, lead? }` | Features, Install, Changelog, About |

`PillarSection` alternates the terminal side by `index` parity and renders
`feature.points` as a lavender checklist; it only shows a terminal if
`feature.terminal` names a real fixture.

## Global chrome

- `components/nav/TopNav.tsx` · **client** — sticky 56px header; wordmark, center
  links (from `content/nav.ts`), `Star on GitHub` + `Install` CTAs; hamburger
  menu < 768px with `aria-expanded`.
- `components/footer/Footer.tsx` — link grid (`footerColumns`), wordmark,
  version/license/platform line.

Both are mounted once in `app/layout.tsx`, so every page gets them.

## Conventions

- Import via the `@/` alias (`@/components/…`, `@/content/…`, `@/lib/…`).
- Prefer a **server component**; add `"use client"` only for interactivity
  (state, effects, event handlers, clipboard).
- Compose with tokens/utilities — no inline hex or ad-hoc spacing.
- New reusable variant → a new prop or a new component, documented here.

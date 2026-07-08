# Architecture

## Stack & rationale

| Choice | Why |
|---|---|
| **Next.js 14, App Router** | File-based routing, first-class metadata/SEO, `next/font` self-hosting, trivial static export. |
| **TypeScript** | Typed content model + component props. |
| **Tailwind CSS 3** | The design system is a set of tokens; `theme.extend` maps `DESIGN.md` 1:1. `theme.fontSize` tuples carry size + line-height + tracking + weight per token. |
| **No UI/animation libraries** | The design is restrained (no shadows, one accent, minimal motion). A dependency would be more than the site needs. |

## Rendering model

Everything is **static (SSG)**. There is no server runtime in production — the
output is HTML + CSS + a small JS bundle.

- **Server Components (default):** every page and section. They render to HTML at
  build time. No `"use client"`.
- **Client Components (ship JS):** exactly two —
  - `components/nav/TopNav.tsx` — the mobile menu toggle (`useState`).
  - `components/ui/CopyOneLiner.tsx` — the clipboard copy button.
- **Build-time data:** `lib/releases.ts` fetches GitHub Releases during the
  build for `/changelog`, with a static fallback. No client-side fetching.

Consequence: First Load JS is ~87–95 kB and the site works without JS (content
readable, install command selectable) — the copy *button* and mobile menu are
the only progressive enhancements.

## Data flow

```
content/*.ts  ──►  section components  ──►  page routes  ──►  static HTML
   (facts)          (presentation)          (composition)

tailwind.config.ts (tokens)  ──►  utility classes on every component
DESIGN.md  ──►  tailwind.config.ts   (manual, reviewed mapping)

GitHub Releases API ──(build time)──► lib/releases.ts ──► /changelog
```

Nothing renders literal product copy inline; a page composes section components,
and sections read from `content/`. To change a fact, edit `content/` — not JSX.

## File map (`web/`)

```
app/
  layout.tsx            Root layout: fonts, <TopNav/>, <Footer/>, metadata, skip-link
  globals.css           Tailwind layers + base resets + .lift / .hero-wash / .container-content
  page.tsx              Home (/)
  features/page.tsx     /features
  install/page.tsx      /install
  docs/layout.tsx       Docs portal shell (sidebar + Cmd+K search) via <DocsShell/>
  docs/page.tsx         /docs overview
  docs/*/page.tsx       12 docs pages (quickstart, concepts, providers, configuration,
                        tools-mcp, memory, pilot, formats, cli, tui, troubleshooting)
  changelog/page.tsx    /changelog   (async server component; build-time fetch)
  about/page.tsx        /about

components/docs/        Docs portal: DocsShell, DocsSidebar, DocsSearch, DocPage,
                        Toc (scroll-spy), Callout, DocHeading (anchors), ReferenceTable,
                        Breadcrumbs, PrevNext
content/docs-nav.ts     Docs sidebar tree + search index + prev/next order
  not-found.tsx         404
  sitemap.ts robots.ts  SEO route handlers

components/
  Wordmark.tsx          Brand mark (lavender chevron + wordmark)
  GitHubIcon.tsx        Inline SVG icon
  Terminal.tsx          The "product screenshot" — renders a content/terminals fixture
  nav/TopNav.tsx        Sticky header (client)
  footer/Footer.tsx     Footer link grid
  ui/                   Primitives: Button, Surface, Container, Text, CopyOneLiner
  sections/             Composable page sections (Hero, PillarSection, FeatureGrid, …)

content/                Typed data: product, providers, platforms, features, terminals, nav
lib/                    fonts.ts (next/font), cn.ts (class joiner), releases.ts (GH fetch)
tailwind.config.ts      Design tokens (colors, type scale, spacing, radii, breakpoints)
```

## Routing & metadata

- Routes are folders under `app/` with a `page.tsx`.
- Global metadata (title template, description, OG/Twitter, `metadataBase`) lives
  in `app/layout.tsx`. Each page exports its own `metadata` for title/description.
- `app/sitemap.ts` and `app/robots.ts` are Next metadata route handlers →
  `/sitemap.xml` and `/robots.txt`.
- Home injects `SoftwareApplication` JSON-LD.

> **Note:** `metadataBase`, the sitemap base URL, and OG image are placeholders
> (`https://wingman.dev`). Update them when the domain is finalized.

## Accessibility model

- Single global focus treatment (`:focus-visible`) in `globals.css` — 2px
  `primary-focus` ring (DESIGN.md elevation level 4).
- Skip-to-content link in the layout; `<main id="main">` target.
- `prefers-reduced-motion` disables transitions/animations globally.
- Terminal captures are real text with an `aria-label` summary.
- Nav/menu use `aria-expanded`; copy button announces success via `aria-live`.

## Performance model

- Static prerender; no runtime server.
- Fonts self-hosted by `next/font` (no external requests, no CLS from font swap
  beyond `display: swap`).
- Motion is limited to a small `fade-up` on the hero and a caret blink.
- No images yet — terminal "screenshots" are text/CSS. When raster assets are
  added, use `next/image` with explicit dimensions to preserve zero-CLS.

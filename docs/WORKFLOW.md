# Workflow

## Setup

```bash
cd web
npm install
npm run dev      # http://localhost:3000
```

Node 18.17+ (built and verified on Node 24). Scripts:

| Script | Does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static production build (`.next/`) |
| `npm run start` | Serve the production build locally |
| `npm run lint` | ESLint (`next/core-web-vitals`) |

## Common tasks

### Change a product fact (version, install command, provider…)
Edit the relevant file in `content/` (see [CONTENT.md](CONTENT.md)). Nothing else
to touch — components read from there.

### Add a new page
1. Create `app/<route>/page.tsx` exporting a default component and a `metadata`
   object (`{ title, description }` — the title is templated to `… · Wingman`).
2. Compose it from `sections/` blocks + `<Container>`; open with `<PageHeader>`.
3. Add it to `content/nav.ts` (`navLinks` and/or `footerColumns`) and to
   `app/sitemap.ts`.

### Add a section to a page
Build it under `components/sections/` (server component; read facts from
`content/`, style with tokens), then drop it into the page. Reuse
`PillarSection` / `FeatureGrid` / `PageHeader` where they fit.

### Add a terminal capture
1. Add a fixture to `content/terminals.ts` (`title`, `summary`, `lines`). Keep
   the color palette restrained.
2. Reference it: `<Terminal name="yourKey" />`, or set `terminal: 'yourKey'` on a
   `Feature` so `PillarSection` renders it.

### Add a feature card / pillar
Add a `Feature` to `pillars` or `secondaryFeatures` in `content/features.ts`.
Pillars render via `PillarSection` (with an optional terminal); secondary
features render as cards via `FeatureGrid`.

## Conventions

- **Server-first.** Add `"use client"` only for interactivity. Today only
  `TopNav` and `CopyOneLiner` are client components — keep that list short.
- **Tokens only.** No inline hex or ad-hoc spacing; extend `tailwind.config.ts`
  if a value is missing. Review against the guardrails in
  [DESIGN-TOKENS.md](DESIGN-TOKENS.md).
- **Imports** use the `@/` alias.
- **Accessibility** is not optional: keep the focus ring, landmarks, `aria-*` on
  interactive elements, and real-text terminals.

## Pre-deploy checklist

- [ ] `npm run build` is clean (types + lint pass).
- [ ] Content accuracy gate passed (see [CONTENT.md](CONTENT.md)) — providers,
      platforms, glibc floor, install commands match the product repo.
- [ ] `metadataBase` / sitemap base URL / OG image updated for the real domain
      (currently placeholder `https://wingman.dev`).
- [ ] Keyboard + screen-reader smoke test on Home and Install.
- [ ] Lighthouse ≥ 95 perf/SEO, ≥ 100 a11y on Home and Install.

## Deployment

The site is static — deploy anywhere that serves a Next.js SSG build.

- **Vercel (recommended):** point it at `web/`; zero config. Preview deploy per PR.
- **Static export:** add `output: 'export'` to `next.config.mjs` and
  `npm run build` emits `out/` for any static host (Pages, Netlify, S3/CDN).
  - Note: `/changelog` fetches GitHub Releases at build time. For static export,
    ensure the build machine has network (and optionally a `GITHUB_TOKEN` to
    avoid the unauthenticated rate limit). It falls back to a static seed on
    failure.

## Known follow-ups (not yet built — PLAN phases 5–6)

- Branded OG images per page (`next/og`).
- Real logo/wordmark asset (placeholder chevron today).
- Privacy-safe analytics + event instrumentation (one-liner copies, CTA clicks).
- Lighthouse CI budget in the build pipeline.
- Final domain + hosting config.

## Dependency notes

`npm audit` reports a few vulnerabilities in transitive **dev** dependencies
(eslint/next toolchain). They don't affect the production bundle; run
`npm audit fix` opportunistically and re-verify the build.

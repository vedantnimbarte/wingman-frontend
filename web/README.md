# Wingman — marketing website

Next.js (App Router) + TypeScript + Tailwind. Dark-only marketing site for
[Wingman](https://github.com/vedantnimbarte/Wingman). Implements the design
system in `../DESIGN.md`; requirements in `../PRD.md`; build plan in `../PLAN.md`.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## Structure

```
app/            routes: / /features /install /changelog /about (+ sitemap, robots)
components/
  ui/           Button, Surface, Container, Text, CopyOneLiner
  sections/     Hero, ProviderMarquee, PillarSection, FeatureGrid, InstallBand, CtaBanner, PageHeader
  Terminal.tsx  the "product screenshot" — Wingman terminal captures as real text
  nav/ footer/  global chrome
content/        single source of product facts (keep in sync with the repo)
lib/            fonts, className helper, GitHub releases fetch
```

## Design tokens

All colors, type scale, spacing, and radii live in `tailwind.config.ts`,
derived from `../DESIGN.md`. Components never hard-code hex values.

- Canvas `#010102` · single lavender accent `#5e6ad2` (brand/CTA/focus/links only)
- Four-step surface ladder for depth (no drop shadows)
- Fonts: Inter + JetBrains Mono, self-hosted via `next/font`
- Dark theme only

## Content accuracy

`content/*.ts` is the single source for provider counts, platform support, the
glibc floor, and CLI commands. Cross-check against the product repo's
`README.md` / `docs/` before every deploy (PRD §9).

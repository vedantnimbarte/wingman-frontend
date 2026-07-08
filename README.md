# Wingman Frontend

Marketing website for [Wingman](https://github.com/vedantnimbarte/Wingman) — the
open-source, terminal-first coding agent. Dark, Linear-inspired design; built
with Next.js + Tailwind.

## Layout

```
wingman-frontend/
  PRD.md        Product requirements (goals, IA, page specs, metrics)
  PLAN.md       Phased implementation plan
  DESIGN.md     Design system (tokens, do's/don'ts)
  docs/         Developer documentation for the site (start here to contribute)
  web/          The Next.js app
```

## Quick start

```bash
cd web
npm install
npm run dev      # http://localhost:3000
```

## Docs

- **Building on the site?** Start with [`docs/README.md`](docs/README.md) →
  architecture, components, tokens, content model, workflow.
- **What are we building and why?** [`PRD.md`](PRD.md).
- **How's it styled?** [`DESIGN.md`](DESIGN.md) +
  [`docs/DESIGN-TOKENS.md`](docs/DESIGN-TOKENS.md).

## Status

Pages built and building green (SSG, ~87–95 kB First Load JS): Home, Features,
Install, Changelog, About. Not yet done (PLAN phases 5–6): OG images, real logo,
analytics, Lighthouse CI, deploy config.

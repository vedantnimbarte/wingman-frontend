# Wingman Website — Documentation

Developer documentation for the Wingman marketing site (the `web/` Next.js app).
For *product* requirements and design, see the sibling docs:

- [`../PRD.md`](../PRD.md) — product requirements (goals, IA, page specs, metrics)
- [`../PLAN.md`](../PLAN.md) — phased implementation plan
- [`../DESIGN.md`](../DESIGN.md) — the design system (tokens, do's/don'ts)

## This folder

| Doc | What it covers |
|---|---|
| [ARCHITECTURE.md](ARCHITECTURE.md) | Project structure, rendering model, data flow, file map |
| [DESIGN-TOKENS.md](DESIGN-TOKENS.md) | How `DESIGN.md` maps to Tailwind + the usage rules to enforce |
| [COMPONENTS.md](COMPONENTS.md) | Every component and section, with props and where it's used |
| [CONTENT.md](CONTENT.md) | The `content/` data model + the accuracy gate |
| [WORKFLOW.md](WORKFLOW.md) | Dev setup, common tasks (add a page/section/terminal), deploy |

## 60-second orientation

- **Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS 3. Dark-only.
- **Rendering:** every route is static (SSG). Only two client components ship JS
  (`TopNav`, `CopyOneLiner`). First Load JS is ~87–95 kB.
- **Source of truth for facts:** `web/content/*.ts`. Copy is not hard-coded in
  components — it flows from there.
- **Source of truth for style:** `web/tailwind.config.ts`, derived from
  `../DESIGN.md`. Components never hard-code hex/spacing.
- **The "product screenshot" is the terminal:** the `<Terminal>` component
  renders Wingman CLI captures as real, selectable text.

## Run it

```bash
cd web
npm install
npm run dev      # http://localhost:3000
npm run build    # static production build
npm run lint
```

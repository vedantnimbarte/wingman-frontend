# Wingman Frontend

The marketing website and documentation portal for **[Wingman](https://github.com/vedantnimbarte/Wingman)** — an open-source, terminal-first, multi-provider coding agent written in Rust.

A dark, [Linear](https://linear.app)-inspired site built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS**. Every route is statically rendered (SSG) with near-zero client JavaScript, self-hosted fonts, and no external runtime requests.

- **Live product:** https://github.com/vedantnimbarte/Wingman
- **Stack:** Next.js 14 · React 18 · TypeScript · Tailwind CSS 3
- **Theme:** dark-only, single lavender accent, terminal captures as the hero visual
- **License:** MIT

---

## Table of contents

- [What this is](#what-this-is)
- [Highlights](#highlights)
- [Pages](#pages)
- [Documentation portal](#documentation-portal)
- [Tech stack & rationale](#tech-stack--rationale)
- [Project structure](#project-structure)
- [Design system](#design-system)
- [Content model](#content-model)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Deployment](#deployment)
- [Performance & accessibility](#performance--accessibility)
- [Conventions](#conventions)
- [Documentation for contributors](#documentation-for-contributors)
- [Roadmap](#roadmap)
- [License](#license)

---

## What this is

This repository contains three things:

1. **`web/`** — the Next.js application: a 5-page marketing site plus a 12-page documentation portal.
2. **Planning docs** (`PRD.md`, `PLAN.md`, `DESIGN.md`) — the product requirements, phased build plan, and the design system spec the site implements.
3. **`docs/`** — developer documentation *for this site* (architecture, component reference, content model, workflow) — the place to start if you want to contribute.

It is a **marketing + docs** site. Exhaustive product internals (crate-level architecture, full tool references) live in the product repo's `docs/` and are linked out where appropriate; the on-site docs are a practical, self-contained guide.

## Highlights

- **Dark, restrained design system** — near-black canvas (`#010102`), a single lavender-blue accent (`#5e6ad2`) used only for the brand mark, primary CTAs, focus rings, and link emphasis. A four-step surface ladder carries depth without drop shadows.
- **Terminal captures as the "product screenshot"** — Wingman's TUI, headless `--print --json`, and `pilot` runs are rendered as **real, selectable text** (crisp at any DPI, theme-consistent, lightweight) rather than raster images.
- **A full documentation portal** — persistent sidebar, **⌘K full-text search** (Pagefind), scroll-spy "on this page" TOC, callouts, **build-time syntax highlighting** (Shiki), copy-enabled code blocks, heading permalinks, prev/next paging, a "Copy for LLM" button, and a mobile drawer.
- **Marketing depth** — an animated hero terminal, a competitor comparison, a use-case cookbook, a providers showcase, a security page, and a live GitHub-stars social-proof strip.
- **Discoverable** — RSS feed for the changelog, an `llms.txt` for AI crawlers, branded Open Graph images, and opt-in, cookieless analytics (off by default).
- **Static & fast** — every page is prerendered; ~87–95 kB First Load JS; only two client components ship interactivity (the nav menu and the copy button, plus the docs search/sidebar).
- **Self-hosted fonts** — Inter + JetBrains Mono via `next/font`; no external network requests at runtime.
- **Single source of truth for facts** — all product copy (providers, platforms, commands) flows from typed `content/*.ts` modules, kept in sync with the product repo.
- **Accessible** — WCAG-minded: skip link, visible focus ring, landmarks, `aria-*` on interactive elements, `prefers-reduced-motion` respected, real-text terminals.

## Pages

| Route | Purpose |
|---|---|
| `/` | Home — hero (animated terminal), provider marquee, pillars, social proof, compare teaser, install, CTA |
| `/features` | Deep-dive on each pillar + the secondary feature grid |
| `/compare` | Comparison matrix vs Claude Code, Cursor & Aider (with a fair-use disclaimer) |
| `/use-cases` | Recipe cookbook — CI review, pilot, local-only, batch, and more |
| `/providers` | Showcase of the 73+ providers, grouped (native · OpenAI-compatible · local) |
| `/security` | Security & privacy — keyring, local models, no telemetry, guardrails |
| `/install` | Platform matrix (with the real glibc ≥ 2.38 note), per-OS commands, first-run steps |
| `/changelog` | Release history from **GitHub Releases at build time**; RSS at `/rss.xml` |
| `/about` | Philosophy + an honest "ships today vs planned" section + architecture links |
| `/docs/*` | The documentation portal (see below) |
| `/rss.xml`, `/llms.txt` | Changelog RSS feed; AI-crawler site map |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image` | SEO routes + branded OG image |
| `404` | On-brand not-found page |

## Documentation portal

A multi-page docs section under `/docs`, with a persistent sidebar, search, and scroll-spy TOC:

**Get started** — Overview · Quickstart · Install
**Guides** — Core concepts · Providers & models · Configuration · Tools & MCP · Memory, skills & hooks · Pilot mode · Automation
**Reference** — CLI reference (all subcommands) · TUI & slash commands (all in-session commands + keybindings) · Troubleshooting

All reference content is grounded in the actual tool — the CLI subcommands, the 25+ slash commands, and the real `config.toml` schema are pulled from the product repo, not invented.

## Tech stack & rationale

| Choice | Why |
|---|---|
| **Next.js 14, App Router** | File-based routing, first-class metadata/SEO, `next/font` self-hosting, trivial static export. |
| **TypeScript** | Typed content model and component props. |
| **Tailwind CSS 3** | The design system is a set of tokens; `theme.extend` maps `DESIGN.md` 1:1. `theme.fontSize` tuples carry size + line-height + tracking + weight per token. |
| **No UI/animation libraries** | The design is deliberately restrained (no shadows, one accent, minimal motion) — a dependency would be more than the site needs. Search, TOC, and copy are hand-rolled with zero deps. |

## Project structure

```
wingman-frontend/
├── PRD.md                 Product requirements (goals, IA, page specs, metrics)
├── PLAN.md                Phased implementation plan
├── DESIGN.md              Design system (tokens, do's/don'ts)
├── docs/                  Developer documentation for this site
│   ├── README.md            Index + orientation
│   ├── ARCHITECTURE.md      Structure, rendering model, data flow, file map
│   ├── DESIGN-TOKENS.md     Tokens → Tailwind, usage guardrails
│   ├── COMPONENTS.md        Component + section reference (props, usage)
│   ├── CONTENT.md           Content model + accuracy gate
│   └── WORKFLOW.md          Setup, common tasks, deploy checklist
└── web/                   The Next.js app
    ├── app/
    │   ├── layout.tsx           Root layout: fonts, nav, footer, metadata, skip-link
    │   ├── globals.css          Tailwind layers + base + .lift / .doc-prose helpers
    │   ├── page.tsx             Home
    │   ├── features/ install/ changelog/ about/   Marketing pages
    │   ├── not-found.tsx sitemap.ts robots.ts
    │   └── docs/
    │       ├── layout.tsx       Docs portal shell (sidebar + search)
    │       ├── page.tsx         Docs overview
    │       └── <topic>/page.tsx 11 docs pages
    ├── components/
    │   ├── ui/                  Button, Surface, Container, Text, CopyOneLiner, CodeBlock
    │   ├── sections/            Hero, ProviderMarquee, PillarSection, FeatureGrid, …
    │   ├── docs/                DocsShell, DocsSidebar, DocsSearch, DocPage, Toc, Callout,
    │   │                        DocHeading, ReferenceTable, Breadcrumbs, PrevNext
    │   ├── Terminal.tsx         The "product screenshot" — CLI captures as text
    │   ├── Wordmark.tsx GitHubIcon.tsx
    │   ├── nav/ footer/
    ├── content/                Typed facts: product, providers, platforms, features,
    │                           terminals, nav, docs-nav
    ├── lib/                    fonts, cn, slug, releases (GitHub fetch)
    ├── tailwind.config.ts      Design tokens
    └── next.config.mjs tsconfig.json postcss.config.mjs
```

## Design system

Derived from [`DESIGN.md`](DESIGN.md) and encoded in [`web/tailwind.config.ts`](web/tailwind.config.ts). Components **never hard-code hex or spacing** — everything references a token.

**Color**

| Token | Value | Use |
|---|---|---|
| `canvas` | `#010102` | Page background (never `#000000`) |
| `surface-1…4` | `#08090a` → `#202123` | Lifted panels, cards, menus |
| `hairline` / `-strong` | `#23252a` / `#31333a` | 1px borders |
| `ink` / `-muted` / `-subtle` / `-tertiary` | `#f7f8f8` → `#62666d` | Text hierarchy |
| `primary` / `-hover` / `-focus` | `#5e6ad2` / `#828fff` / `#5e69d1` | The lavender accent |
| `success` | `#27a644` | The only semantic color |

**Type** — a token scale (`display-xl` → `caption`, plus `eyebrow`, `button`, `mono`) where each token carries size + line-height + letter-spacing + weight. Display sizes use `clamp()` so headlines scale from 80px to ~36px on mobile automatically. Fonts: **Inter** (sans) + **JetBrains Mono** (mono).

**Guardrails** (enforced in review): lavender only on mark/CTA/focus/link · one accent + success only · no drop shadows (surface ladder + hairline + top-edge highlight) · `rounded-md` CTAs, never pill · dark theme only · `#010102`, never `#000000`.

See [`docs/DESIGN-TOKENS.md`](docs/DESIGN-TOKENS.md) for the full reference.

## Content model

All product-facing facts live in typed [`web/content/*.ts`](web/content/) modules:

| File | Holds |
|---|---|
| `product.ts` | Name, tagline, positioning, repo/docs links, license, version, install commands |
| `providers.ts` | The named provider adapters + the "60+ more" caption |
| `platforms.ts` | Install matrix, glibc note, per-OS commands, first-run steps |
| `features.ts` | The four pillars + secondary features |
| `terminals.ts` | Terminal capture fixtures (structured, colored text) |
| `nav.ts` / `docs-nav.ts` | Top-nav/footer links; docs sidebar tree + search index + prev/next order |

**Accuracy gate:** because everything funnels through `content/`, keeping the site truthful is a diff of a handful of files against the product repo (providers, platforms, glibc floor, commands) — not a page-by-page audit. Details in [`docs/CONTENT.md`](docs/CONTENT.md).

## Getting started

**Prerequisites:** Node.js 18.17+ (developed on Node 24) and npm.

```bash
cd web
npm install
npm run dev      # http://localhost:3000
```

## Available scripts

Run from `web/`:

| Script | Does |
|---|---|
| `npm run dev` | Dev server with hot reload (search falls back to the static index) |
| `npm run build` | Static export to `out/`, then `postbuild` builds the Pagefind index |
| `npm run preview` | Serve the exported `out/` locally |
| `npm run lint` | ESLint (`next/core-web-vitals`) |

## Deployment

The site is a **static export** (`output: 'export'`) — `npm run build` emits `out/` (HTML/CSS/JS + the Pagefind index) for any static host.

- **Vercel (recommended):** point it at the `web/` directory; zero config. Preview deploys per PR.
- **Any static host:** upload `out/` (GitHub Pages, Netlify, S3/CDN).

Notes:
- **Build-time fetches:** `/changelog`, `/rss.xml`, and the GitHub-stars count fetch from the GitHub API during the build. Ensure network access (optionally a `GITHUB_TOKEN` to avoid the unauthenticated rate limit); all fall back gracefully.
- **Analytics is opt-in:** set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` to enable cookieless Plausible; unset (the default) ships no tracker.
- **OG image content-type:** on Vercel the generated `/opengraph-image` is served as `image/png`. Some dumb static hosts serve extension-less files as `application/octet-stream` — set a rule for `/opengraph-image` if a scraper rejects it.
- Before deploying, replace the placeholder domain (`https://wingman.dev`) in `web/app/layout.tsx`, `web/app/sitemap.ts`, and the RSS/llms routes.

## Performance & accessibility

- **Static prerender**, no runtime server. First Load JS ~87–95 kB.
- **Client JS only where needed** — nav menu, copy buttons, docs search/sidebar/TOC. The site is fully readable and the install command is selectable without JS.
- **Self-hosted fonts** (`next/font`) — no external requests; `display: swap`.
- **Accessibility** — skip-to-content link, single visible focus ring, semantic landmarks, `aria-*` on interactive elements, `prefers-reduced-motion` honored, real-text terminals with summaries.
- **SEO** — per-page metadata, Open Graph/Twitter cards, `sitemap.xml`, `robots.txt`, and `SoftwareApplication` JSON-LD on the home page.

## Conventions

- **Server-first.** Components are server components unless they need interactivity; add `"use client"` only then.
- **Tokens only.** No inline hex or ad-hoc spacing — extend `tailwind.config.ts` if a value is missing.
- **Imports** use the `@/` alias (`@/components/…`, `@/content/…`, `@/lib/…`).
- **Facts in `content/`.** Don't hard-code product copy in JSX; edit the content module.
- **Accessibility is not optional** — keep the focus ring, landmarks, and real-text terminals.

Full contributor guide — adding a page, a section, a terminal capture, or a docs entry — is in [`docs/WORKFLOW.md`](docs/WORKFLOW.md).

## Documentation for contributors

| Doc | Read it for |
|---|---|
| [`docs/README.md`](docs/README.md) | Orientation and index |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | How the site is structured and rendered |
| [`docs/DESIGN-TOKENS.md`](docs/DESIGN-TOKENS.md) | The full token reference + guardrails |
| [`docs/COMPONENTS.md`](docs/COMPONENTS.md) | Every component and section, with props |
| [`docs/CONTENT.md`](docs/CONTENT.md) | The content model and accuracy gate |
| [`docs/WORKFLOW.md`](docs/WORKFLOW.md) | Setup, common tasks, deploy checklist |

And for the *why*: [`PRD.md`](PRD.md) (requirements), [`PLAN.md`](PLAN.md) (build plan), [`DESIGN.md`](DESIGN.md) (design system).

## Roadmap

Built and shipping. Remaining nice-to-haves:

- CI (build + lint) and branch protection on this repo
- Lighthouse CI budget in the build pipeline
- Playwright smoke + axe accessibility tests
- Per-page (vs inherited) OG images
- Final domain + hosting configuration

## License

MIT © Vedant Nimbarte. Wingman itself is licensed MIT OR Apache-2.0.

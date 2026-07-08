# Wingman Website — Implementation Plan

Companion to `PRD.md`. Stack decision: **Next.js (App Router) + TypeScript + Tailwind CSS**, static-export-capable, deployed on Vercel. Design tokens from `DESIGN.md` wired into the Tailwind theme. Fonts **Inter** + **JetBrains Mono** via `next/font` (self-hosted). Dark-only.

---

## 0. Principles
- **Static-first.** Everything is SSG; the only client JS is copy buttons, the nav toggle, and the changelog filter. No runtime data fetching on content pages.
- **Tokens are the source of truth.** No hard-coded hex/spacing in components — everything references the Tailwind theme derived from `DESIGN.md`.
- **Terminal captures are components, not images** wherever feasible (crisp, themeable, lightweight, accessible).
- **Accuracy gate.** Product facts (providers, platforms, glibc floor, commands) live in one `content/` data module cross-checked against the repo before launch.
- **Ship page-by-page**, each fully responsive + a11y-clean before moving on.

---

## Phase 0 — Project scaffold (0.5 day)
- `create-next-app` (App Router, TS, ESLint) inside `wingman-frontend/` (or a `web/` subdir alongside the docs).
- Add Tailwind + `@tailwindcss/typography`, Prettier + `prettier-plugin-tailwindcss`, `eslint-config-next`.
- Configure `output: 'export'` compatibility (or Vercel SSG); `images` unoptimized fallback for static export if needed.
- Repo hygiene: `.gitignore`, `.nvmrc`/engines, `README.md` (dev instructions), CI (typecheck + lint + build) mirroring the product repo's standards.

**Exit:** `npm run dev` renders a blank themed page; `npm run build` succeeds.

---

## Phase 1 — Design system foundation (1–1.5 days)
Translate `DESIGN.md` into code. **This unblocks everything else — do it fully before building pages.**

1. **Tailwind theme (`tailwind.config.ts`)** — extend, don't override:
   - `colors`: `canvas #010102`, `surface.1..4`, `hairline`, `hairline-strong`, `hairline-tertiary`, `ink`, `ink-muted #d0d6e0`, `ink-subtle #8a8f98`, `ink-tertiary #62666d`, `primary #5e6ad2`, `primary-hover #828fff`, `primary-focus #5e69d1`, `success #27a644`, plus inverse set.
   - `borderRadius`: xs 4, sm 6, md 8, lg 12, xl 16, xxl 24, pill/full 9999.
   - `spacing` extensions: section 96, plus map xxs..xxl to the 4px scale.
   - `maxWidth.content: 1280px`.
   - `screens`: sm 480, md 768, lg 1024, xl 1280, 2xl 1440 (align to PRD breakpoints).
2. **Typography** — a `text-display-xl/lg/md`, `headline`, `card-title`, `subhead`, `body-lg/sm`, `caption`, `button`, `eyebrow`, `mono` utility set via a small plugin or CSS layer, encoding size/weight/line-height/letter-spacing from the DESIGN.md table (incl. responsive scaling of display-xl 80→~36px).
3. **Fonts** — `next/font/local` or `next/font/google` for **Inter** (400/500/600/700) and **JetBrains Mono** (400); expose as CSS variables `--font-sans` / `--font-mono`; set `font-feature-settings` for tabular numerals in terminal contexts.
4. **Global CSS** — canvas background, base ink color, selection color (lavender-tinted), focus-visible ring utility (2px `primary-focus`/50%), `prefers-reduced-motion` guard, skip-link.
5. **Primitives / components** (Storybook-optional, or a `/kitchen-sink` route):
   - `Button` (primary / secondary / tertiary / inverse; hover + pressed + focus states; 8px radius; 8×14 padding).
   - `Surface`/`Card` (lift level 1–4 → surface bg + hairline + optional top-edge highlight).
   - `Eyebrow`, `SectionHeading`, `Prose`.
   - `CodeChip` / `CopyOneLiner` (mono chip + copy button with SR-announced success).
   - `StatusBadge`, `Tag`, `Divider`.

**Exit:** a `/kitchen-sink` page shows every token and component in isolation; visual check against DESIGN.md do's/don'ts (lavender scarce, no shadows, no pill CTAs, canvas ≠ pure black).

---

## Phase 2 — Terminal component + content data (1 day)
1. **`<Terminal>` component** — the site's "product screenshot." Renders a `product-screenshot-card` frame (surface-1, `rounded.xl`, 24px padding, hairline + subtle top-edge highlight) containing:
   - Optional window chrome row (dots + a title like `wingman — ~/project`).
   - A monospace body that renders **lines with token-based ANSI-like coloring** (limited to Wingman's restrained palette on dark — no rainbow) from a structured fixture, not a raster.
   - Variants: `tui` (transcript + status line + composer), `command` (prompt + output), `json` (`--print --json` stream), `pilot` (task tree).
   - Accessibility: real text, proper roles; a `caption` prop for context; decorative-only mode sets `aria-hidden` with a text summary nearby.
   - Provide a raster fallback slot (`<img>`/SVG) for captures too complex to reproduce as text.
2. **Content data module (`content/`)** — single source for facts, so pages stay in sync and the §9 accuracy gate has one place to check:
   - `product.ts`: name, tagline, positioning, repo URL, license, version, install one-liner.
   - `providers.ts`: the named providers + "60+ via OpenAI-compatible adapter".
   - `platforms.ts`: install matrix + glibc floor + from-source command.
   - `features.ts`: the pillars + secondary features (title, blurb, capture ref).
   - `nav.ts` / `footer.ts`: link structures.
   - `terminals/*`: fixtures for each capture.

**Exit:** `<Terminal>` variants render in kitchen-sink; all copy pulls from `content/`.

---

## Phase 3 — Global chrome (0.5–1 day)
- **TopNav** (sticky, 56px, canvas): wordmark, center links, `Star on GitHub` (secondary) + `Install` (primary); hamburger < 768 with an accessible mobile menu (focus trap, Esc to close).
- **Footer**: link columns, wordmark + tagline, version badge, platform note.
- **Layout**: root layout with skip-link, landmarks, metadata defaults, OG scaffolding.

**Exit:** nav/footer present on all routes, keyboard-operable, responsive.

---

## Phase 4 — Pages (build in this order)
Each page: build sections top-down, wire to `content/`, verify responsive at all five breakpoints + a11y before marking done.

1. **Install (`/install`)** — *build first;* it's the conversion page and the simplest. Platform matrix, per-OS tabs, one-liner hero, first-run steps, verify/uninstall. (0.5–1 day)
2. **Home (`/`)** — all 11 sections from PRD §6.1. The biggest page; reuse Phase-1/2 components heavily. (1.5–2 days)
3. **Features (`/features`)** — deep-dive blocks with anchors. (1–1.5 days)
4. **Changelog (`/changelog`)** — build-time fetch from GitHub Releases API (with token in CI, cached, static fallback seed); render `changelog-row`s; version anchors/filter. (0.5–1 day)
5. **About (`/about`)** — narrative + honesty section + architecture overview + open-source/contribute. (0.5 day)

**Exit per page:** matches DESIGN.md; Lighthouse ≥ 95 perf/SEO; no CLS; keyboard + SR pass.

---

## Phase 5 — SEO, OG, polish (0.5–1 day)
- Per-page metadata, canonical, `sitemap.xml`, `robots.txt`, JSON-LD `SoftwareApplication` on Home.
- Branded dark **OG images** per page (static or generated via `@vercel/og`/`next/og`, self-contained).
- Reduced-motion pass; final contrast audit (esp. `ink-subtle`); tab-order review.
- 404 page on-brand.

---

## Phase 6 — QA, perf, launch (0.5–1 day)
- Lighthouse CI budget (perf/a11y/SEO thresholds) in the build pipeline.
- Cross-browser + real-device spot checks (iOS Safari, Android Chrome).
- **Accuracy gate:** diff `content/` facts against repo `README.md`/`docs/`; verify the install one-liner and `cargo install` command actually work on a clean box.
- Analytics (privacy-safe, optional) + event instrumentation (one-liner copies, CTA/outbound clicks).
- Deploy (Vercel); set up preview deploys per PR; connect domain.

---

## Effort summary
| Phase | Focus | Est. |
|---|---|---|
| 0 | Scaffold | 0.5d |
| 1 | Design system | 1–1.5d |
| 2 | Terminal + content data | 1d |
| 3 | Nav/footer | 0.5–1d |
| 4 | 5 pages | 4–6d |
| 5 | SEO/OG/polish | 0.5–1d |
| 6 | QA/perf/launch | 0.5–1d |
| **Total** | | **~8–12 days** (one dev) |

---

## Directory layout (proposed)
```
wingman-frontend/
  PRD.md
  PLAN.md
  DESIGN.md
  web/                      # the Next.js app (scaffolded in Phase 0)
    app/
      layout.tsx
      page.tsx              # Home
      features/page.tsx
      install/page.tsx
      changelog/page.tsx
      about/page.tsx
      kitchen-sink/page.tsx # dev-only token/component gallery
    components/
      ui/                   # Button, Card/Surface, Eyebrow, CopyOneLiner, ...
      Terminal/             # the "product screenshot" component + variants
      nav/ footer/
    content/                # product.ts, providers.ts, platforms.ts, features.ts, terminals/
    lib/                    # github releases fetch (build-time), metadata helpers
    styles/                 # globals.css, tailwind layers
    public/                 # og images, favicon, self-hosted fonts if local
    tailwind.config.ts
    next.config.ts
```

---

## Token mapping cheat-sheet (DESIGN.md → Tailwind)
- `bg-canvas` `#010102` · `bg-surface-1..4` · `border-hairline` / `-strong` / `-tertiary`
- `text-ink` `#f7f8f8` · `text-ink-muted` `#d0d6e0` · `text-ink-subtle` `#8a8f98` · `text-ink-tertiary` `#62666d`
- `text-primary` / `bg-primary` `#5e6ad2` · `hover:bg-primary-hover` `#828fff` · focus ring `primary-focus` `#5e69d1`
- `rounded-md` (8) CTAs · `rounded-lg` (12) cards · `rounded-xl` (16) terminal frames · `rounded-pill` toggles/badges
- Type utilities: `text-display-xl/lg/md`, `text-headline`, `text-card-title`, `text-subhead`, `text-body-lg/body/body-sm`, `text-caption`, `text-eyebrow`, `text-button`, `font-mono` for terminal/code
- Section rhythm: `py-[96px]` (`spacing.section`) between sections; `p-6` (24) card padding; `p-12` (48) CTA banner

## Guardrails (from DESIGN.md do's/don'ts — enforce in review)
- Lavender only on: brand mark, primary CTA, focus ring, link emphasis. Never a fill/background.
- No drop shadows on dark; depth = surface ladder + hairline + top-edge highlight.
- CTAs `rounded-md`, never pill. Canvas is `#010102`, never `#000000`.
- One chromatic accent only. No atmospheric gradients, no spotlight cards.
- Dark theme only — do not add a light mode.

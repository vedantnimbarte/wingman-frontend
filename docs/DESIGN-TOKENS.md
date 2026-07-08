# Design Tokens

All style comes from `web/tailwind.config.ts`, a reviewed mapping of
[`../DESIGN.md`](../DESIGN.md). **Components never hard-code hex or spacing** —
if a value isn't a token, add it to the config first.

## Color

| Utility | Value | Use |
|---|---|---|
| `bg-canvas` / `text-canvas` | `#010102` | Page background (the anchor surface — never `#000000`). |
| `bg-surface-1` | `#08090a` | Default cards, terminal panels. |
| `bg-surface-2` | `#101113` | Featured / hovered cards, status badges. |
| `bg-surface-3` | `#17181a` | Sub-nav, menus. |
| `bg-surface-4` | `#202123` | Deepest lifted surface (window dots). |
| `border-hairline` | `#23252a` | 1px card/divider borders. |
| `border-hairline-strong` | `#31333a` | Stronger borders, hover. |
| `border-hairline-tertiary` | `#1a1b1e` | Nested surfaces. |
| `text-ink` | `#f7f8f8` | Headlines + emphasized body. |
| `text-ink-muted` | `#d0d6e0` | Secondary text. |
| `text-ink-subtle` | `#8a8f98` | Tertiary text (leads, footer). |
| `text-ink-tertiary` | `#62666d` | Quaternary (captions, footnotes). |
| `bg-primary` / `text-primary` | `#5e6ad2` | **Lavender accent.** |
| `bg-primary-hover` | `#828fff` | Primary CTA hover. |
| `primary-focus` | `#5e69d1` | Focus ring tint. |
| `text-success` / `bg-success` | `#27a644` | The only semantic color. |
| `bg-inverse-canvas` | `#ffffff` | Inverse CTA surface. |

### The one rule that matters
**Lavender (`primary`) appears only on:** the brand mark, the primary CTA, the
focus ring, and link emphasis. Never as a section background or card fill. Never
introduce a second chromatic accent. (See the "Guardrails" section below.)

## Typography

Type tokens are `theme.fontSize` entries carrying **size + line-height +
letter-spacing + weight**. Use them as `text-<token>`; don't add `font-*` or
`tracking-*` on top.

| Utility | Size | Weight | Tracking | Use |
|---|---|---|---|---|
| `text-display-xl` | `clamp(2.25→5rem)` | 600 | -0.03em | Hero headline (auto-scales to mobile) |
| `text-display-lg` | `clamp(2→3.5rem)` | 600 | -0.025em | Page/section openers |
| `text-display-md` | `clamp(1.75→2.5rem)` | 600 | -0.02em | Sub-section headings |
| `text-headline` | 1.75rem | 600 | -0.02em | CTA banner |
| `text-card-title` | 1.375rem | 500 | -0.018em | Feature card title |
| `text-subhead` | 1.25rem | 400 | -0.01em | Lead paragraphs |
| `text-body-lg` | 1.125rem | 400 | -0.005em | Hero subhead |
| `text-body` | 1rem | 400 | -0.003em | Default body |
| `text-body-sm` | 0.875rem | 400 | 0 | Card body, footer |
| `text-caption` | 0.75rem | 400 | 0 | Meta, status |
| `text-button` | 0.875rem | 500 | 0 | Button labels |
| `text-eyebrow` | 0.8125rem | 500 | +0.03em | Section eyebrow (positive tracking) |
| `text-mono` | 0.8125rem | 400 | 0 | Terminal / code |

Display sizes use `clamp()`, so 80px→~36px mobile scaling is automatic — **no
responsive `text-` variants needed** for headings.

**Fonts:** `font-sans` → Inter, `font-mono` → JetBrains Mono. Both self-hosted
via `next/font` (`lib/fonts.ts`), exposed as `--font-sans` / `--font-mono`.

## Spacing, radius, container

- **Section rhythm:** `py-*` around 96px between major sections (`spacing.section`
  = `96px`; sections commonly use `py-12`/`py-16` internally).
- **Card padding:** 24px (`p-6`) default, 48px (`p-12`) CTA banners.
- **Radii:** `rounded-md` (8) buttons/inputs · `rounded-lg` (12) cards ·
  `rounded-xl` (16) terminal frames · `rounded-xxl` (24) rare. **CTAs are
  `rounded-md`, never pill.**
- **Container:** `.container-content` (utility) = centered, `max-w-content`
  (1280px), responsive horizontal padding. Use `<Container>` in practice.

## Elevation (depth without shadows)

Depth = surface ladder + hairline border + a subtle top-edge highlight. Two
helper classes in `globals.css`:

- `.lift` → `border-hairline` + `shadow-lift` (an *inset* top highlight, not a
  drop shadow).
- `.lift-strong` → `border-hairline-strong` + `shadow-lift`.

The `<Surface>` component applies these automatically per level. Do not add
`shadow-*` drop shadows.

## Other utilities in `globals.css`

- `.hero-wash` — a single faint lavender radial behind the fold (not a page-wide
  gradient).
- `.link-emphasis` — lavender link styling for inline links.
- `.container-content` — the content container.

## Guardrails (enforce in review)

From `DESIGN.md` do's/don'ts — a PR that violates these should be changed:

- ❌ Lavender as a background/fill. ✅ Lavender only on mark/CTA/focus/link.
- ❌ A second chromatic accent (orange/pink/etc.). ✅ One accent + `success`.
- ❌ Drop shadows on dark. ✅ Surface ladder + hairline + top-edge highlight.
- ❌ Pill-rounded CTAs. ✅ `rounded-md`.
- ❌ `#000000` canvas. ✅ `#010102`.
- ❌ A light theme. ✅ Dark only (`color-scheme: dark`).
- ❌ Atmospheric gradients / spotlight cards. ✅ The dark canvas is the whitespace.

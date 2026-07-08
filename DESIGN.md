# Wingman Website — Design System (Linear-inspired dark marketing)

> Reference design tokens for the Wingman marketing site. Dark-only. See `PRD.md` and `PLAN.md`.

## Overview

Linear's marketing canvas is the deepest dark surface in this collection — `{colors.canvas}` is #010102, essentially pure black with a faint blue tint. On top sits a four-step surface ladder (`{colors.surface-1}` through `{colors.surface-4}`) for cards, panels, and lifted tiles, with hairline borders running from `{colors.hairline}` (#23252a) up through `{colors.hairline-strong}` and `{colors.hairline-tertiary}`. Light gray text (`{colors.ink}` #f7f8f8) carries the body and headlines.

The single chromatic accent is **Linear lavender-blue** `{colors.primary}` (#5e6ad2) — used on the brand mark, focus rings, and the primary CTA button. A lighter hover state (`{colors.primary-hover}` #828fff) and a focus-tinted variant (`{colors.primary-focus}` #5e69d1) extend the same hue. Linear avoids saturated greens, oranges, reds, etc. on the marketing canvas — the only semantic color is `{colors.semantic-success}` (#27a644) for status pills and the rare success indicator.

Display type runs Linear's custom sans (with `SF Pro Display` fallback) at weight 500–700 with negative letter-spacing scaling from -3.0px at 80px down to 0 at body. The body family is Linear's text cut, and a Linear Mono is reserved for code snippets in product screenshots.

The page rhythm is **dense product screenshots** — Linear's marketing leads with high-fidelity captures of the product UI (issue list, project view, dashboard) framed in `{colors.surface-1}` panels with `{rounded.xl}` 16px corners. The chrome is intentionally minimal so the app screenshots can do the heavy lifting.

> **Wingman note:** the "product screenshot" here is the **terminal / TUI**. Every section leads with a high-fidelity capture of Wingman running (TUI transcript + status line + composer, a headless `--print` invocation, a `pilot` run, the `/mode` `/model` `/mcp` pickers). Prefer real-text terminal components over raster images.

**Key Characteristics:**
- **Dark-canvas marketing system** — `{colors.canvas}` (#010102) is the deepest dark in this collection.
- **Lavender-blue brand accent** (`{colors.primary}` #5e6ad2) — used scarcely on brand mark, focus, and the primary CTA.
- Four-step surface ladder (canvas → surface-1 → surface-2 → surface-3 → surface-4) carries hierarchy without shadow.
- Display tracking pulls aggressively negative (-3.0px at 80px); body holds at -0.05px.
- Cards use `{rounded.lg}` 12px corners with 1px hairline borders — never pill, rarely 16px.
- **Product UI screenshots** (Wingman: terminal captures) dominate the page. The marketing chrome is a dark frame for the app.
- No second chromatic color. No atmospheric gradients. No spotlight cards.

## Colors

> Source pages: linear.app (home), /intake, /pricing, /contact/sales, /build.

### Brand & Accent
- **Lavender-Blue** ({colors.primary} #5e6ad2): The signature accent — primary CTA, brand mark, link emphasis.
- **Lavender Hover** ({colors.primary-hover} #828fff): Hovered state of the primary CTA.
- **Lavender Focus** ({colors.primary-focus} #5e69d1): Focus-ring tint — focused inputs, focused buttons.
- **Brand Secure** ({colors.brand-secure} #7a7fad): Muted lavender-gray — security surfaces.

### Surface
- **Canvas** ({colors.canvas} #010102): Default page background — near-pure black with a faint blue tint.
- **Surface 1** ({colors.surface-1}): One step above canvas — feature cards, product screenshot panels.
- **Surface 2** ({colors.surface-2}): Two steps above — featured card, hovered cards.
- **Surface 3** ({colors.surface-3}): Three steps above — sub-nav, dropdowns.
- **Surface 4** ({colors.surface-4}): Four steps above — deepest lifted surface.
- **Hairline** ({colors.hairline} #23252a): 1px borders on cards and dividers.
- **Hairline Strong** ({colors.hairline-strong}): Stronger 1px borders — input focus rings.
- **Hairline Tertiary** ({colors.hairline-tertiary}): Tertiary borders for nested surfaces.
- **Inverse Canvas** ({colors.inverse-canvas} #ffffff): Surface of the inverse pill CTA on a small set of section openers.
- **Inverse Surface 1/2** ({colors.inverse-surface-1/2}): Steps above inverse canvas.

### Text
- **Ink** ({colors.ink} #f7f8f8): All headlines and emphasized body type.
- **Ink Muted** ({colors.ink-muted} #d0d6e0): Secondary type — meta info on hero panels.
- **Ink Subtle** ({colors.ink-subtle} #8a8f98): Tertiary type — deselected tabs, footer columns.
- **Ink Tertiary** ({colors.ink-tertiary} #62666d): Quaternary — disabled, footnotes.

### Semantic
- **Success Green** ({colors.semantic-success} #27a644): Status pills, success indicators. The only semantic color on marketing.
- **Overlay** ({colors.semantic-overlay}): Pure black overlay scrim for modals.

## Typography

### Font Family
- **Display** — custom display sans; fallback `SF Pro Display, -apple-system, system-ui, Segoe UI, Roboto`. Carries display-xl through subhead.
- **Text** — text sans tuned for body sizes; same fallback stack. Body sizes, button labels, captions.
- **Mono** — mono; fallback `ui-monospace, SF Mono, Menlo`. Code snippets in product screenshots and status/ID tokens.

The marketing surface treats Display and Text as one continuous voice; the family change is silent.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 80px | 600 | 1.05 | -3.0px | Largest hero headline |
| `{typography.display-lg}` | 56px | 600 | 1.10 | -1.8px | Section opener headlines |
| `{typography.display-md}` | 40px | 600 | 1.15 | -1.0px | Sub-section headlines |
| `{typography.headline}` | 28px | 600 | 1.20 | -0.6px | CTA banner heading |
| `{typography.card-title}` | 22px | 500 | 1.25 | -0.4px | Feature card title |
| `{typography.subhead}` | 20px | 400 | 1.40 | -0.2px | Lead body, intro paragraphs |
| `{typography.body-lg}` | 18px | 400 | 1.50 | -0.1px | Hero subhead, lead paragraphs |
| `{typography.body}` | 16px | 400 | 1.50 | -0.05px | Default body |
| `{typography.body-sm}` | 14px | 400 | 1.50 | 0 | Card body, footer columns |
| `{typography.caption}` | 12px | 400 | 1.40 | 0 | Captions, meta, status |
| `{typography.button}` | 14px | 500 | 1.20 | 0 | All button labels |
| `{typography.eyebrow}` | 13px | 500 | 1.30 | 0.4px | Section eyebrow (slight positive tracking) |
| `{typography.mono}` | 13px | 400 | 1.50 | 0 | Mono for code / terminal captures |

### Principles
- **Aggressive negative tracking on display** (-3.0px at 80px ≈ 4% of size).
- **Single voice from display to body.** Display-xl at 600 → body at 400 — same family, narrower weights.
- **Eyebrow uses positive tracking** (+0.4px) — marks the eyebrow as taxonomy.
- **Mono only in code/terminal contexts.**

### Font Substitutes (implementation)
Custom typeface isn't publicly distributed. For cross-platform implementation use **Inter** at 500/600/700 (closest free substitute; Geist Sans also viable). For mono, **JetBrains Mono** or **Geist Mono** at 400. **Self-host via `next/font`** — no external requests.

## Layout

### Spacing System
- **Base unit**: 4px.
- **Tokens**: `{spacing.xxs}` 4 · `{spacing.xs}` 8 · `{spacing.sm}` 12 · `{spacing.md}` 16 · `{spacing.lg}` 24 · `{spacing.xl}` 32 · `{spacing.xxl}` 48 · `{spacing.section}` 96.
- Card interior padding: 24 (feature) · 32 (testimonial) · 48 (CTA banner).
- Pill button padding: 8 × 14. Form input padding: 8 × 12.

### Grid & Container
- Max content width ~1280px.
- Card grids: 3-up desktop, 2-up tablet, 1-up mobile.
- Product/terminal panels span full content width — they're the protagonist.

### Whitespace Philosophy
The dark canvas IS the whitespace. Sections separate by lift onto surface-1 panels, not by gaps in white. `{spacing.lg}` 24 between content blocks; `{spacing.section}` 96 between sections.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 (flat) | No shadow, no border | Body type, hero text, footer |
| 1 (charcoal lift) | `{colors.surface-1}` bg, 1px `{colors.hairline}` | Default cards, terminal panels |
| 2 (surface-2 lift) | `{colors.surface-2}` bg, 1px `{colors.hairline-strong}` | Featured card, hovered cards |
| 3 (surface-3 lift) | `{colors.surface-3}` bg | Sub-nav, dropdown menus |
| 4 (focus ring) | 2px `{colors.primary-focus}` outline at 50% opacity | Focused input, focused button |

Depth is carried by surface ladder + hairline borders. Resist drop shadows on dark almost entirely.

### Decorative Depth
- **Terminal captures** dominate as decorative depth.
- **No atmospheric gradients, no spotlight cards.**
- **Subtle white edge highlight** on the top edge of lifted panels.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 4px | Small chips, status badges |
| `{rounded.sm}` | 6px | Inline tags |
| `{rounded.md}` | 8px | All buttons, form inputs |
| `{rounded.lg}` | 12px | Feature/testimonial cards |
| `{rounded.xl}` | 16px | Terminal / product screenshot panels |
| `{rounded.xxl}` | 24px | Oversized CTA banners (rare) |
| `{rounded.pill}` | 9999px | Tab toggles, status pills |
| `{rounded.full}` | 9999px | Avatar circles |

## Components (token specs)

### Buttons
- **`button-primary`** — bg `{colors.primary}`, text on-primary, `{typography.button}`, padding 8×14, `{rounded.md}`. Hover → `{colors.primary-hover}`; pressed → `{colors.primary-focus}`.
- **`button-secondary`** — bg `{colors.surface-1}`, text `{colors.ink}`, 1px `{colors.hairline}`, 8×14, `{rounded.md}`.
- **`button-tertiary`** — plain text button on canvas.
- **`button-inverse`** — bg `{colors.inverse-canvas}`, text inverse-ink, 8×14, `{rounded.md}`.

### Cards & Containers
- **`feature-card`** — surface-1, `{typography.body}`, `{rounded.lg}`, padding 24, hairline.
- **`product-screenshot-card`** (dominant) — surface-1, `{rounded.xl}`, padding 24, hairline + top-edge highlight. **Wingman: the `<Terminal>` frame.**
- **`testimonial-card`** — surface-1, `{typography.body-lg}`, `{rounded.lg}`, padding 32. (Only when real quotes exist.)
- **`cta-banner`** — surface-1, `{typography.headline}`, `{rounded.lg}`, padding 48.
- **`customer-logo-tile`** — canvas, `{typography.caption}`, `{rounded.xs}`, padding 16, no border. (Wingman: provider logo/name tiles.)

### Inputs & Forms
- **`text-input`** — surface-1, `{typography.body}`, `{rounded.md}`, padding 8×12. Focused: 2px `{colors.primary-focus}` outline at 50%.

### Status
- **`changelog-row`** — canvas, `{typography.body}`, `{rounded.xs}`, padding 24×0, 1px hairline bottom rule.
- **`status-badge`** — surface-2, `{colors.ink-muted}`, `{typography.caption}`, `{rounded.pill}`, padding 2×8.

### Navigation
- **`top-nav`** — sticky canvas bar, `{typography.body-sm}`, height 56px; wordmark left, links center, secondary + primary CTA right.

### Footer
- **`footer`** — canvas, `{colors.ink-subtle}`, `{typography.caption}`, padding 64×32; dense link grid + wordmark.

## Do's and Don'ts

### Do
- Reserve `{colors.canvas}` (#010102) as the anchor surface — the faint blue tint is intentional.
- Use `{colors.primary}` lavender ONLY for: brand mark, primary CTA, focus ring, link emphasis.
- Use the four-step surface ladder for hierarchy; avoid skipping levels.
- Pair display weight 600 with body weight 400 — resist 700+ display weights.
- Apply negative letter-spacing aggressively on display.
- Use terminal captures as the protagonist of every section.
- Compose CTAs as `{rounded.md}` 8px corners.

### Don't
- Don't ship a light-mode marketing page.
- Don't use lavender as a section background or card fill.
- Don't introduce a second chromatic accent.
- Don't add atmospheric gradients or spotlight cards.
- Don't pill-round CTAs.
- Don't use `#000000` true black as the canvas.
- Don't combine multiple bright accents in terminal captures (keep Wingman's restrained on-dark palette).

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Desktop-XL | 1440px | Default desktop layout |
| Desktop | 1280px | Card grid 3-up maintained |
| Tablet | 1024px | Card grid 3-up → 2-up |
| Mobile-Lg | 768px | Nav hamburger; comparison/accordion stacking |
| Mobile | 480px | Single-column; display-xl 80px → ~36px |

### Touch Targets
- CTAs ≥ 40px tap height; form inputs ≥ 44px; tab pills ≥ 36px (≥ 44px on touch).

### Collapsing Strategy
- Top nav → hamburger below 768px.
- Card grids: 3-up → 2-up at 1024px → 1-up below 768px.
- Display type scales `{typography.display-xl}` 80px → `{typography.display-md}` 40px on mobile.

### Image Behavior
- Terminal captures maintain aspect ratio and never crop.
- Provider logos may collapse from 6-up to 3-up below 768px.

## Known Gaps
- The four-step surface ladder values derive from Linear's canonical `--color-bg-level-*` / `--color-line-*` CSS variables.
- Form-field error/validation styling not documented (out of scope for v1 — no forms besides copy actions).
- Light mode intentionally not documented — dark only.
- Custom display/text/mono families are proprietary; the open substitutes (Inter + JetBrains Mono) are the implementation target.

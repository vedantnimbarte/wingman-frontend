# Wingman website: design system

Minimal and spacious. The page tells you what Wingman is, shows how one turn works inside it, and gets you started. Implemented in `web/app/globals.css`; there are no other stylesheets.

## Colour

The product's argument is guessing versus resolving, and the palette carries it.

| Token | Value | Use |
|---|---|---|
| `--canvas` | `#06060b` | Page background, flat. No gradient washes. |
| `--surface` / `--surface-2` | `#0b0b13` / `#12121c` | Code blocks, the install line, the search dialog |
| `--line` / `--line-strong` | `#22222e` / `#32323f` | Hairlines between sections and rows |
| `--ink` / `--soft` / `--muted` | `#f5f6fa` / `#c3c6d8` / `#8a90a6` | Text hierarchy |
| `--faint` | `#5c6076` | Decoration only (step numbers, the `$` prompt). Fails AA as text. |
| `--resolved` / `--resolved-hover` | `#6b78e8` / `#8f9bff` | What the language server resolved; links and focus |
| `--verify` | `#3ddc97` | A verified edit. On the landing page, only the "done" node. |

Grey is a name match, lavender is a resolved answer. Don't use either as decoration.

## Type

- **Bricolage Grotesque 500** for h1 and h2 only. Tight tracking (`-0.03em` to `-0.035em`), `text-wrap: balance`.
  - h1: `clamp(44px, 6.4vw, 80px)`
  - h2: `clamp(30px, 3.8vw, 44px)`
- **Inter** for everything read: body 17px/1.65, h3 19px 500, lede 19–20px in `--muted`.
- **JetBrains Mono** only for real commands and code identifiers. Never for decorative labels.

## Layout

- Left-aligned throughout. Gutter `clamp(20px, 7vw, 112px)`.
- Columns: 720px for reading, 1040px for the diagram and rows.
- Sections: `clamp(96px, 14vh, 160px)` vertical padding and a 1px `--line` rule between them.
- No cards, no drop shadows. Rows are separated by hairlines. Radii: 10px on code and inputs, 8px on buttons, 6px on inline code.

## Principles

1. **One idea per section.** A short h2 that ends in a period, a muted lede, one structured element.
2. **One motion moment.** The turn diagram traces a request, and nodes turn from grey to lavender as it reaches them. Everything else moves only in response to input (copy confirmation, the platform toggle).
3. **Show the mechanism.** The diagram uses real type names from the Wingman source (`ToolRegistry`, `TurnGate`). Keep it in sync with the product's `docs/ARCHITECTURE.md`.
4. **Plain copy.** Sentence case, full sentences, specific facts, no marketing adjectives.
5. **Avoid:** all-caps eyebrows, one coloured word in a headline, `A · B · C` meta strings, `→` on links, star counts, marquees.

## Motion and accessibility

- Motion uses `motion/react`. The diagram plays only while it's in view.
- Under `prefers-reduced-motion`, the diagram renders its finished state and lists the stages as text.
- Visible focus ring (`--resolved-hover`), a skip link, landmarks, and real-text terminals.

# Wingman — Marketing Website PRD

**Product:** Wingman (open-source, terminal-first, multi-provider coding agent, written in Rust)
**Deliverable:** Public marketing website
**Status:** Draft v1 · 2026-07-08
**Owner:** Vedant Nimbarte
**Repo (product):** https://github.com/vedantnimbarte/Wingman

---

## 1. Summary

A dark-canvas, Linear-inspired marketing site for Wingman — an open-source CLI coding agent. The site's job is to make a developer landing from Hacker News, GitHub, or a share link understand *what Wingman is* and *run the install one-liner* within 60 seconds, then dig into features or docs if they want more.

The site is **marketing only**. Technical documentation stays canonical in the repo's `docs/` and is linked out, not reproduced here. There is **no pricing** — Wingman is free and open-source (bring-your-own API key / local models), so the conversion goal is *install + GitHub star*, not signup.

Design language follows the supplied `DESIGN.md` (Linear dark marketing system): near-black canvas `#010102`, a single lavender-blue accent `#5e6ad2`, a four-step surface ladder, hairline borders, aggressive negative letter-spacing on display type, and product screenshots (here: **terminal/TUI captures**) as the protagonist of every section.

---

## 2. Goals & Non-Goals

### 2.1 Goals
1. **Explain in one screen.** A first-time visitor understands Wingman's category and core promise above the fold.
2. **Drive installs.** The install one-liner is reachable from every page (nav CTA + hero + dedicated `/install`), copyable in one click.
3. **Build credibility.** Show it's real: live terminal captures, provider breadth, open-source proof (GitHub stars, license, activity), honest platform support.
4. **Convert to GitHub.** Star / view source is a first-class CTA alongside install.
5. **Be fast and accessible.** Static, near-zero-JS marketing pages; excellent Lighthouse and WCAG AA.

### 2.2 Non-Goals
- No documentation portal (link to repo `docs/`).
- No pricing, checkout, accounts, or auth.
- No blog/CMS in v1 (changelog is sourced from GitHub Releases, see §6.4).
- No light theme (per DESIGN.md — dark only).
- No web-based product demo / playground in v1 (candidate for v2).

---

## 3. Audience & Positioning

### 3.1 Primary persona — "The terminal-native developer"
Works in a terminal daily, comfortable with CLIs, already uses or is curious about AI coding agents (Claude Code, Cursor, Aider). Cares about: provider choice, privacy/local models, scriptability, not being locked to one vendor.

### 3.2 Secondary personas
- **The team lead / OSS evaluator** — assessing whether to adopt; wants credibility, license, architecture, activity signals.
- **The self-hoster / privacy-conscious dev** — wants local models (Ollama/LM Studio/vLLM), no telemetry, keys in the OS keyring.

### 3.3 Positioning statement
> Wingman is the open, provider-agnostic coding agent for your terminal — 73+ LLM providers behind one streaming interface, a built-in tool layer, and a self-improving memory of you and your projects. An open alternative to Claude Code, Cursor, and Aider.

### 3.4 Core differentiators (message pillars)
1. **Provider-agnostic** — 73+ providers, one shape; Anthropic/OpenAI/Gemini/ChatGPT-OAuth/OpenRouter/LiteLLM/LM Studio/vLLM/Ollama.
2. **Terminal-first, three surfaces** — interactive TUI, headless `--print`, batch `--batch file.jsonl`.
3. **Self-improving** — persistent memories, skills learned from work, cross-session recall.
4. **Multi-agent pilot mode** — plans a goal, delegates to worker agents in isolated worktrees, converges into a PR.
5. **Open & local-friendly** — MIT/Apache-2.0, bring-your-own key, run fully local models, keys in OS keyring, no lock-in.

---

## 4. Information Architecture

### 4.1 Sitemap
```
/                 Home            — hero, pillars, TUI screenshots, providers, learning loop, pilot, install, social proof, CTA
/features         Features        — deep dive on each pillar with terminal captures
/install          Install         — platform matrix, one-liner, per-OS steps, from-source, first-run
/changelog        Changelog       — release history (sourced from GitHub Releases)
/about            About / Why     — origin, philosophy, architecture overview, open-source
```
External (link out, open in new tab):
- **Docs** → repo `docs/INDEX.md`
- **GitHub** → repo root
- **Providers list** → docs "Providers" table (or an anchored section on `/features`)

### 4.2 Global navigation
- **Top nav (sticky, 56px):** wordmark (left) · `Features` `Install` `Changelog` `Docs↗` `About` (center) · `Star on GitHub` (secondary) + `Install` (primary) (right). Collapses to hamburger < 768px.
- **Footer:** wordmark + one-line tagline; link columns — *Product* (Features, Install, Changelog), *Resources* (Docs, Architecture, Tools reference, Learning loop), *Community* (GitHub, Issues, Discussions/Sponsor), *Legal* (License). Version badge (`v0.1.0`) + platform note.

---

## 5. Global Requirements

### 5.1 Design system
Implement the tokens in `DESIGN.md` exactly. Key non-negotiables:
- Canvas `#010102` (never `#000000`).
- Lavender `#5e6ad2` used **only** for brand mark, primary CTA, focus ring, link emphasis — never as a section/card fill.
- Four-step surface ladder for hierarchy; no drop shadows on dark; hairline borders + subtle top-edge highlight on lifted panels.
- Display type at weight 600 with aggressive negative tracking; body at 400. Fonts: **Inter** (display/text) + **JetBrains Mono** (code/terminal) as the open substitutes named in DESIGN.md, loaded via `next/font` (self-hosted, no external requests).
- CTAs are `rounded.md` (8px) — never pill.
- No second chromatic accent; no atmospheric gradients; no spotlight cards.

### 5.2 The "product screenshot" = the terminal
Linear leads with app UI; Wingman leads with **the terminal/TUI**. Every major section is anchored by a high-fidelity capture of Wingman running:
- The ratatui TUI (transcript, status line, composer, file-tree sidebar).
- A headless `--print` invocation piping JSON.
- A `pilot` run showing task delegation.
- The `/mode`, `/model`, `/mcp` pickers.

Captures render inside `product-screenshot-card` (`surface-1`, `rounded.xl` 16px, 24px padding, hairline + top-edge highlight). **Preferred implementation:** semantic HTML "terminal" components (a styled `<pre>` with monospace + ANSI-like coloring) rather than raster images, so they're crisp at any DPI, theme-consistent, copy-able, and lightweight. Fall back to optimized SVG/PNG where a true TUI grid is needed. See PLAN §"Terminal component".

### 5.3 CTAs (global)
- **Primary:** `Install` → `/install` (or copies the one-liner directly on `/install`).
- **Secondary:** `Star on GitHub` → repo (with live star count if cheaply available at build time).
- **Tertiary/text:** `Read the docs ↗`.
Copy one-liner: `curl -fsSL https://raw.githubusercontent.com/vedantnimbarte/Wingman/main/scripts/install.sh | sh`

### 5.4 Content sourcing
- Feature copy derives from the repo `README.md` Highlights + `docs/`.
- Provider names/counts, CLI subcommands, permission modes, and install platforms must stay factually in sync with the repo (see §9 accuracy requirements).
- Changelog is generated from GitHub Releases at build time (§6.4).

---

## 6. Page-by-Page Requirements

### 6.1 Home (`/`)
Section order (each section states its surface lift):

1. **Hero** (canvas, flat).
   - Eyebrow: `OPEN-SOURCE CODING AGENT` (eyebrow token, +0.4px tracking).
   - Headline (display-xl → scales on mobile): *"Your terminal's wingman."* with subline promise.
   - Subhead (body-lg, ink-muted): the positioning one-liner (§3.3).
   - CTA row: `Install` (primary) + `Star on GitHub` (secondary). Below it, the copyable one-liner in a mono chip with a copy button.
   - Right/below: a large **TUI capture** (`product-screenshot-card`).
   - Trust strip under hero: "73+ providers · MIT/Apache-2.0 · Linux · macOS · Windows".

2. **Provider marquee** (canvas). Logo/name tiles — Anthropic, OpenAI, Google Gemini, ChatGPT (OAuth), OpenRouter, LiteLLM, LM Studio, vLLM, Ollama — with a "…and 60+ more via the OpenAI-compatible adapter" caption. 6-up desktop → 3-up mobile.

3. **Pillar 1 — Provider-agnostic** (surface-1 panel). Copy + a `/model` picker capture; note live model swap mid-session.

4. **Pillar 2 — Three surfaces** (canvas → surface-1 cards, 3-up). TUI / `--print` / `--batch`, each a `feature-card` with a small terminal capture.

5. **Pillar 3 — Self-improving learning loop** (surface-1 panel). Memories, skills, cross-session recall; capture of `wingman knows` output.

6. **Pillar 4 — Pilot mode** (surface-1 panel). Multi-agent plan→delegate→PR; capture of a pilot run with task tree. Label "advanced".

7. **Built-in tool layer** (canvas, feature grid). Read/write/edit, glob, grep, shell, semantic search, web fetch/search, learning tools — as compact cards; note permission-mode gating.

8. **Install band** (surface-1). One-liner + "supported on Linux (x86_64/aarch64), macOS (Apple Silicon), Windows" + link to `/install`.

9. **Social proof** (canvas). GitHub stars, "built in Rust", activity; optional testimonial cards if/when available (structure ready, hidden until real quotes exist — do not fabricate).

10. **Closing CTA banner** (surface-1, `cta-banner`, 48px padding). "Give your terminal a wingman." + `Install` + `Star on GitHub`.

11. **Footer.**

**Acceptance:** above-the-fold communicates category + promise + install without scrolling on a 1440×900 desktop; one-liner copyable in ≤1 click; every pillar has a terminal capture.

### 6.2 Features (`/features`)
- Intro (display-lg) + one-paragraph lead.
- One deep-dive block per pillar (alternating text / capture), plus dedicated blocks for: **MCP host** (`[mcp.*]` config, `mcp__server__tool` namespacing, `/mcp`), **Permission modes** (read-only / plan / auto-edit / yolo — with the honest note that live `/mode` re-gates enforcement), **Provider login** (`wingman login`, OS keyring, ChatGPT OAuth), **Checkpoints & undo**, **Cost tracking** (`wingman cost`), **Sessions** (list/fork/resume), **Config layering** (defaults → global → project → env → flags), **Hooks**.
- Each block: eyebrow + headline + body + terminal capture; surface lift alternates canvas/surface-1.
- Anchor links so nav/footer can deep-link (e.g. `/features#mcp`).

### 6.3 Install (`/install`)
- Hero: the one-liner front-and-center with a big copy button; "no clone, no cargo, no build."
- **Platform matrix** (surface-1 table/cards): Linux x86_64 (gnu) ✓, Linux aarch64 (gnu) ✓, macOS Apple Silicon ✓, Windows x86_64 ✓, **Intel macOS → build from source** (`cargo install --git … wingman-cli`). Note the **glibc ≥ 2.38** floor for Linux prebuilt binaries (Ubuntu 24.04+, Debian 13+, Fedora 39+; older → from source).
- Per-OS tabs: macOS/Linux (`curl … | sh`), Windows (`install.ps1`), from source (`cargo install`).
- **First run**: `wingman login <provider>`, then `wingman` (TUI) or `wingman --print "…"`. Mention config location `~/.wingman/config.toml` and local-model discovery (`wingman discover`).
- Verify step: `wingman --version`.
- Requirements & uninstall notes.

### 6.4 Changelog (`/changelog`)
- Rows (`changelog-row`): version, date, highlights, link to the GitHub Release. Newest first.
- **Source:** GitHub Releases API at **build time** (no client-side calls). Graceful fallback to a static seed if the API is unavailable during build.
- Filter/anchor by version; RSS optional (v2).

### 6.5 About / Why (`/about`)
- Origin + philosophy: open, provider-agnostic, terminal-first, self-improving, local-friendly, no lock-in.
- Honesty section: what ships today vs roadmap (mirror the repo's honest positioning — e.g. pilot is advanced; some daemon sources are planned). Never overstate.
- Architecture overview (link to `docs/ARCHITECTURE.md`): Rust workspace, crate map at a high level, streaming provider contract.
- Open-source: license (MIT OR Apache-2.0), how to contribute, link to issues/discussions, optional Sponsor.

---

## 7. Non-Functional Requirements

### 7.1 Performance
- Lighthouse ≥ 95 (Perf/Best-Practices/SEO), ≥ 100 a11y target.
- LCP < 1.5s on mid-tier mobile; near-zero client JS on content pages (interactivity limited to copy buttons, nav toggle, changelog filter).
- Self-host all fonts (`next/font`), no external network requests (matches the product's no-lock-in ethos and avoids CSP/privacy issues).
- Static export where possible (SSG); images optimized (AVIF/WebP) and never layout-shift (reserved dimensions).

### 7.2 Accessibility (WCAG 2.1 AA)
- Verify contrast on the dark canvas: `ink #f7f8f8` on `#010102` passes; check `ink-subtle #8a8f98` only for large/secondary text.
- Visible focus ring (2px `primary-focus` at 50%) on all interactive elements; full keyboard operability; skip-to-content link.
- Respect `prefers-reduced-motion` (disable non-essential transitions).
- Terminal captures: provide text alternatives / are real text where possible; decorative captures get empty alt.
- Semantic landmarks, heading order, labeled controls, copy buttons announce success to screen readers.

### 7.3 SEO & sharing
- Per-page `<title>`/meta description, canonical URLs, sitemap.xml, robots.txt.
- Open Graph + Twitter cards with a branded dark OG image per page (generated).
- JSON-LD `SoftwareApplication` on Home.

### 7.4 Responsive
Breakpoints per DESIGN.md: 1440 / 1280 / 1024 / 768 / 480. Card grids 3→2→1; display-xl 80px → ~36px on mobile; nav → hamburger < 768; changelog and comparison content stack. Touch targets: CTAs ≥ 40px, inputs ≥ 44px.

### 7.5 Privacy & analytics
- Privacy-first, cookieless analytics only (e.g. Plausible/Umami self-host or none in v1). No third-party trackers. If analytics is added, document it and honor DNT.

### 7.6 Browser support
Evergreen Chrome/Firefox/Safari/Edge (last 2 versions). Graceful degradation without JS: content fully readable, one-liner selectable/copyable manually.

---

## 8. Analytics & Success Metrics

**North-star:** install-intent events (one-liner copies + `/install` visits + GitHub outbounds).

| Metric | Target (first 90 days) |
|---|---|
| One-liner copy events / unique visitor | ≥ 15% |
| GitHub outbound click-through | ≥ 20% |
| Home → Features or Install navigation | ≥ 35% |
| Bounce on Home | ≤ 55% |
| Lighthouse Perf / A11y | ≥ 95 / 100 |
| Median LCP (mobile) | < 1.5s |

Instrument (privacy-safe, aggregate only): one-liner copies, CTA clicks by location, outbound to GitHub/docs, per-page scroll depth on Home.

---

## 9. Content Accuracy Requirements (must-not-lie)

The product repo values honest positioning; the site must too.
- Provider count, platform support, and the glibc floor must match the repo at publish time.
- Don't claim features that are roadmap-only; mirror repo caveats (pilot = advanced; some daemon discovery sources planned).
- Don't fabricate testimonials, user counts, or logos of companies not actually using it.
- The install one-liner and `cargo install` command must be verified working before launch (they are, as of v0.1.0).
- A pre-launch checklist cross-checks copy against `README.md` and `docs/`.

---

## 10. Out of Scope (v1) / Future
- Docs portal, blog/CMS, web playground/demo, i18n, light theme, accounts, telemetry dashboards, comparison pages vs competitors (candidate v2), interactive "try a prompt" widget.

## 11. Risks & Mitigations
| Risk | Mitigation |
|---|---|
| Faux-Linear look reads as derivative | Lead with Wingman's own terminal captures + copy; the design system is a substrate, not the message. |
| Terminal captures go stale as CLI evolves | Prefer real-text terminal components fed from a small fixtures file; document a refresh checklist. |
| Overpromising vs shipped features | §9 accuracy gate; About page honesty section. |
| Custom Linear fonts are proprietary | Use Inter + JetBrains Mono (named substitutes), self-hosted. |
| GitHub API rate limits for stars/changelog | Fetch at build time with a token; cache; static fallback. |

## 12. Open Questions
- Final domain/hosting (Vercel vs static export to Pages/Netlify)? Assume Vercel + static-export-capable until told otherwise.
- Wordmark/logo asset — reuse repo branding or design a mark? (Placeholder wordmark until provided.)
- Is there an existing `website/` to salvage assets/copy from? (Repo has `website/` and `website-soon/`; treat as reference only unless directed.)

## 13. Acceptance Criteria (v1 launch)
- All five pages implemented to DESIGN.md tokens, dark-only, responsive across the five breakpoints.
- One-liner copyable from nav-reachable locations on every page.
- Lighthouse ≥ 95 perf/SEO, ≥ 100 a11y on Home and Install.
- No external runtime requests (fonts/assets self-hosted); no console errors; keyboard + screen-reader pass.
- Changelog reflects real GitHub Releases; platform matrix matches repo; copy passes the §9 accuracy check.

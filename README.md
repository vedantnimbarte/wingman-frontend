<p align="center">
  <img src="assets/logo.svg" alt="Wingman" width="420">
</p>

# Wingman Frontend

The website and documentation for **[Wingman](https://github.com/vedantnimbarte/Wingman)**, a terminal coding agent written in Rust that asks the compiler instead of guessing.

The site answers three questions and stops: what Wingman is, how one turn works inside it, and how to start. Everything else lives in the docs.

- **Stack:** Next.js 16 (App Router, static export), React 19, [Motion](https://motion.dev), plain CSS
- **Theme:** dark only
- **License:** MIT for this site. Wingman itself is Apache-2.0.

## Pages

| Route | What it is |
|---|---|
| `/` | Hero with the install command, the animated turn diagram, why it's different, three steps to start |
| `/docs`, `/docs/*` | 12 docs pages with a sidebar, ⌘K full-text search (Pagefind), an outline and "Copy for LLM" |
| `/changelog` | Releases from the GitHub API at build time, with a fallback; RSS at `/rss.xml` |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/opengraph-image` | SEO and crawler routes |

## Develop

Needs Node.js 20.9 or newer.

```bash
cd web
npm install
npm run dev       # http://localhost:3000; search falls back to titles in dev
npm run build     # static export to out/, then the Pagefind index
npm run preview   # serve out/
npm run lint      # tsc --noEmit
```

## Structure

```
web/
├── app/
│   ├── globals.css          the whole design system: tokens, landing, docs, changelog
│   ├── layout.tsx           fonts, header, footer, metadata
│   ├── page.tsx             landing page
│   ├── docs/                docs shell and 12 pages (hand-written TSX)
│   ├── changelog/           releases list
│   └── sitemap.ts robots.ts rss.xml/ llms.txt/ opengraph-image.tsx not-found.tsx
├── components/
│   ├── TurnDiagram.tsx      the animated "one turn" architecture diagram
│   ├── Install.tsx          platform toggle + copyable install command
│   ├── chrome.tsx           header and footer
│   ├── Terminal.tsx         terminal captures as real text (docs)
│   ├── docs/                shell, search, outline, callout, table, prev/next
│   └── ui/                  CodeBlock (Shiki at build time), CopyButton
├── content/                 product facts, docs nav, terminal fixtures
└── lib/                     fonts, releases fetch, analytics, slug
```

## Design

The design system is described in [`DESIGN.md`](DESIGN.md) and implemented in `web/app/globals.css`. In short: one idea per section, hairlines instead of cards, left-aligned columns, and one motion moment (the turn diagram).

## Keeping it accurate

Product facts live in `web/content/product.ts`, and the turn diagram's stages and captions live in `web/components/TurnDiagram.tsx`. Check both against the Wingman repo's `README.md` and `docs/ARCHITECTURE.md` before each deploy.

## Deploy

`npm run build` writes a static site to `web/out/`. Point Vercel at `web/`, or upload `out/` to any static host.

- The changelog and RSS fetch GitHub Releases during the build and fall back to seeded entries.
- Analytics are off unless `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set (cookieless Plausible).
- `https://wingman.dev` is a placeholder. Change `SITE` in `web/content/product.ts` before going live, and add redirects for the removed routes (`/features`, `/compare`, `/install`, `/providers`, `/security`, `/about`, `/use-cases`) if the old site was ever public.

## License

MIT © Vedant Nimbarte. Wingman itself is licensed Apache-2.0.

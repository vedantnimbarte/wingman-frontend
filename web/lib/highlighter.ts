import { createHighlighter, type Highlighter } from "shiki";

// One cached highlighter for the whole build. Highlighting happens at build
// time (SSG) — no Shiki code ships to the client.

const LANGS = ["bash", "toml", "json", "rust", "tsx", "ini"];
const THEME = "github-dark-default";

let hp: Promise<Highlighter> | null = null;

function get(): Promise<Highlighter> {
  if (!hp) hp = createHighlighter({ themes: [THEME], langs: LANGS });
  return hp;
}

export async function highlight(code: string, lang: string): Promise<string> {
  const h = await get();
  const safe = LANGS.includes(lang) ? lang : "text";
  return h.codeToHtml(code.replace(/\n$/, ""), {
    lang: safe,
    theme: THEME,
  });
}

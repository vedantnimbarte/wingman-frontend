// The named providers Wingman ships adapters for. Everything else is covered
// by the single OpenAI-compatible adapter (hence "73+, one shape").

export const providers = [
  { name: "Anthropic", note: "reference impl · streaming · prompt caching" },
  { name: "OpenAI", note: "OpenAI-compatible adapter" },
  { name: "ChatGPT", note: "browser OAuth" },
  { name: "Google Gemini", note: "native adapter" },
  { name: "OpenRouter", note: "OpenAI-compatible" },
  { name: "LiteLLM", note: "OpenAI-compatible" },
  { name: "LM Studio", note: "local · OpenAI-compatible" },
  { name: "vLLM", note: "local · OpenAI-compatible" },
  { name: "Ollama", note: "local · OpenAI-compatible" },
] as const;

export const providerCaption =
  "…and 60+ more behind a single OpenAI-compatible adapter. One `wingman_core::Message` contract for all of them.";

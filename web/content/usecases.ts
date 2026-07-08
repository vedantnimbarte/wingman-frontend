// Recipes / use-cases. `terminal` optionally names a fixture in terminals.ts.

export type UseCase = {
  id: string;
  title: string;
  blurb: string;
  command?: string;
  terminal?: string;
  points?: string[];
};

export const useCases: UseCase[] = [
  {
    id: "ci-review",
    title: "Review a pull request in CI",
    blurb:
      "Run Wingman headless as a reviewer. Pipe JSON events into your pipeline and gate the merge on what it finds.",
    command: 'wingman --print --json "review the diff against main for regressions"',
    points: [
      "Newline-delimited JSON events pipe straight into jq or a log sink.",
      "Add a stop hook to fail the job on blocking findings.",
    ],
  },
  {
    id: "pilot-feature",
    title: "Ship a small feature with pilot",
    blurb:
      "Hand a goal to a team of agents. Pilot plans it, works in isolated worktrees, and converges into a PR — with cost and approval gates.",
    command: 'wingman pilot run "add cursor pagination to the /users endpoint"',
    terminal: "pilot",
  },
  {
    id: "local-only",
    title: "Work fully offline with local models",
    blurb:
      "No API keys, no data leaving your machine. Point Wingman at a local Ollama / LM Studio / vLLM model and code in read-only mode.",
    command: "wingman discover && wingman --model ollama/llama3.1",
    points: [
      "wingman discover auto-detects running local runtimes.",
      "read-only mode keeps every write behind a prompt.",
    ],
  },
  {
    id: "batch-fix",
    title: "Batch-fix across a codebase",
    blurb:
      "Feed a file of prompts and let Wingman work through them non-interactively — license headers, doc stubs, mechanical migrations.",
    command: "wingman --batch prompts.jsonl",
  },
  {
    id: "explain",
    title: "Understand an unfamiliar repo",
    blurb:
      "Drop into a new codebase and ask. Wingman greps, reads, and explains — reads are free in every mode.",
    command: 'wingman --print "what does this service do and where is auth handled?"',
    terminal: "hero",
  },
  {
    id: "guarded-edit",
    title: "Auto-edit, but guarded",
    blurb:
      "Let Wingman write inside the project tree while a pre-tool-use hook enforces your rules and a denylist blocks destructive shell.",
    command: "wingman --mode auto-edit",
    points: [
      "Writes outside the tree and denylisted commands still prompt.",
      "pre_tool_use hooks can block any call that fails your check.",
    ],
  },
];

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

// One user turn through Wingman, as docs/ARCHITECTURE.md ("Agent loop flow")
// describes it. Keep in sync with that file, not with marketing copy.

type Id = "prompt" | "context" | "model" | "tools" | "resolve" | "verify" | "done";
type Pt = [number, number];

const stages: { id: Id; name: string; sub: string; caption: string }[] = [
  { id: "prompt", name: "prompt", sub: "tui, --print, serve", caption: "Your prompt arrives from the terminal UI, a one-shot --print, or the HTTP server, and is recorded before anything can fail." },
  { id: "context", name: "context", sub: "LearningHook", caption: "Memory, matching code from the local index, and relevant skills are added. If the window is full, old tool output is pruned and the oldest turns are summarised." },
  { id: "model", name: "model", sub: "CompletionRequest", caption: "One request shape for every provider. Text streams back to you; tool calls go to the registry." },
  { id: "tools", name: "tools", sub: "ToolRegistry", caption: "Every call is permission-checked, snapshotted for undo, and redacted of secrets. Read-only calls run in parallel." },
  { id: "resolve", name: "resolve", sub: "lsp_references", caption: "Definitions, references and renames come from your language server, which follows imports and types instead of matching names." },
  { id: "verify", name: "verify", sub: "TurnGate", caption: "After an edit, the build runs, then language-server diagnostics. A failure goes back to the model, up to two retries." },
  { id: "done", name: "done", sub: "EndTurn", caption: "Only a turn that passed the gate ends as done. Out of retries, it stops with a failure instead." },
];

// The trace: a tool round trip, a failed gate, a retry, a pass.
const trace: { at: Id; fail?: boolean }[] = [
  { at: "prompt" }, { at: "context" }, { at: "model" }, { at: "tools" }, { at: "resolve" },
  { at: "tools" }, { at: "model" }, { at: "verify", fail: true }, { at: "model" },
  { at: "tools" }, { at: "model" }, { at: "verify" }, { at: "done" },
];
const RETRY_STEP = 8; // verify → model, along the retry arc

type Layout = {
  view: [number, number];
  nodes: Record<Id, Pt>;
  label: (p: Pt) => Pt; // where a node's name sits; sub goes 18px below
  edges: { from: Id; to: Id; via?: Pt[] }[];
  retry: Pt[]; // verify → model
  note: { at: Pt; rotate?: boolean };
};

const horizontal: Layout = {
  view: [1040, 340],
  nodes: { prompt: [20, 200], context: [220, 200], model: [420, 200], verify: [740, 200], done: [940, 200], tools: [420, 70], resolve: [640, 70] },
  label: ([x, y]) => [x + 16, y + 34],
  edges: [
    { from: "prompt", to: "context" },
    { from: "context", to: "model" },
    { from: "model", to: "tools" },
    { from: "tools", to: "resolve" },
    { from: "model", to: "verify" },
    { from: "verify", to: "done" },
  ],
  retry: [[740, 200], [740, 300], [420, 300], [420, 200]],
  note: { at: [580, 326] },
};

const vertical: Layout = {
  view: [360, 560],
  nodes: { prompt: [220, 30], context: [220, 110], model: [220, 190], tools: [310, 270], resolve: [310, 350], verify: [220, 430], done: [220, 510] },
  label: ([, y]) => [0, y + 5],
  edges: [
    { from: "prompt", to: "context" },
    { from: "context", to: "model" },
    { from: "model", to: "tools", via: [[310, 190]] },
    { from: "tools", to: "resolve" },
    { from: "model", to: "verify" },
    { from: "verify", to: "done" },
  ],
  retry: [[220, 430], [180, 430], [180, 190], [220, 190]],
  note: { at: [166, 310], rotate: true },
};

const C = { line: "#32323f", unresolved: "#8a90a6", resolved: "#6b78e8", pulse: "#8f9bff", verify: "#3ddc97", canvas: "#06060b" };

const d = (pts: Pt[]) => pts.map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ");

/** Waypoints from one node to the next, following the drawn edge. */
function route(l: Layout, from: Id, to: Id, step: number): Pt[] {
  if (step === RETRY_STEP) return l.retry;
  const e = l.edges.find((e) => (e.from === from && e.to === to) || (e.from === to && e.to === from));
  const pts: Pt[] = [l.nodes[e!.from], ...(e!.via ?? []), l.nodes[e!.to]];
  return e!.from === from ? pts : pts.reverse();
}

function Svg({ l, step, still, className }: { l: Layout; step: number; still: boolean; className: string }) {
  const reached = new Set(trace.slice(0, step + 1).map((t) => t.at));
  const cur = trace[step];
  const failing = !still && cur.fail;
  const retried = still || step >= RETRY_STEP;
  const passed = still || step === trace.length - 1;
  const path = step > 0 && !still ? route(l, trace[step - 1].at, cur.at, step) : [l.nodes[cur.at]];

  return (
    <svg className={className} viewBox={`0 0 ${l.view[0]} ${l.view[1]}`} aria-hidden="true">
      {l.edges.map((e) => (
        <path key={e.from + e.to} d={d([l.nodes[e.from], ...(e.via ?? []), l.nodes[e.to]])} stroke={C.line} fill="none" />
      ))}
      <path d={d(l.retry)} stroke={C.line} strokeDasharray="4 5" fill="none" />
      <motion.path
        d={d(l.retry)}
        stroke={C.resolved}
        fill="none"
        initial={false}
        animate={{ pathLength: retried ? 1 : 0, opacity: retried ? 1 : 0 }}
        transition={{ duration: still ? 0 : 0.9, ease: [0.22, 0.61, 0.36, 1] }}
      />
      <text
        className="note"
        x={l.note.at[0]}
        y={l.note.at[1]}
        textAnchor="middle"
        transform={l.note.rotate ? `rotate(-90 ${l.note.at[0]} ${l.note.at[1]})` : undefined}
      >
        fails: back to the model, max 2 retries
      </text>

      {stages.map((s) => {
        const [x, y] = l.nodes[s.id];
        const [lx, ly] = l.label([x, y]);
        const on = still || reached.has(s.id);
        const fill = s.id === "done" && passed ? C.verify : s.id === "verify" && failing ? C.unresolved : on ? C.resolved : C.canvas;
        return (
          <g key={s.id}>
            <motion.rect
              x={x - 6}
              y={y - 6}
              width={12}
              height={12}
              rx={2}
              strokeWidth={1.5}
              initial={false}
              animate={{ fill, stroke: on ? fill : C.unresolved }}
              transition={{ duration: still ? 0 : 0.4 }}
            />
            <text className="name" x={lx} y={ly}>{s.name}</text>
            <text className="sub" x={lx} y={ly + 18}>{s.sub}</text>
          </g>
        );
      })}

      {still
        ? null
        : [{ r: 14, opacity: 0.22 }, { r: 4.5, opacity: 1 }].map((c) => (
            <motion.circle
              key={c.r}
              r={c.r}
              fill={C.pulse}
              opacity={c.opacity}
              initial={false}
              animate={{ cx: path.map((p) => p[0]), cy: path.map((p) => p[1]) }}
              transition={{ duration: step === RETRY_STEP ? 1 : 0.6, ease: "easeInOut" }}
            />
          ))}
    </svg>
  );
}

export function TurnDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const still = useReducedMotion() ?? false;
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!inView || still) return;
    const last = step === trace.length - 1;
    const t = setTimeout(() => setStep(last ? 0 : step + 1), last ? 2400 : step === RETRY_STEP - 1 ? 1600 : 1100);
    return () => clearTimeout(t);
  }, [step, inView, still]);

  const cur = stages.find((s) => s.id === trace[step].at)!;
  const caption = trace[step].fail ? "The build failed. The error goes back to the model as a new message, and the turn continues." : cur.caption;

  return (
    <div className="turn" ref={ref}>
      <Svg l={horizontal} step={step} still={still} className="turn-h" />
      <Svg l={vertical} step={step} still={still} className="turn-v" />
      <p className="turn-caption" aria-hidden="true">
        <b>{cur.name}.</b> {caption}
      </p>
      <ol className="turn-list">
        {stages.map((s) => (
          <li key={s.id}>
            <b>{s.name}</b> <code>{s.sub}</code>. {s.caption}
          </li>
        ))}
      </ol>
    </div>
  );
}

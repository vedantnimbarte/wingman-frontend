"use client";

import { useEffect, useRef, useState } from "react";
import type { GraphCtx } from "./graphScene";
import { graphEdges, graphNodes, graphSummary, resolveCaption } from "@/content/graph";

/**
 * The hero's signature: a name-match cloud resolving into a typed symbol graph.
 *
 * Renders a static axonometric SVG of the resolved graph first — that is the
 * real content, and it is what a reader gets with no WebGL, a narrow screen,
 * or reduced motion. The canvas is loaded lazily on view and fades in over the
 * SVG when it is ready.
 */

// Must match graphScene: SPREAD 3.4, LAYER_Z 2.3, rotation (-0.16, 0.42, 0).
const SPREAD = 3.4;
const LAYER_Z = 2.3;
const RY = 0.42;
const RX = -0.16;
const VIEW = 8.8; // world units across the SVG viewBox — matches the camera

/** The same orthographic projection the scene uses, so the two agree exactly. */
function project(x: number, y: number, z: number) {
  const xr = x * Math.cos(RY) + z * Math.sin(RY);
  const zr = -x * Math.sin(RY) + z * Math.cos(RY);
  const yr = y * Math.cos(RX) - zr * Math.sin(RX);
  return { x: xr, y: -yr };
}

/** World-space centre of each node, before projection. */
const world = graphNodes.map((n) => ({
  x: n.x * SPREAD,
  y: n.y * SPREAD * 0.62,
  z: (n.layer - 1) * LAYER_Z,
}));
const projected = world.map((p) => project(p.x, p.y, p.z));
const worldById = new Map(graphNodes.map((n, i) => [n.id, world[i]]));

/** One straight run per edge — the same geometry graphScene draws. */
const traces = graphEdges.map(([from, to]) => {
  const a = worldById.get(from)!;
  const b = worldById.get(to)!;
  const p1 = project(a.x, a.y, a.z);
  const p2 = project(b.x, b.y, b.z);
  return { key: `${from}-${to}`, x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y };
});

/** One shelf per tier, bounding the nodes that sit on it. */
const frames = ([0, 1, 2] as const).map((layer) => {
  const on = world.filter((_, i) => graphNodes[i].layer === layer);
  const z = (layer - 1) * LAYER_Z;
  const pad = 0.55;
  const x0 = Math.min(...on.map((p) => p.x)) - pad;
  const x1 = Math.max(...on.map((p) => p.x)) + pad;
  const y0 = Math.min(...on.map((p) => p.y)) - pad;
  const y1 = Math.max(...on.map((p) => p.y)) + pad;
  const corners: Array<[number, number]> = [
    [x0, y0],
    [x1, y0],
    [x1, y1],
    [x0, y1],
  ];
  return {
    key: layer,
    d: corners
      .map(([cx, cy]) => {
        const p = project(cx, cy, z);
        return `${p.x},${p.y}`;
      })
      .join(" "),
  };
});

function StaticGraph() {
  const h = VIEW * 0.72;
  return (
    <svg
      viewBox={`${-VIEW / 2} ${-h / 2} ${VIEW} ${h}`}
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" className="text-hairline-strong" strokeWidth="0.02">
        {frames.map((f) => (
          <polygon key={f.key} points={f.d} />
        ))}
      </g>
      <g fill="none" stroke="currentColor" strokeWidth="0.03" className="text-primary/70">
        {traces.map((t) => (
          <line key={t.key} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />
        ))}
      </g>
      <g fill="none" stroke="currentColor" strokeWidth="0.055" className="text-primary">
        {projected.map((p, i) => (
          <rect key={graphNodes[i].id} x={p.x - 0.17} y={p.y - 0.17} width="0.34" height="0.34" />
        ))}
      </g>
    </svg>
  );
}

export function SymbolGraph() {
  const host = useRef<HTMLDivElement>(null);
  const canvasHost = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [live, setLive] = useState(false);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    const el = host.current;
    const mount = canvasHost.current;
    if (!el || !mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 767px)").matches;
    // On a phone, or when motion is unwelcome, the SVG is the whole answer —
    // never pay 130 kB to show the same drawing.
    if (reduce || narrow) {
      setResolved(true);
      return;
    }

    let ctx: GraphCtx | null = null;
    let raf = 0;
    let cancelled = false;

    let started = false;
    function start() {
      if (started || cancelled) return;
      started = true;
      io?.disconnect();
      window.clearTimeout(failOpen);
      import("./graphScene")
        .then(({ createGraphScene }) => {
          if (cancelled) return;
          ctx = createGraphScene(mount!);
          setLive(true);
          const tick = () => {
            raf = requestAnimationFrame(tick);
            const points = ctx!.labels();
            for (let i = 0; i < points.length; i++) {
              const node = labelRefs.current[i];
              if (!node) continue;
              // Tier 2 sits at the bottom of the drawing, so its labels hang
              // below their node. Anything else would collide with tier 1.
              const drop = graphNodes[i].layer === 2 ? "1.7em" : "-1.9em";
              node.style.transform = `translate3d(${points[i].x}px, ${points[i].y}px, 0) translate(-50%, ${drop})`;
              node.style.opacity = String(Math.max(0, points[i].z * 1.2 - 0.2));
            }
          };
          raf = requestAnimationFrame(tick);
          window.setTimeout(() => !cancelled && setResolved(true), 1500);
        })
        .catch(() => {
          // No WebGL, or the chunk failed to load. The SVG already says it.
          setResolved(true);
        });
    }

    const io =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) start();
            },
            { rootMargin: "200px" },
          );
    io?.observe(el);

    // Fail open: an observer that never reports must not cost the reader the
    // drawing. The scene is above the fold anyway.
    const failOpen = window.setTimeout(start, io ? 1200 : 0);

    return () => {
      cancelled = true;
      io?.disconnect();
      window.clearTimeout(failOpen);
      cancelAnimationFrame(raf);
      ctx?.dispose();
    };
  }, []);

  return (
    <figure ref={host} className="relative">
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/11]">
        {/* Static drawing — the real content, and the fallback. */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-soft ${
            live ? "opacity-0" : "opacity-100"
          }`}
        >
          <StaticGraph />
        </div>

        {/* WebGL, once it has earned its place. */}
        <div ref={canvasHost} className="absolute inset-0" aria-hidden="true" />

        {/* Labels ride on top of the canvas, as real text. */}
        {live
          ? graphNodes.map((n, i) => (
              <span
                key={n.id}
                ref={(el) => {
                  labelRefs.current[i] = el;
                }}
                aria-hidden="true"
                className={`pointer-events-none absolute left-0 top-0 whitespace-nowrap font-mono text-[11px] leading-none opacity-0 ${
                  n.id === "loop" ? "text-ink" : "text-ink-tertiary"
                }`}
              >
                {n.label}
              </span>
            ))
          : null}
      </div>

      {/* The argument the drawing is making, in words. */}
      <figcaption className="mt-6 border-t border-hairline pt-5">
        <dl className="flex flex-wrap items-baseline gap-x-8 gap-y-3 font-mono text-mono">
          <div
            className={`flex items-baseline gap-3 transition-opacity duration-700 ease-soft ${
              resolved ? "opacity-40" : "opacity-100"
            }`}
          >
            <dt className="text-ink-tertiary">{resolveCaption.before.tool}</dt>
            <dd className="text-unresolved">
              <span className="figure">{resolveCaption.before.count}</span>{" "}
              {resolveCaption.before.label}
            </dd>
          </div>
          <div
            className={`flex items-baseline gap-3 transition-opacity duration-700 ease-soft ${
              resolved ? "opacity-100" : "opacity-30"
            }`}
          >
            <dt className="text-ink-tertiary">{resolveCaption.after.tool}</dt>
            <dd className="text-resolved">
              <span className="figure">{resolveCaption.after.count}</span>{" "}
              {resolveCaption.after.label}
            </dd>
          </div>
        </dl>
        <p className="sr-only">{graphSummary}</p>
      </figcaption>
    </figure>
  );
}

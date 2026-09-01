import * as THREE from "three";
import { graphEdges, graphNodes, type GraphNode } from "@/content/graph";

/**
 * "The Resolve" — the hero scene.
 *
 * A cloud of unconnected name matches (what grep returns) resolves into a
 * connected, typed symbol graph (what the language server returns). Drawn as a
 * technical axonometric: orthographic camera, hairline segments, square nodes,
 * no bloom, no perspective glow. It is a blueprint that turns, not a particle
 * field.
 *
 * Imperative three.js rather than a renderer binding — one scene does not earn
 * a reconciler, and this ships ~40 kB less.
 */

const SPREAD = 3.4; // world units for the -1..1 node grid
const LAYER_Z = 2.3; // depth between layers
const NODE = 0.19; // half-width of a node square
const DUST = 47; // name matches — see content/graph.ts
const RESOLVE_MS = 1700;

const COLOR_RESOLVED = 0x6b78e8;
const COLOR_UNRESOLVED = 0x8a90a6;
const COLOR_HAIRLINE = 0x3a3d54;

export type GraphCtx = {
  /** 0..1 resolve progress, for the caption to read. */
  progress: () => number;
  /** Screen-space label positions in CSS px, in graphNodes order. */
  labels: () => Array<{ x: number; y: number; z: number }>;
  resize: () => void;
  dispose: () => void;
};

function nodePosition(n: GraphNode): THREE.Vector3 {
  return new THREE.Vector3(n.x * SPREAD, n.y * SPREAD * 0.62, (n.layer - 1) * LAYER_Z);
}

/** Push a square ring's 4 segments (8 vertices) into `out`. */
function pushSquare(out: number[], p: THREE.Vector3, r: number) {
  const c: Array<[number, number]> = [
    [-r, -r],
    [r, -r],
    [r, r],
    [-r, r],
  ];
  for (let i = 0; i < 4; i++) {
    const a = c[i];
    const b = c[(i + 1) % 4];
    out.push(p.x + a[0], p.y + a[1], p.z, p.x + b[0], p.y + b[1], p.z);
  }
}

/**
 * One straight run per edge. An earlier version routed each edge through a bus
 * plane like a circuit trace; with twelve edges it read as a tangle rather than
 * a drawing, so the routing came out and the tier layout went in.
 */
function pushTrace(out: number[], a: THREE.Vector3, b: THREE.Vector3) {
  out.push(a.x, a.y, a.z, b.x, b.y, b.z);
}

/** Breadth-first order from the loop outward, so resolution propagates. */
function edgeOrder(): number[] {
  const adjacency = new Map<string, number[]>();
  graphEdges.forEach(([from, to], i) => {
    for (const id of [from, to]) {
      if (!adjacency.has(id)) adjacency.set(id, []);
      adjacency.get(id)!.push(i);
    }
  });
  const seenEdge = new Set<number>();
  const seenNode = new Set<string>(["loop"]);
  const order: number[] = [];
  const queue = ["loop"];
  while (queue.length) {
    const id = queue.shift()!;
    for (const ei of adjacency.get(id) ?? []) {
      if (seenEdge.has(ei)) continue;
      seenEdge.add(ei);
      order.push(ei);
      const [from, to] = graphEdges[ei];
      const next = from === id ? to : from;
      if (!seenNode.has(next)) {
        seenNode.add(next);
        queue.push(next);
      }
    }
  }
  graphEdges.forEach((_, i) => {
    if (!seenEdge.has(i)) order.push(i);
  });
  return order;
}

export function createGraphScene(container: HTMLElement): GraphCtx {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);
  renderer.domElement.style.display = "block";
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
  camera.position.set(0, 0, 20);

  const scene = new THREE.Scene();
  const group = new THREE.Group();
  // A fixed axonometric tilt — the drawing is turned on its stand, and the
  // animation rocks it around that rather than orbiting it.
  group.rotation.set(-0.16, 0.42, 0);
  scene.add(group);

  const positions = graphNodes.map(nodePosition);

  // --- Resolved graph: node squares ---------------------------------------
  const nodeVerts: number[] = [];
  positions.forEach((p) => pushSquare(nodeVerts, p, NODE));
  const nodeGeo = new THREE.BufferGeometry();
  nodeGeo.setAttribute("position", new THREE.Float32BufferAttribute(nodeVerts, 3));
  const nodeMat = new THREE.LineBasicMaterial({
    color: COLOR_RESOLVED,
    transparent: true,
    opacity: 0,
  });
  group.add(new THREE.LineSegments(nodeGeo, nodeMat));

  // --- Resolved graph: traces, ordered outward from the loop ---------------
  const traceVerts: number[] = [];
  const byId = new Map(graphNodes.map((n, i) => [n.id, positions[i]]));
  for (const ei of edgeOrder()) {
    const [from, to] = graphEdges[ei];
    pushTrace(traceVerts, byId.get(from)!, byId.get(to)!);
  }
  const traceGeo = new THREE.BufferGeometry();
  traceGeo.setAttribute("position", new THREE.Float32BufferAttribute(traceVerts, 3));
  const traceCount = traceVerts.length / 3;
  traceGeo.setDrawRange(0, 0);
  const traceMat = new THREE.LineBasicMaterial({
    color: COLOR_RESOLVED,
    transparent: true,
    opacity: 0.72,
  });
  group.add(new THREE.LineSegments(traceGeo, traceMat));

  // --- One shelf per tier, bounding the nodes that sit on it --------------
  const frameVerts: number[] = [];
  for (const layer of [0, 1, 2] as const) {
    const on = positions.filter((_, i) => graphNodes[i].layer === layer);
    if (!on.length) continue;
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
    for (let i = 0; i < 4; i++) {
      const a = corners[i];
      const b = corners[(i + 1) % 4];
      frameVerts.push(a[0], a[1], z, b[0], b[1], z);
    }
  }
  const frameGeo = new THREE.BufferGeometry();
  frameGeo.setAttribute("position", new THREE.Float32BufferAttribute(frameVerts, 3));
  const frameMat = new THREE.LineBasicMaterial({
    color: COLOR_HAIRLINE,
    transparent: true,
    opacity: 0,
  });
  group.add(new THREE.LineSegments(frameGeo, frameMat));

  // --- Unresolved dust: the name matches ----------------------------------
  const dustVerts = new Float32Array(DUST * 3);
  // Deterministic scatter — the same drawing every load, not a lottery.
  let seed = 1337;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  for (let i = 0; i < DUST; i++) {
    dustVerts[i * 3] = (rand() - 0.5) * SPREAD * 2.5;
    dustVerts[i * 3 + 1] = (rand() - 0.5) * SPREAD * 1.7;
    dustVerts[i * 3 + 2] = (rand() - 0.5) * LAYER_Z * 2.6;
  }
  const dustHome = dustVerts.slice();
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustVerts, 3));
  const dustMat = new THREE.PointsMaterial({
    color: COLOR_UNRESOLVED,
    size: 3.5,
    sizeAttenuation: false,
    transparent: true,
    opacity: 0.85,
  });
  group.add(new THREE.Points(dustGeo, dustMat));

  // --- Sizing --------------------------------------------------------------
  function resize() {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    // Frame to the shorter axis so the drawing never crops on a phone. The
    // graph spans roughly ±4.3 x ±2.6 once rotated; this leaves a hair of air
    // around it rather than a field of empty canvas.
    const half = 4.3;
    const aspect = w / h;
    camera.left = -half * Math.max(aspect, 1);
    camera.right = half * Math.max(aspect, 1);
    camera.top = half * Math.max(1 / aspect, 1);
    camera.bottom = -half * Math.max(1 / aspect, 1);
    camera.updateProjectionMatrix();
  }
  resize();

  // --- Pointer parallax ----------------------------------------------------
  const pointer = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  function onPointer(e: PointerEvent) {
    const r = container.getBoundingClientRect();
    target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
  }
  function onLeave() {
    target.x = 0;
    target.y = 0;
  }
  if (!reduced) {
    container.addEventListener("pointermove", onPointer, { passive: true });
    container.addEventListener("pointerleave", onLeave, { passive: true });
  }

  // --- Frame loop ----------------------------------------------------------
  const projected = graphNodes.map(() => ({ x: 0, y: 0, z: 0 }));
  const scratch = new THREE.Vector3();
  let progress = 0;
  let start = 0;
  let raf = 0;
  let running = true;

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  function frame(now: number) {
    raf = requestAnimationFrame(frame);
    if (!start) start = now;
    progress = reduced ? 1 : Math.min((now - start) / RESOLVE_MS, 1);
    const p = easeOut(progress);
    const t = now / 1000;

    // Dust drifts outward and fades as the graph resolves.
    const arr = dustGeo.attributes.position.array as Float32Array;
    for (let i = 0; i < DUST; i++) {
      const push = 1 + p * 0.55;
      const jitter = (1 - p) * 0.09;
      arr[i * 3] = dustHome[i * 3] * push + Math.sin(t * 0.7 + i) * jitter;
      arr[i * 3 + 1] = dustHome[i * 3 + 1] * push + Math.cos(t * 0.9 + i * 1.7) * jitter;
      arr[i * 3 + 2] = dustHome[i * 3 + 2] * push;
    }
    dustGeo.attributes.position.needsUpdate = true;
    dustMat.opacity = 0.85 * (1 - p);

    // Traces draw in outward from the loop; nodes and frames fade up behind.
    traceGeo.setDrawRange(0, Math.floor(traceCount * p));
    nodeMat.opacity = p;
    frameMat.opacity = 0.5 * p;

    // Slow rock plus pointer parallax. Never a full spin — a drawing on a
    // stand being looked at, not an object in orbit.
    pointer.x += (target.x - pointer.x) * 0.05;
    pointer.y += (target.y - pointer.y) * 0.05;
    const drift = reduced ? 0 : Math.sin(t * 0.16) * 0.2;
    group.rotation.y = 0.42 + drift + pointer.x * 0.16;
    group.rotation.x = -0.16 + pointer.y * 0.1;

    renderer.render(scene, camera);

    // Project node centres for the HTML labels.
    const w = container.clientWidth;
    const h = container.clientHeight;
    for (let i = 0; i < positions.length; i++) {
      scratch.copy(positions[i]).applyMatrix4(group.matrixWorld).project(camera);
      projected[i].x = (scratch.x * 0.5 + 0.5) * w;
      projected[i].y = (-scratch.y * 0.5 + 0.5) * h;
      projected[i].z = p;
    }
  }
  raf = requestAnimationFrame(frame);

  // Stop rendering while the tab is hidden — no GPU spend on a page nobody
  // is looking at.
  function onVisibility() {
    if (document.hidden && running) {
      cancelAnimationFrame(raf);
      running = false;
    } else if (!document.hidden && !running) {
      running = true;
      start = performance.now() - RESOLVE_MS * progress;
      raf = requestAnimationFrame(frame);
    }
  }
  document.addEventListener("visibilitychange", onVisibility);

  const ro = new ResizeObserver(resize);
  ro.observe(container);

  return {
    progress: () => progress,
    labels: () => projected,
    resize,
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      container.removeEventListener("pointermove", onPointer);
      container.removeEventListener("pointerleave", onLeave);
      [nodeGeo, traceGeo, frameGeo, dustGeo].forEach((g) => g.dispose());
      [nodeMat, traceMat, frameMat, dustMat].forEach((m) => m.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}

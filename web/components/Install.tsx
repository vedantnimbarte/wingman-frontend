"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CopyButton } from "@/components/ui/CopyButton";
import { product } from "@/content/product";

const platforms = [
  { id: "unix", label: "macOS and Linux", command: product.installOneLiner },
  { id: "windows", label: "Windows", command: product.installWindows },
] as const;

export function Install() {
  const [os, setOs] = useState<(typeof platforms)[number]["id"]>("unix");
  const command = platforms.find((p) => p.id === os)!.command;

  return (
    <div className="install" data-analytics="hero_install">
      <div className="os" role="group" aria-label="Platform">
        {platforms.map((p) => (
          <button key={p.id} type="button" aria-pressed={os === p.id} onClick={() => setOs(p.id)}>
            {os === p.id ? (
              <motion.span layoutId="os-pill" className="os-pill" transition={{ type: "spring", stiffness: 520, damping: 42 }} />
            ) : null}
            {p.label}
          </button>
        ))}
      </div>
      <div className="cmd">
        <span className="prompt" aria-hidden="true">{os === "windows" ? ">" : "$"}</span>
        <code>{command}</code>
        <CopyButton code={command} label="Copy install command" />
      </div>
    </div>
  );
}

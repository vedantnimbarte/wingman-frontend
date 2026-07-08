// Install matrix — must match the release workflow + install.sh in the repo.

export type Platform = {
  os: string;
  arch: string;
  method: string;
  prebuilt: boolean;
  note?: string;
};

export const platforms: Platform[] = [
  { os: "Linux", arch: "x86_64", method: "curl | sh", prebuilt: true, note: "gnu · glibc ≥ 2.38" },
  { os: "Linux", arch: "aarch64", method: "curl | sh", prebuilt: true, note: "gnu · glibc ≥ 2.38" },
  { os: "macOS", arch: "Apple Silicon", method: "curl | sh", prebuilt: true },
  { os: "Windows", arch: "x86_64", method: "install.ps1", prebuilt: true },
  { os: "macOS", arch: "Intel (x86_64)", method: "cargo install", prebuilt: false, note: "build from source" },
];

export const glibcNote =
  "Linux prebuilt binaries require glibc ≥ 2.38 (Ubuntu 24.04+, Debian 13+, Fedora 39+). On older distros, build from source with cargo.";

export const installSteps = {
  unix: {
    label: "macOS / Linux",
    cmd: "curl -fsSL https://raw.githubusercontent.com/vedantnimbarte/Wingman/main/scripts/install.sh | sh",
  },
  windows: {
    label: "Windows (PowerShell)",
    cmd: "irm https://raw.githubusercontent.com/vedantnimbarte/Wingman/main/scripts/install.ps1 | iex",
  },
  source: {
    label: "From source (any platform with Rust)",
    cmd: "cargo install --git https://github.com/vedantnimbarte/Wingman wingman-cli",
  },
};

export const firstRun = [
  { cmd: "wingman login anthropic", desc: "Probe a key and store it in the OS keyring." },
  { cmd: "wingman", desc: "Launch the interactive TUI." },
  { cmd: 'wingman --print "explain this repo"', desc: "Headless one-shot for scripting." },
  { cmd: "wingman discover", desc: "Find local Ollama / LM Studio / vLLM models." },
  { cmd: "wingman --version", desc: "Verify the install." },
];

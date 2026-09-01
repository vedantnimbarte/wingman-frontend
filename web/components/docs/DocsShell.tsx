"use client";

import { useEffect, useState } from "react";
import { DocsSidebar } from "./DocsSidebar";
import { SearchTrigger, SearchModal } from "./DocsSearch";

export function DocsShell({ children }: { children: React.ReactNode }) {
  const [drawer, setDrawer] = useState(false);
  const [search, setSearch] = useState(false);

  // Global Cmd/Ctrl+K opens search (registered once, here).
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch((v) => !v);
      }
      if (e.key === "Escape") {
        setSearch(false);
        setDrawer(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="border-t border-hairline/50">
      <div className="mx-auto flex w-full max-w-content">
        {/* Desktop sidebar */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-hairline/50 px-6 py-10 lg:block">
          <SearchTrigger onClick={() => setSearch(true)} />
          <div className="mt-8">
            <DocsSidebar />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          {/* Mobile bar */}
          <div className="sticky top-16 z-30 flex items-center gap-3 border-b border-hairline/50 bg-canvas/80 px-6 py-3 backdrop-blur-xl lg:hidden">
            <button
              type="button"
              onClick={() => setDrawer(true)}
              className="rounded-md border border-hairline bg-surface-1 px-3.5 py-2 text-body-sm text-ink"
              aria-label="Open documentation menu"
            >
              Menu
            </button>
            <div className="flex-1">
              <SearchTrigger onClick={() => setSearch(true)} />
            </div>
          </div>

          {children}
        </div>
      </div>

      {/* Mobile drawer */}
      {drawer ? (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Documentation menu">
          <div className="absolute inset-0 bg-canvas/80 backdrop-blur-sm" onClick={() => setDrawer(false)} />
          <div className="absolute left-0 top-0 h-full w-72 overflow-y-auto border-r border-hairline bg-canvas px-5 py-6">
            <SearchTrigger onClick={() => { setDrawer(false); setSearch(true); }} />
            <div className="mt-8">
              <DocsSidebar onNavigate={() => setDrawer(false)} />
            </div>
          </div>
        </div>
      ) : null}

      <SearchModal open={search} onClose={() => setSearch(false)} />
    </div>
  );
}

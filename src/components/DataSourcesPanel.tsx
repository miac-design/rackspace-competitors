"use client";

import { useState } from "react";
import { Database, ChevronUp, ChevronDown, CheckCircle2, Plug } from "lucide-react";
import { CONNECTORS } from "@/lib/data/connectors";

// Slide-up panel showing the live connection state of every source. Makes the
// "what's real vs not connected" model explicit and auditable.
export default function DataSourcesPanel() {
  const [open, setOpen] = useState(false);
  const connectedCount = CONNECTORS.filter((c) => c.connected).length;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <div className="flex justify-center">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 rounded-t-xl border border-b-0 border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 shadow-sm transition-all hover:text-[#C8102E]"
        >
          <Database className="h-4 w-4" />
          Data sources
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">
            {connectedCount}/{CONNECTORS.length} connected
          </span>
          {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
        </button>
      </div>

      {open && (
        <div className="max-h-80 overflow-y-auto border-t border-gray-100 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.06)] animate-fade-in-up">
          <div className="mx-auto max-w-5xl px-6 py-5">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {CONNECTORS.map((c) => (
                <div
                  key={c.id}
                  className={`rounded-xl border p-3.5 ${
                    c.connected ? "border-emerald-200 bg-emerald-50/40" : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-800">{c.name}</span>
                    {c.connected ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Connected
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-400">
                        <Plug className="h-3.5 w-3.5" />
                        Not connected
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-gray-500">{c.description}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    {c.feeds.map((f) => (
                      <span key={f} className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500">
                        {f}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-[11px] text-gray-400">
                    {c.integration} · refreshes {c.cadence.toLowerCase()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { ChevronDown, ShieldCheck, Clock, AlertTriangle, Plug, RefreshCw } from "lucide-react";
import { FreshnessSummary, FreshnessStatus } from "@/lib/data/types";
import { STATUS_META, formatAge } from "@/lib/data/freshness";

const STATUS_ICON = {
  green: ShieldCheck,
  amber: Clock,
  red: AlertTriangle,
} as const;

// The overall freshness pill. Color is computed from the worst (oldest)
// connected input. Clicking expands the per-source breakdown. Any red source
// (including "not connected") surfaces a Request refresh action.
export default function FreshnessPill({
  summary,
  onRequestRefresh,
}: {
  summary: FreshnessSummary;
  onRequestRefresh?: (label: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const status: FreshnessStatus = summary.status;
  const meta = STATUS_META[status];
  const Icon = STATUS_ICON[status];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold transition-all ${meta.pillBg} ${meta.pillText} hover:shadow-sm`}
      >
        <Icon className="h-3.5 w-3.5" />
        {meta.label}
        <ChevronDown
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 z-30 mt-2 w-72 rounded-xl border border-gray-200 bg-white p-3 shadow-xl animate-fade-in">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-gray-400">
            Source freshness
          </p>
          <ul className="space-y-1.5">
            {summary.items.map((item) => {
              const m = STATUS_META[item.status];
              return (
                <li
                  key={item.label}
                  className="flex items-center justify-between gap-2 text-xs"
                >
                  <span className="flex items-center gap-2 text-gray-600">
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${
                        item.connected ? m.dot : "bg-gray-300"
                      }`}
                    />
                    {item.label}
                  </span>
                  {item.connected ? (
                    <span className={`font-semibold ${m.pillText}`}>
                      {formatAge(item.ageDays)}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-medium text-gray-400">
                      <Plug className="h-3 w-3" />
                      not connected
                    </span>
                  )}
                </li>
              );
            })}
          </ul>

          {status === "red" && onRequestRefresh && (
            <button
              onClick={() => onRequestRefresh(summary.items.find((i) => i.status === "red")?.owner ?? "owner")}
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition-colors hover:bg-red-100"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Request refresh
            </button>
          )}
        </div>
      )}
    </div>
  );
}

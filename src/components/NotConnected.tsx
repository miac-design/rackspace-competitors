"use client";

import { Plug } from "lucide-react";
import { getConnector } from "@/lib/data/connectors";

// Honest empty state for any source that isn't wired yet. Shows what the source
// would feed and how it connects — never sample data.
export default function NotConnected({
  connectorId,
  compact = false,
}: {
  connectorId: string;
  compact?: boolean;
}) {
  const connector = getConnector(connectorId);
  if (!connector) return null;

  if (compact) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 px-2 py-1 text-[11px] font-medium text-gray-500">
        <Plug className="h-3 w-3" />
        {connector.name} not connected
      </span>
    );
  }

  return (
    <div className="dot-pattern rounded-xl border border-dashed border-gray-300 bg-white/60 p-5 text-center">
      <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
        <Plug className="h-4 w-4 text-gray-400" />
      </div>
      <p className="text-sm font-semibold text-gray-700">
        {connector.name} — not connected
      </p>
      <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-gray-500">
        {connector.description}
      </p>
      <p className="mt-2 text-[11px] text-gray-400">
        Connects via {connector.integration} · refreshes {connector.cadence.toLowerCase()}
      </p>
    </div>
  );
}

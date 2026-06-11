"use client";

import { ArrowUpRight, Minus, ArrowDownRight } from "lucide-react";
import { FeatureGap, GapStatus } from "@/lib/data/types";

const STATUS_META: Record<
  GapStatus,
  { label: string; cls: string; Icon: typeof ArrowUpRight }
> = {
  lead: { label: "Lead", cls: "text-emerald-700 bg-emerald-50 border-emerald-200", Icon: ArrowUpRight },
  par: { label: "Par", cls: "text-gray-600 bg-gray-50 border-gray-200", Icon: Minus },
  gap: { label: "Gap", cls: "text-red-700 bg-red-50 border-red-200", Icon: ArrowDownRight },
};

export default function FeatureGapTable({ gaps }: { gaps: FeatureGap[] }) {
  if (gaps.length === 0) return null;
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
            <th className="px-4 py-2.5">Capability</th>
            <th className="px-4 py-2.5">Rackspace</th>
            <th className="px-4 py-2.5">Competitor</th>
            <th className="px-4 py-2.5 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {gaps.map((g) => {
            const m = STATUS_META[g.status];
            return (
              <tr key={g.capability} className="hover:bg-gray-50/60">
                <td className="px-4 py-2.5 font-medium text-gray-800">{g.capability}</td>
                <td className="px-4 py-2.5 text-gray-600">
                  {g.rackspaceValue}
                  <span className="ml-1 text-xs text-gray-400">{g.rackspaceScore}/10</span>
                </td>
                <td className="px-4 py-2.5 text-gray-600">
                  {g.competitorValue}
                  <span className="ml-1 text-xs text-gray-400">{g.competitorScore}/10</span>
                </td>
                <td className="px-4 py-2.5 text-right">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold ${m.cls}`}
                  >
                    <m.Icon className="h-3 w-3" />
                    {m.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

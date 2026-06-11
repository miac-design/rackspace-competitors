"use client";

import { useMemo, useState } from "react";
import { Search, ChevronRight, TrendingDown, Plug } from "lucide-react";
import CompetitorLogo from "@/components/CompetitorLogo";
import { getRanking, getCompetitorFreshness } from "@/lib/data/repository";
import { STATUS_META } from "@/lib/data/freshness";
import { Tier } from "@/lib/data/types";

const TIER_LABEL: Record<Tier, string> = {
  hyperscaler: "Hyperscaler",
  "cloud-iaas": "Cloud & IaaS",
  "bare-metal-colo": "Bare metal & colo",
};

export default function EntryView({ onSelect }: { onSelect: (slug: string) => void }) {
  const [query, setQuery] = useState("");
  const ranking = useMemo(() => getRanking(), []);

  const filtered = ranking.competitors.filter((r) =>
    r.competitor.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <div className="mb-6 text-center animate-fade-in">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Who are you up against?
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Search a competitor for an in-the-moment battle card, grounded in approved intel.
        </p>
      </div>

      <div className="relative mb-5 animate-fade-in-up">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search competitors…"
          className="w-full rounded-2xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 shadow-sm transition-all placeholder:text-gray-400 focus:border-[#C8102E]/40 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10"
        />
      </div>

      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gray-400">
          <TrendingDown className="h-3.5 w-3.5" />
          Ranked by deals lost
        </h2>
        {!ranking.connected && (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-50 px-2 py-1 text-[11px] font-medium text-amber-700">
            <Plug className="h-3 w-3" />
            CRM not connected — order is provisional
          </span>
        )}
      </div>

      <div className="space-y-2 stagger-children">
        {filtered.map((r) => {
          const fresh = getCompetitorFreshness(r.competitor.slug);
          const dot = STATUS_META[fresh.status].dot;
          return (
            <button
              key={r.competitor.slug}
              onClick={() => onSelect(r.competitor.slug)}
              className="group flex w-full animate-fade-in-up items-center gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-left transition-all hover:border-[#C8102E]/30 hover:shadow-md hover:shadow-red-100/30"
            >
              <span className="relative">
                <CompetitorLogo competitor={r.competitor} size={28} />
                <span
                  className={`absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white ${dot}`}
                  title={`Intel freshness: ${fresh.status}`}
                />
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-gray-900 group-hover:text-[#C8102E]">
                  {r.competitor.name}
                </div>
                <div className="text-xs text-gray-400">{TIER_LABEL[r.competitor.tier]}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-gray-900">
                  {r.lossCount ?? "—"}
                </div>
                <div className="text-[10px] uppercase tracking-wide text-gray-400">
                  deals lost
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-[#C8102E]" />
            </button>
          );
        })}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-400">No competitors match “{query}”.</p>
        )}
      </div>
    </div>
  );
}

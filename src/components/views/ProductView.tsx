"use client";

import { useMemo } from "react";
import { BarChart3, Percent, LineChart, Newspaper, Layers, ChevronRight } from "lucide-react";
import CompetitorLogo from "@/components/CompetitorLogo";
import NotConnected from "@/components/NotConnected";
import SourceLine from "@/components/SourceLine";
import { getCompetitors, getFeatureGaps } from "@/lib/data/repository";

function SectionTitle({ icon: Icon, children }: { icon: typeof BarChart3; children: React.ReactNode }) {
  return (
    <h3 className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gray-400">
      <Icon className="h-3.5 w-3.5" />
      {children}
    </h3>
  );
}

export default function ProductView({ onSelect }: { onSelect: (slug: string) => void }) {
  const competitors = useMemo(() => getCompetitors(), []);

  // Real, approved-content-derived: how many capabilities are gaps / leads.
  const coverage = competitors.map((c) => {
    const gaps = getFeatureGaps(c.slug);
    return {
      competitor: c,
      gaps: gaps.filter((g) => g.status === "gap").length,
      leads: gaps.filter((g) => g.status === "lead").length,
      total: gaps.length,
      sample: gaps[0],
    };
  });

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold tracking-tight text-gray-900">Product · Trends</h1>
        <p className="mt-0.5 text-sm text-gray-500">
          Win/loss trends and feature gaps. CRM and news sources show their connection state.
        </p>
      </div>

      {/* Win-rate + QoQ — CRM */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <SectionTitle icon={Percent}>Win rate &amp; QoQ delta</SectionTitle>
          <NotConnected connectorId="crm" />
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <SectionTitle icon={LineChart}>Win/loss trend</SectionTitle>
          <NotConnected connectorId="crm" />
        </div>
      </div>

      {/* Feature-gap overview — approved content, real */}
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <SectionTitle icon={Layers}>Feature-gap overview</SectionTitle>
        <div className="space-y-2">
          {coverage.map((row) => (
            <button
              key={row.competitor.slug}
              onClick={() => onSelect(row.competitor.slug)}
              className="group flex w-full items-center gap-3 rounded-xl border border-gray-100 px-3 py-2.5 text-left transition-all hover:border-[#C8102E]/30 hover:bg-gray-50"
            >
              <CompetitorLogo competitor={row.competitor} size={22} />
              <span className="flex-1 text-sm font-medium text-gray-800">
                {row.competitor.name}
              </span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                {row.leads} lead
              </span>
              <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-700">
                {row.gaps} gap
              </span>
              <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-[#C8102E]" />
            </button>
          ))}
        </div>
        {coverage[0]?.sample && (
          <div className="mt-3">
            <SourceLine provenance={coverage[0].sample} />
          </div>
        )}
      </div>

      {/* Intel feed — news */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <SectionTitle icon={Newspaper}>Recent intel</SectionTitle>
        <NotConnected connectorId="news" />
      </div>
    </div>
  );
}

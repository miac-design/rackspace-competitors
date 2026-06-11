"use client";

import { useMemo, useState } from "react";
import { BarChart3, Percent, LineChart, Newspaper, Layers, ChevronRight, ChevronDown } from "lucide-react";
import CompetitorLogo from "@/components/CompetitorLogo";
import NotConnected from "@/components/NotConnected";
import SourceLine from "@/components/SourceLine";
import FeatureGapTable from "@/components/FeatureGapTable";
import RadarChart from "@/components/RadarChart";
import { getCompetitors, getFeatureGaps } from "@/lib/data/repository";

function SectionTitle({ icon: Icon, children }: { icon: typeof BarChart3; children: React.ReactNode }) {
  return (
    <h3 className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gray-400">
      <Icon className="h-3.5 w-3.5" />
      {children}
    </h3>
  );
}

// Product Trends is a self-contained view. Drilling into a competitor expands
// its feature comparison inline — it never navigates away to Battle Cards.
export default function ProductView() {
  const competitors = useMemo(() => getCompetitors(), []);
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const coverage = competitors.map((c) => {
    const gaps = getFeatureGaps(c.slug);
    return {
      competitor: c,
      gaps,
      gapCount: gaps.filter((g) => g.status === "gap").length,
      leadCount: gaps.filter((g) => g.status === "lead").length,
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

      {/* Feature-gap overview — approved content, real. Drills in inline. */}
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <SectionTitle icon={Layers}>Feature-gap overview</SectionTitle>
        <div className="space-y-2">
          {coverage.map((row) => {
            const isOpen = openSlug === row.competitor.slug;
            const radarDims = row.gaps.map((g) => ({
              label: g.capability,
              rackspace: g.rackspaceScore,
              competitor: g.competitorScore,
            }));
            return (
              <div
                key={row.competitor.slug}
                className={`rounded-xl border transition-colors ${
                  isOpen ? "border-[#C8102E]/30 bg-gray-50/40" : "border-gray-100"
                }`}
              >
                <button
                  onClick={() => setOpenSlug(isOpen ? null : row.competitor.slug)}
                  className="group flex w-full items-center gap-3 px-3 py-2.5 text-left"
                >
                  <CompetitorLogo competitor={row.competitor} size={22} />
                  <span className="flex-1 text-sm font-medium text-gray-800">
                    {row.competitor.name}
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                    {row.leadCount} lead
                  </span>
                  <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-700">
                    {row.gapCount} gap
                  </span>
                  {isOpen ? (
                    <ChevronDown className="h-4 w-4 text-[#C8102E]" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-[#C8102E]" />
                  )}
                </button>

                {isOpen && (
                  <div className="space-y-4 border-t border-gray-100 px-3 py-4 animate-fade-in">
                    <FeatureGapTable gaps={row.gaps} />
                    <RadarChart dimensions={radarDims} competitorName={row.competitor.name} />
                    {row.gaps[0] && <SourceLine provenance={row.gaps[0]} />}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Intel feed — news */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <SectionTitle icon={Newspaper}>Recent intel</SectionTitle>
        <NotConnected connectorId="news" />
      </div>
    </div>
  );
}

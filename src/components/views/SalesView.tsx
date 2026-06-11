"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft, ChevronDown, MessageSquareQuote, ShieldQuestion,
  DollarSign, Swords, Sparkles, LayoutGrid, Star, Newspaper, ExternalLink,
} from "lucide-react";
import CompetitorLogo from "@/components/CompetitorLogo";
import FreshnessPill from "@/components/FreshnessPill";
import SourceLine from "@/components/SourceLine";
import NotConnected from "@/components/NotConnected";
import FeatureGapTable from "@/components/FeatureGapTable";
import RadarChart from "@/components/RadarChart";
import ChatPanel from "@/components/ChatPanel";
import {
  getCompetitor, getPositioning, getObjections, getPricingCounter,
  getFeatureGaps, getCompetitorFreshness, getPricingSnapshots, getReviews,
  getIntelEvents,
} from "@/lib/data/repository";
import { formatReviewedDate } from "@/lib/data/freshness";

function SectionTitle({ icon: Icon, children }: { icon: typeof Swords; children: React.ReactNode }) {
  return (
    <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gray-400">
      <Icon className="h-3.5 w-3.5" />
      {children}
    </h3>
  );
}

export default function SalesView({
  slug,
  onBack,
}: {
  slug: string;
  onBack: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [tab, setTab] = useState<"card" | "chat">("card");

  const competitor = getCompetitor(slug);
  const position = useMemo(() => getPositioning(slug), [slug]);
  const objections = useMemo(() => getObjections(slug), [slug]);
  const pricing = useMemo(() => getPricingCounter(slug), [slug]);
  const gaps = useMemo(() => getFeatureGaps(slug), [slug]);
  const freshness = useMemo(() => getCompetitorFreshness(slug), [slug]);
  const pricingSnapshots = useMemo(() => getPricingSnapshots(slug), [slug]);
  const reviews = useMemo(() => getReviews(slug), [slug]);
  const intel = useMemo(() => getIntelEvents(slug), [slug]);

  if (!competitor) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 text-center text-sm text-gray-500">
        Competitor not found.
      </div>
    );
  }

  const [topObjection, ...restObjections] = objections;
  const radarDims = gaps.map((g) => ({
    label: g.capability,
    rackspace: g.rackspaceScore,
    competitor: g.competitorScore,
  }));

  function requestRefresh(owner: string) {
    alert(`Refresh requested. ${owner} has been pinged to re-review this intel.`);
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6">
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-[#C8102E]"
      >
        <ArrowLeft className="h-4 w-4" />
        All competitors
      </button>

      {/* Competitor header */}
      <div className="mb-4 flex items-center gap-3">
        <CompetitorLogo competitor={competitor} size={36} />
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Rackspace vs {competitor.name}
          </h1>
        </div>
        <FreshnessPill summary={freshness} onRequestRefresh={requestRefresh} />
      </div>

      {/* Tabs */}
      <div className="mb-5 inline-flex rounded-full border border-gray-200/60 bg-gray-100/80 p-1">
        {([["card", "Battle card", LayoutGrid], ["chat", "Ask (cited)", Sparkles]] as const).map(
          ([key, label, Icon]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                tab === key
                  ? "bg-[#C8102E] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          )
        )}
      </div>

      {tab === "chat" ? (
        <ChatPanel competitor={competitor} />
      ) : (
        <div className="space-y-5">
          {/* GLANCE: one-line position + top objection */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <SectionTitle icon={Swords}>Position</SectionTitle>
            {position ? (
              <>
                <p className="text-sm leading-relaxed text-gray-800">{position.body}</p>
                <div className="mt-2">
                  <SourceLine provenance={position} />
                </div>
              </>
            ) : (
              <NotConnected connectorId="approved-content" />
            )}

            {topObjection && (
              <div className="mt-4 rounded-xl bg-gray-50 p-4">
                <SectionTitle icon={ShieldQuestion}>Top objection</SectionTitle>
                <p className="text-sm font-semibold text-gray-900">
                  “{topObjection.objection.body}”
                </p>
                {topObjection.rebuttal && (
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-700">
                    {topObjection.rebuttal.body}
                  </p>
                )}
                <div className="mt-2">
                  <SourceLine provenance={topObjection.objection} />
                </div>
              </div>
            )}

            {!expanded && (
              <button
                onClick={() => setExpanded(true)}
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3.5 py-2 text-sm font-semibold text-gray-700 transition-all hover:border-[#C8102E]/30 hover:text-[#C8102E]"
              >
                Expand for full battle card
                <ChevronDown className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* DEPTH */}
          {expanded && (
            <div className="space-y-5 animate-fade-in-up">
              {/* Remaining objections */}
              {restObjections.length > 0 && (
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <SectionTitle icon={MessageSquareQuote}>More objections &amp; rebuttals</SectionTitle>
                  <div className="space-y-4">
                    {restObjections.map(({ objection, rebuttal }) => (
                      <div key={objection.id} className="border-l-2 border-gray-100 pl-3">
                        <p className="text-sm font-semibold text-gray-900">“{objection.body}”</p>
                        {rebuttal && (
                          <p className="mt-1 text-sm leading-relaxed text-gray-700">{rebuttal.body}</p>
                        )}
                        <div className="mt-1.5">
                          <SourceLine provenance={objection} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing counter (approved talk track) + live pricing not connected */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <SectionTitle icon={DollarSign}>Pricing counter</SectionTitle>
                {pricing ? (
                  <>
                    <p className="text-sm leading-relaxed text-gray-800">{pricing.body}</p>
                    <div className="mt-2">
                      <SourceLine provenance={pricing} />
                    </div>
                  </>
                ) : (
                  <NotConnected connectorId="approved-content" />
                )}
                <div className="mt-4">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                    Live competitor pricing
                  </p>
                  {pricingSnapshots.connected && pricingSnapshots.data.length > 0 ? (
                    <div className="space-y-2">
                      {pricingSnapshots.data.map((p) => (
                        <div key={p.plan} className="rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2">
                          <div className="flex items-baseline justify-between gap-3">
                            <span className="text-sm text-gray-700">{p.plan}</span>
                            <span className="text-sm font-bold text-gray-900">{p.price}</span>
                          </div>
                          <div className="mt-1">
                            <SourceLine provenance={p} dataType="pricing" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : pricingSnapshots.connected ? (
                    <p className="rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-500">
                      No public pricing published — {competitor.name} pricing is quote/console-only.
                    </p>
                  ) : (
                    <NotConnected connectorId="pricing" />
                  )}
                </div>
              </div>

              {/* Reviews & analyst sentiment */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <SectionTitle icon={Star}>Reviews &amp; sentiment</SectionTitle>
                {reviews.connected && reviews.data.length > 0 ? (
                  <div className="space-y-2">
                    {reviews.data.map((r) => (
                      <div key={r.provider} className="rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-medium text-gray-700">{r.provider}</span>
                          <span className="inline-flex items-center gap-1 text-sm font-bold text-gray-900">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            {r.rating.toFixed(1)}
                            <span className="text-xs font-normal text-gray-400">/ 5</span>
                            {r.reviewCount && (
                              <span className="ml-1 text-xs font-normal text-gray-400">
                                ({r.reviewCount.toLocaleString()})
                              </span>
                            )}
                          </span>
                        </div>
                        <div className="mt-1">
                          <SourceLine provenance={r} dataType="pricing" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : reviews.connected ? (
                  <p className="rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-500">
                    No public G2 / Gartner rating surfaced for {competitor.name}.
                  </p>
                ) : (
                  <NotConnected connectorId="reviews" />
                )}
              </div>

              {/* Recent intel */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <SectionTitle icon={Newspaper}>Recent intel</SectionTitle>
                {intel.connected && intel.data.length > 0 ? (
                  <ul className="space-y-2.5">
                    {intel.data.map((e) => (
                      <li key={e.headline} className="border-l-2 border-gray-100 pl-3">
                        <a
                          href={e.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start gap-1.5 text-sm text-gray-800 hover:text-[#C8102E]"
                        >
                          <span>{e.headline}</span>
                          <ExternalLink className="mt-0.5 h-3 w-3 shrink-0 opacity-40 group-hover:opacity-100" />
                        </a>
                        <p className="mt-0.5 text-[11px] text-gray-400">
                          {e.source} · {formatReviewedDate(e.date)}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : intel.connected ? (
                  <p className="rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-500">
                    No recent intel on record for {competitor.name}.
                  </p>
                ) : (
                  <NotConnected connectorId="news" />
                )}
              </div>

              {/* Feature gaps */}
              {gaps.length > 0 && (
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <SectionTitle icon={Swords}>Feature comparison</SectionTitle>
                  <FeatureGapTable gaps={gaps} />
                  <div className="mt-4">
                    <RadarChart dimensions={radarDims} competitorName={competitor.name} />
                  </div>
                  <div className="mt-2">
                    <SourceLine provenance={gaps[0]} />
                  </div>
                </div>
              )}

              {/* Win/loss not connected */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <SectionTitle icon={Swords}>Win / loss</SectionTitle>
                <NotConnected connectorId="crm" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

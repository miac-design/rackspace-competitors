// The repository is the single read path for the UI. It joins approved content
// with connector status so views never reach into seed data directly, and it
// returns SourceResult wrappers for connector-gated data (CRM, pricing, news)
// so "not connected" is explicit and can never masquerade as real data.

import { COMPETITORS, CLAIMS, FEATURE_GAPS } from "./seed";
import { PRICING_SNAPSHOTS, REVIEWS, INTEL_EVENTS } from "./public-sources";
import { isConnected } from "./connectors";
import { computeFreshness, summarize } from "./freshness";
import {
  Competitor,
  Claim,
  FeatureGap,
  Metric,
  Review,
  IntelEvent,
  PricingSnapshot,
  FreshnessItem,
  FreshnessSummary,
  FreshnessStatus,
  SourceResult,
} from "./types";

export function getCompetitors(): Competitor[] {
  return COMPETITORS.filter((c) => c.active);
}

export function getCompetitor(slug: string): Competitor | undefined {
  return COMPETITORS.find((c) => c.slug === slug && c.active);
}

export function getClaims(competitorId: string): Claim[] {
  return CLAIMS.filter((c) => c.competitorId === competitorId);
}

export function getPositioning(competitorId: string): Claim | undefined {
  return CLAIMS.find((c) => c.competitorId === competitorId && c.type === "position");
}

export interface ObjectionPair {
  objection: Claim;
  rebuttal?: Claim;
}

export function getObjections(competitorId: string): ObjectionPair[] {
  const objections = CLAIMS.filter(
    (c) => c.competitorId === competitorId && c.type === "objection"
  );
  return objections.map((objection) => ({
    objection,
    rebuttal: CLAIMS.find(
      (c) => c.type === "rebuttal" && c.pairId === objection.pairId
    ),
  }));
}

export function getPricingCounter(competitorId: string): Claim | undefined {
  return CLAIMS.find((c) => c.competitorId === competitorId && c.type === "pricing");
}

export function getFeatureGaps(competitorId: string): FeatureGap[] {
  return FEATURE_GAPS.filter((g) => g.competitorId === competitorId);
}

// ---- Freshness roll-up for a competitor's sales card ----
// Combines connected sources (approved positioning) with the not-connected
// sources (pricing, win/loss) so the breakdown is honest about what's missing.

export function getCompetitorFreshness(competitorId: string): FreshnessSummary {
  const items: FreshnessItem[] = [];

  // Positioning / objections — approved content, connected. The card's
  // positioning freshness is the oldest (worst) reviewed claim.
  const approved = CLAIMS.filter((c) => c.competitorId === competitorId);
  if (approved.length > 0) {
    let oldest: { ageDays: number; status: FreshnessStatus; owner?: string } = {
      ageDays: -1,
      status: "green",
    };
    for (const c of approved) {
      const reviewed = c.lastReviewedAt ?? c.fetchedAt;
      if (!reviewed) continue;
      const f = computeFreshness("positioning", reviewed);
      if (f.ageDays > oldest.ageDays) {
        oldest = { ageDays: f.ageDays, status: f.status, owner: c.approvedBy };
      }
    }
    items.push({
      label: "Positioning",
      dataType: "positioning",
      status: oldest.status,
      ageDays: oldest.ageDays >= 0 ? oldest.ageDays : null,
      connected: true,
      owner: oldest.owner,
    });
  }

  // Pricing — public-sourced. Freshness computed from the snapshot's fetched_at.
  const snapshot = PRICING_SNAPSHOTS.find((p) => p.competitorId === competitorId);
  if (isConnected("pricing") && snapshot) {
    const f = computeFreshness("pricing", snapshot.fetchedAt);
    items.push({
      label: "Pricing",
      dataType: "pricing",
      status: f.status,
      ageDays: f.ageDays,
      connected: true,
    });
  } else {
    items.push({
      label: "Pricing",
      dataType: "pricing",
      status: "red",
      ageDays: null,
      connected: false,
    });
  }

  // Win/loss — CRM not connected.
  items.push({
    label: "Win/loss",
    dataType: "winloss",
    status: "red",
    ageDays: null,
    connected: isConnected("crm"),
  });

  return summarize(items);
}

// ---- CRM-gated data (Phase 1: not connected) ----

export function getMetrics(competitorId: string): SourceResult<Metric[]> {
  if (!isConnected("crm")) return { connected: false, connectorId: "crm" };
  // When wired, CRM rows are returned here. No sample fallback.
  void competitorId;
  return { connected: true, connectorId: "crm", data: [] };
}

export interface RankedCompetitor {
  competitor: Competitor;
  lossCount: number | null;
}

// Entry ranking. When CRM is connected this is ordered by real loss count
// (most-lost-to first). When not connected, lossCount is null and the UI must
// say so rather than implying the order reflects real losses.
export function getRanking(): SourceResult<RankedCompetitor[]> & {
  competitors: RankedCompetitor[];
} {
  const competitors = getCompetitors();
  if (!isConnected("crm")) {
    return {
      connected: false,
      connectorId: "crm",
      competitors: competitors.map((competitor) => ({ competitor, lossCount: null })),
    };
  }
  // When wired: order by CRM loss count.
  const ranked: RankedCompetitor[] = competitors.map((competitor) => ({
    competitor,
    lossCount: 0,
  }));
  return { connected: true, connectorId: "crm", data: ranked, competitors: ranked };
}

export interface WinRate {
  winRatePct: number;
  qoqDeltaPct: number;
  quarter: string;
}

export function getWinRate(competitorId: string): SourceResult<WinRate> {
  if (!isConnected("crm")) return { connected: false, connectorId: "crm" };
  void competitorId;
  return {
    connected: true,
    connectorId: "crm",
    data: { winRatePct: 0, qoqDeltaPct: 0, quarter: "" },
  };
}

// ---- Public-sourced data (pricing, reviews, news) ----

export function getPricingSnapshots(
  competitorId: string
): SourceResult<PricingSnapshot[]> {
  if (!isConnected("pricing")) return { connected: false, connectorId: "pricing" };
  const data = PRICING_SNAPSHOTS.filter((p) => p.competitorId === competitorId);
  return { connected: true, connectorId: "pricing", data };
}

export function getReviews(competitorId: string): SourceResult<Review[]> {
  if (!isConnected("reviews")) return { connected: false, connectorId: "reviews" };
  const data = REVIEWS.filter((r) => r.competitorId === competitorId);
  return { connected: true, connectorId: "reviews", data };
}

export function getIntelEvents(competitorId: string): SourceResult<IntelEvent[]> {
  if (!isConnected("news")) return { connected: false, connectorId: "news" };
  const data = INTEL_EVENTS.filter((e) => e.competitorId === competitorId).sort(
    (a, b) => b.date.localeCompare(a.date)
  );
  return { connected: true, connectorId: "news", data };
}

// All competitors' intel, newest first — drives the Product Trends feed.
export function getAllIntelEvents(): SourceResult<IntelEvent[]> {
  if (!isConnected("news")) return { connected: false, connectorId: "news" };
  const data = [...INTEL_EVENTS].sort((a, b) => b.date.localeCompare(a.date));
  return { connected: true, connectorId: "news", data };
}

// Core domain types for the Competitive Intelligence Hub.
// Every fact-bearing record carries provenance: a source, an optional URL,
// and a timestamp (fetched_at for system-pulled data, last_reviewed_at for
// human-approved content). The freshness engine reads these timestamps.

export type Tier = "hyperscaler" | "cloud-iaas" | "bare-metal-colo";

// Drives which freshness thresholds apply (pricing rots faster than positioning).
export type DataType = "pricing" | "winloss" | "positioning" | "news";

export type FreshnessStatus = "green" | "amber" | "red";

export type ClaimType =
  | "position"
  | "objection"
  | "rebuttal"
  | "pricing"
  | "win"
  | "lose";

export type GapStatus = "lead" | "par" | "gap";

export interface Competitor {
  id: string;
  slug: string;
  name: string;
  tier: Tier;
  logoUrl: string;
  color: string;
  active: boolean;
}

// Provenance is attached to anything a rep could repeat to a prospect.
export interface Provenance {
  source: string;
  sourceUrl?: string;
  // System-pulled data stamps fetchedAt; human-approved content stamps lastReviewedAt.
  fetchedAt?: string;
  lastReviewedAt?: string;
  approvedBy?: string;
}

// Engine A — human-approved retrieval content.
export interface Claim extends Provenance {
  id: string;
  competitorId: string;
  type: ClaimType;
  body: string;
  // For objection/rebuttal pairing.
  pairId?: string;
}

// CRM-derived win/loss. source is always the CRM; never hand-authored.
export interface Metric {
  competitorId: string;
  quarter: string; // e.g. "2026-Q1"
  dealsWon: number;
  dealsLost: number;
  source: string;
  fetchedAt: string;
}

export interface FeatureGap extends Provenance {
  competitorId: string;
  capability: string;
  rackspaceValue: string;
  competitorValue: string;
  status: GapStatus;
  // Numeric scores (0-10) power the competitive radar.
  rackspaceScore: number;
  competitorScore: number;
}

export interface IntelEvent {
  competitorId: string;
  date: string;
  headline: string;
  sourceUrl?: string;
  source: string;
  fetchedAt: string;
}

export interface PricingSnapshot {
  competitorId: string;
  plan: string;
  price: string;
  sourceUrl?: string;
  source: string;
  fetchedAt: string;
}

// Review & analyst sentiment (G2, Gartner Peer Insights).
export interface Review {
  competitorId: string;
  provider: string; // "G2" | "Gartner Peer Insights"
  rating: number; // out of 5
  reviewCount?: number;
  sourceUrl?: string;
  source: string;
  fetchedAt: string;
}

// A single line in a freshness breakdown ("pricing: 4d · positioning: 12d").
export interface FreshnessItem {
  label: string;
  dataType: DataType;
  status: FreshnessStatus;
  ageDays: number | null; // null when the source is not connected
  connected: boolean;
  owner?: string;
}

// The aggregate freshness for a card: worst status across connected inputs.
export interface FreshnessSummary {
  status: FreshnessStatus;
  connectedItems: number;
  items: FreshnessItem[];
}

// Result wrapper for connector-gated data. When a source is not connected we
// return connected:false and NO data — never sample data masquerading as real.
export type SourceResult<T> =
  | { connected: true; data: T; connectorId: string }
  | { connected: false; connectorId: string };

// The freshness engine. Pill color is computed from the real age of the
// underlying record using per-type thresholds — never hardcoded.
//
//  Data type        | Green (fresh) | Amber (review soon) | Red (stale)
//  -----------------|---------------|---------------------|------------
//  Pricing          | <= 7 days     | 8-21 days           | > 21 days
//  Win/loss (CRM)   | <= 2 days     | 3-7 days            | > 7 days
//  Positioning      | <= 30 days    | 31-60 days          | > 60 days
//  News / intel     | <= 3 days     | 4-10 days           | > 10 days

import { DataType, FreshnessStatus, FreshnessItem } from "./types";

const THRESHOLDS: Record<DataType, { green: number; amber: number }> = {
  pricing: { green: 7, amber: 21 },
  winloss: { green: 2, amber: 7 },
  positioning: { green: 30, amber: 60 },
  news: { green: 3, amber: 10 },
};

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function ageInDays(iso: string, now: number = Date.now()): number {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return Number.POSITIVE_INFINITY;
  return Math.max(0, Math.floor((now - then) / MS_PER_DAY));
}

export function statusForAge(dataType: DataType, ageDays: number): FreshnessStatus {
  const t = THRESHOLDS[dataType];
  if (ageDays <= t.green) return "green";
  if (ageDays <= t.amber) return "amber";
  return "red";
}

export function computeFreshness(
  dataType: DataType,
  iso: string,
  now?: number
): { status: FreshnessStatus; ageDays: number } {
  const ageDays = ageInDays(iso, now);
  return { status: statusForAge(dataType, ageDays), ageDays };
}

const RANK: Record<FreshnessStatus, number> = { green: 0, amber: 1, red: 2 };

// The overall pill shows the worst (oldest) status across a card's inputs.
export function worstStatus(statuses: FreshnessStatus[]): FreshnessStatus {
  return statuses.reduce<FreshnessStatus>(
    (worst, s) => (RANK[s] > RANK[worst] ? s : worst),
    "green"
  );
}

// "4d", "12d", "61d" — compact age label used inside the pill breakdown.
export function formatAge(ageDays: number | null): string {
  if (ageDays === null) return "—";
  if (ageDays === 0) return "today";
  if (ageDays === 1) return "1d";
  return `${ageDays}d`;
}

export function formatReviewedDate(iso?: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Visual tokens for each status. Kept here so the pill, dot and breakdown stay
// consistent everywhere they appear.
export const STATUS_META: Record<
  FreshnessStatus,
  { label: string; dot: string; pillBg: string; pillText: string; ring: string }
> = {
  green: {
    label: "Verified",
    dot: "bg-emerald-500",
    pillBg: "bg-emerald-50 border-emerald-200",
    pillText: "text-emerald-700",
    ring: "ring-emerald-500/20",
  },
  amber: {
    label: "Review soon",
    dot: "bg-amber-500",
    pillBg: "bg-amber-50 border-amber-200",
    pillText: "text-amber-700",
    ring: "ring-amber-500/20",
  },
  red: {
    label: "Stale",
    dot: "bg-red-500",
    pillBg: "bg-red-50 border-red-300",
    pillText: "text-red-700",
    ring: "ring-red-500/20",
  },
};

// Build the aggregate summary for a card from its individual freshness items.
// Only connected items contribute to the worst-status roll-up.
export function summarize(items: FreshnessItem[]) {
  const connected = items.filter((i) => i.connected);
  const status = worstStatus(connected.map((i) => i.status));
  return { status, connectedItems: connected.length, items };
}

// Source connector registry. Each real data source is declared here behind a
// clean interface with a `connected` flag. When a connector is not configured,
// the UI shows "source not connected" instead of inventing data.
//
// Phase 1: the Approved Content Store is wired (positioning, objections,
// rebuttals, feature gaps). CRM, pricing, reviews and news are stubbed and
// clearly flagged not-connected until their credentials are supplied.
//
// A connector flips to connected when its env flag is set, so going live is a
// configuration change, not a code change.

import { DataType } from "./types";
import { PUBLIC_FETCHED_AT } from "./public-sources";

export interface Connector {
  id: string;
  name: string;
  dataType: DataType;
  description: string;
  cadence: string;
  connected: boolean;
  feeds: string[];
  // Where the data would come from once wired.
  integration: string;
  // When this source was last pulled (for public-sourced connectors).
  lastSyncAt?: string;
}

// NEXT_PUBLIC_* flags are readable on the client; presence flips a connector on.
// Defaults keep the app honest out of the box: only approved content is live.
function flag(name: string, fallback: boolean): boolean {
  const v = process.env[name];
  if (v === undefined || v === "") return fallback;
  return v === "true" || v === "1";
}

export const CONNECTORS: Connector[] = [
  {
    id: "approved-content",
    name: "Approved Content Store",
    dataType: "positioning",
    description:
      "Human-approved positioning, objections, rebuttals and feature gaps. Source of truth for anything a rep repeats to a prospect.",
    cadence: "On change",
    connected: flag("NEXT_PUBLIC_APPROVED_CONTENT_CONNECTED", true),
    feeds: ["Positioning", "Objections", "Rebuttals", "Feature gaps"],
    integration: "Notion / Google Docs / internal CMS",
  },
  {
    id: "crm",
    name: "CRM — Win/Loss",
    dataType: "winloss",
    description:
      "Closed-won and closed-lost opportunities with the competitor / lost_to field. Drives the entry ranking, win-rate, trend chart and deal counts.",
    cadence: "Nightly",
    connected: flag("NEXT_PUBLIC_CRM_CONNECTED", false),
    feeds: ["Entry ranking", "Win-rate %", "Win/loss trend", "Deal counts"],
    integration: "Salesforce / HubSpot",
  },
  {
    id: "pricing",
    name: "Competitor Pricing",
    dataType: "pricing",
    description:
      "Each competitor's public pricing. Drives the pricing counter and pricing feature rows.",
    cadence: "Weekly",
    connected: flag("NEXT_PUBLIC_PRICING_CONNECTED", true),
    feeds: ["Pricing counter", "Pricing rows"],
    integration: "Public pricing pages",
    lastSyncAt: PUBLIC_FETCHED_AT,
  },
  {
    id: "reviews",
    name: "Reviews & Analyst Sentiment",
    dataType: "positioning",
    description:
      "Ratings and recent review themes per competitor. Drives sentiment signals and feature-gap context.",
    cadence: "Weekly",
    connected: flag("NEXT_PUBLIC_REVIEWS_CONNECTED", true),
    feeds: ["Sentiment", "Feature-gap context"],
    integration: "G2 / Gartner Peer Insights",
    lastSyncAt: PUBLIC_FETCHED_AT,
  },
  {
    id: "news",
    name: "News / Product-change Feed",
    dataType: "news",
    description:
      "Recent intel with real dates from news and competitor changelogs.",
    cadence: "Daily",
    connected: flag("NEXT_PUBLIC_NEWS_CONNECTED", true),
    feeds: ["Recent intel feed"],
    integration: "Public news & changelogs",
    lastSyncAt: PUBLIC_FETCHED_AT,
  },
];

const BY_ID = new Map(CONNECTORS.map((c) => [c.id, c]));

export function getConnector(id: string): Connector | undefined {
  return BY_ID.get(id);
}

export function isConnected(id: string): boolean {
  return BY_ID.get(id)?.connected ?? false;
}

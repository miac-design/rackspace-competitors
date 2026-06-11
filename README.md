# Rackspace Competitive Intelligence Hub

Competitive intelligence for sales (in-the-moment battle cards) and product
(feature gaps and win/loss trends). Rebuilt around a real data layer where
**every fact on screen carries a source and a timestamp**, and the freshness
pill is computed from the real age of the underlying data — never hardcoded.

## Core principle

Nothing is shown without provenance. Stale intel is worse than none, so
staleness is visible and enforced. When a source isn't wired, the UI shows
**"source not connected"** instead of inventing data.

## Architecture

```
src/lib/data/
  types.ts        Domain entities + provenance + SourceResult wrappers
  freshness.ts    Per-type thresholds, status computation, worst-of roll-up
  connectors.ts   Source registry with connected flags (env-driven)
  seed.ts         Approved Content Store (Engine A) — provenance-tracked rows
  repository.ts   Single read path for the UI; gates not-connected sources

src/components/         FreshnessPill, SourceLine, NotConnected, FeatureGapTable, …
src/components/views/   EntryView (search), SalesView (glance→depth), ProductView
src/app/api/chat/       Engine B — grounded, always cited, guardrailed
supabase/migrations/    Postgres schema for the real-data path
```

## Freshness model

Pill color is computed from record age with per-type thresholds (pricing rots
faster than positioning):

| Data type | Green | Amber | Red |
|---|---|---|---|
| Pricing | ≤ 7d | 8–21d | > 21d |
| Win/loss (CRM) | ≤ 2d | 3–7d | > 7d |
| Positioning / objections | ≤ 30d | 31–60d | > 60d |
| News / intel | ≤ 3d | 4–10d | > 10d |

A card's overall pill shows the **worst** status across its inputs; clicking it
expands a per-source breakdown. Red sources surface a **Request refresh** action.

## Two content engines

- **Engine A — approved retrieval.** Positioning, objections, rebuttals and
  pricing counters come from the Approved Content Store. Every entry shows its
  approver and review date.
- **Engine B — on-demand synthesis** (`/api/chat`). Generates from approved
  content only, cites every claim inline, and refuses to disparage a competitor
  with anything not backed by a cited approved claim. With no `ANTHROPIC_API_KEY`
  it answers in grounded fallback mode (approved content, verbatim and cited).

## Connectors (Phase 1)

| Source | Status | Feeds |
|---|---|---|
| Approved Content Store | **Connected** | Positioning, objections, rebuttals, feature gaps |
| CRM (Salesforce / HubSpot) | Not connected | Ranking, win-rate, trend, deal counts |
| Competitor pricing | Not connected | Pricing counter, pricing rows |
| Reviews & sentiment (G2, Gartner) | Not connected | Sentiment, gap context |
| News / product-change feed | Not connected | Recent intel feed |

Flip a connector on by setting its env flag (see `.env.example`) once the source
is wired — a configuration change, not a code change.

## Adding / removing a competitor

A data change, not a code change: add a row to `COMPETITORS` in
`src/lib/data/seed.ts` (or the `competitors` table in Supabase).

## Develop

```
npm install
npm run dev
```

Copy `.env.example` to `.env.local` to configure Engine B and connectors.

## Deploy

Production deploys from `main` to <https://rackspace-competitors.vercel.app>.
The app runs with no environment configuration: Engine B falls back to cited
approved content, and connector defaults keep every unwired source flagged
"not connected".

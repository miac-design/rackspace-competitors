-- Competitive Intelligence Hub — schema (Phase 1)
-- Every fact-bearing table carries provenance: a source, an optional URL, and a
-- timestamp (fetched_at for system-pulled data, last_reviewed_at for approved
-- content). The freshness engine reads these timestamps.

create table if not exists competitors (
  id          text primary key,
  name        text not null,
  tier        text not null check (tier in ('hyperscaler','cloud-iaas','bare-metal-colo')),
  logo_url    text,
  color       text,
  active      boolean not null default true
);

create table if not exists claims (
  id               text primary key,
  competitor_id    text not null references competitors(id) on delete cascade,
  type             text not null check (type in ('position','objection','rebuttal','pricing','win','lose')),
  body             text not null,
  pair_id          text,
  source           text not null,
  source_url       text,
  last_reviewed_at timestamptz,
  approved_by      text
);
create index if not exists claims_competitor_idx on claims(competitor_id);

create table if not exists metrics (
  competitor_id text not null references competitors(id) on delete cascade,
  quarter       text not null,
  deals_won     integer not null default 0,
  deals_lost    integer not null default 0,
  source        text not null default 'CRM',
  fetched_at    timestamptz not null,
  primary key (competitor_id, quarter)
);

create table if not exists feature_gaps (
  competitor_id    text not null references competitors(id) on delete cascade,
  capability       text not null,
  rackspace_value  text,
  competitor_value text,
  status           text not null check (status in ('lead','par','gap')),
  rackspace_score  numeric,
  competitor_score numeric,
  source           text not null,
  source_url       text,
  last_reviewed_at timestamptz,
  approved_by      text,
  primary key (competitor_id, capability)
);

create table if not exists intel_events (
  id            bigint generated always as identity primary key,
  competitor_id text not null references competitors(id) on delete cascade,
  date          date not null,
  headline      text not null,
  source_url    text,
  source        text not null,
  fetched_at    timestamptz not null
);
create index if not exists intel_events_competitor_idx on intel_events(competitor_id);

create table if not exists pricing_snapshots (
  id            bigint generated always as identity primary key,
  competitor_id text not null references competitors(id) on delete cascade,
  plan          text not null,
  price         text not null,
  source_url    text,
  source        text not null,
  fetched_at    timestamptz not null
);
create index if not exists pricing_snapshots_competitor_idx on pricing_snapshots(competitor_id);

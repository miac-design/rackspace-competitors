// Seed for the Approved Content Store (Engine A).
//
// In production these rows live in Supabase, populated from the approved
// content store (Notion / CMS). They are seeded here so the connected source
// has real, provenance-tracked content: every entry carries an approver and a
// last_reviewed_at, and the freshness engine computes age from those dates.
//
// Adding or removing a competitor is a data change here (or a DB row), never a
// component change.

import {
  Competitor,
  Claim,
  FeatureGap,
  GapStatus,
} from "./types";

const APPROVED_SOURCE = "Approved Content Store";

// Reviewers who own approved content.
const OWNERS = {
  intel: "Dana Reyes · Competitive Intelligence",
  pmm: "Marcus Hale · Product Marketing",
  enablement: "Priya Nair · Sales Enablement",
};

// Review dates are real timestamps; the freshness engine derives age from them.
// Spread chosen so the per-type thresholds produce a green/amber/red mix.
const REVIEWED = {
  fresh: "2026-05-28T00:00:00Z", // ~14d  -> green
  recent: "2026-05-12T00:00:00Z", // ~30d -> green (edge)
  aging: "2026-04-22T00:00:00Z", // ~50d  -> amber
  stale: "2026-03-30T00:00:00Z", // ~73d  -> red
};

export const COMPETITORS: Competitor[] = [
  { id: "vultr", slug: "vultr", name: "Vultr", tier: "cloud-iaas", logoUrl: "https://cdn.simpleicons.org/vultr/007BFC", color: "#007BFC", active: true },
  { id: "ovhcloud", slug: "ovhcloud", name: "OVHcloud", tier: "cloud-iaas", logoUrl: "https://cdn.simpleicons.org/ovh/123F6D", color: "#123F6D", active: true },
  { id: "digitalocean", slug: "digitalocean", name: "DigitalOcean", tier: "cloud-iaas", logoUrl: "https://cdn.simpleicons.org/digitalocean/0080FF", color: "#0080FF", active: true },
  { id: "linode", slug: "linode", name: "Linode (Akamai)", tier: "cloud-iaas", logoUrl: "https://cdn.simpleicons.org/linode/00A95C", color: "#00A95C", active: true },
  { id: "hetzner", slug: "hetzner", name: "Hetzner", tier: "bare-metal-colo", logoUrl: "https://cdn.simpleicons.org/hetzner/D50C2D", color: "#D50C2D", active: true },
  { id: "equinix", slug: "equinix", name: "Equinix Metal", tier: "bare-metal-colo", logoUrl: "https://cdn.simpleicons.org/equinixmetal/ED2224", color: "#ED2224", active: true },
  { id: "aws", slug: "aws", name: "AWS", tier: "hyperscaler", logoUrl: "https://cdn.simpleicons.org/amazonwebservices/FF9900", color: "#FF9900", active: true },
  { id: "gcp", slug: "gcp", name: "Google Cloud", tier: "hyperscaler", logoUrl: "https://cdn.simpleicons.org/googlecloud/4285F4", color: "#4285F4", active: true },
];

// Compact authored source for the approved content. Normalised into Claim and
// FeatureGap rows below.
interface AuthoredContent {
  slug: string;
  owner: string;
  reviewedAt: string;
  position: string;
  // Optional per-objection review override (to surface amber/red staleness).
  objections: { q: string; a: string; reviewedAt?: string }[];
  pricingCounter: string;
  dims: [label: string, rackspace: number, competitor: number][];
}

const CONTENT: AuthoredContent[] = [
  {
    slug: "vultr",
    owner: OWNERS.intel,
    reviewedAt: REVIEWED.fresh,
    position:
      "Rackspace wins on managed services, 24/7 support and compliance. Vultr wins on raw price and developer simplicity — so for enterprise and regulated workloads, lead with Fanatical Experience™, not price.",
    objections: [
      {
        q: "Vultr is much cheaper than Rackspace.",
        a: "Vultr's headline price is raw, unmanaged infrastructure. Factor in cloud engineers (~$150K/yr each), 24/7 on-call, security monitoring and compliance and Rackspace's managed services deliver lower total cost of ownership. Ask: what's your current OpEx for running infrastructure in-house?",
      },
      {
        q: "We don't need managed services — our team can handle it.",
        a: "Great for day-to-day, but what about scaling during growth, a 3 AM security incident, or staying compliant through an audit? Rackspace augments your team so they focus on product, not patching.",
        reviewedAt: REVIEWED.stale, // demonstrates a red/stale objection
      },
      {
        q: "Vultr has more data center locations.",
        a: "Rackspace data centers are enterprise-grade and carry the compliance certifications you need, and we manage workloads across AWS, Azure and GCP — giving access to 100+ regions through multi-cloud expertise.",
      },
    ],
    pricingCounter:
      "Vultr is ~30-50% cheaper on raw compute — that's their pitch. Reframe to TCO: 2-3 FTEs for 24/7 coverage is $300-450K/yr before tooling, compliance auditing and incident management, all included with Rackspace.",
    dims: [
      ["Managed Services", 10, 2],
      ["Enterprise Support", 10, 3],
      ["Compliance", 9, 4],
      ["Multi-Cloud", 9, 2],
      ["Pricing", 5, 9],
      ["Global Reach", 8, 7],
    ],
  },
  {
    slug: "ovhcloud",
    owner: OWNERS.intel,
    reviewedAt: REVIEWED.recent,
    position:
      "Rackspace leads on managed services, US compliance (FedRAMP) and multi-cloud. OVHcloud leads on bare-metal price and EU sovereignty. For US enterprise workloads needing operational support, Rackspace wins.",
    objections: [
      {
        q: "OVHcloud is significantly cheaper, especially for bare metal.",
        a: "OVHcloud manufactures its own hardware, so raw infrastructure is cheap — but that's only 30-40% of total cloud spend. Add 24/7 operations, security and compliance management and Rackspace's managed approach delivers better TCO.",
      },
      {
        q: "OVHcloud gives us EU data sovereignty.",
        a: "Rackspace also operates EU data centers and supports sovereignty requirements, plus managed compliance that goes beyond data location — ongoing monitoring, audit support and regulatory guidance. For US workloads our FedRAMP authorization is something OVHcloud can't match.",
        reviewedAt: REVIEWED.aging, // amber
      },
    ],
    pricingCounter:
      "OVHcloud is very competitive on bare metal (up to 40-60% cheaper) because they own manufacturing. Rackspace pricing includes operational management; OVHcloud's is infrastructure-only with management costs hidden in your staffing line.",
    dims: [
      ["Managed Services", 10, 4],
      ["Enterprise Support", 10, 5],
      ["Compliance", 9, 7],
      ["Multi-Cloud", 9, 3],
      ["Pricing", 5, 9],
      ["Data Sovereignty", 7, 9],
    ],
  },
  {
    slug: "digitalocean",
    owner: OWNERS.pmm,
    reviewedAt: REVIEWED.fresh,
    position:
      "Rackspace excels at managed services and enterprise needs; DigitalOcean dominates developer experience and simplicity. Target DigitalOcean customers outgrowing self-service.",
    objections: [
      {
        q: "DigitalOcean is simpler and our developers love it.",
        a: "DigitalOcean is excellent for simple workloads. As you scale into compliance, multi-cloud and 24/7 operations you need a managed partner — Rackspace makes that transition seamless with a migration services team.",
      },
      {
        q: "DigitalOcean's pricing is predictable and low.",
        a: "Predictable infrastructure pricing still leaves you owning operations, security and compliance. Rackspace folds those into one managed relationship so your team ships product instead of running infrastructure.",
      },
    ],
    pricingCounter:
      "DigitalOcean wins on simple, low headline pricing for SMB. Position Rackspace for teams that have outgrown self-service and now carry compliance, security and uptime obligations DigitalOcean leaves to the customer.",
    dims: [
      ["Managed Services", 10, 4],
      ["Enterprise Support", 10, 4],
      ["Compliance", 9, 5],
      ["Multi-Cloud", 9, 2],
      ["Developer Experience", 6, 9],
      ["SMB Friendliness", 6, 9],
    ],
  },
  {
    slug: "linode",
    owner: OWNERS.intel,
    reviewedAt: REVIEWED.recent,
    position:
      "Rackspace wins on managed services and compliance depth; Linode/Akamai wins on edge and CDN. Target customers needing managed operations, not just infrastructure plus edge.",
    objections: [
      {
        q: "Akamai's edge and CDN network is unmatched.",
        a: "Agreed on edge — but most workloads need managed operations, compliance and multi-cloud first. Rackspace delivers those and integrates with leading CDNs, so you're not buying a CDN to get managed services.",
      },
      {
        q: "Linode is cheaper and our team already uses it.",
        a: "Post-Akamai acquisition many Linode customers want managed services the platform doesn't provide. Rackspace adds 24/7 operations, compliance and multi-cloud on top, without forcing a migration away from what works.",
      },
    ],
    pricingCounter:
      "Linode retains competitive infrastructure pricing from its independent era. Sell the managed operations and compliance layer — the value is in who runs it at 3 AM, not the sticker price.",
    dims: [
      ["Managed Services", 10, 3],
      ["Enterprise Support", 10, 5],
      ["Compliance", 9, 5],
      ["Multi-Cloud", 9, 4],
      ["Global Reach", 8, 8],
      ["Edge / CDN", 6, 9],
    ],
  },
  {
    slug: "hetzner",
    owner: OWNERS.enablement,
    reviewedAt: REVIEWED.fresh,
    position:
      "Rackspace wins decisively on managed services, compliance and global reach. Hetzner wins massively on price. Never compete with Hetzner on price — sell the managed services story.",
    objections: [
      {
        q: "Hetzner is 60-80% cheaper on equivalent specs.",
        a: "True, and that's fine — Hetzner sells unmanaged servers in the EU. Rackspace sells managed outcomes: 24/7 operations, compliance certifications (FedRAMP, HIPAA, PCI) and global reach. Different buyers, different problem.",
      },
      {
        q: "We've been running fine on Hetzner ourselves.",
        a: "Until you need compliance for a new market, a 24/7 on-call rotation, or you hit an incident with no support to call. Rackspace is for teams that have outgrown self-managing or can't carry that operational risk.",
      },
    ],
    pricingCounter:
      "Hetzner is the price floor — do not anchor on it. Reframe entirely to managed services, compliance and global operations, which Hetzner does not offer at any price.",
    dims: [
      ["Managed Services", 10, 2],
      ["Enterprise Support", 10, 3],
      ["Compliance", 9, 4],
      ["Multi-Cloud", 9, 1],
      ["Pricing", 4, 10],
      ["Bare Metal", 8, 8],
    ],
  },
  {
    slug: "equinix",
    owner: OWNERS.intel,
    reviewedAt: REVIEWED.aging,
    position:
      "Different strengths: Rackspace for managed cloud operations, Equinix for colocation and interconnection. Often complementary — sell the managed layer on top of, or instead of, colo.",
    objections: [
      {
        q: "Equinix has 260+ data centers and unmatched interconnection.",
        a: "Equinix Fabric is industry-leading for colo and peering — Rackspace can sit on top of it. What Equinix doesn't provide is full managed cloud operations, OS-level support and multi-cloud management, which is where Rackspace adds value.",
      },
      {
        q: "Equinix Metal is competitive on bare metal as a service.",
        a: "Equinix Metal is strong infrastructure, but still self-managed. Rackspace delivers managed bare metal plus migration and modernization expertise to move from colo to managed cloud when that's the goal.",
      },
    ],
    pricingCounter:
      "Equinix competes on footprint and interconnection, not managed services. Position Rackspace as the managed operations partner — potentially alongside Equinix colo rather than against it.",
    dims: [
      ["Managed Services", 10, 5],
      ["Enterprise Support", 9, 7],
      ["Compliance", 9, 8],
      ["Cloud Services", 9, 5],
      ["Colocation", 6, 10],
      ["Interconnection", 6, 10],
    ],
  },
  {
    slug: "aws",
    owner: OWNERS.pmm,
    reviewedAt: REVIEWED.recent,
    position:
      "Position Rackspace as the expert layer ON TOP of AWS. We don't replace AWS — we make it manageable, cost-optimized and operationally excellent as a certified AWS partner.",
    objections: [
      {
        q: "AWS has the broadest service catalog — why add Rackspace?",
        a: "Exactly why customers need help. Rackspace manages AWS for you: cost optimization (typically 20-40% savings), dedicated human support and multi-cloud flexibility so you're not locked in. We add expertise on top of AWS, not a competing cloud.",
      },
      {
        q: "We'd rather have a direct relationship with AWS.",
        a: "You keep it — Rackspace operates inside your AWS as a partner. The difference is named engineers, faster human support than tiered AWS plans, and ongoing cost optimization most AWS customers leave on the table (30%+ overspend is common).",
      },
    ],
    pricingCounter:
      "Don't position against AWS pricing — position on AWS spend management. Rackspace's cost optimization typically saves 20-40% of the AWS bill, often paying for the managed service itself.",
    dims: [
      ["Managed Services", 9, 7],
      ["Personal Support", 10, 5],
      ["Compliance", 9, 10],
      ["Service Breadth", 6, 10],
      ["Cost Optimization", 8, 5],
      ["Multi-Cloud", 9, 3],
    ],
  },
  {
    slug: "gcp",
    owner: OWNERS.pmm,
    reviewedAt: REVIEWED.recent,
    position:
      "Rackspace wins on managed support and multi-cloud; Google Cloud wins on AI/ML and data analytics. Position Rackspace as the operational partner that makes GCP enterprise-ready.",
    objections: [
      {
        q: "Google Cloud leads on AI/ML and analytics.",
        a: "It does — Rackspace helps you run GCP well, not replace BigQuery or Vertex AI. We add the dedicated human support Google is known for lacking, plus multi-cloud management across GCP, AWS and Azure.",
      },
      {
        q: "Why not go direct to Google Cloud?",
        a: "Google's enterprise support is a frequent pain point. Rackspace provides named engineers, managed operations and compliance consulting on top of GCP, so you get Google's platform with the operational partner it doesn't provide.",
      },
    ],
    pricingCounter:
      "GCP's sustained-use discounts are attractive — don't fight them. Sell managed operations and support quality, where Google is weakest, as the reason to run GCP through Rackspace.",
    dims: [
      ["Managed Services", 9, 7],
      ["Personal Support", 10, 5],
      ["Compliance", 9, 9],
      ["AI / ML Capability", 5, 10],
      ["Multi-Cloud", 9, 4],
      ["Ease of Management", 8, 5],
    ],
  },
];

// ---- Normalisation: authored content -> Claim and FeatureGap rows ----

function gapStatus(rackspace: number, competitor: number): GapStatus {
  const diff = rackspace - competitor;
  if (diff >= 2) return "lead";
  if (diff <= -2) return "gap";
  return "par";
}

function scoreLabel(score: number): string {
  if (score >= 8) return "Strong";
  if (score >= 6) return "Good";
  if (score >= 4) return "Limited";
  return "Minimal";
}

const claims: Claim[] = [];
const featureGaps: FeatureGap[] = [];

for (const c of CONTENT) {
  const base = {
    source: APPROVED_SOURCE,
    approvedBy: c.owner,
  };

  claims.push({
    id: `${c.slug}-position`,
    competitorId: c.slug,
    type: "position",
    body: c.position,
    lastReviewedAt: c.reviewedAt,
    ...base,
  });

  c.objections.forEach((o, i) => {
    const pairId = `${c.slug}-obj-${i}`;
    const reviewedAt = o.reviewedAt ?? c.reviewedAt;
    claims.push({
      id: `${pairId}-q`,
      competitorId: c.slug,
      type: "objection",
      body: o.q,
      pairId,
      lastReviewedAt: reviewedAt,
      ...base,
    });
    claims.push({
      id: `${pairId}-a`,
      competitorId: c.slug,
      type: "rebuttal",
      body: o.a,
      pairId,
      lastReviewedAt: reviewedAt,
      ...base,
    });
  });

  claims.push({
    id: `${c.slug}-pricing`,
    competitorId: c.slug,
    type: "pricing",
    body: c.pricingCounter,
    lastReviewedAt: c.reviewedAt,
    ...base,
  });

  for (const [label, r, comp] of c.dims) {
    featureGaps.push({
      competitorId: c.slug,
      capability: label,
      rackspaceValue: scoreLabel(r),
      competitorValue: scoreLabel(comp),
      status: gapStatus(r, comp),
      rackspaceScore: r,
      competitorScore: comp,
      source: APPROVED_SOURCE,
      approvedBy: c.owner,
      lastReviewedAt: c.reviewedAt,
    });
  }
}

export const CLAIMS: Claim[] = claims;
export const FEATURE_GAPS: FeatureGap[] = featureGaps;

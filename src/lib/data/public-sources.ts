// Public-sourced data: competitor pricing, review/analyst sentiment, and news.
//
// Pulled from public sources on PUBLIC_FETCHED_AT. Each row carries its real
// source URL and a fetched_at — the freshness engine ages from these, so a
// price or headline will drift green -> amber -> red if it isn't re-pulled.
// Fields that could not be verified from a public source are simply omitted
// (e.g. Equinix Metal publishes no public pricing), never invented.

import { PricingSnapshot, Review, IntelEvent } from "./types";

// The date this batch was pulled from public sources.
export const PUBLIC_FETCHED_AT = "2026-06-11T12:00:00Z";

export const PRICING_SNAPSHOTS: PricingSnapshot[] = [
  { competitorId: "vultr", plan: "Cloud Compute — Regular Performance (1 GB)", price: "$5/mo", source: "Vultr pricing page", sourceUrl: "https://www.vultr.com/pricing/", fetchedAt: PUBLIC_FETCHED_AT },
  { competitorId: "ovhcloud", plan: "VPS (entry tier)", price: "$4.20/mo", source: "OVHcloud pricing page", sourceUrl: "https://us.ovhcloud.com/vps/", fetchedAt: PUBLIC_FETCHED_AT },
  { competitorId: "digitalocean", plan: "Basic Droplet (Shared CPU, 512 MB)", price: "$4/mo", source: "DigitalOcean pricing page", sourceUrl: "https://www.digitalocean.com/pricing/droplets", fetchedAt: PUBLIC_FETCHED_AT },
  { competitorId: "linode", plan: "Nanode 1 GB (Shared CPU)", price: "$5/mo", source: "Akamai Cloud docs", sourceUrl: "https://techdocs.akamai.com/cloud-computing/docs/shared-cpu-compute-instances", fetchedAt: PUBLIC_FETCHED_AT },
  { competitorId: "hetzner", plan: "CX22 (Shared vCPU, 2 vCPU / 4 GB)", price: "€3.79/mo", source: "Hetzner Cloud pricing", sourceUrl: "https://www.hetzner.com/cloud/", fetchedAt: PUBLIC_FETCHED_AT },
  // Equinix Metal publishes no public pricing (console-only) — intentionally omitted.
  { competitorId: "aws", plan: "EC2 t4g.nano (On-Demand, us-east-1)", price: "$0.0042/hr", source: "AWS EC2 On-Demand pricing", sourceUrl: "https://aws.amazon.com/ec2/pricing/on-demand/", fetchedAt: PUBLIC_FETCHED_AT },
  { competitorId: "gcp", plan: "Compute Engine e2-micro (On-Demand, us-central1)", price: "$0.0084/hr", source: "Google Cloud VM pricing", sourceUrl: "https://cloud.google.com/compute/vm-instance-pricing", fetchedAt: PUBLIC_FETCHED_AT },
];

export const REVIEWS: Review[] = [
  { competitorId: "vultr", provider: "G2", rating: 4.3, reviewCount: 286, source: "G2", sourceUrl: "https://www.g2.com/products/vultr/reviews", fetchedAt: PUBLIC_FETCHED_AT },
  { competitorId: "ovhcloud", provider: "Gartner Peer Insights", rating: 4.1, source: "Gartner Peer Insights", sourceUrl: "https://www.gartner.com/reviews/market/strategic-cloud-platform-services/vendor/ovhcloud/product/ovhcloud-public-cloud", fetchedAt: PUBLIC_FETCHED_AT },
  { competitorId: "digitalocean", provider: "Gartner Peer Insights", rating: 4.9, source: "Gartner Peer Insights", sourceUrl: "https://www.gartner.com/reviews/market/cloud-application-platforms/vendor/digitalocean", fetchedAt: PUBLIC_FETCHED_AT },
  { competitorId: "linode", provider: "G2", rating: 4.6, reviewCount: 428, source: "G2", sourceUrl: "https://www.g2.com/products/linode/reviews", fetchedAt: PUBLIC_FETCHED_AT },
  { competitorId: "aws", provider: "G2", rating: 4.6, reviewCount: 1174, source: "G2", sourceUrl: "https://www.g2.com/products/amazon-ec2/reviews", fetchedAt: PUBLIC_FETCHED_AT },
  { competitorId: "aws", provider: "Gartner Peer Insights", rating: 4.6, source: "Gartner Peer Insights", sourceUrl: "https://www.gartner.com/reviews/market/strategic-cloud-platform-services/vendor/amazon-web-services/product/amazon-web-services", fetchedAt: PUBLIC_FETCHED_AT },
  { competitorId: "gcp", provider: "Gartner Peer Insights", rating: 4.6, source: "Gartner Peer Insights", sourceUrl: "https://www.gartner.com/reviews/market/strategic-cloud-platform-services/vendor/google/product/google-cloud-platform", fetchedAt: PUBLIC_FETCHED_AT },
  // Hetzner, DigitalOcean(G2), Equinix Metal: no clean public rating surfaced — omitted.
];

export const INTEL_EVENTS: IntelEvent[] = [
  { competitorId: "vultr", date: "2026-05-19", headline: "Vultr expands European footprint with 33rd cloud data center region in Milan, Italy", source: "Business Wire", sourceUrl: "https://www.businesswire.com/news/home/20260519366885/en/Vultr-Expands-European-Footprint-with-33rd-Cloud-Data-Center-Region-in-Milan-Italy", fetchedAt: PUBLIC_FETCHED_AT },
  { competitorId: "ovhcloud", date: "2026-01-01", headline: "OVHcloud reveals Bare Metal 2026 generation of dedicated servers", source: "Data Center Dynamics", sourceUrl: "https://www.datacenterdynamics.com/en/news/ovhcloud-reveals-bare-metal-2026-generation-of-dedicated-servers/", fetchedAt: PUBLIC_FETCHED_AT },
  { competitorId: "digitalocean", date: "2026-04-28", headline: "DigitalOcean launches Inference Engine with new capabilities for production AI", source: "Business Wire", sourceUrl: "https://www.businesswire.com/news/home/20260428279648/en/DigitalOcean-Launches-Inference-Engine-with-New-Capabilities-for-Production-AI-Including-Inference-Router-for-Efficient-Scaling-of-Agentic-Workloads", fetchedAt: PUBLIC_FETCHED_AT },
  { competitorId: "linode", date: "2025-10-01", headline: "Akamai launches Inference Cloud, a distributed AI inference platform on Akamai Cloud (Linode)", source: "Akamai", sourceUrl: "https://www.akamai.com/blog/news/akamai-and-linode", fetchedAt: PUBLIC_FETCHED_AT },
  { competitorId: "hetzner", date: "2026-06-10", headline: "Hetzner launches new dedicated servers powered by Dell enterprise hardware", source: "Hetzner Pressroom", sourceUrl: "https://www.hetzner.com/pressroom/neue-enterprise-hardware-von-dell-2026/", fetchedAt: PUBLIC_FETCHED_AT },
  { competitorId: "equinix", date: "2026-06-30", headline: "Equinix to retire Equinix Metal by June 2026", source: "Data Center Dynamics", sourceUrl: "https://www.datacenterdynamics.com/en/news/equinix-to-kill-off-metal-by-june-2026/", fetchedAt: PUBLIC_FETCHED_AT },
  { competitorId: "aws", date: "2026-01-15", headline: "AWS European Sovereign Cloud is now generally available", source: "AWS News Blog", sourceUrl: "https://aws.amazon.com/blogs/aws/opening-the-aws-european-sovereign-cloud/", fetchedAt: PUBLIC_FETCHED_AT },
  { competitorId: "gcp", date: "2026-04-22", headline: "Highlights from Google Cloud Next '26 (Gemini Enterprise Agent Platform, 8th-gen TPUs)", source: "Google Blog", sourceUrl: "https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/google-cloud-next-26-recap/", fetchedAt: PUBLIC_FETCHED_AT },
];

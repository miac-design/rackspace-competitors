import { Competitor } from "@/types";

export const COMPETITORS: Competitor[] = [
  {
    slug: "vultr",
    name: "Vultr",
    logoUrl: "https://cdn.simpleicons.org/vultr/007BFC",
    color: "#007BFC",
  },
  {
    slug: "ovhcloud",
    name: "OVHcloud",
    logoUrl: "https://cdn.simpleicons.org/ovh/123F6D",
    color: "#123F6D",
  },
  {
    slug: "digitalocean",
    name: "DigitalOcean",
    logoUrl: "https://cdn.simpleicons.org/digitalocean/0080FF",
    color: "#0080FF",
  },
  {
    slug: "linode",
    name: "Linode (Akamai)",
    logoUrl: "https://cdn.simpleicons.org/linode/00A95C",
    color: "#00A95C",
  },
  {
    slug: "hetzner",
    name: "Hetzner",
    logoUrl: "https://cdn.simpleicons.org/hetzner/D50C2D",
    color: "#D50C2D",
  },
  {
    slug: "aws",
    name: "AWS",
    logoUrl: "https://cdn.simpleicons.org/amazonaws/232F3E",
    color: "#FF9900",
  },
  {
    slug: "gcp",
    name: "Google Cloud",
    logoUrl: "https://cdn.simpleicons.org/googlecloud/4285F4",
    color: "#4285F4",
  },
  {
    slug: "equinix",
    name: "Equinix Metal",
    logoUrl: "https://cdn.simpleicons.org/equinixmetal/ED2224",
    color: "#ED2224",
  },
];

export function getCompetitorBySlug(slug: string): Competitor | undefined {
  return COMPETITORS.find((c) => c.slug === slug);
}

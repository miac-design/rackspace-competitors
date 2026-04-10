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
  {
    slug: "azure",
    name: "Microsoft Azure",
    logoUrl: "https://cdn.simpleicons.org/microsoftazure/0078D4",
    color: "#0078D4",
  },
  {
    slug: "ibmcloud",
    name: "IBM Cloud",
    logoUrl: "https://cdn.simpleicons.org/ibmcloud/1261FE",
    color: "#1261FE",
  },
  {
    slug: "oci",
    name: "Oracle Cloud (OCI)",
    logoUrl: "https://cdn.simpleicons.org/oracle/F80000",
    color: "#F80000",
  },
  {
    slug: "cloudflare",
    name: "Cloudflare",
    logoUrl: "https://cdn.simpleicons.org/cloudflare/F38020",
    color: "#F38020",
  },
  {
    slug: "leaseweb",
    name: "Leaseweb",
    logoUrl: "https://cdn.simpleicons.org/leaseweb/E22D30",
    color: "#E22D30",
  },
];

export function getCompetitorBySlug(slug: string): Competitor | undefined {
  return COMPETITORS.find((c) => c.slug === slug);
}

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
];

export function getCompetitorBySlug(slug: string): Competitor | undefined {
  return COMPETITORS.find((c) => c.slug === slug);
}

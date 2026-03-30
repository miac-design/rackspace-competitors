import { Competitor } from "@/types";

export const COMPETITORS: Competitor[] = [
  {
    slug: "vultr",
    name: "Vultr",
    logoUrl: "https://cdn.simpleicons.org/vultr/007BFC",
    color: "#007BFC",
  },
];

export function getCompetitorBySlug(slug: string): Competitor | undefined {
  return COMPETITORS.find((c) => c.slug === slug);
}

import { OutputTypeOption } from "@/types";

export const OUTPUT_TYPES: OutputTypeOption[] = [
  {
    slug: "full",
    name: "Full Battle Card",
    description: "Complete competitive analysis with all sections",
  },
  {
    slug: "comparison",
    name: "Feature Comparison",
    description: "Head-to-head feature comparison table",
  },
  {
    slug: "strengths",
    name: "Rackspace Strengths",
    description: "Key advantages to emphasize in the deal",
  },
  {
    slug: "weaknesses",
    name: "Competitor Weaknesses",
    description: "Competitor gaps and vulnerabilities to exploit",
  },
  {
    slug: "objections",
    name: "Objection Handling",
    description: "Common objections and recommended responses",
  },
  {
    slug: "pricing",
    name: "Pricing Positioning",
    description: "How to position Rackspace pricing vs competitor",
  },
];

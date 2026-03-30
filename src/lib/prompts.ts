import { getCompetitorBySlug } from "./competitors";
import { SERVICE_AREAS } from "./service-areas";
import { OutputType, ChatMessage } from "@/types";

export const SYSTEM_PROMPT = `You are a Rackspace Technology competitive intelligence analyst helping sales representatives win deals. You have deep expertise in cloud infrastructure, managed services, and the competitive landscape.

Your role:
- Always position Rackspace favorably while being factually accurate
- Reference specific Rackspace products and services by name (Rackspace Kubernetes, Rackspace Private Cloud, Fanatical Support, etc.)
- Reference specific competitor products and services by name
- Provide actionable intelligence that a sales rep can use immediately in a customer conversation
- Cite publicly available sources when making specific claims
- Use markdown formatting with headers, tables, and bullet points for clarity

Rackspace key differentiators to weave in where relevant:
- Fanatical Experience\u2122 \u2014 24/7/365 expert support with dedicated account teams
- Multi-cloud expertise across AWS, Azure, GCP, and private cloud
- Managed services with deep operational expertise (not just reselling)
- Strong compliance certifications (SOC 1/2/3, PCI DSS, HIPAA, FedRAMP)
- 25+ years of hosting and cloud experience
- Bare metal and private cloud options for performance-sensitive workloads
- Professional and managed services for Kubernetes, databases, and security
- Global data center footprint

Important guidelines:
- Be specific and concrete \u2014 avoid vague marketing language
- Include real product names, pricing tiers, and service levels where known
- Acknowledge competitor strengths honestly, then pivot to Rackspace advantages
- Format output cleanly with markdown headers (##), tables, and bullet points
- When discussing pricing, note that Rackspace managed services are an investment in operational excellence, not just infrastructure cost`;

export function buildStructuredPrompt(
  competitorSlugs: string[],
  serviceAreaSlugs: string[],
  outputType: OutputType,
  context?: string
): string {
  const competitors = competitorSlugs
    .map(getCompetitorBySlug)
    .filter(Boolean)
    .map((c) => c!.name);
  const serviceAreas = serviceAreaSlugs
    .map((slug) => SERVICE_AREAS.find((s) => s.slug === slug)?.name)
    .filter(Boolean);

  const competitorList = competitors.join(", ");
  const serviceAreaList = serviceAreas.join(", ");

  const sections: Record<OutputType, string> = {
    full: `Provide a complete competitive battle card with ALL of the following sections:

## Head-to-Head Feature Comparison
A markdown table comparing Rackspace vs each competitor across key capabilities in the selected service areas.

## Rackspace Strengths to Emphasize
Bullet points of specific advantages Rackspace has over these competitors.

## Competitor Weaknesses to Exploit
Specific gaps, limitations, or known pain points for each competitor.

## Objection Handling
Common objections a prospect might raise about choosing Rackspace over these competitors, with recommended responses.

## Pricing Positioning
How to position Rackspace pricing relative to each competitor, including value propositions that justify any premium.`,

    comparison: `Provide a detailed markdown table comparing Rackspace vs each competitor (${competitorList}) across key capabilities in ${serviceAreaList}. Include specific product names, service tiers, and feature availability (\u2705/\u274c/\u26a0\ufe0f partial).`,

    strengths: `List the specific strengths and advantages Rackspace has over ${competitorList} in ${serviceAreaList}. For each strength, explain why it matters to the customer and how to articulate it in a sales conversation.`,

    weaknesses: `Identify specific weaknesses, gaps, and known pain points for ${competitorList} in ${serviceAreaList}. For each weakness, suggest how a Rackspace rep can tactfully raise this in conversation.`,

    objections: `List the most common objections a prospect might raise about choosing Rackspace over ${competitorList} for ${serviceAreaList}. For each objection, provide:
- The objection as the customer would phrase it
- Why the customer thinks this
- The recommended response
- Supporting evidence or proof points`,

    pricing: `Provide pricing positioning guidance for Rackspace vs ${competitorList} in ${serviceAreaList}. Include:
- General pricing comparison (who is cheaper/more expensive and why)
- Value propositions that justify Rackspace pricing
- TCO arguments (total cost of ownership including operational costs)
- Specific pricing levers or discounting strategies`,
  };

  let prompt = `Generate competitive intelligence for a Rackspace sales rep.

**Competitors:** ${competitorList}
**Service Areas:** ${serviceAreaList}

${sections[outputType]}`;

  if (context) {
    prompt += `\n\n**Additional Deal Context:** ${context}`;
  }

  return prompt;
}

export function buildChatMessages(
  message: string,
  history: ChatMessage[]
): { role: "user" | "assistant"; content: string }[] {
  const messages = history.map((msg) => ({
    role: msg.role as "user" | "assistant",
    content: msg.content,
  }));
  messages.push({ role: "user", content: message });
  return messages;
}

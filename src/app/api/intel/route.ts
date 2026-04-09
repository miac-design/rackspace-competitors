import { IntelRequest } from "@/types";
import { getPrebuiltBattleCard, getChatResponse } from "@/lib/intel-content";

let anthropicAvailable = false;
let anthropic: import("@anthropic-ai/sdk").default | null = null;

// Try to initialize Anthropic client - if no API key, we'll use pre-built content
try {
  if (process.env.ANTHROPIC_API_KEY) {
    // Dynamic import to avoid build errors if key is missing
    const Anthropic = require("@anthropic-ai/sdk").default;
    anthropic = new Anthropic();
    anthropicAvailable = true;
  }
} catch {
  anthropicAvailable = false;
}

const SYSTEM_PROMPT = `You are a Rackspace Technology competitive intelligence analyst helping sales representatives win deals. You have deep expertise in cloud infrastructure, managed services, and the competitive landscape.

Your role:
- Always position Rackspace favorably while being factually accurate
- Reference specific Rackspace products and services by name
- Provide actionable intelligence for sales conversations
- Use markdown formatting with headers, tables, and bullet points for clarity

Rackspace key differentiators:
- Fanatical Experience™ — 24/7/365 expert support with dedicated account teams
- Multi-cloud expertise across AWS, Azure, GCP, and private cloud
- Managed services with deep operational expertise
- Strong compliance certifications (SOC 1/2/3, PCI DSS, HIPAA, FedRAMP)
- 25+ years of hosting and cloud experience
- Bare metal and private cloud options
- Professional and managed services for Kubernetes, databases, and security
- Global data center footprint

NEVER use emoji icons or Unicode symbols (no ✅, ❌, ⚠️, ✓, ✗, etc.). Use plain text: "Yes", "No", "Partial", "Limited", "N/A".`;

function streamText(text: string): Response {
  const encoder = new TextEncoder();
  let index = 0;
  const chunkSize = 15;

  const readable = new ReadableStream({
    pull(controller) {
      if (index < text.length) {
        const chunk = text.slice(index, index + chunkSize);
        controller.enqueue(encoder.encode(chunk));
        index += chunkSize;
      } else {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}

export async function POST(request: Request) {
  try {
    const body: IntelRequest = await request.json();

    // Try Claude API first if available
    if (anthropicAvailable && anthropic) {
      try {
        const { SYSTEM_PROMPT: sysPrompt, buildStructuredPrompt, buildChatMessages } = await import("@/lib/prompts");

        let messages: { role: "user" | "assistant"; content: string }[];

        if (body.mode === "chat") {
          messages = buildChatMessages(body.message, body.history);
        } else {
          messages = [{
            role: "user",
            content: buildStructuredPrompt(body.competitors, body.serviceAreas, body.outputType, body.context),
          }];
        }

        const stream = anthropic.messages.stream({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4096,
          system: sysPrompt,
          messages,
        });

        const encoder = new TextEncoder();
        const readable = new ReadableStream({
          async start(controller) {
            try {
              for await (const event of stream) {
                if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
                  controller.enqueue(encoder.encode(event.delta.text));
                }
              }
              controller.close();
            } catch {
              controller.error(new Error("Stream failed"));
            }
          },
        });

        return new Response(readable, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Transfer-Encoding": "chunked",
          },
        });
      } catch {
        // API call failed, fall through to pre-built content
      }
    }

    // Fallback: use pre-built competitive intelligence content
    if (body.mode === "chat") {
      const content = getChatResponse(body.message);
      return streamText(content);
    } else {
      const content = getPrebuiltBattleCard(body.competitors, body.outputType);
      return streamText(content);
    }
  } catch (error) {
    console.error("Intel API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate intelligence" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

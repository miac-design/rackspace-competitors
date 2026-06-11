// Engine B — on-demand synthesis, grounded and cited.
//
// The model is given ONLY the approved content for the named competitor as
// grounding. It must cite every claim inline with its source and review date,
// must not invent pricing or feature numbers, and must refuse to disparage a
// competitor with anything not present in the approved content (the guardrail).
//
// With no ANTHROPIC_API_KEY the route still answers — by assembling the approved
// claims verbatim with citations — so an answer is never uncited or invented.

import {
  getCompetitor, getPositioning, getObjections, getPricingCounter, getFeatureGaps,
} from "@/lib/data/repository";
import { formatReviewedDate } from "@/lib/data/freshness";
import { Claim } from "@/lib/data/types";

interface Body {
  competitorSlug: string;
  message: string;
  history?: { role: "user" | "assistant"; content: string }[];
}

function cite(c: Claim): string {
  const date = formatReviewedDate(c.lastReviewedAt ?? c.fetchedAt);
  return `(${c.source} · reviewed ${date}${c.approvedBy ? ` · ${c.approvedBy}` : ""})`;
}

function buildGrounding(slug: string): { context: string; hasContent: boolean } {
  const competitor = getCompetitor(slug);
  if (!competitor) return { context: "", hasContent: false };

  const position = getPositioning(slug);
  const objections = getObjections(slug);
  const pricing = getPricingCounter(slug);
  const gaps = getFeatureGaps(slug);

  const lines: string[] = [`# Approved content for Rackspace vs ${competitor.name}`];
  if (position) lines.push(`\n## Position\n${position.body}\n${cite(position)}`);
  if (objections.length) {
    lines.push(`\n## Objections & rebuttals`);
    objections.forEach(({ objection, rebuttal }) => {
      lines.push(`- Objection: "${objection.body}"`);
      if (rebuttal) lines.push(`  Rebuttal: ${rebuttal.body} ${cite(rebuttal)}`);
    });
  }
  if (pricing) lines.push(`\n## Pricing counter\n${pricing.body}\n${cite(pricing)}`);
  if (gaps.length) {
    lines.push(`\n## Feature comparison (Rackspace vs ${competitor.name}, 0-10)`);
    gaps.forEach((g) =>
      lines.push(`- ${g.capability}: Rackspace ${g.rackspaceScore}, ${competitor.name} ${g.competitorScore} (${g.status}) ${cite(g as unknown as Claim)}`)
    );
  }
  return { context: lines.join("\n"), hasContent: Boolean(position || objections.length) };
}

function fallbackAnswer(slug: string): string {
  const competitor = getCompetitor(slug);
  if (!competitor) return "That competitor is not in the approved content store.";
  const position = getPositioning(slug);
  const objections = getObjections(slug);
  const pricing = getPricingCounter(slug);

  const parts: string[] = [];
  parts.push(`_Engine B is running in grounded fallback mode (no model configured). Below is the approved content, cited._`);
  if (position) parts.push(`## Position\n${position.body}\n\n**Source:** ${cite(position)}`);
  if (objections.length) {
    parts.push(`## Objection handling`);
    objections.slice(0, 3).forEach(({ objection, rebuttal }) => {
      parts.push(`**"${objection.body}"**\n\n${rebuttal ? rebuttal.body : ""}\n\n**Source:** ${rebuttal ? cite(rebuttal) : cite(objection)}`);
    });
  }
  if (pricing) parts.push(`## Pricing counter\n${pricing.body}\n\n**Source:** ${cite(pricing)}`);
  parts.push(`_No live pricing, CRM win/loss or news is included — those sources are not connected._`);
  return parts.join("\n\n");
}

const SYSTEM_PROMPT = `You are Rackspace Technology's competitive intelligence assistant (Engine B).

Strict rules:
- Answer ONLY from the approved content provided in the user message. Do not use outside knowledge.
- Cite every competitor claim inline with its source and review date exactly as given, e.g. "(Approved Content Store · reviewed Jun 1, 2026)".
- Never invent pricing numbers, percentages, or feature claims. If a number or fact is not in the approved content, say it is "not in approved content (source not connected)".
- Do not disparage the competitor with anything not backed by a cited approved claim. If asked to, decline and explain only the cited approved content is available.
- Be concise and useful for a live sales conversation. Use markdown.`;

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  const { context, hasContent } = buildGrounding(body.competitorSlug);

  if (!hasContent) {
    return streamText("There is no approved content for that competitor yet — the Approved Content Store has no entry. Nothing is shown without provenance.");
  }

  // Use the model when configured; otherwise return the cited fallback.
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const Anthropic = (await import("@anthropic-ai/sdk")).default;
      const anthropic = new Anthropic();
      const userContent = `${context}\n\n---\nSales rep question: ${body.message}`;
      const stream = anthropic.messages.stream({
        model: "claude-sonnet-4-6",
        max_tokens: 1500,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userContent }],
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
            controller.error(new Error("stream failed"));
          }
        },
      });
      return new Response(readable, {
        headers: { "Content-Type": "text/plain; charset=utf-8", "Transfer-Encoding": "chunked" },
      });
    } catch {
      // fall through to grounded fallback
    }
  }

  return streamText(fallbackAnswer(body.competitorSlug));
}

function streamText(text: string): Response {
  const encoder = new TextEncoder();
  let i = 0;
  const size = 18;
  const readable = new ReadableStream({
    pull(controller) {
      if (i < text.length) {
        controller.enqueue(encoder.encode(text.slice(i, i + size)));
        i += size;
      } else {
        controller.close();
      }
    },
  });
  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Transfer-Encoding": "chunked" },
  });
}

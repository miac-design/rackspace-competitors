import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT, buildStructuredPrompt, buildChatMessages } from "@/lib/prompts";
import { IntelRequest } from "@/types";

const anthropic = new Anthropic();

export async function POST(request: Request) {
  try {
    const body: IntelRequest = await request.json();

    let messages: { role: "user" | "assistant"; content: string }[];

    if (body.mode === "chat") {
      messages = buildChatMessages(body.message, body.history);
    } else {
      const prompt = buildStructuredPrompt(
        body.competitors,
        body.serviceAreas,
        body.outputType,
        body.context
      );
      messages = [{ role: "user", content: prompt }];
    }

    const stream = anthropic.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Intel API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate intelligence" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

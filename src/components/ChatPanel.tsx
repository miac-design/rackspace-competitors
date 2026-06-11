"use client";

import { useRef, useState } from "react";
import { Send, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { Competitor, ChatMessage } from "@/types";
import MarkdownReport from "@/components/MarkdownReport";

// Engine B — on-demand synthesis. Answers are generated from the approved data
// passed as grounding context and must cite their sources inline. The guardrail
// (server-side) blocks competitor claims that aren't backed by approved content.
export default function ChatPanel({ competitor }: { competitor: Competitor }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streaming, setStreaming] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    `Summarise where we beat ${competitor.name}`,
    `Draft a pricing email vs ${competitor.name}`,
    `Top objection handling for ${competitor.name}`,
  ];

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const userMessage = text.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);
    setStreaming("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          competitorSlug: competitor.slug,
          message: userMessage,
          history: messages,
        }),
      });
      if (!res.ok || !res.body) throw new Error("failed");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setStreaming(full);
        endRef.current?.scrollIntoView({ behavior: "smooth" });
      }
      setMessages((prev) => [...prev, { role: "assistant", content: full }]);
      setStreaming("");
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong generating that answer. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-2.5 text-xs text-gray-500">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
        Grounded in approved intel · every answer cites its source &amp; date
      </div>

      <div className="max-h-[420px] space-y-4 overflow-y-auto p-4">
        {messages.length === 0 && !loading && (
          <div className="py-6 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#C8102E] to-[#a00d24] shadow-sm">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <p className="text-sm font-semibold text-gray-800">
              Ask anything about {competitor.name}
            </p>
            <p className="mx-auto mt-1 max-w-xs text-xs text-gray-500">
              Synthesised from approved content only — it won&apos;t invent pricing or feature claims.
            </p>
            <div className="mt-4 flex flex-col items-stretch gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-left text-xs text-gray-600 transition-all hover:border-[#C8102E]/30 hover:text-[#C8102E]"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="ml-auto max-w-[85%] rounded-2xl bg-gray-100 px-3.5 py-2 text-sm text-gray-800">
              {m.content}
            </div>
          ) : (
            <div key={i} className="max-w-full">
              <MarkdownReport content={m.content} />
            </div>
          )
        )}

        {loading && (
          <div>
            {streaming ? (
              <MarkdownReport content={streaming} />
            ) : (
              <div className="inline-flex items-center gap-2 text-sm text-gray-400">
                <Loader2 className="h-4 w-4 animate-spin text-[#C8102E]" />
                Retrieving approved intel…
              </div>
            )}
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t border-gray-100 p-3"
      >
        <div className="flex items-end gap-2 rounded-xl border border-gray-200 bg-white p-1.5 focus-within:border-[#C8102E]/40">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            rows={1}
            placeholder={`Ask about ${competitor.name}…`}
            className="flex-1 resize-none bg-transparent px-2.5 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#C8102E] to-[#a00d24] text-white transition-all hover:scale-105 disabled:opacity-40"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </div>
      </form>
    </div>
  );
}

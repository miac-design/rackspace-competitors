"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, User, Bot, ArrowRight, Sparkles } from "lucide-react";
import { ChatMessage } from "@/types";
import IntelReport from "./IntelReport";

const SUGGESTIONS = [
  {
    title: "Compare on bare metal",
    description: "Rackspace vs Vultr for bare metal workloads",
    query: "How does Rackspace compare to Vultr on bare metal?",
  },
  {
    title: "OVHcloud weaknesses",
    description: "Key gaps and competitive disadvantages",
    query: "What are OVHcloud's weaknesses?",
  },
  {
    title: "Handle pricing objections",
    description: "Talk tracks for Vultr pricing pushback",
    query: "Help me handle pricing objections vs Vultr",
  },
  {
    title: "Enterprise Kubernetes",
    description: "Rackspace vs OVHcloud K8s comparison",
    query: "Rackspace vs OVHcloud for enterprise Kubernetes",
  },
];

export default function ChatMode() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);
    setStreamingContent("");

    try {
      const response = await fetch("/api/intel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "chat",
          message: userMessage,
          history: messages,
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          fullContent += chunk;
          setStreamingContent(fullContent);
        }
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: fullContent },
      ]);
      setStreamingContent("");
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error generating the intelligence report. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  function handleSuggestionClick(query: string) {
    setInput(query);
    inputRef.current?.focus();
  }

  const isEmpty = messages.length === 0 && !isLoading;

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {/* Empty state */}
        {isEmpty && (
          <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
            {/* Icon with glow */}
            <div className="relative mb-4">
              <div className="absolute inset-0 rounded-xl bg-[#C8102E]/10 blur-xl scale-150" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#C8102E] to-[#a00d24] shadow-lg shadow-red-200/40">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-1.5 tracking-tight">
              Ask me anything about the competition
            </h2>
            <p className="text-gray-500 max-w-md text-sm leading-relaxed">
              Get instant competitive intelligence, battle cards, and talk tracks.
            </p>

            {/* Suggestion cards */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-xl w-full stagger-children">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion.query}
                  onClick={() => handleSuggestionClick(suggestion.query)}
                  className="group animate-fade-in-up flex flex-col items-start gap-0.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-left transition-all duration-200 hover:border-[#C8102E]/30 hover:shadow-md hover:shadow-red-100/30 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-sm font-semibold text-gray-800 group-hover:text-[#C8102E] transition-colors">
                      {suggestion.title}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-gray-300 group-hover:text-[#C8102E] ml-auto transition-all group-hover:translate-x-0.5" />
                  </div>
                  <span className="text-xs text-gray-400 leading-relaxed">
                    {suggestion.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((msg, i) => (
          <div key={i} className="max-w-4xl mx-auto animate-fade-in-up">
            {msg.role === "user" ? (
              <div className="flex gap-3 items-start">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 border border-gray-200">
                  <User className="h-4 w-4 text-gray-500" />
                </div>
                <div className="rounded-2xl bg-gray-50 border border-gray-100 px-4 py-3 text-gray-800 text-sm leading-relaxed">
                  {msg.content}
                </div>
              </div>
            ) : (
              <div className="flex gap-3 items-start">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#C8102E] to-[#a00d24] shadow-sm">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <IntelReport content={msg.content} />
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Streaming response */}
        {isLoading && streamingContent && (
          <div className="max-w-4xl mx-auto flex gap-3 items-start animate-fade-in">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#C8102E] to-[#a00d24] shadow-sm">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <IntelReport content={streamingContent} isStreaming />
            </div>
          </div>
        )}

        {/* Loading state */}
        {isLoading && !streamingContent && (
          <div className="max-w-4xl mx-auto flex gap-3 items-start animate-fade-in">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#C8102E] to-[#a00d24] shadow-sm animate-pulse-glow">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="flex items-center gap-2.5 text-gray-400 text-sm px-4 py-3 rounded-2xl bg-white border border-gray-100">
              <Loader2 className="h-4 w-4 animate-spin text-[#C8102E]" />
              <span>Analyzing competitive landscape...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-gray-100 bg-white/80 glass p-4">
        <form onSubmit={handleSubmit} className="mx-auto max-w-4xl">
          <div className="flex gap-3 items-end rounded-2xl border border-gray-200 bg-white p-2 shadow-sm transition-all duration-200 focus-within:border-[#C8102E]/40 focus-within:shadow-md focus-within:shadow-red-100/20">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your competitive situation..."
              rows={1}
              className="flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#C8102E] to-[#a00d24] text-white transition-all duration-200 hover:shadow-md hover:shadow-red-200/40 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

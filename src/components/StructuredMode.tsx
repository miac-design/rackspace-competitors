"use client";

import { useState } from "react";
import { Zap, Loader2, X } from "lucide-react";
import { COMPETITORS } from "@/lib/competitors";
import { SERVICE_AREAS } from "@/lib/service-areas";
import { OUTPUT_TYPES } from "@/lib/output-types";
import { OutputType } from "@/types";
import CompetitorLogo from "./CompetitorLogo";
import IntelReport from "./IntelReport";

export default function StructuredMode() {
  const [selectedCompetitor, setSelectedCompetitor] = useState<string>(COMPETITORS[0].slug);
  const [selectedServiceAreas, setSelectedServiceAreas] = useState<string[]>([]);
  const [outputType, setOutputType] = useState<OutputType>("full");
  const [context, setContext] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState("");

  function toggleServiceArea(slug: string) {
    setSelectedServiceAreas((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  async function handleGenerate() {
    if (selectedServiceAreas.length === 0) return;
    setIsLoading(true);
    setReport("");

    try {
      const response = await fetch("/api/intel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "structured",
          competitors: [selectedCompetitor],
          serviceAreas: selectedServiceAreas,
          outputType,
          context: context.trim() || undefined,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          fullContent += decoder.decode(value, { stream: true });
          setReport(fullContent);
        }
      }
    } catch {
      setReport("Error generating intelligence report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <div className="mx-auto w-full max-w-4xl px-4 py-8 space-y-8">
        {/* Competitor Selection */}
        <section className="animate-fade-in-up">
          <label className="mb-3 block text-sm font-semibold text-gray-800 tracking-tight">
            Competitor
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {COMPETITORS.map((comp) => (
              <button
                key={comp.slug}
                type="button"
                onClick={() => setSelectedCompetitor(comp.slug)}
                className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3.5 transition-all duration-200 ${
                  selectedCompetitor === comp.slug
                    ? "border-[#C8102E] bg-[#C8102E]/5 text-gray-900 shadow-md shadow-red-100/30"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                <CompetitorLogo competitor={comp} size={24} />
                <span className="font-medium text-sm">{comp.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Service Areas */}
        <section className="animate-fade-in-up" style={{ animationDelay: "60ms" }}>
          <label className="mb-3 block text-sm font-semibold text-gray-800 tracking-tight">
            Service Areas
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {SERVICE_AREAS.map((sa) => (
              <button
                key={sa.slug}
                type="button"
                onClick={() => toggleServiceArea(sa.slug)}
                className={`rounded-xl border px-3 py-2.5 text-left text-sm transition-all duration-200 ${
                  selectedServiceAreas.includes(sa.slug)
                    ? "border-[#C8102E] bg-[#C8102E]/5 text-gray-900 font-medium shadow-sm"
                    : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-700 hover:shadow-sm"
                }`}
              >
                {sa.name}
              </button>
            ))}
          </div>
          {selectedServiceAreas.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2 animate-fade-in">
              {selectedServiceAreas.map((slug) => {
                const sa = SERVICE_AREAS.find((s) => s.slug === slug)!;
                return (
                  <span
                    key={slug}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#C8102E]/5 border border-[#C8102E]/20 px-3 py-1.5 text-xs font-medium text-[#C8102E] transition-all hover:bg-[#C8102E]/10"
                  >
                    {sa.name}
                    <button
                      onClick={() => toggleServiceArea(slug)}
                      className="ml-0.5 text-[#C8102E]/40 hover:text-[#C8102E] transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                );
              })}
            </div>
          )}
        </section>

        {/* Output Type */}
        <section className="animate-fade-in-up" style={{ animationDelay: "120ms" }}>
          <label className="mb-3 block text-sm font-semibold text-gray-800 tracking-tight">
            Report Type
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {OUTPUT_TYPES.map((ot) => (
              <button
                key={ot.slug}
                type="button"
                onClick={() => setOutputType(ot.slug)}
                className={`rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                  outputType === ot.slug
                    ? "border-[#C8102E] bg-[#C8102E]/5 text-gray-900 shadow-sm"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                <div className="text-sm font-medium">{ot.name}</div>
                <div className="mt-0.5 text-xs text-gray-400">{ot.description}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Context */}
        <section className="animate-fade-in-up" style={{ animationDelay: "180ms" }}>
          <label className="mb-3 block text-sm font-semibold text-gray-800 tracking-tight">
            Deal Context <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="E.g., Healthcare company, 500 employees, needs HIPAA compliance, currently on-prem..."
            rows={2}
            className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-[#C8102E]/40 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10 focus:shadow-sm"
          />
        </section>

        {/* Generate */}
        <button
          onClick={handleGenerate}
          disabled={selectedServiceAreas.length === 0 || isLoading}
          className="flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#C8102E] to-[#a00d24] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-red-200/40 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating Intelligence...
            </>
          ) : (
            <>
              <Zap className="h-4 w-4" />
              Generate Battle Card
            </>
          )}
        </button>

        {/* Report */}
        {report && (
          <div className="pt-2 animate-fade-in-up">
            <IntelReport content={report} isStreaming={isLoading} />
          </div>
        )}
      </div>
    </div>
  );
}

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
      <div className="mx-auto w-full max-w-4xl px-4 py-8 space-y-6">
        {/* Competitor Selection */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Competitor
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {COMPETITORS.map((comp) => (
              <button
                key={comp.slug}
                type="button"
                onClick={() => setSelectedCompetitor(comp.slug)}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                  selectedCompetitor === comp.slug
                    ? "border-[#C8102E] bg-[#C8102E]/5 text-gray-900 shadow-sm"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900"
                }`}
              >
                <CompetitorLogo competitor={comp} size={24} />
                <span className="font-medium">{comp.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Service Areas */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Service Areas
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {SERVICE_AREAS.map((sa) => (
              <button
                key={sa.slug}
                type="button"
                onClick={() => toggleServiceArea(sa.slug)}
                className={`rounded-xl border px-3 py-2.5 text-left text-sm transition-colors ${
                  selectedServiceAreas.includes(sa.slug)
                    ? "border-[#C8102E] bg-[#C8102E]/5 text-gray-900 font-medium"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900"
                }`}
              >
                {sa.name}
              </button>
            ))}
          </div>
          {selectedServiceAreas.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedServiceAreas.map((slug) => {
                const sa = SERVICE_AREAS.find((s) => s.slug === slug)!;
                return (
                  <span
                    key={slug}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#C8102E]/5 border border-[#C8102E]/20 px-3 py-1 text-xs text-[#C8102E]"
                  >
                    {sa.name}
                    <button
                      onClick={() => toggleServiceArea(slug)}
                      className="ml-0.5 text-[#C8102E]/50 hover:text-[#C8102E]"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* Output Type */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Report Type
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {OUTPUT_TYPES.map((ot) => (
              <button
                key={ot.slug}
                type="button"
                onClick={() => setOutputType(ot.slug)}
                className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                  outputType === ot.slug
                    ? "border-[#C8102E] bg-[#C8102E]/5 text-gray-900 shadow-sm"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900"
                }`}
              >
                <div className="text-sm font-medium">{ot.name}</div>
                <div className="mt-0.5 text-xs text-gray-400">{ot.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Context */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Deal Context <span className="text-gray-400">(optional)</span>
          </label>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="E.g., Healthcare company, 500 employees, needs HIPAA compliance, currently on-prem..."
            rows={2}
            className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-[#C8102E] focus:outline-none focus:ring-1 focus:ring-[#C8102E]"
          />
        </div>

        {/* Generate */}
        <button
          onClick={handleGenerate}
          disabled={selectedServiceAreas.length === 0 || isLoading}
          className="flex items-center gap-2 rounded-xl bg-[#C8102E] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#a00d24] disabled:opacity-50 disabled:cursor-not-allowed"
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
          <div className="pt-4">
            <IntelReport content={report} isStreaming={isLoading} />
          </div>
        )}
      </div>
    </div>
  );
}

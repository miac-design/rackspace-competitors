"use client";

import { useState } from "react";
import {
  Zap, Loader2, X,
  Cpu, Container, Database, Shield, Headset, CloudCog,
  Server, Network, HardDrive, GitBranch, Brain, MoveRight,
  FileText, ArrowLeftRight, TrendingUp, Target, MessageCircle, DollarSign,
  Mail, ShieldCheck, Building2, Cloud, BarChart3, AppWindow,
} from "lucide-react";
import { COMPETITORS } from "@/lib/competitors";
import { SERVICE_AREAS } from "@/lib/service-areas";
import { OUTPUT_TYPES } from "@/lib/output-types";
import { OutputType } from "@/types";
import CompetitorLogo from "./CompetitorLogo";
import IntelReport from "./IntelReport";

// Map icon name strings to actual Lucide components
const SERVICE_ICON_MAP: Record<string, React.ElementType> = {
  Cpu, Container, Database, Shield, Headset, CloudCog,
  Server, Network, HardDrive, GitBranch, Brain, MoveRight,
  Mail, ShieldCheck, Building2, Cloud, BarChart3, AppWindow,
};

const OUTPUT_ICON_MAP: Record<string, React.ElementType> = {
  full: FileText,
  comparison: ArrowLeftRight,
  strengths: TrendingUp,
  weaknesses: Target,
  objections: MessageCircle,
  pricing: DollarSign,
};

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

  const selectedCompData = COMPETITORS.find((c) => c.slug === selectedCompetitor);

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <div className="mx-auto w-full max-w-4xl px-4 py-6 space-y-6">

        {/* Step 1: Competitor Selection */}
        <section className="animate-fade-in-up">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#C8102E] text-[10px] font-bold text-white">1</span>
            <label className="text-sm font-semibold text-gray-800">Select Competitor</label>
          </div>
          <div className="flex flex-wrap gap-2">
            {COMPETITORS.map((comp) => {
              const isSelected = selectedCompetitor === comp.slug;
              return (
                <button
                  key={comp.slug}
                  type="button"
                  onClick={() => setSelectedCompetitor(comp.slug)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all duration-200 ${
                    isSelected
                      ? "border-[#C8102E] bg-[#C8102E]/5 text-gray-900 font-semibold shadow-sm"
                      : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  <CompetitorLogo competitor={comp} size={18} />
                  <span>{comp.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Step 2: Service Areas */}
        <section className="animate-fade-in-up" style={{ animationDelay: "60ms" }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#C8102E] text-[10px] font-bold text-white">2</span>
            <label className="text-sm font-semibold text-gray-800">Choose Service Areas</label>
            {selectedServiceAreas.length > 0 && (
              <span className="ml-auto text-xs font-medium text-[#C8102E] bg-[#C8102E]/5 px-2 py-0.5 rounded-full">
                {selectedServiceAreas.length} selected
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {SERVICE_AREAS.map((sa) => {
              const Icon = SERVICE_ICON_MAP[sa.icon];
              const isSelected = selectedServiceAreas.includes(sa.slug);
              return (
                <button
                  key={sa.slug}
                  type="button"
                  onClick={() => toggleServiceArea(sa.slug)}
                  className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-sm transition-all duration-200 ${
                    isSelected
                      ? "border-[#C8102E] bg-[#C8102E]/5 text-gray-900 font-medium shadow-sm"
                      : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-700 hover:shadow-sm"
                  }`}
                >
                  {Icon && (
                    <Icon className={`h-4 w-4 shrink-0 ${isSelected ? "text-[#C8102E]" : "text-gray-400"}`} />
                  )}
                  <span className="truncate">{sa.name}</span>
                </button>
              );
            })}
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

        {/* Step 3: Report Type */}
        <section className="animate-fade-in-up" style={{ animationDelay: "120ms" }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#C8102E] text-[10px] font-bold text-white">3</span>
            <label className="text-sm font-semibold text-gray-800">Report Type</label>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {OUTPUT_TYPES.map((ot) => {
              const Icon = OUTPUT_ICON_MAP[ot.slug];
              const isSelected = outputType === ot.slug;
              return (
                <button
                  key={ot.slug}
                  type="button"
                  onClick={() => setOutputType(ot.slug)}
                  className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                    isSelected
                      ? "border-[#C8102E] bg-[#C8102E]/5 text-gray-900 shadow-sm"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  {Icon && (
                    <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${isSelected ? "text-[#C8102E]" : "text-gray-400"}`} />
                  )}
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{ot.name}</div>
                    <div className="mt-0.5 text-xs text-gray-400 leading-snug">{ot.description}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Step 4: Context */}
        <section className="animate-fade-in-up" style={{ animationDelay: "180ms" }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-[10px] font-bold text-gray-500">4</span>
            <label className="text-sm font-semibold text-gray-800">
              Deal Context <span className="text-gray-400 font-normal">(optional)</span>
            </label>
          </div>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="E.g., Healthcare company, 500 employees, needs HIPAA compliance, currently on-prem..."
            rows={2}
            className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-[#C8102E]/40 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10 focus:shadow-sm"
          />
        </section>

        {/* Generate */}
        <div className="flex items-center gap-4 pt-1">
          <button
            onClick={handleGenerate}
            disabled={selectedServiceAreas.length === 0 || isLoading}
            className="flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#C8102E] to-[#a00d24] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-red-200/40 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4" />
                Generate Battle Card
              </>
            )}
          </button>
          {selectedServiceAreas.length === 0 && (
            <p className="text-xs text-gray-400">Select at least one service area to generate</p>
          )}
          {selectedServiceAreas.length > 0 && !isLoading && selectedCompData && (
            <p className="text-xs text-gray-400">
              {selectedCompData.name} vs Rackspace &middot; {selectedServiceAreas.length} area{selectedServiceAreas.length > 1 ? "s" : ""}
            </p>
          )}
        </div>

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

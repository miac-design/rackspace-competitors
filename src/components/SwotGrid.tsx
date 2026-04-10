"use client";

import React from "react";
import { TrendingUp, AlertTriangle, Lightbulb, ShieldAlert } from "lucide-react";
import { SourceRef } from "@/lib/competitor-scores";

interface SwotGridProps {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  competitorName: string;
  sources?: SourceRef[];
}

function renderCitedText(text: string, sources?: SourceRef[]): React.ReactNode {
  if (!sources || sources.length === 0) return text;

  const parts = text.split(/(\[\d+\])/g);
  return parts.map((part, i) => {
    const match = part.match(/^\[(\d+)\]$/);
    if (match) {
      const idx = parseInt(match[1], 10) - 1;
      const source = sources[idx];
      if (source) {
        return (
          <a
            key={i}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            title={source.title}
            className="inline-flex items-center justify-center ml-0.5 w-4 h-4 rounded-full bg-gray-100 text-[9px] font-bold text-[#C8102E] hover:bg-[#C8102E] hover:text-white transition-colors no-underline align-super"
          >
            {match[1]}
          </a>
        );
      }
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

interface QuadrantProps {
  title: string;
  items: string[];
  icon: React.ReactNode;
  headerBg: string;
  headerText: string;
  borderColor: string;
  sources?: SourceRef[];
}

function Quadrant({ title, items, icon, headerBg, headerText, borderColor, sources }: QuadrantProps) {
  return (
    <div className={`rounded-xl border ${borderColor} overflow-hidden`}>
      <div className={`${headerBg} px-4 py-2.5 flex items-center gap-2`}>
        {icon}
        <span className={`text-sm font-semibold ${headerText}`}>{title}</span>
      </div>
      <div className="px-4 py-3 bg-white">
        {items.length === 0 ? (
          <p className="text-xs text-gray-400 italic">No items</p>
        ) : (
          <ul className="space-y-2">
            {items.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600">
                <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-gray-300" />
                <span className="leading-snug">{renderCitedText(item, sources)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function SwotGrid({
  strengths,
  weaknesses,
  opportunities,
  threats,
  competitorName,
  sources,
}: SwotGridProps) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <h3 className="text-base font-semibold text-gray-800 mb-3">
        SWOT Analysis vs {competitorName}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Quadrant
          title="Strengths"
          items={strengths}
          icon={<TrendingUp className="h-4 w-4 text-green-700" />}
          headerBg="bg-green-50"
          headerText="text-green-800"
          borderColor="border-green-200"
          sources={sources}
        />
        <Quadrant
          title="Weaknesses"
          items={weaknesses}
          icon={<AlertTriangle className="h-4 w-4 text-red-600" />}
          headerBg="bg-red-50"
          headerText="text-red-800"
          borderColor="border-red-200"
          sources={sources}
        />
        <Quadrant
          title="Opportunities"
          items={opportunities}
          icon={<Lightbulb className="h-4 w-4 text-blue-600" />}
          headerBg="bg-blue-50"
          headerText="text-blue-800"
          borderColor="border-blue-200"
          sources={sources}
        />
        <Quadrant
          title="Threats"
          items={threats}
          icon={<ShieldAlert className="h-4 w-4 text-amber-600" />}
          headerBg="bg-amber-50"
          headerText="text-amber-800"
          borderColor="border-amber-200"
          sources={sources}
        />
      </div>

      {/* Sources footnotes */}
      {sources && sources.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Sources</p>
          <ol className="space-y-1">
            {sources.map((source, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-gray-400">
                <span className="inline-flex items-center justify-center shrink-0 w-4 h-4 rounded-full bg-gray-100 text-[9px] font-bold text-gray-500">
                  {i + 1}
                </span>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C8102E] transition-colors underline underline-offset-2"
                >
                  {source.title}
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

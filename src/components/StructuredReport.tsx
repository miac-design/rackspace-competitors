"use client";

import React, { useMemo } from "react";
import {
  BarChart3, Radar, Grid3X3, ArrowLeftRight,
  FileText, Swords, Target, DollarSign, MessageCircle,
} from "lucide-react";
import VerdictBanner from "./VerdictBanner";
import RadarChart from "./RadarChart";
import SwotGrid from "./SwotGrid";
import ScoreCard from "./ScoreCard";
import ReportTabs from "./ReportTabs";
import IntelReport from "./IntelReport";
import { CompetitorScores } from "@/lib/competitor-scores";

interface StructuredReportProps {
  content: string;
  isStreaming: boolean;
  competitorName: string;
  scores: CompetitorScores;
}

// Parse markdown content into sections by ## headers
function parseSections(content: string): { title: string; body: string }[] {
  const sections: { title: string; body: string }[] = [];
  const lines = content.split("\n");
  let currentTitle = "";
  let currentBody: string[] = [];

  for (const line of lines) {
    const headerMatch = line.match(/^## (.+)$/);
    if (headerMatch) {
      if (currentTitle || currentBody.length > 0) {
        sections.push({ title: currentTitle, body: currentBody.join("\n").trim() });
      }
      currentTitle = headerMatch[1];
      currentBody = [];
    } else {
      currentBody.push(line);
    }
  }

  if (currentTitle || currentBody.length > 0) {
    sections.push({ title: currentTitle, body: currentBody.join("\n").trim() });
  }

  return sections.filter((s) => s.body.length > 0);
}

// Shorten long section titles to concise tab labels
function shortenLabel(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("head-to-head") || t.includes("feature comparison") || t.includes("comparison")) return "Comparison";
  if (t.includes("strength") && t.includes("rackspace")) return "Strengths";
  if (t.includes("strength")) return "Strengths";
  if (t.includes("weakness") || t.includes("gap") || t.includes("vulnerabilit")) return "Weaknesses";
  if (t.includes("objection")) return "Objections";
  if (t.includes("pricing") || t.includes("cost") || t.includes("tco")) return "Pricing";
  if (t.includes("talk")) return "Talk Tracks";
  if (t.includes("key message") || t.includes("bottom line") || t.includes("summary")) return "Summary";
  // If still long, truncate
  if (title.length > 18) return title.slice(0, 16) + "...";
  return title;
}

function getSectionIcon(title: string): React.ReactNode {
  const t = title.toLowerCase();
  if (t.includes("comparison") || t.includes("feature") || t.includes("head-to-head")) return <ArrowLeftRight className="h-3.5 w-3.5" />;
  if (t.includes("strength")) return <Swords className="h-3.5 w-3.5" />;
  if (t.includes("weakness") || t.includes("gap")) return <Target className="h-3.5 w-3.5" />;
  if (t.includes("objection")) return <MessageCircle className="h-3.5 w-3.5" />;
  if (t.includes("pricing") || t.includes("cost")) return <DollarSign className="h-3.5 w-3.5" />;
  return <FileText className="h-3.5 w-3.5" />;
}

export default function StructuredReport({
  content,
  isStreaming,
  competitorName,
  scores,
}: StructuredReportProps) {
  const sections = useMemo(() => parseSections(content), [content]);

  // While streaming and we don't have sections yet, show the plain report
  if (isStreaming && sections.length <= 1) {
    return <IntelReport content={content} isStreaming />;
  }

  // Build tabs: Overview (visuals) + each parsed markdown section
  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: <BarChart3 className="h-3.5 w-3.5" />,
      content: (
        <div className="space-y-5 px-1">
          <VerdictBanner
            verdict={scores.verdict}
            rackspaceScore={scores.rackspaceOverall}
            competitorScore={scores.competitorOverall}
            competitorName={competitorName}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
            <div className="rounded-xl border border-gray-100 bg-white p-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Competitive Radar</h3>
              <RadarChart
                dimensions={scores.dimensions}
                competitorName={competitorName}
              />
            </div>
            <div className="rounded-xl border border-gray-100 bg-white p-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Category Scores</h3>
              <ScoreCard
                scores={scores.dimensions.map((d) => ({
                  category: d.label,
                  rackspace: d.rackspace,
                  competitor: d.competitor,
                }))}
                competitorName={competitorName}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "swot",
      label: "SWOT",
      icon: <Grid3X3 className="h-3.5 w-3.5" />,
      content: (
        <div className="px-1">
          <SwotGrid
            strengths={scores.swot.strengths}
            weaknesses={scores.swot.weaknesses}
            opportunities={scores.swot.opportunities}
            threats={scores.swot.threats}
            competitorName={competitorName}
          />
        </div>
      ),
    },
    {
      id: "radar",
      label: "Radar",
      icon: <Radar className="h-3.5 w-3.5" />,
      content: (
        <div className="max-w-md mx-auto rounded-xl border border-gray-100 bg-white p-5">
          <RadarChart
            dimensions={scores.dimensions}
            competitorName={competitorName}
          />
        </div>
      ),
    },
    // Add parsed markdown sections as tabs with shortened labels
    ...sections.map((section, i) => ({
      id: `section-${i}`,
      label: shortenLabel(section.title) || "Details",
      icon: getSectionIcon(section.title),
      content: (
        <div className="px-1">
          <IntelReport
            content={`## ${section.title}\n\n${section.body}`}
            isStreaming={isStreaming && i === sections.length - 1}
          />
        </div>
      ),
    })),
  ];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      <ReportTabs tabs={tabs} />
    </div>
  );
}

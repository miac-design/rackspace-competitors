"use client";

import React, { useMemo } from "react";
import {
  BarChart3, Radar, Grid3X3, ArrowLeftRight,
  FileText, Swords, DollarSign, MessageCircle,
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
        sections.push({
          title: currentTitle,
          body: currentBody.join("\n").trim(),
        });
      }
      currentTitle = headerMatch[1];
      currentBody = [];
    } else {
      currentBody.push(line);
    }
  }

  if (currentTitle || currentBody.length > 0) {
    sections.push({
      title: currentTitle,
      body: currentBody.join("\n").trim(),
    });
  }

  return sections.filter((s) => s.body.length > 0);
}

function getSectionIcon(title: string): React.ReactNode {
  const t = title.toLowerCase();
  if (t.includes("comparison") || t.includes("feature")) return <ArrowLeftRight className="h-4 w-4" />;
  if (t.includes("strength")) return <Swords className="h-4 w-4" />;
  if (t.includes("weakness") || t.includes("gap")) return <Swords className="h-4 w-4" />;
  if (t.includes("objection")) return <MessageCircle className="h-4 w-4" />;
  if (t.includes("pricing") || t.includes("cost")) return <DollarSign className="h-4 w-4" />;
  return <FileText className="h-4 w-4" />;
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
      icon: <BarChart3 className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <VerdictBanner
            verdict={scores.verdict}
            rackspaceScore={scores.rackspaceOverall}
            competitorScore={scores.competitorOverall}
            competitorName={competitorName}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Competitive Radar</h3>
              <RadarChart
                dimensions={scores.dimensions}
                competitorName={competitorName}
              />
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Category Scores</h3>
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
      icon: <Grid3X3 className="h-4 w-4" />,
      content: (
        <SwotGrid
          strengths={scores.swot.strengths}
          weaknesses={scores.swot.weaknesses}
          opportunities={scores.swot.opportunities}
          threats={scores.swot.threats}
          competitorName={competitorName}
        />
      ),
    },
    {
      id: "radar",
      label: "Radar",
      icon: <Radar className="h-4 w-4" />,
      content: (
        <div className="max-w-lg mx-auto rounded-2xl border border-gray-100 bg-white p-6">
          <RadarChart
            dimensions={scores.dimensions}
            competitorName={competitorName}
          />
        </div>
      ),
    },
    // Add parsed markdown sections as tabs
    ...sections.map((section, i) => ({
      id: `section-${i}`,
      label: section.title || "Report",
      icon: getSectionIcon(section.title),
      content: <IntelReport content={`## ${section.title}\n\n${section.body}`} isStreaming={isStreaming && i === sections.length - 1} />,
    })),
  ];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      <ReportTabs tabs={tabs} />
    </div>
  );
}

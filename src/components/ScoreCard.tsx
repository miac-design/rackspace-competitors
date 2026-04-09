"use client";

import React from "react";

interface Score {
  category: string;
  rackspace: number;
  competitor: number;
}

interface ScoreCardProps {
  scores: Score[];
  competitorName: string;
}

function Bar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="flex items-center gap-2 flex-1">
      <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-semibold text-gray-700 w-6 text-right tabular-nums">
        {value}
      </span>
    </div>
  );
}

export default function ScoreCard({ scores, competitorName }: ScoreCardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Legend */}
      <div className="flex items-center gap-5 mb-4">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#C8102E" }} />
          <span className="text-xs font-medium text-gray-600">Rackspace</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-gray-400" />
          <span className="text-xs font-medium text-gray-600">{competitorName}</span>
        </div>
      </div>

      {/* Score rows */}
      <div className="space-y-3">
        {scores.map((score, i) => (
          <div key={i} className="space-y-1">
            <span className="text-xs font-medium text-gray-700">{score.category}</span>
            <div className="space-y-1">
              <Bar value={score.rackspace} max={10} color="#C8102E" />
              <Bar value={score.competitor} max={10} color="#9ca3af" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

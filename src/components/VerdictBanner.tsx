"use client";

import React from "react";

interface VerdictBannerProps {
  verdict: string;
  rackspaceScore: number;
  competitorScore: number;
  competitorName: string;
}

function ScoreRing({
  score,
  max,
  color,
  label,
}: {
  score: number;
  max: number;
  color: string;
  label: string;
}) {
  const radius = 36;
  const stroke = 5;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(score / max, 1);
  const dashOffset = circumference * (1 - pct);

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-20 h-20">
        <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
          {/* Background ring */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={stroke}
          />
          {/* Score ring */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold tabular-nums" style={{ color }}>
            {score}
          </span>
        </div>
      </div>
      <span className="text-xs font-medium text-gray-500 text-center leading-tight max-w-[100px]">
        {label}
      </span>
    </div>
  );
}

export default function VerdictBanner({
  verdict,
  rackspaceScore,
  competitorScore,
  competitorName,
}: VerdictBannerProps) {
  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-gradient-to-r from-gray-50 via-white to-gray-50 p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row items-center gap-5">
        {/* Rackspace score */}
        <ScoreRing
          score={rackspaceScore}
          max={10}
          color="#C8102E"
          label="Rackspace"
        />

        {/* Verdict text */}
        <div className="flex-1 text-center px-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
            Verdict
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">{verdict}</p>
        </div>

        {/* Competitor score */}
        <ScoreRing
          score={competitorScore}
          max={10}
          color="#6b7280"
          label={competitorName}
        />
      </div>

      {/* Comparison bar */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-400 w-20 text-right shrink-0">
            Rackspace
          </span>
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden flex">
            <div
              className="h-full rounded-l-full transition-all duration-500"
              style={{
                width: `${(rackspaceScore / (rackspaceScore + competitorScore)) * 100}%`,
                backgroundColor: "#C8102E",
              }}
            />
            <div
              className="h-full rounded-r-full transition-all duration-500"
              style={{
                width: `${(competitorScore / (rackspaceScore + competitorScore)) * 100}%`,
                backgroundColor: "#9ca3af",
              }}
            />
          </div>
          <span className="text-xs font-medium text-gray-400 w-20 shrink-0">
            {competitorName}
          </span>
        </div>
      </div>
    </div>
  );
}

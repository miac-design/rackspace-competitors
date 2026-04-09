"use client";

import React from "react";
import { TrendingUp, AlertTriangle, Lightbulb, ShieldAlert } from "lucide-react";

interface SwotGridProps {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  competitorName: string;
}

interface QuadrantProps {
  title: string;
  items: string[];
  icon: React.ReactNode;
  headerBg: string;
  headerText: string;
  borderColor: string;
}

function Quadrant({ title, items, icon, headerBg, headerText, borderColor }: QuadrantProps) {
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
                <span className="leading-snug">{item}</span>
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
        />
        <Quadrant
          title="Weaknesses"
          items={weaknesses}
          icon={<AlertTriangle className="h-4 w-4 text-red-600" />}
          headerBg="bg-red-50"
          headerText="text-red-800"
          borderColor="border-red-200"
        />
        <Quadrant
          title="Opportunities"
          items={opportunities}
          icon={<Lightbulb className="h-4 w-4 text-blue-600" />}
          headerBg="bg-blue-50"
          headerText="text-blue-800"
          borderColor="border-blue-200"
        />
        <Quadrant
          title="Threats"
          items={threats}
          icon={<ShieldAlert className="h-4 w-4 text-amber-600" />}
          headerBg="bg-amber-50"
          headerText="text-amber-800"
          borderColor="border-amber-200"
        />
      </div>
    </div>
  );
}

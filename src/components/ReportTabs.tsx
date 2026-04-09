"use client";

import React, { useState } from "react";

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

interface ReportTabsProps {
  tabs: Tab[];
}

export default function ReportTabs({ tabs }: ReportTabsProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "");

  const activeTab = tabs.find((t) => t.id === activeId);

  return (
    <div className="w-full">
      {/* Tab bar */}
      <div className="border-b border-gray-200 bg-gray-50/50">
        <div className="flex overflow-x-auto" role="tablist" style={{ scrollbarWidth: "none" }}>
          {tabs.map((tab) => {
            const isActive = tab.id === activeId;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(tab.id)}
                className={`relative flex items-center gap-1.5 px-4 py-3 text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${
                  isActive
                    ? "text-[#C8102E]"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab.icon}
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#C8102E] rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="p-4 animate-fade-in">
        {activeTab?.content}
      </div>
    </div>
  );
}

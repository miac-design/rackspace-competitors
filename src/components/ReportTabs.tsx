"use client";

import React, { useState, useRef, useEffect } from "react";

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
  const tabBarRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  useEffect(() => {
    if (activeTabRef.current && tabBarRef.current) {
      const bar = tabBarRef.current.getBoundingClientRect();
      const tab = activeTabRef.current.getBoundingClientRect();
      setUnderline({
        left: tab.left - bar.left,
        width: tab.width,
      });
    }
  }, [activeId]);

  const activeTab = tabs.find((t) => t.id === activeId);

  return (
    <div className="w-full">
      {/* Tab bar */}
      <div className="relative border-b border-gray-200">
        <div
          ref={tabBarRef}
          className="flex overflow-x-auto scrollbar-hide -mb-px"
          role="tablist"
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeId;
            return (
              <button
                key={tab.id}
                ref={isActive ? activeTabRef : undefined}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  isActive
                    ? "text-[#C8102E]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>
        {/* Animated underline */}
        <span
          className="absolute bottom-0 h-[2px] bg-[#C8102E] transition-all duration-200 ease-out"
          style={{ left: underline.left, width: underline.width }}
        />
      </div>

      {/* Tab content */}
      <div className="py-4">
        {activeTab?.content}
      </div>
    </div>
  );
}

"use client";

import { Swords } from "lucide-react";

export default function Header() {
  return (
    <header className="relative bg-white border-b border-gray-100">
      {/* Top accent gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C8102E] via-[#e8384f] to-[#C8102E]" />
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
        <div className="flex items-center gap-3.5">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#C8102E] to-[#a00d24] shadow-md shadow-red-200/50">
            <Swords className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 tracking-tight leading-tight">
              Competitive Intelligence
            </h1>
            <p className="text-xs font-medium text-gray-400 tracking-wide">
              Rackspace Technology &mdash; Sales Enablement
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

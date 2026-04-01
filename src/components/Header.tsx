"use client";

import { Swords } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#C8102E]">
            <Swords className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 tracking-tight">
              Competitive Intelligence
            </h1>
            <p className="text-xs text-gray-500">
              Rackspace Technology — Sales Enablement
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

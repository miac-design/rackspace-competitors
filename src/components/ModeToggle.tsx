"use client";

import { MessageSquare, LayoutGrid } from "lucide-react";

interface ModeToggleProps {
  mode: "chat" | "structured";
  onModeChange: (mode: "chat" | "structured") => void;
}

export default function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="inline-flex rounded-full bg-gray-100/80 p-1 border border-gray-200/60">
      <button
        onClick={() => onModeChange("chat")}
        className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
          mode === "chat"
            ? "bg-[#C8102E] text-white shadow-md shadow-red-200/40"
            : "text-gray-500 hover:text-gray-700 hover:bg-white/60"
        }`}
      >
        <MessageSquare className="h-4 w-4" />
        Chat Mode
      </button>
      <button
        onClick={() => onModeChange("structured")}
        className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
          mode === "structured"
            ? "bg-[#C8102E] text-white shadow-md shadow-red-200/40"
            : "text-gray-500 hover:text-gray-700 hover:bg-white/60"
        }`}
      >
        <LayoutGrid className="h-4 w-4" />
        Structured Mode
      </button>
    </div>
  );
}

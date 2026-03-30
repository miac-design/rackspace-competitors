"use client";

import { MessageSquare, LayoutGrid } from "lucide-react";

interface ModeToggleProps {
  mode: "chat" | "structured";
  onModeChange: (mode: "chat" | "structured") => void;
}

export default function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="inline-flex rounded-lg bg-zinc-800/50 p-1">
      <button
        onClick={() => onModeChange("chat")}
        className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
          mode === "chat"
            ? "bg-[#C8102E] text-white shadow-sm"
            : "text-zinc-400 hover:text-white"
        }`}
      >
        <MessageSquare className="h-4 w-4" />
        Chat Mode
      </button>
      <button
        onClick={() => onModeChange("structured")}
        className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
          mode === "structured"
            ? "bg-[#C8102E] text-white shadow-sm"
            : "text-zinc-400 hover:text-white"
        }`}
      >
        <LayoutGrid className="h-4 w-4" />
        Structured Mode
      </button>
    </div>
  );
}

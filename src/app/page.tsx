"use client";

import { useState } from "react";
import Header from "@/components/Header";
import ModeToggle from "@/components/ModeToggle";
import ChatMode from "@/components/ChatMode";
import StructuredMode from "@/components/StructuredMode";
import ResourcesPanel from "@/components/ResourcesPanel";

export default function Home() {
  const [mode, setMode] = useState<"chat" | "structured">("chat");

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fb]">
      <Header />
      <div className="flex items-center justify-center bg-white/60 glass border-b border-gray-100 px-4 py-3">
        <ModeToggle mode={mode} onModeChange={setMode} />
      </div>
      <main className="flex flex-1 flex-col overflow-hidden">
        {mode === "chat" ? <ChatMode /> : <StructuredMode />}
      </main>
      <ResourcesPanel />
    </div>
  );
}

"use client";

import { useState } from "react";
import { Swords, BarChart3 } from "lucide-react";
import Header from "@/components/Header";
import DataSourcesPanel from "@/components/DataSourcesPanel";
import EntryView from "@/components/views/EntryView";
import SalesView from "@/components/views/SalesView";
import ProductView from "@/components/views/ProductView";

type View = "entry" | "sales" | "product";

export default function Home() {
  const [view, setView] = useState<View>("entry");
  const [slug, setSlug] = useState<string | null>(null);

  function openCompetitor(s: string) {
    setSlug(s);
    setView("sales");
  }

  const salesActive = view === "entry" || view === "sales";

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fb]">
      <Header />

      <div className="flex items-center justify-center gap-1 border-b border-gray-100 bg-white/60 glass px-4 py-2">
        <NavTab
          active={salesActive}
          onClick={() => setView("entry")}
          icon={Swords}
          label="Battle Cards"
        />
        <NavTab
          active={view === "product"}
          onClick={() => setView("product")}
          icon={BarChart3}
          label="Product Trends"
        />
      </div>

      <main className="flex-1 overflow-y-auto pb-16">
        {view === "entry" && <EntryView onSelect={openCompetitor} />}
        {view === "sales" && slug && (
          <SalesView slug={slug} onBack={() => setView("entry")} />
        )}
        {view === "product" && <ProductView />}
      </main>

      <DataSourcesPanel />
    </div>
  );
}

function NavTab({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof Swords;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all ${
        active
          ? "bg-[#C8102E] text-white shadow-md shadow-red-200/40"
          : "text-gray-500 hover:bg-white/60 hover:text-gray-700"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

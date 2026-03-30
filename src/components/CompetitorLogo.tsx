"use client";

import { useState } from "react";
import { Server } from "lucide-react";
import { Competitor } from "@/types";

interface CompetitorLogoProps {
  competitor: Competitor;
  size?: number;
}

export default function CompetitorLogo({
  competitor,
  size = 20,
}: CompetitorLogoProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className="flex items-center justify-center rounded"
        style={{
          width: size,
          height: size,
          backgroundColor: competitor.color + "20",
        }}
      >
        <Server className="text-zinc-400" style={{ width: size * 0.6, height: size * 0.6 }} />
      </div>
    );
  }

  return (
    <img
      src={competitor.logoUrl}
      alt={competitor.name}
      width={size}
      height={size}
      onError={() => setError(true)}
      className="shrink-0"
    />
  );
}

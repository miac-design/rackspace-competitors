"use client";

import React from "react";

interface Dimension {
  label: string;
  rackspace: number;
  competitor: number;
}

interface RadarChartProps {
  dimensions: Dimension[];
  competitorName: string;
}

const MAX_SCORE = 10;
const RINGS = 5;
const CENTER = 200;
const RADIUS = 150;
const LABEL_OFFSET = 28;

function polarToCartesian(angle: number, radius: number): { x: number; y: number } {
  // Start from top (-90 degrees)
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

function buildPolygonPoints(
  values: number[],
  count: number
): string {
  const angleStep = 360 / count;
  return values
    .map((v, i) => {
      const r = (v / MAX_SCORE) * RADIUS;
      const { x, y } = polarToCartesian(i * angleStep, r);
      return `${x},${y}`;
    })
    .join(" ");
}

export default function RadarChart({ dimensions, competitorName }: RadarChartProps) {
  const count = dimensions.length;
  const angleStep = 360 / count;

  const rackspaceValues = dimensions.map((d) => d.rackspace);
  const competitorValues = dimensions.map((d) => d.competitor);

  const rackspacePoints = buildPolygonPoints(rackspaceValues, count);
  const competitorPoints = buildPolygonPoints(competitorValues, count);

  return (
    <div className="w-full max-w-[400px] mx-auto">
      <svg viewBox="0 0 400 440" className="w-full h-auto">
        {/* Background rings */}
        {Array.from({ length: RINGS }, (_, i) => {
          const r = ((i + 1) / RINGS) * RADIUS;
          const points = Array.from({ length: count }, (__, j) => {
            const { x, y } = polarToCartesian(j * angleStep, r);
            return `${x},${y}`;
          }).join(" ");
          return (
            <polygon
              key={`ring-${i}`}
              points={points}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          );
        })}

        {/* Axis lines */}
        {dimensions.map((_, i) => {
          const { x, y } = polarToCartesian(i * angleStep, RADIUS);
          return (
            <line
              key={`axis-${i}`}
              x1={CENTER}
              y1={CENTER}
              x2={x}
              y2={y}
              stroke="#d1d5db"
              strokeWidth="1"
            />
          );
        })}

        {/* Competitor area */}
        <polygon
          points={competitorPoints}
          fill="#3B82F6"
          fillOpacity="0.2"
          stroke="#3B82F6"
          strokeWidth="2"
        />

        {/* Rackspace area */}
        <polygon
          points={rackspacePoints}
          fill="#C8102E"
          fillOpacity="0.2"
          stroke="#C8102E"
          strokeWidth="2"
        />

        {/* Data points - Competitor */}
        {competitorValues.map((v, i) => {
          const r = (v / MAX_SCORE) * RADIUS;
          const { x, y } = polarToCartesian(i * angleStep, r);
          return (
            <circle
              key={`comp-dot-${i}`}
              cx={x}
              cy={y}
              r="4"
              fill="#3B82F6"
              stroke="white"
              strokeWidth="1.5"
            />
          );
        })}

        {/* Data points - Rackspace */}
        {rackspaceValues.map((v, i) => {
          const r = (v / MAX_SCORE) * RADIUS;
          const { x, y } = polarToCartesian(i * angleStep, r);
          return (
            <circle
              key={`rack-dot-${i}`}
              cx={x}
              cy={y}
              r="4"
              fill="#C8102E"
              stroke="white"
              strokeWidth="1.5"
            />
          );
        })}

        {/* Labels */}
        {dimensions.map((dim, i) => {
          const { x, y } = polarToCartesian(i * angleStep, RADIUS + LABEL_OFFSET);
          const angle = i * angleStep;

          let textAnchor: "start" | "middle" | "end" = "middle";
          if (angle > 15 && angle < 165) textAnchor = "start";
          else if (angle > 195 && angle < 345) textAnchor = "end";

          let dy = 0;
          if (angle > 60 && angle < 120) dy = 6;
          else if (angle > 240 && angle < 300) dy = -2;
          else if (angle === 0 || angle === 360) dy = -4;
          else if (angle === 180) dy = 10;

          return (
            <text
              key={`label-${i}`}
              x={x}
              y={y + dy}
              textAnchor={textAnchor}
              className="text-xs fill-gray-600"
              style={{ fontSize: "11px" }}
            >
              {dim.label}
            </text>
          );
        })}

        {/* Legend */}
        <g transform="translate(100, 410)">
          <rect x="0" y="0" width="14" height="14" rx="3" fill="#C8102E" fillOpacity="0.8" />
          <text x="20" y="11" className="fill-gray-700" style={{ fontSize: "12px" }}>
            Rackspace
          </text>
          <rect x="110" y="0" width="14" height="14" rx="3" fill="#3B82F6" fillOpacity="0.8" />
          <text x="130" y="11" className="fill-gray-700" style={{ fontSize: "12px" }}>
            {competitorName}
          </text>
        </g>
      </svg>
    </div>
  );
}

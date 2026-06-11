"use client";

import { ExternalLink, UserCheck } from "lucide-react";
import { Provenance, DataType } from "@/lib/data/types";
import { computeFreshness, STATUS_META, formatReviewedDate } from "@/lib/data/freshness";

// Inline provenance for a single approved fact: source, reviewer, review date,
// and a freshness dot computed from the record's own timestamp.
export default function SourceLine({
  provenance,
  dataType = "positioning",
}: {
  provenance: Provenance;
  dataType?: DataType;
}) {
  const ts = provenance.lastReviewedAt ?? provenance.fetchedAt;
  const fresh = ts ? computeFreshness(dataType, ts) : null;
  const meta = fresh ? STATUS_META[fresh.status] : null;
  const verb = provenance.lastReviewedAt ? "Reviewed" : "Fetched";

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-gray-400">
      {meta && <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />}
      <span className="font-medium text-gray-500">{provenance.source}</span>
      {provenance.approvedBy && (
        <>
          <span className="text-gray-300">·</span>
          <span className="inline-flex items-center gap-1">
            <UserCheck className="h-3 w-3" />
            {provenance.approvedBy}
          </span>
        </>
      )}
      {ts && (
        <>
          <span className="text-gray-300">·</span>
          <span>
            {verb} {formatReviewedDate(ts)}
          </span>
        </>
      )}
      {provenance.sourceUrl && (
        <a
          href={provenance.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 text-gray-400 hover:text-[#C8102E]"
        >
          <ExternalLink className="h-3 w-3" />
        </a>
      )}
    </div>
  );
}

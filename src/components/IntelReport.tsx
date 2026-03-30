"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

interface IntelReportProps {
  content: string;
  isStreaming?: boolean;
}

const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2 className="mt-8 mb-4 text-xl font-bold text-white border-b border-zinc-700 pb-2">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-6 mb-3 text-lg font-semibold text-zinc-200">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-3 text-zinc-300 leading-relaxed">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 space-y-2 text-zinc-300">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 space-y-2 text-zinc-300 list-decimal list-inside">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="flex gap-2">
      <span className="text-[#C8102E] mt-1.5 shrink-0">\u2022</span>
      <span>{children}</span>
    </li>
  ),
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto rounded-lg border border-zinc-700">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-[#C8102E]/10 border-b border-zinc-700">
      {children}
    </thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-left font-semibold text-white">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-zinc-300 border-t border-zinc-800">
      {children}
    </td>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-white">{children}</strong>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-4 border-[#C8102E] pl-4 italic text-zinc-400">
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <code className="block my-4 p-4 rounded-lg bg-zinc-900 text-zinc-300 text-sm overflow-x-auto">
          {children}
        </code>
      );
    }
    return (
      <code className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 text-sm">
        {children}
      </code>
    );
  },
};

export default function IntelReport({ content, isStreaming }: IntelReportProps) {
  if (!content) return null;

  return (
    <div className="rounded-xl border border-zinc-700/50 bg-zinc-900/50 p-6 backdrop-blur">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
      {isStreaming && (
        <span className="inline-block w-2 h-5 bg-[#C8102E] animate-pulse ml-1" />
      )}
    </div>
  );
}

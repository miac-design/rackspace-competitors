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
    <h2 className="mt-8 mb-4 text-xl font-bold text-gray-900 border-b border-gray-100 pb-3">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-6 mb-3 text-base font-semibold text-gray-800">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-3 text-sm text-gray-600 leading-relaxed">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 space-y-2 text-gray-600">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 space-y-2 text-gray-600 list-decimal list-inside">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="flex gap-2 text-sm">
      <span className="text-[#C8102E] mt-1.5 shrink-0">&bull;</span>
      <span>{children}</span>
    </li>
  ),
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto rounded-xl border border-gray-100">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-gray-50/80 border-b border-gray-100">
      {children}
    </thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-sm text-gray-600 border-t border-gray-50">
      {children}
    </td>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-800">{children}</strong>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-3 border-[#C8102E] pl-4 italic text-gray-500 bg-gray-50/50 py-3 rounded-r-xl">
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <code className="block my-4 p-4 rounded-xl bg-gray-50 text-gray-700 text-sm overflow-x-auto border border-gray-100">
          {children}
        </code>
      );
    }
    return (
      <code className="px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-700 text-xs font-medium">
        {children}
      </code>
    );
  },
};

export default function IntelReport({ content, isStreaming }: IntelReportProps) {
  if (!content) return null;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
      {isStreaming && (
        <span className="inline-block w-1.5 h-5 bg-[#C8102E] animate-pulse rounded-full ml-1" />
      )}
    </div>
  );
}

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
    <h2 className="mt-8 mb-4 text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-6 mb-3 text-lg font-semibold text-gray-800">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-3 text-gray-700 leading-relaxed">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 space-y-2 text-gray-700">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 space-y-2 text-gray-700 list-decimal list-inside">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="flex gap-2">
      <span className="text-[#C8102E] mt-1.5 shrink-0">&bull;</span>
      <span>{children}</span>
    </li>
  ),
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-[#C8102E]/5 border-b border-gray-200">
      {children}
    </thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-left font-semibold text-gray-900">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-gray-700 border-t border-gray-100">
      {children}
    </td>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-900">{children}</strong>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-4 border-[#C8102E] pl-4 italic text-gray-600 bg-gray-50 py-2 rounded-r-lg">
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <code className="block my-4 p-4 rounded-lg bg-gray-50 text-gray-700 text-sm overflow-x-auto border border-gray-200">
          {children}
        </code>
      );
    }
    return (
      <code className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-700 text-sm">
        {children}
      </code>
    );
  },
};

export default function IntelReport({ content, isStreaming }: IntelReportProps) {
  if (!content) return null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
      {isStreaming && (
        <span className="inline-block w-2 h-5 bg-[#C8102E] animate-pulse ml-1" />
      )}
    </div>
  );
}

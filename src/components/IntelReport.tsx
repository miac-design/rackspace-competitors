"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { CheckCircle2, XCircle, AlertTriangle, ShieldCheck, Lock, Zap, Star } from "lucide-react";

interface IntelReportProps {
  content: string;
  isStreaming?: boolean;
}

// Map emoji/unicode symbols to Lucide icons
const ICON_MAP: [RegExp, React.ReactNode][] = [
  [/✅|☑️|✔️|✔|✓/g, <CheckCircle2 key="check" className="inline h-4 w-4 text-green-600" />],
  [/❌|✗|✘/g, <XCircle key="x" className="inline h-4 w-4 text-red-500" />],
  [/⚠️|⚠/g, <AlertTriangle key="warn" className="inline h-4 w-4 text-amber-500" />],
  [/🔒|🔐/g, <Lock key="lock" className="inline h-4 w-4 text-gray-500" />],
  [/🛡️|🛡/g, <ShieldCheck key="shield" className="inline h-4 w-4 text-blue-500" />],
  [/⚡|🔥/g, <Zap key="zap" className="inline h-4 w-4 text-amber-500" />],
  [/⭐|🌟|💡/g, <Star key="star" className="inline h-4 w-4 text-amber-500" />],
];

function getTextContent(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getTextContent).join("");
  if (React.isValidElement(node)) {
    const props = node.props as Record<string, unknown>;
    if (props.children) return getTextContent(props.children as React.ReactNode);
  }
  return "";
}

function replaceEmoji(children: React.ReactNode): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (typeof child === "string") {
      // Check if string contains any emoji
      const hasEmoji = ICON_MAP.some(([pattern]) => {
        pattern.lastIndex = 0;
        return pattern.test(child);
      });
      if (!hasEmoji) return child;

      // Split and replace emoji with icons
      const parts: React.ReactNode[] = [];
      let remaining = child;
      let key = 0;

      for (const [pattern, icon] of ICON_MAP) {
        pattern.lastIndex = 0;
        const newParts: React.ReactNode[] = [];
        for (const part of typeof remaining === "string" ? [remaining] : []) {
          let lastIndex = 0;
          pattern.lastIndex = 0;
          let match;
          while ((match = pattern.exec(part)) !== null) {
            if (match.index > lastIndex) {
              newParts.push(part.slice(lastIndex, match.index));
            }
            newParts.push(React.cloneElement(icon as React.ReactElement, { key: `icon-${key++}` }));
            lastIndex = match.index + match[0].length;
          }
          if (lastIndex < part.length) {
            newParts.push(part.slice(lastIndex));
          }
        }
        if (newParts.length > 0) {
          remaining = newParts as unknown as string;
        }
      }

      if (Array.isArray(remaining)) {
        parts.push(...remaining);
      } else {
        parts.push(remaining);
      }

      return <>{parts}</>;
    }
    if (React.isValidElement(child)) {
      const props = child.props as Record<string, unknown>;
      if (props.children) {
        return React.cloneElement(child, {}, replaceEmoji(props.children as React.ReactNode));
      }
    }
    return child;
  });
}

const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2 className="mt-8 mb-4 text-xl font-bold text-gray-900 border-b border-gray-100 pb-3">
      {replaceEmoji(children)}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-6 mb-3 text-base font-semibold text-gray-800">
      {replaceEmoji(children)}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-3 text-sm text-gray-600 leading-relaxed">{replaceEmoji(children)}</p>
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
      <span>{replaceEmoji(children)}</span>
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
      {replaceEmoji(children)}
    </th>
  ),
  td: ({ children }) => {
    const text = getTextContent(children).trim();
    let icon: React.ReactNode = null;
    if (/^Yes\b/i.test(text)) {
      icon = <CheckCircle2 className="inline h-4 w-4 text-green-600 mr-1.5 shrink-0" />;
    } else if (/^No\b/i.test(text)) {
      icon = <XCircle className="inline h-4 w-4 text-red-500 mr-1.5 shrink-0" />;
    } else if (/^Partial\b/i.test(text) || /^Limited\b/i.test(text)) {
      icon = <AlertTriangle className="inline h-4 w-4 text-amber-500 mr-1.5 shrink-0" />;
    }
    return (
      <td className="px-4 py-3 text-sm text-gray-600 border-t border-gray-50">
        {icon && <span className="inline-flex items-center">{icon}</span>}
        {replaceEmoji(children)}
      </td>
    );
  },
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-800">{replaceEmoji(children)}</strong>
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

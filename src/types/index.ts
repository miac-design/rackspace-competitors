// Re-export the domain Competitor so existing imports keep working, and keep
// the chat message shape used by Engine B.
export type { Competitor } from "@/lib/data/types";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface Competitor {
  slug: string;
  name: string;
  logoUrl: string;
  color: string;
}

export interface ServiceArea {
  slug: string;
  name: string;
  icon: string; // Lucide icon name
}

export type OutputType =
  | "full"
  | "comparison"
  | "strengths"
  | "weaknesses"
  | "objections"
  | "pricing";

export interface OutputTypeOption {
  slug: OutputType;
  name: string;
  description: string;
}

export type IntelRequest =
  | { mode: "chat"; message: string; history: ChatMessage[] }
  | {
      mode: "structured";
      competitors: string[];
      serviceAreas: string[];
      outputType: OutputType;
      context?: string;
    };

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface IntelResponse {
  content: string;
}

import { ServiceArea } from "@/types";

export const SERVICE_AREAS: ServiceArea[] = [
  { slug: "compute", name: "Compute & VMs", icon: "Cpu" },
  { slug: "kubernetes", name: "Kubernetes & Containers", icon: "Container" },
  { slug: "databases", name: "Databases", icon: "Database" },
  { slug: "security", name: "Security & Compliance", icon: "Shield" },
  { slug: "managed-services", name: "Managed Services", icon: "Headset" },
  { slug: "private-cloud", name: "Private Cloud", icon: "CloudCog" },
  { slug: "bare-metal", name: "Bare Metal", icon: "Server" },
  { slug: "networking", name: "Networking & CDN", icon: "Network" },
  { slug: "storage", name: "Storage & Backup", icon: "HardDrive" },
  { slug: "devops", name: "DevOps & CI/CD", icon: "GitBranch" },
  { slug: "ai-ml", name: "AI & Machine Learning", icon: "Brain" },
  { slug: "migration", name: "Cloud Migration", icon: "MoveRight" },
];

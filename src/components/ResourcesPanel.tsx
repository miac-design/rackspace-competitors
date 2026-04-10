"use client";

import { useMemo, useState } from "react";
import { BookOpen, ChevronUp, ChevronDown, ExternalLink } from "lucide-react";

interface ResourceItem {
  title: string;
  url: string;
}

interface ResourceSection {
  category: string;
  items: ResourceItem[];
}

const RACKSPACE_RESOURCES: ResourceItem[] = [
  { title: "Rackspace Technology Solutions", url: "https://www.rackspace.com/solutions" },
  { title: "Managed Cloud Services", url: "https://www.rackspace.com/managed-cloud" },
  { title: "Rackspace Kubernetes", url: "https://www.rackspace.com/cloud/kubernetes" },
  { title: "Private Cloud Solutions", url: "https://www.rackspace.com/cloud/private" },
  { title: "Compliance & Security", url: "https://www.rackspace.com/security" },
  { title: "Fanatical Experience\u2122", url: "https://www.rackspace.com/why-rackspace" },
];

const COMPETITOR_RESOURCES: Record<string, ResourceItem[]> = {
  vultr: [
    { title: "Vultr - Official Site", url: "https://www.vultr.com" },
    { title: "Vultr Pricing", url: "https://www.vultr.com/pricing" },
  ],
  ovhcloud: [
    { title: "OVHcloud - Official Site", url: "https://www.ovhcloud.com" },
    { title: "OVHcloud Pricing", url: "https://www.ovhcloud.com/en/bare-metal/prices" },
  ],
  digitalocean: [
    { title: "DigitalOcean - Official Site", url: "https://www.digitalocean.com" },
    { title: "DigitalOcean Pricing", url: "https://www.digitalocean.com/pricing" },
  ],
  linode: [
    { title: "Linode (Akamai) - Official Site", url: "https://www.linode.com" },
    { title: "Akamai Cloud Pricing", url: "https://www.linode.com/pricing" },
  ],
  hetzner: [
    { title: "Hetzner - Official Site", url: "https://www.hetzner.com" },
    { title: "Hetzner Pricing", url: "https://www.hetzner.com/cloud" },
  ],
  aws: [
    { title: "AWS - Official Site", url: "https://aws.amazon.com" },
    { title: "AWS Pricing", url: "https://aws.amazon.com/pricing" },
  ],
  gcp: [
    { title: "Google Cloud - Official Site", url: "https://cloud.google.com" },
    { title: "Google Cloud Pricing", url: "https://cloud.google.com/pricing" },
  ],
  equinix: [
    { title: "Equinix Metal - Official Site", url: "https://deploy.equinix.com" },
    { title: "Equinix Metal Pricing", url: "https://deploy.equinix.com/metal/pricing" },
  ],
  azure: [
    { title: "Microsoft Azure - Official Site", url: "https://azure.microsoft.com" },
    { title: "Azure Pricing", url: "https://azure.microsoft.com/en-us/pricing" },
  ],
  ibmcloud: [
    { title: "IBM Cloud - Official Site", url: "https://www.ibm.com/cloud" },
    { title: "IBM Cloud Pricing", url: "https://www.ibm.com/cloud/pricing" },
  ],
  oci: [
    { title: "Oracle Cloud - Official Site", url: "https://www.oracle.com/cloud" },
    { title: "Oracle Cloud Pricing", url: "https://www.oracle.com/cloud/pricing" },
  ],
  cloudflare: [
    { title: "Cloudflare - Official Site", url: "https://www.cloudflare.com" },
    { title: "Cloudflare Pricing", url: "https://www.cloudflare.com/plans" },
  ],
  leaseweb: [
    { title: "Leaseweb - Official Site", url: "https://www.leaseweb.com" },
    { title: "Leaseweb Pricing", url: "https://www.leaseweb.com/cloud/public-cloud" },
  ],
};

const GENERAL_RESEARCH: ResourceItem[] = [
  { title: "G2 Cloud Comparison Reviews", url: "https://www.g2.com/categories/cloud-platform-suites" },
  { title: "Gartner Cloud IaaS Reviews", url: "https://www.gartner.com/reviews/market/cloud-infrastructure-and-platform-services" },
];

const SALES_ENABLEMENT: ResourceItem[] = [
  { title: "Rackspace Case Studies", url: "https://www.rackspace.com/customer-stories" },
  { title: "Rackspace Blog - Cloud Insights", url: "https://www.rackspace.com/blog" },
  { title: "Rackspace Data Sheet Library", url: "https://www.rackspace.com/resources" },
  { title: "Cloud TCO Calculator", url: "https://www.rackspace.com/resources" },
];

interface ResourcesPanelProps {
  selectedCompetitor?: string;
}

export default function ResourcesPanel({ selectedCompetitor }: ResourcesPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sections = useMemo<ResourceSection[]>(() => {
    const competitorItems: ResourceItem[] = [
      ...(selectedCompetitor && COMPETITOR_RESOURCES[selectedCompetitor]
        ? COMPETITOR_RESOURCES[selectedCompetitor]
        : []),
      ...GENERAL_RESEARCH,
    ];

    return [
      { category: "Rackspace Product Resources", items: RACKSPACE_RESOURCES },
      { category: "Competitor Research", items: competitorItems },
      { category: "Sales Enablement", items: SALES_ENABLEMENT },
    ];
  }, [selectedCompetitor]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="flex justify-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 rounded-t-xl bg-white border border-b-0 border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-500 hover:text-[#C8102E] transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <BookOpen className="h-4 w-4" />
          Resources & References
          {isOpen ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
        </button>
      </div>

      {isOpen && (
        <div className="bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] max-h-80 overflow-y-auto animate-fade-in-up">
          <div className="mx-auto max-w-7xl px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sections.map((section) => (
                <div key={section.category}>
                  <h3 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest">
                    {section.category}
                  </h3>
                  <ul className="space-y-2.5">
                    {section.items.map((item) => (
                      <li key={item.title}>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-2 text-sm text-gray-500 hover:text-[#C8102E] transition-colors"
                        >
                          <ExternalLink className="h-3 w-3 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

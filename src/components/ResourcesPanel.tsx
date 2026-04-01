"use client";

import { useState } from "react";
import { BookOpen, ChevronUp, ChevronDown, ExternalLink } from "lucide-react";

const RESOURCES = [
  {
    category: "Rackspace Product Resources",
    items: [
      { title: "Rackspace Technology Solutions", url: "https://www.rackspace.com/solutions" },
      { title: "Managed Cloud Services", url: "https://www.rackspace.com/managed-cloud" },
      { title: "Rackspace Kubernetes", url: "https://www.rackspace.com/cloud/kubernetes" },
      { title: "Private Cloud Solutions", url: "https://www.rackspace.com/cloud/private" },
      { title: "Compliance & Security", url: "https://www.rackspace.com/security" },
      { title: "Fanatical Experience™", url: "https://www.rackspace.com/why-rackspace" },
    ],
  },
  {
    category: "Competitor Research",
    items: [
      { title: "Vultr - Official Site", url: "https://www.vultr.com" },
      { title: "Vultr Pricing", url: "https://www.vultr.com/pricing" },
      { title: "OVHcloud - Official Site", url: "https://www.ovhcloud.com" },
      { title: "OVHcloud Pricing", url: "https://www.ovhcloud.com/en/bare-metal/prices" },
      { title: "G2 Cloud Comparison Reviews", url: "https://www.g2.com/categories/cloud-platform-suites" },
      { title: "Gartner Cloud IaaS Reviews", url: "https://www.gartner.com/reviews/market/cloud-infrastructure-and-platform-services" },
    ],
  },
  {
    category: "Sales Enablement",
    items: [
      { title: "Rackspace Case Studies", url: "https://www.rackspace.com/customer-stories" },
      { title: "Rackspace Blog - Cloud Insights", url: "https://www.rackspace.com/blog" },
      { title: "Rackspace Data Sheet Library", url: "https://www.rackspace.com/resources" },
      { title: "Cloud TCO Calculator", url: "https://www.rackspace.com/resources" },
    ],
  },
];

export default function ResourcesPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mx-auto flex items-center gap-2 rounded-t-lg bg-white border border-b-0 border-gray-200 px-5 py-2 text-sm font-medium text-gray-700 hover:text-[#C8102E] transition-colors shadow-sm"
        style={{ marginLeft: "50%", transform: "translateX(-50%)" }}
      >
        <BookOpen className="h-4 w-4" />
        Resources & References
        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
      </button>

      {isOpen && (
        <div className="bg-white border-t border-gray-200 shadow-lg max-h-80 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {RESOURCES.map((section) => (
                <div key={section.category}>
                  <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                    {section.category}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item.title}>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#C8102E] transition-colors"
                        >
                          <ExternalLink className="h-3 w-3 shrink-0" />
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

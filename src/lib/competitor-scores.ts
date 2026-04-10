// Competitive scoring data for visual charts
// Scores are 0-10 based on publicly available positioning

export interface CompetitorScores {
  dimensions: { label: string; rackspace: number; competitor: number }[];
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  verdict: string;
  rackspaceOverall: number;
  competitorOverall: number;
}

const SCORES: Record<string, CompetitorScores> = {
  vultr: {
    dimensions: [
      { label: "Managed Services", rackspace: 10, competitor: 2 },
      { label: "Enterprise Support", rackspace: 10, competitor: 3 },
      { label: "Compliance", rackspace: 9, competitor: 4 },
      { label: "Multi-Cloud", rackspace: 9, competitor: 2 },
      { label: "Pricing", rackspace: 5, competitor: 9 },
      { label: "Global Reach", rackspace: 8, competitor: 7 },
      { label: "Bare Metal", rackspace: 8, competitor: 6 },
      { label: "Developer Experience", rackspace: 6, competitor: 8 },
    ],
    swot: {
      strengths: [
        "Fanatical Experience\u2122 \u2014 unmatched 24/7 managed services",
        "Full-stack management: OS, DB, K8s, security",
        "Enterprise compliance portfolio (SOC, PCI, HIPAA, FedRAMP)",
        "Multi-cloud expertise across AWS, Azure, GCP",
        "25+ years enterprise track record",
      ],
      weaknesses: [
        "Higher price point than Vultr on raw infrastructure",
        "Less self-service/developer-focused tooling",
        "Smaller number of data center locations",
        "Can be perceived as legacy by cloud-native buyers",
      ],
      opportunities: [
        "Vultr customers outgrowing self-service as they scale",
        "Regulated industries needing compliance Vultr can't provide",
        "Companies burned by 3 AM outages without managed support",
        "Hybrid/multi-cloud deals where Vultr is single-cloud",
      ],
      threats: [
        "Vultr's aggressive pricing attracts budget-conscious buyers",
        "Developer preference for self-service simplicity",
        "Perception that managed services are unnecessary overhead",
        "Vultr expanding enterprise features over time",
      ],
    },
    verdict: "Rackspace wins on managed services, support, and compliance. Vultr wins on price and developer simplicity. For enterprise and regulated workloads, Rackspace is the clear choice.",
    rackspaceOverall: 8.1,
    competitorOverall: 5.1,
  },
  ovhcloud: {
    dimensions: [
      { label: "Managed Services", rackspace: 10, competitor: 4 },
      { label: "Enterprise Support", rackspace: 10, competitor: 5 },
      { label: "Compliance", rackspace: 9, competitor: 7 },
      { label: "Multi-Cloud", rackspace: 9, competitor: 3 },
      { label: "Pricing", rackspace: 5, competitor: 9 },
      { label: "Global Reach", rackspace: 8, competitor: 6 },
      { label: "Bare Metal", rackspace: 8, competitor: 9 },
      { label: "Data Sovereignty", rackspace: 7, competitor: 9 },
    ],
    swot: {
      strengths: [
        "Fanatical Experience\u2122 with dedicated account teams",
        "Strong US market presence and FedRAMP authorization",
        "Multi-cloud management across all major providers",
        "Full-stack managed services depth",
        "Enterprise track record with Fortune 500 companies",
      ],
      weaknesses: [
        "Higher infrastructure pricing than OVHcloud",
        "Smaller EU data center footprint",
        "Less competitive on raw bare metal pricing",
        "OVHcloud's SecNumCloud appeals to EU sovereignty buyers",
      ],
      opportunities: [
        "OVHcloud customers needing US compliance (HIPAA, FedRAMP)",
        "Concerns from OVHcloud's 2021 Strasbourg data center fire",
        "Companies needing multi-cloud beyond OVHcloud's ecosystem",
        "Enterprise buyers wanting dedicated managed support",
      ],
      threats: [
        "OVHcloud's extremely competitive bare metal pricing",
        "EU data sovereignty regulations favoring EU-based providers",
        "OVHcloud building enterprise credibility in US market",
        "Predictable pricing model (no egress fees) appeals to customers",
      ],
    },
    verdict: "Rackspace leads on managed services, US compliance, and multi-cloud. OVHcloud leads on price and EU sovereignty. For US enterprise workloads needing operational support, Rackspace wins.",
    rackspaceOverall: 8.3,
    competitorOverall: 6.5,
  },
  digitalocean: {
    dimensions: [
      { label: "Managed Services", rackspace: 10, competitor: 4 },
      { label: "Enterprise Support", rackspace: 10, competitor: 4 },
      { label: "Compliance", rackspace: 9, competitor: 5 },
      { label: "Multi-Cloud", rackspace: 9, competitor: 2 },
      { label: "Pricing", rackspace: 5, competitor: 8 },
      { label: "Global Reach", rackspace: 8, competitor: 6 },
      { label: "Developer Experience", rackspace: 6, competitor: 9 },
      { label: "SMB Friendliness", rackspace: 6, competitor: 9 },
    ],
    swot: {
      strengths: [
        "Full-stack managed services vs DigitalOcean self-service",
        "24/7/365 dedicated account teams and expert support",
        "Enterprise-grade compliance certifications",
        "Multi-cloud management capabilities",
        "Bare metal and private cloud options",
      ],
      weaknesses: [
        "Higher pricing than DigitalOcean's simple plans",
        "Less intuitive self-service UI for developers",
        "Perceived as enterprise-heavy for smaller teams",
        "DigitalOcean's marketplace and tutorials ecosystem",
      ],
      opportunities: [
        "DigitalOcean customers scaling beyond basic cloud needs",
        "Startups growing into compliance requirements",
        "Companies needing managed Kubernetes (not just hosted)",
        "Hybrid cloud deals DigitalOcean can't serve",
      ],
      threats: [
        "DigitalOcean's simplicity and developer loyalty",
        "Strong brand with startup and SMB market",
        "Expanding managed database and K8s offerings",
        "Competitive pricing with predictable billing",
      ],
    },
    verdict: "Rackspace excels at managed services and enterprise needs. DigitalOcean dominates developer experience and simplicity. Target DigitalOcean customers outgrowing self-service.",
    rackspaceOverall: 7.9,
    competitorOverall: 5.9,
  },
  linode: {
    dimensions: [
      { label: "Managed Services", rackspace: 10, competitor: 3 },
      { label: "Enterprise Support", rackspace: 10, competitor: 5 },
      { label: "Compliance", rackspace: 9, competitor: 5 },
      { label: "Multi-Cloud", rackspace: 9, competitor: 4 },
      { label: "Pricing", rackspace: 5, competitor: 8 },
      { label: "Global Reach", rackspace: 8, competitor: 8 },
      { label: "Edge/CDN", rackspace: 6, competitor: 9 },
      { label: "Developer Experience", rackspace: 6, competitor: 7 },
    ],
    swot: {
      strengths: [
        "Deep managed services vs Akamai's infrastructure focus",
        "Full compliance portfolio for regulated industries",
        "Multi-cloud strategy across all major providers",
        "Dedicated account teams and Fanatical Experience\u2122",
        "Private cloud and bare metal options",
      ],
      weaknesses: [
        "Akamai's edge and CDN network is unmatched",
        "Higher infrastructure pricing",
        "Linode has strong developer community loyalty",
        "Less edge computing capability",
      ],
      opportunities: [
        "Linode customers needing managed services post-Akamai acquisition",
        "Confusion during Akamai/Linode integration phase",
        "Companies needing more than just compute + edge",
        "Regulated workloads requiring compliance expertise",
      ],
      threats: [
        "Akamai's massive global edge network adds value to Linode",
        "Combined Akamai+Linode offering becoming more enterprise-ready",
        "Competitive pricing maintained from Linode era",
        "Growing security and compliance capabilities",
      ],
    },
    verdict: "Rackspace wins on managed services and compliance depth. Linode/Akamai wins on edge computing and CDN. Target customers needing managed operations, not just infrastructure.",
    rackspaceOverall: 7.9,
    competitorOverall: 6.1,
  },
  hetzner: {
    dimensions: [
      { label: "Managed Services", rackspace: 10, competitor: 2 },
      { label: "Enterprise Support", rackspace: 10, competitor: 3 },
      { label: "Compliance", rackspace: 9, competitor: 4 },
      { label: "Multi-Cloud", rackspace: 9, competitor: 1 },
      { label: "Pricing", rackspace: 4, competitor: 10 },
      { label: "Global Reach", rackspace: 8, competitor: 4 },
      { label: "Bare Metal", rackspace: 8, competitor: 8 },
      { label: "Value for Money", rackspace: 6, competitor: 10 },
    ],
    swot: {
      strengths: [
        "Full managed services stack \u2014 Hetzner is purely self-service",
        "Global data center presence vs Hetzner's EU-only footprint",
        "Enterprise compliance portfolio (FedRAMP, HIPAA, PCI)",
        "24/7 expert support with dedicated account teams",
        "Multi-cloud expertise across all major providers",
      ],
      weaknesses: [
        "Significantly higher pricing than Hetzner",
        "Hetzner's value proposition is extremely strong for cost-sensitive buyers",
        "Cannot match Hetzner on raw price-per-performance",
        "Perceived as expensive when compared directly on specs",
      ],
      opportunities: [
        "Hetzner customers needing compliance certifications",
        "EU companies expanding to US needing local compliance",
        "Businesses requiring 24/7 managed operations",
        "Companies that tried self-managing on Hetzner and failed",
      ],
      threats: [
        "Hetzner's pricing is 60-80% cheaper on equivalent specs",
        "Growing reputation among developers and startups",
        "Expanding cloud offerings beyond just dedicated servers",
        "Strong bare metal portfolio at fraction of the cost",
      ],
    },
    verdict: "Rackspace wins decisively on managed services, compliance, and global reach. Hetzner wins massively on price. Never compete on price with Hetzner \u2014 sell the managed services story.",
    rackspaceOverall: 8.0,
    competitorOverall: 5.3,
  },
  aws: {
    dimensions: [
      { label: "Managed Services", rackspace: 9, competitor: 7 },
      { label: "Personal Support", rackspace: 10, competitor: 5 },
      { label: "Compliance", rackspace: 9, competitor: 10 },
      { label: "Service Breadth", rackspace: 6, competitor: 10 },
      { label: "Pricing Simplicity", rackspace: 7, competitor: 3 },
      { label: "Multi-Cloud", rackspace: 9, competitor: 3 },
      { label: "Cost Optimization", rackspace: 8, competitor: 5 },
      { label: "Ease of Management", rackspace: 8, competitor: 4 },
    ],
    swot: {
      strengths: [
        "Rackspace manages AWS FOR you \u2014 certified AWS partner",
        "Dedicated human support vs AWS's tiered/automated model",
        "Multi-cloud flexibility \u2014 not locked into AWS alone",
        "Cost optimization expertise saves 20-40% on AWS bills",
        "Simpler pricing and operational model",
      ],
      weaknesses: [
        "AWS has broadest service catalog in the industry",
        "AWS brand recognition and market leadership",
        "AWS's own managed services (RDS, EKS, etc.) are improving",
        "Some customers prefer direct AWS relationship",
      ],
      opportunities: [
        "AWS customers drowning in complexity and rising costs",
        "Companies needing multi-cloud strategy beyond AWS",
        "Customers frustrated with AWS support quality/speed",
        "Cost optimization \u2014 most AWS customers overspend 30%+",
      ],
      threats: [
        "AWS continuously improving managed service offerings",
        "AWS Enterprise Support becoming more hands-on",
        "Perception that going through Rackspace adds a layer",
        "AWS's massive ecosystem and marketplace",
      ],
    },
    verdict: "Position Rackspace as the expert layer ON TOP of AWS. We don't replace AWS \u2014 we make it manageable, cost-effective, and operationally excellent.",
    rackspaceOverall: 8.3,
    competitorOverall: 5.9,
  },
  gcp: {
    dimensions: [
      { label: "Managed Services", rackspace: 9, competitor: 7 },
      { label: "Personal Support", rackspace: 10, competitor: 5 },
      { label: "Compliance", rackspace: 9, competitor: 9 },
      { label: "Service Breadth", rackspace: 6, competitor: 9 },
      { label: "Pricing Simplicity", rackspace: 7, competitor: 5 },
      { label: "Multi-Cloud", rackspace: 9, competitor: 4 },
      { label: "AI/ML Capability", rackspace: 5, competitor: 10 },
      { label: "Ease of Management", rackspace: 8, competitor: 5 },
    ],
    swot: {
      strengths: [
        "Rackspace is a certified Google Cloud partner",
        "Dedicated human support vs Google's notoriously weak support",
        "Multi-cloud management \u2014 GCP + AWS + Azure under one roof",
        "Operational expertise Google doesn't provide",
        "Simpler cost management and billing",
      ],
      weaknesses: [
        "Google Cloud leads in AI/ML and data analytics",
        "BigQuery and Vertex AI have no Rackspace equivalent",
        "Google's networking infrastructure is unmatched",
        "Growing Kubernetes ecosystem (GKE is the gold standard)",
      ],
      opportunities: [
        "Google Cloud customers frustrated by poor support quality",
        "Companies needing multi-cloud beyond just GCP",
        "Businesses wanting managed GCP without Google's complexity",
        "Enterprises needing compliance consulting on GCP",
      ],
      threats: [
        "Google Cloud investing heavily in enterprise support",
        "AI/ML momentum driving cloud adoption to GCP",
        "GKE Autopilot reducing need for K8s managed services",
        "Google Cloud's aggressive pricing and sustained-use discounts",
      ],
    },
    verdict: "Rackspace wins on managed support and multi-cloud. Google Cloud wins on AI/ML and data analytics. Position Rackspace as the operational partner that makes GCP enterprise-ready.",
    rackspaceOverall: 7.9,
    competitorOverall: 6.8,
  },
  equinix: {
    dimensions: [
      { label: "Managed Services", rackspace: 10, competitor: 5 },
      { label: "Enterprise Support", rackspace: 9, competitor: 7 },
      { label: "Compliance", rackspace: 9, competitor: 8 },
      { label: "Cloud Services", rackspace: 9, competitor: 5 },
      { label: "Colocation", rackspace: 6, competitor: 10 },
      { label: "Interconnection", rackspace: 6, competitor: 10 },
      { label: "Bare Metal", rackspace: 8, competitor: 9 },
      { label: "Global Reach", rackspace: 8, competitor: 10 },
    ],
    swot: {
      strengths: [
        "Full managed cloud services vs Equinix's infrastructure focus",
        "Multi-cloud management and optimization",
        "24/7 application and OS-level managed support",
        "Simpler operational model \u2014 one partner for everything",
        "Cloud migration and modernization expertise",
      ],
      weaknesses: [
        "Equinix has 260+ data centers \u2014 unmatched footprint",
        "Equinix Fabric interconnection is industry-leading",
        "Cannot match Equinix on colocation and peering",
        "Equinix Metal (bare metal as a service) is very competitive",
      ],
      opportunities: [
        "Equinix customers needing managed services on top of colo",
        "Companies wanting to move from colo to managed cloud",
        "Hybrid strategies combining Rackspace managed + Equinix colo",
        "Cloud migration from Equinix bare metal to managed platforms",
      ],
      threats: [
        "Equinix expanding managed/cloud offerings",
        "Enterprise loyalty to Equinix's interconnection ecosystem",
        "Equinix Metal growing in bare metal as a service space",
        "Strong financial position and brand in enterprise",
      ],
    },
    verdict: "Different strengths: Rackspace for managed cloud operations, Equinix for colocation and interconnection. Can be complementary rather than purely competitive.",
    rackspaceOverall: 8.1,
    competitorOverall: 8.0,
  },
  azure: {
    dimensions: [
      { label: "Managed Services", rackspace: 9, competitor: 7 },
      { label: "Personal Support", rackspace: 10, competitor: 6 },
      { label: "Compliance", rackspace: 9, competitor: 10 },
      { label: "Service Breadth", rackspace: 6, competitor: 10 },
      { label: "Pricing Simplicity", rackspace: 7, competitor: 4 },
      { label: "Multi-Cloud", rackspace: 9, competitor: 3 },
      { label: "Hybrid Cloud", rackspace: 8, competitor: 9 },
      { label: "Ease of Management", rackspace: 8, competitor: 5 },
    ],
    swot: {
      strengths: [
        "Rackspace manages Azure FOR you — certified Azure Expert MSP partner",
        "Dedicated human support vs Azure's tiered/ticket-based model",
        "Multi-cloud flexibility — not locked into Azure alone",
        "Cost optimization expertise saves 20-40% on Azure bills",
        "Simpler operational model with single point of accountability",
      ],
      weaknesses: [
        "Azure has massive enterprise installed base via Microsoft EA agreements",
        "Azure's tight integration with Microsoft 365 and Active Directory",
        "Azure's own managed services (Azure SQL, AKS) are maturing",
        "Some customers prefer direct Microsoft relationship for licensing",
      ],
      opportunities: [
        "Azure customers struggling with complexity and cost overruns",
        "Companies needing multi-cloud beyond just Azure",
        "Customers frustrated with Azure support quality and response times",
        "Cost optimization — most Azure customers overspend 25-35%",
      ],
      threats: [
        "Azure continuously improving managed and AI offerings",
        "Deep enterprise integration with Windows Server, SQL Server, and .NET",
        "Azure Arc extending hybrid/multi-cloud management capabilities",
        "Microsoft's aggressive enterprise sales motion and bundling",
      ],
    },
    verdict: "Position Rackspace as the expert operational layer ON TOP of Azure. We don't replace Azure — we make it manageable, cost-effective, and operationally excellent. Strong play against Azure's notoriously complex billing and management.",
    rackspaceOverall: 8.3,
    competitorOverall: 6.3,
  },
  ibmcloud: {
    dimensions: [
      { label: "Managed Services", rackspace: 9, competitor: 8 },
      { label: "Enterprise Support", rackspace: 9, competitor: 8 },
      { label: "Compliance", rackspace: 9, competitor: 9 },
      { label: "Multi-Cloud", rackspace: 9, competitor: 6 },
      { label: "Pricing", rackspace: 6, competitor: 5 },
      { label: "Bare Metal", rackspace: 8, competitor: 8 },
      { label: "AI/ML Capability", rackspace: 5, competitor: 8 },
      { label: "Ease of Management", rackspace: 8, competitor: 5 },
    ],
    swot: {
      strengths: [
        "Broader multi-cloud expertise — AWS, Azure, GCP, not just one ecosystem",
        "More agile and responsive than IBM's large-enterprise bureaucracy",
        "Fanatical Experience™ vs IBM's often impersonal support model",
        "Simpler pricing without IBM's complex licensing structure",
        "Faster time to deployment and migration execution",
      ],
      weaknesses: [
        "IBM has watsonx and strong AI/ML portfolio",
        "IBM's deep legacy enterprise relationships (mainframe, middleware)",
        "IBM Consulting arm provides end-to-end transformation services",
        "IBM Cloud Satellite offers strong hybrid/edge capabilities",
      ],
      opportunities: [
        "IBM Cloud customers frustrated by complexity and slow innovation",
        "Companies modernizing off IBM legacy infrastructure",
        "Businesses wanting multi-cloud without IBM lock-in",
        "Customers unhappy with IBM's high pricing and rigid contracts",
      ],
      threats: [
        "IBM's acquisition of Red Hat strengthens hybrid cloud story",
        "Deep enterprise relationships and long-term contracts",
        "IBM watsonx gaining AI/ML traction in enterprise",
        "IBM Consulting's ability to bundle cloud with transformation services",
      ],
    },
    verdict: "Rackspace wins on multi-cloud flexibility, support quality, and operational agility. IBM wins on AI/ML (watsonx), legacy enterprise relationships, and hybrid via Red Hat. Target IBM customers frustrated by complexity and slow pace of innovation.",
    rackspaceOverall: 7.9,
    competitorOverall: 7.1,
  },
  oci: {
    dimensions: [
      { label: "Managed Services", rackspace: 10, competitor: 6 },
      { label: "Enterprise Support", rackspace: 9, competitor: 7 },
      { label: "Compliance", rackspace: 9, competitor: 9 },
      { label: "Multi-Cloud", rackspace: 9, competitor: 4 },
      { label: "Pricing", rackspace: 5, competitor: 8 },
      { label: "Database", rackspace: 6, competitor: 10 },
      { label: "Bare Metal", rackspace: 8, competitor: 8 },
      { label: "Ease of Management", rackspace: 8, competitor: 5 },
    ],
    swot: {
      strengths: [
        "Multi-cloud management — not locked into Oracle's ecosystem",
        "Fanatical Experience™ with dedicated account teams",
        "Full-stack managed services beyond just database workloads",
        "No aggressive licensing tactics or vendor lock-in pressure",
        "Simpler pricing without Oracle's complex license metrics",
      ],
      weaknesses: [
        "Oracle Autonomous Database is unmatched for Oracle workloads",
        "OCI's aggressive pricing undercuts on compute and networking",
        "Oracle Exadata Cloud Service for high-performance database needs",
        "Strong appeal to existing Oracle Database/ERP customers",
      ],
      opportunities: [
        "Companies wanting to reduce Oracle dependency and licensing costs",
        "Oracle customers needing multi-cloud beyond just OCI",
        "Businesses frustrated by Oracle's aggressive licensing audits",
        "Companies migrating Oracle databases to managed alternatives",
      ],
      threats: [
        "Oracle's aggressive pricing on OCI to capture cloud market share",
        "Oracle Database customers naturally drawn to OCI integration",
        "OCI expanding beyond database to general-purpose cloud",
        "Oracle's Dedicated Region offering for large enterprises",
      ],
    },
    verdict: "Rackspace wins on multi-cloud, managed services breadth, and freedom from Oracle lock-in. OCI wins for Oracle Database workloads and aggressive pricing. Target customers seeking to diversify beyond Oracle's ecosystem.",
    rackspaceOverall: 8.0,
    competitorOverall: 7.1,
  },
  cloudflare: {
    dimensions: [
      { label: "Managed Services", rackspace: 10, competitor: 3 },
      { label: "Enterprise Support", rackspace: 10, competitor: 5 },
      { label: "Compliance", rackspace: 9, competitor: 6 },
      { label: "Multi-Cloud", rackspace: 9, competitor: 2 },
      { label: "Edge/CDN", rackspace: 5, competitor: 10 },
      { label: "Security", rackspace: 7, competitor: 9 },
      { label: "Compute Flexibility", rackspace: 9, competitor: 5 },
      { label: "Developer Experience", rackspace: 5, competitor: 9 },
    ],
    swot: {
      strengths: [
        "Full-stack managed services — Cloudflare is primarily self-service",
        "Traditional compute, bare metal, and VM workloads",
        "Multi-cloud management across AWS, Azure, GCP",
        "Enterprise compliance portfolio (SOC, PCI, HIPAA, FedRAMP)",
        "Dedicated account teams and operational support",
      ],
      weaknesses: [
        "Cloudflare's global edge network is unmatched (310+ cities)",
        "Cloudflare Workers and edge computing are innovative",
        "R2 storage with zero egress fees is very attractive",
        "Strong DDoS protection and WAF capabilities",
      ],
      opportunities: [
        "Cloudflare customers needing traditional compute infrastructure",
        "Companies outgrowing edge-only architectures",
        "Businesses needing managed operations beyond Cloudflare's scope",
        "Hybrid strategies combining Rackspace managed cloud + Cloudflare edge",
      ],
      threats: [
        "Cloudflare expanding into full cloud platform (R2, D1, Workers)",
        "Developer-first approach building strong brand loyalty",
        "Zero egress pricing disrupting traditional cloud economics",
        "Growing enterprise credibility and security reputation",
      ],
    },
    verdict: "Different focus areas: Rackspace for managed cloud infrastructure and operations, Cloudflare for edge computing, CDN, and security. Can be complementary — position Rackspace for core workloads and Cloudflare for edge delivery.",
    rackspaceOverall: 8.0,
    competitorOverall: 6.1,
  },
  leaseweb: {
    dimensions: [
      { label: "Managed Services", rackspace: 10, competitor: 5 },
      { label: "Enterprise Support", rackspace: 10, competitor: 5 },
      { label: "Compliance", rackspace: 9, competitor: 6 },
      { label: "Multi-Cloud", rackspace: 9, competitor: 2 },
      { label: "Pricing", rackspace: 5, competitor: 8 },
      { label: "Global Reach", rackspace: 8, competitor: 7 },
      { label: "Bare Metal", rackspace: 8, competitor: 8 },
      { label: "Private Cloud", rackspace: 9, competitor: 6 },
    ],
    swot: {
      strengths: [
        "Fanatical Experience™ with full-stack managed services",
        "Multi-cloud expertise across all major providers",
        "Enterprise compliance portfolio (SOC, PCI, HIPAA, FedRAMP)",
        "Dedicated account teams and 24/7 expert support",
        "Cloud migration and modernization services",
      ],
      weaknesses: [
        "Leaseweb offers competitive bare metal and bandwidth pricing",
        "Leaseweb's global data center footprint (25+ locations)",
        "Lower pricing for basic hosting and infrastructure",
        "Flexible bandwidth options with unmetered plans",
      ],
      opportunities: [
        "Leaseweb customers needing managed services beyond basic hosting",
        "Companies outgrowing Leaseweb's limited managed offerings",
        "Businesses requiring enterprise compliance certifications",
        "Hybrid cloud migrations from Leaseweb infrastructure",
      ],
      threats: [
        "Leaseweb's competitive pricing on dedicated servers",
        "Growing managed services portfolio",
        "Strong presence in hosting and content delivery markets",
        "Flexible contract terms and bandwidth pricing",
      ],
    },
    verdict: "Rackspace wins decisively on managed services, compliance, and multi-cloud. Leaseweb competes on infrastructure pricing and bandwidth. Target Leaseweb customers outgrowing basic hosting who need enterprise-grade managed operations.",
    rackspaceOverall: 8.5,
    competitorOverall: 5.9,
  },
};

// Fallback for competitors without specific scoring data
const DEFAULT_SCORES: CompetitorScores = {
  dimensions: [
    { label: "Managed Services", rackspace: 10, competitor: 5 },
    { label: "Enterprise Support", rackspace: 10, competitor: 5 },
    { label: "Compliance", rackspace: 9, competitor: 5 },
    { label: "Multi-Cloud", rackspace: 9, competitor: 5 },
    { label: "Pricing", rackspace: 5, competitor: 7 },
    { label: "Global Reach", rackspace: 8, competitor: 6 },
  ],
  swot: {
    strengths: ["Fanatical Experience\u2122 managed services", "Enterprise compliance portfolio", "Multi-cloud expertise", "24/7 dedicated support"],
    weaknesses: ["Higher infrastructure pricing", "Perceived as legacy by some buyers"],
    opportunities: ["Customers outgrowing self-service", "Regulated industry needs"],
    threats: ["Price-focused competition", "DIY cloud trend"],
  },
  verdict: "Rackspace's managed services and enterprise support are the key differentiators. Focus on the value of operational excellence over raw infrastructure cost.",
  rackspaceOverall: 8.0,
  competitorOverall: 5.5,
};

export function getCompetitorScores(slug: string): CompetitorScores {
  return SCORES[slug] || DEFAULT_SCORES;
}

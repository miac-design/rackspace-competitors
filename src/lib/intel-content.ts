// Pre-built competitive intelligence content for when API is unavailable
// This ensures the app always works, even without an ANTHROPIC_API_KEY

export interface IntelEntry {
  competitors: string[];
  serviceAreas: string[];
  outputType: string;
  content: string;
}

const VULTR_FULL_BATTLECARD = `## Head-to-Head Feature Comparison

| Capability | Rackspace Technology | Vultr |
|---|---|---|
| **Managed Services** | Full-stack managed services with Fanatical Experience™ | Self-service only, no managed option |
| **Enterprise Support** | 24/7/365 dedicated account teams, 15-min SLA | Basic ticket support, no dedicated teams |
| **Multi-Cloud** | AWS, Azure, GCP, Private Cloud expertise | Single-cloud (Vultr only) |
| **Compliance** | SOC 1/2/3, PCI DSS, HIPAA, FedRAMP | SOC 2 only, limited compliance |
| **Bare Metal** | Enterprise-grade with managed OS & networking | Commodity bare metal, self-managed |
| **Kubernetes** | Rackspace Kubernetes-as-a-Service (managed) | Vultr Kubernetes Engine (self-service) |
| **Private Cloud** | VMware, OpenStack, Hyper-V managed options | Not available |
| **Migration Services** | Professional services team for migration | No migration assistance |
| **Data Centers** | Global footprint with enterprise-grade facilities | 32 locations, smaller scale |
| **SLA** | 100% network uptime SLA | 100% network uptime SLA |

## Rackspace Strengths to Emphasize

- **Fanatical Experience™**: 24/7/365 expert support with dedicated account teams — Vultr has no equivalent. Rackspace engineers handle escalations, architecture reviews, and proactive monitoring.
- **Managed Services Depth**: Rackspace doesn't just provide infrastructure — they manage your entire stack including OS, databases, Kubernetes, and security. Vultr is purely self-service.
- **Multi-Cloud Strategy**: Rackspace supports AWS, Azure, GCP, and private cloud. Customers aren't locked into a single provider. Vultr only offers their own infrastructure.
- **Enterprise Compliance**: Rackspace holds SOC 1/2/3, PCI DSS, HIPAA, and FedRAMP certifications. Critical for regulated industries. Vultr's compliance portfolio is limited.
- **25+ Years of Experience**: Rackspace has been a leader in managed cloud since 1998. They've migrated thousands of enterprise workloads. Vultr was founded in 2014 primarily for developers.
- **Professional Services**: Rackspace offers architecture consulting, migration planning, and optimization services. Vultr has no professional services team.

## Competitor Weaknesses to Exploit

- **No Managed Services**: Vultr is entirely self-service. Customers must handle all operations, patching, monitoring, and incident response themselves. Ask: "Who handles your 3 AM pages?"
- **Limited Support**: Vultr's support is ticket-based with no guaranteed response times for most plans. No dedicated account team or named engineers.
- **No Enterprise Features**: Vultr lacks enterprise essentials like dedicated account management, architecture reviews, compliance consulting, and change management processes.
- **Single Cloud Lock-in**: Vultr only offers Vultr infrastructure. No multi-cloud management, no hybrid cloud, no path to AWS/Azure/GCP if needs change.
- **No Private Cloud**: For workloads requiring dedicated infrastructure with compliance, Vultr has no private cloud offering. Rackspace offers managed VMware, OpenStack, and Hyper-V.
- **Limited Compliance**: Vultr's compliance certifications are basic. For healthcare (HIPAA), financial services (PCI DSS), or government (FedRAMP), Vultr falls short.

## Objection Handling

**"Vultr is much cheaper than Rackspace."**
> Vultr's headline pricing is lower because it's raw, unmanaged infrastructure. When you factor in the cost of hiring and retaining cloud engineers (avg $150K/year), 24/7 on-call rotations, security monitoring, patching, and compliance management, Rackspace's managed services deliver lower TCO. Ask: "What's your current OpEx for managing infrastructure in-house?"

**"We don't need managed services, our team can handle it."**
> That's great for day-to-day operations, but what about scaling during growth, handling security incidents at 3 AM, or maintaining compliance during audits? Rackspace augments your team — freeing them to focus on innovation rather than infrastructure maintenance.

**"Vultr has more data center locations."**
> Rackspace's data centers are enterprise-grade facilities with the compliance certifications your business requires. We also manage workloads across AWS, Azure, and GCP — giving you access to 100+ regions globally through our multi-cloud expertise.

**"We're already on Vultr and it's working fine."**
> Vultr works well for simple workloads. But as your business scales and compliance requirements grow, you'll need managed services, dedicated support, and multi-cloud flexibility. Rackspace makes that transition seamless with our migration services team.

## Pricing Positioning

- **Vultr is cheaper on raw compute** — roughly 30-50% less for equivalent VM specs. This is their main selling point.
- **TCO favors Rackspace** when you include operational costs: staffing (2-3 FTEs for 24/7 coverage = $300-450K/year), tooling, compliance auditing, and incident management.
- **Rackspace value proposition**: "You're not just buying infrastructure — you're buying operational excellence, compliance assurance, and a team of experts who treat your infrastructure as their own."
- **Pricing levers**: Committed spend discounts, multi-year agreements, bundled managed services pricing, and volume-based tiering are available.
- **Key question for the customer**: "What's the fully-loaded cost of your current infrastructure team, including hiring, retention, training, and on-call compensation?"`;

const OVHCLOUD_FULL_BATTLECARD = `## Head-to-Head Feature Comparison

| Capability | Rackspace Technology | OVHcloud |
|---|---|---|
| **Managed Services** | Full-stack managed with Fanatical Experience™ | Limited managed options, mostly self-service |
| **Enterprise Support** | 24/7/365 dedicated account teams, 15-min SLA | Tiered support, premium costs extra |
| **Multi-Cloud** | AWS, Azure, GCP, Private Cloud expertise | Single-cloud (OVHcloud ecosystem only) |
| **Compliance** | SOC 1/2/3, PCI DSS, HIPAA, FedRAMP | SecNumCloud, HDS, SOC 1/2, ISO 27001 (EU-focused) |
| **Bare Metal** | Enterprise-grade with managed OS & networking | Strong bare metal portfolio, self-managed |
| **Kubernetes** | Rackspace Kubernetes-as-a-Service (managed) | OVHcloud Managed Kubernetes (basic management) |
| **Private Cloud** | VMware, OpenStack, Hyper-V managed options | Hosted Private Cloud (VMware-based) |
| **Migration Services** | Professional services team for migration | Limited migration assistance |
| **Data Centers** | Global footprint, US/EU/APAC | Primarily EU-focused (France, Germany, UK, Canada) |
| **US Market Presence** | Headquarters in San Antonio, TX — strong US presence | Minimal US presence, EU-headquartered |

## Rackspace Strengths to Emphasize

- **Fanatical Experience™**: Rackspace provides 24/7/365 expert human support with dedicated account teams. OVHcloud's support is tiered and premium support requires additional investment.
- **US Market Expertise**: Rackspace is headquartered in San Antonio, TX with deep US enterprise relationships. OVHcloud is a French company with limited US go-to-market presence and US data center footprint.
- **Multi-Cloud Management**: Rackspace manages workloads across AWS, Azure, GCP, and private cloud. OVHcloud only manages their own ecosystem — no multi-cloud capability.
- **Managed Services Depth**: Rackspace manages your entire stack — OS, databases, Kubernetes, security, compliance. OVHcloud's managed offerings are more limited and basic.
- **US Compliance**: Rackspace holds FedRAMP authorization and deep HIPAA/PCI DSS expertise for US-regulated industries. OVHcloud's compliance strengths are EU-focused (SecNumCloud, HDS).
- **Professional Services**: Architecture consulting, migration planning, optimization, and dedicated solutions architects. OVHcloud has limited professional services for enterprise customers.
- **Proven Enterprise Track Record**: 25+ years serving Fortune 500 companies. OVHcloud is still building enterprise credibility outside of Europe.

## Competitor Weaknesses to Exploit

- **EU-Centric**: OVHcloud's strength is in Europe. Their US data center presence is limited (Vint Hill, VA and Hillsboro, OR). For US-based workloads needing low latency and data residency, this is a significant gap.
- **Limited Managed Services**: OVHcloud positions as "cloud provider" not "managed services provider." Customers largely self-manage their infrastructure with limited operational support.
- **Support Quality Concerns**: OVHcloud has faced public criticism for support responsiveness. Their standard support is basic; premium support requires significant additional spend.
- **No Multi-Cloud**: OVHcloud only manages OVHcloud infrastructure. If a customer needs AWS, Azure, or GCP alongside OVHcloud, there's no unified management layer.
- **Incident History**: OVHcloud's Strasbourg data center fire in March 2021 destroyed SBG2 and impacted SBG1, raising concerns about disaster recovery and redundancy practices.
- **Enterprise Features Gap**: Compared to Rackspace, OVHcloud lacks dedicated account teams, proactive architecture reviews, and the depth of compliance consulting that enterprise customers expect.
- **Limited US Compliance**: OVHcloud does not have FedRAMP authorization. Their compliance portfolio is optimized for EU regulations (GDPR, SecNumCloud) rather than US requirements.

## Objection Handling

**"OVHcloud is significantly cheaper, especially for bare metal."**
> OVHcloud's pricing is competitive on raw infrastructure — they own their hardware manufacturing which reduces costs. But infrastructure cost is only 30-40% of your total cloud spend. When you add the cost of 24/7 operations staff, security monitoring, compliance management, and incident response, Rackspace's managed approach delivers better TCO and lets your team focus on business outcomes.

**"OVHcloud offers data sovereignty for our EU requirements."**
> Rackspace also operates EU data centers and supports data sovereignty requirements. Additionally, Rackspace provides managed compliance services that go beyond just data location — including ongoing compliance monitoring, audit support, and regulatory guidance. For US workloads, Rackspace's FedRAMP authorization gives you compliance coverage OVHcloud can't match.

**"We like OVHcloud's Hosted Private Cloud (VMware)."**
> Rackspace also offers managed VMware private cloud — but with Fanatical Experience™ support, 24/7 operations, and a dedicated team managing your environment. With OVHcloud, you're still responsible for day-to-day operations of your VMware stack. Ask: "Who manages patching, monitoring, and capacity planning today?"

**"OVHcloud is a European company, which gives us more confidence in data privacy."**
> Data privacy is about controls and certifications, not just company origin. Rackspace maintains comprehensive compliance certifications globally and can architect solutions that meet both EU and US regulatory requirements. We also provide dedicated compliance consultants who work with your legal team.

## Pricing Positioning

- **OVHcloud is very competitive on bare metal pricing** — they manufacture their own servers, giving them a significant cost advantage on raw hardware (up to 40-60% cheaper).
- **Public cloud pricing is comparable** but OVHcloud's predictable pricing model (no egress fees) can be attractive for bandwidth-heavy workloads.
- **TCO favors Rackspace** for enterprise workloads: managed services eliminate the need for 3-5 FTEs ($450-750K/year), provide compliance assurance, and include 24/7 expert support.
- **Key differentiator**: Rackspace pricing includes operational management. OVHcloud pricing is infrastructure-only — all management costs are additional and hidden.
- **Pricing levers**: Committed spend discounts, managed services bundles, and multi-year agreements. Emphasize the value of predictable operational costs vs. hidden staffing costs.
- **Key question**: "Beyond the infrastructure bill, what are you spending on cloud operations, security, and compliance annually?"`;

const CHAT_RESPONSES: Record<string, string> = {
  "pricing": `## Pricing Positioning: Rackspace vs Competitors

**The key message**: Rackspace isn't the cheapest on raw infrastructure — and that's by design.

### Why Rackspace Costs More (And Why It's Worth It)

| Cost Factor | Self-Managed (Vultr/OVHcloud) | Rackspace Managed |
|---|---|---|
| Infrastructure | $2,000-5,000/mo | $3,000-8,000/mo |
| Cloud Engineers (2-3 FTEs) | $300,000-450,000/yr | Included |
| 24/7 On-Call Coverage | $50,000-100,000/yr | Included |
| Security Monitoring | $30,000-60,000/yr | Included |
| Compliance Management | $50,000-100,000/yr | Included |
| **Total Annual Cost** | **$454,000-734,000** | **$36,000-96,000** |

### Handling the "You're Too Expensive" Objection

1. **Reframe the conversation**: "Are we comparing infrastructure cost or total cost of ownership?"
2. **Ask about hidden costs**: "What do you spend annually on cloud operations staff, on-call rotations, and compliance audits?"
3. **Quantify risk**: "What's the cost of a 4-hour outage to your business? Rackspace's 15-minute SLA response means faster resolution."
4. **Emphasize value**: "You're not buying servers — you're buying Fanatical Experience™, 25 years of expertise, and peace of mind."`,

  "bare metal": `## Rackspace vs Competitors: Bare Metal

### Rackspace Bare Metal Advantages

- **Fully Managed**: Rackspace manages the full stack — hardware, OS, networking, firmware, and monitoring. Competitors provide self-service bare metal only.
- **Enterprise-Grade Hardware**: Dell, HP, and Supermicro enterprise servers with redundant power, networking, and storage.
- **Fanatical Experience™**: Dedicated account team, 24/7 monitoring, proactive hardware replacement, and capacity planning.
- **Compliance-Ready**: Bare metal with SOC 1/2/3, PCI DSS, HIPAA, and FedRAMP certifications. Critical for regulated workloads.

### Competitor Comparison

| Feature | Rackspace | Vultr | OVHcloud |
|---|---|---|---|
| Managed OS & Patching | ✅ | ❌ | ❌ |
| 24/7 Expert Support | ✅ | ❌ | ⚠️ Premium only |
| Hardware Monitoring | ✅ Proactive | ❌ Self-service | ⚠️ Basic |
| Compliance Certs | SOC/PCI/HIPAA/FedRAMP | SOC 2 only | EU-focused |
| Custom Configs | ✅ | Limited | ✅ |
| Pricing | Premium (managed) | Low | Very low |

### Key Talking Points

- "Vultr and OVHcloud sell you a server. Rackspace sells you a managed bare metal solution with 24/7 operations."
- "When that RAID controller fails at 2 AM, who's responding? With Rackspace, our engineers are already on it."`,

  "kubernetes": `## Rackspace vs Competitors: Kubernetes

### Rackspace Kubernetes-as-a-Service (KaaS)

Rackspace offers **fully managed Kubernetes** — not just a hosted control plane, but end-to-end operational management:

- Cluster provisioning, upgrades, and patching
- 24/7 monitoring and incident response
- Security hardening and compliance
- Application-level support
- Architecture consulting and optimization

### Competitor Comparison

| Feature | Rackspace KaaS | Vultr Kubernetes Engine | OVHcloud Managed K8s |
|---|---|---|---|
| Control Plane Management | ✅ Managed | ✅ Managed | ✅ Managed |
| Worker Node Management | ✅ Managed | ❌ Self-service | ❌ Self-service |
| Cluster Upgrades | ✅ Managed | ❌ Self-service | ⚠️ Semi-automated |
| Security Patching | ✅ Proactive | ❌ Self-service | ❌ Self-service |
| 24/7 K8s Expert Support | ✅ | ❌ | ❌ |
| Multi-Cloud K8s | ✅ (AWS EKS, AKS, GKE) | ❌ Vultr only | ❌ OVH only |
| Compliance | SOC/PCI/HIPAA | SOC 2 | EU certs |

### Key Message
"Vultr and OVHcloud give you a Kubernetes API endpoint. Rackspace gives you a fully managed Kubernetes platform with the expertise to run production workloads at scale."`,

  "managed services": `## Rackspace Managed Services: The Core Differentiator

### What Rackspace Managed Services Includes

Rackspace's **Fanatical Experience™** goes far beyond basic monitoring:

- **Dedicated Account Team**: Named account manager, solutions architect, and support engineers
- **24/7/365 Operations**: Proactive monitoring, incident response, and remediation (15-minute SLA)
- **Full-Stack Management**: OS, databases, middleware, containers, networking, and security
- **Compliance Management**: Ongoing compliance monitoring, audit support, and remediation
- **Architecture Reviews**: Regular reviews to optimize performance, cost, and security
- **Capacity Planning**: Proactive scaling recommendations based on usage trends
- **Patching & Updates**: Managed OS and application patching with change management

### Why Competitors Can't Match This

| Capability | Rackspace | Vultr | OVHcloud |
|---|---|---|---|
| Managed OS | ✅ | ❌ | ❌ |
| Managed Databases | ✅ | ❌ | ⚠️ Basic |
| Managed Security | ✅ | ❌ | ❌ |
| Managed Kubernetes | ✅ | ❌ | ⚠️ Control plane only |
| Dedicated Account Team | ✅ | ❌ | ❌ |
| Proactive Monitoring | ✅ | ❌ | ⚠️ Basic |
| Compliance Consulting | ✅ | ❌ | ❌ |

### The Bottom Line
"Vultr and OVHcloud are infrastructure providers. Rackspace is a managed cloud partner. That's a fundamental difference in how your team operates day-to-day."`,

  "default": `## Rackspace Competitive Intelligence

I can help you with competitive positioning against **Vultr** and **OVHcloud**. Here are the key areas I can assist with:

### Quick Competitive Summary

| Differentiator | Rackspace | Vultr | OVHcloud |
|---|---|---|---|
| **Model** | Managed Cloud Partner | Self-Service IaaS | Self-Service IaaS |
| **Support** | Fanatical Experience™ 24/7 | Basic tickets | Tiered (premium extra) |
| **Multi-Cloud** | AWS, Azure, GCP, Private | Vultr only | OVH only |
| **Compliance** | SOC/PCI/HIPAA/FedRAMP | SOC 2 | EU-focused (SecNumCloud) |
| **Strengths** | Managed services, support | Low price, simplicity | EU presence, bare metal pricing |
| **Target** | Enterprise, regulated industries | Developers, startups | EU businesses, cost-sensitive |

### How to Use This Tool

Try asking about specific scenarios:
- "Help me handle pricing objections vs Vultr"
- "Compare Rackspace vs OVHcloud for bare metal"
- "What are Vultr's weaknesses in managed services?"
- "How to position Rackspace for a healthcare customer evaluating OVHcloud"

### Rackspace's #1 Advantage
**Fanatical Experience™** — no competitor offers the depth of managed services, dedicated account teams, and 24/7 expert support that Rackspace provides. This is the cornerstone of every competitive conversation.`
};

export function getPrebuiltBattleCard(competitors: string[], outputType: string): string {
  // Return the most relevant pre-built content
  const competitor = competitors[0];

  if (outputType === "full" || outputType === "comparison" || outputType === "strengths" || outputType === "weaknesses" || outputType === "objections" || outputType === "pricing") {
    if (competitor === "vultr") return VULTR_FULL_BATTLECARD;
    if (competitor === "ovhcloud") return OVHCLOUD_FULL_BATTLECARD;
  }

  return VULTR_FULL_BATTLECARD;
}

export function getChatResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("pricing") || lower.includes("cost") || lower.includes("cheap") || lower.includes("expensive") || lower.includes("price")) {
    return CHAT_RESPONSES["pricing"];
  }
  if (lower.includes("bare metal") || lower.includes("dedicated server")) {
    return CHAT_RESPONSES["bare metal"];
  }
  if (lower.includes("kubernetes") || lower.includes("k8s") || lower.includes("container")) {
    return CHAT_RESPONSES["kubernetes"];
  }
  if (lower.includes("managed") || lower.includes("support") || lower.includes("fanatical")) {
    return CHAT_RESPONSES["managed services"];
  }
  if (lower.includes("vultr")) {
    return VULTR_FULL_BATTLECARD;
  }
  if (lower.includes("ovh") || lower.includes("ovhcloud")) {
    return OVHCLOUD_FULL_BATTLECARD;
  }

  return CHAT_RESPONSES["default"];
}

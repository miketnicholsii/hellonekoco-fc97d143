// src/lib/neko-config.ts
// Central configuration for NÈKO - edit values here to update across the site

type Company = {
  name: string;
  logo?: string;
  url?: string;
};

export const nekoConfig = {
  // Contact & Communication
  email: "neko@helloneko.co",
  
  // Rate Signal - displayed prominently on /invite and home
  rate: {
    hourly: 375,
    currency: "$",
    formatted: "$375+",
    unit: "/ hour",
    description: "Varies by build, project, and task.",
  },
  
  // Preview Session pricing
  preview: {
    amount: 150,
    formatted: "$150",
    description: "A small contribution to explore fit",
  },
  
  // Budget options for proposal form
  budgetOptions: [
    { value: "under-500", label: "< $500" },
    { value: "500-2k", label: "$500 – $2k" },
    { value: "2k-5k", label: "$2k – $5k" },
    { value: "5k-10k", label: "$5k – $10k" },
    { value: "10k-plus", label: "$10k+" },
    { value: "not-sure", label: "Not sure — estimate" },
  ],
  
  // Numbers page metrics (editable placeholders)
  metrics: {
    projectsShipped: "20+",
    yearsBuilding: "8+",
    domainsLaunched: "15+",
    avgResponseTime: "Varies — invite-only",
  },
  
  // Toolbox proficiency ratings (0-100)
  toolbox: {
    web: { label: "Web", value: 95, skills: ["React", "TypeScript", "Tailwind"] },
    systems: { label: "Systems", value: 85, skills: ["APIs", "Automation"] },
    strategy: { label: "Strategy", value: 80, skills: ["Positioning", "Messaging"] },
    design: { label: "Design", value: 75, skills: ["UI", "Motion"] },
  },
  
  // Work mix for donut chart
  workMix: [
    { name: "Digital Structures", value: 40, color: "#334336" },
    { name: "Strategy", value: 25, color: "#E5530A" },
    { name: "Experiments", value: 20, color: "#C8BFB5" },
    { name: "Sharing", value: 15, color: "#BCB3A5" },
  ],
  
  // Brand
  brand: {
    name: "NÈKO",
    tagline: "An independent creative sandbox.",
    badge: "Invite-only. By alignment.",
    forProfit: true,
    missionStatement: "NÈKO is for-profit. Proceeds support mental health institutions.",
  },

  // Companies & collaborators (use optional logo + URL where appropriate)
  companies: [
    { name: "Civic Orchard" },
    { name: "Quiet Signal Studio" },
    { name: "Blue Harbor Health" },
    { name: "Starlight Labs" },
    { name: "Arcadia Collective" },
  ] as Company[],
  
  // Legacy domain note
  legacyNote: "miketnicholsii.com is being folded into NÈKO.",
  
  // Social / External
  external: {
    donate: "mailto:neko@helloneko.co?subject=Donation%20Inquiry",
  },
};

// Type for budget options
export type BudgetOption = typeof nekoConfig.budgetOptions[number];

// Helper to format rate
export const formatRate = (rate: number, currency = "$") => `${currency}${rate}`;

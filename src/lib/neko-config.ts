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
    yearsBuilding: "12+ years",
    domainsLaunched: "15+",
    avgResponseTime: "48h window",
  },

  // Numbers page pricing signal (directional)
  pricingSignal: {
    label: "Typical engagement bands",
    range: "$8k–$40k",
    detail: "Focused sprints start around $4k. Directional, not a quote.",
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
    { name: "Digital Structures", value: 42, color: "#334336" },
    { name: "Strategy", value: 28, color: "#E5530A" },
    { name: "Experiments", value: 18, color: "#C8BFB5" },
    { name: "Sharing", value: 12, color: "#BCB3A5" },
  ],
  
  // Brand
  brand: {
    name: "NÈKO",
    tagline: "An independent creative sandbox.",
    badge: "Invite-only. By alignment.",
    forProfit: true,
    missionStatement: "NÈKO is for-profit—10% of proceeds support mental health nonprofits, with quarterly transparency notes.",
    missionLine: "10% of proceeds support mental health nonprofits.",
  },

  // Companies & collaborators (use optional logo + URL where appropriate)
  companies: [
    { name: "Civic Orchard" },
    { name: "Quiet Signal Studio" },
    { name: "Blue Harbor Health" },
    { name: "Starlight Labs" },
    { name: "Arcadia Collective" },
  ] as Company[],
  
  // Social / External
  external: {
    donate: "/donate", // Stripe donation page
  },
};

// Type for budget options
export type BudgetOption = typeof nekoConfig.budgetOptions[number];

// Helper to format rate
export const formatRate = (rate: number, currency = "$") => `${currency}${rate}`;

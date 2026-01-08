// NEKO Subscription Tiers Configuration
// Maps product IDs to subscription tiers with pricing

export const SUBSCRIPTION_TIERS = {
  free: {
    name: "Free",
    price: 0,
    annualPrice: 0,
    product_id: null,
    price_id: null,
    annual_price_id: null,
  },
  starter: {
    name: "Starter",
    price: 19,
    annualPrice: 190,
    product_id: "prod_TksqB7NIXg4KNK",
    price_id: "price_1SnN4SLlRyOCUFRX6VQbrGjr",
    annual_price_id: "price_1SnN5HLlRyOCUFRXKZNkl7uC",
  },
  pro: {
    name: "Pro",
    price: 49,
    annualPrice: 490,
    product_id: "prod_TksqgwJoMRqpuM",
    price_id: "price_1SnN4oLlRyOCUFRX7Uw8oAOQ",
    annual_price_id: "price_1SnN5VLlRyOCUFRXOUTTV8Yl",
  },
  elite: {
    name: "Elite",
    price: 99,
    annualPrice: 990,
    product_id: "prod_Tksqz2DPSSb64V",
    price_id: "price_1SnN50LlRyOCUFRX80R5vh5u",
    annual_price_id: "price_1SnN5gLlRyOCUFRXbH0fw7gR",
  },
} as const;

export type SubscriptionTier = keyof typeof SUBSCRIPTION_TIERS;

// Legacy tier name mapping (for backward compatibility with database)
const LEGACY_TIER_MAP: Record<string, SubscriptionTier> = {
  start: "starter",
  build: "pro",
  scale: "elite",
};

// Helper to normalize tier (handles legacy names)
export function normalizeTier(tier: string | null): SubscriptionTier {
  if (!tier) return "free";
  const lowerTier = tier.toLowerCase();
  if (lowerTier in SUBSCRIPTION_TIERS) {
    return lowerTier as SubscriptionTier;
  }
  if (lowerTier in LEGACY_TIER_MAP) {
    return LEGACY_TIER_MAP[lowerTier];
  }
  return "free";
}

// Helper to get tier from product ID
export function getTierFromProductId(productId: string | null): SubscriptionTier {
  if (!productId) return "free";
  
  for (const [tier, config] of Object.entries(SUBSCRIPTION_TIERS)) {
    if (config.product_id === productId) {
      return tier as SubscriptionTier;
    }
  }
  return "free";
}

// Tier order for comparisons
const TIER_ORDER: SubscriptionTier[] = ["free", "starter", "pro", "elite"];

// Helper to check if a tier meets minimum requirement
export function tierMeetsRequirement(
  currentTier: SubscriptionTier | string,
  requiredTier: SubscriptionTier | string
): boolean {
  const normalizedCurrent = normalizeTier(currentTier as string);
  const normalizedRequired = normalizeTier(requiredTier as string);
  const currentIndex = TIER_ORDER.indexOf(normalizedCurrent);
  const requiredIndex = TIER_ORDER.indexOf(normalizedRequired);
  return currentIndex >= requiredIndex;
}

// Helper to get tier index for comparisons
export function getTierIndex(tier: SubscriptionTier): number {
  return TIER_ORDER.indexOf(tier);
}

// Get next tier for upgrades
export function getNextTier(currentTier: SubscriptionTier): SubscriptionTier | null {
  const currentIndex = TIER_ORDER.indexOf(currentTier);
  if (currentIndex < TIER_ORDER.length - 1) {
    return TIER_ORDER[currentIndex + 1];
  }
  return null;
}

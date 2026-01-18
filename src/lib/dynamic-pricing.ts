// src/lib/dynamic-pricing.ts
// Dynamic pricing system that changes rates based on time periods

export interface PricingPeriod {
  rate: number;
  label: string;
  description: string;
}

// Define pricing tiers
const PRICING_TIERS: PricingPeriod[] = [
  { rate: 325, label: "Early Bird", description: "Limited availability pricing" },
  { rate: 375, label: "Standard", description: "Regular hourly rate" },
  { rate: 425, label: "Peak", description: "High-demand period" },
  { rate: 475, label: "Premium", description: "Priority scheduling" },
];

// Price change schedule - changes every 3 days at midnight UTC
const CYCLE_DURATION_MS = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
const EPOCH_START = new Date("2026-01-01T00:00:00Z").getTime(); // Reference point

/**
 * Get the current pricing period based on time
 */
export function getCurrentPricingPeriod(): PricingPeriod {
  const now = Date.now();
  const elapsed = now - EPOCH_START;
  const cycleIndex = Math.floor(elapsed / CYCLE_DURATION_MS) % PRICING_TIERS.length;
  return PRICING_TIERS[cycleIndex];
}

/**
 * Get the next price change timestamp
 */
export function getNextPriceChange(): Date {
  const now = Date.now();
  const elapsed = now - EPOCH_START;
  const currentCycle = Math.floor(elapsed / CYCLE_DURATION_MS);
  const nextCycleStart = EPOCH_START + (currentCycle + 1) * CYCLE_DURATION_MS;
  return new Date(nextCycleStart);
}

/**
 * Get the upcoming pricing period (what the rate will change to)
 */
export function getNextPricingPeriod(): PricingPeriod {
  const now = Date.now();
  const elapsed = now - EPOCH_START;
  const currentCycleIndex = Math.floor(elapsed / CYCLE_DURATION_MS) % PRICING_TIERS.length;
  const nextCycleIndex = (currentCycleIndex + 1) % PRICING_TIERS.length;
  return PRICING_TIERS[nextCycleIndex];
}

/**
 * Format rate with currency
 */
export function formatDynamicRate(rate: number, currency = "$"): string {
  return `${currency}${rate}`;
}

/**
 * Check if next price is higher or lower
 */
export function isPriceIncreasing(): boolean {
  const current = getCurrentPricingPeriod();
  const next = getNextPricingPeriod();
  return next.rate > current.rate;
}

/**
 * Get time remaining until next price change
 */
export function getTimeUntilChange(): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
} {
  const now = Date.now();
  const nextChange = getNextPriceChange().getTime();
  const diff = Math.max(0, nextChange - now);
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds, total: diff };
}

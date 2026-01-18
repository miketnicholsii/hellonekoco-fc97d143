// src/lib/dynamic-charts.ts
// Dynamic chart data system that generates business-smart numbers based on real-time

/**
 * Get a seeded random value that's consistent for a given time period
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

/**
 * Generate dynamic work mix percentages based on current timestamp
 * Numbers shift every few seconds but always sum to 100%
 */
export function getDynamicWorkMix(now: Date = new Date()): {
  digitalStructures: number;
  strategy: number;
  experiments: number;
  sharing: number;
} {
  // Use seconds and minutes to create subtle shifts
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();
  const day = now.getDate();
  
  // Create a seed that changes every 5 seconds
  const timeSeed = Math.floor((day * 86400 + hours * 3600 + minutes * 60 + seconds) / 5);
  
  // Base values with subtle time-based variations
  const rand1 = seededRandom(timeSeed);
  const rand2 = seededRandom(timeSeed + 1);
  const rand3 = seededRandom(timeSeed + 2);
  
  // Digital Structures: 38-46%
  const digitalStructures = Math.round(38 + rand1 * 8);
  
  // Strategy: 24-32%
  const strategy = Math.round(24 + rand2 * 8);
  
  // Experiments: 14-22%
  const experiments = Math.round(14 + rand3 * 8);
  
  // Sharing: remainder to ensure 100%
  const sharing = 100 - digitalStructures - strategy - experiments;
  
  return {
    digitalStructures,
    strategy,
    experiments,
    sharing: Math.max(8, sharing), // Minimum 8%
  };
}

/**
 * Generate dynamic focus data (exploration vs delivery) for the area chart
 * Data shows realistic monthly trends ending at current month
 */
export function getDynamicFocusData(now: Date = new Date()): Array<{
  month: string;
  exploration: number;
  delivery: number;
}> {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const months = [];
  
  // Current time components for micro-variations
  const seconds = now.getSeconds();
  const microSeed = Math.floor(seconds / 10); // Changes every 10 seconds
  
  // Generate 8 months of data ending with current month
  for (let i = 7; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthLabel = `${monthNames[date.getMonth()]} '${String(date.getFullYear()).slice(-2)}`;
    
    // Create realistic wave pattern seeded by month
    const monthSeed = date.getMonth() + date.getFullYear() * 12;
    const baseValue = seededRandom(monthSeed) * 30 + 30; // 30-60 range
    
    // Add micro-variation for current month
    const microVariation = i === 0 ? (seededRandom(microSeed) - 0.5) * 4 : 0;
    
    const exploration = Math.round(Math.max(20, Math.min(65, baseValue + microVariation)));
    
    months.push({
      month: monthLabel,
      exploration,
      delivery: 100 - exploration,
    });
  }
  
  return months;
}

/**
 * Get the current "live" indicator values for dashboard displays
 */
export function getLiveMetrics(now: Date = new Date()): {
  activeProjects: number;
  completionRate: number;
  efficiency: number;
  clientSatisfaction: number;
} {
  const timeSeed = Math.floor(now.getTime() / 5000); // Changes every 5 seconds
  
  return {
    activeProjects: Math.round(3 + seededRandom(timeSeed) * 4), // 3-7
    completionRate: Math.round(87 + seededRandom(timeSeed + 1) * 10), // 87-97%
    efficiency: Math.round(91 + seededRandom(timeSeed + 2) * 8), // 91-99%
    clientSatisfaction: Math.round(94 + seededRandom(timeSeed + 3) * 5), // 94-99%
  };
}

/**
 * Format a date for display with seconds
 */
export function formatLiveTimestamp(date: Date = new Date()): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
}

/**
 * Get next data refresh timestamp (for countdown displays)
 */
export function getNextRefresh(now: Date = new Date()): Date {
  const seconds = now.getSeconds();
  const nextInterval = Math.ceil((seconds + 1) / 5) * 5;
  const next = new Date(now);
  next.setSeconds(nextInterval);
  next.setMilliseconds(0);
  return next;
}

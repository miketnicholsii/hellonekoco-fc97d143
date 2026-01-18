// src/hooks/use-dynamic-pricing.tsx
import { useState, useEffect } from "react";
import {
  getCurrentPricingPeriod,
  getNextPriceChange,
  getNextPricingPeriod,
  getTimeUntilChange,
  isPriceIncreasing,
  type PricingPeriod,
} from "@/lib/dynamic-pricing";

export interface DynamicPricingState {
  currentPeriod: PricingPeriod;
  nextPeriod: PricingPeriod;
  nextChangeDate: Date;
  countdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  isIncreasing: boolean;
  formattedRate: string;
}

export function useDynamicPricing(): DynamicPricingState {
  const [state, setState] = useState<DynamicPricingState>(() => {
    const currentPeriod = getCurrentPricingPeriod();
    const timeUntil = getTimeUntilChange();
    return {
      currentPeriod,
      nextPeriod: getNextPricingPeriod(),
      nextChangeDate: getNextPriceChange(),
      countdown: {
        days: timeUntil.days,
        hours: timeUntil.hours,
        minutes: timeUntil.minutes,
        seconds: timeUntil.seconds,
      },
      isIncreasing: isPriceIncreasing(),
      formattedRate: `$${currentPeriod.rate}`,
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const currentPeriod = getCurrentPricingPeriod();
      const timeUntil = getTimeUntilChange();
      
      setState({
        currentPeriod,
        nextPeriod: getNextPricingPeriod(),
        nextChangeDate: getNextPriceChange(),
        countdown: {
          days: timeUntil.days,
          hours: timeUntil.hours,
          minutes: timeUntil.minutes,
          seconds: timeUntil.seconds,
        },
        isIncreasing: isPriceIncreasing(),
        formattedRate: `$${currentPeriod.rate}`,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return state;
}

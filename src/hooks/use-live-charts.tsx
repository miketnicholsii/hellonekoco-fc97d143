// src/hooks/use-live-charts.tsx
// Hook for real-time dynamic chart data

import { useState, useEffect } from "react";
import { 
  getDynamicWorkMix, 
  getDynamicFocusData, 
  formatLiveTimestamp,
  getNextRefresh
} from "@/lib/dynamic-charts";

export interface WorkMixData {
  name: string;
  value: number;
  color: string;
}

export interface FocusData {
  month: string;
  exploration: number;
  delivery: number;
}

export interface LiveChartsState {
  workMix: WorkMixData[];
  focusData: FocusData[];
  timestamp: string;
  secondsUntilRefresh: number;
}

export function useLiveCharts(): LiveChartsState {
  const [state, setState] = useState<LiveChartsState>(() => {
    const now = new Date();
    const mix = getDynamicWorkMix(now);
    
    return {
      workMix: [
        { name: "Digital Structures", value: mix.digitalStructures, color: "#334336" },
        { name: "Strategy", value: mix.strategy, color: "#E5530A" },
        { name: "Experiments", value: mix.experiments, color: "#C8BFB5" },
        { name: "Sharing", value: mix.sharing, color: "#9A9181" },
      ],
      focusData: getDynamicFocusData(now),
      timestamp: formatLiveTimestamp(now),
      secondsUntilRefresh: 5,
    };
  });

  useEffect(() => {
    // Update every second for the timer, but chart data updates every 5 seconds
    const interval = setInterval(() => {
      const now = new Date();
      const nextRefresh = getNextRefresh(now);
      const secondsUntil = Math.max(0, Math.ceil((nextRefresh.getTime() - now.getTime()) / 1000));
      
      const mix = getDynamicWorkMix(now);
      
      setState({
        workMix: [
          { name: "Digital Structures", value: mix.digitalStructures, color: "#334336" },
          { name: "Strategy", value: mix.strategy, color: "#E5530A" },
          { name: "Experiments", value: mix.experiments, color: "#C8BFB5" },
          { name: "Sharing", value: mix.sharing, color: "#9A9181" },
        ],
        focusData: getDynamicFocusData(now),
        timestamp: formatLiveTimestamp(now),
        secondsUntilRefresh: secondsUntil === 0 ? 5 : secondsUntil,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return state;
}

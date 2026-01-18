// src/hooks/use-live-metrics.tsx
// Hook for real-time live metrics display

import { useState, useEffect } from "react";
import { getLiveMetrics, formatLiveTimestamp, getNextRefresh } from "@/lib/dynamic-charts";

export interface LiveMetricsState {
  activeProjects: number;
  completionRate: number;
  efficiency: number;
  clientSatisfaction: number;
  timestamp: string;
  secondsUntilRefresh: number;
}

export function useLiveMetrics(): LiveMetricsState {
  const [state, setState] = useState<LiveMetricsState>(() => {
    const now = new Date();
    const metrics = getLiveMetrics(now);
    
    return {
      ...metrics,
      timestamp: formatLiveTimestamp(now),
      secondsUntilRefresh: 5,
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const nextRefresh = getNextRefresh(now);
      const secondsUntil = Math.max(0, Math.ceil((nextRefresh.getTime() - now.getTime()) / 1000));
      const metrics = getLiveMetrics(now);
      
      setState({
        ...metrics,
        timestamp: formatLiveTimestamp(now),
        secondsUntilRefresh: secondsUntil === 0 ? 5 : secondsUntil,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return state;
}

// src/components/DynamicRateCard.tsx
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Clock, TrendingUp, TrendingDown, Heart } from "lucide-react";
import { useDynamicPricing } from "@/hooks/use-dynamic-pricing";

const glowVariants: Variants = {
  animate: {
    boxShadow: [
      "0 0 30px hsl(16 100% 42% / 0.2)",
      "0 0 60px hsl(16 100% 42% / 0.35)",
      "0 0 30px hsl(16 100% 42% / 0.2)",
    ],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
  },
};

const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.02, 1],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
  },
};

export function DynamicRateCard() {
  const prefersReducedMotion = useReducedMotion();
  const { currentPeriod, nextPeriod, countdown, isIncreasing, formattedRate } = useDynamicPricing();

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <motion.div className="relative">
      <motion.div
        className="absolute -inset-1 rounded-[2.5rem] opacity-60 blur-xl"
        style={{ background: "linear-gradient(135deg, hsl(135 22% 18%) 0%, hsl(16 100% 42%) 100%)" }}
        variants={prefersReducedMotion ? undefined : glowVariants}
        animate="animate"
      />
      
      <div 
        className="relative p-10 sm:p-14 lg:p-16 rounded-[2rem] overflow-hidden"
        style={{ background: "linear-gradient(160deg, hsl(135 22% 16%) 0%, hsl(135 28% 12%) 50%, hsl(140 30% 8%) 100%)" }}
      >
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Rate Display */}
          <div className="text-center lg:text-left">
            {/* Period label */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/20 border border-secondary/30 mb-4">
              <span className="text-xs font-bold tracking-wider text-secondary uppercase">
                {currentPeriod.label} Rate
              </span>
            </div>
            
            <motion.div
              className="inline-flex items-baseline gap-2"
              variants={prefersReducedMotion ? undefined : pulseVariants}
              animate="animate"
            >
              <span 
                className="font-display text-7xl sm:text-8xl lg:text-9xl font-bold tracking-tight"
                style={{ 
                  background: "linear-gradient(135deg, hsl(16 100% 50%) 0%, hsl(16 100% 42%) 50%, hsl(25 90% 45%) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {formattedRate}
              </span>
            </motion.div>
            
            <div className="flex items-center justify-center lg:justify-start gap-2 mt-4">
              <span className="text-xl sm:text-2xl text-white/60 font-light">/ hour</span>
            </div>
            
            <p className="text-white/40 text-sm mt-2">{currentPeriod.description}</p>
          </div>

          {/* Countdown & Next Price */}
          <div className="space-y-6">
            {/* Countdown */}
            <div className="p-5 rounded-xl border border-white/10 bg-white/5">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-secondary" />
                <span className="text-sm text-white/60">
                  Price {isIncreasing ? "increases" : "drops"} to ${nextPeriod.rate} in
                </span>
              </div>
              
              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { value: countdown.days, label: "days" },
                  { value: countdown.hours, label: "hrs" },
                  { value: countdown.minutes, label: "min" },
                  { value: countdown.seconds, label: "sec" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
                      {pad(item.value)}
                    </span>
                    <span className="text-[10px] text-white/40 uppercase tracking-wider">{item.label}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-white/10">
                {isIncreasing ? (
                  <TrendingUp className="w-4 h-4 text-red-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-green-400" />
                )}
                <span className={`text-sm font-medium ${isIncreasing ? "text-red-400" : "text-green-400"}`}>
                  {isIncreasing ? `+$${nextPeriod.rate - currentPeriod.rate}` : `-$${currentPeriod.rate - nextPeriod.rate}`} {isIncreasing ? "increase" : "savings"} coming
                </span>
              </div>
            </div>

            {/* Affordability note */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
              <Heart className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white/70 text-sm leading-relaxed">
                  <strong className="text-white">Budget tight?</strong> Don't let price stop you. 
                  If the work aligns and you can't afford the posted rate, reach out anyway — 
                  we'll figure something out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

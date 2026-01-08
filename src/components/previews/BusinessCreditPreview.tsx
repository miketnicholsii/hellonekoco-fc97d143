import { memo } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Lock, TrendingUp } from "lucide-react";

const tiers = [
  { 
    tier: 0, 
    name: "Business Readiness", 
    status: "complete" as const,
    progress: 100,
  },
  { 
    tier: 1, 
    name: "Net-30 Vendors", 
    status: "active" as const,
    progress: 60,
    vendors: ["Uline", "Quill", "Grainger"],
  },
  { 
    tier: 2, 
    name: "Store Credit", 
    status: "locked" as const,
    progress: 0,
  },
  { 
    tier: 3, 
    name: "Revolving Credit", 
    status: "locked" as const,
    progress: 0,
  },
];

const tradelines = [
  { vendor: "Uline", limit: "$1,000", status: "Active", reporting: true },
  { vendor: "Quill", limit: "$750", status: "Active", reporting: true },
  { vendor: "Grainger", limit: "Pending", status: "Applied", reporting: false },
];

export const BusinessCreditPreview = memo(function BusinessCreditPreview() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-muted/30 shadow-lg">
      {/* Gradient overlay at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none" />
      
      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-display text-base font-bold text-foreground">Business Credit Builder</h3>
            <p className="text-xs text-muted-foreground">Tier 1 in progress</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary">
            <TrendingUp className="h-3.5 w-3.5" />
            <span className="text-xs font-semibold">Building</span>
          </div>
        </div>

        {/* Tier Progress */}
        <div className="grid grid-cols-4 gap-2 mb-5">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.tier}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-3 rounded-xl text-center ${
                tier.status === "complete" 
                  ? "bg-primary/10 border border-primary/30" 
                  : tier.status === "active"
                    ? "bg-card border-2 border-primary"
                    : "bg-muted/30 border border-border opacity-60"
              }`}
            >
              <div className={`text-lg font-bold mb-0.5 ${
                tier.status === "complete" || tier.status === "active" 
                  ? "text-primary" 
                  : "text-muted-foreground"
              }`}>
                {tier.status === "locked" ? (
                  <Lock className="h-4 w-4 mx-auto" />
                ) : (
                  `T${tier.tier}`
                )}
              </div>
              <p className="text-[10px] text-muted-foreground truncate">{tier.name}</p>
              {tier.status === "active" && (
                <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tier.progress}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-full bg-primary"
                  />
                </div>
              )}
              {tier.status === "complete" && (
                <CheckCircle2 className="absolute top-2 right-2 h-3 w-3 text-primary" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Tradeline Tracker Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-border bg-muted/30">
            <h4 className="text-xs font-semibold text-foreground">Active Tradelines</h4>
          </div>
          <div className="divide-y divide-border">
            {tradelines.map((line, index) => (
              <motion.div
                key={line.vendor}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center justify-between px-4 py-2.5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                    {line.vendor[0]}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">{line.vendor}</p>
                    <p className="text-[10px] text-muted-foreground">{line.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-foreground">{line.limit}</p>
                  {line.reporting && (
                    <p className="text-[10px] text-primary">Reporting ✓</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
});

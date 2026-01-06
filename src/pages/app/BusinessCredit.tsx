import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { tierMeetsRequirement } from "@/lib/subscription-tiers";
import CreditBuildingSteps from "@/components/business-credit/CreditBuildingSteps";
import TradelineTracker from "@/components/business-credit/TradelineTracker";
import ScoreMonitoring from "@/components/business-credit/ScoreMonitoring";
import {
  TrendingUp,
  CreditCard,
  BarChart3,
  Lock,
} from "lucide-react";

export default function BusinessCredit() {
  const { user, subscription } = useAuth();
  const [activeTab, setActiveTab] = useState("steps");
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  const userTier = subscription?.tier || "free";
  const hasTradelineAccess = tierMeetsRequirement(userTier, "start");
  const hasScoreAccess = tierMeetsRequirement(userTier, "build");

  // Load credit building progress
  useEffect(() => {
    const loadProgress = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from("progress")
          .select("step, completed")
          .eq("user_id", user.id)
          .eq("module", "business_credit");

        if (error) throw error;

        const progressMap: Record<string, boolean> = {};
        data?.forEach((item) => {
          progressMap[item.step] = item.completed || false;
        });
        setProgress(progressMap);
      } catch (error) {
        console.error("Error loading progress:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProgress();
  }, [user]);

  const tabs = [
    { id: "steps", label: "Credit Building", icon: TrendingUp, tier: "free" as const },
    { id: "tradelines", label: "Tradelines", icon: CreditCard, tier: "start" as const },
    { id: "scores", label: "Score Monitoring", icon: BarChart3, tier: "build" as const },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Business Credit Builder
        </h1>
        <p className="text-muted-foreground">
          Build strong business credit through strategic vendor accounts and monitoring.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-muted/50">
          {tabs.map((tab) => {
            const hasAccess = tierMeetsRequirement(userTier, tab.tier);
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                disabled={!hasAccess}
                className="flex items-center gap-2 py-3 data-[state=active]:bg-background"
              >
                {hasAccess ? (
                  <tab.icon className="h-4 w-4" />
                ) : (
                  <Lock className="h-4 w-4" />
                )}
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <TabsContent value="steps" className="mt-0">
              <CreditBuildingSteps 
                progress={progress} 
                setProgress={setProgress}
                userId={user?.id || ""}
              />
            </TabsContent>

            <TabsContent value="tradelines" className="mt-0">
              {hasTradelineAccess ? (
                <TradelineTracker userId={user?.id || ""} />
              ) : (
                <LockedFeature 
                  title="Tradeline Tracker"
                  description="Track your vendor accounts, credit limits, and payment status."
                  requiredTier="Start"
                />
              )}
            </TabsContent>

            <TabsContent value="scores" className="mt-0">
              {hasScoreAccess ? (
                <ScoreMonitoring userId={user?.id || ""} />
              ) : (
                <LockedFeature 
                  title="Score Monitoring"
                  description="Track your business credit scores across all major bureaus."
                  requiredTier="Build"
                />
              )}
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  );
}

function LockedFeature({ title, description, requiredTier }: { title: string; description: string; requiredTier: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-8 text-center">
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
        <Lock className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="font-display text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 max-w-md mx-auto">{description}</p>
      <p className="text-sm text-primary font-medium">
        Upgrade to {requiredTier} plan to unlock this feature
      </p>
    </div>
  );
}

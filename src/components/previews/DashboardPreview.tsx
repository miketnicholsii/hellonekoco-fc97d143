import { memo } from "react";
import { motion } from "framer-motion";
import { 
  LayoutGrid, 
  ListChecks, 
  Trophy, 
  Flame,
  ArrowRight,
  Building2,
  CreditCard,
  User,
  ChevronRight
} from "lucide-react";

const stats = [
  { label: "Steps Completed", value: "12", change: "+3 this week" },
  { label: "Current Streak", value: "7", suffix: "days" },
  { label: "Credit Tier", value: "1", suffix: "of 3" },
];

const quickActions = [
  { icon: Building2, label: "Business Starter", progress: 40 },
  { icon: CreditCard, label: "Credit Builder", progress: 25 },
  { icon: User, label: "Personal Brand", progress: 60 },
];

const recentActivity = [
  { text: "Completed EIN application", time: "2 hours ago", type: "success" },
  { text: "Added Uline tradeline", time: "Yesterday", type: "info" },
  { text: "Published Digital CV", time: "3 days ago", type: "success" },
];

export const DashboardPreview = memo(function DashboardPreview() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-muted/30 shadow-lg">
      {/* Gradient overlay at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none" />
      
      <div className="p-5 sm:p-6">
        {/* Header with welcome */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-5"
        >
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">Good morning, Alex</h3>
            <p className="text-xs text-muted-foreground">Here's your progress overview</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary/10 text-secondary">
              <Flame className="h-3.5 w-3.5" />
              <span className="text-xs font-semibold">7 day streak</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 rounded-xl bg-card border border-border"
            >
              <p className="text-[10px] text-muted-foreground mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-foreground">{stat.value}</span>
                {stat.suffix && (
                  <span className="text-xs text-muted-foreground">{stat.suffix}</span>
                )}
              </div>
              {stat.change && (
                <p className="text-[10px] text-primary mt-1">{stat.change}</p>
              )}
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Quick Actions */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold text-foreground">Continue Building</h4>
              <LayoutGrid className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div className="space-y-2.5">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <action.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground">{action.label}</p>
                    <div className="mt-1 h-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${action.progress}%` }}
                      />
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold text-foreground">Recent Activity</h4>
              <ListChecks className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              {recentActivity.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -5 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-2.5 py-2 border-b border-border last:border-0"
                >
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                    item.type === "success" ? "bg-primary" : "bg-muted-foreground"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground">{item.text}</p>
                    <p className="text-[10px] text-muted-foreground">{item.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
});

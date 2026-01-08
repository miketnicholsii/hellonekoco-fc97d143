import { memo } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Circle, 
  Building2, 
  FileText, 
  Landmark, 
  Phone, 
  Mail 
} from "lucide-react";

const steps = [
  { icon: Building2, title: "Registered Business", complete: true },
  { icon: FileText, title: "EIN Number", complete: true },
  { icon: Landmark, title: "Business Bank Account", complete: false, current: true },
  { icon: Phone, title: "Business Phone", complete: false },
  { icon: Mail, title: "Professional Email", complete: false },
];

const checklist = [
  { text: "Gather required documents (EIN letter, formation docs, ID)", checked: true },
  { text: "Research banks with good small business features", checked: true },
  { text: "Compare fees, minimum balances, and features", checked: false },
  { text: "Open the account in person or online", checked: false },
];

export const BusinessStarterPreview = memo(function BusinessStarterPreview() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-muted/30 shadow-lg">
      {/* Gradient overlay at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none" />
      
      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-display text-base font-bold text-foreground">Business Starter</h3>
            <p className="text-xs text-muted-foreground">2 of 5 steps completed</p>
          </div>
          <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "40%" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-full bg-primary rounded-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-4">
          {/* Step navigation */}
          <div className="space-y-1.5">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all ${
                  step.current 
                    ? "bg-primary/10 border border-primary/30" 
                    : step.complete 
                      ? "bg-muted/50"
                      : "opacity-60"
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  step.complete 
                    ? "bg-primary text-primary-foreground" 
                    : step.current
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                }`}>
                  {step.complete ? (
                    <CheckCircle2 className="h-3 w-3" />
                  ) : (
                    <step.icon className="h-3 w-3" />
                  )}
                </div>
                <span className={`font-medium truncate ${step.current ? "text-foreground" : "text-muted-foreground"}`}>
                  {step.title}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Current step content */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Landmark className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-foreground">Business Bank Account</h4>
                <p className="text-xs text-muted-foreground">Separate your finances</p>
              </div>
            </div>
            
            <div className="space-y-2">
              {checklist.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`flex items-start gap-2.5 p-2.5 rounded-lg text-xs ${
                    item.checked ? "bg-primary/5 border border-primary/20" : "border border-border"
                  }`}
                >
                  {item.checked ? (
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground/40 flex-shrink-0" />
                  )}
                  <span className={item.checked ? "text-foreground" : "text-muted-foreground"}>
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
});

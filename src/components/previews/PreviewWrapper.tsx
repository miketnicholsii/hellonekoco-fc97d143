import { memo, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePerformanceMode } from "@/hooks/use-performance-mode";

interface PreviewWrapperProps {
  children: ReactNode;
  expandedContent?: ReactNode;
  title: string;
  accentColor?: "primary" | "secondary" | "accent";
}

export const PreviewWrapper = memo(function PreviewWrapper({ 
  children, 
  title,
  accentColor = "primary"
}: PreviewWrapperProps) {
  const prefersReducedMotion = useReducedMotion();
  const performanceMode = usePerformanceMode();
  const shouldReduceMotion = prefersReducedMotion || performanceMode.reduceMotion;
  const hoverTransition = shouldReduceMotion
    ? { duration: 0.15 }
    : { type: "spring" as const, stiffness: 400, damping: 25 };

  const accentGradients = {
    primary: "from-primary/30 via-primary/15 to-primary/5",
    secondary: "from-secondary/30 via-secondary/15 to-secondary/5",
    accent: "from-accent-gold/30 via-accent-gold/15 to-accent-gold/5"
  };

  const accentBorders = {
    primary: "border-primary/40",
    secondary: "border-secondary/40",
    accent: "border-accent-gold/40"
  };

  return (
    <motion.div
      className="relative group"
      whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -8 }}
      transition={hoverTransition}
    >
      {/* Animated border glow - NEKO branded */}
      <motion.div
        className={`absolute -inset-[3px] bg-gradient-to-br ${accentGradients[accentColor]} rounded-[20px] blur-lg -z-10 opacity-0 group-hover:opacity-90 transition-opacity duration-300`}
      />
      
      {/* Outer glow ring */}
      <motion.div
        className={`absolute -inset-[1px] rounded-[18px] border-2 ${accentBorders[accentColor]} -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />
      
      {children}
    </motion.div>
  );
});
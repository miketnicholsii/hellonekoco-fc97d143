import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CTAVariant = "primary" | "secondary" | "forest" | "outline";
type CTASize = "sm" | "md" | "lg" | "xl";

interface CTAButtonProps {
  to: string;
  children: React.ReactNode;
  variant?: CTAVariant;
  size?: CTASize;
  showArrow?: boolean;
  className?: string;
  external?: boolean;
}

const sizeStyles: Record<CTASize, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-8 py-4 text-base",
  lg: "px-12 py-6 text-base",
  xl: "px-12 py-8 text-lg",
};

const variantStyles: Record<CTAVariant, { background: string; shadow: string; textColor: string }> = {
  primary: {
    background: "linear-gradient(135deg, #E5530A 0%, #C74A09 100%)",
    shadow: "0 8px 32px rgba(229, 83, 10, 0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
    textColor: "text-white",
  },
  secondary: {
    background: "linear-gradient(135deg, #E5530A 0%, #C74A09 100%)",
    shadow: "0 8px 30px rgba(229, 83, 10, 0.35)",
    textColor: "text-white",
  },
  forest: {
    background: "linear-gradient(135deg, hsl(135 22% 18%) 0%, hsl(135 28% 22%) 100%)",
    shadow: "0 8px 24px rgba(31, 42, 33, 0.3)",
    textColor: "text-white",
  },
  outline: {
    background: "transparent",
    shadow: "none",
    textColor: "text-white",
  },
};

export function CTAButton({
  to,
  children,
  variant = "primary",
  size = "lg",
  showArrow = true,
  className,
  external = false,
}: CTAButtonProps) {
  const styles = variantStyles[variant];
  const sizeClass = sizeStyles[size];

  const buttonContent = (
    <motion.span
      className={cn(
        "flex items-center gap-3 relative z-10 group-hover:gap-4 transition-all duration-300",
        styles.textColor
      )}
    >
      {children}
      {showArrow && (
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      )}
      {/* Hover glow overlay */}
      <span
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)",
        }}
      />
    </motion.span>
  );

  const buttonElement = (
    <Button
      asChild
      size="lg"
      className={cn(
        "group rounded-full font-semibold transition-all duration-500 border-0 relative overflow-hidden",
        sizeClass,
        variant === "outline" && "border border-white/20 hover:bg-white/10 hover:border-white/30",
        className
      )}
      style={{
        background: styles.background,
        boxShadow: styles.shadow,
      }}
    >
      {external ? (
        <a href={to} target="_blank" rel="noopener noreferrer">
          {buttonContent}
        </a>
      ) : (
        <Link to={to}>{buttonContent}</Link>
      )}
    </Button>
  );

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {buttonElement}
    </motion.div>
  );
}

// Preset variations for common use cases
export function SayHelloCTA({ size = "lg", className }: { size?: CTASize; className?: string }) {
  return (
    <CTAButton to="/contact" size={size} className={className}>
      Say hello.
    </CTAButton>
  );
}

export function WorkWithNekoCTA({ size = "lg", className }: { size?: CTASize; className?: string }) {
  return (
    <CTAButton to="/invite" size={size} className={className}>
      Work with NÈKO.
    </CTAButton>
  );
}

export function StartConversationCTA({ size = "lg", variant = "primary", className }: { size?: CTASize; variant?: CTAVariant; className?: string }) {
  return (
    <CTAButton to="/contact" size={size} variant={variant} className={className}>
      Start a conversation
    </CTAButton>
  );
}
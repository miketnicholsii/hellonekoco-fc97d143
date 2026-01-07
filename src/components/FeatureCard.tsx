import { memo } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export const FeatureCard = memo(function FeatureCard({ icon: Icon, title, description, className }: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group relative p-5 sm:p-6 rounded-xl bg-card border border-border",
        "transition-all duration-300 ease-out",
        "hover:border-primary/40 hover:shadow-md hover:-translate-y-1",
        className
      )}
    >
      <div className="relative mb-4">
        <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="relative">
        <h3 className="text-base sm:text-lg font-display font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-200">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-primary rounded-b-xl origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </div>
  );
});

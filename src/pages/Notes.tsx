// src/pages/Notes.tsx
import { Link } from "react-router-dom";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { PenLine, ArrowRight, Sparkles } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Notes() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <EccentricNavbar />

      {/* Hero - Warm taupe, minimal */}
      <section 
        className="min-h-screen flex items-center justify-center relative"
        style={{ background: "linear-gradient(180deg, hsl(35 12% 94%) 0%, hsl(35 15% 90%) 100%)" }}
      >
        {/* Subtle accent */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(16 100% 42% / 0.05) 0%, transparent 60%)" }}
          animate={prefersReducedMotion ? {} : { scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10 py-32">
          <motion.div
            className="max-w-xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              variants={itemVariants} 
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-10"
              style={{ background: "linear-gradient(135deg, hsl(135 22% 18%) 0%, hsl(135 28% 25%) 100%)" }}
            >
              <PenLine className="w-7 h-7 text-white" />
            </motion.div>

            <motion.h1 variants={itemVariants} className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-primary mb-8">
              Notes
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-6">
              Occasional updates, experiments, and things we've learned.
            </motion.p>

            <motion.div 
              variants={itemVariants} 
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full mb-12"
              style={{ 
                background: "linear-gradient(135deg, hsl(16 100% 42% / 0.1) 0%, hsl(16 100% 42% / 0.05) 100%)",
                border: "1px solid hsl(16 100% 42% / 0.2)"
              }}
            >
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-2xl sm:text-3xl text-secondary font-bold">Coming soon.</span>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="group rounded-full px-8 py-5 text-base border-border hover:border-secondary hover:bg-secondary/5 transition-all duration-300"
              >
                <Link to="/" className="flex items-center gap-3">
                  Back to home
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
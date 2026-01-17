// src/pages/Sandbox.tsx
import { Link } from "react-router-dom";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

// Stagger container for orchestrated animations
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// Individual item animations with subtle blur
const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    filter: "blur(8px)",
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Paragraph stagger for the body text
const paragraphVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const paragraphContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

export default function Sandbox() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background">
      <EccentricNavbar />

      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Subtle ambient gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/10 pointer-events-none" aria-hidden="true" />
        
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="max-w-2xl mx-auto text-center pt-20"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              variants={prefersReducedMotion ? undefined : itemVariants}
              className="inline-block text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4"
            >
              The sandbox
            </motion.span>
            
            <motion.h1
              variants={prefersReducedMotion ? undefined : itemVariants}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-10"
            >
              A working landscape.
            </motion.h1>

            <motion.div
              variants={prefersReducedMotion ? undefined : paragraphContainerVariants}
              className="space-y-6 text-lg text-muted-foreground leading-relaxed mb-12"
            >
              <motion.p variants={prefersReducedMotion ? undefined : paragraphVariants}>
                NÈKO is not a company in the traditional sense.
              </motion.p>
              <motion.p variants={prefersReducedMotion ? undefined : paragraphVariants}>
                It's a place — where ideas are explored through building.
              </motion.p>
              <motion.p variants={prefersReducedMotion ? undefined : paragraphVariants}>
                Sometimes that leads to collaboration. Sometimes it leads to nothing at all.
              </motion.p>
              <motion.p variants={prefersReducedMotion ? undefined : paragraphVariants}>
                Both outcomes are valuable.
              </motion.p>
              <motion.p 
                variants={prefersReducedMotion ? undefined : paragraphVariants}
                className="text-foreground font-medium"
              >
                The work is real. The pace is human. Access happens by alignment.
              </motion.p>
            </motion.div>

            <motion.div
              variants={prefersReducedMotion ? undefined : itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <Button asChild size="lg" className="rounded-full px-8 transition-transform hover:scale-105">
                <Link to="/contact">Say hello</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 transition-transform hover:scale-105">
                <Link to="/fields">See the fields</Link>
              </Button>
            </motion.div>

            <motion.p
              variants={prefersReducedMotion ? undefined : itemVariants}
              className="text-xs text-muted-foreground/50 tracking-wide"
            >
              Invite only. By alignment.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

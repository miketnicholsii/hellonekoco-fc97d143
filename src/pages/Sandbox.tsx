// src/pages/Sandbox.tsx
import { Link } from "react-router-dom";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { nekoCopy } from "@/content/nekoCopy";
import { ArrowRight } from "lucide-react";

// Cinematic container animation
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Title with dramatic entrance
const titleVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    filter: "blur(12px)",
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Paragraph stagger with gentle blur
const paragraphContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const paragraphVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 24,
    filter: "blur(6px)",
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const footnoteVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8, delay: 0.9 },
  },
};

export default function Sandbox() {
  const c = nekoCopy;
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <EccentricNavbar />

      <section className="min-h-screen flex items-center justify-center relative">
        {/* Subtle gradient backdrop */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-muted/40 via-background to-background pointer-events-none" 
          aria-hidden="true" 
        />
        
        {/* Animated ambient orb - top */}
        <motion.div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-40 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, hsl(168 65% 50% / 0.08) 0%, transparent 70%)",
          }}
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.08, 1],
            opacity: [0.3, 0.45, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />
        
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10 py-32">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Title - dramatic entrance */}
            <motion.h1
              variants={prefersReducedMotion ? undefined : titleVariants}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-16"
            >
              {c.sandbox.title}
            </motion.h1>

            {/* Manifesto body - cinematic paragraph reveals */}
            <motion.div
              variants={prefersReducedMotion ? undefined : paragraphContainerVariants}
              className="space-y-8 text-xl sm:text-2xl leading-relaxed mb-16"
            >
              {c.sandbox.body.map((p, i) => (
                <motion.p 
                  key={i} 
                  variants={prefersReducedMotion ? undefined : paragraphVariants}
                  className={
                    // Last line emphasized
                    i === c.sandbox.body.length - 1
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  }
                >
                  {p}
                </motion.p>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={prefersReducedMotion ? undefined : ctaVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <Button 
                asChild 
                size="lg" 
                className="rounded-full px-10 py-6 bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-base"
              >
                <Link to="/contact" className="flex items-center gap-3">
                  {c.ctas.primary}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="ghost" 
                size="lg" 
                className="rounded-full px-10 py-6 text-muted-foreground hover:text-foreground hover:bg-muted font-medium transition-all duration-300 text-base"
              >
                <Link to="/fields">See the fields</Link>
              </Button>
            </motion.div>

            {/* Footnote */}
            <motion.p
              variants={prefersReducedMotion ? undefined : footnoteVariants}
              className="text-sm text-muted-foreground/50 italic"
            >
              {c.sandbox.footnote}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

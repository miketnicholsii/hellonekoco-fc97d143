// src/pages/Fields.tsx
import { Link } from "react-router-dom";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { nekoCopy } from "@/content/nekoCopy";
import { ArrowRight } from "lucide-react";

// Stagger container for hero section
const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

// Hero items with blur entrance
const heroItemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    filter: "blur(10px)",
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

// Card container for staggered grid
const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

// Individual card with scale and blur
const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95,
    filter: "blur(8px)",
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function Fields() {
  const c = nekoCopy;
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <EccentricNavbar />

      {/* Hero */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 relative overflow-hidden">
        {/* Ambient gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-muted/50 via-background to-background pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Animated orb */}
        <motion.div
          className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full opacity-25 pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(168 65% 50% / 0.1) 0%, transparent 70%)",
          }}
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />
        
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : heroContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              variants={prefersReducedMotion ? undefined : heroItemVariants}
              className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-6"
            >
              {c.sections.fields.label}
            </motion.span>
            
            <motion.h1
              variants={prefersReducedMotion ? undefined : heroItemVariants}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-8"
            >
              {c.sections.fields.title}
            </motion.h1>
            
            <motion.p
              variants={prefersReducedMotion ? undefined : heroItemVariants}
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-12"
            >
              These aren't packages. They're the kinds of work that show up in the sandbox.
              <br className="hidden sm:block" />
              Sometimes they become collaborations. Sometimes they remain private. Either way, they're real.
            </motion.p>

            <motion.div
              variants={prefersReducedMotion ? undefined : heroItemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button 
                asChild 
                size="lg" 
                className="rounded-full px-10 py-6 bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-base"
              >
                <Link to="/contact" className="flex items-center gap-3">
                  Start a conversation
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
            <motion.p 
              variants={prefersReducedMotion ? undefined : heroItemVariants}
              className="text-sm text-muted-foreground/50 mt-4"
            >
              No checkout. No pitch. Just alignment.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Fields Grid */}
      <section className="py-20 sm:py-28 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 lg:gap-8 mb-12"
            variants={prefersReducedMotion ? undefined : cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {c.sections.fields.cards.map((field, i) => (
              <motion.div
                key={field.title}
                variants={prefersReducedMotion ? undefined : cardVariants}
                className="group relative p-8 sm:p-10 rounded-2xl bg-card border border-border/60 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-500"
              >
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <span className="inline-block text-[10px] font-semibold tracking-widest uppercase text-primary/60 mb-4">
                    0{i + 1}
                  </span>
                  <h2 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-4 tracking-tight">
                    {field.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {field.body}
                  </p>
                  <p className="text-sm text-muted-foreground/60 italic">
                    {field.note}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            className="text-center text-sm text-muted-foreground/50 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {c.sections.fields.footerNote}
          </motion.p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

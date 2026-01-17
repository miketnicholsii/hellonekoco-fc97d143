// src/pages/Fields.tsx
import { Link } from "react-router-dom";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const fields = [
  {
    title: "Digital Structures",
    body: "Websites, identities, and systems designed to work — not just look good.",
    bullets: ["Information architecture", "Design systems", "Sites that ship"],
  },
  {
    title: "Strategic Exploration",
    body: "Positioning, business models, and brand strategy tested through real use.",
    bullets: ["Messaging clarity", "Offer shaping", "Brand posture"],
  },
  {
    title: "Public Artifacts",
    body: "Pages, tools, and ideas released when they're ready — not before.",
    bullets: ["Notes", "Tools", "Small experiments"],
  },
];

// Stagger container for hero section
const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// Hero items with subtle blur
const heroItemVariants: Variants = {
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

// Card container for staggered grid
const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Individual card with scale and blur
const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.96,
    filter: "blur(6px)",
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Bullet point stagger
const bulletContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.2,
    },
  },
};

const bulletVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function Fields() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background">
      <EccentricNavbar />

      {/* Hero */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-20 relative overflow-hidden">
        {/* Subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent pointer-events-none" aria-hidden="true" />
        
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : heroContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              variants={prefersReducedMotion ? undefined : heroItemVariants}
              className="inline-block text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4"
            >
              Fields
            </motion.span>
            
            <motion.h1
              variants={prefersReducedMotion ? undefined : heroItemVariants}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6"
            >
              What exists here.
            </motion.h1>
            
            <motion.p
              variants={prefersReducedMotion ? undefined : heroItemVariants}
              className="text-lg text-muted-foreground leading-relaxed mb-10"
            >
              These aren't packages. They're the kinds of work that show up in the sandbox.
              Sometimes they become collaborations. Sometimes they remain private. Either way, they're real.
            </motion.p>

            <motion.div
              variants={prefersReducedMotion ? undefined : heroItemVariants}
              className="flex flex-col items-center gap-3"
            >
              <Button asChild size="lg" className="rounded-full px-8 transition-transform hover:scale-105">
                <Link to="/contact">Start a conversation</Link>
              </Button>
              <p className="text-sm text-muted-foreground/60">
                No checkout. No pitch. Just alignment.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Fields Grid */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto grid gap-8"
            variants={prefersReducedMotion ? undefined : cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {fields.map((f) => (
              <motion.div
                key={f.title}
                variants={prefersReducedMotion ? undefined : cardVariants}
                className="p-8 sm:p-10 rounded-2xl bg-card border border-border transition-shadow hover:shadow-lg"
              >
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  {f.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {f.body}
                </p>
                <motion.div 
                  className="space-y-2"
                  variants={prefersReducedMotion ? undefined : bulletContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {f.bullets.map((b) => (
                    <motion.p 
                      key={b} 
                      variants={prefersReducedMotion ? undefined : bulletVariants}
                      className="text-sm text-muted-foreground/70"
                    >
                      — {b}
                    </motion.p>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// src/pages/Contact.tsx
import { motion, useReducedMotion, Variants } from "framer-motion";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { nekoCopy } from "@/content/nekoCopy";
import { Mail } from "lucide-react";

// Cinematic container
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const titleVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    filter: "blur(10px)",
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const itemVariants: Variants = {
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
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const emailVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const footnoteVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8, delay: 0.6 },
  },
};

export default function Contact() {
  const c = nekoCopy;
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <EccentricNavbar />

      <section className="min-h-screen flex items-center justify-center relative">
        {/* Subtle ambient gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Animated orb */}
        <motion.div
          className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(168 65% 50% / 0.15) 0%, transparent 70%)",
          }}
          animate={prefersReducedMotion ? {} : {
            x: [0, 30, 0],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10 py-32">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Heading */}
            <motion.h1
              variants={prefersReducedMotion ? undefined : titleVariants}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-10"
            >
              {c.contact.heading}
            </motion.h1>

            {/* Body paragraphs */}
            <motion.div
              className="space-y-6 text-lg sm:text-xl text-muted-foreground leading-relaxed mb-14"
            >
              {c.contact.body.map((p, i) => (
                <motion.p 
                  key={i} 
                  variants={prefersReducedMotion ? undefined : itemVariants}
                >
                  {p}
                </motion.p>
              ))}
            </motion.div>

            {/* Email CTA */}
            <motion.div
              variants={prefersReducedMotion ? undefined : emailVariants}
              className="mb-10"
            >
              <a
                href={`mailto:${c.contact.email}?subject=Hello%2C%20N%C3%88KO&body=What%20are%20you%20building%3F%0A%0AWhat%20would%20success%20look%20like%3F%0A%0AAny%20links%20or%20context%3F`}
                className="group inline-flex items-center gap-4 px-8 py-5 rounded-2xl bg-card border border-border/60 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                <span className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </span>
                <span className="text-left">
                  <span className="block text-xs text-muted-foreground mb-1">Email</span>
                  <span className="block text-xl font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                    {c.contact.email}
                  </span>
                </span>
              </a>
            </motion.div>

            {/* Footnote */}
            <motion.p
              variants={prefersReducedMotion ? undefined : footnoteVariants}
              className="text-sm text-muted-foreground/50"
            >
              {c.contact.footnote}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

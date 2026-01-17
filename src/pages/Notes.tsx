// src/pages/Notes.tsx
import { motion, useReducedMotion, Variants } from "framer-motion";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { nekoCopy } from "@/content/nekoCopy";
import { PenLine } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Notes() {
  const c = nekoCopy;
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <EccentricNavbar />

      <section className="min-h-screen flex items-center justify-center relative">
        <div
          className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background pointer-events-none"
          aria-hidden="true"
        />

        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, hsl(168 65% 50% / 0.08) 0%, transparent 70%)",
          }}
          animate={
            prefersReducedMotion
              ? {}
              : { scale: [1, 1.05, 1], opacity: [0.15, 0.25, 0.15] }
          }
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10 py-32">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-8"
            >
              <PenLine className="w-7 h-7 text-muted-foreground" />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6"
            >
              {c.notes.title}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground leading-relaxed mb-8"
            >
              {c.notes.body}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-2xl sm:text-3xl text-primary font-medium"
            >
              {c.notes.coming}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

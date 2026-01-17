// src/pages/Notes.tsx
import { Link } from "react-router-dom";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { PenLine, ArrowRight } from "lucide-react";

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

      {/* Hero - White, minimal */}
      <section className="min-h-screen flex items-center justify-center relative bg-white">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10 py-32">
          <motion.div
            className="max-w-xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="w-16 h-16 rounded-2xl bg-[hsl(40,20%,97%)] flex items-center justify-center mx-auto mb-10">
              <PenLine className="w-7 h-7 text-tertiary/50" />
            </motion.div>

            <motion.h1 variants={itemVariants} className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-tertiary mb-8">
              Notes
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg sm:text-xl text-tertiary/60 leading-relaxed mb-6">
              Occasional updates, experiments, and things I've learned.
            </motion.p>

            <motion.p variants={itemVariants} className="text-3xl sm:text-4xl text-primary font-bold mb-12">
              Coming soon.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-5 text-base">
                <Link to="/" className="flex items-center gap-3">Back to home<ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

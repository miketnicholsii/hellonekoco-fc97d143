// src/pages/Sandbox.tsx
import { Link } from "react-router-dom";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Sandbox() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <EccentricNavbar />

      {/* Hero - Dark, cinematic */}
      <section className="min-h-screen flex items-center justify-center relative bg-[hsl(220,25%,8%)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(168,50%,20%,0.1)_0%,transparent_70%)] pointer-events-none" />
        
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, hsl(168 60% 45% / 0.2) 0%, transparent 60%)" }}
          animate={prefersReducedMotion ? {} : { scale: [1, 1.06, 1], opacity: [0.12, 0.18, 0.12] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10 py-32">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={itemVariants} className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white mb-12">
              The Sandbox
            </motion.h1>

            <motion.div className="space-y-8 text-lg sm:text-xl leading-relaxed mb-16">
              <motion.p variants={itemVariants} className="text-white/70">
                NÈKO is a working landscape —<br />
                a place where I explore ideas through building.
              </motion.p>
              <motion.p variants={itemVariants} className="text-white/50">
                Sometimes that becomes public work.<br />
                Sometimes it becomes paid collaboration.<br />
                Sometimes it becomes nothing at all.
              </motion.p>
              <motion.p variants={itemVariants} className="text-white/60 font-medium">
                All outcomes are valid.
              </motion.p>
              <motion.p variants={itemVariants} className="text-white/70">
                The work is real. The pace is human.<br />
                Access happens by alignment.
              </motion.p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Button asChild size="lg" className="rounded-full px-10 py-6 bg-white text-[hsl(220,25%,8%)] hover:bg-white/90 font-semibold shadow-xl text-base">
                <Link to="/contact" className="flex items-center gap-3">Say hello<ArrowRight className="w-4 h-4" /></Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="rounded-full px-10 py-6 text-white/60 hover:text-white hover:bg-white/10 font-medium text-base">
                <Link to="/fields">See the fields</Link>
              </Button>
            </motion.div>

            <motion.p variants={itemVariants} className="text-sm text-white/30 italic">
              Some things are shared. Some aren't.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

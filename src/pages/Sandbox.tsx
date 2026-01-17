// src/pages/Sandbox.tsx
import { Link } from "react-router-dom";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, TreePine, Compass, Sparkles } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

const floatVariants: Variants = {
  animate: {
    y: [-10, 10, -10],
    rotate: [-3, 3, -3],
    transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function Sandbox() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <EccentricNavbar />

      {/* Hero - Forest Green, cinematic */}
      <section 
        className="min-h-screen flex items-center justify-center relative overflow-hidden noise-texture"
        style={{ background: "linear-gradient(180deg, hsl(135 25% 14%) 0%, hsl(135 28% 10%) 50%, hsl(140 30% 6%) 100%)" }}
      >
        {/* Ambient glow */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 60% 40%, hsl(16 100% 42% / 0.06) 0%, transparent 60%)" }}
        />
        
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, hsl(35 15% 69% / 0.12) 0%, transparent 60%)" }}
          animate={prefersReducedMotion ? {} : { scale: [1, 1.06, 1], opacity: [0.12, 0.18, 0.12] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating icons */}
        <motion.div
          className="absolute top-28 left-[12%] text-secondary/15"
          variants={prefersReducedMotion ? undefined : floatVariants}
          animate="animate"
        >
          <TreePine className="w-12 h-12" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 right-[10%] text-tertiary/20"
          variants={prefersReducedMotion ? undefined : floatVariants}
          animate="animate"
          style={{ animationDelay: "2s" }}
        >
          <Compass className="w-10 h-10" />
        </motion.div>
        
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10 py-32">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10"
              style={{ 
                background: "linear-gradient(135deg, hsl(35 15% 69% / 0.15) 0%, hsl(35 15% 69% / 0.08) 100%)",
                border: "1px solid hsl(35 15% 69% / 0.3)"
              }}
            >
              <Sparkles className="w-4 h-4 text-tertiary" />
              <span className="text-sm font-medium tracking-wide text-tertiary">A working landscape</span>
            </motion.div>

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
              <motion.p variants={itemVariants} className="text-secondary font-medium text-xl">
                All outcomes are valid.
              </motion.p>
              <motion.p variants={itemVariants} className="text-white/60">
                The work is real. The pace is human.<br />
                Access happens by alignment.
              </motion.p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Button 
                asChild 
                size="lg" 
                className="group rounded-full px-10 py-6 font-semibold shadow-xl text-base border-0"
                style={{ background: "linear-gradient(135deg, hsl(16 100% 42%) 0%, hsl(16 90% 35%) 100%)" }}
              >
                <Link to="/contact" className="flex items-center gap-3">
                  Say hello
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="ghost" 
                size="lg" 
                className="rounded-full px-10 py-6 text-white/60 hover:text-white hover:bg-white/10 font-medium text-base"
              >
                <Link to="/fields">See the fields</Link>
              </Button>
            </motion.div>

            <motion.p variants={itemVariants} className="text-sm text-white/30 italic">
              Some things are shared. Some aren't.
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/15 flex items-start justify-center p-1.5"
            animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <motion.div 
              className="w-1.5 h-2 rounded-full bg-secondary"
              animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
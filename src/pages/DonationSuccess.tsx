// src/pages/DonationSuccess.tsx
import { Link } from "react-router-dom";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft, Sparkles } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function DonationSuccess() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <EccentricNavbar />

      <section 
        className="min-h-screen flex items-center justify-center relative overflow-hidden noise-texture"
        style={{ background: "linear-gradient(180deg, #334336 0%, #2a3a2d 50%, #1f2a21 100%)" }}
      >
        {/* Animated background accents */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(229, 83, 10, 0.12) 0%, transparent 60%)" }}
          animate={prefersReducedMotion ? {} : { scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(200, 191, 181, 0.08) 0%, transparent 60%)" }}
          animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />

        {/* Floating particles */}
        {!prefersReducedMotion && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{ 
                  background: i % 2 === 0 ? "#E5530A" : "#C8BFB5",
                  left: `${20 + i * 12}%`,
                  top: `${30 + (i % 3) * 15}%`,
                }}
                animate={{ 
                  y: [-20, 20, -20],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{ 
                  duration: 4 + i * 0.5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        )}

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="max-w-2xl mx-auto text-center" 
            variants={prefersReducedMotion ? undefined : containerVariants} 
            initial="hidden" 
            animate="visible"
          >
            {/* Animated heart icon */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-8 relative"
              style={{ background: "linear-gradient(135deg, #E5530A 0%, #C74A09 100%)" }}
            >
              <motion.div
                animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-10 h-10 text-white" fill="currentColor" />
              </motion.div>
              
              {/* Sparkle accents */}
              <motion.div
                className="absolute -top-2 -right-2"
                animate={prefersReducedMotion ? {} : { rotate: [0, 360], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="w-6 h-6 text-[#E5530A]" />
              </motion.div>
            </motion.div>

            <motion.span 
              variants={itemVariants}
              className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#E5530A] mb-4"
            >
              Thank you
            </motion.span>

            <motion.h1 
              variants={itemVariants} 
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6"
            >
              Your generosity matters.
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl text-white/60 leading-relaxed mb-4"
            >
              Your donation will help support mental health nonprofits. 
              Every contribution makes a difference.
            </motion.p>

            <motion.p 
              variants={itemVariants}
              className="text-base text-white/40 leading-relaxed mb-12"
            >
              A receipt has been sent to your email.<br />
              Quarterly transparency notes are shared with all supporters.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Button
                asChild
                className="group relative rounded-full px-8 py-6 text-base font-semibold overflow-hidden"
                style={{ background: "linear-gradient(135deg, #E5530A 0%, #C74A09 100%)" }}
              >
                <Link to="/" className="flex items-center gap-3 text-white relative z-10">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Back to NÈKO
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

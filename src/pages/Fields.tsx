// src/pages/Fields.tsx
import { Link } from "react-router-dom";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Fields() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <EccentricNavbar />

      {/* Hero - Clean white */}
      <section className="pt-36 sm:pt-44 pb-20 sm:pb-28 bg-white">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span variants={itemVariants} className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-primary mb-6">
              Fields
            </motion.span>
            
            <motion.h1 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-tertiary mb-8">
              Things that exist here.
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg sm:text-xl text-tertiary/60 leading-relaxed mb-10">
              These aren't packages. They're the kinds of work that show up in the sandbox.<br />
              If something here matches what you're building, you can reach out — invite-only.
            </motion.p>

            <motion.p variants={itemVariants} className="text-sm text-tertiary/40">
              No checkout. Just conversation.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Fields Grid - Off-white with heavy cards */}
      <section className="py-24 sm:py-32 lg:py-40 bg-[hsl(40,20%,97%)]">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 lg:gap-8 mb-14"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* Card 1 — Digital Structures */}
            <motion.div variants={itemVariants} className="group p-8 sm:p-10 rounded-2xl bg-white border border-tertiary/10 shadow-lg shadow-tertiary/5 hover:shadow-xl hover:border-primary/20 transition-all duration-500">
              <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-primary/50 mb-5">01</span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-tertiary mb-4 tracking-tight">Digital Structures</h2>
              <p className="text-tertiary/60 leading-relaxed mb-3">Websites, identities, and systems designed to work — not just look good.</p>
              <p className="text-sm text-tertiary/40">Built for clarity, longevity, and real use.</p>
            </motion.div>

            {/* Card 2 — Strategic Exploration */}
            <motion.div variants={itemVariants} className="group p-8 sm:p-10 rounded-2xl bg-white border border-tertiary/10 shadow-lg shadow-tertiary/5 hover:shadow-xl hover:border-primary/20 transition-all duration-500">
              <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-primary/50 mb-5">02</span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-tertiary mb-4 tracking-tight">Strategic Exploration</h2>
              <p className="text-tertiary/60 leading-relaxed mb-3">Positioning, business models, and brand strategy tested in practice.</p>
              <p className="text-sm text-tertiary/40">No templates. No theater. Just honest thinking.</p>
            </motion.div>

            {/* Card 3 — Public Artifacts */}
            <motion.div variants={itemVariants} className="group p-8 sm:p-10 rounded-2xl bg-white border border-tertiary/10 shadow-lg shadow-tertiary/5 hover:shadow-xl hover:border-primary/20 transition-all duration-500">
              <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-primary/50 mb-5">03</span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-tertiary mb-4 tracking-tight">Public Artifacts</h2>
              <p className="text-tertiary/60 leading-relaxed mb-3">Pages, tools, and ideas shared when they're ready — not before.</p>
              <p className="text-sm text-tertiary/40">Some things stay private.</p>
            </motion.div>
          </motion.div>

          <motion.p
            className="text-center text-sm text-tertiary/40 tracking-wide"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Not always available. Always intentional.
          </motion.p>
        </div>
      </section>

      {/* CTA - Dark */}
      <section className="py-24 sm:py-32 bg-[hsl(220,25%,8%)]">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={itemVariants} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-8">
              Something here match what you're building?
            </motion.h2>
            <motion.div variants={itemVariants}>
              <Button asChild size="lg" className="rounded-full px-12 py-6 bg-white text-[hsl(220,25%,8%)] hover:bg-white/90 font-semibold shadow-xl text-base">
                <Link to="/contact" className="flex items-center gap-3">Start a conversation<ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

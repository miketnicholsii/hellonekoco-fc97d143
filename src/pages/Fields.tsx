// src/pages/Fields.tsx
import { Link } from "react-router-dom";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers, Target, FileText } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const fields = [
  {
    icon: Layers,
    number: "01",
    title: "Digital Structures",
    description: "Websites, identities, and systems designed to work — not just look good.",
    note: "Built for clarity, longevity, and real use.",
  },
  {
    icon: Target,
    number: "02",
    title: "Strategic Exploration",
    description: "Positioning, business models, and brand strategy tested in practice.",
    note: "No templates. No theater. Just honest thinking.",
  },
  {
    icon: FileText,
    number: "03",
    title: "Public Artifacts",
    description: "Pages, tools, and ideas shared when they're ready — not before.",
    note: "Some things stay private.",
  },
];

export default function Fields() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <EccentricNavbar />

      {/* Hero - Warm taupe */}
      <section 
        className="pt-36 sm:pt-44 pb-20 sm:pb-28"
        style={{ background: "linear-gradient(180deg, hsl(35 12% 94%) 0%, hsl(35 15% 90%) 100%)" }}
      >
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span variants={itemVariants} className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-secondary mb-6">
              Fields
            </motion.span>
            
            <motion.h1 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-primary mb-8">
              Things that exist here.
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg sm:text-xl text-foreground/60 leading-relaxed mb-10">
              These aren't packages. They're the kinds of work that show up in the sandbox.<br />
              If something here matches what you're building, you can reach out — invite-only.
            </motion.p>

            <motion.p variants={itemVariants} className="text-sm text-foreground/40">
              No checkout. Just conversation.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Fields Grid - White with heavy cards */}
      <section className="py-24 sm:py-32 lg:py-40 bg-white">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 lg:gap-8 mb-14"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {fields.map((field, i) => (
              <motion.div 
                key={i}
                variants={itemVariants} 
                className="group relative p-8 sm:p-10 rounded-2xl bg-white border border-border shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
                whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.02 }}
              >
                {/* Background accent on hover */}
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "linear-gradient(135deg, hsl(16 100% 42% / 0.03) 0%, transparent 60%)" }}
                />

                {/* Icon */}
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{ background: "linear-gradient(135deg, hsl(135 22% 18%) 0%, hsl(135 28% 25%) 100%)" }}
                >
                  <field.icon className="w-6 h-6 text-white" />
                </div>

                <span 
                  className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase mb-4 px-3 py-1 rounded-full"
                  style={{ background: "hsl(16 100% 42% / 0.1)", color: "hsl(16 100% 42%)" }}
                >
                  {field.number}
                </span>
                
                <h2 className="font-display text-xl sm:text-2xl font-bold text-primary mb-4 tracking-tight">
                  {field.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  {field.description}
                </p>
                <p className="text-sm text-muted-foreground/60">
                  {field.note}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-8 right-8 h-1 rounded-full bg-border group-hover:bg-secondary transition-colors duration-500" />
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            className="text-center text-sm text-muted-foreground/60 tracking-wide"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Not always available. Always intentional.
          </motion.p>
        </div>
      </section>

      {/* CTA - Forest Green */}
      <section 
        className="py-24 sm:py-32 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(135 22% 14%) 0%, hsl(135 25% 10%) 100%)" }}
      >
        {/* Ambient glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(16 100% 42% / 0.08) 0%, transparent 60%)" }}
          animate={prefersReducedMotion ? {} : { scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={itemVariants} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-8">
              Something here match what you're <span className="text-secondary">building</span>?
            </motion.h2>
            <motion.div variants={itemVariants}>
              <Button 
                asChild 
                size="lg" 
                className="group rounded-full px-12 py-6 font-semibold shadow-xl text-base border-0"
                style={{ background: "linear-gradient(135deg, hsl(16 100% 42%) 0%, hsl(16 90% 35%) 100%)" }}
              >
                <Link to="/contact" className="flex items-center gap-3">
                  Start a conversation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
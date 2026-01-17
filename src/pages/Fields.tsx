// src/pages/Fields.tsx
import { Link } from "react-router-dom";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers, Target, FileText, Sparkles, Code, Palette } from "lucide-react";

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
    details: ["React / TypeScript / Tailwind", "APIs & automation", "Production-grade code"],
    note: "Built for clarity, longevity, and real use.",
  },
  {
    icon: Target,
    number: "02",
    title: "Strategic Exploration",
    description: "Positioning, business models, and brand strategy tested in practice.",
    details: ["Market positioning", "Messaging frameworks", "Business model design"],
    note: "No templates. No theater. Just honest thinking.",
  },
  {
    icon: FileText,
    number: "03",
    title: "Public Artifacts",
    description: "Pages, tools, and ideas shared when they're ready — not before.",
    details: ["Open experiments", "Shared learnings", "Public builds"],
    note: "Some things stay private.",
  },
];

const additionalWork = [
  { icon: Code, label: "Web Development", description: "Modern, performant, accessible" },
  { icon: Palette, label: "Visual Design", description: "Motion, UI, identity" },
  { icon: Target, label: "Strategy", description: "Positioning & messaging" },
];

export default function Fields() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <EccentricNavbar />

      {/* Hero - Forest Green */}
      <section 
        className="pt-36 sm:pt-44 pb-20 sm:pb-28 relative overflow-hidden noise-texture"
        style={{ background: "linear-gradient(180deg, hsl(135 25% 14%) 0%, hsl(135 28% 10%) 100%)" }}
      >
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(16 100% 42% / 0.05) 0%, transparent 60%)" }}
        />

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{ 
                background: "linear-gradient(135deg, hsl(16 100% 42% / 0.15) 0%, hsl(16 100% 42% / 0.08) 100%)",
                border: "1px solid hsl(16 100% 42% / 0.3)"
              }}
            >
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium tracking-wide text-secondary">Fields</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-8">
              Things that exist here.
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg sm:text-xl text-white/60 leading-relaxed mb-6">
              These aren't packages. They're the kinds of work that show up in the sandbox.
            </motion.p>
            <motion.p variants={itemVariants} className="text-base text-white/40">
              If something here matches what you're building — reach out.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Fields Grid - Warm Taupe */}
      <section 
        className="py-24 sm:py-32 lg:py-40"
        style={{ background: "linear-gradient(180deg, hsl(35 12% 94%) 0%, hsl(35 15% 90%) 100%)" }}
      >
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
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {field.description}
                </p>

                {/* Details chips */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {field.details.map((detail, j) => (
                    <span 
                      key={j} 
                      className="text-[10px] px-2 py-1 rounded-full bg-muted text-muted-foreground"
                    >
                      {detail}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground/60 italic">
                  {field.note}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-8 right-8 h-1 rounded-full bg-border group-hover:bg-secondary transition-colors duration-500" />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <span 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium"
              style={{ 
                background: "linear-gradient(135deg, hsl(16 100% 42% / 0.1) 0%, hsl(16 100% 42% / 0.05) 100%)",
                color: "hsl(16 100% 42%)",
                border: "1px solid hsl(16 100% 42% / 0.2)"
              }}
            >
              <Sparkles className="w-3 h-3" />
              Invite-only. By alignment.
            </span>
          </motion.div>
        </div>
      </section>

      {/* Additional Work - White */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-primary mb-4">
                The toolbox
              </h2>
              <p className="text-muted-foreground">
                I build with modern tools. The stack changes by the job.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
              {additionalWork.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-5 py-3 rounded-full bg-muted/50 border border-border"
                >
                  <item.icon className="w-4 h-4 text-secondary" />
                  <span className="font-medium text-foreground text-sm">{item.label}</span>
                  <span className="text-xs text-muted-foreground">— {item.description}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA - Forest Green */}
      <section 
        className="py-24 sm:py-32 relative overflow-hidden noise-texture"
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
            <motion.h2 variants={itemVariants} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              Something here match what you're <span className="text-secondary">building</span>?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-white/60 text-lg mb-10">
              No checkout. Just conversation.
            </motion.p>
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

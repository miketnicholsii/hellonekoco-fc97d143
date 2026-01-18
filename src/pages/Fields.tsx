// src/pages/Fields.tsx
import { motion, useReducedMotion, Variants } from "framer-motion";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { SayHelloCTA } from "@/components/CTAButton";
import { Layers, Target, FileText, Sparkles } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const fields = [
  {
    icon: Layers,
    title: "Digital Structures",
    description: "Websites, identities, and systems designed to work — not just look good.",
    details: "Production-grade code. Modern tools. Built for clarity, longevity, and real use.",
    badge: "Core",
  },
  {
    icon: FileText,
    title: "Case Studies",
    description: "Real builds. Real results. Selected work with permission to share.",
    details: "Documented outcomes from real projects. Shared with permission.",
    badge: "New",
  },
  {
    icon: Target,
    title: "Digital & Business Strategy",
    description: "Positioning, business models, and brand strategy tested in practice.",
    details: "No templates. No theater. Just honest thinking applied to real problems.",
    badge: "Popular",
  },
];

export default function Fields() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <EccentricNavbar />

      {/* Hero - Forest Green */}
      <section 
        className="pt-36 sm:pt-44 pb-20 sm:pb-28 relative overflow-hidden noise-texture"
        style={{ background: "linear-gradient(180deg, #334336 0%, #2a3a2d 100%)" }}
      >
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(229, 83, 10, 0.04) 0%, transparent 60%)" }}
        />

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-8">
              The work that lives here.
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg sm:text-xl text-white/60 leading-relaxed">
              These aren't packages.<br />
              They're the kinds of work that show up here.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Fields Grid - Warm Taupe */}
      <section 
        className="py-24 sm:py-32 lg:py-40"
        style={{ background: "#EDE7E3" }}
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
                variants={cardVariants} 
                className="group relative p-8 sm:p-10 rounded-2xl bg-white border border-[#C8BFB5]/30 shadow-lg transition-all duration-500 overflow-hidden"
                whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Background accent on hover */}
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(circle at 50% 0%, rgba(229, 83, 10, 0.12) 0%, transparent 60%)" }}
                />

                {/* Badge with pulse animation */}
                <div className="absolute top-4 right-4">
                  <motion.span 
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      field.badge === "Core" 
                        ? "bg-[#334336] text-white" 
                        : field.badge === "New" 
                          ? "bg-[#E5530A] text-white" 
                          : "bg-[#334336]/10 text-[#334336]"
                    }`}
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: 2, delay: i * 0.3 }}
                  >
                    {field.badge}
                  </motion.span>
                </div>

                {/* Icon */}
                <motion.div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: "#334336" }}
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <field.icon className="w-6 h-6 text-white" />
                </motion.div>
                
                <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 tracking-tight" style={{ color: "#334336" }}>
                  {field.title}
                </h2>
                <p className="leading-relaxed" style={{ color: "#334336", opacity: 0.7 }}>
                  {field.description}
                </p>

                {/* Hover reveal details */}
                <motion.div 
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  whileHover={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="pt-4 mt-4 border-t border-[#334336]/10">
                    <p className="text-sm text-[#E5530A] font-medium leading-relaxed">
                      {field.details}
                    </p>
                  </div>
                </motion.div>

                {/* Animated progress bar */}
                <motion.div className="mt-6 h-1 rounded-full overflow-hidden relative" style={{ background: "#C8BFB5" }}>
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ background: "#E5530A" }}
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </motion.div>
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
                background: "rgba(229, 83, 10, 0.1)",
                color: "#E5530A",
                border: "1px solid rgba(229, 83, 10, 0.2)"
              }}
            >
              <Sparkles className="w-3 h-3" />
              Invite-only. By alignment.
            </span>
          </motion.div>
        </div>
      </section>

      {/* CTA - Forest Green */}
      <section 
        className="py-24 sm:py-32 relative overflow-hidden noise-texture"
        style={{ background: "linear-gradient(180deg, #334336 0%, #1f2a21 100%)" }}
      >
        {/* Ambient glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(229, 83, 10, 0.08) 0%, transparent 60%)" }}
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
            <motion.h2 variants={itemVariants} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 text-balance">
              Want to build some <span className="text-[#E5530A] blur-[4px] hover:blur-none transition-all duration-300 select-none cursor-pointer">sh*t</span>?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-white/60 text-lg mb-10">
              For-profit, invitation-led, and we give some of it away. <span className="text-[#E5530A]/80">#mentalhealth</span>
            </motion.p>
            <motion.div variants={itemVariants}>
              <SayHelloCTA size="lg" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

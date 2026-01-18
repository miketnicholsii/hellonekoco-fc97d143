// src/pages/Index.tsx
import { Link } from "react-router-dom";
import { nekoConfig } from "@/lib/neko-config";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { WorkBreakdownCharts } from "@/components/WorkBreakdownCharts";
import CompaniesSection from "@/components/CompaniesSection";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { ArrowRight, Layers, Target, FileText } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const fields = [
  { icon: Layers, title: "Digital Structures", body: "Websites, identities, and systems designed to work — not just look good." },
  { icon: Target, title: "Strategic Exploration", body: "Positioning, business models, and brand strategy tested in practice." },
  { icon: FileText, title: "Public Artifacts", body: "Pages, tools, and ideas shared when they're ready — not before." },
];

export default function Index() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <EccentricNavbar />

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — Dark Forest Green (#334336)
          ═══════════════════════════════════════════════════════════════════ */}
      <section 
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden noise-texture"
        style={{ background: "linear-gradient(180deg, #334336 0%, #2a3a2d 50%, #1f2a21 100%)" }}
      >
        {/* Subtle radial glow */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 30%, rgba(229, 83, 10, 0.06) 0%, transparent 60%)" }}
        />
        
        {/* Animated orb */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(200, 191, 181, 0.12) 0%, transparent 60%)" }}
          animate={prefersReducedMotion ? {} : { scale: [1, 1.08, 1], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10 pt-28 pb-32">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Signature - "Hello," smaller than "NÈKO" */}
            <motion.h1 variants={itemVariants} className="font-display font-bold tracking-tight text-white mb-8">
              <span className="block text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white/70 mb-2">Hello,</span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">NÈKO<span className="text-[#E5530A]">.</span></span>
            </motion.h1>

            {/* Descriptor */}
            <motion.p variants={itemVariants} className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-white/90 mb-12 tracking-tight">
              An independent creative sandbox.
            </motion.p>

            {/* Body copy */}
            <motion.div variants={itemVariants} className="max-w-xl mx-auto space-y-5 text-lg sm:text-xl text-white/65 leading-relaxed mb-8">
              <p>I build real websites, real strategies, and real digital systems.<br />
              Sometimes collaboratively. Sometimes quietly.</p>
              <p className="text-white/45">Sometimes I share what I'm learning. Sometimes I don't.</p>
            </motion.div>

            {/* Statement */}
            <motion.div variants={itemVariants} className="max-w-md mx-auto mb-12">
              <p className="text-lg text-white/50 leading-relaxed">
                NÈKO isn't a marketplace.<br />
                It's a place.
              </p>
            </motion.div>

            {/* Primary CTA */}
            <motion.div variants={itemVariants} className="mb-10 flex flex-col items-center gap-4">
              <Button 
                asChild 
                size="lg" 
                className="group rounded-full px-10 py-7 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1 border-0"
                style={{ 
                  background: "linear-gradient(135deg, #E5530A 0%, #C74A09 100%)",
                  boxShadow: "0 8px 30px rgba(229, 83, 10, 0.4), inset 0 1px 0 rgba(255,255,255,0.15)"
                }}
              >
                <Link to="/contact" className="flex items-center gap-3 text-white">
                  Say hello
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Link
                to="/fields"
                className="text-sm font-semibold tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors"
              >
                See the fields
              </Link>
            </motion.div>

            {/* Badge */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background: "rgba(229, 83, 10, 0.12)", border: "1px solid rgba(229, 83, 10, 0.25)" }}
            >
              <span className="w-2 h-2 rounded-full bg-[#E5530A] animate-pulse" />
              <span className="text-sm font-medium tracking-wide text-[#E5530A]">Invite-only. By alignment.</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
            animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-1 h-2 rounded-full bg-white/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          RATE SIGNAL CARD — Soft Neutral (#EDE7E3)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20" style={{ background: "#EDE7E3" }}>
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-md mx-auto"
            variants={prefersReducedMotion ? undefined : cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="p-8 rounded-2xl bg-white border border-[#C8BFB5]/30 shadow-xl text-center">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#334336]/50 mb-4 block">Rate Signal</span>
              <div className="font-display text-5xl sm:text-6xl font-bold tracking-tight mb-2" style={{ color: "#E5530A" }}>
                {nekoConfig.rate.formatted}
              </div>
              <div className="text-lg text-[#334336]/60 mb-4">{nekoConfig.rate.unit}</div>
              <p className="text-sm text-[#334336]/50">{nekoConfig.rate.description}</p>
            </div>
          </motion.div>
          <p className="mt-6 text-center text-xs sm:text-sm text-[#334336]/45">
            {nekoConfig.brand.missionLine}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          WORK IN MOTION — White (#FFFFFF)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span variants={itemVariants} className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#E5530A] mb-6">
              What lives here
            </motion.span>
            <motion.h2 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-10" style={{ color: "#334336" }}>
              Work, in motion.
            </motion.h2>
            <motion.div variants={itemVariants} className="space-y-6 text-lg sm:text-xl leading-relaxed" style={{ color: "#334336" }}>
              <p>NÈKO is where ideas get tested by building them for real.</p>
              <p className="opacity-70">Some experiments become public artifacts.<br />
              Some become paid collaborations.<br />
              Some stay in the sandbox.</p>
              <p className="opacity-50">What matters is that the work is real — designed, shipped, and used beyond this page.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <WorkBreakdownCharts variant="home" />

      {/* ═══════════════════════════════════════════════════════════════════
          FIELDS — Warm Muted (#C8BFB5)
          ═══════════════════════════════════════════════════════════════════ */}
      <section id="fields" className="py-24 sm:py-32" style={{ background: "#C8BFB5" }}>
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span variants={itemVariants} className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#334336]/60 mb-6">
              Fields
            </motion.span>
            <motion.h2 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight" style={{ color: "#334336" }}>
              Things that exist here.
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-14"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {fields.map((field, i) => (
              <motion.div 
                key={i}
                variants={cardVariants} 
                className="group p-8 sm:p-10 rounded-2xl bg-white/90 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl transition-all duration-500"
                whileHover={prefersReducedMotion ? {} : { y: -6, scale: 1.02 }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: "#334336" }}
                >
                  <field.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight mb-4" style={{ color: "#334336" }}>{field.title}</h3>
                <p className="text-[#334336]/70 leading-relaxed">{field.body}</p>
                <div className="mt-6 h-1 rounded-full bg-[#EDE7E3] group-hover:bg-[#E5530A] transition-colors duration-500" />
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            className="text-center text-sm text-[#334336]/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Not everything is available. Everything is intentional.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          NO CHECKOUT — Dark Forest Green (#334336)
          ═══════════════════════════════════════════════════════════════════ */}
      <section 
        className="py-24 sm:py-32 relative overflow-hidden noise-texture"
        style={{ background: "linear-gradient(180deg, #334336 0%, #2a3a2d 100%)" }}
      >
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span variants={itemVariants} className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#E5530A] mb-6">
              How work happens
            </motion.span>
            <motion.h2 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-10">
              Not for sale. Still for real.
            </motion.h2>
            <motion.div variants={itemVariants} className="space-y-6 text-lg sm:text-xl text-white/60 leading-relaxed">
              <p>NÈKO is for-profit — not free, not a commodity for sale.</p>
              <p>Work begins through conversation, timing, and mutual fit.</p>
              <p className="text-white/45">Sometimes that leads to collaboration.<br />
              Sometimes it doesn't.<br />
              Both outcomes are fine.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          NOT A PITCH — Soft Neutral (#EDE7E3)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32" style={{ background: "#EDE7E3" }}>
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span variants={itemVariants} className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#334336]/50 mb-6">
              The fine print
            </motion.span>
            <motion.h2 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-10" style={{ color: "#334336" }}>
              Built different. On purpose.
            </motion.h2>
            <motion.div variants={itemVariants} className="space-y-6 text-lg sm:text-xl leading-relaxed" style={{ color: "#334336" }}>
              <p>Professional-level work. Real outcomes.<br />
              Payment when alignment exists.</p>
              <p className="opacity-70">NÈKO isn't "for hire" on demand.<br />It's invite-only — because that's how the best work happens.</p>
              <p className="opacity-50">If it fits, we'll shape something together.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <CompaniesSection />

      {/* ═══════════════════════════════════════════════════════════════════
          FINAL CTA — Dark Forest Green (#334336)
          ═══════════════════════════════════════════════════════════════════ */}
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

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span variants={itemVariants} className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#E5530A] mb-6">
              Invitation
            </motion.span>
            <motion.h2 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8">
              If something here resonates…
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-white/60 mb-12">
              Reach out. Not to buy — but to talk.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button 
                asChild 
                size="lg" 
                className="group rounded-full px-10 py-7 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1 border-0"
                style={{ 
                  background: "linear-gradient(135deg, #E5530A 0%, #C74A09 100%)",
                  boxShadow: "0 8px 30px rgba(229, 83, 10, 0.4), inset 0 1px 0 rgba(255,255,255,0.15)"
                }}
              >
                <Link to="/contact" className="flex items-center gap-3 text-white">
                  Start a conversation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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

// src/pages/Index.tsx
import { Link } from "react-router-dom";
import { nekoCopy } from "@/content/nekoCopy";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { ArrowRight, Sparkles, TreePine, Flame } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const floatVariants: Variants = {
  animate: {
    y: [-8, 8, -8],
    rotate: [-2, 2, -2],
    transition: { duration: 7, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function Index() {
  const c = nekoCopy;
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <EccentricNavbar />

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — Forest Green, signature entry
          ═══════════════════════════════════════════════════════════════════ */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden noise-texture"
        style={{ background: "linear-gradient(180deg, hsl(135 25% 14%) 0%, hsl(135 28% 10%) 50%, hsl(140 30% 6%) 100%)" }}
      >
        {/* Subtle radial glow - orange accent */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 30%, hsl(16 100% 42% / 0.08) 0%, transparent 60%)" }}
        />
        
        {/* Animated orb */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(35 15% 69% / 0.15) 0%, transparent 60%)" }}
          animate={prefersReducedMotion ? {} : { scale: [1, 1.08, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating icons */}
        <motion.div
          className="absolute top-32 left-[15%] text-secondary/15"
          variants={prefersReducedMotion ? undefined : floatVariants}
          animate="animate"
        >
          <TreePine className="w-10 h-10" />
        </motion.div>
        <motion.div
          className="absolute bottom-40 right-[12%] text-secondary/20"
          variants={prefersReducedMotion ? undefined : floatVariants}
          animate="animate"
          style={{ animationDelay: "3s" }}
        >
          <Flame className="w-8 h-8" />
        </motion.div>

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10 pt-28 pb-32">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Signature */}
            <motion.h1 variants={itemVariants} className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white mb-10">
              <span className="text-white/80">Hello,</span>{" "}
              <span className="text-white">NÈKO<span className="text-secondary">.</span></span>
            </motion.h1>

            {/* Descriptor */}
            <motion.p variants={itemVariants} className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-white/90 mb-10 tracking-tight">
              An independent creative sandbox.
            </motion.p>

            {/* Body copy — narrow column */}
            <motion.div variants={itemVariants} className="max-w-lg mx-auto space-y-4 text-lg sm:text-xl text-white/60 leading-relaxed mb-8">
              <p>I build real websites, real strategies, and real digital systems.</p>
              <p className="text-white/50">Sometimes collaboratively. Sometimes quietly.<br />Sometimes I share what I'm learning. Sometimes I don't.</p>
            </motion.div>

            {/* Boundary statement */}
            <motion.div variants={itemVariants} className="max-w-md mx-auto mb-14">
              <p className="text-base sm:text-lg text-white/40 leading-relaxed">
                NÈKO isn't a marketplace.<br />
                <span className="text-white/60">It's a place.</span>
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button 
                asChild 
                size="lg" 
                className="group rounded-full px-10 py-6 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 text-base border-0"
                style={{ background: "linear-gradient(135deg, hsl(16 100% 42%) 0%, hsl(16 90% 35%) 100%)" }}
              >
                <Link to="/contact" className="flex items-center gap-3">
                  Say hello
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="rounded-full px-10 py-6 text-white/70 hover:text-white hover:bg-white/10 font-medium transition-all duration-300 text-base">
                <Link to="/sandbox">Read the sandbox note</Link>
              </Button>
            </motion.div>

            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-secondary/60" />
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/30">
                Invite-only. By alignment.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-16 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
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

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1 — WHAT LIVES HERE (Warm taupe background)
          ═══════════════════════════════════════════════════════════════════ */}
      <section 
        className="py-32 sm:py-40 lg:py-48"
        style={{ background: "linear-gradient(180deg, hsl(35 12% 92%) 0%, hsl(35 15% 88%) 100%)" }}
      >
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span variants={itemVariants} className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-secondary mb-8">
              What lives here
            </motion.span>

            <motion.h2 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary mb-12">
              Work, in motion.
            </motion.h2>

            <motion.div className="space-y-8 text-lg sm:text-xl text-foreground/70 leading-relaxed">
              <motion.p variants={itemVariants}>
                NÈKO is where ideas get tested by building them for real.
              </motion.p>
              <motion.p variants={itemVariants} className="text-foreground/50">
                Some experiments become public artifacts.<br />
                Some become paid collaborations.<br />
                Some stay in the sandbox.
              </motion.p>
              <motion.p variants={itemVariants} className="text-foreground/80 font-medium">
                What matters is that the work is real —<br />
                designed, shipped, and used beyond this page.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2 — FIELDS (White with heavy cards)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 sm:py-36 lg:py-44 bg-white">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span variants={itemVariants} className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-secondary mb-6">
              Fields
            </motion.span>
            <motion.h2 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary">
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
            {/* Card 1 — Digital Structures */}
            <motion.div 
              variants={itemVariants} 
              className="group p-8 sm:p-10 rounded-2xl bg-white border border-border shadow-lg hover:shadow-xl transition-all duration-500"
              whileHover={prefersReducedMotion ? {} : { y: -6, scale: 1.02 }}
            >
              <span 
                className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase mb-5 px-3 py-1 rounded-full"
                style={{ background: "hsl(16 100% 42% / 0.1)", color: "hsl(16 100% 42%)" }}
              >
                01
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-primary mb-4 tracking-tight">Digital Structures</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">Websites, identities, and systems designed to work — not just look good.</p>
              <p className="text-sm text-muted-foreground/60">Built for clarity, longevity, and real use.</p>
              <div className="mt-6 h-1 rounded-full bg-border group-hover:bg-secondary transition-colors duration-500" />
            </motion.div>

            {/* Card 2 — Strategic Exploration */}
            <motion.div 
              variants={itemVariants} 
              className="group p-8 sm:p-10 rounded-2xl bg-white border border-border shadow-lg hover:shadow-xl transition-all duration-500"
              whileHover={prefersReducedMotion ? {} : { y: -6, scale: 1.02 }}
            >
              <span 
                className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase mb-5 px-3 py-1 rounded-full"
                style={{ background: "hsl(16 100% 42% / 0.1)", color: "hsl(16 100% 42%)" }}
              >
                02
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-primary mb-4 tracking-tight">Strategic Exploration</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">Positioning, business models, and brand strategy tested in practice.</p>
              <p className="text-sm text-muted-foreground/60">No templates. No theater. Just honest thinking.</p>
              <div className="mt-6 h-1 rounded-full bg-border group-hover:bg-secondary transition-colors duration-500" />
            </motion.div>

            {/* Card 3 — Public Artifacts */}
            <motion.div 
              variants={itemVariants} 
              className="group p-8 sm:p-10 rounded-2xl bg-white border border-border shadow-lg hover:shadow-xl transition-all duration-500"
              whileHover={prefersReducedMotion ? {} : { y: -6, scale: 1.02 }}
            >
              <span 
                className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase mb-5 px-3 py-1 rounded-full"
                style={{ background: "hsl(16 100% 42% / 0.1)", color: "hsl(16 100% 42%)" }}
              >
                03
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-primary mb-4 tracking-tight">Public Artifacts</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">Pages, tools, and ideas shared when they're ready — not before.</p>
              <p className="text-sm text-muted-foreground/60">Some things stay private.</p>
              <div className="mt-6 h-1 rounded-full bg-border group-hover:bg-secondary transition-colors duration-500" />
            </motion.div>
          </motion.div>

          <motion.p
            className="text-center text-sm text-muted-foreground/60 tracking-wide"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Not everything is available. Everything is intentional.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3 — HOW WORK HAPPENS (Deep forest, power-setting)
          ═══════════════════════════════════════════════════════════════════ */}
      <section 
        className="py-32 sm:py-40 lg:py-48"
        style={{ background: "linear-gradient(180deg, hsl(135 22% 14%) 0%, hsl(135 25% 10%) 100%)" }}
      >
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span variants={itemVariants} className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-secondary mb-8">
              How work happens
            </motion.span>

            <motion.h2 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-12">
              There's no checkout.
            </motion.h2>

            <motion.div className="space-y-8 text-lg sm:text-xl text-white/60 leading-relaxed">
              <motion.p variants={itemVariants}>
                NÈKO isn't an agency pipeline or a product you purchase.
              </motion.p>
              <motion.p variants={itemVariants} className="text-white/50">
                Work happens through conversation, timing,<br />
                and mutual interest.
              </motion.p>
              <motion.p variants={itemVariants} className="text-white/50">
                Sometimes that leads to collaboration.<br />
                Sometimes it doesn't.
              </motion.p>
              <motion.p variants={itemVariants} className="text-secondary font-medium text-xl">
                Both outcomes are fine.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4 — REALITY CHECK (Warm taupe, grounded)
          ═══════════════════════════════════════════════════════════════════ */}
      <section 
        className="py-28 sm:py-36 lg:py-44"
        style={{ background: "linear-gradient(180deg, hsl(35 12% 94%) 0%, hsl(35 15% 90%) 100%)" }}
      >
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span variants={itemVariants} className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-muted-foreground mb-8">
              Reality check
            </motion.span>

            <motion.h2 variants={itemVariants} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary mb-12">
              Yes — this is professional.
            </motion.h2>

            <motion.div className="space-y-6 text-lg sm:text-xl text-foreground/60 leading-relaxed">
              <motion.p variants={itemVariants}>
                I do serious, professional-level work.<br />
                I accept payment when it aligns.
              </motion.p>
              <motion.p variants={itemVariants} className="text-foreground/50">
                But NÈKO isn't "for hire" on demand.<br />
                It's invite-only by design.
              </motion.p>
              <motion.p variants={itemVariants} className="text-foreground/70">
                If it fits, we'll find a shape that works.
              </motion.p>
              <motion.p variants={itemVariants} className="text-foreground/50">
                If it doesn't, I'll say so — honestly.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FINAL INVITATION — Deep forest close
          ═══════════════════════════════════════════════════════════════════ */}
      <section 
        className="py-32 sm:py-40 lg:py-48 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(135 25% 12%) 0%, hsl(140 30% 6%) 100%)" }}
      >
        {/* Ambient glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(16 100% 42% / 0.08) 0%, transparent 60%)" }}
          animate={prefersReducedMotion ? {} : { scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-10">
              If something here <span className="text-secondary">resonates</span>…
            </motion.h2>

            <motion.p variants={itemVariants} className="text-xl sm:text-2xl text-white/50 mb-14">
              Reach out.<br />
              Not to buy — but to talk.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Button 
                asChild 
                size="lg" 
                className="group rounded-full px-14 py-7 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 text-lg border-0"
                style={{ background: "linear-gradient(135deg, hsl(16 100% 42%) 0%, hsl(16 90% 35%) 100%)" }}
              >
                <Link to="/contact" className="flex items-center gap-3">
                  Say hello
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            <motion.p variants={itemVariants} className="text-sm text-white/30 mt-10 tracking-wide">
              No promises. No pressure. <span className="text-secondary/70">Just alignment.</span>
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
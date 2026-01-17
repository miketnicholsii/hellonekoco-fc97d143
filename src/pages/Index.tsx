// src/pages/Index.tsx
import { Link } from "react-router-dom";
import { nekoCopy } from "@/content/nekoCopy";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Index() {
  const c = nekoCopy;
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <EccentricNavbar />

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — Signature Entry (Darkened, larger type, more breathing room)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[hsl(220,25%,8%)]">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(168,50%,20%,0.15)_0%,transparent_70%)] pointer-events-none" />
        
        {/* Animated orb */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(168 60% 45% / 0.25) 0%, transparent 60%)" }}
          animate={prefersReducedMotion ? {} : { scale: [1, 1.08, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

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
              <span className="text-white">NÈKO<span className="text-primary">.</span></span>
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
              <Button asChild size="lg" className="rounded-full px-10 py-6 bg-white text-[hsl(220,25%,8%)] hover:bg-white/90 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 text-base">
                <Link to="/contact" className="flex items-center gap-3">Say hello<ArrowRight className="w-4 h-4" /></Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="rounded-full px-10 py-6 text-white/70 hover:text-white hover:bg-white/10 font-medium transition-all duration-300 text-base">
                <Link to="/sandbox">Read the sandbox note</Link>
              </Button>
            </motion.div>

            {/* Badge */}
            <motion.p variants={itemVariants} className="text-xs font-semibold tracking-[0.2em] uppercase text-white/30">
              Invite-only. By alignment.
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll indicator — more space above */}
        <motion.div
          className="absolute bottom-16 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <motion.div
            className="w-5 h-9 rounded-full border-2 border-white/15 flex items-start justify-center p-1.5"
            animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <motion.div className="w-1 h-2 rounded-full bg-white/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1 — WHAT LIVES HERE (High contrast, lots of white space)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-32 sm:py-40 lg:py-48 bg-white">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span variants={itemVariants} className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-primary mb-8">
              What lives here
            </motion.span>

            <motion.h2 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-tertiary mb-12">
              Work, in motion.
            </motion.h2>

            <motion.div className="space-y-8 text-lg sm:text-xl text-tertiary/70 leading-relaxed">
              <motion.p variants={itemVariants}>
                NÈKO is where ideas get tested by building them for real.
              </motion.p>
              <motion.p variants={itemVariants} className="text-tertiary/60">
                Some experiments become public artifacts.<br />
                Some become paid collaborations.<br />
                Some stay in the sandbox.
              </motion.p>
              <motion.p variants={itemVariants} className="text-tertiary/80 font-medium">
                What matters is that the work is real —<br />
                designed, shipped, and used beyond this page.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2 — FIELDS (Subtle texture, heavy cards)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 sm:py-36 lg:py-44 bg-[hsl(40,20%,97%)]">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span variants={itemVariants} className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-primary mb-6">
              Fields
            </motion.span>
            <motion.h2 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-tertiary">
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
            <motion.div variants={itemVariants} className="group p-8 sm:p-10 rounded-2xl bg-white border border-tertiary/10 shadow-lg shadow-tertiary/5 hover:shadow-xl hover:border-primary/20 transition-all duration-500">
              <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-primary/50 mb-5">01</span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-tertiary mb-4 tracking-tight">Digital Structures</h3>
              <p className="text-tertiary/60 leading-relaxed mb-3">Websites, identities, and systems designed to work — not just look good.</p>
              <p className="text-sm text-tertiary/40">Built for clarity, longevity, and real use.</p>
            </motion.div>

            {/* Card 2 — Strategic Exploration */}
            <motion.div variants={itemVariants} className="group p-8 sm:p-10 rounded-2xl bg-white border border-tertiary/10 shadow-lg shadow-tertiary/5 hover:shadow-xl hover:border-primary/20 transition-all duration-500">
              <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-primary/50 mb-5">02</span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-tertiary mb-4 tracking-tight">Strategic Exploration</h3>
              <p className="text-tertiary/60 leading-relaxed mb-3">Positioning, business models, and brand strategy tested in practice.</p>
              <p className="text-sm text-tertiary/40">No templates. No theater. Just honest thinking.</p>
            </motion.div>

            {/* Card 3 — Public Artifacts */}
            <motion.div variants={itemVariants} className="group p-8 sm:p-10 rounded-2xl bg-white border border-tertiary/10 shadow-lg shadow-tertiary/5 hover:shadow-xl hover:border-primary/20 transition-all duration-500">
              <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-primary/50 mb-5">03</span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-tertiary mb-4 tracking-tight">Public Artifacts</h3>
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
            Not everything is available. Everything is intentional.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3 — HOW WORK HAPPENS (Dark, power-setting)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-32 sm:py-40 lg:py-48 bg-[hsl(220,25%,8%)]">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span variants={itemVariants} className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-primary mb-8">
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
              <motion.p variants={itemVariants} className="text-white/70 font-medium">
                Both outcomes are fine.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4 — REALITY CHECK (Light, grounded, transparent)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 sm:py-36 lg:py-44 bg-white">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span variants={itemVariants} className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-tertiary/40 mb-8">
              Reality check
            </motion.span>

            <motion.h2 variants={itemVariants} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-tertiary mb-12">
              Yes — this is professional.
            </motion.h2>

            <motion.div className="space-y-6 text-lg sm:text-xl text-tertiary/60 leading-relaxed">
              <motion.p variants={itemVariants}>
                I do serious, professional-level work.<br />
                I accept payment when it aligns.
              </motion.p>
              <motion.p variants={itemVariants} className="text-tertiary/50">
                But NÈKO isn't "for hire" on demand.<br />
                It's invite-only by design.
              </motion.p>
              <motion.p variants={itemVariants} className="text-tertiary/70">
                If it fits, we'll find a shape that works.
              </motion.p>
              <motion.p variants={itemVariants} className="text-tertiary/50">
                If it doesn't, I'll say so — honestly.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FINAL INVITATION — Emotional Close (Deep dark)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-32 sm:py-40 lg:py-48 bg-[hsl(220,30%,6%)]">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-10">
              If something here resonates…
            </motion.h2>

            <motion.p variants={itemVariants} className="text-xl sm:text-2xl text-white/50 mb-14">
              Reach out.<br />
              Not to buy — but to talk.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Button asChild size="lg" className="rounded-full px-14 py-7 bg-white text-[hsl(220,30%,6%)] hover:bg-white/90 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 text-lg">
                <Link to="/contact" className="flex items-center gap-3">Say hello<ArrowRight className="w-5 h-5" /></Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

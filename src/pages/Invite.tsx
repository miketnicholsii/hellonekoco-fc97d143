// src/pages/Invite.tsx
import { Link } from "react-router-dom";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Heart, MessageCircle, Sparkles, Clock, Gift } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const floatVariants: Variants = {
  animate: {
    y: [-8, 8, -8],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function Invite() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <EccentricNavbar />

      {/* HERO — Dark, cinematic */}
      <section className="relative pt-32 sm:pt-44 pb-24 sm:pb-32 bg-gradient-dark overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-20 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(168 65% 50% / 0.08) 0%, transparent 70%)",
          }}
          animate={prefersReducedMotion ? {} : { scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(280 60% 50% / 0.06) 0%, transparent 70%)",
          }}
          animate={prefersReducedMotion ? {} : { scale: [1.1, 1, 1.1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4"
            >
              Work With Me
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-white/50 font-medium tracking-wide mb-12"
            >
              Invite-only
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-6 max-w-xl mx-auto">
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed font-light">
                Sometimes NÈKO becomes collaboration.
              </p>
              <p className="text-lg sm:text-xl text-white/70 leading-relaxed">
                When it does, it's because the work fits —<br />
                not because there's an opening on a calendar.
              </p>
              <p className="text-base text-white/50 leading-relaxed mt-8">
                This is invite-only by design.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          >
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-white/40"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* HOW I WORK — White, clean, spacious */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span
              variants={itemVariants}
              className="block text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-6"
            >
              How I Work
            </motion.span>

            <motion.div variants={itemVariants} className="space-y-6">
              {[
                "Clear scope, calm pace, honest feedback",
                "High craft, real shipping, thoughtful over-delivery",
                "Not a vendor relationship — a focused collaboration",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4 group"
                  whileHover={prefersReducedMotion ? {} : { x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed pt-1">
                    {item}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* RATE SIGNAL — Off-white, grounded */}
      <section className="py-24 sm:py-32 bg-muted/50">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              variants={cardVariants}
              className="relative p-10 sm:p-14 rounded-3xl bg-white border border-border/40 shadow-lg shadow-black/5"
            >
              <motion.div
                className="absolute top-8 right-8"
                variants={prefersReducedMotion ? undefined : floatVariants}
                animate="animate"
              >
                <Clock className="w-6 h-6 text-primary/30" />
              </motion.div>

              <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-6">
                A Note on Money
              </span>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10">
                If we work together, I use time as a baseline — not a menu.
              </p>

              <div className="flex items-baseline gap-3 mb-8">
                <span className="font-display text-6xl sm:text-7xl font-bold text-foreground">
                  $375
                </span>
                <span className="text-xl text-muted-foreground">
                  / hour
                </span>
              </div>

              <p className="text-muted-foreground/70 text-sm mb-10 max-w-md">
                Used to set expectations, not to sell blocks of time.
              </p>

              <div className="border-t border-border pt-8 space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  For small explorations or previews, I often suggest:
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border/40">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    <span className="text-foreground/80">A short, capped session</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border/40">
                    <Gift className="w-5 h-5 text-primary" />
                    <span className="text-foreground/80">A name-your-budget contribution</span>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-border">
                <p className="text-muted-foreground/60 text-sm leading-relaxed">
                  If it aligns, we go deeper.<br />
                  If not, that's okay.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* NONPROFIT / DONATION — Dark, emotional, honest */}
      <section className="py-24 sm:py-32 bg-gradient-dark text-white">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              variants={cardVariants}
              className="relative p-10 sm:p-14 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <motion.div
                className="absolute top-8 right-8"
                animate={prefersReducedMotion ? {} : { scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-6 h-6 text-primary/60" />
              </motion.div>

              <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-6">
                Why Payment Matters
              </span>

              <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mb-8">
                NÈKO operates as a nonprofit.
              </h3>

              <p className="text-xl text-white/70 leading-relaxed mb-10 max-w-2xl">
                Any money that comes in helps fund mental health institutions
                and support people who need it.
              </p>

              <div className="space-y-4 mb-12">
                <p className="text-white/60 text-lg">You can:</p>
                <div className="grid gap-3">
                  {[
                    "Contribute toward a collaboration",
                    "Pay for a small preview or review",
                    "Simply donate to support the mission",
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                      whileHover={prefersReducedMotion ? {} : { x: 4, backgroundColor: "rgba(255,255,255,0.08)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-white/80">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <p className="text-white/50 leading-relaxed">
                  This work is a passion.<br />
                  It's also how I help others.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA — White, clean, powerful */}
      <section className="py-28 sm:py-40 bg-white">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={itemVariants}
              className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-12"
            >
              If something here resonates…
            </motion.h2>

            <motion.div variants={itemVariants}>
              <Button
                asChild
                size="lg"
                className="rounded-full px-12 py-7 bg-foreground text-background hover:bg-foreground/90 font-medium shadow-xl hover:shadow-2xl transition-all duration-300 text-lg group"
              >
                <Link to="/contact" className="flex items-center gap-3">
                  Start a conversation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-sm text-muted-foreground/60 mt-8"
            >
              No promises. No pressure. Just alignment.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

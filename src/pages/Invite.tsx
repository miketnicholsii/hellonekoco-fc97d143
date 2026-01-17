// src/pages/Invite.tsx
import { Link } from "react-router-dom";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Check, 
  Heart, 
  MessageCircle, 
  Sparkles, 
  Clock, 
  Gift,
  Zap,
  Target,
  Compass,
  Shield,
  Coffee,
  TreePine,
  Flame
} from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const floatVariants: Variants = {
  animate: {
    y: [-10, 10, -10],
    rotate: [-2, 2, -2],
    transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
  },
};

const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

const glowVariants: Variants = {
  animate: {
    boxShadow: [
      "0 0 30px hsl(16 100% 42% / 0.2)",
      "0 0 60px hsl(16 100% 42% / 0.4)",
      "0 0 30px hsl(16 100% 42% / 0.2)",
    ],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function Invite() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <EccentricNavbar />

      {/* HERO — Deep Forest Green, cinematic */}
      <section className="relative pt-36 sm:pt-48 pb-32 sm:pb-44 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(135 25% 14%) 0%, hsl(135 28% 10%) 50%, hsl(140 30% 6%) 100%)" }}>
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 70% 20%, hsl(16 100% 42% / 0.08) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(35 15% 69% / 0.06) 0%, transparent 70%)",
          }}
          animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
        
        {/* Floating icons */}
        <motion.div
          className="absolute top-32 left-[10%] text-secondary/20"
          variants={prefersReducedMotion ? undefined : floatVariants}
          animate="animate"
        >
          <TreePine className="w-12 h-12" />
        </motion.div>
        <motion.div
          className="absolute bottom-40 right-[15%] text-secondary/25"
          variants={prefersReducedMotion ? undefined : floatVariants}
          animate="animate"
          style={{ animationDelay: "2s" }}
        >
          <Flame className="w-10 h-10" />
        </motion.div>

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-10"
              style={{ 
                background: "linear-gradient(135deg, hsl(16 100% 42% / 0.15) 0%, hsl(16 100% 42% / 0.08) 100%)",
                border: "1px solid hsl(16 100% 42% / 0.3)"
              }}
            >
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-semibold tracking-wide text-secondary">Invite-only</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8"
              style={{ textShadow: "0 4px 60px hsl(0 0% 0% / 0.5)" }}
            >
              Work With Me
            </motion.h1>

            <motion.div variants={itemVariants} className="space-y-6 max-w-2xl mx-auto">
              <p className="text-2xl sm:text-3xl text-white/90 leading-relaxed font-light">
                Sometimes NÈKO becomes <span className="text-secondary font-medium">collaboration</span>.
              </p>
              <p className="text-lg sm:text-xl text-white/60 leading-relaxed">
                When it does, it's because the work fits —<br />
                not because there's an opening on a calendar.
              </p>
              <p className="text-base text-white/40 leading-relaxed mt-10 tracking-wide uppercase font-medium">
                This is invite-only by design.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-7 h-12 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          >
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, 14, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-2 h-2 rounded-full bg-secondary"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* HOW I WORK — Warm taupe, earthy */}
      <section className="py-28 sm:py-40" style={{ background: "linear-gradient(180deg, hsl(35 12% 92%) 0%, hsl(35 15% 88%) 100%)" }}>
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-5xl mx-auto"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] uppercase text-secondary mb-4">
                <Target className="w-4 h-4" />
                How I Work
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mt-4">
                Focused. Honest. Real.
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Shield,
                  title: "Clear Scope",
                  desc: "Calm pace, honest feedback",
                },
                {
                  icon: Zap,
                  title: "High Craft",
                  desc: "Real shipping, thoughtful over-delivery",
                },
                {
                  icon: Compass,
                  title: "True Partnership",
                  desc: "Not a vendor — a focused collaboration",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="group relative p-8 sm:p-10 rounded-3xl bg-white border border-border/50 shadow-lg hover:shadow-xl transition-all duration-500"
                  whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ 
                      background: "linear-gradient(135deg, hsl(16 100% 42% / 0.05) 0%, transparent 60%)",
                    }}
                  />
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                    style={{ 
                      background: "linear-gradient(135deg, hsl(135 22% 18%) 0%, hsl(135 28% 25%) 100%)",
                    }}
                  >
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="absolute bottom-0 left-8 right-8 h-1 rounded-full bg-secondary/20 group-hover:bg-secondary transition-colors duration-500" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* RATE SIGNAL — Bold, dynamic, attention-grabbing */}
      <section className="py-28 sm:py-40 bg-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-mesh)" }} />
        
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-5xl mx-auto"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] uppercase text-secondary mb-4">
                <Clock className="w-4 h-4" />
                A Note on Money
              </span>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto">
                If we work together, I use time as a baseline — not a menu.
              </p>
            </motion.div>

            {/* The Big Rate Card */}
            <motion.div
              variants={cardVariants}
              className="relative"
            >
              <motion.div
                className="absolute -inset-1 rounded-[2.5rem] opacity-60 blur-xl"
                style={{ background: "linear-gradient(135deg, hsl(135 22% 18%) 0%, hsl(16 100% 42%) 100%)" }}
                variants={prefersReducedMotion ? undefined : glowVariants}
                animate="animate"
              />
              
              <div 
                className="relative p-12 sm:p-16 lg:p-20 rounded-[2rem] overflow-hidden"
                style={{ background: "linear-gradient(160deg, hsl(135 22% 16%) 0%, hsl(135 28% 12%) 50%, hsl(140 30% 8%) 100%)" }}
              >
                {/* Floating accent shapes */}
                <motion.div
                  className="absolute top-8 right-8 w-32 h-32 rounded-full"
                  style={{ background: "radial-gradient(circle, hsl(16 100% 42% / 0.15) 0%, transparent 70%)" }}
                  animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute bottom-12 left-12 w-48 h-48 rounded-full"
                  style={{ background: "radial-gradient(circle, hsl(35 15% 69% / 0.08) 0%, transparent 70%)" }}
                  animate={prefersReducedMotion ? {} : { scale: [1.1, 1, 1.1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />

                <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  {/* Rate Display */}
                  <div className="text-center lg:text-left">
                    <motion.div
                      className="inline-flex items-baseline gap-3"
                      variants={prefersReducedMotion ? undefined : pulseVariants}
                      animate="animate"
                    >
                      <span 
                        className="font-display text-8xl sm:text-9xl lg:text-[10rem] font-bold tracking-tight"
                        style={{ 
                          background: "linear-gradient(135deg, hsl(16 100% 50%) 0%, hsl(16 100% 42%) 50%, hsl(25 90% 45%) 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          textShadow: "0 0 80px hsl(16 100% 42% / 0.4)",
                        }}
                      >
                        $375
                      </span>
                    </motion.div>
                    <div className="flex items-center justify-center lg:justify-start gap-2 mt-4">
                      <span className="text-2xl sm:text-3xl text-white/60 font-light">/ hour</span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide text-secondary bg-secondary/20 border border-secondary/30">
                        BASELINE
                      </span>
                    </div>
                    <p className="text-white/40 text-sm mt-6 max-w-xs mx-auto lg:mx-0">
                      Used to set expectations, not to sell blocks of time.
                    </p>
                  </div>

                  {/* Options */}
                  <div className="space-y-5">
                    <p className="text-white/70 text-lg mb-6">
                      For small explorations or previews:
                    </p>
                    {[
                      { icon: MessageCircle, text: "A short, capped session", desc: "Limited scope, focused outcome" },
                      { icon: Gift, text: "Name-your-budget contribution", desc: "Flexible entry point" },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="group flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-secondary/30 transition-all duration-300"
                        whileHover={prefersReducedMotion ? {} : { x: 8 }}
                      >
                        <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/30 transition-colors">
                          <item.icon className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                          <span className="text-white font-semibold text-lg block">{item.text}</span>
                          <span className="text-white/40 text-sm">{item.desc}</span>
                        </div>
                      </motion.div>
                    ))}
                    
                    <div className="pt-6 border-t border-white/10">
                      <p className="text-white/50 text-sm leading-relaxed">
                        If it aligns, we go deeper.<br />
                        <span className="text-white/30">If not, that's okay.</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* NONPROFIT / DONATION — Deep forest, emotional */}
      <section className="py-28 sm:py-40 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(135 22% 14%) 0%, hsl(135 25% 10%) 50%, hsl(140 28% 6%) 100%)" }}>
        {/* Ambient glow */}
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(16 100% 42% / 0.06) 0%, transparent 60%)" }}
          animate={prefersReducedMotion ? {} : { scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-5xl mx-auto"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Message */}
              <motion.div variants={itemVariants}>
                <motion.div
                  className="inline-flex items-center gap-3 mb-8"
                  animate={prefersReducedMotion ? {} : { scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Heart className="w-8 h-8 text-secondary" fill="currentColor" />
                  <span className="text-xs font-bold tracking-[0.3em] uppercase text-secondary">
                    Why Payment Matters
                  </span>
                </motion.div>

                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                  NÈKO operates as a <span className="text-secondary">nonprofit</span>.
                </h2>

                <p className="text-xl sm:text-2xl text-white/70 leading-relaxed mb-8">
                  Any money that comes in helps fund <span className="text-white">mental health institutions</span> and support people who need it.
                </p>

                <div className="pt-8 border-t border-white/10">
                  <p className="text-white/40 leading-relaxed text-lg">
                    This work is a passion.<br />
                    <span className="text-white/60">It's also how I help others.</span>
                  </p>
                </div>
              </motion.div>

              {/* Right: Ways to contribute */}
              <motion.div variants={cardVariants} className="space-y-4">
                <p className="text-white/60 text-lg mb-6 font-medium">You can:</p>
                {[
                  { icon: Coffee, text: "Contribute toward a collaboration", highlight: false },
                  { icon: Sparkles, text: "Pay for a small preview or review", highlight: false },
                  { icon: Heart, text: "Simply donate to support the mission", highlight: true },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className={`group flex items-center gap-5 p-6 rounded-2xl border transition-all duration-300 ${
                      item.highlight 
                        ? "bg-secondary/10 border-secondary/40 hover:bg-secondary/15" 
                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                    }`}
                    whileHover={prefersReducedMotion ? {} : { x: 8, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      item.highlight 
                        ? "bg-secondary text-white" 
                        : "bg-white/10 text-secondary group-hover:bg-secondary/20"
                    }`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span className={`text-lg font-medium ${item.highlight ? "text-white" : "text-white/80"}`}>
                      {item.text}
                    </span>
                    {item.highlight && (
                      <ArrowRight className="w-5 h-5 text-secondary ml-auto group-hover:translate-x-1 transition-transform" />
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA — White, powerful, clean */}
      <section className="py-32 sm:py-48 bg-white relative overflow-hidden">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-30" style={{ background: "var(--gradient-mesh)" }} />
        
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={itemVariants}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight"
            >
              If something here <br />
              <span className="text-secondary">resonates</span>…
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-xl text-muted-foreground mb-14"
            >
              Reach out. Not to buy — but to talk.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Button
                asChild
                size="lg"
                className="group relative rounded-full px-14 py-8 font-semibold text-xl overflow-hidden transition-all duration-500 border-0"
                style={{ 
                  background: "linear-gradient(135deg, hsl(135 22% 18%) 0%, hsl(135 28% 22%) 100%)",
                }}
              >
                <Link to="/contact" className="flex items-center gap-3">
                  <span className="relative z-10">Start a conversation</span>
                  <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                  <motion.div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(135deg, hsl(16 100% 42%) 0%, hsl(16 90% 35%) 100%)" }}
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                </Link>
              </Button>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-sm text-muted-foreground/60 mt-10 tracking-wide"
            >
              No promises. No pressure. <span className="text-secondary">Just alignment.</span>
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
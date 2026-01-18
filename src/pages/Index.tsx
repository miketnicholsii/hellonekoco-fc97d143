// src/pages/Index.tsx
import { Link } from "react-router-dom";
import { useRef } from "react";
import { nekoConfig } from "@/lib/neko-config";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { WorkBreakdownCharts } from "@/components/WorkBreakdownCharts";
import { AnimatedRateCard } from "@/components/AnimatedRateCard";
import CompaniesSection from "@/components/CompaniesSection";
import { RotatingPill } from "@/components/RotatingPill";
import { motion, useReducedMotion, useScroll, useTransform, Variants } from "framer-motion";
import { ArrowRight, Layers, Target, BarChart3 } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)", 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.92, rotateX: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
  },
};

const floatVariants: Variants = {
  initial: { y: 0 },
  float: { 
    y: [-8, 8, -8],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
  }
};

const fields = [
  { 
    icon: Layers, 
    title: "Digital Structures", 
    body: "Revenue systems engineered for scale. Built to perform under load, adapt under pressure, and compound over time.",
    details: "Production-grade infrastructure that grows with you — not against you.",
    badge: "BUILT TO LAST"
  },
  { 
    icon: BarChart3, 
    title: "Numbers", 
    body: "Profit. Engagement. Conversions. The only metrics that matter — tracked before opinions enter the room.",
    details: "If it can't be measured, it doesn't exist here.",
    badge: "RESULTS FIRST"
  },
  { 
    icon: Target, 
    title: "Digital & Business Strategy", 
    body: "Positioning and decisions made where real stakes exist. We fix the thinking before the build.",
    details: "No safety nets. No theoretical frameworks. Just clarity that compounds.",
    badge: "MOMENTUM MATTERS"
  },
];

export default function Index() {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  
  // Parallax scroll effects for hero
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <EccentricNavbar />

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — Dark Forest Green (#334336)
          ═══════════════════════════════════════════════════════════════════ */}
      <section 
        ref={heroRef}
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden noise-texture"
        style={{ background: "linear-gradient(180deg, #334336 0%, #2a3a2d 50%, #1f2a21 100%)" }}
      >
        {/* Animated mesh gradient background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-1/2 -left-1/4 w-[150%] h-[150%]"
            style={{ 
              background: "radial-gradient(ellipse 60% 40% at 30% 40%, rgba(229, 83, 10, 0.08) 0%, transparent 50%)",
            }}
            animate={prefersReducedMotion ? {} : { 
              x: [0, 50, 0], 
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-1/2 -right-1/4 w-[150%] h-[150%]"
            style={{ 
              background: "radial-gradient(ellipse 50% 50% at 70% 60%, rgba(200, 191, 181, 0.06) 0%, transparent 50%)",
            }}
            animate={prefersReducedMotion ? {} : { 
              x: [0, -40, 0], 
              y: [0, -20, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>
        
        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-[#E5530A]/20 blur-sm"
          variants={floatVariants}
          initial="initial"
          animate={prefersReducedMotion ? "initial" : "float"}
        />
        <motion.div
          className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full bg-white/10 blur-sm"
          variants={floatVariants}
          initial="initial"
          animate={prefersReducedMotion ? "initial" : "float"}
          transition={{ delay: 1 }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-4 h-4 rounded-full bg-[#C8BFB5]/15 blur-sm"
          variants={floatVariants}
          initial="initial"
          animate={prefersReducedMotion ? "initial" : "float"}
          transition={{ delay: 2 }}
        />

        <motion.div 
          className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10 pt-28 pb-32"
          style={prefersReducedMotion ? {} : { opacity: heroOpacity, scale: heroScale, y: heroY }}
        >
          <motion.div
            className="max-w-3xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Signature with staggered letters */}
            <motion.h1 variants={itemVariants} className="font-display font-bold tracking-tight text-white mb-8">
              <motion.span 
                className="block text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white/70 mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Hello,
              </motion.span>
              <motion.span 
                className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                NÈKO
                <motion.span 
                  className="text-[#E5530A] inline-block"
                  animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  .
                </motion.span>
                {/* Subtle glow behind text */}
                <motion.div
                  className="absolute inset-0 -z-10 blur-3xl"
                  style={{ background: "radial-gradient(circle, rgba(229, 83, 10, 0.15) 0%, transparent 60%)" }}
                  animate={prefersReducedMotion ? {} : { opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.span>
            </motion.h1>

            {/* Descriptor with typing effect feel */}
            <motion.p 
              variants={itemVariants} 
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-white/90 mb-12 tracking-tight"
            >
              An independent creative sandbox.
            </motion.p>

            {/* Body copy with staggered fade */}
            <motion.div variants={itemVariants} className="max-w-xl mx-auto space-y-5 text-lg sm:text-xl text-white/65 leading-relaxed mb-8">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                I build real websites, real strategies, and real digital systems.<br />
                Sometimes collaboratively. Sometimes quietly.
              </motion.p>
              <motion.p 
                className="text-white/45"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                Sometimes I share what I'm learning. Sometimes I don't.
              </motion.p>
            </motion.div>

            {/* Statement - Updated CTA */}
            <motion.div 
              variants={itemVariants} 
              className="max-w-md mx-auto mb-12"
            >
              <motion.p 
                className="text-lg text-white/50 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                Want to build cool sh*t?<br />
                <span className="text-[#E5530A] font-semibold">Just say hello.</span>
              </motion.p>
            </motion.div>

            {/* Primary CTA with enhanced hover */}
            <motion.div variants={itemVariants} className="mb-10 flex flex-col items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button 
                  asChild 
                  size="lg" 
                  className="group rounded-full px-10 py-7 text-lg font-semibold shadow-2xl transition-all duration-300 border-0 relative overflow-hidden"
                  style={{ 
                    background: "linear-gradient(135deg, #E5530A 0%, #C74A09 100%)",
                    boxShadow: "0 8px 30px rgba(229, 83, 10, 0.4), inset 0 1px 0 rgba(255,255,255,0.15)"
                  }}
                >
                  <Link to="/contact" className="flex items-center gap-3 text-white relative z-10">
                    Say hello
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  to="/fields"
                  className="text-sm font-semibold tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors relative group"
                >
                  See the fields
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-px bg-white/40"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            </motion.div>

            {/* Badge with shimmer */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full relative overflow-hidden"
              style={{ background: "rgba(229, 83, 10, 0.12)", border: "1px solid rgba(229, 83, 10, 0.25)" }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.span 
                className="w-2 h-2 rounded-full bg-[#E5530A]"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-sm font-medium tracking-wide text-[#E5530A]">Invite-only. By alignment.</span>
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 -translate-x-full"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }}
                animate={{ translateX: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator with enhanced animation */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <motion.div
            className="w-7 h-11 rounded-full border-2 border-white/20 flex items-start justify-center p-2 backdrop-blur-sm"
            style={{ background: "rgba(255,255,255,0.02)" }}
            whileHover={{ borderColor: "rgba(229, 83, 10, 0.4)" }}
          >
            <motion.div
              className="w-1.5 h-2.5 rounded-full bg-white/50"
              animate={prefersReducedMotion ? {} : { y: [0, 12, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          RATE SIGNAL CARD — Soft Neutral (#EDE7E3)
          ═══════════════════════════════════════════════════════════════════ */}
      <section id="rate-signal" className="py-20 sm:py-28 relative overflow-hidden" style={{ background: "#EDE7E3" }}>
        {/* Subtle animated background pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(229, 83, 10, 0.03) 0%, transparent 60%)" }}
            animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1], x: [0, 20, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-80 h-80 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(51, 67, 54, 0.03) 0%, transparent 60%)" }}
            animate={prefersReducedMotion ? {} : { scale: [1, 1.15, 1], y: [0, -15, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />
        </div>
        
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <AnimatedRateCard />
          <motion.p 
            className="mt-8 text-center text-xs sm:text-sm text-[#334336]/45"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {nekoConfig.brand.missionLine}
          </motion.p>
        </div>
      </section>

      {/* Section Divider - Angular transition */}
      <div className="h-24 sm:h-32 relative overflow-hidden" style={{ background: "#EDE7E3" }}>
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <motion.path
            d="M0,120 L0,60 Q360,0 720,60 T1440,60 L1440,120 Z"
            fill="#ffffff"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </svg>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          WORK IN MOTION — White (#FFFFFF)
          ═══════════════════════════════════════════════════════════════════ */}
      <section id="work-in-motion" className="py-24 sm:py-32 relative overflow-hidden bg-white">
        {/* Subtle animated grid pattern */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ 
            backgroundImage: "linear-gradient(#334336 1px, transparent 1px), linear-gradient(90deg, #334336 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}
        />
        {/* Floating accent */}
        <motion.div
          className="absolute top-20 right-10 w-3 h-3 rounded-full bg-[#E5530A]/20"
          animate={prefersReducedMotion ? {} : { y: [-10, 10, -10], x: [-5, 5, -5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 left-16 w-2 h-2 rounded-full bg-[#334336]/10"
          animate={prefersReducedMotion ? {} : { y: [10, -10, 10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span 
              variants={itemVariants} 
              className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#E5530A] mb-6"
            >
              <motion.div 
                className="w-8 h-px bg-[#E5530A]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
              What lives here
              <motion.div 
                className="w-8 h-px bg-[#E5530A]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
            </motion.span>
            <motion.h2 
              variants={itemVariants} 
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-10" 
              style={{ color: "#334336" }}
            >
              Work, in motion.
            </motion.h2>
            <motion.div variants={itemVariants} className="space-y-6 text-lg sm:text-xl leading-relaxed" style={{ color: "#334336" }}>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                NÈKO is where ideas get tested by building them for real.
              </motion.p>
              <motion.p 
                className="opacity-70"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.7 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Some experiments become public artifacts.<br />
                Some become paid collaborations.<br />
                Some stay in the sandbox.
              </motion.p>
              <motion.p 
                className="opacity-50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.5 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                What matters is that the work is real — designed, shipped, and used beyond this page.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <WorkBreakdownCharts variant="home" />

      {/* ═══════════════════════════════════════════════════════════════════
          THE WORK — Warm Muted (#C8BFB5)
          ═══════════════════════════════════════════════════════════════════ */}
      <section id="the-work" className="py-24 sm:py-32 relative overflow-hidden" style={{ background: "#C8BFB5" }}>
        {/* Animated background elements */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(51, 67, 54, 0.05) 0%, transparent 60%)" }}
          animate={prefersReducedMotion ? {} : { x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(229, 83, 10, 0.04) 0%, transparent 60%)" }}
          animate={prefersReducedMotion ? {} : { x: [0, -25, 0], y: [0, 15, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          {/* THE WORK Header */}
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span variants={itemVariants} className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#334336]/60 mb-6">
              The Work
            </motion.span>
            <motion.h2 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6" style={{ color: "#334336" }}>
              THE WORK
            </motion.h2>
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-[#334336]/60">
              Built where performance is measurable.
            </motion.p>
          </motion.div>

          {/* Horizontal Divider */}
          <motion.div 
            className="w-full max-w-2xl mx-auto h-px bg-[#334336]/20 mb-16"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />

          {/* Three Pillars */}
          <motion.div 
            className="grid sm:grid-cols-3 gap-8 sm:gap-12 max-w-4xl mx-auto mb-16 text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="space-y-3">
              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight" style={{ color: "#334336" }}>
                Chosen
              </h3>
              <p className="text-sm sm:text-base text-[#334336]/70 leading-relaxed">
                Only work that earns its place.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-3">
              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight" style={{ color: "#334336" }}>
                Refined
              </h3>
              <p className="text-sm sm:text-base text-[#334336]/70 leading-relaxed">
                Built under real pressure.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-3">
              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight" style={{ color: "#334336" }}>
                Controlled
              </h3>
              <p className="text-sm sm:text-base text-[#334336]/70 leading-relaxed">
                Access is intentional.
              </p>
            </motion.div>
          </motion.div>

          {/* Horizontal Divider */}
          <motion.div 
            className="w-full max-w-2xl mx-auto h-px bg-[#334336]/20 mb-16"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          {/* TILE GRID Label */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#334336]/40">
              Tile Grid
            </span>
          </motion.div>

          {/* Service Cards Grid */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-16"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {fields.map((field, i) => (
              <motion.div 
                key={i}
                variants={cardVariants} 
                className="group relative p-8 sm:p-10 rounded-2xl bg-white/90 backdrop-blur-sm border border-white/50 shadow-lg transition-all duration-500 cursor-default overflow-hidden"
                whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Card hover glow */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{ background: "radial-gradient(circle at 50% 0%, rgba(229, 83, 10, 0.12) 0%, transparent 60%)" }}
                />
                
                {/* Badge with pulse animation */}
                <div className="absolute top-4 right-4">
                  <motion.span 
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#334336] text-white"
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: 2, delay: i * 0.3 }}
                  >
                    {field.badge}
                  </motion.span>
                </div>
                
                <motion.div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 relative"
                  style={{ background: "#334336" }}
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <field.icon className="w-5 h-5 text-white" />
                </motion.div>
                <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight mb-3 relative" style={{ color: "#334336" }}>{field.title}</h3>
                <p className="text-[#334336]/70 leading-relaxed relative text-sm sm:text-base">{field.body}</p>
                
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
                <motion.div 
                  className="mt-6 h-1 rounded-full bg-[#EDE7E3] overflow-hidden relative"
                >
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-[#E5530A] rounded-full"
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Horizontal Divider before Rotating Pill */}
          <motion.div 
            className="w-full max-w-2xl mx-auto h-px bg-[#334336]/20 mb-10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          {/* Rotating Pill */}
          <RotatingPill />
        </div>
      </section>

      {/* Diagonal section divider */}
      <div 
        className="h-20 sm:h-28 relative"
        style={{ background: "linear-gradient(175deg, #C8BFB5 50%, #334336 50%)" }}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          PRICING — Dark Forest Green (#334336)
          ═══════════════════════════════════════════════════════════════════ */}
      <section 
        id="pricing"
        className="py-24 sm:py-32 relative overflow-hidden noise-texture"
        style={{ background: "linear-gradient(180deg, #334336 0%, #263029 100%)" }}
      >
        {/* Multiple animated aurora layers */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ 
            background: "radial-gradient(ellipse 80% 40% at 20% 80%, rgba(229, 83, 10, 0.08) 0%, transparent 50%)",
          }}
          animate={prefersReducedMotion ? {} : { opacity: [0.3, 0.8, 0.3], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ 
            background: "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(200, 191, 181, 0.05) 0%, transparent 50%)",
          }}
          animate={prefersReducedMotion ? {} : { opacity: [0.5, 1, 0.5], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          {/* Pricing Header */}
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span variants={itemVariants} className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#E5530A] mb-6">
              Pricing
            </motion.span>
            <motion.h2 
              variants={itemVariants} 
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8"
            >
              Engagements
            </motion.h2>
          </motion.div>

          {/* Engagements Content */}
          <motion.div
            className="max-w-2xl mx-auto space-y-16"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* There is no menu */}
            <motion.div variants={itemVariants} className="text-center space-y-6">
              <p className="text-lg sm:text-xl text-white/70 leading-relaxed">
                There is no menu.<br />
                There is no fixed scope.
              </p>
              <div className="space-y-4">
                <p className="text-white/50 text-sm uppercase tracking-widest">Pricing reflects:</p>
                <div className="flex flex-col items-center gap-2 text-white/80">
                  <span>The size of the problem</span>
                  <span>The speed required</span>
                  <span>The cost of getting it wrong</span>
                </div>
              </div>
              <p className="text-sm text-white/40 pt-4">
                Most engagements begin with a paid diagnostic.<br />
                Some continue.<br />
                Many shouldn't.
              </p>
            </motion.div>

            {/* Horizontal Divider */}
            <motion.div 
              className="w-full max-w-md mx-auto h-px bg-white/10"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />

            {/* What You're Paying For */}
            <motion.div variants={itemVariants} className="text-center space-y-6">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                What You're Paying For
              </h3>
              <div className="flex flex-col items-center gap-2 text-white/80">
                <span>Clear decisions.</span>
                <span>Reduced risk.</span>
                <span>Systems that don't collapse under use.</span>
              </div>
              <div className="pt-6 space-y-2">
                <p className="text-white/50 text-sm uppercase tracking-widest">You are not paying for:</p>
                <div className="flex flex-col items-center gap-1 text-white/40">
                  <span>Decks</span>
                  <span>Hours</span>
                  <span>Exploration without commitment</span>
                </div>
              </div>
            </motion.div>

            {/* Horizontal Divider */}
            <motion.div 
              className="w-full max-w-md mx-auto h-px bg-white/10"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />

            {/* Typical Range */}
            <motion.div variants={itemVariants} className="text-center space-y-6">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Typical Range
              </h3>
              <div className="text-lg sm:text-xl text-white/70">
                <span>Projects commonly land between</span>
                <div className="mt-2 relative inline-block">
                  <span 
                    className="text-2xl sm:text-3xl font-bold text-[#E5530A] select-none"
                    style={{ filter: "blur(8px)" }}
                    aria-hidden="true"
                  >
                    $25k – $150k+
                  </span>
                  <span className="sr-only">Price range hidden - let's talk</span>
                </div>
              </div>
              <div className="pt-4 space-y-2">
                <p className="text-white/50 text-sm uppercase tracking-widest">The number moves when:</p>
                <div className="flex flex-col items-center gap-1 text-white/60">
                  <span>Stakes increase</span>
                  <span>Timelines compress</span>
                  <span>Responsibility expands</span>
                </div>
              </div>
              <p className="text-sm text-white/50 pt-4">
                Curious? Start the conversation.
              </p>
            </motion.div>

            {/* Horizontal Divider */}
            <motion.div 
              className="w-full max-w-md mx-auto h-px bg-white/10"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            {/* How This Starts */}
            <motion.div variants={itemVariants} className="text-center space-y-6">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                How This Starts
              </h3>
              <div className="flex flex-col items-center gap-2 text-white/80">
                <span>A short intake.</span>
                <span>A direct conversation.</span>
                <span>A clear yes or no.</span>
              </div>
              <div className="pt-4 flex flex-col items-center gap-1 text-white/40">
                <span>No pitches.</span>
                <span>No courting.</span>
                <span>No pressure.</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Wave divider */}
      <div className="relative h-16 sm:h-24 overflow-hidden" style={{ background: "#334336" }}>
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <motion.path
            d="M0,80 L0,40 Q180,0 360,40 T720,40 T1080,40 T1440,40 L1440,80 Z"
            fill="#EDE7E3"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
        </svg>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          FINAL LINE — Soft Neutral (#EDE7E3)
          ═══════════════════════════════════════════════════════════════════ */}
      <section id="philosophy" className="py-24 sm:py-32 relative overflow-hidden" style={{ background: "#EDE7E3" }}>
        {/* Decorative corner accents */}
        <div 
          className="absolute top-0 left-0 w-32 h-32 pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(51, 67, 54, 0.03) 0%, transparent 50%)" }}
        />
        <div 
          className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none"
          style={{ background: "linear-gradient(-45deg, rgba(229, 83, 10, 0.03) 0%, transparent 50%)" }}
        />
        
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="space-y-6 text-lg sm:text-xl leading-relaxed" style={{ color: "#334336" }}>
              <motion.p
                className="text-base sm:text-lg opacity-70"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.7 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                We choose carefully.<br />
                We don't need your money.
              </motion.p>
              <motion.p
                className="font-display text-xl sm:text-2xl font-bold"
                style={{ color: "#E5530A" }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Bring your heart and your hustle, mf.
              </motion.p>
              <motion.p 
                className="opacity-50 text-sm pt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.5 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                An invoice will follow.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Accent strip before final CTA */}
      <div className="h-2" style={{ background: "linear-gradient(90deg, #E5530A 0%, #C74A09 50%, #E5530A 100%)" }} />

      {/* ═══════════════════════════════════════════════════════════════════
          FINAL CTA — Dark Forest Green (#334336)
          ═══════════════════════════════════════════════════════════════════ */}
      <section 
        id="cta"
        className="py-28 sm:py-36 relative overflow-hidden noise-texture"
        style={{ background: "linear-gradient(180deg, #334336 0%, #1f2a21 100%)" }}
      >
        {/* Multiple layered glows for depth */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(229, 83, 10, 0.1) 0%, transparent 50%)" }}
          animate={prefersReducedMotion ? {} : { scale: [1, 1.15, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(200, 191, 181, 0.06) 0%, transparent 60%)" }}
          animate={prefersReducedMotion ? {} : { x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Animated border accents */}
        <motion.div
          className="absolute top-0 left-0 w-full h-px"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(229, 83, 10, 0.3) 50%, transparent 100%)" }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span 
              variants={itemVariants} 
              className="inline-flex items-center gap-3 text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#E5530A] mb-6"
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-[#E5530A]"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Invitation
              <motion.div
                className="w-2 h-2 rounded-full bg-[#E5530A]"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </motion.span>
            <motion.h2 
              variants={itemVariants} 
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8"
            >
              If this resonates,
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-white/60 mb-12">
              say hello. We'll talk.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Button 
                  asChild 
                  size="lg" 
                  className="group relative rounded-full px-12 py-8 text-lg font-semibold transition-all duration-500 border-0 overflow-hidden"
                  style={{ 
                    background: "linear-gradient(135deg, #E5530A 0%, #C74A09 100%)",
                    boxShadow: "0 8px 32px rgba(229, 83, 10, 0.4), inset 0 1px 0 rgba(255,255,255,0.15)"
                  }}
                >
                  <Link 
                    to="/contact" 
                    className="flex items-center gap-3 text-white relative z-10 group-hover:gap-4 transition-all duration-300"
                  >
                    Say hello.
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    {/* Subtle glow on hover */}
                    <span 
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ 
                        background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)" 
                      }}
                    />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Decorative line */}
            <motion.div
              className="mt-16 flex items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <div className="w-12 h-px bg-white/20" />
              <span className="text-xs text-white/30 tracking-widest">NÈKO</span>
              <div className="w-12 h-px bg-white/20" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}


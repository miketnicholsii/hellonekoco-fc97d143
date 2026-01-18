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
import { motion, useReducedMotion, useScroll, useTransform, Variants } from "framer-motion";
import { ArrowRight, Layers, Target, FileText } from "lucide-react";

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
  { icon: Layers, title: "Digital Structures", body: "Websites, identities, and systems designed to work — not just look good." },
  { icon: Target, title: "Strategic Exploration", body: "Positioning, business models, and brand strategy tested in practice." },
  { icon: FileText, title: "Public Artifacts", body: "Pages, tools, and ideas shared when they're ready — not before." },
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

            {/* Statement */}
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
                NÈKO isn't a marketplace.<br />
                It's a place.
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
      <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: "#EDE7E3" }}>
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
      <section className="py-24 sm:py-32 relative overflow-hidden bg-white">
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
          FIELDS — Warm Muted (#C8BFB5)
          ═══════════════════════════════════════════════════════════════════ */}
      <section id="fields" className="py-24 sm:py-32 relative overflow-hidden" style={{ background: "#C8BFB5" }}>
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
                className="group relative p-8 sm:p-10 rounded-2xl bg-white/90 backdrop-blur-sm border border-white/50 shadow-lg transition-all duration-500 cursor-default overflow-hidden"
                whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Card hover glow */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{ background: "radial-gradient(circle at 50% 0%, rgba(229, 83, 10, 0.08) 0%, transparent 60%)" }}
                />
                
                <motion.div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 relative"
                  style={{ background: "#334336" }}
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <field.icon className="w-5 h-5 text-white" />
                </motion.div>
                <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight mb-4 relative" style={{ color: "#334336" }}>{field.title}</h3>
                <p className="text-[#334336]/70 leading-relaxed relative">{field.body}</p>
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

          <motion.p
            className="text-center text-sm text-[#334336]/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Not everything is available. Everything is intentional.
          </motion.p>
        </div>
      </section>

      {/* Diagonal section divider */}
      <div 
        className="h-20 sm:h-28 relative"
        style={{ background: "linear-gradient(175deg, #C8BFB5 50%, #334336 50%)" }}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          NO CHECKOUT — Dark Forest Green (#334336)
          ═══════════════════════════════════════════════════════════════════ */}
      <section 
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
        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#E5530A]/30"
            style={{ 
              left: `${20 + i * 15}%`, 
              top: `${30 + (i % 3) * 20}%` 
            }}
            animate={prefersReducedMotion ? {} : { 
              y: [-20, 20, -20], 
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          />
        ))}
        
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
            <motion.h2 
              variants={itemVariants} 
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-10"
            >
              Not for sale.<br />
              <motion.span 
                className="text-[#E5530A]"
                animate={prefersReducedMotion ? {} : { opacity: [1, 0.7, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                But it'll cost ya.
              </motion.span>
            </motion.h2>
            <motion.div variants={itemVariants} className="space-y-6 text-lg sm:text-xl text-white/60 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                NÈKO is for-profit — not free, not available on demand.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Work begins through conversation, timing, and mutual fit.
              </motion.p>
              <motion.p 
                className="text-white/45"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                Sometimes that leads to collaboration.<br />
                Sometimes it doesn't.<br />
                Both outcomes are fine.
              </motion.p>
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
          NOT A PITCH — Soft Neutral (#EDE7E3)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 relative overflow-hidden" style={{ background: "#EDE7E3" }}>
        {/* Decorative corner accents */}
        <div 
          className="absolute top-0 left-0 w-32 h-32 pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(51, 67, 54, 0.03) 0%, transparent 50%)" }}
        />
        <div 
          className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none"
          style={{ background: "linear-gradient(-45deg, rgba(229, 83, 10, 0.03) 0%, transparent 50%)" }}
        />
        
        {/* Subtle moving shapes */}
        <motion.div
          className="absolute top-1/4 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(51, 67, 54, 0.04) 0%, transparent 60%)" }}
          animate={prefersReducedMotion ? {} : { x: [0, -30, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/3 left-10 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(229, 83, 10, 0.03) 0%, transparent 60%)" }}
          animate={prefersReducedMotion ? {} : { y: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
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
            <motion.h2 
              variants={itemVariants} 
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-10" 
              style={{ color: "#334336" }}
            >
              Built different. On purpose.
            </motion.h2>
            <motion.div variants={itemVariants} className="space-y-6 text-lg sm:text-xl leading-relaxed" style={{ color: "#334336" }}>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Professional-level work. Real outcomes.<br />
                Payment when alignment exists.
              </motion.p>
              <motion.p 
                className="opacity-70"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.7 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                NÈKO isn't "for hire" on demand.<br />It's invite-only — because that's how the best work happens.
              </motion.p>
              <motion.p 
                className="opacity-50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.5 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                If it fits, we'll shape something together.
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
              If something here resonates…
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-white/60 mb-12">
              Reach out. Not to buy — but to talk.
            </motion.p>
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                asChild 
                size="lg" 
                className="group relative rounded-full px-12 py-8 text-lg font-semibold shadow-2xl transition-all duration-300 border-0 overflow-hidden"
                style={{ 
                  background: "linear-gradient(135deg, #E5530A 0%, #C74A09 100%)",
                  boxShadow: "0 12px 40px rgba(229, 83, 10, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)"
                }}
              >
                <Link to="/contact" className="flex items-center gap-3 text-white relative z-10">
                  Start a conversation
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </Link>
              </Button>
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


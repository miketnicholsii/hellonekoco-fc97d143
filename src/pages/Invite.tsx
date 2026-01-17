// src/pages/Invite.tsx
import { Link } from "react-router-dom";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { nekoCopy } from "@/content/nekoCopy";
import { ArrowRight, Check, Sparkles } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Invite() {
  const c = nekoCopy;
  const prefersReducedMotion = useReducedMotion();
  const isOpen = c.availability.current === "open";

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <EccentricNavbar />

      {/* Hero */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-b from-muted/40 via-background to-background pointer-events-none"
          aria-hidden="true"
        />

        <motion.div
          className="absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, hsl(168 65% 50% / 0.1) 0%, transparent 70%)",
          }}
          animate={
            prefersReducedMotion
              ? {}
              : { scale: [1, 1.08, 1], opacity: [0.15, 0.25, 0.15] }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Availability badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide ${
                  isOpen
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "bg-muted text-muted-foreground border border-border"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isOpen ? "bg-primary animate-pulse" : "bg-muted-foreground"
                  }`}
                />
                {isOpen ? c.availability.open : c.availability.building}
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-4"
            >
              {c.invite.title}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground mb-8"
            >
              {c.invite.subtitle}
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-5 mb-10">
              {c.invite.intro.map((p, i) => (
                <p
                  key={i}
                  className="text-lg sm:text-xl text-muted-foreground leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                asChild
                size="lg"
                className="rounded-full px-10 py-6 bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-base"
              >
                <Link to="/contact" className="flex items-center gap-3">
                  {c.invite.cta.button}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How I Work */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div
              variants={cardVariants}
              className="p-8 sm:p-10 rounded-2xl bg-card border border-border/60"
            >
              <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                {c.invite.howIWork.title}
              </h3>
              <ul className="space-y-4">
                {c.invite.howIWork.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Rate Signal */}
      <section className="py-20 sm:py-28 bg-muted/30">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div
              variants={cardVariants}
              className="relative p-8 sm:p-12 rounded-3xl bg-card border border-border/60 shadow-sm"
            >
              <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
                <Sparkles className="w-5 h-5 text-primary/40" />
              </div>

              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4">
                {c.invite.rateSignal.title}
              </span>

              <p className="text-lg text-muted-foreground mb-6">
                {c.invite.rateSignal.description}
              </p>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="font-display text-5xl sm:text-6xl font-bold text-foreground">
                  {c.invite.rateSignal.hourlyRate}
                </span>
                <span className="text-xl text-muted-foreground">
                  {c.invite.rateSignal.rateUnit}
                </span>
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
                {c.invite.rateSignal.context.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="space-y-2 text-sm text-muted-foreground/70 border-t border-border pt-6">
                <p>{c.invite.rateSignal.note1}</p>
                <p>{c.invite.rateSignal.note2}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-gradient-dark text-white">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <Button
                asChild
                size="lg"
                className="rounded-full px-10 py-6 bg-white text-primary hover:bg-white/90 font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-base"
              >
                <Link to="/contact" className="flex items-center gap-3">
                  {c.invite.cta.button}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="text-sm text-white/50 mt-6"
            >
              {c.invite.cta.small}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// src/pages/Index.tsx
import { Link } from "react-router-dom";
import { nekoCopy } from "@/content/nekoCopy";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

function Section({ id, children, className = "", dark = false }: { id?: string; children: React.ReactNode; className?: string; dark?: boolean }) {
  return (
    <section id={id} className={`py-24 sm:py-32 lg:py-40 ${dark ? "bg-gradient-dark text-white" : ""} ${className}`}>
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export default function Index() {
  const c = nekoCopy;
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <EccentricNavbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-gradient-hero-radial pointer-events-none" />
        <motion.div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, hsl(168 65% 50% / 0.3) 0%, transparent 70%)" }} animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10 pt-24 pb-20">
          <motion.div className="max-w-3xl mx-auto text-center" variants={prefersReducedMotion ? undefined : containerVariants} initial="hidden" animate="visible">
            <motion.h1 variants={itemVariants} className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8">
              <span className="hello-accent">Hello,</span> <span className="neko-title">NÈKO<span className="neko-dot">.</span></span>
            </motion.h1>
            <motion.p variants={itemVariants} className="font-display text-2xl sm:text-3xl font-medium text-white/90 mb-6 tracking-tight">{c.brand.descriptor}</motion.p>
            <motion.p variants={itemVariants} className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto mb-6">{c.brand.subdescriptor}</motion.p>
            <motion.p variants={itemVariants} className="text-base text-white/50 max-w-xl mx-auto mb-12">{c.brand.boundary}</motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Button asChild size="lg" className="rounded-full px-10 py-6 bg-white text-primary hover:bg-white/90 font-medium shadow-lg">
                <Link to="/contact" className="flex items-center gap-3">{c.ctas.primary}<ArrowRight className="w-4 h-4" /></Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="rounded-full px-10 py-6 text-white/80 hover:text-white hover:bg-white/10">
                <Link to="/sandbox">{c.ctas.secondary}</Link>
              </Button>
            </motion.div>
            <motion.p variants={itemVariants} className="text-xs font-medium tracking-widest uppercase text-white/40">{c.microcopy.inviteOnly}</motion.p>
          </motion.div>
        </div>
      </section>

      {/* WHAT LIVES HERE */}
      <Section id="what-lives-here">
        <motion.div className="max-w-3xl mx-auto text-center" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          <motion.span variants={itemVariants} className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-6">{c.sections.whatLivesHere.label}</motion.span>
          <motion.h2 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-10">{c.sections.whatLivesHere.title}</motion.h2>
          <motion.div className="space-y-6 text-lg sm:text-xl text-muted-foreground leading-relaxed">
            {c.sections.whatLivesHere.body.map((p, i) => <motion.p key={i} variants={itemVariants}>{p}</motion.p>)}
          </motion.div>
        </motion.div>
      </Section>

      {/* FIELDS */}
      <Section className="bg-muted/40">
        <motion.div className="text-center max-w-2xl mx-auto mb-16" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.span variants={itemVariants} className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-6">{c.sections.fields.label}</motion.span>
          <motion.h2 variants={itemVariants} className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">{c.sections.fields.title}</motion.h2>
        </motion.div>
        <motion.div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-12" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {c.sections.fields.cards.map((card, i) => (
            <motion.div key={card.title} variants={itemVariants} className="group p-8 sm:p-10 rounded-2xl bg-card border border-border/60 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-500">
              <span className="inline-block text-[10px] font-semibold tracking-widest uppercase text-primary/60 mb-4">0{i + 1}</span>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-4 tracking-tight">{card.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </motion.div>
        <p className="text-center text-sm text-muted-foreground/60">{c.sections.fields.footerNote}</p>
      </Section>

      {/* NO CHECKOUT */}
      <Section>
        <motion.div className="max-w-3xl mx-auto text-center" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.span variants={itemVariants} className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-6">{c.sections.howWorkHappens.label}</motion.span>
          <motion.h2 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-10">{c.sections.howWorkHappens.title}</motion.h2>
          <div className="space-y-6 text-lg sm:text-xl text-muted-foreground leading-relaxed">
            {c.sections.howWorkHappens.body.map((p, i) => <motion.p key={i} variants={itemVariants}>{p}</motion.p>)}
          </div>
        </motion.div>
      </Section>

      {/* NONPROFIT MISSION */}
      <Section className="bg-tertiary text-tertiary-foreground">
        <motion.div className="max-w-3xl mx-auto text-center" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-8">
            <Heart className="w-4 h-4" />
            <span className="text-xs font-semibold tracking-wide">{c.mission.badge}</span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-10">{c.mission.title}</motion.h2>
          <div className="space-y-6 text-lg sm:text-xl text-tertiary-foreground/80 leading-relaxed">
            {c.mission.body.map((p, i) => <motion.p key={i} variants={itemVariants}>{p}</motion.p>)}
          </div>
        </motion.div>
      </Section>

      {/* FINAL CTA */}
      <Section dark>
        <motion.div className="max-w-2xl mx-auto text-center" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.h2 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8">{c.sections.invitation.title}</motion.h2>
          <motion.p variants={itemVariants} className="text-xl sm:text-2xl text-white/70 mb-12">{c.sections.invitation.body[0]}</motion.p>
          <motion.div variants={itemVariants}>
            <Button asChild size="lg" className="rounded-full px-12 py-6 bg-white text-primary hover:bg-white/90 font-medium shadow-lg text-base">
              <Link to="/contact" className="flex items-center gap-3">{c.ctas.primary}<ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </motion.div>
        </motion.div>
      </Section>

      <Footer />
    </main>
  );
}

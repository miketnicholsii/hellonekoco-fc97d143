// src/pages/Index.tsx
import { Link } from "react-router-dom";
import { nekoCopy } from "@/content/nekoCopy";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { 
  Building2, 
  CreditCard, 
  User, 
  TrendingUp,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ChevronDown
} from "lucide-react";

const iconMap = {
  building: Building2,
  creditCard: CreditCard,
  user: User,
  trendingUp: TrendingUp,
};

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

function FeatureCard({ title, body, icon }: { title: string; body: string; icon: string }) {
  const Icon = iconMap[icon as keyof typeof iconMap] || Building2;
  
  return (
    <motion.div
      variants={cardVariants}
      className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow group"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="font-display text-lg font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {body}
      </p>
    </motion.div>
  );
}

function JourneyStep({ step, index, isLast }: { step: { title: string; body: string }; index: number; isLast: boolean }) {
  return (
    <motion.div 
      variants={itemVariants}
      className="flex gap-4"
    >
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
          {index + 1}
        </div>
        {!isLast && <div className="w-0.5 h-full bg-border mt-2" />}
      </div>
      <div className="pb-8">
        <h4 className="font-display font-semibold text-foreground mb-1">{step.title}</h4>
        <p className="text-sm text-muted-foreground">{step.body}</p>
      </div>
    </motion.div>
  );
}

export default function Index() {
  const c = nekoCopy;
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background">
      <EccentricNavbar />

      {/* HERO - Teal gradient like reference */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-hero">
        {/* Gradient mesh overlay */}
        <div className="absolute inset-0 bg-gradient-hero-radial pointer-events-none" aria-hidden="true" />
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} aria-hidden="true" />
        
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10 pt-20 pb-16">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={prefersReducedMotion ? undefined : itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-xs font-medium tracking-wide border border-white/20 mb-8">
                <Sparkles className="w-3.5 h-3.5" />
                Your Operating System for Success
              </span>
            </motion.div>

            {/* Main heading with gradient text */}
            <motion.h1 
              variants={prefersReducedMotion ? undefined : itemVariants}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4"
            >
              Build Your Business.
              <br />
              <span className="text-primary-glow">Build Your Brand.</span>
            </motion.h1>

            <motion.p 
              variants={prefersReducedMotion ? undefined : itemVariants}
              className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto mb-8"
            >
              NÈKO is your guided platform for building legitimate businesses and personal brands — from zero to scale — with progress tracking every step of the way.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              variants={prefersReducedMotion ? undefined : itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
            >
              <Button asChild size="lg" className="rounded-full px-8 bg-white text-primary hover:bg-white/90 font-medium shadow-lg">
                <Link to="/get-started" className="flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-white/30 text-white hover:bg-white/10 hover:text-white">
                <Link to="/services">Explore Services</Link>
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div 
              variants={prefersReducedMotion ? undefined : itemVariants}
              className="flex flex-wrap items-center justify-center gap-6 text-white/60 text-sm"
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-glow" />
                Guidance + Execution
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-glow" />
                Education + Structure
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-glow" />
                Progress + Momentum
              </span>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <a href="#what-is-neko" className="flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors">
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* WHAT IS NEKO */}
      <section id="what-is-neko" className="py-20 sm:py-28 lg:py-32">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
            {/* Left column - Text */}
            <motion.div
              variants={prefersReducedMotion ? undefined : containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.span variants={itemVariants} className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4">
                {c.sections.whatIsNeko.label}
              </motion.span>
              <motion.h2 variants={itemVariants} className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">
                {c.sections.whatIsNeko.title}
              </motion.h2>
              <motion.div variants={containerVariants} className="space-y-4 text-muted-foreground leading-relaxed mb-8">
                {c.sections.whatIsNeko.body.map((p, i) => (
                  <motion.p key={i} variants={itemVariants}>{p}</motion.p>
                ))}
              </motion.div>

              {/* Not list */}
              <motion.div 
                variants={itemVariants}
                className="p-6 rounded-xl bg-muted/50 border border-border"
              >
                <p className="font-semibold text-foreground mb-3">NEKO is NOT:</p>
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                  {c.sections.whatIsNeko.notList.map((item, i) => (
                    <p key={i} className="flex items-start gap-2">
                      <span className="text-primary">×</span>
                      {item}
                    </p>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right column - Journey */}
            <motion.div
              variants={prefersReducedMotion ? undefined : containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-sm"
            >
              <motion.span variants={itemVariants} className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4">
                {c.sections.journey.label}
              </motion.span>
              <div className="mt-4">
                {c.sections.journey.steps.map((step, i) => (
                  <JourneyStep 
                    key={step.title} 
                    step={step} 
                    index={i} 
                    isLast={i === c.sections.journey.steps.length - 1} 
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PLATFORM FEATURES */}
      <section id="features" className="py-20 sm:py-28 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span variants={itemVariants} className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4">
              {c.sections.fields.label}
            </motion.span>
            <motion.h2 variants={itemVariants} className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              {c.sections.fields.title}
            </motion.h2>
            <motion.p variants={itemVariants} className="text-muted-foreground">
              {c.sections.fields.subtitle}
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
            variants={prefersReducedMotion ? undefined : cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {c.sections.fields.cards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Dark gradient */}
      <section className="py-20 sm:py-28 lg:py-32 bg-gradient-dark text-white">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span variants={itemVariants} className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-glow mb-4">
              {c.sections.cta.label}
            </motion.span>
            <motion.h2 variants={itemVariants} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              {c.sections.cta.title}
            </motion.h2>
            <motion.p variants={itemVariants} className="text-white/70 text-lg mb-10">
              {c.sections.cta.body}
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full px-8 bg-white text-tertiary hover:bg-white/90 font-medium">
                <Link to="/get-started" className="flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-white/30 text-white hover:bg-white/10 hover:text-white">
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

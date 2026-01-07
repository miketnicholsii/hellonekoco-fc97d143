import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { FeatureCard } from "@/components/FeatureCard";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedSection, AnimatedStagger, staggerItem } from "@/components/AnimatedSection";
import { 
  ArrowRight, 
  Building2, 
  CreditCard, 
  User, 
  Globe, 
  TrendingUp,
  Sparkles,
  Target,
  Shield,
  XCircle,
  Zap
} from "lucide-react";

const journeySteps = [
  { step: "01", title: "Start your business", description: "Form your LLC, get your EIN, establish legitimacy" },
  { step: "02", title: "Build business credit", description: "Progress through credit tiers strategically" },
  { step: "03", title: "Create your brand", description: "Build your Digital CV and web presence" },
  { step: "04", title: "Grow with intention", description: "Scale when you're ready, not before" },
];

const features = [
  { icon: Building2, title: "Business Formation", description: "Step-by-step guidance to properly form your LLC and establish your business with a legitimacy checklist." },
  { icon: CreditCard, title: "Business Credit Roadmap", description: "A tiered approach to building business credit through vendor accounts, store credit, and revolving lines." },
  { icon: User, title: "Personal Brand Builder", description: "Create your Digital CV — a professional page that tells your story, showcases your work, and builds credibility." },
];

const notList = ["A credit repair service", "Legal or financial advice", "Get-rich-quick schemes", "A generic website builder"];
const trustIndicators = [
  { icon: Zap, label: "Guided Execution" },
  { icon: Shield, label: "Structured Progress" },
  { icon: TrendingUp, label: "Real Momentum" },
];

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Memoized hero background for performance
const HeroBackground = memo(function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none contain-paint" aria-hidden="true">
      <div className="absolute top-1/4 left-[10%] w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-primary-foreground/5 rounded-full blur-3xl opacity-40 sm:opacity-50 gpu-accelerated motion-safe:animate-float" />
      <div className="absolute bottom-1/4 right-[10%] w-40 sm:w-64 lg:w-80 h-40 sm:h-64 lg:h-80 bg-primary-foreground/5 rounded-full blur-3xl opacity-40 sm:opacity-50 gpu-accelerated motion-safe:animate-float-delayed" />
      <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] border border-primary-foreground/10 rounded-full" />
    </div>
  );
});

export default function Index() {
  const prefersReducedMotion = useReducedMotion();
  
  const fadeIn = useMemo(() => prefersReducedMotion 
    ? { initial: {}, animate: {}, transition: {} }
    : { 
        initial: { opacity: 0, y: 16 }, 
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: easeOutExpo }
      }, [prefersReducedMotion]);

  return (
    <main className="min-h-screen overflow-x-hidden">
      <EccentricNavbar />
      
      {/* Hero Section - Optimized */}
      <section className="relative min-h-[100svh] flex items-center justify-center bg-gradient-hero overflow-hidden pt-20 pb-16 sm:pt-0 sm:pb-0">
        <div className="absolute inset-0 bg-gradient-hero-radial pointer-events-none" aria-hidden="true" />
        <HeroBackground />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0 }} className="mb-6 sm:mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/10 text-primary-foreground text-xs sm:text-sm font-medium">
                <Sparkles className="h-3.5 w-3.5" />
                Currently Invite-Only
              </span>
            </motion.div>

            <motion.h1 {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.08 }} className="font-display font-bold tracking-tighter text-primary-foreground mb-5 sm:mb-6 text-[clamp(2rem,6.5vw,4.5rem)] leading-[1.1]">
              Build Your Business.
              <br />
              <span className="text-primary-foreground/70">Build Your Brand.</span>
            </motion.h1>

            <motion.p {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.15 }} className="text-base sm:text-lg text-primary-foreground/60 max-w-2xl mx-auto mb-4 leading-relaxed px-2 sm:px-0">
              NÈKO is a guided platform for building legitimate businesses and personal brands — from zero to scale — with progress tracking at every step.
            </motion.p>
            
            <motion.p {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.18 }} className="text-sm text-primary-foreground/50 max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2 sm:px-0">
              We're onboarding a limited number of partners. Request access to get started.
            </motion.p>

            <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.22 }} className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4 sm:px-0">
              <Link to="/get-started" className="w-full sm:w-auto">
                <Button variant="hero" size="xl" className="w-full sm:w-auto group">
                  <span className="flex items-center gap-2">
                    Request Access
                    <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">Get in Touch</Button>
              </Link>
            </motion.div>

            <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.35 }} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-10 sm:mt-12">
              {trustIndicators.map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-primary-foreground/50 text-sm">
                  <item.icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden="true">
          <div className="w-5 h-8 rounded-full border-2 border-primary-foreground/20 flex items-start justify-center p-1.5">
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="w-1 h-1.5 bg-primary-foreground/40 rounded-full" />
          </div>
        </div>
      </section>

      {/* What is NEKO Section */}
      <section className="py-16 sm:py-20 lg:py-28 bg-background relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <AnimatedSection direction="left">
              <SectionHeading label="What is NÈKO?" title="Your guided path from idea to reality." description="NÈKO is a structured operating system for first-time founders, creators, freelancers, and side-hustlers. We reduce overwhelm by providing a clear roadmap with progress checkpoints at every stage." />
              <p className="mt-6 text-muted-foreground text-sm sm:text-base leading-relaxed">
                Starting a business shouldn't be overwhelming. NÈKO provides the roadmap, education, and structure you need.
              </p>
              <div className="mt-6 p-4 sm:p-5 rounded-xl bg-muted/50 border border-border">
                <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                  NÈKO is NOT:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {notList.map((point) => (
                    <div key={point} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/50 flex-shrink-0" />
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.1} className="lg:pl-6">
              <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border shadow-md">
                <h3 className="font-display font-bold text-lg mb-5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Target className="h-4 w-4 text-primary" />
                  </div>
                  Your Journey
                </h3>
                <div className="space-y-4">
                  {journeySteps.map((step, index) => (
                    <div key={step.step} className="flex items-start gap-3 group">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors duration-300 ${index === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"}`}>
                        {step.step}
                      </div>
                      <div className="pt-0.5">
                        <h4 className="font-semibold text-foreground text-sm transition-colors duration-200 group-hover:text-primary">{step.title}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-28 bg-muted/30 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection>
            <SectionHeading label="Platform Features" title="Everything you need to start, build, and grow." description="From business formation to personal branding, NÈKO provides the tools and guidance for every stage." centered className="mb-10 sm:mb-12" />
          </AnimatedSection>

          <AnimatedStagger className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
            {features.map((feature) => (
              <motion.div key={feature.title} variants={staggerItem}>
                <FeatureCard icon={feature.icon} title={feature.title} description={feature.description} />
              </motion.div>
            ))}
          </AnimatedStagger>

          <AnimatedSection delay={0.3} className="mt-10 flex flex-wrap justify-center gap-2.5">
            {[
              { icon: Globe, label: "Web Presence Guide" },
              { icon: Shield, label: "Legitimacy First" },
              { icon: TrendingUp, label: "Progress Tracking" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors duration-200">
                <item.icon className="h-4 w-4 text-primary" />
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-28 bg-tertiary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dark pointer-events-none" aria-hidden="true" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <AnimatedSection>
            <SectionHeading label="Ready to Start?" title="Request access today." description="NÈKO is currently invite-only. We're onboarding a limited number of partners." centered light className="mb-8 sm:mb-10" />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4 sm:px-0">
              <Link to="/get-started" className="w-full sm:w-auto">
                <Button variant="hero" size="xl" className="w-full sm:w-auto group">
                  Request Access
                  <ArrowRight className="h-5 w-5 ml-1 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">Get in Touch</Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}

import { memo, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { TierCard } from "@/components/TierCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection, AnimatedStagger, staggerItem } from "@/components/AnimatedSection";
import { BusinessStarterPreview } from "@/components/previews/BusinessStarterPreview";
import { BusinessCreditPreview } from "@/components/previews/BusinessCreditPreview";
import { PersonalBrandPreview } from "@/components/previews/PersonalBrandPreview";
import { DashboardPreview } from "@/components/previews/DashboardPreview";
import { 
  ArrowRight, 
  Building2, 
  FileText, 
  Landmark, 
  Phone, 
  Mail,
  CheckCircle2,
  ExternalLink,
  AlertCircle,
  User,
  TrendingUp,
  CreditCard
} from "lucide-react";

const creditTiers = [
  {
    tier: 0,
    title: "Business Readiness",
    description: "Establish the foundation before building credit",
    features: [
      "Registered LLC or Corporation",
      "EIN from the IRS",
      "Business bank account",
      "Dedicated business phone",
      "Professional business email",
    ],
    status: "unlocked" as const,
  },
  {
    tier: 1,
    title: "Net-30 Vendors",
    description: "Build trade references with vendor accounts",
    features: [
      "Vendor accounts (Uline, Quill, Grainger)",
      "Net-30 payment terms",
      "Reports to business credit bureaus",
      "Build payment history",
      "No personal guarantee required",
    ],
    status: "locked" as const,
  },
  {
    tier: 2,
    title: "Store Credit",
    description: "Graduate to retail and store credit cards",
    features: [
      "Home Depot, Lowes, Staples",
      "Office supply store credit",
      "Revolving credit lines",
      "Higher credit limits",
      "Continued bureau reporting",
    ],
    status: "locked" as const,
  },
  {
    tier: 3,
    title: "Revolving Credit",
    description: "Access business credit cards and lines of credit",
    features: [
      "Business credit cards",
      "Lines of credit",
      "Higher credit limits",
      "Cash back and rewards",
      "Flexible payment options",
    ],
    status: "locked" as const,
  },
];

const legitimacySteps = [
  { icon: Building2, title: "Registered Business", description: "LLC or Corporation properly filed" },
  { icon: FileText, title: "EIN Number", description: "Free from IRS.gov" },
  { icon: Landmark, title: "Business Bank Account", description: "Separate from personal" },
  { icon: Phone, title: "Business Phone", description: "Dedicated line for your business" },
  { icon: Mail, title: "Professional Email", description: "yourname@yourbusiness.com" },
];

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const HeroBackground = memo(function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none contain-paint" aria-hidden="true">
      <div className="absolute top-1/4 left-[10%] w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-primary-foreground/5 rounded-full blur-3xl opacity-50 gpu-accelerated motion-safe:animate-float" />
      <div className="absolute bottom-1/3 right-[10%] w-40 sm:w-64 lg:w-80 h-40 sm:h-64 lg:h-80 bg-primary-foreground/5 rounded-full blur-3xl opacity-50 gpu-accelerated motion-safe:animate-float-delayed" />
      <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] border border-primary-foreground/10 rounded-full" />
    </div>
  );
});

export default function Services() {
  const prefersReducedMotion = useReducedMotion();
  
  const fadeIn = useMemo(() => prefersReducedMotion 
    ? { initial: {}, animate: {}, transition: {} }
    : { 
        initial: { opacity: 0, y: 16 }, 
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: easeOutExpo }
      }, [prefersReducedMotion]);

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <EccentricNavbar />

      {/* Hero */}
      <section className="relative min-h-[70svh] flex items-center justify-center bg-gradient-hero overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-hero-radial pointer-events-none" aria-hidden="true" />
        <HeroBackground />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.p 
              {...fadeIn} 
              className="text-sm font-medium tracking-widest uppercase text-primary-foreground/50 mb-4"
            >
              Services
            </motion.p>
            <motion.h1 
              {...fadeIn} 
              transition={{ ...fadeIn.transition, delay: 0.05 }}
              className="font-display font-bold tracking-tighter text-primary-foreground mb-6 text-[clamp(2rem,6vw,4rem)] leading-[1.1]"
            >
              The path forward.
            </motion.h1>
            <motion.p 
              {...fadeIn} 
              transition={{ ...fadeIn.transition, delay: 0.1 }}
              className="text-lg sm:text-xl text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed"
            >
              From formation to credit to brand. Each step structured, trackable, and designed for sustainable progress.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Dashboard Preview - What You Get */}
      <section className="py-16 sm:py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <SectionHeading
                label="Your Dashboard"
                title="Everything in one place."
                description="A personalized command center for your business journey. Track progress, manage tasks, and stay focused."
                centered
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="max-w-4xl mx-auto">
              <DashboardPreview />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Business Starter Flow */}
      <section className="py-16 sm:py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <AnimatedSection direction="left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                <Building2 className="h-3.5 w-3.5" />
                Start
              </div>
              <SectionHeading
                title="Business Formation"
                description="The foundation. A guided path to properly form your business and establish legitimacy from day one."
              />

              <div className="mt-8 space-y-3">
                {legitimacySteps.map((step, index) => (
                  <motion.div 
                    key={step.title} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <step.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <AnimatedSection delay={0.3} className="mt-6">
                <div className="p-5 rounded-xl bg-secondary/10 border border-secondary/30">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground mb-2">Your EIN is free</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Directly from the IRS. We never charge for EIN filing.
                      </p>
                      <a 
                        href="https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                      >
                        Apply at IRS.gov
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.15} className="lg:sticky lg:top-28">
              <BusinessStarterPreview />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Business Credit Builder */}
      <section className="py-16 sm:py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-2 justify-center mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                <CreditCard className="h-3.5 w-3.5" />
                Build
              </div>
            </div>
            <SectionHeading
              title="Business Credit"
              description="Credit is built in stages. Each tier prepares you for the next — with consistency and early payments as the foundation."
              centered
              className="mb-10"
            />
          </AnimatedSection>

          {/* Preview First */}
          <AnimatedSection delay={0.1} className="mb-12">
            <div className="max-w-4xl mx-auto">
              <BusinessCreditPreview />
            </div>
          </AnimatedSection>

          {/* Credit Tiers */}
          <AnimatedStagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {creditTiers.map((tier) => (
              <motion.div key={tier.tier} variants={staggerItem}>
                <TierCard
                  tier={tier.tier}
                  title={tier.title}
                  description={tier.description}
                  features={tier.features}
                  status={tier.status}
                />
              </motion.div>
            ))}
          </AnimatedStagger>

          <AnimatedSection delay={0.4} className="mt-10">
            <div className="p-5 rounded-xl bg-primary/5 border border-primary/20 max-w-2xl mx-auto">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground mb-1">The principle is simple</p>
                  <p className="text-sm text-muted-foreground">
                    Pay early. Pay in full. Be consistent. There are no shortcuts.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Personal Brand & Scale */}
      <section className="py-16 sm:py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Personal Brand */}
            <AnimatedSection direction="left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                <User className="h-3.5 w-3.5" />
                Brand
              </div>
              <h2 className="font-display text-2xl lg:text-3xl font-bold mb-3 text-foreground">
                Personal Brand
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Your Digital CV. A professional page that tells your story, showcases your work, and positions you as credible.
              </p>
              
              <ul className="space-y-2.5 mb-6">
                {[
                  "Professional personal brand page",
                  "Skills and goals showcase",
                  "Shareable, modern design",
                  "Built for credibility",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <PersonalBrandPreview />
            </AnimatedSection>

            {/* Scale */}
            <AnimatedSection direction="right" delay={0.15}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-4">
                <TrendingUp className="h-3.5 w-3.5" />
                Scale
              </div>
              <h2 className="font-display text-2xl lg:text-3xl font-bold mb-3 text-foreground">
                Growth Tools
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Scaling is optional. These resources exist when you're ready — not before.
              </p>

              <ul className="space-y-2.5 mb-6">
                {[
                  "Advanced progress analytics",
                  "Growth readiness diagnostics",
                  "Social strategy guidance",
                  "Brand audits and upgrades",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="p-6 lg:p-8 rounded-2xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground">Scale Plan</h3>
                    <p className="text-sm text-muted-foreground">For growth-ready businesses</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Advanced analytics, growth diagnostics, white-labeled brand pages, and team collaboration tools.
                </p>
                <Link to="/pricing">
                  <Button variant="outline" className="w-full group">
                    View Plans
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 lg:py-24 bg-tertiary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dark pointer-events-none" aria-hidden="true" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-primary-foreground mb-4">
              Hello, NÈKO.
            </h2>
            <p className="text-lg text-primary-foreground/60 mb-10 max-w-md mx-auto">
              Ready to start? All you have to do is say hello.
            </p>
            <Link to="/contact">
              <Button variant="hero" size="xl" className="group">
                Say Hello
                <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}

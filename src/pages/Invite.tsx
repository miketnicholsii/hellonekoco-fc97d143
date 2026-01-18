// src/pages/Invite.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { DynamicRateCard } from "@/components/DynamicRateCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Flame,
  Send,
  CheckCircle
} from "lucide-react";
import { nekoConfig } from "@/lib/neko-config";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const proposalSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  whatBuilding: z.string().trim().min(10, "Please describe what you're building").max(2000),
  whyNow: z.string().trim().min(10, "Please explain why now").max(1000),
  budget: z.string().min(1, "Please select a budget range"),
  justification: z.string().trim().min(10, "Please justify the budget").max(1000),
  timeline: z.string().trim().max(200).optional(),
  links: z.string().trim().max(500).optional(),
  donationIntent: z.boolean().optional(),
});

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
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
    scale: [1, 1.02, 1],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

const glowVariants: Variants = {
  animate: {
    boxShadow: [
      "0 0 30px hsl(16 100% 42% / 0.2)",
      "0 0 60px hsl(16 100% 42% / 0.35)",
      "0 0 30px hsl(16 100% 42% / 0.2)",
    ],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function Invite() {
  const prefersReducedMotion = useReducedMotion();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatBuilding: "",
    whyNow: "",
    budget: "",
    justification: "",
    timeline: "",
    links: "",
    donationIntent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === "checkbox" ? checked : value 
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, budget: value }));
    if (errors.budget) setErrors((prev) => ({ ...prev, budget: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = proposalSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("contact-submit", {
        body: {
          name: formData.name,
          email: formData.email,
          message: `
PROPOSAL SUBMISSION

What are you building:
${formData.whatBuilding}

Why now:
${formData.whyNow}

Budget: ${nekoConfig.budgetOptions.find(b => b.value === formData.budget)?.label || formData.budget}

Justification:
${formData.justification}

Timeline: ${formData.timeline || "Not specified"}

Links: ${formData.links || "None provided"}

Donation Intent: ${formData.donationIntent ? "Yes - wants payment to support mental health institutions" : "No"}
          `.trim(),
          goal: "proposal",
          stage: "invite-form",
        },
      });

      if (error) throw error;
      setIsSubmitted(true);
      toast.success("Proposal received. If it aligns, you'll hear back.");
    } catch {
      // Fallback to mailto
      const subject = encodeURIComponent("Proposal from " + formData.name);
      const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}

What are you building:
${formData.whatBuilding}

Why now:
${formData.whyNow}

Budget: ${nekoConfig.budgetOptions.find(b => b.value === formData.budget)?.label || formData.budget}

Justification:
${formData.justification}

Timeline: ${formData.timeline || "Not specified"}

Links: ${formData.links || "None provided"}

Donation Intent: ${formData.donationIntent ? "Yes" : "No"}
      `.trim());
      
      window.location.href = `mailto:${nekoConfig.email}?subject=${subject}&body=${body}`;
      toast.info("Opening email client as fallback...");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Work With NÈKO | Invite-Only Collaboration</title>
        <meta name="description" content="Submit a proposal to work with NÈKO. Invite-only collaboration for focused, high-craft digital projects. Clear scope, honest feedback, real partnership." />
        <meta property="og:title" content="Work With NÈKO | Invite-Only Collaboration" />
        <meta property="og:description" content="Submit a proposal to work with NÈKO. Invite-only collaboration for focused, high-craft digital projects." />
      </Helmet>
      <main className="min-h-screen bg-background overflow-hidden">
        <EccentricNavbar />

      {/* HERO — Deep Forest Green */}
      <section 
        className="relative pt-36 sm:pt-48 pb-32 sm:pb-44 overflow-hidden noise-texture" 
        style={{ background: "linear-gradient(180deg, hsl(135 25% 14%) 0%, hsl(135 28% 10%) 50%, hsl(140 30% 6%) 100%)" }}
      >
        <motion.div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 70% 20%, hsl(16 100% 42% / 0.08) 0%, transparent 60%)" }}
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
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white mb-8"
            >
              Work With NÈKO.
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-sm text-white/40 font-mono tracking-wider mb-6"
            >
              /NEH-koh/
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-6 max-w-2xl mx-auto">
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed font-light">
                Sometimes NÈKO becomes <span className="text-secondary font-medium">collaboration</span>.
              </p>
              <p className="text-lg text-white/60 leading-relaxed">
                When it does, it's because the work fits —<br />
                not because there's an opening on a calendar.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* HOW WE WORK — Warm Taupe */}
      <section 
        className="py-24 sm:py-32" 
        style={{ background: "linear-gradient(180deg, hsl(35 12% 92%) 0%, hsl(35 15% 88%) 100%)" }}
      >
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
                How We Work
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mt-4">
                Focused. Honest. Real.
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Shield, title: "Clear Scope", desc: "Calm pace, honest feedback, no scope creep." },
                { icon: Zap, title: "High Craft", desc: "Real shipping, production-grade, thoughtful detail." },
                { icon: Compass, title: "True Partnership", desc: "Not a vendor — a focused collaboration." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="group relative p-8 sm:p-10 rounded-2xl bg-white border border-border/50 shadow-lg hover:shadow-xl transition-all duration-500"
                  whileHover={prefersReducedMotion ? {} : { y: -8 }}
                >
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: "linear-gradient(135deg, hsl(135 22% 18%) 0%, hsl(135 28% 25%) 100%)" }}
                  >
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  <div className="absolute bottom-0 left-8 right-8 h-1 rounded-full bg-secondary/20 group-hover:bg-secondary transition-colors duration-500" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* RATE SIGNAL — White with dramatic card */}
      <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{ background: "var(--gradient-mesh)" }} />
        
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
                Dynamic Rate Signal
              </span>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Rates shift based on capacity and demand. Lock in current pricing before it changes.
              </p>
            </motion.div>

            {/* Dynamic Rate Card */}
            <motion.div variants={cardVariants}>
              <DynamicRateCard />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PROPOSAL FORM — Warm Taupe */}
      <section 
        className="py-24 sm:py-32"
        style={{ background: "linear-gradient(180deg, hsl(35 12% 94%) 0%, hsl(35 15% 90%) 100%)" }}
      >
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-secondary mb-4">
                Submit a Proposal
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-primary mb-4">
                Tell us what you're building
              </h2>
              <p className="text-muted-foreground">
                We read everything. We respond when it aligns.
              </p>
            </motion.div>

            {isSubmitted ? (
              <motion.div 
                variants={itemVariants} 
                className="p-12 rounded-2xl bg-white border border-border text-center shadow-lg"
              >
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: "linear-gradient(135deg, hsl(135 22% 18%) 0%, hsl(135 28% 25%) 100%)" }}
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold text-primary mb-3">Received</h3>
                <p className="text-muted-foreground text-lg">If it aligns, you'll hear back.</p>
              </motion.div>
            ) : (
              <motion.form 
                variants={itemVariants}
                onSubmit={handleSubmit} 
                className="p-8 sm:p-10 rounded-2xl bg-white border border-border shadow-lg space-y-6"
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange}
                      placeholder="Your name"
                      className={`bg-muted/30 border-border ${errors.name ? "border-destructive" : ""}`}
                    />
                    {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email"
                      value={formData.email} 
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`bg-muted/30 border-border ${errors.email ? "border-destructive" : ""}`}
                    />
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatBuilding">What do you need built? *</Label>
                  <Textarea 
                    id="whatBuilding" 
                    name="whatBuilding" 
                    value={formData.whatBuilding} 
                    onChange={handleChange}
                    placeholder="Describe the project or idea..."
                    rows={4}
                    className={`bg-muted/30 border-border ${errors.whatBuilding ? "border-destructive" : ""}`}
                  />
                  {errors.whatBuilding && <p className="text-xs text-destructive">{errors.whatBuilding}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whyNow">Why now? *</Label>
                  <Textarea 
                    id="whyNow" 
                    name="whyNow" 
                    value={formData.whyNow} 
                    onChange={handleChange}
                    placeholder="What's driving this project?"
                    rows={3}
                    className={`bg-muted/30 border-border ${errors.whyNow ? "border-destructive" : ""}`}
                  />
                  {errors.whyNow && <p className="text-xs text-destructive">{errors.whyNow}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Budget range *</Label>
                    <Select value={formData.budget} onValueChange={handleSelectChange}>
                      <SelectTrigger className={`bg-muted/30 border-border ${errors.budget ? "border-destructive" : ""}`}>
                        <SelectValue placeholder="Select a range" />
                      </SelectTrigger>
                      <SelectContent>
                        {nekoConfig.budgetOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.budget && <p className="text-xs text-destructive">{errors.budget}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeline">Timeline (optional)</Label>
                    <Input 
                      id="timeline" 
                      name="timeline" 
                      value={formData.timeline} 
                      onChange={handleChange}
                      placeholder="When hoping to start?"
                      className="bg-muted/30 border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="justification">Justify the budget + expected outcome *</Label>
                  <Textarea 
                    id="justification" 
                    name="justification" 
                    value={formData.justification} 
                    onChange={handleChange}
                    placeholder="What do you expect to achieve with this investment?"
                    rows={3}
                    className={`bg-muted/30 border-border ${errors.justification ? "border-destructive" : ""}`}
                  />
                  {errors.justification && <p className="text-xs text-destructive">{errors.justification}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="links">Links / references (optional)</Label>
                  <Input 
                    id="links" 
                    name="links" 
                    value={formData.links} 
                    onChange={handleChange}
                    placeholder="Portfolio, existing site, inspiration..."
                    className="bg-muted/30 border-border"
                  />
                </div>

                {/* Donation intent toggle */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/5 border border-secondary/20">
                  <input
                    type="checkbox"
                    id="donationIntent"
                    name="donationIntent"
                    checked={formData.donationIntent}
                    onChange={handleChange}
                    className="mt-1 accent-secondary"
                  />
                  <label htmlFor="donationIntent" className="text-sm text-muted-foreground cursor-pointer">
                    <span className="font-medium text-foreground">I want my payment to support mental health institutions.</span>
                    <br />
                    <span className="text-xs">NÈKO is for-profit. Proceeds support mental health care.</span>
                  </label>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting}
                  className="w-full rounded-full py-6 font-semibold border-0"
                  style={{ background: "linear-gradient(135deg, hsl(16 100% 42%) 0%, hsl(16 90% 35%) 100%)" }}
                >
                  {isSubmitting ? "Sending..." : <><Send className="w-4 h-4 mr-2" />Submit Proposal</>}
                </Button>
              </motion.form>
            )}
          </motion.div>
        </div>
      </section>

      {/* DONATION NOTE — Forest Green */}
      <section 
        className="py-24 sm:py-32 relative overflow-hidden noise-texture" 
        style={{ background: "linear-gradient(180deg, hsl(135 22% 14%) 0%, hsl(135 25% 10%) 100%)" }}
      >
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(16 100% 42% / 0.06) 0%, transparent 60%)" }}
          animate={prefersReducedMotion ? {} : { scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 items-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-6 h-6 text-secondary" fill="currentColor" />
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-secondary">
                  Why Payment Matters
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">
                {nekoConfig.brand.missionStatement}
              </h2>
              <p className="text-lg text-white/60 leading-relaxed">
                When you pay for work that aligns, you're also funding care that reaches people who need it.
              </p>
            </motion.div>

            <motion.div variants={cardVariants}>
              <a
                href={nekoConfig.external.donate}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 p-6 rounded-2xl bg-secondary/10 border border-secondary/30 hover:bg-secondary/15 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <span className="text-white font-semibold text-lg block">Donate directly</span>
                  <span className="text-white/50 text-sm">Support mental health institutions</span>
                </div>
                <ArrowRight className="w-5 h-5 text-secondary group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA — White */}
      <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ background: "var(--gradient-mesh)" }} />
        
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              If something here <span className="text-secondary">resonates</span>…
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-muted-foreground mb-10">
              Reach out to see if there's alignment.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button
                asChild
                size="lg"
                className="group rounded-full px-12 py-7 font-semibold text-lg border-0"
                style={{ background: "linear-gradient(135deg, hsl(135 22% 18%) 0%, hsl(135 28% 22%) 100%)" }}
              >
                <Link to="/contact" className="flex items-center gap-3">
                  Start a conversation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
            <motion.p variants={itemVariants} className="text-sm text-muted-foreground/60 mt-8">
              No promises. No pressure. <span className="text-secondary">Just alignment.</span>
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
    </>
  );
}

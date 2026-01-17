// src/pages/Contact.tsx
import { useState } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { nekoConfig } from "@/lib/neko-config";
import { Mail, Send, CheckCircle, MessageCircle, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  message: z.string().trim().min(10, "Please include a message").max(2000),
  links: z.string().trim().max(500).optional(),
});

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Contact() {
  const prefersReducedMotion = useReducedMotion();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    links: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
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
          message: `${formData.message}${formData.links ? `\n\nLinks: ${formData.links}` : ""}`,
          goal: "contact",
          stage: "contact-form",
        },
      });

      if (error) throw error;
      setIsSubmitted(true);
      toast.success("Message sent. I'll be in touch if we're aligned.");
    } catch {
      // Fallback to mailto
      const subject = encodeURIComponent("Hello from " + formData.name);
      const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}

${formData.links ? `Links: ${formData.links}` : ""}
      `.trim());
      
      window.location.href = `mailto:${nekoConfig.email}?subject=${subject}&body=${body}`;
      toast.info("Opening email client as fallback...");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <EccentricNavbar />

      {/* Hero - Forest Green */}
      <section 
        className="pt-36 sm:pt-44 pb-20 sm:pb-24 relative overflow-hidden noise-texture"
        style={{ background: "linear-gradient(180deg, hsl(135 25% 14%) 0%, hsl(135 28% 10%) 100%)" }}
      >
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(16 100% 42% / 0.06) 0%, transparent 60%)" }}
        />

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{ 
                background: "linear-gradient(135deg, hsl(16 100% 42% / 0.15) 0%, hsl(16 100% 42% / 0.08) 100%)",
                border: "1px solid hsl(16 100% 42% / 0.3)"
              }}
            >
              <MessageCircle className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium tracking-wide text-secondary">Let's talk</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-10">
              Say hello
            </motion.h1>

            <motion.div className="space-y-4 text-lg sm:text-xl text-white/60 leading-relaxed">
              <motion.p variants={itemVariants}>
                If you've got a project, an idea, or a question — send it.
              </motion.p>
              <motion.p variants={itemVariants} className="text-white/50">
                If it's aligned and the timing works, I'll respond.<br />
                If not, that's not rejection — it's focus.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Form Section - Warm Taupe */}
      <section 
        className="py-20 sm:py-28"
        style={{ background: "linear-gradient(180deg, hsl(35 12% 94%) 0%, hsl(35 15% 90%) 100%)" }}
      >
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: Email CTA */}
            <motion.div
              variants={prefersReducedMotion ? undefined : containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 variants={itemVariants} className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-primary mb-8">
                Prefer email?
              </motion.h2>

              <motion.a
                variants={itemVariants}
                href={`mailto:${nekoConfig.email}?subject=Hello%2C%20N%C3%88KO`}
                className="group inline-flex items-center gap-4 px-6 py-5 rounded-2xl bg-white border border-border hover:border-secondary/30 hover:shadow-lg transition-all duration-300"
              >
                <span 
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ background: "linear-gradient(135deg, hsl(135 22% 18%) 0%, hsl(135 28% 25%) 100%)" }}
                >
                  <Mail className="w-5 h-5 text-white" />
                </span>
                <span className="text-left">
                  <span className="block text-xs text-muted-foreground mb-0.5">Email</span>
                  <span className="block text-lg font-display font-bold text-primary group-hover:text-secondary transition-colors">
                    {nekoConfig.email}
                  </span>
                </span>
              </motion.a>

              <motion.p variants={itemVariants} className="text-sm text-muted-foreground/60 mt-8 mb-10">
                I read everything. I respond when it aligns.
              </motion.p>

              {/* Work with me CTA */}
              <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-white border border-border">
                <h3 className="font-display font-bold text-primary mb-2">Have a bigger project?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Submit a full proposal with budget and timeline.
                </p>
                <Button 
                  asChild 
                  variant="outline" 
                  className="rounded-full group"
                >
                  <a href="/invite" className="flex items-center gap-2">
                    Submit a proposal
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              variants={prefersReducedMotion ? undefined : containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {isSubmitted ? (
                <motion.div variants={itemVariants} className="p-10 rounded-2xl bg-white border border-border text-center shadow-lg">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: "linear-gradient(135deg, hsl(135 22% 18%) 0%, hsl(135 28% 25%) 100%)" }}
                  >
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-primary mb-3">Message sent</h3>
                  <p className="text-muted-foreground">I'll be in touch if we're aligned.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-2xl bg-white border border-border shadow-lg space-y-6">
                  <motion.h3 variants={itemVariants} className="font-display text-xl font-bold text-primary mb-2">
                    Quick message
                  </motion.h3>

                  <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-4">
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
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      placeholder="What's on your mind?" 
                      rows={5} 
                      className={`bg-muted/30 border-border ${errors.message ? "border-destructive" : ""}`} 
                    />
                    {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="links">Links (optional)</Label>
                    <Input 
                      id="links" 
                      name="links" 
                      value={formData.links} 
                      onChange={handleChange} 
                      placeholder="Portfolio, existing site, references..." 
                      className="bg-muted/30 border-border" 
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Button 
                      type="submit" 
                      size="lg" 
                      disabled={isSubmitting} 
                      className="w-full rounded-full py-6 font-semibold border-0"
                      style={{ background: "linear-gradient(135deg, hsl(16 100% 42%) 0%, hsl(16 90% 35%) 100%)" }}
                    >
                      {isSubmitting ? "Sending..." : <><Send className="w-4 h-4 mr-2" />Send</>}
                    </Button>
                  </motion.div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

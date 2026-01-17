// src/pages/Contact.tsx
import { useState } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { nekoCopy } from "@/content/nekoCopy";
import { Mail, Send, CheckCircle, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  building: z.string().trim().min(1, "Please tell me what you're building").max(2000),
  success: z.string().trim().max(1000).optional(),
  timeline: z.string().trim().max(200).optional(),
  budget: z.string().trim().max(200).optional(),
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
  const c = nekoCopy;
  const prefersReducedMotion = useReducedMotion();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    building: "",
    success: "",
    timeline: "",
    budget: "",
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
          email: "via-form@helloneko.co",
          message: `What are you building: ${formData.building}\n\nWhat does success look like: ${formData.success || "Not specified"}\n\nTimeline: ${formData.timeline || "Not specified"}\n\nBudget: ${formData.budget || "Not specified"}\n\nLinks: ${formData.links || "None provided"}`,
          goal: "alignment-inquiry",
          stage: "contact-form",
        },
      });

      if (error) throw error;
      setIsSubmitted(true);
      toast.success(c.contact.form.success);
    } catch {
      toast.error("Something went wrong. Please try emailing directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <EccentricNavbar />

      {/* Hero - Forest Green */}
      <section 
        className="pt-36 sm:pt-44 pb-20 sm:pb-24 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(135 25% 14%) 0%, hsl(135 28% 10%) 100%)" }}
      >
        {/* Ambient glow */}
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
            {/* Badge */}
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

      {/* Form Section - Warm taupe */}
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
                href={`mailto:${c.contact.email}?subject=Hello%2C%20N%C3%88KO`}
                className="group inline-flex items-center gap-4 px-6 py-5 rounded-2xl bg-white border border-border hover:border-secondary/30 hover:shadow-lg transition-all duration-300"
              >
                <span 
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ background: "linear-gradient(135deg, hsl(135 22% 18%) 0%, hsl(135 28% 25%) 100%)" }}
                >
                  <Mail className="w-5 h-5 text-white" />
                </span>
                <span className="text-left">
                  <span className="block text-xs text-muted-foreground mb-0.5">Email</span>
                  <span className="block text-lg font-display font-bold text-primary group-hover:text-secondary transition-colors">
                    {c.contact.email}
                  </span>
                </span>
              </motion.a>

              <motion.p variants={itemVariants} className="text-sm text-muted-foreground/60 mt-8">
                I read everything. I respond when it aligns.
              </motion.p>
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
                  <p className="text-muted-foreground">{c.contact.form.success}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-2xl bg-white border border-border shadow-lg space-y-6">
                  <motion.h3 variants={itemVariants} className="font-display text-xl font-bold text-primary mb-2">
                    Or use this form
                  </motion.h3>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="name" className="text-foreground/80">Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      placeholder="Your name" 
                      className={`bg-muted/30 border-border focus:border-secondary ${errors.name ? "border-destructive" : ""}`} 
                    />
                    {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="building" className="text-foreground/80">What are you building?</Label>
                    <Textarea 
                      id="building" 
                      name="building" 
                      value={formData.building} 
                      onChange={handleChange} 
                      placeholder="Tell me about your project or idea..." 
                      rows={3} 
                      className={`bg-muted/30 border-border focus:border-secondary ${errors.building ? "border-destructive" : ""}`} 
                    />
                    {errors.building && <p className="text-xs text-destructive">{errors.building}</p>}
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="success" className="text-foreground/80">What does success look like?</Label>
                    <Textarea 
                      id="success" 
                      name="success" 
                      value={formData.success} 
                      onChange={handleChange} 
                      placeholder="How will you know this worked?" 
                      rows={2} 
                      className="bg-muted/30 border-border focus:border-secondary" 
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timeline" className="text-foreground/80">Timeline (optional)</Label>
                      <Input 
                        id="timeline" 
                        name="timeline" 
                        value={formData.timeline} 
                        onChange={handleChange} 
                        placeholder="When hoping to start?" 
                        className="bg-muted/30 border-border focus:border-secondary" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget" className="text-foreground/80">Budget range (optional)</Label>
                      <Input 
                        id="budget" 
                        name="budget" 
                        value={formData.budget} 
                        onChange={handleChange} 
                        placeholder="If you have a range" 
                        className="bg-muted/30 border-border focus:border-secondary" 
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="links" className="text-foreground/80">Links (optional)</Label>
                    <Input 
                      id="links" 
                      name="links" 
                      value={formData.links} 
                      onChange={handleChange} 
                      placeholder="Portfolio, existing site, references..." 
                      className="bg-muted/30 border-border focus:border-secondary" 
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
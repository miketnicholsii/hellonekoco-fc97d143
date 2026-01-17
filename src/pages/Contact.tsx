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
import { Mail, Send, CheckCircle } from "lucide-react";
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

      {/* Hero - Dark */}
      <section className="pt-36 sm:pt-44 pb-20 sm:pb-24 bg-[hsl(220,25%,8%)]">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            animate="visible"
          >
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

      {/* Form Section - White */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: Email CTA */}
            <motion.div
              variants={prefersReducedMotion ? undefined : containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 variants={itemVariants} className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-tertiary mb-8">
                Prefer email?
              </motion.h2>

              <motion.a
                variants={itemVariants}
                href={`mailto:${c.contact.email}?subject=Hello%2C%20N%C3%88KO`}
                className="group inline-flex items-center gap-4 px-6 py-5 rounded-2xl bg-[hsl(40,20%,97%)] border border-tertiary/5 hover:border-primary/20 transition-all duration-300"
              >
                <span className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </span>
                <span className="text-left">
                  <span className="block text-xs text-tertiary/40 mb-0.5">Email</span>
                  <span className="block text-lg font-display font-bold text-tertiary group-hover:text-primary transition-colors">
                    {c.contact.email}
                  </span>
                </span>
              </motion.a>

              <motion.p variants={itemVariants} className="text-sm text-tertiary/40 mt-8">
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
                <motion.div variants={itemVariants} className="p-10 rounded-2xl bg-[hsl(40,20%,97%)] border border-tertiary/5 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-tertiary mb-3">Message sent</h3>
                  <p className="text-tertiary/60">{c.contact.form.success}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-2xl bg-[hsl(40,20%,97%)] border border-tertiary/5 space-y-6">
                  <motion.h3 variants={itemVariants} className="font-display text-xl font-bold text-tertiary mb-2">
                    Or use this form
                  </motion.h3>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="name" className="text-tertiary/80">Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" className={`bg-white border-tertiary/10 ${errors.name ? "border-destructive" : ""}`} />
                    {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="building" className="text-tertiary/80">What are you building?</Label>
                    <Textarea id="building" name="building" value={formData.building} onChange={handleChange} placeholder="Tell me about your project or idea..." rows={3} className={`bg-white border-tertiary/10 ${errors.building ? "border-destructive" : ""}`} />
                    {errors.building && <p className="text-xs text-destructive">{errors.building}</p>}
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="success" className="text-tertiary/80">What does success look like?</Label>
                    <Textarea id="success" name="success" value={formData.success} onChange={handleChange} placeholder="How will you know this worked?" rows={2} className="bg-white border-tertiary/10" />
                  </motion.div>

                  <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timeline" className="text-tertiary/80">Timeline (optional)</Label>
                      <Input id="timeline" name="timeline" value={formData.timeline} onChange={handleChange} placeholder="When hoping to start?" className="bg-white border-tertiary/10" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget" className="text-tertiary/80">Budget range (optional)</Label>
                      <Input id="budget" name="budget" value={formData.budget} onChange={handleChange} placeholder="If you have a range" className="bg-white border-tertiary/10" />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="links" className="text-tertiary/80">Links (optional)</Label>
                    <Input id="links" name="links" value={formData.links} onChange={handleChange} placeholder="Portfolio, existing site, references..." className="bg-white border-tertiary/10" />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Button type="submit" size="lg" disabled={isSubmitting} className="w-full rounded-full py-6 font-semibold">
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

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

const formVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
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

      <section className="min-h-screen flex items-center justify-center relative py-32">
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background pointer-events-none"
          aria-hidden="true"
        />

        <motion.div
          className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, hsl(168 65% 50% / 0.15) 0%, transparent 70%)",
          }}
          animate={
            prefersReducedMotion
              ? {}
              : { x: [0, 30, 0], opacity: [0.15, 0.25, 0.15] }
          }
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Copy */}
            <motion.div
              variants={prefersReducedMotion ? undefined : containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                variants={itemVariants}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-8"
              >
                {c.contact.heading}
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className="space-y-5 text-lg text-muted-foreground leading-relaxed mb-10"
              >
                {c.contact.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </motion.div>

              {/* Email CTA */}
              <motion.div variants={itemVariants} className="mb-8">
                <a
                  href={`mailto:${c.contact.email}?subject=Hello%2C%20N%C3%88KO`}
                  className="group inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-card border border-border/60 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                >
                  <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                    <Mail className="w-4 h-4 text-primary" />
                  </span>
                  <span className="text-left">
                    <span className="block text-xs text-muted-foreground mb-0.5">
                      Email
                    </span>
                    <span className="block text-lg font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                      {c.contact.email}
                    </span>
                  </span>
                </a>
              </motion.div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              variants={prefersReducedMotion ? undefined : formVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              {isSubmitted ? (
                <div className="p-8 sm:p-10 rounded-2xl bg-card border border-border/60 shadow-sm text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                    Message sent
                  </h3>
                  <p className="text-muted-foreground">
                    {c.contact.form.success}
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="p-8 sm:p-10 rounded-2xl bg-card border border-border/60 shadow-sm space-y-6"
                >
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {c.contact.form.title}
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="name">{c.contact.form.fields.name.label}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={c.contact.form.fields.name.placeholder}
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="building">
                      {c.contact.form.fields.building.label}
                    </Label>
                    <Textarea
                      id="building"
                      name="building"
                      value={formData.building}
                      onChange={handleChange}
                      placeholder={c.contact.form.fields.building.placeholder}
                      rows={3}
                      className={errors.building ? "border-destructive" : ""}
                    />
                    {errors.building && (
                      <p className="text-xs text-destructive">{errors.building}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="success">
                      {c.contact.form.fields.success.label}
                    </Label>
                    <Textarea
                      id="success"
                      name="success"
                      value={formData.success}
                      onChange={handleChange}
                      placeholder={c.contact.form.fields.success.placeholder}
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeline">
                      {c.contact.form.fields.timeline.label}
                    </Label>
                    <Input
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      placeholder={c.contact.form.fields.timeline.placeholder}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">
                      {c.contact.form.fields.budget.label}
                    </Label>
                    <Input
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder={c.contact.form.fields.budget.placeholder}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="links">
                      {c.contact.form.fields.links.label}
                    </Label>
                    <Input
                      id="links"
                      name="links"
                      value={formData.links}
                      onChange={handleChange}
                      placeholder={c.contact.form.fields.links.placeholder}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full rounded-full py-6 bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        {c.contact.form.submit}
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
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

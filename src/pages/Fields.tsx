// src/pages/Fields.tsx
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const fields = [
  {
    title: "Digital Structures",
    body: "Websites, identities, and systems designed to work — not just look good.",
    bullets: ["Information architecture", "Design systems", "Sites that ship"],
  },
  {
    title: "Strategic Exploration",
    body: "Positioning, business models, and brand strategy tested through real use.",
    bullets: ["Messaging clarity", "Offer shaping", "Brand posture"],
  },
  {
    title: "Public Artifacts",
    body: "Pages, tools, and ideas released when they're ready — not before.",
    bullets: ["Notes", "Tools", "Small experiments"],
  },
];

export default function Fields() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background">
      <EccentricNavbar />

      {/* Hero */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-20">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <motion.span
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4"
            >
              Fields
            </motion.span>
            
            <motion.h1
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6"
            >
              What exists here.
            </motion.h1>
            
            <motion.p
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed mb-10"
            >
              These aren't packages. They're the kinds of work that show up in the sandbox.
              Sometimes they become collaborations. Sometimes they remain private. Either way, they're real.
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center gap-3"
            >
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/contact">Start a conversation</Link>
              </Button>
              <p className="text-sm text-muted-foreground/60">
                No checkout. No pitch. Just alignment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fields Grid */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto grid gap-8">
            {fields.map((f, index) => (
              <motion.div
                key={f.title}
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 sm:p-10 rounded-2xl bg-card border border-border"
              >
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  {f.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {f.body}
                </p>
                <div className="space-y-2">
                  {f.bullets.map((b) => (
                    <p key={b} className="text-sm text-muted-foreground/70">
                      — {b}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

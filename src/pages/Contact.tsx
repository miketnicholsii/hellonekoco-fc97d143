// src/pages/Contact.tsx
import { motion, useReducedMotion } from "framer-motion";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";

export default function Contact() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background">
      <EccentricNavbar />

      <section className="min-h-screen flex items-center justify-center relative">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center pt-20">
            <motion.span
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4"
            >
              Contact
            </motion.span>
            
            <motion.h1
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6"
            >
              Say hello
            </motion.h1>
            
            <motion.p
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-muted-foreground mb-4"
            >
              A conversation, not a checkout.
            </motion.p>
            
            <motion.p
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted-foreground leading-relaxed mb-12"
            >
              If you've got a project, an idea, or a question—send it.
              If it's aligned and the timing works, I'll respond.
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <p className="text-sm text-muted-foreground">
                Email works best:
              </p>
              <a
                href="mailto:neko@helloneko.co?subject=Hello%2C%20N%C3%88KO&body=What%20are%20you%20building%3F%0A%0AWhat%20would%20success%20look%20like%3F%0A%0AAny%20links%20or%20context%3F"
                className="inline-block text-xl sm:text-2xl font-display font-semibold text-foreground hover:text-primary transition-colors underline underline-offset-4"
              >
                neko@helloneko.co
              </a>
              <p className="text-sm text-muted-foreground/60 pt-4">
                Note: NÈKO isn't always taking on work. That's not scarcity—it's focus.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

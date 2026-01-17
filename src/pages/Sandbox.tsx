// src/pages/Sandbox.tsx
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function Sandbox() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background">
      <EccentricNavbar />

      <section className="min-h-screen flex items-center justify-center relative">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center pt-20">
            <motion.span
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4"
            >
              The sandbox
            </motion.span>
            
            <motion.h1
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-10"
            >
              A working landscape.
            </motion.h1>

            <motion.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 text-lg text-muted-foreground leading-relaxed mb-12"
            >
              <p>
                NÈKO is not a company in the traditional sense.
              </p>
              <p>
                It's a place — where ideas are explored through building.
              </p>
              <p>
                Sometimes that leads to collaboration. Sometimes it leads to nothing at all.
              </p>
              <p>
                Both outcomes are valuable.
              </p>
              <p className="text-foreground font-medium">
                The work is real. The pace is human. Access happens by alignment.
              </p>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/contact">Say hello</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link to="/fields">See the fields</Link>
              </Button>
            </motion.div>

            <motion.p
              initial={prefersReducedMotion ? undefined : { opacity: 0 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xs text-muted-foreground/50 tracking-wide"
            >
              Invite only. By alignment.
            </motion.p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

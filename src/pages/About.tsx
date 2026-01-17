// src/pages/About.tsx
import { Link } from "react-router-dom";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { nekoCopy } from "@/content/nekoCopy";
import { ArrowRight } from "lucide-react";

// Cinematic animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const slowItemVariants: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const paragraphContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const paragraphVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const principleContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const principleVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Principles that align with "sandbox" ethos
const principles = [
  "Work happens through building, not planning.",
  "Restraint is a feature, not a limitation.",
  "Real beats polished. Shipped beats perfect.",
  "Alignment matters more than availability.",
];

// Story paragraphs
const storyParagraphs = [
  "NÈKO started as a question: what if building didn't have to feel like selling?",
  "Most creative work gets flattened into packages, deliverables, and timelines before it has a chance to breathe. That felt wrong.",
  "So this became something different — a place where ideas could be tested through building, where work could happen at a human pace, and where the outcome didn't have to be predetermined.",
  "Sometimes that leads to collaboration. Sometimes it leads to something shared publicly. Sometimes it leads to nothing at all — and that's valuable too.",
];

function Section({
  children,
  className = "",
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <section
      className={`py-24 sm:py-32 lg:py-40 ${dark ? "bg-gradient-dark text-white" : ""} ${className}`}
    >
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export default function About() {
  const c = nekoCopy;
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <EccentricNavbar />

      {/* ═══════════════════════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
        {/* Radial glow */}
        <div
          className="absolute inset-0 bg-gradient-hero-radial pointer-events-none"
          aria-hidden="true"
        />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />

        {/* Animated orb */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, hsl(168 65% 50% / 0.25) 0%, transparent 70%)",
          }}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: [1, 1.1, 1],
                  opacity: [0.15, 0.25, 0.15],
                }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10 pt-24 pb-20">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Label */}
            <motion.span
              variants={prefersReducedMotion ? undefined : itemVariants}
              className="inline-block text-xs font-semibold tracking-widest uppercase text-white/50 mb-6"
            >
              About
            </motion.span>

            {/* Title */}
            <motion.h1
              variants={prefersReducedMotion ? undefined : itemVariants}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8"
            >
              A place, not a product.
            </motion.h1>

            {/* Subdescriptor */}
            <motion.p
              variants={prefersReducedMotion ? undefined : slowItemVariants}
              className="text-xl sm:text-2xl text-white/70 leading-relaxed max-w-2xl mx-auto mb-6"
            >
              {c.brand.descriptor}
            </motion.p>

            <motion.p
              variants={prefersReducedMotion ? undefined : slowItemVariants}
              className="text-base text-white/50 max-w-xl mx-auto"
            >
              Where real work happens — but nothing is promised on demand.
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div className="w-1 h-1.5 rounded-full bg-white/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          STORY
          ═══════════════════════════════════════════════════════════════════ */}
      <Section>
        <motion.div
          className="max-w-3xl mx-auto"
          variants={prefersReducedMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span
            variants={itemVariants}
            className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-6"
          >
            The Origin
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-12"
          >
            How this started.
          </motion.h2>

          <motion.div
            variants={paragraphContainerVariants}
            className="space-y-6 text-lg sm:text-xl text-muted-foreground leading-relaxed"
          >
            {storyParagraphs.map((p, i) => (
              <motion.p
                key={i}
                variants={paragraphVariants}
                className={i === 0 ? "text-foreground font-medium" : ""}
              >
                {p}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════
          PRINCIPLES
          ═══════════════════════════════════════════════════════════════════ */}
      <Section className="bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left - Heading */}
            <motion.div
              variants={prefersReducedMotion ? undefined : containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.span
                variants={itemVariants}
                className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-6"
              >
                Principles
              </motion.span>

              <motion.h2
                variants={itemVariants}
                className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6"
              >
                What guides the work.
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-lg text-muted-foreground leading-relaxed"
              >
                These aren't marketing statements. They're the actual filters used to decide what gets built, what gets shared, and what stays in the sandbox.
              </motion.p>
            </motion.div>

            {/* Right - Principles list */}
            <motion.div
              variants={prefersReducedMotion ? undefined : principleContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6"
            >
              {principles.map((principle, i) => (
                <motion.div
                  key={i}
                  variants={prefersReducedMotion ? undefined : principleVariants}
                  className="group flex items-start gap-5 p-6 rounded-xl bg-card border border-border/60 hover:border-primary/20 hover:shadow-md transition-all duration-300"
                >
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    0{i + 1}
                  </span>
                  <p className="text-foreground font-medium pt-2">{principle}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════
          COMPASS / MISSION
          ═══════════════════════════════════════════════════════════════════ */}
      <Section>
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={prefersReducedMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span
            variants={itemVariants}
            className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-6"
          >
            The Compass
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-10 leading-tight"
          >
            {c.compass}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground"
          >
            If future work violates that line, it doesn't ship.
          </motion.p>
        </motion.div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════
          CTA - Dark
          ═══════════════════════════════════════════════════════════════════ */}
      <Section dark>
        <motion.div
          className="max-w-2xl mx-auto text-center"
          variants={prefersReducedMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span
            variants={itemVariants}
            className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-glow mb-6"
          >
            Invitation
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-8"
          >
            If something here resonates…
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-white/70 mb-12"
          >
            Reach out. Not to buy — but to talk.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Button
              asChild
              size="lg"
              className="rounded-full px-12 py-6 bg-white text-tertiary hover:bg-white/90 font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-base"
            >
              <Link to="/contact" className="flex items-center gap-3">
                {c.ctas.primary}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </Section>

      <Footer />
    </main>
  );
}

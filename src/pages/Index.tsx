// src/pages/Index.tsx
import { Link } from "react-router-dom";
import { nekoCopy } from "@/content/nekoCopy";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Premium animation variants with blur-to-focus effect
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

const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const paragraphContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const paragraphVariants: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Section wrapper with animation
function Section({
  id,
  children,
  className = "",
  dark = false,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={`py-24 sm:py-32 lg:py-40 ${dark ? "bg-gradient-dark text-white" : ""} ${className}`}
    >
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

// Field card with hover effects
function FieldCard({
  title,
  body,
  note,
  index,
}: {
  title: string;
  body: string;
  note: string;
  index: number;
}) {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative p-8 sm:p-10 rounded-2xl bg-card border border-border/60 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-500"
    >
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative">
        <span className="inline-block text-[10px] font-semibold tracking-widest uppercase text-primary/60 mb-4">
          0{index + 1}
        </span>
        <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-4 tracking-tight">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">{body}</p>
        <p className="text-sm text-muted-foreground/70 italic">{note}</p>
      </div>
    </motion.div>
  );
}

export default function Index() {
  const c = nekoCopy;
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <EccentricNavbar />

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — The Signature Entry
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
        {/* Radial glow overlay */}
        <div
          className="absolute inset-0 bg-gradient-hero-radial pointer-events-none"
          aria-hidden="true"
        />

        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />

        {/* Animated gradient orb */}
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, hsl(168 65% 50% / 0.3) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
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
            {/* Signature */}
            <motion.h1
              variants={prefersReducedMotion ? undefined : itemVariants}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8"
            >
              <span className="hello-accent">Hello,</span>{" "}
              <span className="neko-title">
                <span className="neko-letter">N</span>
                <span className="neko-letter">È</span>
                <span className="neko-letter">K</span>
                <span className="neko-letter">O</span>
                <span className="neko-dot">.</span>
              </span>
            </motion.h1>

            {/* Descriptor */}
            <motion.p
              variants={prefersReducedMotion ? undefined : itemVariants}
              className="font-display text-2xl sm:text-3xl font-medium text-white/90 mb-6 tracking-tight"
            >
              {c.brand.descriptor}
            </motion.p>

            {/* Subdescriptor */}
            <motion.p
              variants={prefersReducedMotion ? undefined : slowItemVariants}
              className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto mb-6"
            >
              {c.brand.subdescriptor}
            </motion.p>

            {/* Boundary statement */}
            <motion.p
              variants={prefersReducedMotion ? undefined : slowItemVariants}
              className="text-base text-white/50 max-w-xl mx-auto mb-12"
            >
              {c.brand.boundary}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={prefersReducedMotion ? undefined : itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
            >
              <Button
                asChild
                size="lg"
                className="rounded-full px-10 py-6 bg-white text-primary hover:bg-white/90 font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-base"
              >
                <Link to="/contact" className="flex items-center gap-3">
                  {c.ctas.primary}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="rounded-full px-10 py-6 text-white/80 hover:text-white hover:bg-white/10 font-medium transition-all duration-300 text-base"
              >
                <Link to="/sandbox">{c.ctas.secondary}</Link>
              </Button>
            </motion.div>

            {/* Micro line */}
            <motion.p
              variants={prefersReducedMotion ? undefined : slowItemVariants}
              className="text-xs font-medium tracking-widest uppercase text-white/40"
            >
              {c.footer.micro}
            </motion.p>
          </motion.div>
        </div>

        {/* Subtle scroll indicator */}
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
          WHAT LIVES HERE
          ═══════════════════════════════════════════════════════════════════ */}
      <Section id="what-lives-here">
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
            {c.sections.whatLivesHere.label}
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-10"
          >
            {c.sections.whatLivesHere.title}
          </motion.h2>

          <motion.div
            variants={paragraphContainerVariants}
            className="space-y-6 text-lg sm:text-xl text-muted-foreground leading-relaxed"
          >
            {c.sections.whatLivesHere.body.map((p, i) => (
              <motion.p key={i} variants={paragraphVariants}>
                {p}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════
          FIELDS (NOT SERVICES)
          ═══════════════════════════════════════════════════════════════════ */}
      <Section className="bg-muted/30">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          variants={prefersReducedMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span
            variants={itemVariants}
            className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-6"
          >
            {c.sections.fields.label}
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground"
          >
            {c.sections.fields.title}
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-12"
          variants={prefersReducedMotion ? undefined : cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {c.sections.fields.cards.map((card, i) => (
            <FieldCard key={card.title} {...card} index={i} />
          ))}
        </motion.div>

        <motion.p
          className="text-center text-sm text-muted-foreground/60 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {c.sections.fields.footerNote}
        </motion.p>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════
          HOW WORK HAPPENS
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
            {c.sections.howWorkHappens.label}
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-10"
          >
            {c.sections.howWorkHappens.title}
          </motion.h2>

          <motion.div
            variants={paragraphContainerVariants}
            className="space-y-6 text-lg sm:text-xl text-muted-foreground leading-relaxed"
          >
            {c.sections.howWorkHappens.body.map((p, i) => (
              <motion.p key={i} variants={paragraphVariants}>
                {p}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════
          LEGITIMACY / REALITY CHECK
          ═══════════════════════════════════════════════════════════════════ */}
      <Section className="bg-muted/30">
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
            {c.sections.legitimacy.label}
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-10"
          >
            {c.sections.legitimacy.title}
          </motion.h2>

          <motion.div
            variants={paragraphContainerVariants}
            className="space-y-6 text-lg sm:text-xl text-muted-foreground leading-relaxed"
          >
            {c.sections.legitimacy.body.map((p, i) => (
              <motion.p key={i} variants={paragraphVariants}>
                {p}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════
          INVITATION — Dark CTA
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
            {c.sections.invitation.label}
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8"
          >
            {c.sections.invitation.title}
          </motion.h2>

          <motion.div
            variants={paragraphContainerVariants}
            className="space-y-2 text-xl sm:text-2xl text-white/70 mb-12"
          >
            {c.sections.invitation.body.map((p, i) => (
              <motion.p key={i} variants={paragraphVariants}>
                {p}
              </motion.p>
            ))}
          </motion.div>

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

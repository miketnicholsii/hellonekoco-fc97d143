// src/pages/Index.tsx
import { Link } from "react-router-dom";
import { nekoCopy } from "@/content/nekoCopy";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";

function Section({
  id,
  label,
  title,
  children,
}: {
  id?: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <section id={id} className="py-20 sm:py-28 lg:py-32">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-3xl">
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4">
            {label}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-8">
            {title}
          </h2>
          {children}
        </motion.div>
      </div>
    </section>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
      {items.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

function FieldCard({
  title,
  body,
  note,
}: {
  title: string;
  body: string;
  note: string;
}) {
  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border">
      <h3 className="font-display text-xl font-semibold text-foreground mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed mb-4">
        {body}
      </p>
      <p className="text-sm text-muted-foreground/70 italic">{note}</p>
    </div>
  );
}

export default function Index() {
  const c = nekoCopy;
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background">
      <EccentricNavbar />

      {/* HERO */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" aria-hidden="true" />
        
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center pt-20">
            <motion.h1 
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6"
            >
              {c.brand.signature}
            </motion.h1>

            <motion.p 
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl sm:text-2xl text-muted-foreground mb-4"
            >
              {c.brand.descriptor}
            </motion.p>

            <motion.p 
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-muted-foreground/80 leading-relaxed max-w-xl mx-auto mb-6"
            >
              {c.brand.subdescriptor}
            </motion.p>

            <motion.p 
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm text-muted-foreground/60 mb-10"
            >
              {c.brand.boundary}
            </motion.p>

            <motion.div 
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/contact">{c.ctas.primary}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link to="/sandbox">{c.ctas.secondary}</Link>
              </Button>
            </motion.div>

            <motion.p 
              initial={prefersReducedMotion ? undefined : { opacity: 0 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-16 text-xs text-muted-foreground/50 tracking-wide"
            >
              {c.footer.micro}
            </motion.p>
          </div>
        </div>
      </section>

      {/* WHAT LIVES HERE */}
      <Section id="what-lives-here" label={c.sections.whatLivesHere.label} title={c.sections.whatLivesHere.title}>
        <Paragraphs items={c.sections.whatLivesHere.body} />
      </Section>

      {/* FIELDS */}
      <Section id="fields" label={c.sections.fields.label} title={c.sections.fields.title}>
        <div className="grid gap-6 mt-10">
          {c.sections.fields.cards.map((card) => (
            <FieldCard key={card.title} {...card} />
          ))}
        </div>
        <p className="mt-10 text-sm text-muted-foreground/60 text-center">{c.sections.fields.footerNote}</p>
      </Section>

      {/* HOW WORK HAPPENS */}
      <Section id="how-work-happens" label={c.sections.howWorkHappens.label} title={c.sections.howWorkHappens.title}>
        <Paragraphs items={c.sections.howWorkHappens.body} />
      </Section>

      {/* LEGITIMACY */}
      <Section id="legitimacy" label={c.sections.legitimacy.label} title={c.sections.legitimacy.title}>
        <Paragraphs items={c.sections.legitimacy.body} />
      </Section>

      {/* INVITATION */}
      <section id="invitation" className="py-24 sm:py-32 lg:py-40 bg-muted/30">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-2xl text-center">
          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4">
              {c.sections.invitation.label}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-8">
              {c.sections.invitation.title}
            </h2>
            <div className="space-y-2 text-muted-foreground text-lg mb-10">
              {c.sections.invitation.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/contact">{c.ctas.primary}</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

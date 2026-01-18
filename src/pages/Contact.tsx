// src/pages/Contact.tsx
import { Link } from "react-router-dom";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { nekoConfig } from "@/lib/neko-config";
import { Mail, ArrowRight, Palette, Target, Users, Lightbulb } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

const reachOutReasons = [
  {
    icon: Palette,
    title: "Design & Build",
    description: "Websites, digital systems, visual identity — the craft side of things.",
  },
  {
    icon: Target,
    title: "Business Strategy",
    description: "Positioning, messaging, business models, and strategic clarity.",
  },
  {
    icon: Users,
    title: "General Networking",
    description: "Industry connections, referrals, or just a good conversation.",
  },
  {
    icon: Lightbulb,
    title: "Something Else",
    description: "Ideas, collaborations, questions — if it's interesting, send it.",
  },
];

export default function Contact() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <EccentricNavbar />

      {/* Hero */}
      <section 
        className="pt-36 sm:pt-44 pb-20 sm:pb-28 relative overflow-hidden noise-texture" 
        style={{ background: "linear-gradient(180deg, #334336 0%, #2a3a2d 100%)" }}
      >
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="max-w-2xl mx-auto text-center" 
            variants={prefersReducedMotion ? undefined : containerVariants} 
            initial="hidden" 
            animate="visible"
          >
            <motion.h1 
              variants={itemVariants} 
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-10"
            >
              Say hello
            </motion.h1>
            <motion.div className="space-y-4 text-lg sm:text-xl text-white/60 leading-relaxed">
              <motion.p variants={itemVariants}>
                If you've got a project, an idea, or a question — send it.
              </motion.p>
              <motion.p variants={itemVariants} className="text-white/45">
                If it's aligned and the timing works, I'll respond.<br />
                If not, that's not rejection — it's focus.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What to reach out about */}
      <section className="py-20 sm:py-28" style={{ background: "#EDE7E3" }}>
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-14">
              <span className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#334336]/50 mb-4">
                Good reasons to reach out
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: "#334336" }}>
                What to talk about
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5 lg:gap-6 mb-16">
              {reachOutReasons.map((reason, i) => (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  className="group p-6 sm:p-8 rounded-2xl bg-white border border-[#C8BFB5]/30 hover:shadow-lg transition-all duration-300"
                  whileHover={prefersReducedMotion ? {} : { y: -4 }}
                >
                  <div 
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: "#334336" }}
                  >
                    <reason.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight mb-2" style={{ color: "#334336" }}>
                    {reason.title}
                  </h3>
                  <p className="text-[#334336]/60 leading-relaxed text-sm sm:text-base">
                    {reason.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Email CTA - The main action */}
      <section 
        className="py-24 sm:py-32 relative overflow-hidden noise-texture"
        style={{ background: "linear-gradient(180deg, #334336 0%, #1f2a21 100%)" }}
      >
        {/* Ambient glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(229, 83, 10, 0.08) 0%, transparent 60%)" }}
          animate={prefersReducedMotion ? {} : { scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span variants={itemVariants} className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#E5530A] mb-6">
              Get in touch
            </motion.span>
            
            <motion.h2 variants={itemVariants} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-8">
              Ready when you are.
            </motion.h2>

            <motion.p variants={itemVariants} className="text-lg text-white/50 mb-12">
              Drop a line. Keep it simple or go deep — either works.
            </motion.p>

            {/* Big email display */}
            <Button
              asChild
              variant="ghost"
              className="group h-auto flex-col items-center gap-4 whitespace-normal rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:text-white active:scale-[0.99] sm:p-10"
            >
              <motion.a
                variants={itemVariants}
                href={`mailto:${nekoConfig.email}?subject=Hello%2C%20N%C3%88KO`}
              >
                <div 
                  className="mb-2 flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ background: "linear-gradient(135deg, #E5530A 0%, #C74A09 100%)" }}
                >
                  <Mail className="h-7 w-7 text-white" />
                </div>
                <span className="font-display text-2xl font-bold text-white transition-colors group-hover:text-[#E5530A] sm:text-3xl lg:text-4xl">
                  {nekoConfig.email}
                </span>
                <span className="text-sm text-white/40 transition-colors group-hover:text-white/60">
                  Click to open your email client
                </span>
              </motion.a>
            </Button>

            {/* Proposal link */}
            <motion.div variants={itemVariants} className="mt-14 pt-10 border-t border-white/10">
              <p className="text-white/40 mb-4 text-sm">Planning something substantial with a clear scope and horizon?</p>
              <Button 
                asChild 
                variant="outline" 
                className="rounded-full group border-white/20 text-white hover:bg-white/10 hover:border-white/30"
              >
                <Link to="/invite" className="flex items-center gap-2">
                  Submit a full proposal
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

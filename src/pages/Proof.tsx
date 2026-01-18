// src/pages/Proof.tsx
import { motion, useReducedMotion, Variants } from "framer-motion";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { nekoConfig } from "@/lib/neko-config";
import { WorkBreakdownCharts } from "@/components/WorkBreakdownCharts";
import { useLiveMetrics } from "@/hooks/use-live-metrics";
import { 
  ArrowRight, 
  Rocket, 
  Calendar, 
  Globe, 
  Clock,
  Code,
  Target,
  Palette,
  Cog,
  Activity,
  CheckCircle,
  Zap,
  Star
} from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

// Metric cards data
const metrics = [
  { icon: Rocket, label: "Projects shipped", value: nekoConfig.metrics.projectsShipped, color: "#E5530A" },
  { icon: Calendar, label: "Crafted systems & taste", value: nekoConfig.metrics.yearsBuilding, color: "#334336" },
  { icon: Globe, label: "Domains launched", value: nekoConfig.metrics.domainsLaunched, color: "#C8BFB5" },
  { 
    icon: Clock, 
    label: "Response cadence", 
    value: nekoConfig.metrics.avgResponseTime, 
    color: "#334336",
    valueClassName: "text-2xl sm:text-3xl font-semibold tracking-[0.25em] uppercase",
    labelClassName: "text-[11px] uppercase tracking-[0.3em] text-[#334336]/70",
  },
];

// Toolbox icons
const toolboxIcons: Record<string, React.ElementType> = {
  web: Code,
  systems: Cog,
  strategy: Target,
  design: Palette,
};

// Live metrics icons
const liveMetricIcons = {
  activeProjects: Activity,
  completionRate: CheckCircle,
  efficiency: Zap,
  clientSatisfaction: Star,
};

// Live timestamp display component
const LiveTimestamp = ({ timestamp, secondsUntilRefresh }: { timestamp: string; secondsUntilRefresh: number }) => (
  <motion.div 
    className="flex items-center gap-2 text-[10px] font-mono"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <motion.span
      className="w-1.5 h-1.5 rounded-full bg-green-500"
      animate={{ opacity: [1, 0.4, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
    />
    <span className="text-white/50">LIVE</span>
    <span className="text-white/70 tabular-nums">{timestamp}</span>
    <span className="text-white/40">•</span>
    <span className="text-white/40 tabular-nums">refresh in {secondsUntilRefresh}s</span>
  </motion.div>
);

export default function Proof() {
  const prefersReducedMotion = useReducedMotion();
  const liveMetrics = useLiveMetrics();
  const { toolbox } = nekoConfig;
  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <EccentricNavbar />

      {/* Hero - Dark Forest */}
      <section 
        className="pt-36 sm:pt-44 pb-20 sm:pb-28 relative overflow-hidden noise-texture"
        style={{ background: "linear-gradient(180deg, #334336 0%, #2a3a2d 50%, #1f2a21 100%)" }}
      >
        {/* Ambient glow */}
        <div 
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(229, 83, 10, 0.08) 0%, transparent 60%)" }}
        />
        
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span 
              variants={itemVariants} 
              className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase mb-6 px-4 py-1.5 rounded-full"
              style={{ background: "rgba(229, 83, 10, 0.15)", color: "#E5530A", border: "1px solid rgba(229, 83, 10, 0.3)" }}
            >
              Signal Index
            </motion.span>
            
            <motion.h1 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-8">
              Signals
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg sm:text-xl text-white/60 leading-relaxed mb-4">
              Directional signals from shipped work and sustained focus.
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-sm text-white/40">
              Directional, not exhaustive. Clarity over precision.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Live Metrics - Dark Section */}
      <section 
        className="py-16 sm:py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #1f2a21 0%, #334336 100%)" }}
      >
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* Header with live indicator */}
            <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">Live Status</h3>
                <p className="text-sm text-white/50">Real-time operational metrics</p>
              </div>
              <LiveTimestamp timestamp={liveMetrics.timestamp} secondsUntilRefresh={liveMetrics.secondsUntilRefresh} />
            </motion.div>

            {/* Live metrics grid */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {[
                { 
                  icon: liveMetricIcons.activeProjects, 
                  label: "Active Projects", 
                  value: liveMetrics.activeProjects,
                  suffix: "",
                  color: "#E5530A"
                },
                { 
                  icon: liveMetricIcons.completionRate, 
                  label: "Completion Rate", 
                  value: liveMetrics.completionRate,
                  suffix: "%",
                  color: "#4ade80"
                },
                { 
                  icon: liveMetricIcons.efficiency, 
                  label: "Efficiency", 
                  value: liveMetrics.efficiency,
                  suffix: "%",
                  color: "#C8BFB5"
                },
                { 
                  icon: liveMetricIcons.clientSatisfaction, 
                  label: "Satisfaction", 
                  value: liveMetrics.clientSatisfaction,
                  suffix: "%",
                  color: "#fbbf24"
                },
              ].map((metric, i) => (
                <motion.div
                  key={i}
                  className="p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
                  whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.2)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <metric.icon className="w-4 h-4" style={{ color: metric.color }} />
                    <span className="text-xs text-white/50 uppercase tracking-wider">{metric.label}</span>
                  </div>
                  <motion.div 
                    key={metric.value}
                    className="font-display text-3xl sm:text-4xl font-bold tabular-nums"
                    style={{ color: metric.color }}
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {metric.value}{metric.suffix}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            <motion.p 
              variants={itemVariants}
              className="text-center text-xs text-white/30 mt-6"
            >
              Metrics update every 5 seconds based on current operational state
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Metrics Grid - Soft Neutral */}
      <section className="py-20 sm:py-28" style={{ background: "#EDE7E3" }}>
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                className="group relative p-6 sm:p-8 rounded-2xl bg-white border border-[#C8BFB5]/30 shadow-lg hover:shadow-xl transition-all duration-500"
                whileHover={prefersReducedMotion ? {} : { y: -6, scale: 1.02 }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${metric.color}15` }}
                >
                  <metric.icon className="w-5 h-5" style={{ color: metric.color }} />
                </div>
                <div 
                  className={metric.valueClassName ?? "font-display text-3xl sm:text-4xl font-bold tracking-tight mb-2"}
                  style={{ color: "#334336" }}
                >
                  {metric.value}
                </div>
                <div className={metric.labelClassName ?? "text-sm text-[#334336]/60"}>{metric.label}</div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            variants={cardVariants}
            className="mt-10 sm:mt-12 max-w-3xl mx-auto rounded-2xl border border-[#C8BFB5]/40 bg-white/90 px-6 sm:px-8 py-6 shadow-lg"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.3em] text-[#334336]/60 mb-2">
                  {nekoConfig.pricingSignal.label}
                </div>
                <div className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#334336]">
                  {nekoConfig.pricingSignal.range}
                </div>
                <div className="text-sm text-[#334336]/60 mt-2">
                  {nekoConfig.pricingSignal.detail}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <WorkBreakdownCharts variant="signals" />

      {/* Toolbox Section - Warm Muted */}
      <section className="py-20 sm:py-28" style={{ background: "#C8BFB5" }}>
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-xl mx-auto mb-16"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span variants={itemVariants} className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#334336]/60 mb-4">
              Toolbox
            </motion.span>
            <motion.h2 variants={itemVariants} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight" style={{ color: "#334336" }}>
              I build with modern tools
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-[#334336]/60 mt-4">
              The stack changes by the job.
            </motion.p>
          </motion.div>

          <motion.div 
            className="max-w-3xl mx-auto space-y-6"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {Object.entries(toolbox).map(([key, item], i) => {
              const Icon = toolboxIcons[key] || Code;
              return (
                <motion.div
                  key={key}
                  variants={cardVariants}
                  className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: "#334336" }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display font-semibold" style={{ color: "#334336" }}>{item.label}</span>
                        <span className="text-sm font-medium" style={{ color: "#E5530A" }}>{item.value}%</span>
                      </div>
                      <div className="h-2 bg-[#EDE7E3] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: "linear-gradient(90deg, #334336 0%, #E5530A 100%)" }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pl-14">
                    {item.skills.map((skill, j) => (
                      <span 
                        key={j} 
                        className="text-xs px-3 py-1 rounded-full"
                        style={{ background: "#EDE7E3", color: "#334336" }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.p
            className="text-center text-sm text-[#334336]/50 mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Proficiency is subjective. These are signals, not certifications.
          </motion.p>
        </div>
      </section>

      {/* CTA Section - Dark Forest */}
      <section 
        className="py-20 sm:py-28 relative overflow-hidden noise-texture"
        style={{ background: "linear-gradient(180deg, #334336 0%, #2a3a2d 100%)" }}
      >
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-xl mx-auto"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={itemVariants} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              Selective by design. Open to the right work.
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-white/60 mb-10">
              If it feels like a fit, request an invite. If you&apos;re still curious, start with a simple hello.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col items-center justify-center gap-4">
              <Button 
                asChild 
                size="lg" 
                className="group rounded-full px-8 py-6 text-base font-semibold"
                style={{ background: "#E5530A", color: "white" }}
              >
                <Link to="/invite" className="flex items-center gap-2">
                  Request an invite
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Link
                to="/contact"
                className="text-sm font-medium text-white/70 underline underline-offset-4 transition-colors hover:text-white"
              >
                Start with a hello
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

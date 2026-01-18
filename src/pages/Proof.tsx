// src/pages/Proof.tsx
import { motion, useReducedMotion, Variants } from "framer-motion";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { nekoConfig } from "@/lib/neko-config";
import { 
  ArrowRight, 
  Rocket, 
  Calendar, 
  Globe, 
  Clock,
  Code,
  Target,
  Palette,
  Cog
} from "lucide-react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";

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
  { icon: Calendar, label: "Years building", value: nekoConfig.metrics.yearsBuilding, color: "#334336" },
  { icon: Globe, label: "Domains launched", value: nekoConfig.metrics.domainsLaunched, color: "#C8BFB5" },
  { icon: Clock, label: "Response time", value: nekoConfig.metrics.avgResponseTime, color: "#334336" },
];

// Focus over time data (abstract exploration vs delivery)
const focusData = [
  { month: "J", exploration: 70, delivery: 30 },
  { month: "F", exploration: 60, delivery: 40 },
  { month: "M", exploration: 45, delivery: 55 },
  { month: "A", exploration: 55, delivery: 45 },
  { month: "M", exploration: 40, delivery: 60 },
  { month: "J", exploration: 50, delivery: 50 },
  { month: "J", exploration: 35, delivery: 65 },
  { month: "A", exploration: 45, delivery: 55 },
];

// Toolbox icons
const toolboxIcons: Record<string, React.ElementType> = {
  web: Code,
  systems: Cog,
  strategy: Target,
  design: Palette,
};

export default function Proof() {
  const prefersReducedMotion = useReducedMotion();
  const { toolbox } = nekoConfig;
  const workMixData = [...nekoConfig.workMix];

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
              Stats & Signals
            </motion.span>
            
            <motion.h1 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-8">
              Proof
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg sm:text-xl text-white/60 leading-relaxed mb-4">
              Not a pitch. Just evidence that I ship.
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-sm text-white/40">
              Numbers are approximate. Transparency over precision.
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
                <div className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-2" style={{ color: "#334336" }}>
                  {metric.value}
                </div>
                <div className="text-sm text-[#334336]/60">{metric.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Charts Section - White */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-xl mx-auto mb-16"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span variants={itemVariants} className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#E5530A] mb-4">
              Visual Signals
            </motion.span>
            <motion.h2 variants={itemVariants} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight" style={{ color: "#334336" }}>
              How the work breaks down
            </motion.h2>
          </motion.div>

          <motion.div 
            className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Work Mix Donut */}
            <motion.div 
              variants={cardVariants}
              className="p-8 rounded-2xl border border-[#C8BFB5]/30 bg-[#EDE7E3]/30"
            >
              <h3 className="font-display text-xl font-bold mb-2" style={{ color: "#334336" }}>Work Mix</h3>
              <p className="text-sm text-[#334336]/60 mb-6">How time typically divides</p>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={workMixData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={3}
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={1200}
                    >
                      {workMixData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                {workMixData.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                    <span className="text-xs text-[#334336]/70">{item.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Focus Over Time */}
            <motion.div 
              variants={cardVariants}
              className="p-8 rounded-2xl border border-[#C8BFB5]/30 bg-[#EDE7E3]/30"
            >
              <h3 className="font-display text-xl font-bold mb-2" style={{ color: "#334336" }}>Focus Over Time</h3>
              <p className="text-sm text-[#334336]/60 mb-6">Exploration vs. delivery balance</p>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={focusData}>
                    <defs>
                      <linearGradient id="explorationGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#E5530A" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#E5530A" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="deliveryGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#334336" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#334336" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#334336', fontSize: 12 }} />
                    <YAxis hide />
                    <Area type="monotone" dataKey="exploration" stroke="#E5530A" fill="url(#explorationGrad)" strokeWidth={2} />
                    <Area type="monotone" dataKey="delivery" stroke="#334336" fill="url(#deliveryGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: "#E5530A" }} />
                  <span className="text-xs text-[#334336]/70">Exploration</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: "#334336" }} />
                  <span className="text-xs text-[#334336]/70">Delivery</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

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

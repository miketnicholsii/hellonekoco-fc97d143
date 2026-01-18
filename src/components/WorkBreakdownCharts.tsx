import { motion, useReducedMotion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { nekoConfig } from "@/lib/neko-config";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
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

type WorkBreakdownVariant = "home" | "numbers";

interface WorkBreakdownChartsProps {
  variant?: WorkBreakdownVariant;
}

export function WorkBreakdownCharts({ variant = "numbers" }: WorkBreakdownChartsProps) {
  const prefersReducedMotion = useReducedMotion();
  const workMixData = [...nekoConfig.workMix];

  const introCopy =
    variant === "home"
      ? "A quick, quiet read on where the work tends to land. Signals, not a pitch."
      : "Directional signals on how effort splits between exploration and delivery.";

  return (
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
            Signal Index
          </motion.span>
          <motion.h2 variants={itemVariants} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight" style={{ color: "#334336" }}>
            How the work breaks down
          </motion.h2>
          <motion.p variants={itemVariants} className="text-sm sm:text-base text-[#334336]/70 mt-4">
            {introCopy}
          </motion.p>
          {variant === "home" && (
            <motion.div variants={itemVariants} className="mt-6">
              <Link to="/proof" className="text-xs font-semibold tracking-[0.2em] uppercase text-[#334336]/60 hover:text-[#334336] transition-colors">
                View full numbers
              </Link>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
          variants={prefersReducedMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
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
                      <stop offset="5%" stopColor="#E5530A" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#E5530A" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="deliveryGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#334336" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#334336" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#334336", fontSize: 12 }} />
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
  );
}

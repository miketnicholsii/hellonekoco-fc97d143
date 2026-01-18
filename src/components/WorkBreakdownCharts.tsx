import { motion, useReducedMotion, Variants, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
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
  Tooltip,
} from "recharts";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.92, rotateX: 8 },
  visible: { opacity: 1, y: 0, scale: 1, rotateX: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const focusData = [
  { month: "Jan", exploration: 70, delivery: 30 },
  { month: "Feb", exploration: 60, delivery: 40 },
  { month: "Mar", exploration: 45, delivery: 55 },
  { month: "Apr", exploration: 55, delivery: 45 },
  { month: "May", exploration: 40, delivery: 60 },
  { month: "Jun", exploration: 50, delivery: 50 },
  { month: "Jul", exploration: 35, delivery: 65 },
  { month: "Aug", exploration: 45, delivery: 55 },
];

// Animated pie chart segment
const AnimatedPieSegment = ({ 
  cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, index 
}: any) => {
  const [animatedOuterRadius, setAnimatedOuterRadius] = useState(innerRadius);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedOuterRadius(outerRadius);
    }, index * 150 + 300);
    return () => clearTimeout(timer);
  }, [outerRadius, index]);

  return (
    <motion.path
      d={describeArc(cx, cy, innerRadius, isHovered ? outerRadius + 8 : animatedOuterRadius, startAngle, endAngle)}
      fill={fill}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        filter: isHovered ? "brightness(1.1)" : "brightness(1)"
      }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: "pointer", transition: "all 0.3s ease" }}
    />
  );
};

// Helper function to create arc path
function describeArc(cx: number, cy: number, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number) {
  const startOuter = polarToCartesian(cx, cy, outerRadius, endAngle);
  const endOuter = polarToCartesian(cx, cy, outerRadius, startAngle);
  const startInner = polarToCartesian(cx, cy, innerRadius, endAngle);
  const endInner = polarToCartesian(cx, cy, innerRadius, startAngle);
  
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  
  return [
    "M", startOuter.x, startOuter.y,
    "A", outerRadius, outerRadius, 0, largeArcFlag, 0, endOuter.x, endOuter.y,
    "L", endInner.x, endInner.y,
    "A", innerRadius, innerRadius, 0, largeArcFlag, 1, startInner.x, startInner.y,
    "Z"
  ].join(" ");
}

function polarToCartesian(cx: number, cy: number, radius: number, angle: number) {
  const rad = (angle - 90) * Math.PI / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad)
  };
}

// Animated percentage display
const AnimatedPercentage = ({ value, color, delay = 0 }: { value: number; color: string; delay?: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 1200, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      
      setDisplayValue(Math.round(eased * value));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    const timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, delay);
    
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrame);
    };
  }, [value, isInView, delay]);

  return (
    <span ref={ref} style={{ color }} className="font-display font-bold text-lg tabular-nums">
      {displayValue}%
    </span>
  );
};

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 py-3 rounded-xl shadow-xl border backdrop-blur-md"
        style={{ 
          background: "rgba(51, 67, 54, 0.95)", 
          borderColor: "rgba(255,255,255,0.1)" 
        }}
      >
        <p className="text-white/90 font-medium text-sm mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: {entry.value}%
          </p>
        ))}
      </motion.div>
    );
  }
  return null;
};

type WorkBreakdownVariant = "home" | "signals";

interface WorkBreakdownChartsProps {
  variant?: WorkBreakdownVariant;
}

export function WorkBreakdownCharts({ variant = "signals" }: WorkBreakdownChartsProps) {
  const prefersReducedMotion = useReducedMotion();
  const workMixData = [...nekoConfig.workMix];
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const introCopy =
    variant === "home"
      ? "A quick, quiet read on where the work tends to land. Signals, not a pitch."
      : "Directional signals on how effort splits between exploration and delivery.";

  // Calculate pie chart angles
  const total = workMixData.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;
  const pieSegments = workMixData.map((item, index) => {
    const startAngle = currentAngle;
    const angle = (item.value / total) * 360;
    currentAngle += angle;
    return { ...item, startAngle, endAngle: currentAngle, index };
  });

  return (
    <section 
      ref={sectionRef}
      className="py-24 sm:py-32 relative overflow-hidden"
      style={{ 
        background: "linear-gradient(180deg, #ffffff 0%, #f8f6f4 50%, #EDE7E3 100%)" 
      }}
    >
      {/* Animated background accents */}
      <motion.div
        className="absolute top-0 left-0 w-full h-32 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(51, 67, 54, 0.02) 0%, transparent 100%)" }}
      />
      <motion.div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(229, 83, 10, 0.04) 0%, transparent 60%)" }}
        animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(51, 67, 54, 0.03) 0%, transparent 60%)" }}
        animate={prefersReducedMotion ? {} : { scale: [1, 1.15, 1], rotate: [0, -30, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />
      
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center max-w-xl mx-auto mb-16"
          variants={prefersReducedMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span 
            variants={itemVariants} 
            className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#E5530A] mb-4"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-[#E5530A]"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Signal Index
          </motion.span>
          <motion.h2 
            variants={itemVariants} 
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight" 
            style={{ color: "#334336" }}
          >
            How the work breaks down
          </motion.h2>
          <motion.p variants={itemVariants} className="text-sm sm:text-base text-[#334336]/70 mt-4">
            {introCopy}
          </motion.p>
          {variant === "home" && (
            <motion.div variants={itemVariants} className="mt-6">
              <Link 
                to="/proof" 
                className="group inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#334336]/60 hover:text-[#E5530A] transition-colors"
              >
                View the signal index
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
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
          {/* Work Mix Chart */}
          <motion.div
            variants={cardVariants}
            className="group relative p-8 rounded-3xl border overflow-hidden"
            style={{ 
              background: "linear-gradient(145deg, #ffffff 0%, #f8f6f4 100%)",
              borderColor: "rgba(200, 191, 181, 0.4)"
            }}
            whileHover={{ y: -4, boxShadow: "0 20px 40px -15px rgba(51, 67, 54, 0.15)" }}
            transition={{ duration: 0.3 }}
          >
            {/* Card glow on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              style={{ background: "radial-gradient(circle at 50% 30%, rgba(229, 83, 10, 0.05) 0%, transparent 60%)" }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display text-xl font-bold" style={{ color: "#334336" }}>Work Mix</h3>
                  <p className="text-sm text-[#334336]/60">How time typically divides</p>
                </div>
                <motion.div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(229, 83, 10, 0.1)" }}
                  whileHover={{ rotate: 180, scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <svg className="w-5 h-5 text-[#E5530A]" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" opacity="0.2"/>
                    <path d="M12 2a10 10 0 0110 10h-10V2z"/>
                  </svg>
                </motion.div>
              </div>

              <div className="h-64 relative">
                {isInView && (
                  <svg width="100%" height="100%" viewBox="0 0 200 200">
                    {pieSegments.map((segment, i) => (
                      <AnimatedPieSegment
                        key={i}
                        cx={100}
                        cy={100}
                        innerRadius={50}
                        outerRadius={85}
                        startAngle={segment.startAngle}
                        endAngle={segment.endAngle}
                        fill={segment.color}
                        index={i}
                      />
                    ))}
                    {/* Center text */}
                    <motion.text
                      x="100"
                      y="95"
                      textAnchor="middle"
                      className="font-display font-bold"
                      style={{ fill: "#334336", fontSize: "24px" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      100%
                    </motion.text>
                    <motion.text
                      x="100"
                      y="115"
                      textAnchor="middle"
                      style={{ fill: "#334336", fontSize: "10px", opacity: 0.5 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5 }}
                      transition={{ delay: 1.2 }}
                    >
                      capacity
                    </motion.text>
                  </svg>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                {workMixData.map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{ background: `${item.color}10` }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.5 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                  >
                    <div className="flex items-center gap-2">
                      <motion.div 
                        className="w-3 h-3 rounded-full" 
                        style={{ background: item.color }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      />
                      <span className="text-xs text-[#334336]/80 font-medium">{item.name}</span>
                    </div>
                    <AnimatedPercentage value={item.value} color={item.color} delay={i * 150 + 800} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Focus Over Time Chart */}
          <motion.div
            variants={cardVariants}
            className="group relative p-8 rounded-3xl border overflow-hidden"
            style={{ 
              background: "linear-gradient(145deg, #334336 0%, #2a3a2d 100%)",
              borderColor: "rgba(255, 255, 255, 0.1)"
            }}
            whileHover={{ y: -4, boxShadow: "0 20px 40px -15px rgba(51, 67, 54, 0.4)" }}
            transition={{ duration: 0.3 }}
          >
            {/* Ambient glow */}
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(229, 83, 10, 0.1) 0%, transparent 60%)" }}
              animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">Focus Over Time</h3>
                  <p className="text-sm text-white/50">Exploration vs. delivery balance</p>
                </div>
                <motion.div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(229, 83, 10, 0.2)" }}
                  whileHover={{ rotate: 45, scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <svg className="w-5 h-5 text-[#E5530A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                </motion.div>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={focusData}>
                    <defs>
                      <linearGradient id="explorationGradAnimated" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#E5530A" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#E5530A" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="deliveryGradAnimated" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#C8BFB5" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#C8BFB5" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} 
                    />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="exploration" 
                      name="Exploration"
                      stroke="#E5530A" 
                      fill="url(#explorationGradAnimated)" 
                      strokeWidth={3}
                      dot={{ fill: "#E5530A", strokeWidth: 0, r: 4 }}
                      activeDot={{ r: 6, fill: "#E5530A", stroke: "#fff", strokeWidth: 2 }}
                      animationDuration={2000}
                      animationEasing="ease-out"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="delivery" 
                      name="Delivery"
                      stroke="#C8BFB5" 
                      fill="url(#deliveryGradAnimated)" 
                      strokeWidth={3}
                      dot={{ fill: "#C8BFB5", strokeWidth: 0, r: 4 }}
                      activeDot={{ r: 6, fill: "#C8BFB5", stroke: "#fff", strokeWidth: 2 }}
                      animationDuration={2000}
                      animationEasing="ease-out"
                      animationBegin={300}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-center gap-8 mt-6">
                <motion.div 
                  className="flex items-center gap-3 px-4 py-2 rounded-full"
                  style={{ background: "rgba(229, 83, 10, 0.15)" }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className="w-3 h-3 rounded-full" 
                    style={{ background: "#E5530A" }}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-xs text-white/80 font-medium">Exploration</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3 px-4 py-2 rounded-full"
                  style={{ background: "rgba(200, 191, 181, 0.15)" }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className="w-3 h-3 rounded-full" 
                    style={{ background: "#C8BFB5" }}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                  <span className="text-xs text-white/80 font-medium">Delivery</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

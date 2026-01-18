import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { nekoConfig } from "@/lib/neko-config";
import { Sparkles } from "lucide-react";

export function AnimatedRateCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse tracking for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  
  // Animated number effect
  const [displayValue, setDisplayValue] = useState(0);
  const targetValue = nekoConfig.rate.hourly;
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 1500, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart
      
      setDisplayValue(Math.round(eased * targetValue));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    // Start animation when component mounts
    const timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, 300);
    
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrame);
    };
  }, [targetValue]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative max-w-md mx-auto perspective-1000"
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.div
        className="relative p-8 sm:p-10 rounded-3xl text-center overflow-hidden cursor-default"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          background: "linear-gradient(145deg, #ffffff 0%, #f8f6f4 100%)",
          boxShadow: isHovered 
            ? "0 25px 60px -15px rgba(229, 83, 10, 0.25), 0 10px 30px -10px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)"
            : "0 15px 40px -10px rgba(0,0,0,0.1), 0 5px 20px -5px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(229, 83, 10, 0.08) 0%, transparent 50%)",
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Floating particles */}
        {isHovered && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-[#E5530A]/30"
                initial={{ 
                  opacity: 0,
                  x: "50%",
                  y: "50%",
                }}
                animate={{
                  opacity: [0, 1, 0],
                  x: `${50 + (Math.random() - 0.5) * 80}%`,
                  y: `${50 + (Math.random() - 0.5) * 80}%`,
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.15,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
            ))}
          </>
        )}
        
        {/* Content */}
        <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
          {/* Label with shimmer */}
          <motion.div 
            className="flex items-center justify-center gap-2 mb-5"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-4 h-4 text-[#E5530A]" />
            </motion.div>
            <motion.span 
              className="text-xs font-bold tracking-[0.25em] uppercase text-[#334336]/50 relative overflow-hidden"
              animate={{ 
                textShadow: [
                  "0 0 0px rgba(229, 83, 10, 0)",
                  "0 0 8px rgba(229, 83, 10, 0.4)",
                  "0 0 0px rgba(229, 83, 10, 0)"
                ]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Rate Signal
              {/* Shimmer overlay */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E5530A]/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
              />
            </motion.span>
          </motion.div>
          
          {/* Animated rate number */}
          <div className="relative mb-2">
            <motion.div 
              className="font-display text-6xl sm:text-7xl font-bold tracking-tight"
              style={{ color: "#E5530A" }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                $
              </motion.span>
              <span>{displayValue}</span>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.4 }}
                className="text-4xl sm:text-5xl"
              >
                +
              </motion.span>
            </motion.div>
            
            {/* Glow effect behind number */}
            <motion.div
              className="absolute inset-0 -z-10 blur-2xl"
              style={{ background: "radial-gradient(circle, rgba(229, 83, 10, 0.15) 0%, transparent 70%)" }}
              animate={{ 
                scale: isHovered ? [1, 1.2, 1] : 1,
                opacity: isHovered ? [0.5, 0.8, 0.5] : 0.3,
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          
          {/* Unit */}
          <motion.div 
            className="text-lg text-[#334336]/60 mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {nekoConfig.rate.unit}
          </motion.div>
          
          {/* Description with typewriter effect hint */}
          <motion.p 
            className="text-sm text-[#334336]/50 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            {nekoConfig.rate.description}
          </motion.p>
          
          {/* Animated underline */}
          <motion.div
            className="mt-6 h-0.5 bg-gradient-to-r from-transparent via-[#E5530A]/30 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
          />
        </div>
        
        {/* Corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
          style={{
            background: "radial-gradient(circle at top right, rgba(229, 83, 10, 0.1) 0%, transparent 70%)",
          }}
          animate={{
            opacity: isHovered ? 1 : 0.5,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

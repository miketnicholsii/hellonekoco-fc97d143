import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";

const phrases = [
  "FAILURE-TOLERANT",
  "NO VANITY METRICS",
  "NO SAFETY NET",
  "PRODUCTION ONLY",
  "CONSEQUENCES APPLY",
];

export function RotatingPill() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % phrases.length);
    }, 3000); // Slow, subtle rotation

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center">
      <motion.div
        className="relative inline-flex items-center justify-center px-6 py-3 rounded-full overflow-hidden"
        style={{
          background: "rgba(51, 67, 54, 0.08)",
          border: "1px solid rgba(51, 67, 54, 0.15)",
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase"
            style={{ color: "#334336" }}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {phrases[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

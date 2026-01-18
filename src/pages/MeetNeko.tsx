import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MeetNeko() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden noise-texture"
      style={{ background: "linear-gradient(180deg, #334336 0%, #1f2a21 100%)" }}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(229, 83, 10, 0.15) 0%, transparent 50%)" }}
        animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="text-center relative z-10 px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.h1 
          className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold text-white mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          lol, hell Nope.
        </motion.h1>
        
        <motion.p
          className="text-white/50 text-lg sm:text-xl mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Nice try though.
        </motion.p>

        <motion.p
          className="text-white/30 text-sm mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          You want in? Bring the work.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            asChild 
            variant="outline"
            className="rounded-full px-8 py-6 text-base font-semibold border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all"
          >
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to reality
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      {/* Decorative NÈKO watermark */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <span className="font-display text-6xl sm:text-8xl font-bold text-white tracking-tight">
          NÈKO
        </span>
      </motion.div>
    </main>
  );
}

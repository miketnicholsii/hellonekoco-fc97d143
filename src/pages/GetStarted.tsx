import { motion, useReducedMotion } from "framer-motion";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Mail } from "lucide-react";

export default function GetStarted() {
  const prefersReducedMotion = useReducedMotion();
  const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

  const fadeIn = prefersReducedMotion 
    ? {} 
    : { 
        initial: { opacity: 0, y: 20 }, 
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: easeOut }
      };

  return (
    <main className="min-h-screen bg-white overflow-x-hidden relative">
      <EccentricNavbar />

      {/* Clean white hero section */}
      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center relative z-10 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* Invite Only Badge - Peach/Orange */}
            <motion.div 
              {...fadeIn}
              className="flex justify-center mb-10 sm:mb-12"
            >
              <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-orange-200 bg-orange-50">
                <div className="w-2 h-2 rounded-full bg-orange-400" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-orange-500">
                  Invite Only
                </span>
              </div>
            </motion.div>

            {/* Main heading */}
            <motion.h1 
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-8"
            >
              Good things are built
              <br />
              <span className="text-[#5B9A8B]">with care.</span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut, delay: 0.25 }}
              className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-xl mx-auto mb-12 sm:mb-14"
            >
              Neko partners with founders who are patiently shaping something real. 
              If that sounds like you, come say hello.
            </motion.p>

            {/* Email CTA - Teal button */}
            <motion.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut, delay: 0.4 }}
              className="flex justify-center"
            >
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=neko@helloneko.co"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#5B9A8B] text-white font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-[#4A8979] hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#5B9A8B] focus:ring-offset-2 focus:ring-offset-white shadow-lg shadow-[#5B9A8B]/20"
              >
                <Mail className="h-5 w-5" />
                neko@helloneko.co
              </a>
            </motion.div>

            {/* Subtle tagline */}
            <motion.p
              initial={prefersReducedMotion ? undefined : { opacity: 0 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6, ease: easeOut }}
              className="mt-10 text-sm text-gray-400"
            >
              Tell us about yourself and what you're building.
            </motion.p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

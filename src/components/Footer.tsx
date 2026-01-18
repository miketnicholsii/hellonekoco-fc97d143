import { forwardRef, useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight, Heart, Instagram, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { nekoConfig } from "@/lib/neko-config";

const footerLinks = {
  explore: [
    { href: "/sandbox", label: "The Sandbox" },
    { href: "/fields", label: "Fields" },
    { href: "/proof", label: "Signals" },
  ],
  connect: [
    { href: "/invite", label: "Work with NÈKO." },
    { href: "/donate", label: "Donate" },
    { href: "/contact", label: "Say hello." },
  ],
  legal: [
    { href: "/legal/privacy", label: "Privacy" },
    { href: "/legal/terms", label: "Terms" },
  ],
};

// Animated link component - arrow space reserved to prevent layout shift
const FooterLink = ({ href, label, showArrow = true }: { href: string; label: string; showArrow?: boolean }) => (
  <motion.div className="relative inline-flex justify-center" whileHover="hover" initial="rest">
    <Link 
      to={href} 
      className="relative inline-flex items-center justify-center text-sm text-white/50 transition-colors hover:text-[#E5530A]"
    >
      <span>{label}</span>
      {showArrow && (
        <motion.span
          className="absolute -right-4"
          variants={{
            rest: { opacity: 0, scale: 0.8 },
            hover: { opacity: 1, scale: 1 }
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <ArrowUpRight className="h-3 w-3 text-[#E5530A]" />
        </motion.span>
      )}
    </Link>
    {/* Underline animation for non-arrow links */}
    {!showArrow && (
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-[#E5530A]"
        variants={{
          rest: { width: 0 },
          hover: { width: "100%" }
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    )}
  </motion.div>
);

// Container animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

// Easter egg component for "Who is NÈKO?"
const WhoIsNekoEasterEgg = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showMilestone, setShowMilestone] = useState(false);
  
  const mysteryResponses = [
    "Nice try.",
    "Still no.",
    "You're persistent.",
    "The mystery deepens.",
    "Perhaps... no.",
    "🐱",
    "...",
    "We are everywhere.",
    "We are nowhere.",
    "Just vibes.",
    "Hell nope, you'd have better luck finding where Bobby Shmurda's hat went.",
    "404: Identity not found.",
    "I could tell you, but then I'd have to rebrand.",
    "Classified. Like, actually classified.",
    "A figment of your imagination. Or am I?",
    "The real NÈKO was the friends we made along the way.",
    "*pretends not to hear you*",
    "Ask again after you've subscribed.",
    "That's above your pay grade, bestie.",
    "Wouldn't you like to know, weather boy.",
    "I'm just a cat on the internet. Or am I?",
    "The answer is inside you. Jk, it's not.",
    "A ghost. A legend. A tax write-off.",
    "I'm behind you. 👀",
    "Error: Too much rizz to compute.",
    "We don't do that here.",
    "I plead the fifth.",
    "NÈKO is a vibe, not a person.",
    "Some things are better left unsaid. This is one of them.",
    "*mysterious cat noises*",
  ];

  const milestoneResponse = "Fine. Here's a clue: 🌙✨ The answer lies where the sun meets the code. ✨🌙";
  
  const handleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    // Show milestone at exactly 10 clicks
    if (newCount === 10) {
      setShowMilestone(true);
      setTimeout(() => setShowMilestone(false), 4000);
    } else {
      setIsRevealed(true);
      setTimeout(() => setIsRevealed(false), 2000);
    }
  };
  
  const currentResponse = mysteryResponses[clickCount % mysteryResponses.length];
  const isPersistent = clickCount >= 10;
  
  return (
    <motion.button
      onClick={handleClick}
      className="relative inline-flex items-center gap-1.5 text-xs text-white/20 hover:text-white/40 transition-colors cursor-pointer group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <HelpCircle className="w-3 h-3 opacity-50 group-hover:opacity-80 transition-opacity" />
      <span className="italic">Who is NÈKO?</span>
      
      {/* Persistent badge after 10 clicks */}
      {isPersistent && (
        <motion.span
          className="ml-1 text-[8px] text-[#E5530A]/60"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          🔓
        </motion.span>
      )}
      
      <AnimatePresence>
        {/* Milestone reveal at 10 clicks */}
        {showMilestone && (
          <motion.div
            className="absolute -top-16 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap pointer-events-none"
            style={{ 
              background: "linear-gradient(135deg, rgba(229, 83, 10, 0.5) 0%, rgba(255, 140, 50, 0.4) 100%)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 200, 100, 0.5)",
              boxShadow: "0 0 30px rgba(229, 83, 10, 0.4), 0 0 60px rgba(229, 83, 10, 0.2)"
            }}
            initial={{ opacity: 0, y: 20, scale: 0.5 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
            }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Sparkle effects */}
            <motion.span
              className="absolute -top-1 -left-1 text-sm"
              animate={{ 
                rotate: [0, 20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 1, repeat: 3 }}
            >
              ✨
            </motion.span>
            <motion.span
              className="absolute -bottom-1 -right-1 text-sm"
              animate={{ 
                rotate: [0, -20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 1, repeat: 3, delay: 0.2 }}
            >
              ✨
            </motion.span>
            <span className="relative z-10 text-white">{milestoneResponse}</span>
          </motion.div>
        )}
        
        {/* Regular responses */}
        {isRevealed && !showMilestone && (
          <motion.span
            className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-xs font-medium text-white/80 whitespace-nowrap pointer-events-none"
            style={{ 
              background: "rgba(229, 83, 10, 0.3)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(229, 83, 10, 0.4)"
            }}
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {currentResponse}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

const BottomBar = () => (
  <motion.div 
    className="pt-8 border-t border-white/10 flex flex-col items-center justify-center gap-6 text-center"
    variants={itemVariants}
  >
    {/* Pronunciation & Meet NÈKO */}
    <motion.div className="flex flex-col items-center gap-3" variants={itemVariants}>
      <div className="text-xs text-white/30">
        <span className="font-display">NÈKO</span>
        <span className="mx-1.5 text-white/20">•</span>
        <span className="italic text-white/25">/NEH-koh/</span>
      </div>
      <motion.div whileHover="hover" initial="rest" className="relative inline-flex justify-center">
        <Link 
          to="/meet"
          className="relative inline-flex items-center justify-center text-base font-display font-semibold text-white hover:text-[#E5530A] transition-colors duration-300"
        >
          <span>Meet NÈKO.</span>
          <motion.span
            className="absolute -right-5"
            variants={{
              rest: { opacity: 0, scale: 0.8 },
              hover: { opacity: 1, scale: 1 }
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <ArrowUpRight className="h-4 w-4 text-[#E5530A]" />
          </motion.span>
        </Link>
      </motion.div>
    </motion.div>
    
    {/* Easter egg */}
    <WhoIsNekoEasterEgg />
    
    <motion.p className="text-xs text-white/30" variants={itemVariants}>
      © 2026 NÈKO. All rights reserved.
    </motion.p>
    <motion.div whileHover="hover" initial="rest" className="relative" variants={itemVariants}>
      <a 
        href="https://miketnicholsii.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#E5530A]/70 hover:text-[#E5530A] transition-colors"
      >
        <motion.span
          variants={{
            rest: { x: 0 },
            hover: { x: 2 }
          }}
          transition={{ duration: 0.2 }}
        >
          Mike T. Nichols II
        </motion.span>
        <motion.span
          variants={{
            rest: { opacity: 0, x: -6, scale: 0.8 },
            hover: { opacity: 1, x: 0, scale: 1 }
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <ArrowUpRight className="h-3 w-3" />
        </motion.span>
      </a>
    </motion.div>
  </motion.div>
);

export const Footer = forwardRef<HTMLElement>((_, ref) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogoClick = useCallback((e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Navigate to home, then scroll to top
      navigate("/");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    }
  }, [location.pathname, navigate]);
  
  return (
    <>
      {/* Divider before footer */}
      <motion.div 
        className="h-1 w-full" 
        style={{ background: "#E5530A" }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      
      <footer 
        ref={ref} 
        role="contentinfo" 
        className="relative overflow-hidden"
        style={{ background: "#1f2a21" }}
      >
        <motion.div 
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          
          {/* Top section - Brand info centered */}
          <motion.div className="flex flex-col items-center text-center mb-10 sm:mb-16" variants={itemVariants}>
            <button onClick={handleLogoClick} className="inline-block mb-4 group cursor-pointer" aria-label="Scroll to top">
              <motion.span 
                className="font-display text-2xl font-bold tracking-tight text-white relative inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {/* Persistent ambient glow */}
                <motion.span
                  className="absolute -inset-x-8 -inset-y-4 rounded-full pointer-events-none"
                  style={{ 
                    background: "radial-gradient(ellipse at center, rgba(229, 83, 10, 0.25) 0%, rgba(229, 83, 10, 0.08) 40%, transparent 70%)",
                    filter: "blur(12px)"
                  }}
                  animate={{ 
                    opacity: [0.6, 0.9, 0.6],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
                {/* Secondary glow layer for depth */}
                <motion.span
                  className="absolute -inset-x-6 -inset-y-3 rounded-full pointer-events-none"
                  style={{ 
                    background: "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 60%)",
                    filter: "blur(8px)"
                  }}
                />
                <span className="relative z-10">NÈKO<span className="text-[#E5530A]">.</span></span>
                {/* Hover boost effect */}
                <motion.span
                  className="absolute -inset-x-6 -inset-y-3 rounded-full pointer-events-none"
                  style={{ 
                    background: "radial-gradient(circle, rgba(229, 83, 10, 0.4) 0%, transparent 60%)",
                    filter: "blur(10px)"
                  }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.span>
            </button>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-4">
              {nekoConfig.brand.tagline}
            </p>
            <div className="flex items-center gap-2 text-xs text-white/30 mb-6">
              <Heart className="w-3 h-3 text-[#E5530A]/60" />
              <span>{nekoConfig.brand.missionLine}</span>
            </div>
            
            {/* Instagram callout */}
            <motion.a 
              href="https://www.instagram.com/helloneko.co"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white/70 transition-colors duration-300"
              style={{ 
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}
              whileHover={{ 
                scale: 1.05, 
                borderColor: "rgba(229, 83, 10, 0.4)",
                color: "#E5530A"
              }}
              transition={{ duration: 0.2 }}
            >
              <Instagram className="w-4 h-4" />
              <span>@helloneko.co</span>
              <motion.span
                initial={{ opacity: 0, x: -4 }}
                whileHover={{ opacity: 1, x: 0 }}
              >
                <ArrowUpRight className="h-3 w-3 text-[#E5530A]" />
              </motion.span>
            </motion.a>
          </motion.div>

          {/* Nav columns - stack on mobile with dividers, 3 columns on desktop */}
          <div className="max-w-3xl mx-auto mb-10 sm:mb-16">
            {/* Desktop: 3 columns */}
            <div className="hidden sm:grid sm:grid-cols-3 gap-12 text-center">
              <motion.nav aria-label="Explore links" variants={itemVariants}>
                <h4 className="font-display text-xs font-bold tracking-[0.15em] text-white/60 mb-4 uppercase">
                  Explore
                </h4>
                <ul className="space-y-3">
                  {footerLinks.explore.map((link) => (
                    <li key={link.label} className="flex justify-center">
                      <FooterLink href={link.href} label={link.label} />
                    </li>
                  ))}
                </ul>
              </motion.nav>

              <motion.nav aria-label="Connect links" variants={itemVariants}>
                <h4 className="font-display text-xs font-bold tracking-[0.15em] text-white/60 mb-4 uppercase">
                  Connect
                </h4>
                <ul className="space-y-3">
                  {footerLinks.connect.map((link) => (
                    <li key={link.label} className="flex justify-center">
                      <FooterLink href={link.href} label={link.label} />
                    </li>
                  ))}
                </ul>
              </motion.nav>

              <motion.nav aria-label="Legal links" variants={itemVariants}>
                <h4 className="font-display text-xs font-bold tracking-[0.15em] text-white/60 mb-4 uppercase">
                  Legal
                </h4>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link) => (
                    <li key={link.label} className="flex justify-center">
                      <FooterLink href={link.href} label={link.label} showArrow={false} />
                    </li>
                  ))}
                </ul>
              </motion.nav>
            </div>

            {/* Mobile: stacked with dividers */}
            <div className="sm:hidden flex flex-col text-center">
              <motion.nav aria-label="Explore links" variants={itemVariants} className="py-6">
                <h4 className="font-display text-xs font-bold tracking-[0.15em] text-white/60 mb-4 uppercase">
                  Explore
                </h4>
                <ul className="space-y-3">
                  {footerLinks.explore.map((link) => (
                    <li key={link.label} className="flex justify-center">
                      <FooterLink href={link.href} label={link.label} />
                    </li>
                  ))}
                </ul>
              </motion.nav>

              <div className="w-16 h-px bg-white/10 mx-auto" />

              <motion.nav aria-label="Connect links" variants={itemVariants} className="py-6">
                <h4 className="font-display text-xs font-bold tracking-[0.15em] text-white/60 mb-4 uppercase">
                  Connect
                </h4>
                <ul className="space-y-3">
                  {footerLinks.connect.map((link) => (
                    <li key={link.label} className="flex justify-center">
                      <FooterLink href={link.href} label={link.label} />
                    </li>
                  ))}
                </ul>
              </motion.nav>

              <div className="w-16 h-px bg-white/10 mx-auto" />

              <motion.nav aria-label="Legal links" variants={itemVariants} className="py-6">
                <h4 className="font-display text-xs font-bold tracking-[0.15em] text-white/60 mb-4 uppercase">
                  Legal
                </h4>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link) => (
                    <li key={link.label} className="flex justify-center">
                      <FooterLink href={link.href} label={link.label} showArrow={false} />
                    </li>
                  ))}
                </ul>
              </motion.nav>
            </div>
          </div>

          {/* Bottom bar */}
          <BottomBar />
        </motion.div>
      </footer>
    </>
  );
});

Footer.displayName = "Footer";

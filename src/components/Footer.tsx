import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Heart, Instagram } from "lucide-react";
import { motion } from "framer-motion";
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

// Animated link component - enhanced with scale effect
const FooterLink = ({ href, label, showArrow = true }: { href: string; label: string; showArrow?: boolean }) => (
  <motion.div className="relative inline-block" whileHover="hover" initial="rest">
    <Link 
      to={href} 
      className="relative inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-[#E5530A]"
    >
      <motion.span
        variants={{
          rest: { x: 0 },
          hover: { x: showArrow ? 2 : 0 }
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {label}
      </motion.span>
      {showArrow && (
        <motion.span
          variants={{
            rest: { opacity: 0, x: -8, scale: 0.8 },
            hover: { opacity: 1, x: 0, scale: 1 }
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

// Animated external link component
const ExternalLink = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={className}
    whileHover="hover"
    initial="rest"
  >
    <motion.span
      className="inline-flex items-center gap-2"
      variants={{
        rest: { scale: 1 },
        hover: { scale: 1.02 }
      }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.span>
  </motion.a>
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

export const Footer = forwardRef<HTMLElement>((_, ref) => {
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
          className="container mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          
          {/* Main grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-12">
            
            {/* Brand column - centered on mobile */}
            <motion.div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left" variants={itemVariants}>
              <Link to="/" className="inline-block mb-4 group" aria-label="NÈKO home">
                <span className="font-display text-2xl font-bold tracking-tight text-white">
                  NÈKO<span className="text-[#E5530A]">.</span>
                </span>
              </Link>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-6">
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

            {/* Nav columns - centered on mobile */}
            <div className="lg:col-span-8 grid grid-cols-3 gap-8 text-center lg:text-left">
              {/* Explore */}
              <motion.nav aria-label="Explore links" variants={itemVariants}>
                <h4 className="font-display text-xs font-bold tracking-[0.15em] text-white/60 mb-4 uppercase">
                  Explore
                </h4>
                <ul className="space-y-3">
                  {footerLinks.explore.map((link) => (
                    <li key={link.label} className="flex justify-center lg:justify-start">
                      <FooterLink href={link.href} label={link.label} />
                    </li>
                  ))}
                </ul>
              </motion.nav>

              {/* Connect */}
              <motion.nav aria-label="Connect links" variants={itemVariants}>
                <h4 className="font-display text-xs font-bold tracking-[0.15em] text-white/60 mb-4 uppercase">
                  Connect
                </h4>
                <ul className="space-y-3">
                  {footerLinks.connect.map((link) => (
                    <li key={link.label} className="flex justify-center lg:justify-start">
                      <FooterLink href={link.href} label={link.label} />
                    </li>
                  ))}
                </ul>
              </motion.nav>

              {/* Legal */}
              <motion.nav aria-label="Legal links" variants={itemVariants}>
                <h4 className="font-display text-xs font-bold tracking-[0.15em] text-white/60 mb-4 uppercase">
                  Legal
                </h4>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link) => (
                    <li key={link.label} className="flex justify-center lg:justify-start">
                      <FooterLink href={link.href} label={link.label} showArrow={false} />
                    </li>
                  ))}
                </ul>
              </motion.nav>
            </div>
          </div>

          {/* Bottom bar */}
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
              <motion.div whileHover="hover" initial="rest">
                <Link 
                  to="/meet"
                  className="inline-flex items-center gap-1.5 text-base font-display font-semibold text-white hover:text-[#E5530A] transition-colors duration-300"
                >
                  <span>Meet NÈKO.</span>
                  <motion.span
                    variants={{
                      rest: { opacity: 0, x: -8, scale: 0.8 },
                      hover: { opacity: 1, x: 0, scale: 1 }
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <ArrowUpRight className="h-4 w-4 text-[#E5530A]" />
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
            
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
        </motion.div>
      </footer>
    </>
  );
});

Footer.displayName = "Footer";

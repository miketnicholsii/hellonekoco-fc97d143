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
    { href: "/invite", label: "Work With Me" },
    { href: "/donate", label: "Donate" },
    { href: "/contact", label: "Say Hello" },
  ],
  legal: [
    { href: "/legal/privacy", label: "Privacy" },
    { href: "/legal/terms", label: "Terms" },
  ],
};

// Animated link component
const FooterLink = ({ href, label, showArrow = true }: { href: string; label: string; showArrow?: boolean }) => (
  <motion.div className="relative inline-block" whileHover="hover" initial="rest">
    <Link 
      to={href} 
      className="relative inline-flex items-center justify-center gap-1 text-sm text-white/50 transition-colors hover:text-[#E5530A]"
    >
      <span>{label}</span>
      {showArrow && (
        <motion.span
          variants={{
            rest: { opacity: 0, x: -4 },
            hover: { opacity: 1, x: 0 }
          }}
          transition={{ duration: 0.2 }}
        >
          <ArrowUpRight className="h-3 w-3 text-[#E5530A]" />
        </motion.span>
      )}
    </Link>
  </motion.div>
);

export const Footer = forwardRef<HTMLElement>((_, ref) => {
  return (
    <>
      {/* Divider before footer */}
      <div className="h-1 w-full" style={{ background: "#E5530A" }} />
      
      <footer 
        ref={ref} 
        role="contentinfo" 
        className="relative overflow-hidden"
        style={{ background: "#1f2a21" }}
      >
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
          
          {/* Main grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-12">
            
            {/* Brand column */}
            <div className="lg:col-span-4">
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
              <a 
                href="https://www.instagram.com/helloneko.co"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white/70 hover:text-[#E5530A] transition-all duration-300 hover:scale-105"
                style={{ 
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)"
                }}
              >
                <Instagram className="w-4 h-4" />
                <span>@helloneko.co</span>
              </a>
            </div>

            {/* Nav columns */}
            <div className="lg:col-span-8 grid grid-cols-3 gap-8">
              {/* Explore */}
              <nav aria-label="Explore links">
                <h4 className="font-display text-xs font-bold tracking-[0.15em] text-white/60 mb-4 uppercase">
                  Explore
                </h4>
                <ul className="space-y-3">
                  {footerLinks.explore.map((link) => (
                    <li key={link.label}>
                      <FooterLink href={link.href} label={link.label} />
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Connect */}
              <nav aria-label="Connect links">
                <h4 className="font-display text-xs font-bold tracking-[0.15em] text-white/60 mb-4 uppercase">
                  Connect
                </h4>
                <ul className="space-y-3">
                  {footerLinks.connect.map((link) => (
                    <li key={link.label}>
                      <FooterLink href={link.href} label={link.label} />
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Legal */}
              <nav aria-label="Legal links">
                <h4 className="font-display text-xs font-bold tracking-[0.15em] text-white/60 mb-4 uppercase">
                  Legal
                </h4>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link) => (
                    <li key={link.label}>
                      <FooterLink href={link.href} label={link.label} showArrow={false} />
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col items-center justify-center gap-6 text-center">
            {/* Pronunciation & Meet NÈKO */}
            <div className="flex flex-col items-center gap-3">
              <div className="text-xs text-white/30">
                <span className="font-display">NÈKO</span>
                <span className="mx-1.5 text-white/20">•</span>
                <span className="italic text-white/25">/NEH-koh/</span>
              </div>
              <Link 
                to="/meet"
                className="text-base font-display font-semibold text-white hover:text-[#E5530A] transition-colors duration-300"
              >
                Meet NÈKO.
              </Link>
            </div>
            
            <p className="text-xs text-white/30">
              © 2026 NÈKO. All rights reserved.
            </p>
            <a 
              href="https://miketnicholsii.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs font-medium text-[#E5530A]/70 hover:text-[#E5530A] transition-colors"
            >
              Mike T. Nichols II
            </a>
          </div>
        </div>
      </footer>
    </>
  );
});

Footer.displayName = "Footer";

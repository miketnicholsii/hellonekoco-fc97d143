import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Heart, Sparkles } from "lucide-react";
import { nekoConfig } from "@/lib/neko-config";

const footerLinks = {
  explore: [
    { href: "/sandbox", label: "The Sandbox" },
    { href: "/fields", label: "Fields" },
    { href: "/proof", label: "Proof" },
  ],
  connect: [
    { href: "/invite", label: "Work With Me" },
    { href: "/notes", label: "Notes" },
    { href: "/contact", label: "Say Hello" },
  ],
  legal: [
    { href: "/legal/privacy", label: "Privacy" },
    { href: "/legal/terms", label: "Terms" },
  ],
};

export const Footer = forwardRef<HTMLElement>((_, ref) => {
  return (
    <footer 
      ref={ref} 
      role="contentinfo" 
      className="relative overflow-hidden noise-texture"
      style={{ background: "linear-gradient(180deg, hsl(135 25% 12%) 0%, hsl(135 28% 8%) 100%)" }}
    >
      {/* Subtle ambient glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, hsl(16 100% 42% / 0.04) 0%, transparent 70%)" }}
      />
      
      <div className="relative container mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 z-10">
        
        {/* Top section - centered brand */}
        <div className="text-center mb-14 sm:mb-16">
          <Link to="/" className="inline-block mb-5 group">
            <span className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white transition-colors group-hover:text-secondary">
              NÈKO<span className="text-secondary">.</span>
            </span>
          </Link>
          <p className="text-white/50 text-sm leading-relaxed max-w-md mx-auto mb-5">
            {nekoConfig.brand.tagline}
          </p>
          <span 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-medium tracking-wide"
            style={{ 
              background: "hsl(16 100% 42% / 0.12)", 
              color: "hsl(16 100% 55%)", 
              border: "1px solid hsl(16 100% 42% / 0.25)" 
            }}
          >
            <Sparkles className="w-3 h-3" />
            {nekoConfig.brand.badge}
          </span>
        </div>

        {/* Middle section - symmetrical nav columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 max-w-2xl mx-auto mb-14 sm:mb-16">
          {/* Explore */}
          <nav aria-label="Explore links" className="text-center">
            <h4 className="font-display text-[10px] sm:text-xs font-bold tracking-[0.15em] text-white/60 mb-4 uppercase">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="group inline-flex items-center justify-center gap-1 text-sm text-white/45 hover:text-secondary transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <nav aria-label="Connect links" className="text-center">
            <h4 className="font-display text-[10px] sm:text-xs font-bold tracking-[0.15em] text-white/60 mb-4 uppercase">
              Connect
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.connect.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="group inline-flex items-center justify-center gap-1 text-sm text-white/45 hover:text-secondary transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal links" className="text-center col-span-2 sm:col-span-1">
            <h4 className="font-display text-[10px] sm:text-xs font-bold tracking-[0.15em] text-white/60 mb-4 uppercase">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-white/35 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mission statement - centered */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 text-[11px] text-white/35">
            <Heart className="w-3 h-3 text-[#E5530A]/50" />
            {nekoConfig.brand.missionStatement}
          </span>
        </div>

        {/* Bottom section - symmetrical with legacy note */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="space-y-1">
              <p className="text-[11px] text-white/30">
                © {new Date().getFullYear()} NÈKO. All rights reserved.
              </p>
              <p className="text-[11px] text-white/30">
                Hello, NÈKO.
              </p>
            </div>
            
            <div className="space-y-1">
              <a 
                href="https://miketnicholsii.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[12px] font-medium tracking-wide transition-colors hover:text-secondary"
                style={{ color: "hsl(16 100% 55% / 0.7)" }}
              >
                Mike T. Nichols II
              </a>
              <p className="text-[10px] text-white/35">
                {nekoConfig.legacyNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

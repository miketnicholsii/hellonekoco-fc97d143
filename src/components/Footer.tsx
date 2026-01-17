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
  more: [
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
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(16 100% 42% / 0.06) 0%, transparent 60%)" }}
      />
      
      <div className="relative container mx-auto px-5 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link to="/" className="inline-block mb-4 group">
              <span className="font-display text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-secondary">
                NÈKO<span className="text-secondary">.</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-2">
              {nekoConfig.brand.tagline}
            </p>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-4">
              Building real things, at a human pace.
            </p>
            <div className="flex flex-col gap-2">
              <span 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-medium tracking-wide w-fit"
                style={{ 
                  background: "hsl(16 100% 42% / 0.15)", 
                  color: "hsl(16 100% 55%)", 
                  border: "1px solid hsl(16 100% 42% / 0.3)" 
                }}
              >
                <Sparkles className="w-3 h-3" />
                {nekoConfig.brand.badge}
              </span>
              <span className="inline-flex items-center gap-2 text-[10px] text-white/40">
                <Heart className="w-3 h-3" />
                {nekoConfig.brand.missionStatement}
              </span>
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Explore links">
            <h4 className="font-display text-[10px] sm:text-xs font-bold tracking-wider text-white/70 mb-4 uppercase">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="group inline-flex items-center gap-1 text-xs sm:text-sm text-white/50 hover:text-secondary transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight className="h-2.5 w-2.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* More */}
          <nav aria-label="More links">
            <h4 className="font-display text-[10px] sm:text-xs font-bold tracking-wider text-white/70 mb-4 uppercase">
              More
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.more.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="group inline-flex items-center gap-1 text-xs sm:text-sm text-white/50 hover:text-secondary transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight className="h-2.5 w-2.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal links">
            <h4 className="font-display text-[10px] sm:text-xs font-bold tracking-wider text-white/70 mb-4 uppercase">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="text-xs text-white/30 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Legacy note - subtle */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-[10px] text-white/25 italic">
            {nekoConfig.legacyNote}
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-[10px] sm:text-xs text-white/30">
              © {new Date().getFullYear()} NÈKO. All rights reserved.
            </p>
            <p className="text-[10px] sm:text-xs text-white/30">
              Hello, NÈKO.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

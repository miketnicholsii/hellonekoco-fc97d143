import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { nekoCopy } from "@/content/nekoCopy";

const footerLinks = {
  explore: [
    { href: "/sandbox", label: "The Sandbox" },
    { href: "/fields", label: "Fields" },
    { href: "/invite", label: "Work With Me" },
  ],
  more: [
    { href: "/about", label: "About" },
    { href: "/notes", label: "Notes" },
    { href: "/contact", label: "Say Hello" },
  ],
  legal: [
    { href: "/legal/privacy", label: "Privacy" },
    { href: "/legal/terms", label: "Terms" },
  ],
};

export const Footer = forwardRef<HTMLElement>((_, ref) => {
  const c = nekoCopy;

  return (
    <footer
      ref={ref}
      role="contentinfo"
      aria-label="Site footer"
      className="relative bg-tertiary text-tertiary-foreground overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-gradient-dark opacity-50 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative container mx-auto px-5 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link to="/" className="inline-block mb-4 group">
              <span className="font-display text-2xl font-bold tracking-tight text-primary-foreground transition-colors group-hover:text-primary">
                NÈKO<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs mb-2">
              {c.footer.line1}
            </p>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs mb-4">
              {c.footer.line2}
            </p>
            {/* Invite-only badge */}
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-medium tracking-wide bg-primary/10 text-primary border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {c.footer.micro}
            </span>
          </div>

          {/* Explore */}
          <nav aria-label="Explore links">
            <h4 className="font-display text-[10px] sm:text-xs font-bold tracking-wider text-primary-foreground/80 mb-4 uppercase">
              Explore
            </h4>
            <ul className="space-y-2.5" role="list">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="group inline-flex items-center gap-1 text-xs sm:text-sm text-primary-foreground/60 hover:text-primary transition-colors"
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
            <h4 className="font-display text-[10px] sm:text-xs font-bold tracking-wider text-primary-foreground/80 mb-4 uppercase">
              More
            </h4>
            <ul className="space-y-2.5" role="list">
              {footerLinks.more.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="group inline-flex items-center gap-1 text-xs sm:text-sm text-primary-foreground/60 hover:text-primary transition-colors"
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
            <h4 className="font-display text-[10px] sm:text-xs font-bold tracking-wider text-primary-foreground/80 mb-4 uppercase">
              Legal
            </h4>
            <ul className="space-y-2.5" role="list">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-xs text-primary-foreground/40 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-primary-foreground/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-[10px] sm:text-xs text-primary-foreground/40">
              © {new Date().getFullYear()} NÈKO. All rights reserved.
            </p>
            <p className="text-[10px] sm:text-xs text-primary-foreground/40">
              {c.brand.signature}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

import { useState, useEffect, useCallback, memo, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import { 
  NAV_LINKS, 
  useSectionScrollspy, 
  useScrollPosition, 
  scrollToSection 
} from "@/hooks/use-section-scrollspy";

// Simplified nav links for the new design (excluding Home and Say Hello which are shown differently)
const NAV_ITEMS = NAV_LINKS.filter(link => 
  link.href !== "/" && link.href !== "/contact"
);

export const EccentricNavbar = memo(function EccentricNavbar({
  position = "fixed",
}: {
  position?: "fixed" | "static";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  
  const isHome = location.pathname === "/";
  const activeSection = useSectionScrollspy({ enabled: isHome });
  // Much higher threshold so SAY HELLO stays white/visible longer on hero
  const isScrolled = useScrollPosition(200);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  const handleAnchorClick = useCallback((id: string) => {
    const targetHash = `#${id}`;
    if (location.pathname !== "/") {
      navigate({ pathname: "/", hash: targetHash });
    } else if (location.hash !== targetHash) {
      navigate({ hash: targetHash });
    } else {
      scrollToSection(id, "smooth");
    }
    closeMenu();
  }, [closeMenu, location.hash, location.pathname, navigate]);

  // Determine if we should show light or dark text based on page and scroll
  const isHeroPage = location.pathname === "/";
  const showDarkText = !isHeroPage || isScrolled;

  // Nav height changes on scroll - more compact on mobile
  const navHeight = isScrolled ? "h-14" : "h-16 sm:h-18 lg:h-[72px]";
  const pillFocusClass = showDarkText
    ? "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    : "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";
  const mobileLinkFocusClass =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  return (
    <>
      <nav
        className={`${position === "fixed" ? "fixed top-0 left-0 right-0" : "relative"} z-50 transition-all duration-300 safe-area-top`}
        aria-label="Main navigation"
        role="navigation"
      >
        {/* Nav background - subtle on scroll with animated shadow and tint */}
        <motion.div 
          className="absolute inset-0 border-b transition-colors duration-300"
          initial={false}
          animate={{
            backgroundColor: isScrolled 
              ? "rgba(250, 248, 246, 0.92)" 
              : !isHeroPage 
                ? "rgba(255, 255, 255, 0.9)" 
                : "transparent",
            borderColor: isScrolled || !isHeroPage 
              ? "rgba(51, 67, 54, 0.08)" 
              : "transparent",
            boxShadow: isScrolled 
              ? "0 4px 20px -4px rgba(51, 67, 54, 0.12)" 
              : "0 0px 0px 0px rgba(0, 0, 0, 0)",
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ 
            backdropFilter: isScrolled || !isHeroPage ? "blur(16px)" : "blur(0px)",
          }}
          aria-hidden="true" 
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className={`flex items-center justify-between ${navHeight} transition-all duration-300`}>
            
            {/* Left: Logo - More prominent */}
            <Link 
              to="/" 
              className="flex items-center relative z-10 group" 
              title="NÈKO - pronounced 'nay-ko'"
            >
              <span className={`font-display text-2xl sm:text-2xl lg:text-3xl font-black tracking-tight transition-all duration-300 ${
                showDarkText ? "text-primary" : "text-white drop-shadow-lg"
              }`}>
                NÈKO<span className="text-secondary group-hover:animate-pulse text-3xl sm:text-3xl lg:text-4xl">.</span>
              </span>
            </Link>

            {/* Center: Pill-shaped nav capsule (Desktop only) */}
            <div className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2 w-full max-w-[560px] px-6">
              <motion.div
                layout
                className="flex h-11 items-center gap-1 rounded-full px-2 transition-all duration-300"
                style={{ 
                  background: showDarkText 
                    ? "rgba(51, 67, 54, 0.08)" 
                    : "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(12px)",
                  border: showDarkText 
                    ? "1px solid rgba(51, 67, 54, 0.1)" 
                    : "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                {/* Home link */}
                <Link
                  to="/"
                  aria-current={location.pathname === "/" ? "page" : undefined}
                  className={`relative flex h-9 items-center justify-center rounded-full px-4 text-sm font-medium leading-none whitespace-nowrap transition-all duration-200 ${pillFocusClass} ${
                    location.pathname === "/" 
                      ? showDarkText 
                        ? "text-white bg-primary" 
                        : "text-primary bg-white"
                      : showDarkText 
                        ? "text-primary/70 hover:text-primary hover:bg-primary/5" 
                        : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Home
                </Link>

                {/* Separator */}
                <div className={`w-px h-5 ${showDarkText ? "bg-primary/10" : "bg-white/20"}`} />

                {/* Other nav links */}
                {NAV_ITEMS.map((link) => {
                  const isActive = location.pathname === link.href;
                  
                    return (
                      <Link
                        key={link.href}
                        to={link.href}
                        aria-current={isActive ? "page" : undefined}
                        className={`relative flex h-9 items-center justify-center rounded-full px-4 text-sm font-medium leading-none whitespace-nowrap transition-all duration-200 ${pillFocusClass} ${
                          isActive
                            ? showDarkText 
                              ? "text-white bg-primary" 
                              : "text-primary bg-white"
                          : showDarkText 
                            ? "text-primary/70 hover:text-primary hover:bg-primary/5" 
                            : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </motion.div>
            </div>

            {/* Right: SAY HELLO CTA (Desktop) */}
            <div className="hidden lg:flex items-center gap-3 relative z-10">
              <Button
                asChild
                size="sm"
                className="rounded-full px-5 py-2.5 font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 border-0"
                style={{ 
                  background: "linear-gradient(135deg, #E5530A 0%, #C74A09 100%)",
                  boxShadow: "0 4px 14px rgba(229, 83, 10, 0.35), inset 0 1px 0 rgba(255,255,255,0.15)"
                }}
              >
                <Link to="/contact" className="flex items-center gap-2 text-white">
                  SAY HELLO
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </div>

            {/* Mobile: Menu button + SAY HELLO - Better positioning */}
            <div className="flex lg:hidden items-center gap-2">
              <Button
                asChild
                size="sm"
                className="rounded-full px-4 py-2 font-semibold text-xs shadow-lg border-0 min-h-[40px] active:scale-95 active:opacity-90 transition-transform"
                style={{ 
                  background: "linear-gradient(135deg, #E5530A 0%, #C74A09 100%)",
                  boxShadow: "0 4px 14px rgba(229, 83, 10, 0.35)"
                }}
              >
                <Link to="/contact" className="flex items-center gap-1.5 text-white">
                  <span className="hidden xs:inline">SAY HELLO</span>
                  <span className="xs:hidden">HELLO</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </Button>
              
              <button
                ref={menuButtonRef}
                type="button"
                className={`p-2.5 rounded-xl relative z-10 min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-90 active:opacity-70 transition-transform ${
                  showDarkText 
                    ? "text-foreground hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring" 
                    : "text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/50"
                }`}
                onClick={toggleMenu}
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay - z-index must be HIGHER than nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.2 }} 
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <motion.div 
              className="absolute inset-0 bg-background/95" 
              onClick={closeMenu}
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(16px)" }}
              exit={{ backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            <motion.div
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
              className="absolute right-0 top-0 h-full w-full max-w-xs bg-card border-l border-border shadow-xl"
              aria-label="Mobile navigation"
            >
              {/* Close button at top of panel */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <span className="text-sm font-medium text-muted-foreground">Menu</span>
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="p-2.5 rounded-xl bg-muted/50 hover:bg-muted text-foreground min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-90 transition-transform focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex flex-col h-full pt-2 pb-8 px-6">
                <nav className="flex-1 space-y-2" aria-label="Primary">
                  {NAV_LINKS.map((link, index) => {
                    const isActive = location.pathname === link.href;

                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: 0.1 + index * 0.05,
                          duration: 0.3,
                          ease: "easeOut"
                        }}
                      >
                        <Link 
                          to={link.href} 
                          onClick={closeMenu}
                          aria-current={isActive ? "page" : undefined}
                          className={`flex items-center px-5 py-4 rounded-xl text-lg font-medium transition-all duration-200 min-h-[52px] active:scale-[0.98] active:bg-muted/50 ${mobileLinkFocusClass} ${
                            isActive 
                              ? "text-secondary bg-secondary/10 border border-secondary/20" 
                              : "text-foreground hover:bg-muted hover:pl-6"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
                
                <motion.div 
                  className="space-y-4 pt-8 border-t border-border"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <Button 
                    asChild
                    size="lg" 
                    className="w-full rounded-full font-semibold border-0 min-h-[56px] text-base active:scale-95 active:opacity-90 transition-transform"
                    style={{ 
                      background: "linear-gradient(135deg, #E5530A 0%, #C74A09 100%)",
                      boxShadow: "0 4px 14px rgba(229, 83, 10, 0.35)"
                    }}
                  >
                    <Link to="/contact" onClick={closeMenu} className="flex items-center justify-center gap-2 text-white">
                      SAY HELLO
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                  <p className="text-center text-xs text-muted-foreground pt-2">
                    Invite-only. By alignment.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

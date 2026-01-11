import { memo, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: "hero", label: "Welcome" },
  { id: "starting-points", label: "Sound Familiar?" },
  { id: "how-we-help", label: "How We Help" },
  { id: "services", label: "What We Offer" },
  { id: "paths", label: "Choose Your Path" },
  { id: "pricing", label: "Plans" },
  { id: "experience", label: "The Experience" },
  { id: "demos", label: "See It In Action" },
  { id: "cta", label: "Get Started" },
];

/**
 * Desktop: Vertical dot indicator on the right side
 */
export const SectionIndicator = memo(function SectionIndicator() {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const viewportHeight = window.innerHeight;

          // Show indicator after scrolling past 20% of viewport
          setIsVisible(scrollY > viewportHeight * 0.2);

          // Find which section is currently in view
          const sectionElements = sections.map(s => document.getElementById(s.id));
          
          let currentIndex = 0;
          for (let i = 0; i < sectionElements.length; i++) {
            const el = sectionElements[i];
            if (el) {
              const rect = el.getBoundingClientRect();
              // Section is "active" when its top is within the top 40% of the viewport
              if (rect.top <= viewportHeight * 0.4) {
                currentIndex = i;
              }
            }
          }
          
          setActiveSection(currentIndex);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });
    }
  }, [prefersReducedMotion]);

  if (!isVisible) return null;

  return (
    <motion.nav
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-end gap-2"
      aria-label="Page sections"
    >
      {sections.map((section, index) => {
        const isActive = index === activeSection;
        const isPast = index < activeSection;

        return (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full"
            aria-label={`Go to ${section.label}`}
            aria-current={isActive ? "true" : undefined}
          >
            {/* Label - shows on hover */}
            <span
              className={cn(
                "text-xs font-medium transition-all duration-200 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 translate-x-2 group-hover:translate-x-0 group-focus-visible:translate-x-0",
                isActive 
                  ? "text-foreground" 
                  : isPast 
                    ? "text-muted-foreground" 
                    : "text-muted-foreground/60"
              )}
            >
              {section.label}
            </span>

            {/* Indicator dot */}
            <span
              className={cn(
                "relative flex items-center justify-center transition-all duration-300",
                isActive ? "w-3 h-3" : "w-2 h-2"
              )}
            >
              <span
                className={cn(
                  "absolute inset-0 rounded-full transition-all duration-300",
                  isActive
                    ? "bg-primary scale-100"
                    : isPast
                      ? "bg-primary/40 scale-100"
                      : "bg-muted-foreground/30 scale-100 group-hover:bg-muted-foreground/50"
                )}
              />
              {isActive && !prefersReducedMotion && (
                <motion.span
                  layoutId="active-indicator"
                  className="absolute inset-0 rounded-full bg-primary/30"
                  initial={false}
                  animate={{ scale: [1, 1.8, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </span>
          </button>
        );
      })}

      {/* Progress line */}
      <div className="absolute right-[5px] top-0 bottom-0 w-px bg-border -z-10">
        <motion.div
          className="absolute top-0 left-0 w-full bg-primary origin-top"
          style={{ 
            height: `${((activeSection + 1) / sections.length) * 100}%`,
          }}
          initial={false}
          animate={{ height: `${((activeSection + 1) / sections.length) * 100}%` }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.nav>
  );
});

/**
 * Mobile: Horizontal progress bar at the bottom with section indicators (no swipe gestures)
 */
export const MobileProgressBar = memo(function MobileProgressBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  
  // Smooth spring animation for the progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const viewportHeight = window.innerHeight;

          // Show after scrolling past hero
          setIsVisible(scrollY > viewportHeight * 0.5);

          // Track active section and calculate progress within section
          const sectionElements = sections.map(s => document.getElementById(s.id));
          let currentIndex = 0;
          let progress = 0;
          
          for (let i = 0; i < sectionElements.length; i++) {
            const el = sectionElements[i];
            const nextEl = sectionElements[i + 1];
            
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= viewportHeight * 0.4) {
                currentIndex = i;
                
                // Calculate progress within current section
                if (nextEl) {
                  const nextRect = nextEl.getBoundingClientRect();
                  const sectionHeight = nextRect.top - rect.top;
                  const scrolledInSection = viewportHeight * 0.4 - rect.top;
                  progress = Math.min(1, Math.max(0, scrolledInSection / sectionHeight));
                } else {
                  // Last section - calculate based on remaining scroll
                  const docHeight = document.documentElement.scrollHeight;
                  const remaining = docHeight - (scrollY + viewportHeight);
                  progress = remaining < 100 ? 1 : Math.min(0.8, (viewportHeight * 0.4 - rect.top) / viewportHeight);
                }
              }
            }
          }
          
          setActiveSection(currentIndex);
          setSectionProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Haptic feedback helper - triggers vibration on supported devices
  const triggerHaptic = useCallback((pattern: number | number[] = 10) => {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // Silently fail if vibration is not supported or blocked
      }
    }
  }, []);

  const scrollToSection = useCallback((sectionIndex: number) => {
    if (sectionIndex < 0 || sectionIndex >= sections.length) return;
    
    // Trigger haptic feedback
    triggerHaptic(15);
    
    const element = document.getElementById(sections[sectionIndex].id);
    if (element) {
      element.scrollIntoView({ 
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });
    }
  }, [prefersReducedMotion, triggerHaptic]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-background/95 backdrop-blur-lg border-t border-border safe-area-bottom"
    >
      {/* Section dot indicators */}
      <div className="flex items-center justify-center gap-1.5 pt-2.5 pb-1">
        {sections.map((section, index) => {
          const isActive = index === activeSection;
          const isPast = index < activeSection;
          
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(index)}
              className="group relative p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-full"
              aria-label={`Go to ${section.label}`}
              aria-current={isActive ? "true" : undefined}
            >
              {/* Outer container for the dot */}
              <span
                className={cn(
                  "relative flex items-center justify-center transition-all duration-300",
                  isActive ? "w-6 h-2" : "w-2 h-2"
                )}
              >
                {/* Background dot/pill */}
                <span
                  className={cn(
                    "absolute inset-0 rounded-full transition-all duration-300",
                    isActive
                      ? "bg-primary/20"
                      : isPast
                        ? "bg-primary/60"
                        : "bg-muted-foreground/30"
                  )}
                />
                
                {/* Progress fill for active section */}
                {isActive && (
                  <motion.span
                    className="absolute inset-y-0 left-0 bg-primary rounded-full"
                    initial={false}
                    animate={{ 
                      width: prefersReducedMotion ? "100%" : `${Math.max(20, sectionProgress * 100)}%`
                    }}
                    transition={{ 
                      duration: 0.15, 
                      ease: "easeOut" 
                    }}
                  />
                )}
              </span>
              
              {/* Tooltip on tap/hold */}
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-[10px] font-medium bg-foreground text-background rounded-md whitespace-nowrap shadow-lg"
                  >
                    {section.label}
                    {/* Tooltip arrow */}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
      
      {/* Current section label */}
      <div className="pb-2 text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={activeSection}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="text-[10px] font-medium text-muted-foreground"
          >
            {sections[activeSection]?.label}
          </motion.p>
        </AnimatePresence>
      </div>
      
      {/* Overall progress bar - uses spring animation for smoothness */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[2px] bg-primary origin-left"
        style={{ scaleX }}
      />
    </motion.div>
  );
});

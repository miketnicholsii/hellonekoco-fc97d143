import { memo, useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { HOMEPAGE_SECTIONS } from "@/hooks/use-section-scrollspy";

/**
 * Desktop: Enhanced vertical progress indicator on the right side with glow effects
 */
export const SectionIndicator = memo(function SectionIndicator() {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [sectionProgress, setSectionProgress] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const sectionIds = useMemo(() => HOMEPAGE_SECTIONS.map((section) => section.id), []);
  const entriesRef = useRef<Map<string, IntersectionObserverEntry>>(new Map());
  const positionsRef = useRef<{ top: number; height: number }[]>([]);
  
  const { scrollY } = useScroll();

  // Update section positions for progress calculation
  const updatePositions = useCallback(() => {
    positionsRef.current = sectionIds.map((id) => {
      const element = document.getElementById(id);
      if (!element) return { top: 0, height: 0 };
      const rect = element.getBoundingClientRect();
      return { top: rect.top + window.scrollY, height: rect.height };
    });
  }, [sectionIds]);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      {
        rootMargin: "-20% 0px 0px 0px",
        threshold: 0.2,
      }
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    entriesRef.current.clear();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entriesRef.current.set(entry.target.id, entry);
        });

        const visible = Array.from(entriesRef.current.values()).filter(
          (entry) => entry.isIntersecting
        );

        if (!visible.length) return;

        visible.sort(
          (a, b) =>
            b.intersectionRatio - a.intersectionRatio ||
            a.boundingClientRect.top - b.boundingClientRect.top
        );

        const activeId = visible[0]?.target.id;
        if (!activeId) return;

        const index = sectionIds.indexOf(activeId);
        if (index >= 0) {
          setActiveSection(index);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sectionIds]);

  // Handle resize for position updates
  useEffect(() => {
    const handleResize = () => updatePositions();
    updatePositions();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [updatePositions]);

  // Track scroll progress within current section
  useMotionValueEvent(scrollY, "change", (latest) => {
    const positions = positionsRef.current;
    const current = positions[activeSection];
    if (!current) return;

    const next = positions[activeSection + 1];
    const viewportHeight = window.innerHeight;
    const pivot = latest + viewportHeight * 0.4;

    let progress = 0;
    if (next) {
      const sectionHeight = Math.max(1, next.top - current.top);
      progress = (pivot - current.top) / sectionHeight;
    } else {
      const docHeight = document.documentElement.scrollHeight;
      const remaining = docHeight - (latest + viewportHeight);
      progress =
        remaining < 120
          ? 1
          : (pivot - current.top) / Math.max(current.height || viewportHeight, 1);
    }

    setSectionProgress(Math.min(1, Math.max(0, progress)));
  });

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

  const totalProgress = (activeSection + sectionProgress) / HOMEPAGE_SECTIONS.length;

  return (
    <motion.nav
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 30 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-1"
      aria-label="Page sections"
    >
      {/* Background track with glow */}
      <div className="absolute right-[7px] top-0 bottom-0 w-[2px] rounded-full bg-white/10 backdrop-blur-sm">
        {/* Animated glow behind progress */}
        <motion.div
          className="absolute -inset-1 rounded-full blur-sm"
          style={{ 
            background: "linear-gradient(180deg, transparent, hsl(16 100% 50% / 0.3), transparent)",
            height: `${totalProgress * 100}%`,
          }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Progress fill */}
        <motion.div
          className="absolute top-0 left-0 w-full rounded-full origin-top"
          style={{ 
            background: "linear-gradient(180deg, hsl(16 100% 55%), hsl(16 100% 45%))",
            height: `${totalProgress * 100}%`,
          }}
          initial={false}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {HOMEPAGE_SECTIONS.map((section, index) => {
        const isActive = index === activeSection;
        const isPast = index < activeSection;
        const isHovered = hoveredIndex === index;

        return (
          <motion.button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="group relative flex items-center gap-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full"
            aria-label={`Go to ${section.label}`}
            aria-current={isActive ? "true" : undefined}
            initial={false}
            animate={{ scale: isActive ? 1 : 0.95 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {/* Label - shows on hover with slide animation */}
            <AnimatePresence mode="wait">
              {(isHovered || isActive) && (
                <motion.span
                  initial={{ opacity: 0, x: 10, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 5, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={cn(
                    "text-xs font-semibold tracking-wide whitespace-nowrap px-3 py-1.5 rounded-full backdrop-blur-md",
                    isActive 
                      ? "bg-primary/20 text-white border border-primary/30" 
                      : "bg-white/10 text-white/80 border border-white/10"
                  )}
                >
                  {section.label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Indicator dot container */}
            <span className="relative flex items-center justify-center w-4 h-4">
              {/* Outer glow ring for active */}
              {isActive && !prefersReducedMotion && (
                <motion.span
                  className="absolute inset-[-4px] rounded-full"
                  style={{ 
                    background: "radial-gradient(circle, hsl(16 100% 50% / 0.3) 0%, transparent 70%)"
                  }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.2, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              
              {/* Secondary pulse ring */}
              {isActive && !prefersReducedMotion && (
                <motion.span
                  className="absolute inset-[-2px] rounded-full border border-primary/40"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                />
              )}

              {/* Main dot */}
              <motion.span
                className={cn(
                  "relative rounded-full transition-colors duration-300",
                  isActive
                    ? "w-3 h-3 bg-primary shadow-lg"
                    : isPast
                      ? "w-2.5 h-2.5 bg-primary/60"
                      : "w-2 h-2 bg-white/30 group-hover:bg-white/50"
                )}
                style={isActive ? { 
                  boxShadow: "0 0 12px hsl(16 100% 50% / 0.6), 0 0 24px hsl(16 100% 50% / 0.3)"
                } : undefined}
                animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                transition={{ duration: 0.8, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
              />

              {/* Inner progress indicator for active section */}
              {isActive && (
                <motion.span
                  className="absolute inset-0.5 rounded-full overflow-hidden"
                  style={{ 
                    background: `conic-gradient(from 0deg, hsl(16 100% 60%) ${sectionProgress * 100}%, transparent ${sectionProgress * 100}%)`,
                    opacity: 0.6
                  }}
                />
              )}
            </span>
          </motion.button>
        );
      })}

      {/* Overall percentage indicator */}
      <motion.div
        className="mt-4 text-[10px] font-bold tracking-wider text-white/40 tabular-nums"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {Math.round(totalProgress * 100)}%
      </motion.div>
    </motion.nav>
  );
});

/**
 * Mobile: Enhanced horizontal progress bar at the bottom with section indicators
 */
export const MobileProgressBar = memo(function MobileProgressBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);
  const { scrollY, scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const sectionIds = useMemo(() => HOMEPAGE_SECTIONS.map((section) => section.id), []);
  const positionsRef = useRef<{ top: number; height: number }[]>([]);
  const entriesRef = useRef<Map<string, IntersectionObserverEntry>>(new Map());
  
  // Smooth spring animation for the progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const updatePositions = useCallback(() => {
    positionsRef.current = sectionIds.map((id) => {
      const element = document.getElementById(id);
      if (!element) return { top: 0, height: 0 };
      const rect = element.getBoundingClientRect();
      return { top: rect.top + window.scrollY, height: rect.height };
    });
  }, [sectionIds]);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      {
        rootMargin: "-35% 0px 0px 0px",
        threshold: 0.2,
      }
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entriesRef.current.set(entry.target.id, entry);
        });

        const visible = Array.from(entriesRef.current.values()).filter(
          (entry) => entry.isIntersecting
        );

        if (!visible.length) return;

        visible.sort(
          (a, b) =>
            b.intersectionRatio - a.intersectionRatio ||
            a.boundingClientRect.top - b.boundingClientRect.top
        );

        const activeId = visible[0]?.target.id;
        if (!activeId) return;

        const index = sectionIds.indexOf(activeId);
        if (index >= 0) {
          setActiveSection(index);
        }
      },
      {
        rootMargin: "-40% 0px -45% 0px",
        threshold: [0.2, 0.4, 0.6, 0.8],
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    const handleResize = () => updatePositions();
    updatePositions();
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [updatePositions]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const positions = positionsRef.current;
    const current = positions[activeSection];
    if (!current) return;

    const next = positions[activeSection + 1];
    const viewportHeight = window.innerHeight;
    const pivot = latest + viewportHeight * 0.4;

    let progress = 0;
    if (next) {
      const sectionHeight = Math.max(1, next.top - current.top);
      progress = (pivot - current.top) / sectionHeight;
    } else {
      const docHeight = document.documentElement.scrollHeight;
      const remaining = docHeight - (latest + viewportHeight);
      progress =
        remaining < 120
          ? 1
          : (pivot - current.top) / Math.max(current.height || viewportHeight, 1);
    }

    setSectionProgress(Math.min(1, Math.max(0, progress)));
  });

  // Haptic feedback helper
  const triggerHaptic = useCallback((pattern: number | number[] = 10) => {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // Silently fail
      }
    }
  }, []);

  const scrollToSection = useCallback((sectionIndex: number) => {
    if (sectionIndex < 0 || sectionIndex >= HOMEPAGE_SECTIONS.length) return;
    
    triggerHaptic(15);
    
    const element = document.getElementById(HOMEPAGE_SECTIONS[sectionIndex].id);
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
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#1f2a21]/95 backdrop-blur-lg border-t border-white/10 safe-area-bottom"
    >
      {/* Section dot indicators */}
      <div className="flex items-center justify-center gap-2 pt-3 pb-1.5 px-4">
        {HOMEPAGE_SECTIONS.map((section, index) => {
          const isActive = index === activeSection;
          const isPast = index < activeSection;
          
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(index)}
              className="group relative p-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-full"
              aria-label={`Go to ${section.label}`}
              aria-current={isActive ? "true" : undefined}
            >
              {/* Outer glow for active */}
              {isActive && !prefersReducedMotion && (
                <motion.span
                  className="absolute inset-[-2px] rounded-full bg-primary/20"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              
              {/* Dot/pill container */}
              <span
                className={cn(
                  "relative flex items-center justify-center transition-all duration-300",
                  isActive ? "w-8 h-2.5" : "w-2.5 h-2.5"
                )}
              >
                {/* Background */}
                <span
                  className={cn(
                    "absolute inset-0 rounded-full transition-all duration-300",
                    isActive
                      ? "bg-white/10"
                      : isPast
                        ? "bg-primary/60"
                        : "bg-white/20"
                  )}
                />
                
                {/* Progress fill for active section */}
                {isActive && (
                  <motion.span
                    className="absolute inset-y-0 left-0 bg-primary rounded-full"
                    initial={false}
                    animate={{ 
                      width: prefersReducedMotion ? "100%" : `${Math.max(15, sectionProgress * 100)}%`
                    }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    style={{ 
                      boxShadow: "0 0 8px hsl(16 100% 50% / 0.5)"
                    }}
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Current section label */}
      <div className="pb-2 text-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={`section-label-${activeSection}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="text-[10px] font-semibold tracking-wider uppercase text-white/50"
          >
            {HOMEPAGE_SECTIONS[activeSection]?.label}
          </motion.p>
        </AnimatePresence>
      </div>
      
      {/* Overall progress bar with glow */}
      <div className="relative h-[3px] bg-white/5">
        <motion.div 
          className="absolute inset-y-0 left-0 origin-left"
          style={{ 
            scaleX,
            background: "linear-gradient(90deg, hsl(16 100% 50%), hsl(16 100% 55%))",
            boxShadow: "0 0 12px hsl(16 100% 50% / 0.5)"
          }}
        />
      </div>
    </motion.div>
  );
});
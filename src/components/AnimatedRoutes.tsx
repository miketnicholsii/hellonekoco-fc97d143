import { Suspense, memo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { LazyBoundary, lazyWithRetry } from "@/components/LazyBoundary";
import { PageTransition } from "@/components/PageTransition";

// Critical path - load immediately
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";

// Lazy load public routes
const Sandbox = lazyWithRetry(() => import("@/pages/Sandbox"));
const Fields = lazyWithRetry(() => import("@/pages/Fields"));
const Proof = lazyWithRetry(() => import("@/pages/Proof"));
const Contact = lazyWithRetry(() => import("@/pages/Contact"));
const Invite = lazyWithRetry(() => import("@/pages/Invite"));
const Notes = lazyWithRetry(() => import("@/pages/Notes"));
const Donate = lazyWithRetry(() => import("@/pages/Donate"));
const DonationSuccess = lazyWithRetry(() => import("@/pages/DonationSuccess"));
const MeetNeko = lazyWithRetry(() => import("@/pages/MeetNeko"));

// Legal pages
const Privacy = lazyWithRetry(() => import("@/pages/legal/Privacy"));
const Terms = lazyWithRetry(() => import("@/pages/legal/Terms"));

// Loading fallback with smooth animation
const PageLoader = memo(function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="space-y-4 w-full max-w-md px-8 animate-fade-in">
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
});

// Wrap each route element with page transition
const withTransition = (Component: React.ComponentType) => (
  <PageTransition>
    <Component />
  </PageTransition>
);

export const AnimatedRoutes = memo(function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <LazyBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          {/* Core pages - NÈKO Sandbox */}
          <Route path="/" element={withTransition(Index)} />
          <Route path="/sandbox" element={withTransition(Sandbox)} />
          <Route path="/fields" element={withTransition(Fields)} />
          <Route path="/proof" element={withTransition(Proof)} />
          <Route path="/invite" element={withTransition(Invite)} />
          <Route path="/contact" element={withTransition(Contact)} />
          <Route path="/notes" element={withTransition(Notes)} />
          <Route path="/donate" element={withTransition(Donate)} />
          <Route path="/donation-success" element={withTransition(DonationSuccess)} />
          <Route path="/meet" element={withTransition(MeetNeko)} />
          
          {/* Legal */}
          <Route path="/legal/privacy" element={withTransition(Privacy)} />
          <Route path="/legal/terms" element={withTransition(Terms)} />
          
          {/* Legacy redirects - all point to core pages */}
          <Route path="/services" element={<Navigate to="/fields" replace />} />
          <Route path="/pricing" element={<Navigate to="/invite" replace />} />
          <Route path="/get-started" element={<Navigate to="/contact" replace />} />
          <Route path="/personal-brand" element={<Navigate to="/sandbox" replace />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/signup" element={<Navigate to="/contact" replace />} />
          <Route path="/about" element={<Navigate to="/" replace />} />
          <Route path="/app/*" element={<Navigate to="/" replace />} />
          <Route path="/admin/*" element={<Navigate to="/" replace />} />
          
          {/* Fallback */}
          <Route path="*" element={withTransition(NotFound)} />
        </Routes>
      </Suspense>
    </LazyBoundary>
  );
});

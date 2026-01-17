import { Suspense, memo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { LazyBoundary, lazyWithRetry } from "@/components/LazyBoundary";

// Critical path - load immediately
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";

// Lazy load public routes
const Sandbox = lazyWithRetry(() => import("@/pages/Sandbox"));
const Fields = lazyWithRetry(() => import("@/pages/Fields"));
const Contact = lazyWithRetry(() => import("@/pages/Contact"));
const Invite = lazyWithRetry(() => import("@/pages/Invite"));
const Notes = lazyWithRetry(() => import("@/pages/Notes"));

// Legal pages
const Privacy = lazyWithRetry(() => import("@/pages/legal/Privacy"));
const Terms = lazyWithRetry(() => import("@/pages/legal/Terms"));

// Loading fallback
const PageLoader = memo(function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="space-y-4 w-full max-w-md px-8">
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
});

export const AnimatedRoutes = memo(function AnimatedRoutes() {
  return (
    <LazyBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Core pages - NÈKO Sandbox */}
          <Route path="/" element={<Index />} />
          <Route path="/sandbox" element={<Sandbox />} />
          <Route path="/fields" element={<Fields />} />
          <Route path="/invite" element={<Invite />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/notes" element={<Notes />} />
          
          {/* Legal */}
          <Route path="/legal/privacy" element={<Privacy />} />
          <Route path="/legal/terms" element={<Terms />} />
          
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </LazyBoundary>
  );
});

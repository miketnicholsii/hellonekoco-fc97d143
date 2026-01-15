import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
  /** Redirect to this path if not authenticated */
  redirectTo?: string;
  /** Require onboarding to be completed */
  requireOnboarding?: boolean;
  /** Require admin role */
  requireAdmin?: boolean;
}

/**
 * ProtectedRoute - Production-grade route guard
 * 
 * Features:
 * - Shows deterministic loading state (never returns null)
 * - Preserves intended destination for post-login redirect
 * - Handles onboarding flow
 * - Admin role enforcement
 * - Graceful recovery on refresh
 */
export function ProtectedRoute({
  children,
  redirectTo = "/login",
  requireOnboarding = true,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const { user, isLoading, profile, isAdmin } = useAuth();
  const location = useLocation();

  // Loading state - show deterministic loader
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
        <p className="text-muted-foreground text-sm" role="status" aria-live="polite">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  // Not authenticated - redirect to login with preserved location
  if (!user) {
    return (
      <Navigate
        to={redirectTo}
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  // Admin required but user is not admin
  if (requireAdmin && !isAdmin) {
    return (
      <Navigate
        to="/app"
        replace
        state={{ error: "admin_required" }}
      />
    );
  }

  // Onboarding check - profile may still be loading initially
  // Only redirect if we have profile data and onboarding is not complete
  if (
    requireOnboarding &&
    profile !== null &&
    !profile.onboarding_completed &&
    !location.pathname.includes("/onboarding")
  ) {
    return <Navigate to="/app/onboarding" replace />;
  }

  return <>{children}</>;
}

/**
 * PublicOnlyRoute - Redirects authenticated users away from auth pages
 * 
 * Used for login, signup, etc. to prevent authenticated users from seeing auth forms
 */
interface PublicOnlyRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export function PublicOnlyRoute({
  children,
  redirectTo = "/app",
}: PublicOnlyRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // While loading, show the page (prevents flash)
  if (isLoading) {
    return <>{children}</>;
  }

  // Already authenticated - redirect to app or intended destination
  if (user) {
    const from = (location.state as { from?: string })?.from || redirectTo;
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
}

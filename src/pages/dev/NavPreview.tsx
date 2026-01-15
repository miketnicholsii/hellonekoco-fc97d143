import { useMemo } from "react";
import type { User } from "@supabase/supabase-js";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { AuthContext, AuthContextType } from "@/contexts/auth-context";

const baseSubscription: AuthContextType["subscription"] = {
  tier: "free",
  subscribed: false,
  subscriptionEnd: null,
  cancelAtPeriodEnd: false,
};

const noopAsync = async () => {};

const baseAuthValue: AuthContextType = {
  user: null,
  session: null,
  isLoading: false,
  profile: null,
  subscription: baseSubscription,
  isAdmin: false,
  refreshSubscription: noopAsync,
  refreshProfile: noopAsync,
  signOut: noopAsync,
};

export default function NavPreview() {
  const mockUser = useMemo(
    () =>
      ({
        id: "dev-user",
        email: "loveable@example.com",
        aud: "authenticated",
        created_at: new Date().toISOString(),
        app_metadata: {},
        user_metadata: {},
        role: "authenticated",
      }) as User,
    [],
  );

  const signedInAuthValue = useMemo<AuthContextType>(
    () => ({
      ...baseAuthValue,
      user: mockUser,
    }),
    [mockUser],
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Navbar Preview (Dev Only)
          </h1>
          <p className="text-sm text-muted-foreground">
            Use this page to validate the desktop centering, mobile alignment,
            and auth-aware right-side content.
          </p>
        </div>

        <section className="rounded-2xl border border-border/60 bg-background/80 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border/60 bg-muted/40">
            <h2 className="text-sm font-semibold text-foreground">
              Signed out
            </h2>
          </div>
          <AuthContext.Provider value={baseAuthValue}>
            <EccentricNavbar position="static" />
          </AuthContext.Provider>
          <div className="px-6 py-8 text-sm text-muted-foreground">
            <p>Placeholder content to confirm navbar spacing.</p>
          </div>
        </section>

        <section className="rounded-2xl border border-border/60 bg-background/80 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border/60 bg-muted/40">
            <h2 className="text-sm font-semibold text-foreground">
              Signed in (mock user)
            </h2>
          </div>
          <AuthContext.Provider value={signedInAuthValue}>
            <EccentricNavbar position="static" />
          </AuthContext.Provider>
          <div className="px-6 py-8 text-sm text-muted-foreground">
            <p>Placeholder content to confirm navbar spacing.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

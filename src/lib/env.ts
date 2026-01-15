const REQUIRED_PUBLIC_VARS = ["VITE_SUPABASE_URL", "VITE_SUPABASE_PUBLISHABLE_KEY"] as const;

export type RequiredEnvVar = (typeof REQUIRED_PUBLIC_VARS)[number];

export const getMissingPublicEnv = (): RequiredEnvVar[] =>
  REQUIRED_PUBLIC_VARS.filter((key) => {
    const value = import.meta.env[key];
    return !value || value.trim().length === 0;
  });

export const hasSupabaseConfig = () => getMissingPublicEnv().length === 0;

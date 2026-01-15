import { getMissingPublicEnv } from "@/lib/env";

export function MissingConfigScreen() {
  const missing = getMissingPublicEnv();

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-6 py-12 text-foreground">
      <div className="max-w-xl space-y-4 rounded-lg border border-border bg-background p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Missing configuration</h1>
        <p className="text-sm text-muted-foreground">
          This app needs Supabase environment variables to run. Add the missing values to your
          <code className="mx-1 rounded bg-muted px-1 py-0.5">.env</code> file and restart the dev
          server.
        </p>
        <div className="rounded-md border border-dashed border-border bg-muted/40 p-3">
          <p className="text-sm font-medium">Missing variables</p>
          <ul className="mt-2 list-disc pl-6 text-sm">
            {missing.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-muted-foreground">
          Tip: ensure your Supabase project URL and publishable key are exposed as Vite public
          variables (prefixed with <strong>VITE_</strong>).
        </p>
      </div>
    </div>
  );
}

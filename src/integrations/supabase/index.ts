import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";
import { getMissingPublicEnv, hasSupabaseConfig } from "@/lib/env";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const REMEMBER_ME_KEY = "neko_remember_me";
const SESSION_ONLY_KEY = "neko_session_only";

type StorageMode = "local" | "session";

let supabaseClient: SupabaseClient<Database> | null = null;
let resolvedStorageMode: StorageMode | null = null;
let hasLoggedAuthDebug = false;

const getProjectRef = () => {
  try {
    return new URL(SUPABASE_URL).hostname.split(".")[0];
  } catch {
    return "";
  }
};

const clearSupabaseLocalStorage = () => {
  const projectRef = getProjectRef();
  if (!projectRef) return;

  const legacyKey = `sb-${projectRef}-auth-token`;
  const prefix = `sb-${projectRef}-auth-`;

  for (let index = localStorage.length - 1; index >= 0; index -= 1) {
    const key = localStorage.key(index);
    if (!key) continue;
    if (key === legacyKey || key.startsWith(prefix)) {
      localStorage.removeItem(key);
    }
  }
};

const readRememberMePreference = (): StorageMode => {
  if (sessionStorage.getItem(SESSION_ONLY_KEY) === "true") {
    return "session";
  }
  if (localStorage.getItem(REMEMBER_ME_KEY) === "true") {
    return "local";
  }
  return "local";
};

export const setRememberMePreference = (remember: boolean) => {
  if (remember) {
    localStorage.setItem(REMEMBER_ME_KEY, "true");
    sessionStorage.removeItem(SESSION_ONLY_KEY);
    if (!supabaseClient) {
      resolvedStorageMode = "local";
    }
  } else {
    localStorage.removeItem(REMEMBER_ME_KEY);
    sessionStorage.setItem(SESSION_ONLY_KEY, "true");
    clearSupabaseLocalStorage();
    if (!supabaseClient) {
      resolvedStorageMode = "session";
    }
  }
};

const resolveStorageMode = () => {
  if (resolvedStorageMode) return resolvedStorageMode;
  const nextMode = readRememberMePreference();
  resolvedStorageMode = nextMode;
  if (nextMode === "session") {
    clearSupabaseLocalStorage();
  }
  return nextMode;
};

const assertSupabaseConfig = () => {
  if (hasSupabaseConfig()) return;
  const missing = getMissingPublicEnv();
  throw new Error(`Missing Supabase configuration: ${missing.join(", ")}`);
};

const createSupabaseClient = () => {
  assertSupabaseConfig();
  const storageMode = resolveStorageMode();
  const storage = storageMode === "local" ? localStorage : sessionStorage;

  return createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage,
      persistSession: true,
      autoRefreshToken: true,
    },
  });
};

export const getSupabaseClient = () => {
  if (!supabaseClient) {
    supabaseClient = createSupabaseClient();
  }
  return supabaseClient;
};

export const getAuthStorageMode = () => resolvedStorageMode ?? readRememberMePreference();

export const logAuthEventOnce = (event: string) => {
  if (!import.meta.env.DEV || hasLoggedAuthDebug) return;
  hasLoggedAuthDebug = true;
  console.info(`[auth] event=${event} storage=${getAuthStorageMode()}`);
};

export const supabase = new Proxy({} as SupabaseClient<Database>, {
  get: (_target, prop) => {
    const client = getSupabaseClient();
    const value = client[prop as keyof SupabaseClient<Database>];
    return typeof value === "function" ? value.bind(client) : value;
  },
});

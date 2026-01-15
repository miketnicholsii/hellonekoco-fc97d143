import { useCallback, useState } from "react";
import { supabase } from "@/integrations/supabase";
import { useToast } from "@/hooks/use-toast";

interface AuthError {
  message: string;
  code?: string;
}

interface UseAuthResilientOptions {
  maxRetries?: number;
  retryDelay?: number;
}

/**
 * useAuthResilient - Production-grade auth operations with retry logic
 * 
 * Features:
 * - Automatic retry on network failures
 * - Exponential backoff
 * - User-friendly error messages
 * - Loading and error states
 */
export function useAuthResilient(options: UseAuthResilientOptions = {}) {
  const { maxRetries = 3, retryDelay = 1000 } = options;
  const { toast } = useToast();
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const withRetry = useCallback(
    async <T>(
      operation: () => Promise<{ data: T | null; error: AuthError | null }>,
      operationName: string
    ): Promise<{ data: T | null; error: AuthError | null }> => {
      let lastError: AuthError | null = null;

      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          setRetryCount(attempt);
          if (attempt > 0) {
            setIsRetrying(true);
          }

          const result = await operation();

          // If successful or non-retryable error, return immediately
          if (!result.error || !isRetryableError(result.error)) {
            setIsRetrying(false);
            setRetryCount(0);
            return result;
          }

          lastError = result.error;

          // Don't retry on last attempt
          if (attempt < maxRetries) {
            const delay = retryDelay * Math.pow(2, attempt);
            console.info(`[auth] Retrying ${operationName} in ${delay}ms (attempt ${attempt + 1}/${maxRetries})`);
            await sleep(delay);
          }
        } catch (err) {
          lastError = {
            message: err instanceof Error ? err.message : "Unknown error occurred",
          };

          if (attempt < maxRetries) {
            const delay = retryDelay * Math.pow(2, attempt);
            await sleep(delay);
          }
        }
      }

      setIsRetrying(false);
      setRetryCount(0);
      return { data: null, error: lastError };
    },
    [maxRetries, retryDelay]
  );

  const signInWithPassword = useCallback(
    async (email: string, password: string) => {
      return withRetry(
        () => supabase.auth.signInWithPassword({ email, password }),
        "signInWithPassword"
      );
    },
    [withRetry]
  );

  const signUp = useCallback(
    async (
      email: string,
      password: string,
      metadata?: { full_name?: string; business_name?: string }
    ) => {
      return withRetry(
        () =>
          supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: `${window.location.origin}/app`,
              data: metadata,
            },
          }),
        "signUp"
      );
    },
    [withRetry]
  );

  const resetPasswordForEmail = useCallback(
    async (email: string) => {
      return withRetry(
        () =>
          supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
          }),
        "resetPasswordForEmail"
      );
    },
    [withRetry]
  );

  const updatePassword = useCallback(
    async (newPassword: string) => {
      return withRetry(
        () => supabase.auth.updateUser({ password: newPassword }),
        "updatePassword"
      );
    },
    [withRetry]
  );

  const showRetryableError = useCallback(
    (error: AuthError, context: string) => {
      const friendlyMessage = getFriendlyErrorMessage(error, context);
      toast({
        title: friendlyMessage.title,
        description: friendlyMessage.description,
        variant: "destructive",
      });
    },
    [toast]
  );

  return {
    signInWithPassword,
    signUp,
    resetPasswordForEmail,
    updatePassword,
    showRetryableError,
    isRetrying,
    retryCount,
  };
}

function isRetryableError(error: AuthError): boolean {
  const message = error.message.toLowerCase();
  return (
    message.includes("network") ||
    message.includes("fetch") ||
    message.includes("timeout") ||
    message.includes("connection") ||
    message.includes("failed to fetch") ||
    message.includes("503") ||
    message.includes("502") ||
    message.includes("504")
  );
}

function getFriendlyErrorMessage(
  error: AuthError,
  context: string
): { title: string; description: string } {
  const message = error.message.toLowerCase();

  // Network errors
  if (isRetryableError(error)) {
    return {
      title: "Connection issue",
      description: "Please check your internet connection and try again.",
    };
  }

  // Auth-specific errors
  if (message.includes("invalid login credentials") || message.includes("invalid credentials")) {
    return {
      title: "Those credentials didn't match",
      description: "Double-check your email and password, then try again.",
    };
  }

  if (message.includes("email not confirmed")) {
    return {
      title: "Please confirm your email first",
      description: "Check your inbox for a confirmation link from us.",
    };
  }

  if (message.includes("already registered") || message.includes("already exists")) {
    return {
      title: "You already have an account",
      description: "Try signing in instead, or reset your password if you've forgotten it.",
    };
  }

  if (message.includes("password") && message.includes("weak")) {
    return {
      title: "Let's strengthen that password",
      description: "Try adding numbers, special characters, or making it longer.",
    };
  }

  if (message.includes("too many requests") || message.includes("rate limit")) {
    return {
      title: "Let's slow down a moment",
      description: "Too many attempts. Please wait a minute before trying again.",
    };
  }

  // Generic fallback
  return {
    title: `${context} failed`,
    description: error.message || "Something went wrong. Please try again.",
  };
}

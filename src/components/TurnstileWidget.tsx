import { useEffect, useRef, forwardRef, useImperativeHandle, useCallback } from "react";

// Turnstile site key - this is a publishable key, safe to include in client code
// You'll need to replace this with your actual site key from Cloudflare dashboard
const TURNSTILE_SITE_KEY = "0x4AAAAAAA0123456789ABCD"; // Replace with your site key

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
}

export interface TurnstileWidgetRef {
  reset: () => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: {
        sitekey: string;
        callback: (token: string) => void;
        "expired-callback"?: () => void;
        "error-callback"?: () => void;
        theme?: "light" | "dark" | "auto";
        size?: "normal" | "compact";
      }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

export const TurnstileWidget = forwardRef<TurnstileWidgetRef, TurnstileWidgetProps>(
  ({ onVerify, onExpire, onError }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const isRenderedRef = useRef(false);

    const renderWidget = useCallback(() => {
      if (!containerRef.current || !window.turnstile || isRenderedRef.current) return;

      // Clear any existing widget
      if (widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (e) {
          // Ignore removal errors
        }
      }

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: onVerify,
        "expired-callback": onExpire,
        "error-callback": onError,
        theme: "auto",
        size: "normal",
      });
      isRenderedRef.current = true;
    }, [onVerify, onExpire, onError]);

    useImperativeHandle(ref, () => ({
      reset: () => {
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current);
        }
      },
    }));

    useEffect(() => {
      // Check if script is already loaded
      if (window.turnstile) {
        renderWidget();
        return;
      }

      // Load the Turnstile script
      const existingScript = document.querySelector('script[src*="turnstile"]');
      if (existingScript) {
        // Script exists but turnstile not ready yet, wait for it
        window.onTurnstileLoad = renderWidget;
        return;
      }

      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad";
      script.async = true;
      script.defer = true;

      window.onTurnstileLoad = renderWidget;

      document.head.appendChild(script);

      return () => {
        isRenderedRef.current = false;
        if (widgetIdRef.current && window.turnstile) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch (e) {
            // Ignore removal errors
          }
        }
      };
    }, [renderWidget]);

    return (
      <div 
        ref={containerRef} 
        className="flex justify-center min-h-[65px]"
        aria-label="Security verification"
      />
    );
  }
);

TurnstileWidget.displayName = "TurnstileWidget";

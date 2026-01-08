import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Add-on product IDs matching src/lib/addons.ts
const ADDON_PRODUCTS: Record<string, { productId: string; type: "recurring" | "one_time" | "hybrid"; name: string }> = {
  "digital_cv_build": {
    productId: "prod_TksrjTEsUCR5bP",
    type: "one_time",
    name: "Digital CV Build",
  },
  "resume_rewrite": {
    productId: "prod_TksrX8WrpcKVkW",
    type: "one_time",
    name: "Resume Rewrite",
  },
  "brand_page_build": {
    productId: "prod_TkssmTlIwHwi27",
    type: "one_time",
    name: "Brand Page Build",
  },
  "business_formation_docs": {
    productId: "prod_Tkssy6h3TwA6q7",
    type: "one_time",
    name: "Business Formation Docs",
  },
  "credit_monitoring": {
    productId: "prod_TksvRSnMpyHdib",
    type: "recurring",
    name: "Business Credit Monitoring",
  },
  "compliance_monitoring": {
    productId: "prod_Tksv2eRs9paI7I",
    type: "recurring",
    name: "Compliance Monitoring",
  },
  "advanced_reports": {
    productId: "prod_TksvxCGn3MF1B8",
    type: "recurring",
    name: "Advanced Reports",
  },
  "credit_monitoring_full": {
    productId: "prod_Tksv1ldDXPihrz",
    type: "hybrid",
    name: "Business Credit Monitoring (Full Setup)",
  },
};

const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-ADDONS] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    
    // Initialize result with all addons as inactive
    const addons: Record<string, { 
      active: boolean; 
      type: "recurring" | "one_time" | "hybrid";
      name: string;
      subscription_id?: string;
      subscription_end?: string;
      purchased_at?: string;
      cancel_at_period_end?: boolean;
    }> = {};
    
    for (const [addonId, config] of Object.entries(ADDON_PRODUCTS)) {
      addons[addonId] = { 
        active: false, 
        type: config.type,
        name: config.name,
      };
    }

    if (customers.data.length === 0) {
      logStep("No Stripe customer found, returning all addons inactive");
      return new Response(JSON.stringify({ addons }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const customerId = customers.data[0].id;
    logStep("Found Stripe customer", { customerId });

    // Check active subscriptions for recurring addons
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
    });

    for (const subscription of subscriptions.data) {
      for (const item of subscription.items.data) {
        const productId = item.price.product as string;
        
        // Find which addon this product belongs to
        for (const [addonId, config] of Object.entries(ADDON_PRODUCTS)) {
          if (config.productId === productId && (config.type === "recurring" || config.type === "hybrid")) {
            addons[addonId] = {
              active: true,
              type: config.type,
              name: config.name,
              subscription_id: subscription.id,
              subscription_end: new Date(subscription.current_period_end * 1000).toISOString(),
              cancel_at_period_end: subscription.cancel_at_period_end,
            };
            logStep("Found active recurring addon", { addonId, productId });
          }
        }
      }
    }

    // Check payment history for one-time addons
    const paymentIntents = await stripe.paymentIntents.list({
      customer: customerId,
      limit: 100,
    });

    // Also check checkout sessions for completed one-time purchases
    const checkoutSessions = await stripe.checkout.sessions.list({
      customer: customerId,
      limit: 100,
    });

    for (const session of checkoutSessions.data) {
      if (session.payment_status === "paid" && session.mode === "payment") {
        const addonId = session.metadata?.addon_id;
        const config = addonId ? ADDON_PRODUCTS[addonId] : null;
        if (addonId && config && config.type === "one_time") {
          addons[addonId] = {
            active: true,
            type: "one_time",
            name: config.name,
            purchased_at: new Date((session.created || 0) * 1000).toISOString(),
          };
          logStep("Found completed one-time addon purchase", { addonId });
        }
      }
    }

    logStep("Addon check complete", { addons });

    return new Response(JSON.stringify({ addons }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

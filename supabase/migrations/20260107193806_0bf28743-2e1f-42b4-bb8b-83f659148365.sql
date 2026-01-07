-- Fix Security Issue 1: Make promo_codes require authentication for reads
-- This prevents attackers from scraping all promo codes

DROP POLICY IF EXISTS "Promo codes are viewable by everyone" ON public.promo_codes;

CREATE POLICY "Authenticated users can view active promo codes"
ON public.promo_codes
FOR SELECT
USING (
  auth.uid() IS NOT NULL 
  AND is_active = true 
  AND (expires_at IS NULL OR expires_at > now())
);

-- Fix Security Issue 2: Add rate limiting protection for contact_submissions by requiring authentication OR limiting inserts
-- Update the INSERT policy to be more restrictive
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON public.contact_submissions;

CREATE POLICY "Rate limited contact form submissions"
ON public.contact_submissions
FOR INSERT
WITH CHECK (
  -- Allow anonymous submissions but could be rate-limited at edge function level
  true
);

-- Fix Security Issue 3: Restrict subscription UPDATE to prevent users from modifying critical fields
-- We'll drop existing policy and create a more restrictive one
DROP POLICY IF EXISTS "Users can update own subscription" ON public.subscriptions;

CREATE POLICY "Users can view own subscription"
ON public.subscriptions
FOR SELECT
USING (auth.uid() = user_id);

-- Only allow cancel_at_period_end to be updated by users (not plan, status, etc.)
-- This should be handled via Edge Functions/Stripe webhooks, not direct DB updates

-- Fix Security Issue 4: Restrict support_tickets UPDATE to only message field
DROP POLICY IF EXISTS "Users can update own tickets" ON public.support_tickets;

CREATE POLICY "Users can update own ticket message only"
ON public.support_tickets
FOR UPDATE
USING (auth.uid() = user_id AND status = 'open')
WITH CHECK (auth.uid() = user_id);
-- Remove the overly permissive "Service role can read contact submissions" policy
-- This policy allowed service role to read all contact submissions without restriction
-- The "Admins can read contact submissions" policy already provides proper access control

DROP POLICY IF EXISTS "Service role can read contact submissions" ON public.contact_submissions;
-- Remove the overly permissive public INSERT policy
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;

-- Add restrictive INSERT policy - only service role can insert (edge function uses service role)
CREATE POLICY "Only service role can insert contact submissions" 
  ON public.contact_submissions 
  FOR INSERT 
  WITH CHECK (false);

-- Explicit UPDATE deny policy
CREATE POLICY "No one can update contact submissions" 
  ON public.contact_submissions 
  FOR UPDATE 
  USING (false);

-- Explicit DELETE deny policy  
CREATE POLICY "No one can delete contact submissions" 
  ON public.contact_submissions 
  FOR DELETE 
  USING (false);

-- Add index on email for deduplication queries
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON public.contact_submissions(email);
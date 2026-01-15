-- Create bookmarks table for saving favorite resources
CREATE TABLE public.resource_bookmarks (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  resource_id uuid NOT NULL REFERENCES public.resources(id) ON DELETE CASCADE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, resource_id)
);

-- Enable RLS
ALTER TABLE public.resource_bookmarks ENABLE ROW LEVEL SECURITY;

-- Users can view their own bookmarks
CREATE POLICY "Users can view their own bookmarks"
ON public.resource_bookmarks
FOR SELECT
USING (auth.uid() = user_id);

-- Users can create their own bookmarks
CREATE POLICY "Users can create their own bookmarks"
ON public.resource_bookmarks
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can delete their own bookmarks
CREATE POLICY "Users can delete their own bookmarks"
ON public.resource_bookmarks
FOR DELETE
USING (auth.uid() = user_id);

-- Admins can view all bookmarks
CREATE POLICY "Admins can view all bookmarks"
ON public.resource_bookmarks
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add index for faster lookups
CREATE INDEX idx_resource_bookmarks_user_id ON public.resource_bookmarks(user_id);
CREATE INDEX idx_resource_bookmarks_resource_id ON public.resource_bookmarks(resource_id);
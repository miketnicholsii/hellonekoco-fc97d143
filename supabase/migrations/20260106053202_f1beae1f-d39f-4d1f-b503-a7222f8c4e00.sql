-- Create table for storing user dashboard widget preferences
CREATE TABLE public.dashboard_layouts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  widget_order JSONB NOT NULL DEFAULT '[]',
  hidden_widgets JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.dashboard_layouts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own dashboard layout"
ON public.dashboard_layouts
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own dashboard layout"
ON public.dashboard_layouts
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own dashboard layout"
ON public.dashboard_layouts
FOR UPDATE
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_dashboard_layouts_updated_at
BEFORE UPDATE ON public.dashboard_layouts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
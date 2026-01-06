-- Create tradelines table for tracking vendor accounts and credit lines
CREATE TABLE public.tradelines (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  vendor_name TEXT NOT NULL,
  account_type TEXT NOT NULL, -- 'net30', 'store_credit', 'revolving', 'term_loan'
  credit_limit NUMERIC(12,2),
  current_balance NUMERIC(12,2) DEFAULT 0,
  payment_status TEXT DEFAULT 'current', -- 'current', 'late', 'paid_off', 'closed'
  opened_date DATE,
  reports_to TEXT[], -- which bureaus it reports to
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create credit_scores table for tracking business credit scores
CREATE TABLE public.credit_scores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  bureau TEXT NOT NULL, -- 'duns', 'experian', 'equifax', 'nav'
  score INTEGER,
  score_date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tradelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_scores ENABLE ROW LEVEL SECURITY;

-- RLS Policies for tradelines
CREATE POLICY "Users can view their own tradelines"
ON public.tradelines
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tradelines"
ON public.tradelines
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tradelines"
ON public.tradelines
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tradelines"
ON public.tradelines
FOR DELETE
USING (auth.uid() = user_id);

-- RLS Policies for credit_scores
CREATE POLICY "Users can view their own credit scores"
ON public.credit_scores
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own credit scores"
ON public.credit_scores
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own credit scores"
ON public.credit_scores
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own credit scores"
ON public.credit_scores
FOR DELETE
USING (auth.uid() = user_id);

-- Add triggers for updated_at
CREATE TRIGGER update_tradelines_updated_at
BEFORE UPDATE ON public.tradelines
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
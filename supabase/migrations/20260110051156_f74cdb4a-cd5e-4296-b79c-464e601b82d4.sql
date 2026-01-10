-- Create affiliate_payouts table to store UPI details and withdrawal requests
CREATE TABLE public.affiliate_payouts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  upi_phone_number TEXT,
  upi_id TEXT,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'pending',
  requested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  processed_at TIMESTAMP WITH TIME ZONE,
  payout_type TEXT NOT NULL DEFAULT 'manual'
);

-- Add UPI details columns to affiliate_links table
ALTER TABLE public.affiliate_links
ADD COLUMN upi_phone_number TEXT,
ADD COLUMN upi_id TEXT;

-- Enable Row Level Security
ALTER TABLE public.affiliate_payouts ENABLE ROW LEVEL SECURITY;

-- Create policies for affiliate_payouts
CREATE POLICY "Users can view their own payouts" 
ON public.affiliate_payouts 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own payout requests" 
ON public.affiliate_payouts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own payouts" 
ON public.affiliate_payouts 
FOR UPDATE 
USING (auth.uid() = user_id);
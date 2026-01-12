-- Create table to track certificate purchases
CREATE TABLE public.certificate_purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  certificate_id UUID NOT NULL REFERENCES public.user_certificates(id) ON DELETE CASCADE,
  razorpay_payment_id TEXT,
  razorpay_order_id TEXT,
  amount INTEGER NOT NULL DEFAULT 99,
  purchased_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, certificate_id)
);

-- Enable RLS
ALTER TABLE public.certificate_purchases ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own purchases" 
ON public.certificate_purchases 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own purchases" 
ON public.certificate_purchases 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);
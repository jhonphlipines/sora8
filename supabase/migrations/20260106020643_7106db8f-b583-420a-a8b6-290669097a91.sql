-- Create affiliate_links table for storing user referral links
CREATE TABLE public.affiliate_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  referral_code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Create affiliate_clicks table for tracking link clicks
CREATE TABLE public.affiliate_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  affiliate_link_id UUID NOT NULL REFERENCES public.affiliate_links(id) ON DELETE CASCADE,
  clicked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT
);

-- Create affiliate_signups table for tracking signups from referrals
CREATE TABLE public.affiliate_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  affiliate_link_id UUID NOT NULL REFERENCES public.affiliate_links(id) ON DELETE CASCADE,
  referred_user_id UUID NOT NULL,
  signed_up_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  converted_to_paid BOOLEAN NOT NULL DEFAULT false,
  converted_at TIMESTAMP WITH TIME ZONE
);

-- Create affiliate_stats view for easy analytics
CREATE VIEW public.affiliate_stats AS
SELECT 
  al.id as link_id,
  al.user_id,
  al.referral_code,
  al.created_at,
  al.is_active,
  COALESCE(clicks.click_count, 0) as total_clicks,
  COALESCE(signups.signup_count, 0) as total_signups,
  COALESCE(signups.paid_count, 0) as paid_users
FROM public.affiliate_links al
LEFT JOIN (
  SELECT affiliate_link_id, COUNT(*) as click_count
  FROM public.affiliate_clicks
  GROUP BY affiliate_link_id
) clicks ON clicks.affiliate_link_id = al.id
LEFT JOIN (
  SELECT 
    affiliate_link_id, 
    COUNT(*) as signup_count,
    COUNT(*) FILTER (WHERE converted_to_paid = true) as paid_count
  FROM public.affiliate_signups
  GROUP BY affiliate_link_id
) signups ON signups.affiliate_link_id = al.id;

-- Enable RLS on all tables
ALTER TABLE public.affiliate_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_signups ENABLE ROW LEVEL SECURITY;

-- RLS policies for affiliate_links
CREATE POLICY "Users can view their own affiliate links"
ON public.affiliate_links FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own affiliate links"
ON public.affiliate_links FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own affiliate links"
ON public.affiliate_links FOR UPDATE
USING (auth.uid() = user_id);

-- RLS policies for affiliate_clicks (public insert for tracking, users can view their own)
CREATE POLICY "Anyone can record clicks"
ON public.affiliate_clicks FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can view clicks on their links"
ON public.affiliate_clicks FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.affiliate_links al
    WHERE al.id = affiliate_link_id AND al.user_id = auth.uid()
  )
);

-- RLS policies for affiliate_signups
CREATE POLICY "Anyone can record signups"
ON public.affiliate_signups FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can view signups from their links"
ON public.affiliate_signups FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.affiliate_links al
    WHERE al.id = affiliate_link_id AND al.user_id = auth.uid()
  )
);

-- Create function to generate unique referral code
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS TEXT
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result TEXT := '';
  i INTEGER;
BEGIN
  FOR i IN 1..8 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
  END LOOP;
  RETURN result;
END;
$$;
-- Drop the security definer view and recreate as regular view with security invoker
DROP VIEW IF EXISTS public.affiliate_stats;

-- Recreate the view with SECURITY INVOKER (default, but explicit)
CREATE VIEW public.affiliate_stats 
WITH (security_invoker = on)
AS
SELECT 
  al.id as link_id,
  al.user_id,
  al.referral_code,
  al.created_at,
  al.is_active,
  COALESCE(clicks.click_count, 0) as total_clicks,
  COALESCE(signups.signup_count, 0) as total_signups,
  COALESCE(signups.paid_count, 0) as paid_count
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
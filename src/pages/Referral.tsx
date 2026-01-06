import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const Referral = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const trackClick = async () => {
      const ref = searchParams.get('ref');
      
      if (!ref) {
        navigate('/auth');
        return;
      }

      try {
        // Find the affiliate link by referral code
        const { data: affiliateLink } = await supabase
          .from('affiliate_links')
          .select('id')
          .eq('referral_code', ref)
          .eq('is_active', true)
          .single();

        if (affiliateLink) {
          // Record the click
          await supabase.from('affiliate_clicks').insert({
            affiliate_link_id: affiliateLink.id,
            user_agent: navigator.userAgent,
            referrer: document.referrer || null
          });
        }
      } catch (error) {
        console.error('Error tracking click:', error);
      }

      // Redirect to auth page with referral code
      navigate(`/auth?ref=${ref}`);
    };

    trackClick();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Redirecting...</p>
      </div>
    </div>
  );
};

export default Referral;
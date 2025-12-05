import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, orderId, amount, currency, paymentId, signature, userId, creditsPurchased } = await req.json();

    const RAZORPAY_KEY_ID = "rzp_live_RmkssLbXJRxtd6";
    const RAZORPAY_KEY_SECRET = Deno.env.get('RAZORPAY_KEY_SECRET');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!RAZORPAY_KEY_SECRET) {
      throw new Error('Razorpay key secret not configured');
    }

    console.log('Razorpay payment action:', action);

    // Create Order
    if (action === 'createOrder') {
      const orderResponse = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`)
        },
        body: JSON.stringify({
          amount: amount * 100, // Convert to paise
          currency: currency || 'INR',
          receipt: `receipt_${Date.now()}`,
        })
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.text();
        console.error('Razorpay order creation error:', errorData);
        throw new Error('Failed to create Razorpay order');
      }

      const order = await orderResponse.json();
      console.log('Order created:', order.id);

      return new Response(
        JSON.stringify({ order }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify Payment and Add Credits
    if (action === 'verifyPayment') {
      const crypto = await import("https://deno.land/std@0.177.0/node/crypto.ts");
      
      const generatedSignature = crypto.default
        .createHmac('sha256', RAZORPAY_KEY_SECRET)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');

      const isValid = generatedSignature === signature;
      
      console.log('Payment verification:', isValid ? 'SUCCESS' : 'FAILED');

      // If payment is valid and we have user info, add credits
      if (isValid && userId && creditsPurchased && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

        // Record payment history
        await supabase.from('payment_history').insert({
          user_id: userId,
          amount: amount,
          credits_purchased: creditsPurchased,
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          status: 'completed'
        });

        // Check if user has existing credits
        const { data: existingCredits } = await supabase
          .from('user_credits')
          .select('credits')
          .eq('user_id', userId)
          .maybeSingle();

        if (existingCredits) {
          // Update existing credits
          await supabase
            .from('user_credits')
            .update({ credits: existingCredits.credits + creditsPurchased })
            .eq('user_id', userId);
        } else {
          // Insert new credits record
          await supabase
            .from('user_credits')
            .insert({ user_id: userId, credits: creditsPurchased });
        }

        console.log(`Added ${creditsPurchased} credits to user ${userId}`);
      }

      return new Response(
        JSON.stringify({ 
          verified: isValid,
          message: isValid ? 'Payment verified successfully' : 'Payment verification failed'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Razorpay payment error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Award, Clock, BookOpen, CreditCard, Bot, Video, Calendar } from "lucide-react";
import { AIAssistant } from "@/components/AIAssistant";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Pricing = () => {
  const navigate = useNavigate();
  const [userCredits, setUserCredits] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserCredits = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const { data } = await supabase
          .from('user_credits')
          .select('credits')
          .eq('user_id', user.id)
          .maybeSingle();
        
        setUserCredits(data?.credits ?? 0);
      }
      setLoading(false);
    };

    fetchUserCredits();
  }, []);

  const handlePayment = async (amount: number, credits: number, planName: string) => {
    try {
      if (!userId) {
        toast.error("Please login to purchase credits");
        navigate('/auth');
        return;
      }

      toast.loading("Initiating payment...");

      const { data: orderData, error: orderError } = await supabase.functions.invoke('razorpay-payment', {
        body: { 
          action: 'createOrder',
          amount: amount,
          currency: 'INR'
        }
      });

      if (orderError) throw orderError;

      const options = {
        key: "rzp_live_RmkssLbXJRxtd6",
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "EDU SKILL",
        description: `${planName} - ${credits} Certificate Credits`,
        order_id: orderData.order.id,
        handler: async function (response: any) {
          try {
            toast.loading("Verifying payment...");

            const { data: verifyData, error: verifyError } = await supabase.functions.invoke('razorpay-payment', {
              body: {
                action: 'verifyPayment',
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                userId: userId,
                creditsPurchased: credits,
                amount: amount
              }
            });

            if (verifyError) throw verifyError;

            if (verifyData.verified) {
              toast.success(`Payment successful! ${credits} credits added 🎉`);
              setUserCredits((prev) => (prev ?? 0) + credits);
              navigate('/tests');
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: ""
        },
        theme: {
          color: "#0EA5E9"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      toast.dismiss();
    } catch (error) {
      console.error('Payment error:', error);
      toast.error("Failed to initiate payment");
    }
  };

  return (
    <div className="min-h-screen bg-background py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-3 sm:mb-4 text-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent mb-3 sm:mb-4">
              Get Certificates
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-4 sm:mb-6 px-2">
              Purchase certificate credits and showcase your programming expertise with professional certificates.
            </p>

            {/* User Credits Display */}
            {!loading && userId && (
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                <CreditCard className="h-4 w-4" />
                <span className="font-semibold">Your Credits: {userCredits ?? 0}</span>
              </div>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8 sm:mb-12">
          {/* Basic Pack - ₹250 */}
          <Card className="bg-[var(--gradient-card)] border-border/50 hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center pb-4 sm:pb-6 p-4 sm:p-6">
              <div className="w-14 h-14 mx-auto bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <Award className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2">
                Basic Pack
              </CardTitle>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
                ₹250
              </div>
              <CardDescription className="text-muted-foreground text-sm">
                Get 5 certificate credits
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-muted-foreground">5 Professional Certificates</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-muted-foreground">Download in PNG, PDF, JPG</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-muted-foreground">Instant Results</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-muted-foreground">Lifetime Access</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-muted-foreground">11+ Technologies Available</span>
                </li>
              </ul>
              
              <Button 
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 border-0 text-sm py-5 text-white"
                onClick={() => handlePayment(250, 5, "Basic Pack")}
              >
                Buy Now - ₹250
              </Button>
            </CardContent>
          </Card>

          {/* Pro Pack - ₹799 */}
          <Card className="bg-[var(--gradient-card)] border-border/50 hover:shadow-xl transition-all duration-300 ring-2 ring-primary/30 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-primary text-primary-foreground text-xs px-3">Best Value</Badge>
            </div>
            <CardHeader className="text-center pb-4 sm:pb-6 p-4 sm:p-6 pt-6">
              <div className="w-14 h-14 mx-auto bg-[var(--gradient-primary)] rounded-full flex items-center justify-center mb-4">
                <Award className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2">
                Pro Pack
              </CardTitle>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
                ₹799
              </div>
              <CardDescription className="text-muted-foreground text-sm">
                Get 10 certificate credits + extras
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-muted-foreground">10 Professional Certificates</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-muted-foreground">Download in PNG, PDF, JPG</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-muted-foreground">Instant Results</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-muted-foreground">Lifetime Access</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-muted-foreground">11+ Technologies Available</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Bot className="h-4 w-4 text-purple-500 flex-shrink-0" />
                  <span className="text-muted-foreground">AI Assistant Access</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Video className="h-4 w-4 text-purple-500 flex-shrink-0" />
                  <span className="text-muted-foreground">AI Video Summarizer</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Calendar className="h-4 w-4 text-purple-500 flex-shrink-0" />
                  <span className="text-muted-foreground">Monthly 1 Free Exam</span>
                </li>
              </ul>
              
              <Button 
                className="w-full mt-4 bg-[var(--gradient-primary)] border-0 text-sm py-5 text-white"
                onClick={() => handlePayment(799, 10, "Pro Pack")}
              >
                Buy Now - ₹799
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <Card className="bg-[var(--gradient-card)] border-border/50 mb-8 sm:mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">
              Why Choose Our Certification Platform?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 text-center">
              <div>
                <div className="w-12 h-12 mx-auto bg-[var(--gradient-primary)] rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">11+ Technologies</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive coverage of popular programming languages and frameworks
                </p>
              </div>
              <div>
                <div className="w-12 h-12 mx-auto bg-[var(--gradient-primary)] rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Timed Assessment</h3>
                <p className="text-sm text-muted-foreground">
                  30-minute time limit to test your knowledge under realistic conditions
                </p>
              </div>
              <div>
                <div className="w-12 h-12 mx-auto bg-[var(--gradient-primary)] rounded-full flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Professional Certificates</h3>
                <p className="text-sm text-muted-foreground">
                  Earn beautiful certificates to showcase your programming expertise
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="bg-[var(--gradient-card)] border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  How do credits work?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Each credit allows you to take one certification test. If you pass (70% or above), you earn a professional certificate.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  What happens if I fail a test?
                </h4>
                <p className="text-sm text-muted-foreground">
                  If you don't pass, your credit is still used. We recommend reviewing the topics before attempting again.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Do credits expire?
                </h4>
                <p className="text-sm text-muted-foreground">
                  No, your purchased credits never expire. Use them whenever you're ready.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  What's included in the Pro Pack?
                </h4>
                <p className="text-sm text-muted-foreground">
                  The Pro Pack includes 10 certificate credits plus access to AI Assistant, AI Video Summarizer, and 1 free exam every month.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-xs text-center text-muted-foreground mt-6">
          Secure payment via Razorpay
        </p>
      </div>
      
      {/* AI Assistant */}
      <AIAssistant context="Pricing Plans" />
    </div>
  );
};

export default Pricing;

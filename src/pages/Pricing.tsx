import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle, Award, Clock, BookOpen, CreditCard, Bot, Video, Calendar } from "lucide-react";
import { AIAssistant } from "@/components/AIAssistant";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

declare global {
  interface Window {
    Razorpay: any;
  }
}

// Exchange rate (approximate - in production you'd fetch this from an API)
const USD_TO_INR_RATE = 83.5;

const Pricing = () => {
  const navigate = useNavigate();
  const [userCredits, setUserCredits] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [isYearly, setIsYearly] = useState(false);
  const [currencyDialogOpen, setCurrencyDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ amount: number; credits: number; name: string } | null>(null);

  // Monthly prices in INR
  const BASIC_MONTHLY_INR = 250;
  const PRO_MONTHLY_INR = 799;
  
  // Yearly prices (with discount)
  const BASIC_YEARLY_INR = 2500; // ~17% off
  const PRO_YEARLY_INR = 7999; // ~17% off

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

  const getPrice = (baseMonthly: number, baseYearly: number) => {
    return isYearly ? baseYearly : baseMonthly;
  };

  const getCredits = (baseCredits: number) => {
    return isYearly ? baseCredits * 12 : baseCredits;
  };

  const handleBuyClick = (amount: number, credits: number, planName: string) => {
    if (!userId) {
      toast.error("Please login to purchase credits");
      navigate('/auth');
      return;
    }
    setSelectedPlan({ amount, credits, name: planName });
    setCurrencyDialogOpen(true);
  };

  const handlePayment = async (currency: 'INR' | 'USD') => {
    if (!selectedPlan || !userId) return;
    
    setCurrencyDialogOpen(false);
    
    let amountInINR = selectedPlan.amount;
    let displayAmount = selectedPlan.amount;
    
    if (currency === 'USD') {
      // Convert INR to USD for display, but Razorpay will charge in INR
      displayAmount = Math.ceil(selectedPlan.amount / USD_TO_INR_RATE);
      amountInINR = selectedPlan.amount; // Keep original INR amount for payment
    }

    try {
      toast.loading("Initiating payment...");

      const { data: orderData, error: orderError } = await supabase.functions.invoke('razorpay-payment', {
        body: { 
          action: 'createOrder',
          amount: amountInINR,
          currency: 'INR' // Razorpay charges in INR
        }
      });

      if (orderError) throw orderError;

      const options = {
        key: "rzp_live_RmkssLbXJRxtd6",
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "EDU SKILL",
        description: `${selectedPlan.name} - ${selectedPlan.credits} Certificate Credits`,
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
                creditsPurchased: selectedPlan.credits,
                amount: amountInINR
              }
            });

            if (verifyError) throw verifyError;

            if (verifyData.verified) {
              toast.success(`Payment successful! ${selectedPlan.credits} credits added 🎉`);
              setUserCredits((prev) => (prev ?? 0) + selectedPlan.credits);
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

  const basicPrice = getPrice(BASIC_MONTHLY_INR, BASIC_YEARLY_INR);
  const proPrice = getPrice(PRO_MONTHLY_INR, PRO_YEARLY_INR);
  const basicCredits = getCredits(5);
  const proCredits = getCredits(10);

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

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <Label htmlFor="billing-toggle" className={!isYearly ? 'font-semibold' : 'text-muted-foreground'}>
                Monthly
              </Label>
              <Switch
                id="billing-toggle"
                checked={isYearly}
                onCheckedChange={setIsYearly}
              />
              <Label htmlFor="billing-toggle" className={isYearly ? 'font-semibold' : 'text-muted-foreground'}>
                Yearly
                <Badge variant="secondary" className="ml-2 text-xs">Save 17%</Badge>
              </Label>
            </div>

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
          {/* Basic Pack */}
          <Card className="bg-[var(--gradient-card)] border-border/50 hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center pb-4 sm:pb-6 p-4 sm:p-6">
              <div className="w-14 h-14 mx-auto bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <Award className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2">
                Basic Pack
              </CardTitle>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
                ₹{basicPrice.toLocaleString()}
                <span className="text-sm text-muted-foreground font-normal">/{isYearly ? 'year' : 'month'}</span>
              </div>
              <CardDescription className="text-muted-foreground text-sm">
                Get {basicCredits} certificate credits
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-muted-foreground">{basicCredits} Professional Certificates</span>
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
                onClick={() => handleBuyClick(basicPrice, basicCredits, "Basic Pack")}
              >
                Buy Now - ₹{basicPrice.toLocaleString()}
              </Button>
            </CardContent>
          </Card>

          {/* Pro Pack */}
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
                ₹{proPrice.toLocaleString()}
                <span className="text-sm text-muted-foreground font-normal">/{isYearly ? 'year' : 'month'}</span>
              </div>
              <CardDescription className="text-muted-foreground text-sm">
                Get {proCredits} certificate credits + extras
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-muted-foreground">{proCredits} Professional Certificates</span>
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
                onClick={() => handleBuyClick(proPrice, proCredits, "Pro Pack")}
              >
                Buy Now - ₹{proPrice.toLocaleString()}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Currency Selection Dialog */}
        <Dialog open={currencyDialogOpen} onOpenChange={setCurrencyDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Choose Payment Currency</DialogTitle>
              <DialogDescription>
                Select your preferred currency for payment. USD payments will be converted at current exchange rate.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Button
                variant="outline"
                className="h-24 flex flex-col gap-2"
                onClick={() => handlePayment('INR')}
              >
                <span className="text-2xl font-bold">₹</span>
                <span className="text-lg font-semibold">
                  ₹{selectedPlan?.amount.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground">Pay in INR</span>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex flex-col gap-2"
                onClick={() => handlePayment('USD')}
              >
                <span className="text-2xl font-bold">$</span>
                <span className="text-lg font-semibold">
                  ${selectedPlan ? Math.ceil(selectedPlan.amount / USD_TO_INR_RATE) : 0}
                </span>
                <span className="text-xs text-muted-foreground">
                  ~₹{selectedPlan?.amount.toLocaleString()} (Rate: {USD_TO_INR_RATE})
                </span>
              </Button>
            </div>
          </DialogContent>
        </Dialog>

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
                  What's the difference between monthly and yearly billing?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Yearly billing gives you 12 months of credits at a 17% discount. You get all credits upfront for the year.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Can I pay in USD?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Yes! You can choose to pay in USD. The amount will be converted at current exchange rate (~₹83.5 per $1).
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
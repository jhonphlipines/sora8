import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Award, Clock, BookOpen, CreditCard, Bot, Video, Calendar, Check, ChevronDown } from "lucide-react";
import { AIAssistant } from "@/components/AIAssistant";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
declare global {
  interface Window {
    Razorpay: any;
  }
}

// Exchange rate (1 USD = 90 INR)
const USD_TO_INR_RATE = 90;
const Pricing = () => {
  const navigate = useNavigate();
  const [userCredits, setUserCredits] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<'INR' | 'USD'>('INR');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  // Monthly prices in INR
  const BASIC_MONTHLY_INR = 299;
  const PRO_MONTHLY_INR = 799;

  // Yearly prices (11 months - 1 month free)
  const BASIC_YEARLY_INR = BASIC_MONTHLY_INR * 11;
  const PRO_YEARLY_INR = PRO_MONTHLY_INR * 11;

  // Certificate counts
  const BASIC_CERTIFICATES_MONTHLY = 5;
  const PRO_CERTIFICATES_MONTHLY = 30;
  const BASIC_CERTIFICATES_YEARLY = 5 * 12; // Full year credits
  const PRO_CERTIFICATES_YEARLY = 30 * 12;

  useEffect(() => {
    const fetchUserCredits = async () => {
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const {
          data
        } = await supabase.from('user_credits').select('credits').eq('user_id', user.id).maybeSingle();
        setUserCredits(data?.credits ?? 0);
      }
      setLoading(false);
    };
    fetchUserCredits();
  }, []);

  const getPrice = (monthlyPrice: number, yearlyPrice: number) => {
    return billingPeriod === 'monthly' ? monthlyPrice : yearlyPrice;
  };

  const getCredits = (monthlyCredits: number, yearlyCredits: number) => {
    return billingPeriod === 'monthly' ? monthlyCredits : yearlyCredits;
  };

  const getMonthlyEquivalent = (yearlyPrice: number) => {
    return Math.round(yearlyPrice / 12);
  };
  const handleBuyClick = (amount: number, credits: number, planName: string) => {
    if (!userId) {
      toast.error("Please login to purchase credits");
      navigate('/auth');
      return;
    }
    handlePayment(amount, credits, planName);
  };

  const handlePayment = async (amount: number, credits: number, planName: string) => {
    if (!userId) return;
    
    let amountInINR = amount;
    if (selectedCurrency === 'USD') {
      // Amount is already in INR for Razorpay
      amountInINR = amount;
    }
    
    try {
      toast.loading("Initiating payment...");
      const {
        data: orderData,
        error: orderError
      } = await supabase.functions.invoke('razorpay-payment', {
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
        description: `${planName} - ${credits} Certificate Credits`,
        order_id: orderData.order.id,
        handler: async function (response: any) {
          try {
            toast.loading("Verifying payment...");
            const {
              data: verifyData,
              error: verifyError
            } = await supabase.functions.invoke('razorpay-payment', {
              body: {
                action: 'verifyPayment',
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                userId: userId,
                creditsPurchased: credits,
                amount: amountInINR
              }
            });
            if (verifyError) throw verifyError;
            if (verifyData.verified) {
              toast.success(`Payment successful! ${credits} credits added 🎉`);
              setUserCredits(prev => (prev ?? 0) + credits);
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

  const getDisplayPrice = (priceInINR: number) => {
    if (selectedCurrency === 'USD') {
      return `$${Math.ceil(priceInINR / USD_TO_INR_RATE)}`;
    }
    return `₹${priceInINR.toLocaleString()}`;
  };
  const basicPrice = getPrice(BASIC_MONTHLY_INR, BASIC_YEARLY_INR);
  const proPrice = getPrice(PRO_MONTHLY_INR, PRO_YEARLY_INR);
  const basicCredits = getCredits(BASIC_CERTIFICATES_MONTHLY, BASIC_CERTIFICATES_YEARLY);
  const proCredits = getCredits(PRO_CERTIFICATES_MONTHLY, PRO_CERTIFICATES_YEARLY);

  return <div className="min-h-screen bg-background py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Button variant="ghost" onClick={() => navigate('/')} className="mb-3 sm:mb-4 text-sm">
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

            {/* Billing Period Toggle */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="inline-flex items-center bg-muted/50 rounded-full p-1">
                <button
                  onClick={() => setBillingPeriod('monthly')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    billingPeriod === 'monthly'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingPeriod('yearly')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    billingPeriod === 'yearly'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Yearly
                  <Badge className="bg-green-500 text-white text-xs px-1.5 py-0">1 Month Free</Badge>
                </button>
              </div>
            </div>

            {billingPeriod === 'yearly' && (
              <p className="text-sm text-green-500 font-medium mb-4">
                🎉 Pay for 11 months, get 12 months of access!
              </p>
            )}

            {/* Currency Dropdown Select */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2 min-w-[120px] justify-between bg-background">
                    <span>{selectedCurrency === 'INR' ? 'INR (₹)' : 'USD ($)'}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-[120px] bg-background border border-border z-50">
                  <DropdownMenuItem 
                    onClick={() => setSelectedCurrency('INR')}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <span>INR (₹)</span>
                    {selectedCurrency === 'INR' && <Check className="h-4 w-4 text-primary" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setSelectedCurrency('USD')}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <span>USD ($)</span>
                    {selectedCurrency === 'USD' && <Check className="h-4 w-4 text-primary" />}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <span className="text-xs text-muted-foreground">
                (1 USD = ₹{USD_TO_INR_RATE})
              </span>
            </div>

            {/* User Credits Display */}
            {!loading && userId && <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                <CreditCard className="h-4 w-4" />
                <span className="font-semibold">Your Credits: {userCredits ?? 0}</span>
              </div>}
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
              {billingPeriod === 'yearly' && (
                <div className="text-sm text-muted-foreground line-through mb-1">
                  {getDisplayPrice(BASIC_MONTHLY_INR * 12)}/year
                </div>
              )}
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
                {getDisplayPrice(basicPrice)}
                <span className="text-sm text-muted-foreground font-normal">
                  {billingPeriod === 'monthly' ? '/month' : '/year'}
                </span>
              </div>
              {billingPeriod === 'yearly' && (
                <p className="text-xs text-green-500 font-medium">
                  {getDisplayPrice(getMonthlyEquivalent(basicPrice))}/month • Save {getDisplayPrice(BASIC_MONTHLY_INR)}
                </p>
              )}
              <CardDescription className="text-muted-foreground text-sm mt-2">
                Get {basicCredits} Professional Certificates {billingPeriod === 'yearly' ? '(Full Year)' : ''}
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
              
              <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 border-0 text-sm py-5 text-white" onClick={() => handleBuyClick(basicPrice, basicCredits, `Basic Pack (${billingPeriod === 'monthly' ? 'Monthly' : 'Yearly'})`)}>
                Buy Now - {getDisplayPrice(basicPrice)}
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
              {billingPeriod === 'yearly' && (
                <div className="text-sm text-muted-foreground line-through mb-1">
                  {getDisplayPrice(PRO_MONTHLY_INR * 12)}/year
                </div>
              )}
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
                {getDisplayPrice(proPrice)}
                <span className="text-sm text-muted-foreground font-normal">
                  {billingPeriod === 'monthly' ? '/month' : '/year'}
                </span>
              </div>
              {billingPeriod === 'yearly' && (
                <p className="text-xs text-green-500 font-medium">
                  {getDisplayPrice(getMonthlyEquivalent(proPrice))}/month • Save {getDisplayPrice(PRO_MONTHLY_INR)}
                </p>
              )}
              <CardDescription className="text-muted-foreground text-sm mt-2">
                Get {proCredits} Professional Certificates + Premium Features {billingPeriod === 'yearly' ? '(Full Year)' : ''}
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
                  <span className="text-muted-foreground">Unlimited AI Assistant</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Calendar className="h-4 w-4 text-purple-500 flex-shrink-0" />
                  <span className="text-muted-foreground">{billingPeriod === 'yearly' ? '12 Free Exams (1/month)' : 'Monthly 1 Free Exam'}</span>
                </li>
              </ul>
              
              <Button className="w-full mt-4 bg-[var(--gradient-primary)] border-0 text-sm py-5 text-white" onClick={() => handleBuyClick(proPrice, proCredits, `Pro Pack (${billingPeriod === 'monthly' ? 'Monthly' : 'Yearly'})`)}>
                Buy Now - {getDisplayPrice(proPrice)}
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

        
      </div>
      
      {/* AI Assistant */}
      <AIAssistant context="Pricing Plans" />
    </div>;
};
export default Pricing;
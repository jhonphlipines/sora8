import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Award, Clock, BookOpen } from "lucide-react";
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

  const handlePayment = async (planName: string, amount: number) => {
    try {
      toast.loading("Initiating payment...");

      // Create order
      const { data: orderData, error: orderError } = await supabase.functions.invoke('razorpay-payment', {
        body: { 
          action: 'createOrder',
          amount: amount,
          currency: 'INR'
        }
      });

      if (orderError) throw orderError;

      const options = {
        key: "rzp_test_RcfTGDZo0SqZz1",
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "EDU SKILL",
        description: `${planName} Plan`,
        order_id: orderData.order.id,
        handler: async function (response: any) {
          try {
            toast.loading("Verifying payment...");

            // Verify payment
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke('razorpay-payment', {
              body: {
                action: 'verifyPayment',
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature
              }
            });

            if (verifyError) throw verifyError;

            if (verifyData.verified) {
              toast.success("Payment successful! 🎉");
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

  const plans = [
    {
      name: "Basic",
      price: "250",
      period: "/test",
      description: "Perfect for trying out our platform",
      popular: false,
      features: [
        "1 Certification Test",
        "Professional Certificate",
        "Instant Results",
        "30-day Certificate Access"
      ],
      buttonText: "Get Started",
      buttonVariant: "default" as const
    },
    {
      name: "Pro",
      price: "899", 
      period: "/month",
      description: "Best value for active learners",
      popular: true,
      features: [
        "5 Certification Tests",
        "Professional Certificates",
        "Priority Support",
        "Lifetime Certificate Access",
        "Progress Analytics"
      ],
      buttonText: "Start Pro Plan",
      buttonVariant: "default" as const
    },
    {
      name: "Enterprise",
      price: "2999",
      period: "/month", 
      description: "For teams and organizations",
      popular: false,
      features: [
        "Unlimited Tests",
        "Team Management",
        "Custom Certificates",
        "Advanced Analytics",
        "Dedicated Support"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "default" as const
    }
  ];

  return (
    <div className="min-h-screen bg-background py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
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
              Choose Your Plan
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 px-2">
              Select the perfect plan for your certification needs. All plans include professional certificates and instant results.
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto mb-8 sm:mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`bg-[var(--gradient-card)] border-border/50 hover:shadow-xl transition-all duration-300 relative ${
                plan.popular ? 'ring-2 ring-primary/20' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground text-xs">Most Popular</Badge>
                </div>
              )}
              
              <CardHeader className={`text-center pb-4 sm:pb-6 p-4 sm:p-6 ${plan.popular ? 'pt-6 sm:pt-8' : ''}`}>
                <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </CardTitle>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                  {plan.price}
                  <span className="text-sm sm:text-base md:text-lg text-muted-foreground font-normal">
                    {plan.period}
                  </span>
                </div>
                <CardDescription className="text-muted-foreground text-xs sm:text-sm">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full mt-4 sm:mt-6 text-xs sm:text-sm ${
                    plan.popular 
                      ? 'bg-[var(--gradient-primary)] border-0 shadow-[var(--glow-primary)]' 
                      : 'bg-[var(--gradient-primary)] border-0'
                  }`}
                  onClick={() => {
                    const priceNum = parseInt(plan.price.replace('$', ''));
                    handlePayment(plan.name, priceNum);
                  }}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mb-16">
          <Card className="max-w-4xl mx-auto bg-[var(--gradient-card)] border-border/50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">
                Why Choose Our Certification Platform?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8 text-center">
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
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-[var(--gradient-card)] border-border/50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    What happens if I fail a test?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    You can retake tests at any time. We recommend reviewing the topics covered and trying again when you feel more confident.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Are the certificates recognized by employers?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Our certificates demonstrate your knowledge and skills. While recognition varies by employer, they serve as excellent portfolio additions.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Can I cancel my subscription anytime?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, you can cancel your Pro or Enterprise subscription at any time. You'll retain access until the end of your billing period.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* AI Assistant */}
      <AIAssistant context="Pricing Plans" />
    </div>
  );
};

export default Pricing;

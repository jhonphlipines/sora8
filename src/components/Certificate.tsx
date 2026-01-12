import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Download, FileImage, FileText, Lock, CreditCard } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { supabase } from "@/integrations/supabase/client";

interface CertificateProps {
  studentName: string;
  score: number;
  totalQuestions: number;
  courseName: string;
  completionDate: Date;
  certificateId: string;
}

const CERTIFICATE_PRICE = 99; // Price in INR

export const Certificate = ({
  studentName,
  score,
  totalQuestions,
  courseName,
  completionDate,
  certificateId
}: CertificateProps) => {
  const { toast } = useToast();
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [checkingPurchase, setCheckingPurchase] = useState(true);
  
  const percentage = Math.round(score / totalQuestions * 100);
  const isPassed = percentage >= 60;

  // Check if certificate is already purchased
  useEffect(() => {
    const checkPurchase = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setCheckingPurchase(false);
          return;
        }

        const { data } = await supabase
          .from('certificate_purchases')
          .select('id')
          .eq('user_id', user.id)
          .eq('certificate_id', certificateId)
          .maybeSingle();

        setIsPurchased(!!data);
      } catch (error) {
        console.error('Error checking purchase:', error);
      } finally {
        setCheckingPurchase(false);
      }
    };

    if (certificateId) {
      checkPurchase();
    } else {
      setCheckingPurchase(false);
    }
  }, [certificateId]);

  const getMedalInfo = (percent: number) => {
    if (percent >= 90) {
      return {
        type: "Gold",
        label: "Excellent",
        gradient: "from-yellow-400 via-yellow-300 to-yellow-500",
        border: "#facc15",
        fill: "#fbbf24",
        textColor: "#ca8a04",
        bgColor: "#fef3c7"
      };
    } else if (percent >= 70) {
      return {
        type: "Silver",
        label: "Great Job",
        gradient: "from-gray-300 via-gray-200 to-gray-400",
        border: "#9ca3af",
        fill: "#d1d5db",
        textColor: "#4b5563",
        bgColor: "#f3f4f6"
      };
    } else {
      return {
        type: "Bronze",
        label: "Well Done",
        gradient: "from-amber-600 via-amber-500 to-amber-700",
        border: "#d97706",
        fill: "#f59e0b",
        textColor: "#92400e",
        bgColor: "#fef3c7"
      };
    }
  };

  const medalInfo = getMedalInfo(percentage);

  const handlePayment = async () => {
    setIsProcessingPayment(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Login Required",
          description: "Please login to purchase certificate",
          variant: "destructive"
        });
        return;
      }

      // Create Razorpay order
      const { data: orderData, error: orderError } = await supabase.functions.invoke('razorpay-payment', {
        body: {
          action: 'createOrder',
          amount: CERTIFICATE_PRICE,
          currency: 'INR'
        }
      });

      if (orderError || !orderData?.order) {
        throw new Error('Failed to create payment order');
      }

      // Load Razorpay script if not loaded
      if (!(window as any).Razorpay) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }

      const options = {
        key: 'rzp_live_RmkssLbXJRxtd6',
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'Vilver',
        description: `Certificate: ${courseName}`,
        order_id: orderData.order.id,
        handler: async (response: any) => {
          try {
            // Verify payment
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke('razorpay-payment', {
              body: {
                action: 'verifyPayment',
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                userId: user.id,
                amount: CERTIFICATE_PRICE
              }
            });

            if (verifyError || !verifyData?.verified) {
              throw new Error('Payment verification failed');
            }

            // Record the purchase
            await supabase.from('certificate_purchases').insert({
              user_id: user.id,
              certificate_id: certificateId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              amount: CERTIFICATE_PRICE
            });

            setIsPurchased(true);
            toast({
              title: "Payment Successful!",
              description: "You can now download your certificate."
            });
          } catch (error) {
            console.error('Payment verification error:', error);
            toast({
              title: "Payment Error",
              description: "There was an issue with your payment. Please contact support.",
              variant: "destructive"
            });
          }
        },
        prefill: {
          email: user.email
        },
        theme: {
          color: '#8B5CF6'
        }
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive"
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const captureCanvas = async () => {
    if (!certificateRef.current) throw new Error("Certificate ref not found");
    await new Promise(resolve => setTimeout(resolve, 500));
    return html2canvas(certificateRef.current, {
      scale: 3,
      backgroundColor: "#ffffff",
      useCORS: true,
      allowTaint: true,
      foreignObjectRendering: false,
      logging: false
    });
  };

  const downloadAsImage = async () => {
    if (!isPurchased) {
      toast({
        title: "Purchase Required",
        description: "Please purchase the certificate to download",
        variant: "destructive"
      });
      return;
    }
    if (!certificateRef.current) {
      toast({
        title: "Please wait",
        description: "Certificate is still loading...",
        variant: "destructive"
      });
      return;
    }
    setIsDownloading(true);
    try {
      const canvas = await captureCanvas();
      canvas.toBlob(blob => {
        if (!blob) throw new Error("Failed to create image blob");
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `certificate-${studentName.replace(/\s+/g, '-').toLowerCase()}-${certificateId}.png`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        toast({
          title: "Certificate Downloaded",
          description: "Your certificate has been saved as PNG."
        });
      }, 'image/png', 1.0);
    } catch (error) {
      toast({
        title: "Download Failed",
        description: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadAsJPG = async () => {
    if (!isPurchased) {
      toast({
        title: "Purchase Required",
        description: "Please purchase the certificate to download",
        variant: "destructive"
      });
      return;
    }
    if (!certificateRef.current) {
      toast({
        title: "Please wait",
        description: "Certificate is still loading...",
        variant: "destructive"
      });
      return;
    }
    setIsDownloading(true);
    try {
      const canvas = await captureCanvas();
      canvas.toBlob(blob => {
        if (!blob) throw new Error("Failed to create image blob");
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `certificate-${studentName.replace(/\s+/g, '-').toLowerCase()}-${certificateId}.jpg`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        toast({
          title: "Certificate Downloaded",
          description: "Your certificate has been saved as JPG."
        });
      }, 'image/jpeg', 0.95);
    } catch (error) {
      toast({
        title: "Download Failed",
        description: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadAsPDF = async () => {
    if (!isPurchased) {
      toast({
        title: "Purchase Required",
        description: "Please purchase the certificate to download",
        variant: "destructive"
      });
      return;
    }
    if (!certificateRef.current) {
      toast({
        title: "Please wait",
        description: "Certificate is still loading...",
        variant: "destructive"
      });
      return;
    }
    setIsDownloading(true);
    try {
      const canvas = await captureCanvas();
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgAspectRatio = canvas.width / canvas.height;
      let imgWidth = pageWidth - 20;
      let imgHeight = imgWidth / imgAspectRatio;
      if (imgHeight > pageHeight - 20) {
        imgHeight = pageHeight - 20;
        imgWidth = imgHeight * imgAspectRatio;
      }
      const xOffset = (pageWidth - imgWidth) / 2;
      const yOffset = (pageHeight - imgHeight) / 2;
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);
      pdf.save(`certificate-${studentName.replace(/\s+/g, '-').toLowerCase()}-${certificateId}.pdf`);
      toast({
        title: "Certificate Downloaded",
        description: "Your certificate has been saved as PDF."
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadAll = async () => {
    if (!isPurchased) {
      toast({
        title: "Purchase Required",
        description: "Please purchase the certificate to download",
        variant: "destructive"
      });
      return;
    }
    await downloadAsImage();
    setTimeout(() => downloadAsPDF(), 1000);
  };

  if (!isPassed) {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-card border-border/50 shadow-2xl">
        <CardContent className="text-center py-12">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-destructive/20 rounded-full flex items-center justify-center mb-4">
              <Award className="h-10 w-10 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Quiz Completed</h2>
            <p className="text-muted-foreground">You scored {score}/{totalQuestions} ({percentage}%)</p>
          </div>
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 mb-6">
            <p className="text-destructive font-semibold">You need at least 60% to earn a certificate.</p>
            <p className="text-muted-foreground mt-2">Don't worry! You can retake the quiz to improve your score.</p>
          </div>
          <Button onClick={() => window.location.reload()} className="bg-primary">Retake Quiz</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Certificate with Medal Layout */}
      <div ref={certificateRef} className="relative bg-white overflow-hidden shadow-2xl w-full" style={{
        aspectRatio: '1.414/1',
        minHeight: '280px'
      }}>
        {/* Decorative Border */}
        <div className="absolute inset-2 sm:inset-3 md:inset-4 border-2 border-gray-300"></div>
        <div className="absolute inset-3 sm:inset-4 md:inset-5 border border-gray-200"></div>

        {/* Corner Decorations */}
        <div className="absolute top-4 left-4 sm:top-5 sm:left-5 md:top-6 md:left-6 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-l-2 border-t-2 border-gray-400"></div>
        <div className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-r-2 border-t-2 border-gray-400"></div>
        <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 md:bottom-6 md:left-6 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-l-2 border-b-2 border-gray-400"></div>
        <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 md:bottom-6 md:right-6 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-r-2 border-b-2 border-gray-400"></div>

        {/* Main Content - Two Column Layout */}
        <div className="relative z-10 h-full flex">
          {/* Left Side - Details */}
          <div className="flex-1 flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-10">
            {/* Header */}
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-400 tracking-wider mb-1">
                vilver
              </h1>
              <p className="text-[8px] sm:text-[10px] md:text-xs text-gray-500 uppercase tracking-[0.2em]">
                Certificate of Completion
              </p>
            </div>

            {/* Certificate Content */}
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              {/* Date */}
              <p className="text-[8px] sm:text-[10px] md:text-xs text-gray-500">
                {completionDate.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>

              {/* This certifies */}
              <p className="text-[8px] sm:text-[10px] md:text-xs text-gray-500">
                This is to certify that
              </p>

              {/* Student Name */}
              <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-serif text-gray-800 border-b border-gray-300 pb-1 inline-block">
                {studentName}
              </h2>

              {/* Completion Text */}
              <p className="text-[8px] sm:text-[10px] md:text-xs text-gray-500">
                has successfully completed the course
              </p>

              {/* Course Name */}
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-800">
                {courseName}
              </h3>

              {/* Score Info */}
              <p className="text-[7px] sm:text-[9px] md:text-[11px] text-gray-500">
                with a score of <span className="font-semibold text-gray-700">{percentage}%</span>
              </p>
            </div>

            {/* Signature Section */}
            <div className="mt-2 sm:mt-4">
              <div className="max-w-[50%]">
                <div className="border-b border-gray-400 mb-1 pb-1">
                  <p className="text-sm sm:text-base md:text-lg italic text-gray-600 font-serif">Vilver</p>
                </div>
                <p className="text-[7px] sm:text-[8px] md:text-[10px] text-gray-500">Vilver Learning Platform</p>
              </div>
            </div>
          </div>

          {/* Right Side - Medal */}
          <div className="w-[35%] sm:w-[30%] flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 border-l border-gray-200 bg-gradient-to-br from-amber-50 to-orange-50">
            {/* Medal SVG */}
            <div className="relative mb-2 sm:mb-4">
              <svg viewBox="0 0 120 160" className="w-16 h-20 sm:w-20 sm:h-26 md:w-28 md:h-36 lg:w-32 lg:h-44">
                {/* Ribbon */}
                <polygon points="35,0 50,50 60,0" fill={medalInfo.border} opacity="0.8" />
                <polygon points="85,0 70,50 60,0" fill={medalInfo.border} opacity="0.9" />
                
                {/* Medal Circle Shadow */}
                <circle cx="60" cy="95" r="48" fill="rgba(0,0,0,0.1)" />
                
                {/* Medal Circle Outer */}
                <circle cx="60" cy="92" r="45" fill={medalInfo.fill} stroke={medalInfo.border} strokeWidth="4" />
                
                {/* Medal Inner Circle */}
                <circle cx="60" cy="92" r="35" fill="none" stroke={medalInfo.border} strokeWidth="2" opacity="0.6" />
                
                {/* Star in Medal */}
                <polygon points="60,55 67,78 92,78 72,92 79,115 60,102 41,115 48,92 28,78 53,78" fill="white" opacity="0.9" />
              </svg>
            </div>

            {/* Medal Type */}
            <p className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold mb-1" style={{
              color: medalInfo.textColor
            }}>
              {medalInfo.type}
            </p>

            {/* Medal Label */}
            <p className="text-[8px] sm:text-[10px] md:text-xs text-gray-500 mb-2 sm:mb-4">
              {medalInfo.label}
            </p>

            {/* Score Badge */}
            <div className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border-2 mb-2 sm:mb-4" style={{
              backgroundColor: medalInfo.bgColor,
              borderColor: medalInfo.border
            }}>
              <p className="text-sm sm:text-base md:text-lg font-bold" style={{
                color: medalInfo.textColor
              }}>
                {percentage}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment/Download Section */}
      <div className="mt-4 sm:mt-6 pb-20 sm:pb-16 md:pb-8 px-2">
        {checkingPurchase ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : !isPurchased ? (
          <div className="text-center space-y-4">
            <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 rounded-lg p-6">
              <Lock className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Unlock Your Certificate</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Pay ₹{CERTIFICATE_PRICE} to download your certificate in PNG, JPG, and PDF formats.
              </p>
              <Button 
                onClick={handlePayment} 
                disabled={isProcessingPayment}
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                {isProcessingPayment ? "Processing..." : `Pay ₹${CERTIFICATE_PRICE} to Download`}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            <Button onClick={downloadAsImage} disabled={isDownloading} variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50 text-gray-700 text-xs sm:text-sm">
              <FileImage className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              PNG
            </Button>
            
            <Button onClick={downloadAsJPG} disabled={isDownloading} variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50 text-gray-700 text-xs sm:text-sm">
              <FileImage className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              JPG
            </Button>
            
            <Button onClick={downloadAsPDF} disabled={isDownloading} variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50 text-gray-700 text-xs sm:text-sm">
              <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              PDF
            </Button>
            
            <Button onClick={downloadAll} disabled={isDownloading} size="sm" className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white shadow-lg text-xs sm:text-sm">
              <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              {isDownloading ? "Downloading..." : "Download All"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

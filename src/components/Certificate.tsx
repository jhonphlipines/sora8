import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Download, FileImage, FileText } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface CertificateProps {
  studentName: string;
  score: number;
  totalQuestions: number;
  courseName: string;
  completionDate: Date;
  certificateId: string;
}

// Base64 encoded logo for reliable rendering in downloads
const LOGO_URL = "https://img.icons8.com/color/480/vimeo.png";

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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [logoBase64, setLogoBase64] = useState<string>("");
  const percentage = Math.round(score / totalQuestions * 100);
  const isPassed = percentage >= 70;

  // Convert logo to base64 for reliable rendering in canvas
  useEffect(() => {
    const loadLogoAsBase64 = async () => {
      try {
        const response = await fetch(LOGO_URL);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogoBase64(reader.result as string);
          setImageLoaded(true);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Error loading logo:", error);
        setImageLoaded(true);
      }
    };
    loadLogoAsBase64();
  }, []);

  const captureCanvas = async () => {
    if (!certificateRef.current) throw new Error("Certificate ref not found");
    await new Promise(resolve => setTimeout(resolve, 300));
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
    if (!certificateRef.current || !imageLoaded) {
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
    if (!certificateRef.current || !imageLoaded) {
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
    if (!certificateRef.current || !imageLoaded) {
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
    await downloadAsImage();
    setTimeout(() => downloadAsPDF(), 1000);
  };
  if (!isPassed) {
    return <Card className="w-full max-w-2xl mx-auto bg-card border-border/50 shadow-2xl">
        <CardContent className="text-center py-12">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-destructive/20 rounded-full flex items-center justify-center mb-4">
              <Award className="h-10 w-10 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Quiz Completed</h2>
            <p className="text-muted-foreground">You scored {score}/{totalQuestions} ({percentage}%)</p>
          </div>
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 mb-6">
            <p className="text-destructive font-semibold">You need at least 70% to earn a certificate.</p>
            <p className="text-muted-foreground mt-2">Don't worry! You can retake the quiz to improve your score.</p>
          </div>
          <Button onClick={() => window.location.reload()} className="bg-primary">Retake Quiz</Button>
        </CardContent>
      </Card>;
  }
  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4">
      {/* Professional Certificate - Full width on mobile, landscape on desktop */}
      <div 
        ref={certificateRef} 
        className="relative bg-white overflow-hidden shadow-2xl w-full" 
        style={{ aspectRatio: '1.414/1' }}
      >
        {/* Outer Gold Border */}
        <div className="absolute inset-0 p-1 sm:p-2">
          <div className="absolute inset-1 sm:inset-2 border-2 sm:border-4 border-amber-600"></div>
          <div className="absolute inset-2 sm:inset-4 border sm:border-2 border-amber-500"></div>
          <div className="absolute inset-3 sm:inset-6 border border-amber-400"></div>
        </div>

        {/* Corner Ornaments */}
        <div className="absolute top-3 left-3 sm:top-6 sm:left-6 w-8 h-8 sm:w-16 sm:h-16">
          <svg viewBox="0 0 100 100" className="w-full h-full text-amber-600">
            <path d="M0 0 L30 0 L30 5 L5 5 L5 30 L0 30 Z" fill="currentColor" />
            <circle cx="20" cy="20" r="3" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute top-3 right-3 sm:top-6 sm:right-6 w-8 h-8 sm:w-16 sm:h-16 rotate-90">
          <svg viewBox="0 0 100 100" className="w-full h-full text-amber-600">
            <path d="M0 0 L30 0 L30 5 L5 5 L5 30 L0 30 Z" fill="currentColor" />
            <circle cx="20" cy="20" r="3" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 w-8 h-8 sm:w-16 sm:h-16 -rotate-90">
          <svg viewBox="0 0 100 100" className="w-full h-full text-amber-600">
            <path d="M0 0 L30 0 L30 5 L5 5 L5 30 L0 30 Z" fill="currentColor" />
            <circle cx="20" cy="20" r="3" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 w-8 h-8 sm:w-16 sm:h-16 rotate-180">
          <svg viewBox="0 0 100 100" className="w-full h-full text-amber-600">
            <path d="M0 0 L30 0 L30 5 L5 5 L5 30 L0 30 Z" fill="currentColor" />
            <circle cx="20" cy="20" r="3" fill="currentColor" />
          </svg>
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col items-center justify-between py-4 sm:py-8 md:py-12 px-4 sm:px-8 md:px-16">
          {/* Header with Logo */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 sm:border-4 border-amber-500 shadow-lg overflow-hidden bg-white mb-2 sm:mb-4">
              {logoBase64 ? (
                <img 
                  src={logoBase64} 
                  alt="Certificate Logo" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <Award className="w-6 h-6 sm:w-10 sm:h-10 text-amber-600" />
              )}
            </div>
            <h1 className="text-xl sm:text-3xl md:text-5xl font-serif font-bold text-gray-800 tracking-wide">
              CERTIFICATE
            </h1>
            <p className="text-xs sm:text-lg md:text-xl text-amber-700 font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase mt-0.5 sm:mt-1">
              of Completion
            </p>
            <div className="flex items-center justify-center gap-2 sm:gap-3 mt-2 sm:mt-4">
              <div className="h-px w-8 sm:w-16 md:w-24 bg-gradient-to-r from-transparent to-amber-500"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-500 rotate-45"></div>
              <div className="h-px w-8 sm:w-16 md:w-24 bg-gradient-to-l from-transparent to-amber-500"></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center flex-1 flex flex-col justify-center py-2 sm:py-4">
            <p className="text-gray-600 text-xs sm:text-sm md:text-lg italic mb-1 sm:mb-2">This is to certify that</p>
            
            <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 border-b-2 border-amber-500 pb-1 sm:pb-2 px-2 sm:px-4 inline-block mx-auto">
              {studentName}
            </h2>
            
            <p className="text-gray-600 text-xs sm:text-sm md:text-lg italic mt-2 sm:mt-4 mb-1 sm:mb-2">has successfully completed the course</p>
            
            <h3 className="text-sm sm:text-xl md:text-3xl font-semibold text-amber-700 max-w-2xl mx-auto leading-tight px-2">
              {courseName}
            </h3>
            
            <p className="text-gray-600 text-xs sm:text-sm md:text-base mt-2 sm:mt-4">
              with a score of <span className="font-bold text-green-600">{percentage}%</span>
            </p>
          </div>

          {/* Footer */}
          <div className="w-full">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-4">
              <div className="h-px w-8 sm:w-16 md:w-24 bg-gradient-to-r from-transparent to-amber-500"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-500 rotate-45"></div>
              <div className="h-px w-8 sm:w-16 md:w-24 bg-gradient-to-l from-transparent to-amber-500"></div>
            </div>
            
            <div className="flex flex-row items-center justify-between gap-2 sm:gap-4">
              <div className="text-left">
                <p className="text-[8px] sm:text-xs text-gray-500 uppercase tracking-wider">Date of Issue</p>
                <p className="text-[10px] sm:text-sm md:text-base font-semibold text-gray-800">
                  {completionDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border sm:border-2 border-amber-400 flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100">
                  <Award className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 text-amber-600" />
                </div>
                <p className="text-[8px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">Verified</p>
              </div>
              
              <div className="text-right">
                <p className="text-[8px] sm:text-xs text-gray-500 uppercase tracking-wider">Certificate ID</p>
                <p className="text-[8px] sm:text-xs md:text-sm font-mono text-gray-700">{certificateId.slice(0, 12)}</p>
              </div>
            </div>
            
            <div className="text-center mt-2 sm:mt-4">
              <p className="text-[8px] sm:text-xs text-gray-400">Issued by CodeCert Labs • Verified Digital Certificate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Download Buttons */}
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mt-6 sm:mt-8 pb-24 sm:pb-20 md:pb-8">
        <Button 
          onClick={downloadAsImage} 
          disabled={isDownloading || !imageLoaded} 
          variant="outline" 
          size="sm"
          className="border-amber-300 hover:bg-amber-50 text-amber-700 text-xs sm:text-sm"
        >
          <FileImage className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          PNG
        </Button>
        
        <Button 
          onClick={downloadAsJPG} 
          disabled={isDownloading || !imageLoaded} 
          variant="outline" 
          size="sm"
          className="border-amber-300 hover:bg-amber-50 text-amber-700 text-xs sm:text-sm"
        >
          <FileImage className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          JPG
        </Button>
        
        <Button 
          onClick={downloadAsPDF} 
          disabled={isDownloading || !imageLoaded} 
          variant="outline" 
          size="sm"
          className="border-amber-300 hover:bg-amber-50 text-amber-700 text-xs sm:text-sm"
        >
          <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          PDF
        </Button>
        
        <Button 
          onClick={downloadAll} 
          disabled={isDownloading || !imageLoaded} 
          size="sm"
          className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg text-xs sm:text-sm"
        >
          <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          {isDownloading ? "..." : !imageLoaded ? "Loading..." : "All"}
        </Button>
      </div>
    </div>
  );
};
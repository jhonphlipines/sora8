import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Download, FileImage, FileText } from "lucide-react";
import { useRef, useState } from "react";
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
  const percentage = Math.round(score / totalQuestions * 100);
  const isPassed = percentage >= 70;

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
            <p className="text-destructive font-semibold">You need at least 70% to earn a certificate.</p>
            <p className="text-muted-foreground mt-2">Don't worry! You can retake the quiz to improve your score.</p>
          </div>
          <Button onClick={() => window.location.reload()} className="bg-primary">Retake Quiz</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Simple Coursera-style Certificate */}
      <div 
        ref={certificateRef} 
        className="relative bg-white overflow-hidden shadow-2xl w-full" 
        style={{ aspectRatio: '1.414/1', minHeight: '280px' }}
      >
        {/* Wavy Pattern Border - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-12 md:h-16 opacity-10">
          <svg viewBox="0 0 1200 100" className="w-full h-full" preserveAspectRatio="none">
            <path 
              d="M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 C1150,100 1200,80 1200,50 L1200,100 L0,100 Z" 
              fill="#9ca3af"
            />
            <path 
              d="M0,60 C150,110 350,10 500,60 C650,110 850,10 1000,60 C1150,110 1200,90 1200,60 L1200,100 L0,100 Z" 
              fill="#6b7280"
            />
          </svg>
        </div>

        {/* Simple Border */}
        <div className="absolute inset-2 sm:inset-3 md:inset-4 border border-gray-300"></div>

        {/* Corner Ribbon - COURSE CERTIFICATE */}
        <div className="absolute top-0 right-0 w-24 sm:w-32 md:w-44 lg:w-52">
          <svg viewBox="0 0 200 200" className="w-full h-auto">
            {/* Ribbon Background */}
            <polygon points="60,0 200,0 200,140 200,200 140,200 0,60 0,0" fill="#6b7280" />
            <polygon points="70,0 200,0 200,130 130,200 0,70 0,0" fill="#9ca3af" />
            
            {/* COURSE CERTIFICATE Text */}
            <text 
              x="100" 
              y="50" 
              textAnchor="middle" 
              fill="white" 
              fontSize="14" 
              fontWeight="bold" 
              fontFamily="Arial, sans-serif"
              letterSpacing="1"
            >
              COURSE
            </text>
            <text 
              x="100" 
              y="68" 
              textAnchor="middle" 
              fill="white" 
              fontSize="12" 
              fontWeight="bold" 
              fontFamily="Arial, sans-serif"
              letterSpacing="1"
            >
              CERTIFICATE
            </text>
          </svg>
        </div>

        {/* Vilver Seal in Ribbon Area */}
        <div className="absolute top-[45px] right-[25px] sm:top-[60px] sm:right-[35px] md:top-[85px] md:right-[50px] lg:top-[100px] lg:right-[60px]">
          <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full border-2 sm:border-3 md:border-4 border-gray-500 bg-white flex items-center justify-center">
            <div className="text-center">
              <p className="text-[5px] sm:text-[7px] md:text-[9px] lg:text-xs text-gray-500 uppercase tracking-wider">Vilver</p>
              <p className="text-[4px] sm:text-[5px] md:text-[6px] lg:text-[8px] text-gray-400 uppercase">Learning</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col p-4 sm:p-6 md:p-10 lg:p-12">
          {/* Vilver Name - Top Left */}
          <div className="mb-2 sm:mb-4 md:mb-6">
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-400 tracking-wider">
              vilver
            </h1>
          </div>

          {/* Date */}
          <div className="mb-2 sm:mb-3 md:mb-4">
            <p className="text-[9px] sm:text-xs md:text-sm text-gray-500">
              {completionDate.toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric'
              })}
            </p>
          </div>

          {/* Student Name */}
          <div className="mb-1 sm:mb-2">
            <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-serif text-gray-800 border-b border-gray-300 pb-1 inline-block">
              {studentName}
            </h2>
          </div>

          {/* Has successfully completed */}
          <p className="text-[9px] sm:text-xs md:text-sm text-gray-500 mb-2 sm:mb-3 md:mb-4">
            has successfully completed
          </p>

          {/* Course Name */}
          <div className="mb-2 sm:mb-3 md:mb-4">
            <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 max-w-[70%]">
              {courseName}
            </h3>
          </div>

          {/* Description */}
          <p className="text-[8px] sm:text-[10px] md:text-xs text-gray-500 max-w-[60%] leading-relaxed mb-2 sm:mb-4 md:mb-6">
            an online course authorized by Vilver Learning and offered through Vilver Platform with a score of {percentage}%
          </p>

          {/* Signature Section */}
          <div className="mt-auto mb-4 sm:mb-6 md:mb-8">
            <div className="max-w-[40%]">
              {/* Signature Line */}
              <div className="border-b border-gray-400 mb-1 pb-1">
                <p className="text-sm sm:text-lg md:text-xl italic text-gray-600 font-serif">Vilver</p>
              </div>
              <p className="text-[7px] sm:text-[9px] md:text-xs text-gray-500">Vilver Learning</p>
              <p className="text-[7px] sm:text-[9px] md:text-xs text-gray-400">Learning Platform</p>
            </div>
          </div>

          {/* Verification Footer */}
          <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-4 right-4 sm:left-6 sm:right-6 md:left-10 md:right-10">
            <div className="text-center">
              <p className="text-[7px] sm:text-[9px] md:text-xs text-blue-600">
                Verify at vilver.com/verify/{certificateId.slice(0, 12).toUpperCase()}
              </p>
              <p className="text-[6px] sm:text-[8px] md:text-[10px] text-gray-400 mt-0.5">
                Vilver has confirmed the identity of this individual and their participation in the course.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Download Buttons */}
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mt-4 sm:mt-6 pb-20 sm:pb-16 md:pb-8 px-2">
        <Button 
          onClick={downloadAsImage} 
          disabled={isDownloading} 
          variant="outline" 
          size="sm"
          className="border-gray-300 hover:bg-gray-50 text-gray-700 text-xs sm:text-sm"
        >
          <FileImage className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          PNG
        </Button>
        
        <Button 
          onClick={downloadAsJPG} 
          disabled={isDownloading} 
          variant="outline" 
          size="sm"
          className="border-gray-300 hover:bg-gray-50 text-gray-700 text-xs sm:text-sm"
        >
          <FileImage className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          JPG
        </Button>
        
        <Button 
          onClick={downloadAsPDF} 
          disabled={isDownloading} 
          variant="outline" 
          size="sm"
          className="border-gray-300 hover:bg-gray-50 text-gray-700 text-xs sm:text-sm"
        >
          <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          PDF
        </Button>
        
        <Button 
          onClick={downloadAll} 
          disabled={isDownloading} 
          size="sm"
          className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white shadow-lg text-xs sm:text-sm"
        >
          <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          {isDownloading ? "Downloading..." : "Download All"}
        </Button>
      </div>
    </div>
  );
};

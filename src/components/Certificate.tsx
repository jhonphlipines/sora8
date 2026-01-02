import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Download, FileImage, FileText } from "lucide-react";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import certificateLogo from "@/assets/certificate-logo.jpg";

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

  // Extract course/certification field from courseName (e.g., "Java Certification", "Python Basics")
  const getCertificationField = () => {
    const lowerName = courseName.toLowerCase();
    if (lowerName.includes('java')) return 'Java';
    if (lowerName.includes('python')) return 'Python';
    if (lowerName.includes('javascript') || lowerName.includes('js')) return 'JavaScript';
    if (lowerName.includes('react')) return 'React';
    if (lowerName.includes('node')) return 'Node.js';
    if (lowerName.includes('html')) return 'HTML';
    if (lowerName.includes('css')) return 'CSS';
    if (lowerName.includes('sql')) return 'SQL';
    if (lowerName.includes('c++') || lowerName.includes('cpp')) return 'C++';
    if (lowerName.includes('c#') || lowerName.includes('csharp')) return 'C#';
    if (lowerName.includes('php')) return 'PHP';
    if (lowerName.includes('ruby')) return 'Ruby';
    if (lowerName.includes('go') || lowerName.includes('golang')) return 'Go';
    if (lowerName.includes('swift')) return 'Swift';
    if (lowerName.includes('kotlin')) return 'Kotlin';
    if (lowerName.includes('typescript') || lowerName.includes('ts')) return 'TypeScript';
    return 'Programming';
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
    <div className="w-full max-w-5xl mx-auto">
      {/* Professional Certificate - Full coverage on all devices */}
      <div 
        ref={certificateRef} 
        className="relative bg-white overflow-hidden shadow-2xl w-full" 
        style={{ aspectRatio: '1.414/1', minHeight: '280px' }}
      >
        {/* Outer Gold Border */}
        <div className="absolute inset-0">
          <div className="absolute inset-[3px] sm:inset-2 border-[3px] sm:border-4 border-amber-600"></div>
          <div className="absolute inset-[8px] sm:inset-4 border-[2px] sm:border-2 border-amber-500"></div>
          <div className="absolute inset-[13px] sm:inset-6 border border-amber-400"></div>
        </div>

        {/* Corner Ornaments */}
        <div className="absolute top-[14px] left-[14px] sm:top-6 sm:left-6 w-6 h-6 sm:w-12 sm:h-12 md:w-16 md:h-16">
          <svg viewBox="0 0 100 100" className="w-full h-full text-amber-600">
            <path d="M0 0 L30 0 L30 5 L5 5 L5 30 L0 30 Z" fill="currentColor" />
            <circle cx="20" cy="20" r="3" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute top-[14px] right-[14px] sm:top-6 sm:right-6 w-6 h-6 sm:w-12 sm:h-12 md:w-16 md:h-16 rotate-90">
          <svg viewBox="0 0 100 100" className="w-full h-full text-amber-600">
            <path d="M0 0 L30 0 L30 5 L5 5 L5 30 L0 30 Z" fill="currentColor" />
            <circle cx="20" cy="20" r="3" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute bottom-[14px] left-[14px] sm:bottom-6 sm:left-6 w-6 h-6 sm:w-12 sm:h-12 md:w-16 md:h-16 -rotate-90">
          <svg viewBox="0 0 100 100" className="w-full h-full text-amber-600">
            <path d="M0 0 L30 0 L30 5 L5 5 L5 30 L0 30 Z" fill="currentColor" />
            <circle cx="20" cy="20" r="3" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute bottom-[14px] right-[14px] sm:bottom-6 sm:right-6 w-6 h-6 sm:w-12 sm:h-12 md:w-16 md:h-16 rotate-180">
          <svg viewBox="0 0 100 100" className="w-full h-full text-amber-600">
            <path d="M0 0 L30 0 L30 5 L5 5 L5 30 L0 30 Z" fill="currentColor" />
            <circle cx="20" cy="20" r="3" fill="currentColor" />
          </svg>
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col items-center justify-between py-[18px] sm:py-6 md:py-10 px-[20px] sm:px-8 md:px-16">
          {/* Header with Logo */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 rounded-full border-2 sm:border-4 border-amber-500 shadow-lg overflow-hidden bg-white mb-1 sm:mb-3">
              <img 
                src={certificateLogo} 
                alt="Vilver Logo" 
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </div>
            <h1 className="text-base sm:text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-800 tracking-wide">
              CERTIFICATE
            </h1>
            <p className="text-[10px] sm:text-base md:text-xl text-amber-700 font-medium tracking-[0.15em] sm:tracking-[0.3em] uppercase">
              of Completion
            </p>
            <div className="flex items-center justify-center gap-1 sm:gap-3 mt-1 sm:mt-3">
              <div className="h-px w-6 sm:w-12 md:w-24 bg-gradient-to-r from-transparent to-amber-500"></div>
              <div className="w-1 h-1 sm:w-2 sm:h-2 bg-amber-500 rotate-45"></div>
              <div className="h-px w-6 sm:w-12 md:w-24 bg-gradient-to-l from-transparent to-amber-500"></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center flex-1 flex flex-col justify-center py-1 sm:py-3">
            <p className="text-gray-600 text-[9px] sm:text-sm md:text-lg italic mb-0.5 sm:mb-2">This is to certify that</p>
            
            <h2 className="text-sm sm:text-xl md:text-3xl lg:text-4xl font-serif font-bold text-gray-900 border-b-2 border-amber-500 pb-0.5 sm:pb-2 px-2 sm:px-4 inline-block mx-auto">
              {studentName}
            </h2>
            
            <p className="text-gray-600 text-[9px] sm:text-sm md:text-lg italic mt-1 sm:mt-3 mb-0.5 sm:mb-1">has successfully completed the course</p>
            
            <h3 className="text-[11px] sm:text-lg md:text-2xl lg:text-3xl font-semibold text-amber-700 max-w-2xl mx-auto leading-tight">
              {courseName}
            </h3>

            {/* Certification Field Badge */}
            <div className="mt-1 sm:mt-3">
              <span className="inline-block bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 text-[9px] sm:text-sm md:text-base font-semibold px-2 sm:px-4 py-0.5 sm:py-1 rounded-full border border-amber-300">
                {getCertificationField()} Certification
              </span>
            </div>
            
            <p className="text-gray-600 text-[9px] sm:text-sm md:text-base mt-1 sm:mt-2">
              with a score of <span className="font-bold text-green-600">{percentage}%</span>
            </p>
          </div>

          {/* Footer */}
          <div className="w-full">
            <div className="flex items-center justify-center gap-1 sm:gap-3 mb-1 sm:mb-3">
              <div className="h-px w-6 sm:w-12 md:w-24 bg-gradient-to-r from-transparent to-amber-500"></div>
              <div className="w-1 h-1 sm:w-2 sm:h-2 bg-amber-500 rotate-45"></div>
              <div className="h-px w-6 sm:w-12 md:w-24 bg-gradient-to-l from-transparent to-amber-500"></div>
            </div>
            
            <div className="flex flex-row items-center justify-between gap-1 sm:gap-4">
              <div className="text-left flex-1">
                <p className="text-[7px] sm:text-xs text-gray-500 uppercase tracking-wider">Date of Issue</p>
                <p className="text-[9px] sm:text-sm md:text-base font-semibold text-gray-800">
                  {completionDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
              
              <div className="text-center flex-shrink-0">
                <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full border sm:border-2 border-amber-400 flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 overflow-hidden">
                  <img 
                    src={certificateLogo} 
                    alt="Vilver Seal" 
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                </div>
                <p className="text-[7px] sm:text-xs text-gray-500 mt-0.5">Verified</p>
              </div>
              
              <div className="text-right flex-1">
                <p className="text-[7px] sm:text-xs text-gray-500 uppercase tracking-wider">Certificate ID</p>
                <p className="text-[7px] sm:text-xs md:text-sm font-mono text-gray-700 break-all">{certificateId.slice(0, 10)}</p>
              </div>
            </div>
            
            <div className="text-center mt-1 sm:mt-3">
              <p className="text-[7px] sm:text-xs text-gray-400">Issued by Vilver Learning • Verified Digital Certificate</p>
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
          className="border-amber-300 hover:bg-amber-50 text-amber-700 text-xs sm:text-sm"
        >
          <FileImage className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          PNG
        </Button>
        
        <Button 
          onClick={downloadAsJPG} 
          disabled={isDownloading} 
          variant="outline" 
          size="sm"
          className="border-amber-300 hover:bg-amber-50 text-amber-700 text-xs sm:text-sm"
        >
          <FileImage className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          JPG
        </Button>
        
        <Button 
          onClick={downloadAsPDF} 
          disabled={isDownloading} 
          variant="outline" 
          size="sm"
          className="border-amber-300 hover:bg-amber-50 text-amber-700 text-xs sm:text-sm"
        >
          <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          PDF
        </Button>
        
        <Button 
          onClick={downloadAll} 
          disabled={isDownloading} 
          size="sm"
          className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg text-xs sm:text-sm"
        >
          <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          {isDownloading ? "Downloading..." : "Download All"}
        </Button>
      </div>
    </div>
  );
};

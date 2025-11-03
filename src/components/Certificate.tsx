import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Download, Calendar, CheckCircle, FileImage, FileText, Code } from "lucide-react";
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
  const {
    toast
  } = useToast();
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const percentage = Math.round(score / totalQuestions * 100);
  const isPassed = percentage >= 70;
  const downloadAsImage = async () => {
    if (!certificateRef.current) {
      console.error("Certificate ref not found");
      return;
    }
    setIsDownloading(true);
    try {
      console.log("Starting image download...");
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        allowTaint: false,
        foreignObjectRendering: false,
        logging: false,
        x: 0,
        y: 0,
        height: certificateRef.current.offsetHeight,
        width: certificateRef.current.offsetWidth,
        scrollX: 0,
        scrollY: 0,
        ignoreElements: (element) => {
          return element.classList.contains('no-print');
        }
      });
      console.log("Canvas created, converting to blob...");
      canvas.toBlob(blob => {
        if (!blob) {
          throw new Error("Failed to create image blob");
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `certificate-${studentName.replace(/\s+/g, '-').toLowerCase()}-${certificateId}.png`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        console.log("Image download completed");
        toast({
          title: "Certificate Downloaded",
          description: "Your certificate has been saved as an image."
        });
      }, 'image/png', 1.0);
    } catch (error) {
      console.error("Download error:", error);
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
      console.error("Certificate ref not found");
      return;
    }
    setIsDownloading(true);
    try {
      console.log("Starting PDF download...");
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        allowTaint: false,
        foreignObjectRendering: false,
        logging: false,
        x: 0,
        y: 0,
        height: certificateRef.current.offsetHeight,
        width: certificateRef.current.offsetWidth,
        scrollX: 0,
        scrollY: 0,
        ignoreElements: (element) => {
          return element.classList.contains('no-print');
        }
      });
      console.log("Canvas created for PDF, generating PDF...");
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Calculate dimensions to fit the square certificate on A4
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgAspectRatio = canvas.width / canvas.height;
      let imgWidth = pageWidth - 20; // 10mm margin on each side
      let imgHeight = imgWidth / imgAspectRatio;

      // Center the image on the page
      const xOffset = (pageWidth - imgWidth) / 2;
      const yOffset = (pageHeight - imgHeight) / 2;
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);
      pdf.save(`certificate-${studentName.replace(/\s+/g, '-').toLowerCase()}-${certificateId}.pdf`);
      console.log("PDF download completed");
      toast({
        title: "Certificate Downloaded",
        description: "Your certificate has been saved as a PDF."
      });
    } catch (error) {
      console.error("PDF download error:", error);
      toast({
        title: "Download Failed",
        description: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };
  const downloadBatch = async () => {
    await downloadAsImage();
    setTimeout(() => {
      downloadAsPDF();
    }, 1000);
  };
  if (!isPassed) {
    return <Card className="w-full max-w-2xl mx-auto bg-[var(--gradient-card)] border-border/50 shadow-2xl">
        <CardContent className="text-center py-12">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-quiz-incorrect/20 rounded-full flex items-center justify-center mb-4">
              <Award className="h-10 w-10 text-quiz-incorrect" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Quiz Completed</h2>
            <p className="text-muted-foreground">
              You scored {score}/{totalQuestions} ({percentage}%)
            </p>
          </div>
          
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 mb-6">
            <p className="text-destructive font-semibold">
              You need at least 70% to earn a certificate.
            </p>
            <p className="text-muted-foreground mt-2">
              Don't worry! You can retake the quiz to improve your score.
            </p>
          </div>
          
          <Button onClick={() => window.location.reload()} className="bg-[var(--gradient-primary)] border-0">
            Retake Quiz
          </Button>
        </CardContent>
      </Card>;
  }
  return <div className="w-full max-w-4xl mx-auto">
      {/* Rectangular Certificate Design */}
      <div ref={certificateRef} className="relative bg-white overflow-hidden rounded-3xl shadow-2xl border border-border/20 aspect-square w-full m-0 p-0">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-6 left-6 w-20 h-20 bg-purple-100 rounded-full blur-2xl"></div>
            <div className="absolute bottom-8 right-8 w-16 h-16 bg-blue-100 rounded-full blur-xl"></div>
            <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-purple-50 rounded-full blur-lg"></div>
          </div>
          
          {/* Decorative Corner Ornaments */}
          {/* Top Left Corner */}
          <div className="absolute top-0 left-0 p-4">
            <div className="relative">
              <div className="w-8 h-8 border-l-2 border-t-2 border-purple-400"></div>
              <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-purple-300"></div>
              <div className="absolute top-2 left-2 w-1 h-1 bg-purple-400 rounded-full"></div>
              <div className="absolute top-6 left-1 w-6 h-px bg-gradient-to-r from-purple-300 to-transparent"></div>
              <div className="absolute top-1 left-6 w-px h-6 bg-gradient-to-b from-purple-300 to-transparent"></div>
            </div>
          </div>
          
          {/* Top Right Corner */}
          <div className="absolute top-0 right-0 p-4">
            <div className="relative">
              <div className="w-8 h-8 border-r-2 border-t-2 border-purple-400"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-purple-300"></div>
              <div className="absolute top-2 right-2 w-1 h-1 bg-purple-400 rounded-full"></div>
              <div className="absolute top-6 right-1 w-6 h-px bg-gradient-to-l from-purple-300 to-transparent"></div>
              <div className="absolute top-1 right-6 w-px h-6 bg-gradient-to-b from-purple-300 to-transparent"></div>
            </div>
          </div>
          
          {/* Bottom Left Corner */}
          <div className="absolute bottom-0 left-0 p-4">
            <div className="relative">
              <div className="w-8 h-8 border-l-2 border-b-2 border-purple-400"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-purple-300"></div>
              <div className="absolute bottom-2 left-2 w-1 h-1 bg-purple-400 rounded-full"></div>
              <div className="absolute bottom-6 left-1 w-6 h-px bg-gradient-to-r from-purple-300 to-transparent"></div>
              <div className="absolute bottom-1 left-6 w-px h-6 bg-gradient-to-t from-purple-300 to-transparent"></div>
            </div>
          </div>
          
          {/* Bottom Right Corner */}
          <div className="absolute bottom-0 right-0 p-4">
            <div className="relative">
              <div className="w-8 h-8 border-r-2 border-b-2 border-purple-400"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-purple-300"></div>
              <div className="absolute bottom-2 right-2 w-1 h-1 bg-purple-400 rounded-full"></div>
              <div className="absolute bottom-6 right-1 w-6 h-px bg-gradient-to-l from-purple-300 to-transparent"></div>
              <div className="absolute bottom-1 right-6 w-px h-6 bg-gradient-to-t from-purple-300 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-3 md:p-4 h-full flex flex-col justify-between">
          {/* Logo at Top */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <Code className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-gray-800 leading-none">CodeCert</p>
              <p className="text-xs text-gray-600 leading-none">Labs</p>
            </div>
          </div>

          {/* Header Section */}
          <div className="text-center pt-8">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-lg mb-4 transform rotate-3">
              <Award className="h-8 w-8 md:h-10 md:w-10 text-white" />
            </div>
            
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-bold">
                  Certificate
                </span>
              </h1>
              <p className="text-sm md:text-base font-medium text-gray-600 tracking-wider uppercase">
                of Achievement
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center my-4">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-full max-w-32"></div>
            <div className="mx-3 w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-full max-w-32"></div>
          </div>

          {/* Main Content */}
          <div className="text-center space-y-4 flex-1 flex flex-col justify-center">
            <div className="space-y-2">
              <p className="text-sm md:text-base text-gray-600 font-light">
                This certifies that
              </p>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                {studentName}
              </h2>
            </div>

            <div className="space-y-2">
              <p className="text-sm md:text-base text-gray-600 font-light">
                has successfully mastered
              </p>
              <h3 className="text-base md:text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent leading-relaxed px-2">
                {courseName}
              </h3>
            </div>

            {/* Achievement Stats */}
            <div className="flex items-center justify-center gap-6 md:gap-8 pt-4">
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-green-50 rounded-xl md:rounded-2xl mb-2 group-hover:scale-105 transition-transform">
                  <CheckCircle className="h-6 w-6 md:h-7 md:w-7 text-green-600" />
                </div>
                <div className="text-xl md:text-2xl font-bold text-green-600 mb-1">{percentage}%</div>
                <p className="text-xs md:text-sm text-gray-600 font-medium">Score</p>
              </div>
              
              <div className="w-px h-12 md:h-14 bg-gray-300"></div>
              
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-purple-50 rounded-xl md:rounded-2xl mb-2 group-hover:scale-105 transition-transform">
                  <Calendar className="h-6 w-6 md:h-7 md:w-7 text-purple-600" />
                </div>
                <div className="text-sm md:text-base font-semibold text-gray-900 mb-1">
                  {completionDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
                </div>
                <p className="text-xs md:text-sm text-gray-600 font-medium">Completed</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="text-center mb-4">
              <p className="text-xs md:text-sm text-gray-600 mb-1">
                Certificate ID: <span className="font-mono font-medium text-gray-800">{certificateId}</span>
              </p>
              <p className="text-xs text-gray-500">
                Verified by CodeCert Labs Programming Platform
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 justify-center no-print">
              <Button onClick={downloadAsImage} disabled={isDownloading} variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50 text-purple-700 flex-1 sm:flex-none">
                <FileImage className="h-3 w-3 mr-1" />
                PNG
              </Button>
              
              <Button onClick={downloadAsPDF} disabled={isDownloading} variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50 text-purple-700 flex-1 sm:flex-none">
                <FileText className="h-3 w-3 mr-1" />
                PDF
              </Button>
              
              <Button onClick={downloadBatch} disabled={isDownloading} size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex-1 sm:flex-none">
                <Download className="h-3 w-3 mr-1" />
                {isDownloading ? "..." : "Both"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Download, Calendar, CheckCircle, FileImage, FileText } from "lucide-react";
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
      <div ref={certificateRef} className="relative bg-white dark:bg-background overflow-hidden rounded-3xl shadow-2xl border border-border/20 aspect-square w-full m-0 p-0">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-6 left-6 w-20 h-20 bg-primary/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-8 right-8 w-16 h-16 bg-secondary/10 rounded-full blur-xl"></div>
            <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-accent/10 rounded-full blur-lg"></div>
          </div>
          
          {/* Decorative Corner Ornaments */}
          {/* Top Left Corner */}
          <div className="absolute top-0 left-0 p-4">
            <div className="relative">
              <div className="w-8 h-8 border-l-2 border-t-2 border-primary/30"></div>
              <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-primary/20"></div>
              <div className="absolute top-2 left-2 w-1 h-1 bg-primary/40 rounded-full"></div>
              <div className="absolute top-6 left-1 w-6 h-px bg-gradient-to-r from-primary/30 to-transparent"></div>
              <div className="absolute top-1 left-6 w-px h-6 bg-gradient-to-b from-primary/30 to-transparent"></div>
            </div>
          </div>
          
          {/* Top Right Corner */}
          <div className="absolute top-0 right-0 p-4">
            <div className="relative">
              <div className="w-8 h-8 border-r-2 border-t-2 border-primary/30"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-primary/20"></div>
              <div className="absolute top-2 right-2 w-1 h-1 bg-primary/40 rounded-full"></div>
              <div className="absolute top-6 right-1 w-6 h-px bg-gradient-to-l from-primary/30 to-transparent"></div>
              <div className="absolute top-1 right-6 w-px h-6 bg-gradient-to-b from-primary/30 to-transparent"></div>
            </div>
          </div>
          
          {/* Bottom Left Corner */}
          <div className="absolute bottom-0 left-0 p-4">
            <div className="relative">
              <div className="w-8 h-8 border-l-2 border-b-2 border-primary/30"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-primary/20"></div>
              <div className="absolute bottom-2 left-2 w-1 h-1 bg-primary/40 rounded-full"></div>
              <div className="absolute bottom-6 left-1 w-6 h-px bg-gradient-to-r from-primary/30 to-transparent"></div>
              <div className="absolute bottom-1 left-6 w-px h-6 bg-gradient-to-t from-primary/30 to-transparent"></div>
            </div>
          </div>
          
          {/* Bottom Right Corner */}
          <div className="absolute bottom-0 right-0 p-4">
            <div className="relative">
              <div className="w-8 h-8 border-r-2 border-b-2 border-primary/30"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-primary/20"></div>
              <div className="absolute bottom-2 right-2 w-1 h-1 bg-primary/40 rounded-full"></div>
              <div className="absolute bottom-6 right-1 w-6 h-px bg-gradient-to-l from-primary/30 to-transparent"></div>
              <div className="absolute bottom-1 right-6 w-px h-6 bg-gradient-to-t from-primary/30 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-3 md:p-4 h-full flex flex-col justify-between">
          {/* Header Section */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-lg mb-4 transform rotate-3">
              <Award className="h-8 w-8 md:h-10 md:w-10 text-white" />
            </div>
            
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                <span className="text-primary font-bold">
                  Certificate
                </span>
              </h1>
              <p className="text-sm md:text-base font-medium text-muted-foreground tracking-wider uppercase">
                of Achievement
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center my-4">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent w-full max-w-32"></div>
            <div className="mx-3 w-1.5 h-1.5 bg-primary/30 rounded-full"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent w-full max-w-32"></div>
          </div>

          {/* Main Content */}
          <div className="text-center space-y-4 flex-1 flex flex-col justify-center">
            <div className="space-y-2">
              <p className="text-sm md:text-base text-muted-foreground font-light">
                This certifies that
              </p>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                {studentName}
              </h2>
            </div>

            <div className="space-y-2">
              <p className="text-sm md:text-base text-muted-foreground font-light">
                has successfully mastered
              </p>
              <h3 className="text-base md:text-xl font-semibold text-primary leading-relaxed px-2">
                {courseName}
              </h3>
            </div>

            {/* Achievement Stats */}
            <div className="flex items-center justify-center gap-6 md:gap-8 pt-4">
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-quiz-correct/10 rounded-xl md:rounded-2xl mb-2 group-hover:scale-105 transition-transform">
                  <CheckCircle className="h-6 w-6 md:h-7 md:w-7 text-quiz-correct" />
                </div>
                <div className="text-xl md:text-2xl font-bold text-quiz-correct mb-1">{percentage}%</div>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">Score</p>
              </div>
              
              <div className="w-px h-12 md:h-14 bg-border/50"></div>
              
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-xl md:rounded-2xl mb-2 group-hover:scale-105 transition-transform">
                  <Calendar className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                </div>
                <div className="text-sm md:text-base font-semibold text-foreground mb-1">
                  {completionDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
                </div>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">Completed</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border/30 pt-4 mt-4">
            <div className="text-center mb-4 text-sky-400">
              <p className="text-xs md:text-sm text-muted-foreground mb-1">
                Certificate ID: <span className="font-mono font-medium">{certificateId}</span>
              </p>
              <p className="text-xs text-muted-foreground/70">
                Verified by Programming Platform
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 justify-center no-print">
              <Button onClick={downloadAsImage} disabled={isDownloading} variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5 flex-1 sm:flex-none">
                <FileImage className="h-3 w-3 mr-1" />
                PNG
              </Button>
              
              <Button onClick={downloadAsPDF} disabled={isDownloading} variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5 flex-1 sm:flex-none">
                <FileText className="h-3 w-3 mr-1" />
                PDF
              </Button>
              
              <Button onClick={downloadBatch} disabled={isDownloading} size="sm" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex-1 sm:flex-none">
                <Download className="h-3 w-3 mr-1" />
                {isDownloading ? "..." : "Both"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
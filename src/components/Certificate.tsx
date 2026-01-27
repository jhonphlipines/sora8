import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";
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

  const [isPurchased, setIsPurchased] = useState(false);
  const [checkingPurchase, setCheckingPurchase] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  const percentage = Math.round((score / totalQuestions) * 100);
  const isPassed = percentage >= 60;

  /* ================= PURCHASE CHECK ================= */
  useEffect(() => {
    const checkPurchase = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setCheckingPurchase(false);
        return;
      }

      const { data } = await supabase
        .from("certificate_purchases")
        .select("id")
        .eq("user_id", user.id)
        .eq("certificate_id", certificateId)
        .maybeSingle();

      setIsPurchased(!!data);
      setCheckingPurchase(false);
    };

    checkPurchase();
  }, [certificateId]);

  /* ================= MEDAL ================= */
  const getMedalInfo = (p: number) => {
    if (p >= 90) return { label: "Gold", fill: "#fbbf24", border: "#ca8a04" };
    if (p >= 70) return { label: "Silver", fill: "#d1d5db", border: "#6b7280" };
    return { label: "Bronze", fill: "#f59e0b", border: "#92400e" };
  };

  const medal = getMedalInfo(percentage);

  /* ================= PDF ================= */
  const captureCanvas = async () => {
    if (!certificateRef.current) throw new Error("Certificate not ready");
    await new Promise(r => setTimeout(r, 400));
    return html2canvas(certificateRef.current, {
      scale: 3,
      backgroundColor: "#ffffff"
    });
  };

  const downloadAsPDF = async () => {
    if (!isPurchased) return;
    try {
      setIsDownloading(true);
      const canvas = await captureCanvas();
      const pdf = new jsPDF("landscape", "mm", "a4");
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, 277, 190);
      pdf.save(`certificate-${certificateId}.pdf`);
    } catch {
      toast({
        title: "Download failed",
        description: "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  /* ================= FAIL VIEW ================= */
  if (!isPassed) {
    return (
      <Card className="max-w-xl mx-auto">
        <CardContent className="text-center py-10">
          <h2 className="text-xl font-bold">Quiz Completed</h2>
          <p>You scored {percentage}%</p>
          <p className="text-red-500 mt-2">Minimum 60% required</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">

      {/* ================= CERTIFICATE ================= */}
      <div
        ref={certificateRef}
        className="relative bg-white w-full shadow-2xl overflow-hidden"
        style={{ aspectRatio: "1.414/1" }}
      >
        {/* Borders */}
        <div className="absolute inset-2 sm:inset-4 border-2 sm:border-4 border-gray-300" />
        <div className="absolute inset-3 sm:inset-6 border border-gray-200" />

        {/* Content */}
        <div className="relative z-10 h-full px-4 sm:px-10 lg:px-16 py-6 sm:py-10 lg:py-12 flex flex-col justify-between text-center">

          {/* HEADER */}
          <div>
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-serif tracking-wide sm:tracking-widest text-gray-900">
              CERTIFICATE OF COMPLETION
            </h1>
            <p className="text-[10px] sm:text-xs tracking-[0.25em] text-gray-500 mt-1 sm:mt-2">
              VILVER LEARNING PLATFORM
            </p>
          </div>

          {/* BODY */}
          <div className="space-y-3 sm:space-y-5 mt-4 sm:mt-6">
            <p className="text-gray-600 text-xs sm:text-sm">
              This is to certify that
            </p>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-gray-900 border-b-2 border-gray-400 inline-block px-4 sm:px-10 pb-1 sm:pb-2">
              {studentName}
            </h2>

            <p className="text-gray-600 text-xs sm:text-sm">
              has successfully completed the course
            </p>

            <h3 className="text-sm sm:text-lg lg:text-xl font-semibold text-gray-900">
              {courseName}
            </h3>

            <p className="text-gray-700 text-xs sm:text-base">
              with a score of <span className="font-bold">{percentage}%</span>
            </p>
          </div>

          {/* FOOTER */}
          <div className="mt-6 sm:mt-10 flex flex-col sm:grid sm:grid-cols-3 gap-4 sm:gap-0 items-center sm:items-end">

            {/* DATE + ID */}
            <div className="text-xs text-gray-600 text-center sm:text-left">
              <p>Date</p>
              <p className="font-semibold">
                {completionDate.toLocaleDateString()}
              </p>

              <p className="mt-1 sm:mt-2">Certificate ID</p>
              <p className="font-mono text-[10px] sm:text-[11px] break-all">
                {certificateId}
              </p>
            </div>

            {/* MEDAL */}
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 120 120" className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill={medal.fill}
                  stroke={medal.border}
                  strokeWidth="5"
                />
                <polygon
                  points="60,30 68,52 92,52 72,66 80,88 60,74 40,88 48,66 28,52 52,52"
                  fill="white"
                />
              </svg>
              <p className="text-xs sm:text-sm font-semibold mt-1 sm:mt-2">
                {medal.label}
              </p>
            </div>

            {/* SIGNATURE */}
            <div className="text-xs text-gray-600 text-center sm:text-right w-full">
              <div className="border-t border-gray-400 w-32 sm:w-40 mx-auto sm:ml-auto mb-1" />
              <p className="font-semibold">Authorized Signature</p>
              <p>Vilver Learning</p>
            </div>

          </div>
        </div>
      </div>

      {/* DOWNLOAD */}
      {isPurchased && !checkingPurchase && (
        <div className="flex justify-center mt-6">
          <Button onClick={downloadAsPDF} disabled={isDownloading}>
            <Download className="mr-2 h-4 w-4" />
            {isDownloading ? "Preparing..." : "Download Certificate (PDF)"}
          </Button>
        </div>
      )}
    </div>
  );
};

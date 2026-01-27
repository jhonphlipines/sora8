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

  useEffect(() => {
    const checkPurchase = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return setCheckingPurchase(false);

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

  const getMedalInfo = (p: number) => {
    if (p >= 90) return { label: "Gold", fill: "#fbbf24", border: "#ca8a04" };
    if (p >= 70) return { label: "Silver", fill: "#d1d5db", border: "#6b7280" };
    return { label: "Bronze", fill: "#f59e0b", border: "#92400e" };
  };

  const medal = getMedalInfo(percentage);

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
    setIsDownloading(true);
    const canvas = await captureCanvas();
    const pdf = new jsPDF("landscape", "mm", "a4");
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, 277, 190);
    pdf.save(`certificate-${certificateId}.pdf`);
    setIsDownloading(false);
  };

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
        className="relative bg-white w-full shadow-2xl"
        style={{ aspectRatio: "1.414/1" }}
      >
        {/* Borders */}
        <div className="absolute inset-4 border-4 border-gray-300"></div>
        <div className="absolute inset-6 border border-gray-200"></div>

        {/* Content */}
        <div className="relative z-10 h-full px-16 py-12 flex flex-col justify-between text-center">

          {/* HEADER */}
          <div>
            <h1 className="text-4xl font-serif tracking-widest text-gray-900">
              CERTIFICATE OF COMPLETION
            </h1>
            <p className="text-xs tracking-[0.35em] text-gray-500 mt-2">
              VILVER LEARNING PLATFORM
            </p>
          </div>

          {/* BODY */}
          <div className="space-y-5">
            <p className="text-gray-600 text-sm">
              This is to certify that
            </p>

            {/* NAME (FIXED VISIBILITY) */}
            <h2 className="text-4xl font-serif font-bold text-gray-900 border-b-2 border-gray-400 inline-block px-10 pb-2">
              {studentName}
            </h2>

            <p className="text-gray-600 text-sm">
              has successfully completed the course
            </p>

            <h3 className="text-xl font-semibold text-gray-900">
              {courseName}
            </h3>

            <p className="text-gray-700">
              with a score of <span className="font-bold">{percentage}%</span>
            </p>
          </div>

          {/* FOOTER GRID */}
          <div className="grid grid-cols-3 items-end mt-8">

            {/* DATE + ID */}
            <div className="text-left text-xs text-gray-600">
              <p>Date</p>
              <p className="font-semibold">
                {completionDate.toLocaleDateString()}
              </p>

              <p className="mt-2">Certificate ID</p>
              <p className="font-mono text-[11px]">{certificateId}</p>
            </div>

            {/* MEDAL (PERFECT CENTER) */}
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 120 120" className="w-24 h-24">
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
              <p className="text-sm font-semibold mt-2">{medal.label}</p>
            </div>

            {/* SIGNATURE (FIXED) */}
            <div className="text-right text-xs text-gray-600">
              <div className="border-t border-gray-400 w-40 ml-auto mb-1"></div>
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
            Download Certificate (PDF)
          </Button>
        </div>
      )}
    </div>
  );
};

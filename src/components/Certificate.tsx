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

  const [isDownloading, setIsDownloading] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [userCredits, setUserCredits] = useState(0);
  const [isUsingCredit, setIsUsingCredit] = useState(false);
  const [checkingPurchase, setCheckingPurchase] = useState(true);
  const [totalPurchasedCerts, setTotalPurchasedCerts] = useState(0);
  const [isFreeUnlock, setIsFreeUnlock] = useState(false);

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

      const { count } = await supabase
        .from("certificate_purchases")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      const { data: creditData } = await supabase
        .from("user_credits")
        .select("credits")
        .eq("user_id", user.id)
        .maybeSingle();

      setIsPurchased(!!data);
      setTotalPurchasedCerts(count ?? 0);
      setIsFreeUnlock((count ?? 0) < 2 && !data);
      setUserCredits(creditData?.credits ?? 0);
      setCheckingPurchase(false);
    };

    checkPurchase();
  }, [certificateId]);

  const getMedalInfo = (p: number) => {
    if (p >= 90) return { label: "Gold", fill: "#fbbf24", border: "#ca8a04" };
    if (p >= 70) return { label: "Silver", fill: "#d1d5db", border: "#6b7280" };
    return { label: "Bronze", fill: "#f59e0b", border: "#92400e" };
  };

  const medalInfo = getMedalInfo(percentage);

  const captureCanvas = async () => {
    if (!certificateRef.current) throw new Error("Certificate not ready");
    await new Promise(r => setTimeout(r, 500));
    return html2canvas(certificateRef.current, {
      scale: 3,
      backgroundColor: "#ffffff"
    });
  };

  const downloadAsImage = async () => {
    if (!isPurchased) return;
    setIsDownloading(true);
    const canvas = await captureCanvas();
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `certificate-${certificateId}.png`;
    link.click();
    setIsDownloading(false);
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
          <Award className="mx-auto mb-3 text-red-500" />
          <h2 className="text-xl font-bold">Quiz Completed</h2>
          <p>You scored {percentage}%</p>
          <p className="text-red-500 mt-2">Minimum 60% required</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">

      {/* ================= CERTIFICATE ================= */}
      <div
        ref={certificateRef}
        className="relative bg-white w-full shadow-2xl"
        style={{ aspectRatio: "1.414/1" }}
      >
        <div className="absolute inset-4 border-4 border-gray-300"></div>
        <div className="absolute inset-6 border border-gray-200"></div>

        <div className="relative z-10 h-full flex flex-col justify-between px-14 py-10 text-center">

          {/* HEADER */}
          <div>
            <h1 className="text-4xl font-serif tracking-widest text-gray-800">
              CERTIFICATE OF COMPLETION
            </h1>
            <p className="text-xs tracking-[0.3em] text-gray-500 mt-1">
              VILVER LEARNING PLATFORM
            </p>
          </div>

          {/* MAIN CONTENT */}
          <div className="space-y-4">
            <p className="text-gray-600 text-sm">
              This is to certify that
            </p>

            <h2 className="text-4xl font-serif font-bold border-b-2 border-gray-400 inline-block px-6 pb-2">
              {studentName}
            </h2>

            <p className="text-gray-600 text-sm">
              has successfully completed the course
            </p>

            <h3 className="text-xl font-semibold text-gray-800">
              {courseName}
            </h3>

            <p className="text-gray-600">
              with a score of <span className="font-bold">{percentage}%</span>
            </p>
          </div>

          {/* FOOTER */}
          <div className="flex justify-between items-end">

            {/* LEFT */}
            <div className="text-left text-xs text-gray-500">
              <p>Date</p>
              <p className="font-semibold">
                {completionDate.toLocaleDateString()}
              </p>
              <p className="mt-2">Certificate ID</p>
              <p className="font-mono text-[11px]">{certificateId}</p>
            </div>

            {/* MEDAL */}
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 120 120" className="w-24 h-24">
                <circle cx="60" cy="60" r="50" fill={medalInfo.fill} stroke={medalInfo.border} strokeWidth="5" />
                <polygon
                  points="60,30 68,52 92,52 72,66 80,88 60,74 40,88 48,66 28,52 52,52"
                  fill="white"
                />
              </svg>
              <p className="text-sm font-semibold mt-1">{medalInfo.label}</p>
            </div>

            {/* SIGNATURE */}
            <div className="text-right text-xs text-gray-500">
              <div className="border-t border-gray-400 w-40 ml-auto mb-1"></div>
              <p className="font-semibold">Authorized Signature</p>
              <p>Vilver Learning</p>
            </div>
          </div>
        </div>
      </div>

      {/* DOWNLOAD */}
      {isPurchased && (
        <div className="flex justify-center gap-3 mt-6">
          <Button onClick={downloadAsImage} variant="outline">
            <FileImage className="mr-2 h-4 w-4" /> PNG
          </Button>
          <Button onClick={downloadAsPDF} variant="outline">
            <FileText className="mr-2 h-4 w-4" /> PDF
          </Button>
          <Button onClick={downloadAsImage}>
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
        </div>
      )}
    </div>
  );
};

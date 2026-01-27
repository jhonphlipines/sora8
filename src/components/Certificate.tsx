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
    if (p >= 90) return { fill: "#fbbf24", border: "#ca8a04", label: "Excellent" };
    if (p >= 70) return { fill: "#d1d5db", border: "#6b7280", label: "Great Job" };
    return { fill: "#f59e0b", border: "#92400e", label: "Well Done" };
  };

  const medalInfo = getMedalInfo(percentage);

  const captureCanvas = async () => {
    if (!certificateRef.current) throw new Error("No ref");
    await new Promise(r => setTimeout(r, 500));
    return html2canvas(certificateRef.current, { scale: 3, backgroundColor: "#fff" });
  };

  const downloadAsImage = async () => {
    if (!isPurchased) return;
    setIsDownloading(true);
    const canvas = await captureCanvas();
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "certificate.png";
    a.click();
    setIsDownloading(false);
  };

  const downloadAsPDF = async () => {
    if (!isPurchased) return;
    setIsDownloading(true);
    const canvas = await captureCanvas();
    const pdf = new jsPDF("landscape", "mm", "a4");
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, 277, 190);
    pdf.save("certificate.pdf");
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
    <div className="max-w-4xl mx-auto">

      {/* ===== CERTIFICATE DESIGN ===== */}
      <div
        ref={certificateRef}
        className="relative bg-white w-full shadow-2xl flex items-center justify-center"
        style={{ aspectRatio: "1.414/1" }}
      >
        <div className="absolute inset-4 border-4 border-gray-300"></div>
        <div className="absolute inset-6 border border-gray-200"></div>

        <div className="relative z-10 w-full h-full flex flex-col items-center justify-between px-12 py-10 text-center">

          <div>
            <h1 className="text-4xl font-serif tracking-widest text-gray-700">
              CERTIFICATE
            </h1>
            <p className="uppercase tracking-[0.35em] text-xs text-gray-500">
              of Completion
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-gray-500 text-sm">This certifies that</p>

            <h2 className="text-4xl font-serif font-semibold border-b-2 border-gray-400 px-6 pb-2">
              {studentName}
            </h2>

            <p className="text-gray-500 text-sm">
              has successfully completed
            </p>

            <h3 className="text-xl font-semibold">{courseName}</h3>

            <p className="text-gray-600">
              Score: <span className="font-bold">{percentage}%</span>
            </p>
          </div>

          <div className="w-full flex justify-between items-center mt-6">
            <div className="text-xs text-gray-500 text-left">
              <p>Date</p>
              <p className="font-semibold">
                {completionDate.toLocaleDateString()}
              </p>
            </div>

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
          </div>
        </div>
      </div>

      {/* ===== DOWNLOAD BUTTONS ===== */}
      {isPurchased && (
        <div className="flex gap-3 justify-center mt-6">
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

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Image } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  certificateId,
}: CertificateProps) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [isPurchased, setIsPurchased] = useState(false);
  const [checkingPurchase, setCheckingPurchase] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  const percentage = Math.round((score / totalQuestions) * 100);
  const isPassed = percentage >= 60;

  /* ================= PURCHASE CHECK ================= */
  useEffect(() => {
    const checkPurchase = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
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
      } catch (err) {
        // If there's an error, we still want the UI visible so the user can see the state
        console.error("purchase check error", err);
        toast({
          title: "Unable to verify purchase",
          description: "Download buttons may be disabled until verification succeeds.",
          variant: "destructive",
        });
      } finally {
        setCheckingPurchase(false);
      }
    };

    checkPurchase();
  }, [certificateId, toast]);

  /* ================= MEDAL ================= */
  const getMedalInfo = (p: number) => {
    if (p >= 90) return { label: "Gold", fill: "#fbbf24", border: "#ca8a04" };
    if (p >= 70) return { label: "Silver", fill: "#d1d5db", border: "#6b7280" };
    return { label: "Bronze", fill: "#f59e0b", border: "#92400e" };
  };

  const medal = getMedalInfo(percentage);

  /* ================= PDF ================= */
  const downloadAsPDF = async () => {
    if (!certificateRef.current) return;

    try {
      setIsDownloading(true);

      const canvas = await html2canvas(certificateRef.current, {
        scale: 3,
        backgroundColor: "#ffffff",
      });

      const pdf = new jsPDF("landscape", "mm", "a4");
      // A4 landscape: 297 x 210 mm. Leave small margins.
      const imgData = canvas.toDataURL("image/png");
      // Fit image inside A4 with margins
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 8;
      const availableWidth = pageWidth - margin * 2;
      const availableHeight = pageHeight - margin * 2;

      // Calculate dimensions while preserving aspect ratio
      const img = new Image();
      img.src = imgData;
      await new Promise((res) => (img.onload = res));
      const ratio = Math.min(availableWidth / img.width, availableHeight / img.height);
      const imgWidth = img.width * ratio;
      const imgHeight = img.height * ratio;
      const x = (pageWidth - imgWidth) / 2;
      const y = (pageHeight - imgHeight) / 2;

      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
      pdf.save(`certificate-${certificateId}.pdf`);
      toast({
        title: "Download ready",
        description: "PDF downloaded successfully.",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Download failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  /* ================= PNG ================= */
  const downloadAsPNG = async () => {
    if (!certificateRef.current) return;

    try {
      setIsDownloading(true);

      const canvas = await html2canvas(certificateRef.current, {
        scale: 3,
        backgroundColor: "#ffffff",
      });

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `certificate-${certificateId}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast({
        title: "Download ready",
        description: "PNG downloaded successfully.",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Download failed",
        description: "Please try again",
        variant: "destructive",
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
    <div className="w-full">
      {/* 🔥 SCALE CONTAINER (THIS FIXES MOBILE) */}
      <div className="flex justify-center overflow-x-auto">
        <div className="origin-top scale-[0.8] sm:scale-[0.95] lg:scale-100">
          {/* ================= CERTIFICATE ================= */}
          <div
            ref={certificateRef}
            className="relative bg-white shadow-2xl"
            style={{
              width: "1123px", // A4 landscape
              height: "794px",
            }}
          >
            {/* Borders */}
            <div className="absolute inset-6 border-4 border-gray-300" />
            <div className="absolute inset-8 border border-gray-200" />

            {/* Content */}
            <div className="relative h-full px-20 py-14 text-center flex flex-col justify-between">
              {/* HEADER */}
              <div>
                <h1 className="text-5xl font-serif tracking-widest text-gray-900">
                  CERTIFICATE OF COMPLETION
                </h1>
                <p className="text-xs tracking-[0.35em] text-gray-500 mt-3">
                  VILVER LEARNING PLATFORM
                </p>
              </div>

              {/* BODY */}
              <div className="space-y-6">
                <p className="text-gray-600">This is to certify that</p>

                <h2 className="text-5xl font-serif font-bold text-gray-900 border-b-2 border-gray-400 inline-block px-12 pb-2">
                  {studentName}
                </h2>

                <p className="text-gray-600">has successfully completed the course</p>

                <h3 className="text-2xl font-semibold text-gray-900">{courseName}</h3>

                <p className="text-gray-700">
                  with a score of <span className="font-bold">{percentage}%</span>
                </p>
              </div>

              {/* FOOTER */}
              <div className="grid grid-cols-3 items-end">
                {/* DATE + ID */}
                <div className="text-left text-sm text-gray-600">
                  <p>Date</p>
                  <p className="font-semibold">{completionDate.toLocaleDateString()}</p>

                  <p className="mt-2">Certificate ID</p>
                  <p className="font-mono text-xs">{certificateId}</p>
                </div>

                {/* MEDAL */}
                <div className="flex flex-col items-center">
                  <svg viewBox="0 0 120 120" className="w-28 h-28">
                    <circle cx="60" cy="60" r="50" fill={medal.fill} stroke={medal.border} strokeWidth="5" />
                    <polygon
                      points="60,30 68,52 92,52 72,66 80,88 60,74 40,88 48,66 28,52 52,52"
                      fill="white"
                    />
                  </svg>
                  <p className="mt-2 font-semibold">{medal.label}</p>
                </div>

                {/* SIGNATURE */}
                <div className="text-right text-sm text-gray-600">
                  <div className="border-t border-gray-400 w-44 ml-auto mb-2" />
                  <p className="font-semibold">Authorized Signature</p>
                  <p>Vilver Learning</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DOWNLOAD */}
      {/* Show the download UI after we've finished checking purchase.
          If not purchased, buttons are visible but disabled with a hint. */}
      <div className="flex justify-center mt-6">
        {checkingPurchase ? (
          <div className="text-sm text-gray-600">Checking purchase status...</div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <div className="flex space-x-3">
              <Button
                variant="default"
                onClick={downloadAsPDF}
                disabled={isDownloading || !isPurchased}
                aria-disabled={isDownloading || !isPurchased}
              >
                <Download className="mr-2 h-4 w-4" />
                {isDownloading ? "Preparing..." : "Download PDF"}
              </Button>

              <Button
                variant="default"
                onClick={downloadAsPNG}
                disabled={isDownloading || !isPurchased}
                aria-disabled={isDownloading || !isPurchased}
              >
                <Image className="mr-2 h-4 w-4" />
                {isDownloading ? "Preparing..." : "Download PNG"}
              </Button>
            </div>

            {!isPurchased && (
              <p className="text-xs text-gray-500">
                Purchasing is required to download the certificate. Please purchase to enable downloads.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

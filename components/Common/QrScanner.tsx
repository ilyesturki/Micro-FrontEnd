"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import {
  QrCode,
  ScanLine,
  CheckCircle2,
  RotateCcw,
  Loader2,
} from "lucide-react";

export default function QRScanner() {
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const startScanner = async () => {
    try {
      setLoading(true);
      setResult("");

      // Clean previous instance
      if (scannerRef.current) {
        try {
          await scannerRef.current.stop();
        } catch {}
        try {
          await scannerRef.current.clear();
        } catch {}
        scannerRef.current = null;
      }

      const qrCode = new Html5Qrcode("qr-reader");
      scannerRef.current = qrCode;

      await qrCode.start(
        { facingMode: "environment" },
        {
          fps: 12,
          qrbox: { width: 250, height: 250 },
        },
        async (decodedText) => {
          try {
            setLoading(true);

            // ✅ 1. Parse QR
            let qrId = "";
            try {
              const parsed = JSON.parse(decodedText);
              qrId = parsed.qrId;
            } catch {
              throw new Error("Invalid QR format");
            }

            if (!qrId) {
              throw new Error("QR ID missing");
            }

            // ✅ 2. Send to backend
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/parking/door`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ qrId }),
              }
            );

            const data = await res.json();

            if (!res.ok) {
              throw new Error(data.message || "Verification failed");
            }

            // ✅ 3. SUCCESS
            setResult(data.message || "✅ Access Granted");
          } catch (error: any) {
            console.error(error);
            setResult("❌ Invalid or expired QR");
          } finally {
            setLoading(false);

            // ✅ Stop scanner
            try {
              await qrCode.stop();
              await qrCode.clear();
            } catch {}

            scannerRef.current = null;
            setIsScanning(false);
          }
        },
        () => {}
      );

      setIsScanning(true);
    } catch (error) {
      console.error("Scanner error:", error);
    } finally {
      setLoading(false);
    }
  };

  const stopScanner = async () => {
    if (!scannerRef.current) return;

    try {
      await scannerRef.current.stop();
    } catch {}

    try {
      await scannerRef.current.clear();
    } catch {}

    scannerRef.current = null;
    setIsScanning(false);
  };

  const restartScanner = async () => {
    await stopScanner();
    await startScanner();
  };

  useEffect(() => {
    startScanner();
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="overflow-hidden rounded-3xl border border-white/40 bg-gradient-to-br from-gray-100 via-white to-gray-200 shadow-2xl backdrop-blur-xl">
          
          {/* Header */}
          <div className="flex items-center gap-3 border-b px-6 py-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-white">
              <QrCode className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-base font-semibold">QR Scanner</h2>
              <p className="text-xs text-gray-500">Scan to open gate</p>
            </div>
          </div>

          {/* Scanner */}
          <div className="p-5">
            <div className="relative h-[320px] rounded-2xl bg-black overflow-hidden">
              <div id="qr-reader" className="h-full w-full" />

              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
              )}

              {isScanning && !loading && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-5 border border-white rounded-2xl" />
                  <div className="absolute left-5 right-5 top-10 h-[2px] bg-white animate-pulse" />
                </div>
              )}
            </div>
          </div>

          {/* Result */}
          {result && (
            <div className="border-t px-5 py-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500" />

                <div className="flex-1">
                  <p className="text-sm font-semibold">Result</p>
                  <p className="text-xs text-gray-600 mt-1">{result}</p>

                  <button
                    onClick={restartScanner}
                    className="mt-4 bg-black text-white px-4 py-2 rounded-xl text-xs flex items-center gap-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Scan again
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
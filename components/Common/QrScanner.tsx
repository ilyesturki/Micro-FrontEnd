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
          setResult(decodedText);

          if (decodedText.startsWith("http")) {
            window.open(decodedText, "_blank");
          }

          try {
            await qrCode.stop();
            await qrCode.clear();
          } catch {}

          scannerRef.current = null;
          setIsScanning(false);
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
        {/* Card */}
        <div className="overflow-hidden rounded-3xl border border-white/40 bg-gradient-to-br from-gray-100 via-white to-gray-200  shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-gray-200/50 px-6 py-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-white shadow-lg">
              <QrCode className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-gray-900">
                QR Scanner
              </h2>
              <p className="text-xs text-gray-500">
                Scan instantly with camera
              </p>
            </div>
          </div>

          {/* Scanner */}
          <div className="p-5">
            <div className="relative h-[320px] overflow-hidden rounded-2xl bg-black shadow-inner">
              <div id="qr-reader" className="h-full w-full overflow-hidden" />

              {/* Loading */}
              {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/70 backdrop-blur-md">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                  <p className="text-sm text-white/90">Starting camera...</p>
                </div>
              )}

              {/* Scanning UI */}
              {isScanning && !loading && (
                <div className="pointer-events-none absolute inset-0">
                  {/* glowing frame */}
                  <div className="absolute inset-5 rounded-2xl border border-white/60 shadow-[0_0_25px_rgba(255,255,255,0.15)]" />

                  {/* animated scan line */}
                  <div className="absolute left-5 right-5 top-10 h-[2px] animate-pulse bg-gradient-to-r from-transparent via-white to-transparent opacity-70" />

                  {/* bottom badge */}
                  <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
                    <ScanLine className="h-4 w-4 text-white" />
                    <span className="text-xs font-medium text-white">
                      Scanning...
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Result */}
          {result && (
            <div className="border-t border-gray-200/50 bg-white/60 px-5 py-4 backdrop-blur-md">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500" />

                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    QR Detected
                  </p>

                  <p className="mt-1 break-all text-xs text-gray-600">
                    {result}
                  </p>

                  <button
                    onClick={restartScanner}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-xs font-medium text-white transition hover:scale-[1.02] hover:opacity-90"
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

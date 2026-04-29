"use client";

import { useState } from "react";
import { QrCode, X } from "lucide-react";
import QRScanner from "@/components/Common/QrScanner";

export default function ScanButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex justify-center w-full px-1 gap-x-2 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border rounded-md"
      >
        <QrCode className="h-5 w-5" />
        Scan QR
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="relative w-full max-w-lg">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white p-2"
            >
              <X className="h-5 w-5" />
            </button>

            <QRScanner />
          </div>
        </div>
      )}
    </>
  );
}

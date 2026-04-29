"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import useDoorQr from "@/hooks/useDoorQr";

const DoorQrDisplay = () => {
  const { qr, connected } = useDoorQr();
  const [timeLeft, setTimeLeft] = useState(30);

  const loading = !qr;

  useEffect(() => {
    if (!qr) return;

    setTimeLeft(30);

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [qr]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      {/* HEADER */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Smart Parking Access
        </h1>
        <p className="text-gray-500 mt-2">Scan the QR code to open the gate</p>
      </div>

      {/* QR CARD */}
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 blur-2xl bg-green-200 opacity-40 rounded-2xl"></div>

        <div className="relative w-[320px] h-[320px] bg-white rounded-2xl shadow-2xl flex items-center justify-center border border-gray-200">
          {loading ? (
            <div className="flex flex-col items-center gap-2 animate-pulse">
              <div className="w-40 h-40 bg-gray-200 rounded-md"></div>
              <span className="text-gray-400 text-sm">Generating QR...</span>
            </div>
          ) : (
            qr && (
              <Image
                src={qr}
                alt="QR Code"
                width={280}
                height={280}
                className="object-contain"
              />
            )
          )}

          {/* SCANNER CORNERS */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-3 left-3 w-6 h-6 border-t-4 border-l-4 border-green-500"></div>
            <div className="absolute top-3 right-3 w-6 h-6 border-t-4 border-r-4 border-green-500"></div>
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-4 border-l-4 border-green-500"></div>
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-4 border-r-4 border-green-500"></div>
          </div>

          {/* STATUS */}
          <div className="absolute top-3 right-3 flex items-center gap-2 bg-white/80 px-2 py-1 rounded-full shadow-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs text-gray-600">Live</span>
          </div>
        </div>
      </div>

      {/* TIMER */}
      <div className="mt-6 text-gray-600 text-sm">
        Refreshing in{" "}
        <span className="font-semibold text-gray-900">{timeLeft}s</span>
      </div>

      {/* FOOTER */}
      <div className="mt-10 opacity-60">
        <Image src="/imgs/aradisTwo.png" alt="logo" width={80} height={80} />
      </div>
    </div>
  );
};

export default DoorQrDisplay;

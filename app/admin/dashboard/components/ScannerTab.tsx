"use client";

import React, { useState } from "react";
import { Scanner, IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, ScanLine, Camera } from "lucide-react";

export default function ScannerTab({ onClose }: { onClose: () => void }) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    const rawValue = detectedCodes[0]?.rawValue;
    if (rawValue) {
      if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(50);
      setScanResult(rawValue);
      setIsScanning(false);
    }
  };

  const resetScan = () => {
    setScanResult(null);
    setIsScanning(true);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-black">
      
      {/* HEADER (Always visible) */}
      <div className="absolute top-0 left-0 right-0 p-6 z-20 flex justify-between items-center pt-12 pointer-events-none">
        {/* Only show "Live" badge if actually scanning */}
        <div className={`transition-opacity duration-300 ${isScanning ? 'opacity-100' : 'opacity-0'}`}>
           <span className="text-sm font-bold text-white/80 uppercase tracking-widest bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              Live Camera
           </span>
        </div>
        
        {/* Close Button - Always clickable */}
        <button 
          onClick={onClose}
          className="pointer-events-auto p-3 bg-neutral-900/50 backdrop-blur-md rounded-full text-white border border-white/10 hover:bg-white/10 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* STATE 1: IDLE (The "Ready" Screen you wanted back) */}
      {!isScanning && !scanResult && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
            {/* Pulsing Icon */}
            <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-xl animate-pulse" />
                <div className="relative w-24 h-24 bg-neutral-900 border border-white/10 rounded-3xl flex items-center justify-center shadow-2xl">
                    <ScanLine size={40} className="text-blue-500" />
                </div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Ticket Scanner</h2>
            <p className="text-neutral-400 text-center max-w-[260px] leading-relaxed mb-10">
                Ready to verify attendees. Tap below to activate the camera.
            </p>

            <button
                onClick={() => setIsScanning(true)}
                className="group relative w-full max-w-xs bg-white text-black font-bold py-4 rounded-full text-lg shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
            >
                <Camera size={20} />
                <span>Scan QR Code</span>
            </button>
        </div>
      )}

      {/* STATE 2: ACTIVE SCANNER */}
      {isScanning && (
        <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-black">
            <div className="absolute inset-0 w-full h-full">
                <Scanner
                    onScan={handleScan}
                    formats={['qr_code']}
                    components={{ finder: false }}
                    styles={{
                        container: { width: "100%", height: "100%" },
                        video: { objectFit: "cover", width: "100%", height: "100%" }
                    }}
                />
            </div>
            
            {/* Custom Finder Overlay */}
            <div className="relative w-72 h-72 border-2 border-white/30 rounded-[3rem] overflow-hidden z-10 shadow-[0_0_0_1000px_rgba(0,0,0,0.6)]">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 shadow-[0_0_20px_#3b82f6] animate-[scan_2s_linear_infinite]" />
                <div className="absolute top-6 left-6 w-8 h-8 border-l-4 border-t-4 border-blue-500 rounded-tl-xl" />
                <div className="absolute top-6 right-6 w-8 h-8 border-r-4 border-t-4 border-blue-500 rounded-tr-xl" />
                <div className="absolute bottom-6 left-6 w-8 h-8 border-l-4 border-b-4 border-blue-500 rounded-bl-xl" />
                <div className="absolute bottom-6 right-6 w-8 h-8 border-r-4 border-b-4 border-blue-500 rounded-br-xl" />
            </div>
            
            <p className="absolute bottom-32 text-white/70 text-sm font-medium bg-black/60 px-6 py-3 rounded-full backdrop-blur-md z-20 border border-white/10">
                Align QR code within frame
            </p>
        </div>
      )}

      {/* STATE 3: RESULT DISPLAY */}
      {scanResult && (
         <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-black animate-in slide-in-from-bottom-10 fade-in duration-300">
             <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(34,197,94,0.4)]">
                <CheckCircle size={48} className="text-black" strokeWidth={3} />
             </div>
             <h2 className="text-3xl font-bold text-white mb-2">Success!</h2>
             <div className="bg-neutral-900 rounded-2xl p-4 border border-white/10 mb-8 w-full max-w-sm">
                <p className="text-neutral-500 text-xs uppercase font-bold tracking-wider mb-1">Scanned Data</p>
                <p className="text-white font-mono break-all">{scanResult}</p>
             </div>
             
             <div className="flex gap-3 w-full max-w-sm">
                 <button 
                    onClick={() => setScanResult(null)} // Go back to Idle
                    className="flex-1 py-4 bg-neutral-800 text-white font-bold rounded-xl hover:bg-neutral-700 transition"
                 >
                    Done
                 </button>
                 <button 
                    onClick={resetScan} // Go back to Camera immediately
                    className="flex-1 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition"
                 >
                    Scan Next
                 </button>
             </div>
         </div>
      )}

      <style jsx global>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
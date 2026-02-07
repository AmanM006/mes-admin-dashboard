"use client";

import React, { useState } from "react";
import { Scanner, IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { motion, AnimatePresence } from "framer-motion";
import { Scan, X, CheckCircle, Copy, RotateCcw, Zap } from "lucide-react";

export default function ScannerPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    const rawValue = detectedCodes[0]?.rawValue;
    if (rawValue) {
      // Vibrate if device supports it (haptic feedback)
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(50);
      }
      setScanResult(rawValue);
      setIsScanning(false);
    }
  };

  const handleCopy = () => {
    if (scanResult) {
      navigator.clipboard.writeText(scanResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetScan = () => {
    setScanResult(null);
    setIsScanning(true);
  };

  return (
    <main className="relative flex flex-col items-center justify-center min-h-[100dvh] bg-neutral-950 text-white overflow-hidden selection:bg-blue-500/30">
      
      {/* BACKGROUND ACCENTS */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="z-10 w-full max-w-md px-6 flex flex-col items-center h-full justify-center">

        <AnimatePresence mode="wait">
          
          {/* STATE 1: IDLE / HOME SCREEN */}
          {!isScanning && !scanResult && (
            <motion.div
              key="home"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center text-center space-y-8"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 rounded-full" />
                <div className="relative w-24 h-24 bg-neutral-900 border border-neutral-800 rounded-3xl flex items-center justify-center shadow-2xl">
                  <Scan size={40} className="text-blue-400" />
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-white">
                  Ticket Scanner
                </h1>
                <p className="text-neutral-400 text-sm max-w-[250px] mx-auto leading-relaxed">
                  Ready to verify attendees. Tap below to activate the camera.
                </p>
              </div>

              <button
                onClick={() => setIsScanning(true)}
                className="group relative flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_35px_rgba(255,255,255,0.25)] transition-all active:scale-95"
              >
                <Scan size={20} />
                <span>Scan QR Code</span>
              </button>
            </motion.div>
          )}

          {/* STATE 2: SCANNING UI */}
          {isScanning && (
            <motion.div
              key="scanner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black flex flex-col"
            >
              {/* Top Bar */}
              <div className="absolute top-0 left-0 right-0 p-6 z-20 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
                <span className="text-sm font-medium text-white/80 uppercase tracking-widest">Scanning...</span>
                <button 
                  onClick={() => setIsScanning(false)}
                  className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Camera Viewport */}
              <div className="flex-1 relative flex items-center justify-center">
                 {/* The Scanner */}
                 <div className="w-full h-full absolute inset-0">
                    <Scanner
                      onScan={handleScan}
                      formats={['qr_code']}
                      components={{ finder: false }} // We will build a custom custom finder
                      styles={{
                        container: { width: "100%", height: "100%" },
                        video: { objectFit: "cover" }
                      }}
                    />
                 </div>

                 {/* Custom Overlay & Scan Line Animation */}
                 <div className="relative w-64 h-64 border-2 border-white/30 rounded-3xl overflow-hidden z-10">
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 shadow-[0_0_20px_#3b82f6] animate-[scan_2s_linear_infinite]" />
                    
                    {/* Corners */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-l-4 border-t-4 border-blue-500 rounded-tl-lg" />
                    <div className="absolute top-0 right-0 w-6 h-6 border-r-4 border-t-4 border-blue-500 rounded-tr-lg" />
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-l-4 border-b-4 border-blue-500 rounded-bl-lg" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-r-4 border-b-4 border-blue-500 rounded-br-lg" />
                 </div>
                 
                 <p className="absolute bottom-12 text-white/60 text-sm font-medium bg-black/40 px-4 py-2 rounded-full backdrop-blur-md z-20">
                    Point camera at ticket QR
                 </p>
              </div>
            </motion.div>
          )}

          {/* STATE 3: RESULT SHEET */}
          {scanResult && (
             <motion.div
                key="result"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-800 rounded-t-[30px] p-6 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] max-h-[85vh]"
             >
                <div className="w-12 h-1.5 bg-neutral-700 rounded-full mx-auto mb-6" />
                
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="text-green-500" size={32} />
                  </div>
                  
                  <h2 className="text-xl font-bold text-white mb-1">Scan Complete</h2>
                  <p className="text-neutral-400 text-sm mb-6">Data captured successfully</p>

                  {/* Data Box */}
                  <div className="w-full bg-black/40 rounded-xl p-4 border border-white/5 mb-6 relative group">
                    <p className="font-mono text-sm text-neutral-300 break-all leading-relaxed">
                      {scanResult}
                    </p>
                    <button 
                      onClick={handleCopy}
                      className="absolute top-2 right-2 p-2 bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors"
                    >
                      {copied ? <CheckCircle size={14} className="text-green-400"/> : <Copy size={14} />}
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 w-full">
                    <button
                      onClick={() => setScanResult(null)}
                      className="py-4 rounded-xl bg-neutral-800 text-white font-semibold hover:bg-neutral-700 transition-colors"
                    >
                      Close
                    </button>
                    <button
                      onClick={resetScan}
                      className="py-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"
                    >
                      <RotateCcw size={18} />
                      Scan Next
                    </button>
                  </div>
                </div>
             </motion.div>
          )}

        </AnimatePresence>

      </div>

      {/* Tailwind Custom Animation for Scan Line */}
      <style jsx global>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </main>
  );
}
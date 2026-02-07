"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LayoutDashboard, ScanLine, History, LogOut } from "lucide-react";
import OverviewTab from "./components/OverviewTab";
import ScannerTab from "./components/ScannerTab";
import HistoryTab from "./components/HistoryTab";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"home" | "scan" | "history">("home");
  const router = useRouter();

  // Basic Auth Check
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) router.push("/admin/login");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  return (
    <div className="min-h-[100dvh] bg-black text-white flex flex-col">
      
      {/* --- HEADER --- */}
      <header className="px-6 py-4 flex justify-between items-center border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-40">
        <div>
           <h2 className="font-bold text-lg">MES Admin</h2>
           <p className="text-xs text-neutral-500">Event Manager</p>
        </div>
        <button onClick={handleLogout} className="p-2 bg-neutral-900 rounded-full text-neutral-400 hover:text-white">
          <LogOut size={16} />
        </button>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 overflow-y-auto pb-24">
        {activeTab === "home" && <OverviewTab onScanClick={() => setActiveTab("scan")} />}
        {activeTab === "scan" && <ScannerTab />}
        {activeTab === "history" && <HistoryTab />}
      </main>

      {/* --- BOTTOM NAVIGATION BAR --- */}
      <nav className="fixed bottom-0 w-full bg-neutral-950 border-t border-white/10 px-6 py-4 pb-6 flex justify-around items-center z-50">
        <NavButton 
          active={activeTab === "home"} 
          onClick={() => setActiveTab("home")} 
          icon={LayoutDashboard} 
          label="Overview" 
        />
        
        {/* Floating Scan Button */}
        <div className="relative -top-6">
          <button 
            onClick={() => setActiveTab("scan")}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-black transition-all ${
              activeTab === 'scan' ? 'bg-blue-500 text-white scale-110' : 'bg-neutral-800 text-neutral-400'
            }`}
          >
            <ScanLine size={28} />
          </button>
        </div>

        <NavButton 
          active={activeTab === "history"} 
          onClick={() => setActiveTab("history")} 
          icon={History} 
          label="History" 
        />
      </nav>
    </div>
  );
}

// Simple helper for nav buttons
const NavButton = ({ active, onClick, icon: Icon, label }: any) => (
  <button 
    onClick={onClick} 
    className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-blue-500' : 'text-neutral-500 hover:text-neutral-300'}`}
  >
    <Icon size={24} />
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);
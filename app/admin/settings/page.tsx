"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, User, Mail, Lock, Bell, ChevronRight, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()} 
            className="p-2 -ml-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Settings</h1>
        </div>
      </header>

      {/* CONTENT */}
      <main className="pt-24 px-6 pb-12 max-w-2xl mx-auto space-y-8">
        
        {/* Profile Section */}
        <section>
          <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4 ml-2">Profile</h2>
          <div className="bg-neutral-900/50 rounded-3xl border border-white/5 overflow-hidden">
            <div className="p-6 flex items-center gap-4 border-b border-white/5">
               <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-blue-900/20">
                  A
               </div>
               <div>
                  <h3 className="text-lg font-bold text-white">Admin User</h3>
                  <p className="text-neutral-400 text-sm">mes.admin@example.com</p>
               </div>
               <button className="ml-auto px-4 py-2 bg-white/10 rounded-full text-xs font-bold hover:bg-white/20 transition">
                  Edit
               </button>
            </div>
          </div>
        </section>

        {/* General Settings */}
        <section>
          <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4 ml-2">General</h2>
          <div className="bg-neutral-900/50 rounded-3xl border border-white/5 overflow-hidden flex flex-col">
            <SettingsItem icon={User} label="Personal Information" />
            <div className="h-px bg-white/5 mx-4" />
            <SettingsItem icon={Bell} label="Notifications" value="On" />
            <div className="h-px bg-white/5 mx-4" />
            <SettingsItem icon={Shield} label="Security & Privacy" />
          </div>
        </section>

        {/* App Settings */}
        <section>
          <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4 ml-2">App Preferences</h2>
          <div className="bg-neutral-900/50 rounded-3xl border border-white/5 overflow-hidden flex flex-col">
             <div className="p-4 flex items-center justify-between hover:bg-white/5 transition cursor-pointer">
                <div className="flex items-center gap-4">
                   <div className="p-2 bg-neutral-800 rounded-full text-neutral-400">
                      <Mail size={20} />
                   </div>
                   <span className="font-medium">Email Reports</span>
                </div>
                {/* Toggle Switch UI */}
                <div className="w-12 h-7 bg-green-500 rounded-full p-1 flex justify-end">
                   <div className="w-5 h-5 bg-white rounded-full shadow-md" />
                </div>
             </div>
             
             <div className="h-px bg-white/5 mx-4" />
             
             <SettingsItem icon={Lock} label="Change Password" />
          </div>
        </section>

        <p className="text-center text-neutral-600 text-xs mt-12">
           MES Admin Portal v1.0.4 • Built by Aman
        </p>

      </main>
    </div>
  );
}

// Helper Component for List Items
function SettingsItem({ icon: Icon, label, value }: any) {
  return (
    <button className="p-4 flex items-center justify-between hover:bg-white/5 transition w-full text-left">
       <div className="flex items-center gap-4">
          <div className="p-2 bg-neutral-800 rounded-full text-neutral-400">
             <Icon size={20} />
          </div>
          <span className="font-medium text-white">{label}</span>
       </div>
       <div className="flex items-center gap-2 text-neutral-500">
          {value && <span className="text-sm">{value}</span>}
          <ChevronRight size={18} />
       </div>
    </button>
  );
}
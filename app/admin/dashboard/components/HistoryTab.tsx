"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, CheckCircle2, XCircle, Check } from "lucide-react";

// Dummy Data
const HISTORY_DATA = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    ticketId: `8821${i}`,
    name: i % 2 === 0 ? "Aditya Verma" : "Rahul Sharma",
    time: `10:${10 + i} AM`,
    status: i % 3 === 0 ? "USED" : "ALLOWED",
    role: i % 4 === 0 ? "NON-MAHE" : "MAHE STUDENT"
}));

export default function HistoryTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  const filteredHistory = HISTORY_DATA.filter((item) => {
    const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.ticketId.includes(searchTerm);

    if (activeFilters.includes("ALLOWED") && item.status !== "ALLOWED") return false;
    if (activeFilters.includes("USED") && item.status !== "USED") return false;
    if (activeFilters.includes("MAHE") && item.role !== "MAHE STUDENT") return false;
    if (activeFilters.includes("NON-MAHE") && item.role !== "NON-MAHE") return false;

    return matchesSearch;
  });

  return (
    <div className="min-h-full flex flex-col relative">
        
        {/* --- LOCKED SEARCH BAR --- 
            px-6: Matches the Header Padding perfectly
            top-24: Locks exactly under the 96px header
            w-full: Takes full width (no more gaps)
        */}
        <div className="sticky top-24 z-40 bg-black pt-4 pb-4 px-6 border-b border-white/10 shadow-xl w-full">
            <div className="flex items-center justify-between mb-3 px-1">
                <h2 className="text-xl font-bold text-white">Scan History</h2>
                <span className="text-xs font-medium text-neutral-500 bg-neutral-900 px-2 py-1 rounded-md border border-white/5">
                    {filteredHistory.length} Results
                </span>
            </div>
            
            <div className="relative">
                <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search name or ticket ID..." 
                    className="w-full bg-neutral-900 border border-white/10 h-12 pl-10 pr-12 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-neutral-600"
                />
                
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                
                <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className={`absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg flex items-center justify-center transition-all border ${
                        isFilterOpen || activeFilters.length > 0
                            ? "bg-white text-black border-white" 
                            : "bg-neutral-800 text-neutral-400 border-white/5 hover:bg-neutral-700"
                    }`}
                >
                    <Filter size={16} />
                </button>

                {/* Filter Dropdown (Same as before) */}
                <AnimatePresence>
                    {isFilterOpen && (
                        <>
                            <div className="fixed inset-0 z-[60]" onClick={() => setIsFilterOpen(false)} />
                            <motion.div 
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute right-0 top-14 w-60 bg-[#151515] border border-white/10 rounded-xl shadow-2xl p-2 z-[70]"
                            >
                                <p className="text-[10px] font-bold text-neutral-500 uppercase px-3 py-2">Status</p>
                                <FilterOption label="Allowed Only" isSelected={activeFilters.includes("ALLOWED")} onClick={() => toggleFilter("ALLOWED")} icon={CheckCircle2} color="text-green-500" />
                                <FilterOption label="Already Used" isSelected={activeFilters.includes("USED")} onClick={() => toggleFilter("USED")} icon={XCircle} color="text-red-500" />
                                <div className="h-px bg-white/5 my-2 mx-2" />
                                <p className="text-[10px] font-bold text-neutral-500 uppercase px-3 py-2">Type</p>
                                <FilterOption label="MAHE Student" isSelected={activeFilters.includes("MAHE")} onClick={() => toggleFilter("MAHE")} />
                                <FilterOption label="Non-MAHE" isSelected={activeFilters.includes("NON-MAHE")} onClick={() => toggleFilter("NON-MAHE")} />
                                {activeFilters.length > 0 && (
                                    <button onClick={() => setActiveFilters([])} className="w-full text-center text-xs text-neutral-500 hover:text-white py-3 mt-1 border-t border-white/5">Clear All</button>
                                )}
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>

        {/* RESULTS LIST - Added px-6 to align with header */}
        <div className="space-y-3 pt-4 pb-32 px-6">
            <AnimatePresence mode="popLayout">
                {filteredHistory.length > 0 ? (
                    filteredHistory.map((item) => (
                        <motion.div 
                            key={item.id} 
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="bg-neutral-900/40 rounded-2xl p-4 border border-white/5 flex gap-4 items-center group hover:bg-neutral-900/80 transition-colors"
                        >
                             <div className={`w-1.5 h-10 rounded-full ${item.status === 'ALLOWED' ? 'bg-blue-500' : 'bg-neutral-700'}`} />
                             
                             <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-bold text-neutral-200">{item.name}</h3>
                                    <span className="text-xs font-mono text-neutral-500">#{item.ticketId}</span>
                                </div>
                                <div className="flex gap-2">
                                    {item.status === 'ALLOWED' ? 
                                        <Badge text="ALLOWED" color="text-green-400" bg="bg-green-500/10" border="border-green-500/20" /> : 
                                        <Badge text="USED" color="text-red-400" bg="bg-red-500/10" border="border-red-500/20" />
                                    }
                                    <Badge text={item.role === 'MAHE STUDENT' ? 'MAHE' : 'NON-MAHE'} color="text-neutral-400" bg="bg-neutral-800" border="border-white/5" />
                                </div>
                             </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="py-12 text-center text-neutral-500">
                        <p>No scans found.</p>
                        {activeFilters.length > 0 && (
                            <button onClick={() => setActiveFilters([])} className="text-blue-500 text-sm mt-2">Clear filters</button>
                        )}
                    </div>
                )}
            </AnimatePresence>
        </div>
    </div>
  );
}

function FilterOption({ label, isSelected, onClick, icon: Icon, color }: any) {
    return (
        <button onClick={onClick} className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${isSelected ? "bg-white/10 text-white" : "text-neutral-400 hover:bg-white/5 hover:text-white"}`}>
            <div className="flex items-center gap-2">{Icon && <Icon size={14} className={isSelected ? color : "text-neutral-500"} />}<span>{label}</span></div>
            {isSelected && <Check size={14} className="text-blue-500" />}
        </button>
    );
}

function Badge({ text, color, bg, border }: any) {
    return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${color} ${bg} ${border}`}>{text}</span>;
}
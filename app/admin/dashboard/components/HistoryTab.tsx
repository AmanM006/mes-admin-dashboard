import { Search, Filter } from "lucide-react";

export default function HistoryTab() {
  return (
    <div className="p-6 h-full flex flex-col animate-in fade-in">
        <h2 className="text-2xl font-bold mb-6">Scan History</h2>
        
        {/* Search Bar */}
        <div className="relative mb-6">
            <Search className="absolute left-4 top-3.5 text-neutral-500" size={18} />
            <input 
                type="text" 
                placeholder="Search by name or ID..." 
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500"
            />
        </div>

        {/* List */}
        <div className="space-y-3">
            {[1,2,3,4,5].map((item) => (
                <div key={item} className="bg-neutral-900/50 border border-white/5 p-4 rounded-xl flex justify-between items-center">
                    <div>
                        <p className="font-bold text-sm text-white">Aditya Verma</p>
                        <p className="text-xs text-neutral-500">MES 2026 • Ticket #8832</p>
                    </div>
                    <div className="text-right">
                        <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">ALLOWED</span>
                        <p className="text-[10px] text-neutral-600 mt-1">10:42 AM</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}
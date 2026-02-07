import { Users, QrCode, Ticket } from "lucide-react";

export default function OverviewTab({ onScanClick }: { onScanClick: () => void }) {
  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4">
      
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-6 text-white shadow-xl">
        <h1 className="text-2xl font-bold mb-1">Hello, Admin</h1>
        <p className="text-blue-100 text-sm mb-6">Ready to manage entry?</p>
        <button onClick={onScanClick} className="bg-white/10 backdrop-blur-md border border-white/20 w-full py-3 rounded-xl font-semibold hover:bg-white/20 transition">
          Start Scanning Now
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard icon={Users} label="Total Entries" value="1,204" color="bg-purple-500/10 text-purple-400" />
        <StatCard icon={Ticket} label="Pending" value="85" color="bg-orange-500/10 text-orange-400" />
      </div>

      {/* Live Feed Placeholder */}
      <div className="bg-neutral-900 rounded-2xl p-5 border border-white/5">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Recent Activity</h3>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Live
            </span>
        </div>
        <div className="space-y-4">
            {[1,2,3].map((_, i) => (
                <div key={i} className="flex items-center gap-3 pb-3 border-b border-white/5 last:border-0 last:pb-0">
                    <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-bold">AK</div>
                    <div>
                        <p className="text-sm font-medium">Aryan K.</p>
                        <p className="text-xs text-neutral-500">Checked in 2m ago</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ icon: Icon, label, value, color }: any) => (
  <div className={`p-5 rounded-2xl border border-white/5 ${color}`}>
    <Icon size={24} className="mb-3 opacity-80" />
    <p className="text-2xl font-bold text-white mb-1">{value}</p>
    <p className="text-xs opacity-70">{label}</p>
  </div>
);
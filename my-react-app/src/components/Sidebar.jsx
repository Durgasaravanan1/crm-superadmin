import React from "react";
import { 
  Zap, Home, Building2, CreditCard, Package, Megaphone, Settings 
} from "lucide-react";

const Sidebar = ({ currentView, setCurrentView }) => {
  const navItems = [
    { id: "dashboard", icon: Home, label: "Overview" },
    { id: "tenants", icon: Building2, label: "Tenants" },
    { id: "billing", icon: CreditCard, label: "Billing" },
    { id: "plans", icon: Package, label: "Plans" },
    { id: "announcements", icon: Megaphone, label: "Announcements" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="w-56 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col">
      <div className="px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">WynSync</div>
            <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Admin Panel</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all ${
              currentView === item.id
                ? "bg-violet-50 text-violet-700 font-medium"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-4 h-4" />
              {item.label}
            </div>
          </button>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center text-xs font-semibold text-violet-700">
            SA
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-gray-800 truncate">Super Admin</div>
            <div className="text-[10px] font-mono text-gray-400">admin@wynsync.io</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
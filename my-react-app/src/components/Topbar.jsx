import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Search, Bell, X, CheckCircle, AlertTriangle, Info, Clock, 
  Zap, Users, CreditCard, Megaphone, TrendingUp, Calendar 
} from "lucide-react";

const Topbar = ({
  currentView,
  setCurrentView,
  setSelectedTenant,
}) => {
  const [search, setSearch] = useState("");
  const [tenants, setTenants] = useState([]);
const [results, setResults] = useState([]);
const backend_url = "http://localhost:5001";
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
  fetchTenants();
}, []);

const fetchTenants = async () => {
  const res = await axios.get(`${backend_url}/api/tenants/all-tenants`);

  setTenants(
    (res.data.data || []).map((t) => ({
      id: t.tenant_id,
      tenant_id: t.tenant_id,
      name: t.org_name,
      domain: t.org_email,
      plan: t.plan_name,
      status: t.status,
      subscriptionStatus: t.subscription_status,
      users: t.current_user_count,
      billing: t.billing_cycle,
      startDate: t.created_at,
    }))
  );
};
  
  const viewLabels = {
    dashboard: "Overview",
    tenants: "Tenant Management",
    billing: "Billing",
    plans: "Plans & Packages",
    announcements: "Announcements",
    settings: "Settings",
  };

  // Sample notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      title: "New tenant registered",
      message: "Cobalt Studio has signed up for the Start plan",
      time: "2 min ago",
      read: false,
      icon: Users,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200"
    },
    {
      id: 2,
      type: "warning",
      title: "Payment failed",
      message: "Arco Retail Group's monthly payment has failed",
      time: "1 hour ago",
      read: false,
      icon: CreditCard,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200"
    },
    {
      id: 3,
      type: "info",
      title: "AI credits low",
      message: "Pinnacle Analytics has used 82% of their AI credits",
      time: "3 hours ago",
      read: true,
      icon: Zap,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200"
    },
    {
      id: 4,
      type: "success",
      title: "Plan upgrade",
      message: "Nexus Dynamics upgraded to Scale plan",
      time: "5 hours ago",
      read: true,
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200"
    },
    {
      id: 5,
      type: "maintenance",
      title: "Scheduled maintenance",
      message: "System maintenance scheduled for July 6, 02:00-04:00 UTC",
      time: "1 day ago",
      read: true,
      icon: Calendar,
      color: "text-violet-600",
      bg: "bg-violet-50",
      border: "border-violet-200"
    },
    {
      id: 6,
      type: "info",
      title: "New announcement created",
      message: "A new announcement has been drafted for all tenants",
      time: "2 days ago",
      read: true,
      icon: Megaphone,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200"
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
    showToast("All notifications marked as read", "success");
  };

  const clearAll = () => {
    setNotifications([]);
    showToast("All notifications cleared", "info");
  };

  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const getTypeStyles = (type) => {
    const styles = {
      success: { icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", tag: "Success" },
      warning: { icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", tag: "Warning" },
      info: { icon: Info, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", tag: "Info" },
      maintenance: { icon: Clock, color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-200", tag: "Maintenance" },
    };
    return styles[type] || styles.info;
  };

  const formatTime = (timeStr) => {
    return timeStr;
  };

  // Toast component for notification feedback
  const ToastMessage = ({ message, type, onClose }) => {
    const getStyles = () => {
      switch(type) {
        case 'success': return 'bg-emerald-50 border-emerald-200 text-emerald-800';
        case 'error': return 'bg-red-50 border-red-200 text-red-800';
        case 'warning': return 'bg-amber-50 border-amber-200 text-amber-800';
        default: return 'bg-blue-50 border-blue-200 text-blue-800';
      }
    };

    const getIcon = () => {
      switch(type) {
        case 'success': return <CheckCircle className="w-5 h-5 text-emerald-600" />;
        case 'error': return <AlertTriangle className="w-5 h-5 text-red-600" />;
        case 'warning': return <AlertCircle className="w-5 h-5 text-amber-600" />;
        default: return <Info className="w-5 h-5 text-blue-600" />;
      }
    };

    return (
      <div className="fixed top-4 right-4 z-[9999] animate-slide-in">
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${getStyles()}`}>
          {getIcon()}
          <span className="text-sm font-medium">{message}</span>
          <button onClick={onClose} className="ml-2 hover:opacity-70 transition-opacity">
            <X className="w-4 h-4" />
          </button>
        </div>
        <style>{`
          @keyframes slide-in {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-slide-in { animation: slide-in 0.3s ease-out; }
        `}</style>
      </div>
    );
  };

  return (
    <header className="h-14 flex-shrink-0 border-b border-gray-100 flex items-center justify-between px-6 bg-white relative z-40">
      {toast && <ToastMessage {...toast} onClose={() => setToast(null)} />}
      
      <span className="text-sm font-semibold text-gray-900">{viewLabels[currentView] || "Dashboard"}</span>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            value={search}
            onChange={(e) => {
  const value = e.target.value;
  setSearch(value);

  if (!value.trim()) {
    setResults([]);
    return;
  }

  setResults(
    tenants.filter((t) =>
      t.name.toLowerCase().includes(value.toLowerCase()) ||
      t.domain.toLowerCase().includes(value.toLowerCase()) ||
      t.tenant_id.toLowerCase().includes(value.toLowerCase())
    )
  );
}}
            placeholder="Search tenants…"
            className="bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-3 py-1.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-violet-400 w-52 font-mono"
          />

          {results.length > 0 && (
  <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border z-50 overflow-hidden">

    {results.map((tenant) => (
      <button
        key={tenant.id}
        className="w-full text-left px-4 py-3 hover:bg-violet-50 border-b last:border-b-0"
        onClick={() => {
          setCurrentView("tenants");
          setSelectedTenant(tenant);
          setSearch("");
          setResults([]);
        }}
      >
        <div className="font-medium">
          {tenant.name}
        </div>

        <div className="text-xs text-gray-500">
          {tenant.domain}
        </div>
      </button>
    ))}

  </div>
)}
        </div>
        
        {/* Notification Bell */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative w-8 h-8 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <Bell className="w-4 h-4 text-gray-500" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Panel */}
          {showNotifications && (
            <>
              <div 
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 top-[calc(100%+8px)] w-[400px] max-h-[520px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-slide-down">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-900">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="text-xs font-medium text-white bg-red-500 px-2 py-0.5 rounded-full">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllAsRead}
                        className="text-xs font-medium text-violet-600 hover:text-violet-700 transition-colors"
                      >
                        Mark all read
                      </button>
                    )}
                    {notifications.length > 0 && (
                      <button 
                        onClick={clearAll}
                        className="text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                </div>

                {/* Notification List */}
                <div className="overflow-y-auto max-h-[420px]">
                  {notifications.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                      {notifications.map((notification) => {
                        const styles = getTypeStyles(notification.type);
                        const IconComponent = notification.icon || styles.icon;
                        return (
                          <div 
                            key={notification.id}
                            className={`px-5 py-3 hover:bg-gray-50 transition-colors cursor-pointer ${
                              !notification.read ? 'bg-violet-50/30 border-l-4 border-violet-500' : ''
                            }`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`flex-shrink-0 w-9 h-9 rounded-full ${styles.bg} flex items-center justify-center border ${styles.border}`}>
                                <IconComponent className={`w-4 h-4 ${styles.color}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${styles.bg} ${styles.color}`}>
                                    {styles.tag}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5">{notification.message}</p>
                                <div className="flex items-center gap-2 mt-1.5">
                                  <span className="text-[10px] text-gray-400">{notification.time}</span>
                                  {!notification.read && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                        <Bell className="w-6 h-6 text-gray-300" />
                      </div>
                      <p className="text-sm font-medium text-gray-400">No notifications</p>
                      <p className="text-xs text-gray-300 mt-1">You're all caught up!</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                {notifications.length > 0 && (
                  <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50 text-center">
                    <button 
                      onClick={() => setShowNotifications(false)}
                      className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.2s ease-out;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </header>
  );
};

export default Topbar;
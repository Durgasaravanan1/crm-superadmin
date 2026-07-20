import React, { useState, useEffect } from "react";
import { 
  Plus, Download, PauseCircle, CheckCircle, Building2, X, Clock, AlertTriangle, Package, Info, Sparkles,
  Minus, ChevronDown, ChevronUp, Phone, Users, Check, Zap, TrendingUp, Award, MoreVertical,
  Edit, FileText, CreditCard
} from "lucide-react";
import axios from "axios";
import * as XLSX from "xlsx";

const backend_url = "http://localhost:5001";

const Toast = ({ message, type, onClose }) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-600" />,
    error: <AlertTriangle className="w-5 h-5 text-red-600" />,
    info: <Info className="w-5 h-5 text-violet-600" />,
  };
  
  const colors = {
    success: "bg-emerald-50 border-emerald-200 text-emerald-800",
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-violet-50 border-violet-200 text-violet-800",
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-down">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${colors[type]}`}>
        {icons[type]}
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onClose} className="ml-2 hover:opacity-70 transition-opacity">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const map = {
    active: { label: "Active", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    suspended: { label: "Suspended", cls: "bg-red-50 text-red-600 border-red-200" },
    trial: { label: "Trial", cls: "bg-amber-50 text-amber-700 border-amber-200" },
  };
  const s = map[status] || map.active;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${s.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === "active" ? "bg-emerald-500" : status === "suspended" ? "bg-red-500" : "bg-amber-500"}`} />
      {s.label}
    </span>
  );
};

const CreditBar = ({ used, total }) => {
  const pct = Math.round((used / total) * 100);
  const color = pct > 90 ? "bg-red-500" : pct > 70 ? "bg-amber-500" : "bg-violet-500";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-mono text-gray-400 w-8 text-right">{pct}%</span>
    </div>
  );
};

const SubscriptionStatusBadge = ({ status }) => {
  const map = {
    active: {
      label: "🟢 Active",
      cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    suspended: {
      label: "🔴 Suspended",
      cls: "bg-red-50 text-red-600 border-red-200",
    },
    trialing: {
      label: "🟡 Trialing",
      cls: "bg-amber-50 text-amber-700 border-amber-200",
    },
    trial_expired: {
      label: "🔴 Trial Expired",
      cls: "bg-red-50 text-red-600 border-red-200",
    },
    payment_failed: {
      label: "💳 Payment Failed",
      cls: "bg-orange-50 text-orange-600 border-orange-200",
    },
  };

  const s = map[status] || {
    label: status,
    cls: "bg-gray-50 text-gray-600 border-gray-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${s.cls}`}
    >
      {s.label}
    </span>
  );
};

// ---------- Redesigned dropdown menu (rendered via fixed positioning) ----------
const TenantDropdown = ({
  tenant,
  anchor,
  onClose,
  toggleStatus,
  openExtendTrialModal,
  generateInvoice,
  setSelectedTenant,
}) => {
 const showTrialActions =
  tenant?.status === "suspended" &&
  (
    tenant?.subscriptionStatus === "trialing" ||
    tenant?.subscriptionStatus === "trial_expired"
  );

  const menuItems = [
    {
      group: "Manage",
      items: [
        {
          icon: Edit,
          label: "Edit tenant",
          color: "text-gray-500",
          bg: "bg-gray-100",
          onClick: () => {
  setSelectedTenant(tenant);
  onClose();
},
        },
        {
          icon: PauseCircle,
          label: tenant?.status === "active" ? "Suspend tenant" : "Activate tenant",
          color: tenant?.status === "active" ? "text-red-500" : "text-emerald-600",
          bg: tenant?.status === "active" ? "bg-red-50" : "bg-emerald-50",
          onClick: () => { toggleStatus(tenant); onClose(); },
        },
      ],
    },
    ...(showTrialActions
  ? [{
      group: "Trial",
      items: [
        {
          icon: Clock,
          label: "Extend Trial",
          color: "text-amber-600",
          bg: "bg-amber-50",
          onClick: () => openExtendTrialModal(tenant),
        },
      ],
    }]
  : []),
    {
      group: "Billing",
      items: [
        {
          icon: FileText,
          label: "Generate invoice",
          color: "text-violet-600",
          bg: "bg-violet-50",
          onClick: () => generateInvoice(tenant?.tenant_id),
        },
        ...(tenant?.paymentStatus === "pending"
          ? [{
              icon: CreditCard,
              label: "View invoice",
              color: "text-blue-600",
              bg: "bg-blue-50",
              onClick: () => onClose(),
            }]
          : []),
      ],
    },
  ];

  return (
    <div
      className="fixed z-[1000] w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 animate-slide-down"
      style={{
        top: anchor?.openUpward ? "auto" : anchor?.top,
        bottom: anchor?.openUpward ? window.innerHeight - anchor?.top + 6 : "auto",
        left: Math.max(8, anchor?.left),
        maxHeight: 'calc(100vh - 20px)',
        overflowY: 'auto'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="px-4 pb-2 mb-1 border-b border-gray-50">
        <div className="text-xs font-semibold text-gray-900 truncate">{tenant?.name || ''}</div>
        <div className="text-[10px] font-mono text-gray-400 truncate">{tenant?.tenant_id || ''}</div>
      </div>

      {menuItems.map((section, i) => (
        <div key={section.group} className={i > 0 ? "mt-1 pt-1 border-t border-gray-50" : ""}>
          <div className="px-4 py-1 text-[10px] font-mono uppercase tracking-wider text-gray-300">
            {section.group}
          </div>
          {section.items.map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className="w-full px-3 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors group"
            >
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center ${item.bg}`}>
                <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
              </span>
              <span className="text-sm text-gray-700 group-hover:text-gray-900">{item.label}</span>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const planDetails = {
  Start: {
    icon: Zap,
    gradient: "from-cyan-500 to-blue-500",
    color: "#06b6d4",
    description: "Perfect for small teams",
    monthlyPrice: 4999,
    annualPrice: 38390,
    users: 10,
    features: [
      "10 Users Included",
      "6 Call Users Included",
      "5,000 AI Credits",
      "500 Call Minutes",
      "Email Support"
    ]
  },

  Grow: {
    icon: TrendingUp,
    gradient: "from-emerald-500 to-green-500",
    color: "#10b981",
    description: "Best for growing businesses",
    monthlyPrice: 6999,
    annualPrice: 67190,
    users: 20,
    features: [
      "20 Users Included",
      "16 Call Users Included",
      "15,000 AI Credits",
      "2,000 Call Minutes",
      "Priority Support",
      "Notion Integration"
    ]
  },

  Scale: {
    icon: Award,
    gradient: "from-violet-500 to-purple-600",
    color: "#8b5cf6",
    description: "For large enterprises",
    monthlyPrice: 12999,
    annualPrice: 124790,
    users: 40,
    features: [
      "40 Users Included",
      "36 Call Users Included",
      "50,000 AI Credits",
      "5,000 Call Minutes",
      "Dedicated Support",
      "Advanced Integrations"
    ]
  }
};

const Tenants = ({
  selectedTenant,
  setSelectedTenant,
}) => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPlan, setFilterPlan] = useState("all");
  // const [selectedTenant, setSelectedTenant] = useState(null);
  const [addCreditsOpen, setAddCreditsOpen] = useState(false);
  const [creditInput, setCreditInput] = useState("");
  const [addTenantOpen, setAddTenantOpen] = useState(false);
  const [tenantForm, setTenantForm] = useState({
    company_name: "",
    full_name: "",
    email: "",
    mobile_number: "",
    timezone: "Asia/Kolkata",
    currency: "INR",
    billing_cycle: "monthly",
    plan_slug: "starter",
    max_call_users: 0,
  });
  const [tenantFormError, setTenantFormError] = useState("");
  const [pendingPlan, setPendingPlan] = useState(null);
  const [toast, setToast] = useState(null);
  const [expandedPlan, setExpandedPlan] = useState("Start");
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [days, setDays] = useState(3);

  // Dropdown state: which tenant's menu is open + where to position it
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [dropdownAnchor, setDropdownAnchor] = useState(null); // { top, left, openUpward }

  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const [trialTenant, setTrialTenant] = useState(null);

  const [showPreviewModal, setShowPreviewModal] = useState(false);
const [previewData, setPreviewData] = useState(null);

 const openExtendTrialModal = (tenant) => {
  setSelectedTenant(null);   // Close sidebar first

  setTrialTenant(tenant);
  setDays(3);

  setShowTrialModal(true);

  setDropdownOpen(null);
  setDropdownAnchor(null);
};

  const extendTrial = async () => {
    try {
      await axios.put(
        `${backend_url}/api/tenants/extend-trial/${trialTenant?.tenant_id}`,
        { days }
      );
      showToast("Trial Extended Successfully", "success");
      fetchTenants();
      setShowTrialModal(false);
      setTrialTenant(null);
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to extend trial", "error");
    }
  };

  const previewInvoice = async (tenantId) => {
  try {
    const res = await axios.get(
      `${backend_url}/api/invoices/preview/${tenantId}`
    );

    console.log("Preview API Response:", res.data.data);

    setPreviewData(res.data.data);

    setShowPreviewModal(true);

    setDropdownOpen(null);

    setDropdownAnchor(null);
  } catch (err) {
    showToast(
      err.response?.data?.message || "Failed to preview invoice",
      "error"
    );
  }
};

  const generateInvoice = async (tenantId) => {
    try {
      const response = await axios.post(
        `${backend_url}/api/invoices/generate/${tenantId}`
      );
      setInvoiceData(response.data.data);
      setShowInvoiceModal(true);
      setDropdownOpen(null);
      setDropdownAnchor(null);
      showToast("Invoice generated successfully", "success");
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to generate invoice", "error");
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchTenants = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backend_url}/api/tenants/all-tenants`);
      setTenants(
        (res.data?.data || []).map((t) => ({
          id: t.tenant_id,
          name: t.org_name,
          domain: t.org_email,
          plan: t.plan_name,
          status: t.status,
          subscriptionStatus: t.subscription_status,
          isTrialActive: t.is_trial_active,
          users: t.current_user_count,
          aiCredits: t.ai_credits,
          usedCredits: t.used_ai_credits,
          startDate: t.created_at,
          nextInvoiceDate: t.next_invoice_date,
          trialEnd: t.trial_end_date,
          billing: t.billing_cycle,
          email: t.org_email,
          owner: t.org_name,
          paymentStatus: t.payment_status,
          tenant_id: t.tenant_id,
        }))
      );
    } catch (err) {
      console.error("Error fetching tenants:", err);
      showToast("Failed to load tenants", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const deleteTenant = async (tenantId) => {
    try {
      await axios.delete(`${backend_url}/api/tenants/delete/${tenantId}`);
      showToast("Tenant deleted successfully", "success");
      setSelectedTenant(null);
      fetchTenants();
    } catch (err) {
      console.error(err);
      showToast("Failed to delete tenant", "error");
    }
  };

  const filtered = tenants.filter((t) => {
  const q = search.toLowerCase();

  const matchesSearch =
    t.name.toLowerCase().includes(q) ||
    t.domain.toLowerCase().includes(q) ||
    t.id.toLowerCase().includes(q);



 const matchesStatus =
  filterStatus === "all"
    ? true
    : filterStatus === "active"
    ? t.subscriptionStatus === "subscribed"
    : filterStatus === "trial"
    ? t.subscriptionStatus === "trialing"
    : filterStatus === "suspended"
    ? t.status === "suspended" ||
      ["trial_expired", "plan_expired"].includes(t.subscriptionStatus)
    : true;

  const matchesPlan =
    filterPlan === "all" || t.plan === filterPlan;

  return matchesSearch && matchesStatus && matchesPlan;
});

const exportTenants = () => {
  const data = filtered.map((t) => ({
    Tenant: t.name,
    Email: t.domain,
    Plan: t.plan,
    Status: t.status,
    "Subscription Status": t.subscriptionStatus,
    Users: t.users,
    "Expires In": getExpiryText(t),
    Billing: t.billing,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Tenants");

  XLSX.writeFile(
    workbook,
    `Tenants_${new Date().toISOString().split("T")[0]}.xlsx`
  );
};

    const getExpiryText = (tenant) => {
  const today = new Date();

  const targetDate =
    tenant.subscriptionStatus === "trialing"
      ? tenant.trialEnd
      : tenant.nextInvoiceDate;

  if (!targetDate) return "-";

  const target = new Date(targetDate);

  const diffDays = Math.ceil(
    (target - today) / (1000 * 60 * 60 * 24)
  );

  if (diffDays > 1) return `${diffDays} days left`;
  if (diffDays === 1) return "1 day left";
  if (diffDays === 0) return "Today";
  if (diffDays === -1) return "Yesterday";

  return `Expired ${Math.abs(diffDays)} days ago`;
};

  const toggleStatus = async (tenant) => {
    try {
      const newStatus = tenant.status === "active" ? "suspended" : "active";
      await axios.patch(`${backend_url}/api/tenants/status/${tenant.id}`, {
        status: newStatus,
      });
      showToast(
        newStatus === "active" ? "Tenant activated successfully" : "Tenant suspended successfully"
      );
      fetchTenants();
      if (selectedTenant?.id === tenant.id) {
        setSelectedTenant({
          ...selectedTenant,
          status: newStatus,
        });
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to update tenant status", "error");
    }
  };

const addCredits = async () => {
   console.log("Selected Tenant:", selectedTenant);
  try {
    const credits = parseInt(creditInput);

    if (!credits || credits <= 0) {
      showToast("Please enter a valid credit amount", "error");
      return;
    }

    await axios.post(`${backend_url}/api/ai/add-credits`, {
      tenant_id: selectedTenant.tenant_id,
      credits,
    });

    showToast(`${credits.toLocaleString()} credits added successfully!`, "success");

    setCreditInput("");
    setAddCreditsOpen(false);

    fetchTenants();

    // Update selected tenant details immediately
    setSelectedTenant((prev) =>
      prev
        ? {
            ...prev,
            aiCredits: Number(prev.aiCredits) + credits,
          }
        : prev
    );
  } catch (err) {
    console.error(err);
    showToast(
      err.response?.data?.message || "Failed to add AI credits",
      "error"
    );
  }
};

  const handlePlanSelect = (plan) => {
    const slugMap = {
      Start: "starter",
      Grow: "growth",
      Scale: "scale",
    };
    setExpandedPlan(plan);
    setTenantForm(prev => ({
      ...prev,
      plan_slug: slugMap[plan],
      max_call_users: 0,
    }));
  };

  const submitAddTenant = async () => {
    try {
      await axios.post(`${backend_url}/api/subscription/create`, tenantForm);
      showToast("Tenant created successfully", "success");
      setAddTenantOpen(false);
      fetchTenants();
      setTenantForm({
        company_name: "",
        full_name: "",
        email: "",
        mobile_number: "",
        timezone: "Asia/Kolkata",
        currency: "INR",
        billing_cycle: "monthly",
        plan_slug: "starter",
        max_call_users: 0,
      });
    } catch (err) {
      console.error(err);
      showToast(
        err.response?.data?.message || "Failed to create tenant",
        "error"
      );
    }
  };

  const submitPlanChange = () => {
    if (!selectedTenant || !pendingPlan || pendingPlan === selectedTenant.plan) return;
    setTenants(prev => prev.map(t => t.id === selectedTenant.id ? { ...t, plan: pendingPlan } : t));
    setSelectedTenant(prev => prev ? { ...prev, plan: pendingPlan } : null);
    setPendingPlan(null);
    showToast(`Plan changed to ${pendingPlan} successfully!`, "success");
  };

  const activeCount = tenants.filter(t => t.status === "active").length;
  const trialCount = tenants.filter(t => t.isTrialActive).length;
  const suspendedCount = tenants.filter(t => t.status === "suspended").length;

  

  // Handles opening the dropdown for a given row — computes position from the
  // clicked button's bounding rect so it renders correctly regardless of table scroll/clip.
  const handleDropdownToggle = (e, tenant) => {
    e.stopPropagation();
    if (dropdownOpen === tenant.id) {
      setDropdownOpen(null);
      setDropdownAnchor(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
   const estimatedHeight =
  tenant.status === "suspended" &&
  (
    tenant.subscriptionStatus === "trialing" ||
    tenant.subscriptionStatus === "trial_expired"
  )
    ? 430
    : 330;

const spaceBelow = window.innerHeight - rect.bottom;
const spaceAbove = rect.top;

let openUpward = false;
let top = rect.bottom + 8;

if (spaceBelow < estimatedHeight && spaceAbove > estimatedHeight) {
  openUpward = true;
  top = rect.top - estimatedHeight - 8;
}
    
    const left = Math.min(
      Math.max(rect.right - 224, 10),
      window.innerWidth - 234
    );
    
    setDropdownAnchor({
      top: top,
      left: left,
      openUpward: openUpward,
    });
    setDropdownOpen(tenant.id);
  };

  const closeDropdown = () => {
    setDropdownOpen(null);
    setDropdownAnchor(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 text-sm">Loading tenants...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div>
        <h2 className="text-2xl font-bold text-gray-900">Tenant Management</h2>
        <p className="text-sm text-gray-400 mt-1">Manage all your tenant accounts and their subscriptions</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total", value: tenants.length, color: "#111827" },
          { label: "Active", value: activeCount, color: "#059669" },
          { label: "Trial", value: trialCount, color: "#d97706" },
          { label: "Suspended", value: suspendedCount, color: "#dc2626" },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{s.label}</span>
            <span className="text-xl font-bold font-mono" style={{ color: s.color }}>{s.value}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono text-gray-400 mr-1">Status:</span>
          {["all", "active", "trial", "suspended"].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-colors ${filterStatus === s ? "bg-violet-600 text-white border-violet-600" : "bg-white border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-300"}`}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono text-gray-400 mr-1">Plan:</span>
          {["all", "Start", "Grow", "Scale"].map(p => (
            <button key={p} onClick={() => setFilterPlan(p)}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-colors ${filterPlan === p ? "bg-violet-600 text-white border-violet-600" : "bg-white border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-300"}`}>
              {p}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={exportTenants} className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono bg-white border border-gray-200 text-gray-500 rounded-lg hover:text-gray-800 hover:border-gray-300 transition-colors">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          <button onClick={() => setAddTenantOpen(true)} className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
            <Plus className="w-3.5 h-3.5" /> New Tenant
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden overflow-x-auto relative">
        <div className="overflow-x-auto overflow-y-visible">
          <table className="w-full min-w-[850px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                {["Tenant", "Plan", "Status", "Subscription Status", "Users", "Expires In", "Billing", ""].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-mono uppercase tracking-widest text-gray-400 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => (
                <tr key={t.id}
                  className={`border-b border-gray-50 last:border-0 cursor-pointer transition-colors hover:bg-violet-50/30 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}
                  onClick={() => { setSelectedTenant(t); setPendingPlan(null); }}>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-violet-100 flex items-center justify-center text-xs font-bold text-violet-700 flex-shrink-0">
                        {t.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{t.name}</div>
                        <div className="text-xs font-mono text-gray-400">{t.domain}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs font-mono px-2 py-0.5 rounded-lg border ${t.plan === "Scale" ? "text-violet-700 bg-violet-50 border-violet-200" : t.plan === "Grow" ? "text-cyan-700 bg-cyan-50 border-cyan-200" : "text-gray-600 bg-gray-50 border-gray-200"}`}>
                      {t.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex flex-col gap-1">
                      <StatusBadge status={t.status} />
                      {t.status === "trial" && t.trialEnd && (
                        <span className="text-[10px] font-mono text-amber-600">Ends {t.trialEnd}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <SubscriptionStatusBadge status={t.subscriptionStatus} />
                  </td>
                  <td className="px-4 py-3.5 text-sm font-mono text-gray-700">{t.users}</td>
                  <td className="px-4 py-3.5">
  <span
    className={`text-xs font-medium ${
      getExpiryText(t).includes("Expired")
        ? "text-red-600"
        : getExpiryText(t).includes("Today")
        ? "text-amber-600"
        : "text-gray-700"
    }`}
  >
    {getExpiryText(t)}
  </span>
</td>
                  <td className="px-4 py-3.5 text-xs font-mono text-gray-700">{t.billing}</td>
                  <td className="px-4 py-3.5 relative" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={(e) => handleDropdownToggle(e, t)}
                      className={`p-2 rounded-lg transition-colors relative z-10 ${dropdownOpen === t.id ? "bg-gray-100" : "hover:bg-gray-100"}`}
                    >
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-gray-400 text-sm font-mono">No tenants match your filters</div>
        )}
      </div>

      {/* Dropdown menu - Rendered at root level with fixed positioning */}
      {dropdownOpen && dropdownAnchor && (
        <>
          {/* Backdrop to close dropdown when clicking outside */}
          <div 
            className="fixed inset-0 z-[999]" 
            onClick={closeDropdown}
          />
          <TenantDropdown
            tenant={filtered.find(t => t.id === dropdownOpen)}
  anchor={dropdownAnchor}
  onClose={closeDropdown}
  toggleStatus={toggleStatus}
  openExtendTrialModal={openExtendTrialModal}
  generateInvoice={previewInvoice}
  setSelectedTenant={setSelectedTenant}
          />
        </>
      )}

      {/* Extend Trial Modal */}
      {showTrialModal && trialTenant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setShowTrialModal(false)}>
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 w-[90%] max-w-[440px] p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Extend Trial</h3>
                <p className="text-sm text-gray-500 mt-1">{trialTenant.name}</p>
              </div>
              <button onClick={() => setShowTrialModal(false)} className="w-8 h-8 rounded-xl hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Days to extend</label>
                <input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value) || 0)}
                  min="1"
                  max="30"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-lg font-mono focus:outline-none focus:border-violet-400"
                />
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-3">
                <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <div className="text-xs text-amber-700">
                  Current trial ends: {trialTenant.trialEnd || "N/A"}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
              <button onClick={() => setShowTrialModal(false)} className="px-4 py-2 rounded-xl text-sm border border-gray-200 text-gray-500 hover:text-gray-800">Cancel</button>
              <button onClick={extendTrial} className="px-4 py-2 rounded-xl text-sm font-semibold bg-amber-600 text-white hover:bg-amber-700 transition-colors">
                Extend Trial
              </button>
            </div>
          </div>
        </div>
      )}

      {
showPreviewModal && previewData && (

<div className="fixed inset-0 z-50 flex items-center justify-center">

<div className="absolute inset-0 bg-black/30 backdrop-blur-sm"/>

<div className="relative bg-white rounded-2xl w-[650px] p-6">

<h2 className="text-xl font-bold mb-5">
Invoice Preview
</h2>

<div className="grid grid-cols-2 gap-4 text-sm">

<div>
<b>Tenant</b>

<p>{previewData.tenant_name}</p>
</div>

<div>
<b>Email</b>

<p>{previewData.tenant_email}</p>
</div>

<div>
<b>Plan</b>

<p>{previewData.plan_name}</p>
</div>

<div>
<b>Billing</b>

<p>{previewData.billing_cycle}</p>
</div>

<div>
<b>Invoice Date</b>

<p>{formatDate(previewData.invoice_date)}</p>
</div>

<div>
<b>Due Date</b>

<p>{formatDate(previewData.due_date)}</p>
</div>

</div>

<hr className="my-5"/>

<div className="space-y-2">

<div className="flex justify-between">
<span>Plan Amount</span>
<span>₹{previewData.plan_amount}</span>
</div>

<div className="flex justify-between">
<span>Additional Users</span>
<span>
₹{previewData.additional_users_amount}
</span>
</div>

<div className="flex justify-between">
<span>Call Users</span>
<span>
₹{previewData.additional_call_users_amount}
</span>
</div>

<div className="flex justify-between">
<span>Tax</span>
<span>₹{previewData.tax}</span>
</div>

<div className="flex justify-between">
<span>Discount</span>
<span>₹{previewData.discount}</span>
</div>

<hr/>

<div className="flex justify-between text-lg font-bold">
<span>Total</span>
<span>
₹{previewData.total}
</span>
</div>

</div>

<div className="flex justify-end gap-3 mt-6">

<button
onClick={()=>{
setShowPreviewModal(false);
}}
className="px-5 py-2 border rounded-xl"
>
Cancel
</button>

<button
onClick={()=>{
generateInvoice(trialTenant?.tenant_id || previewData.tenant_id);
}}
className="px-5 py-2 bg-violet-600 text-white rounded-xl"
>
Generate Invoice
</button>

</div>

</div>

</div>

)}

      {/* Invoice Modal */}
      {showInvoiceModal && invoiceData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setShowInvoiceModal(false)}>
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 w-[90%] max-w-[500px] p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Invoice Generated</h3>
              <button onClick={() => setShowInvoiceModal(false)} className="w-8 h-8 rounded-xl hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Invoice #</span>
                  <span className="font-mono font-medium">{invoiceData.invoice_number || "N/A"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Amount</span>
                  <span className="font-mono font-bold text-lg text-violet-600">
    ₹{invoiceData.total_amount ?? 0}
  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    invoiceData.status === "paid" 
                      ? "bg-emerald-100 text-emerald-700" 
                      : "bg-amber-100 text-amber-700"
                  }`}>
                    {invoiceData.status || "Pending"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Date</span>
                  <span className="font-mono">
    {formatDate(invoiceData.invoice_date)}
  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-violet-600 text-white hover:bg-violet-700 transition-colors"
                >
                  Download PDF
                </button>
                <button 
                  onClick={() => setShowInvoiceModal(false)}
                  className="flex-1 py-2.5 rounded-xl text-sm border border-gray-200 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Tenant Modal */}
      {addTenantOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => { setAddTenantOpen(false); setTenantFormError(""); setExpandedPlan("Start"); }}>
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 w-[90%] max-w-[700px] max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Add New Tenant</h2>
                <p className="text-xs text-gray-400 mt-0.5">A trial account will be created and activated immediately.</p>
              </div>
              <button onClick={() => { setAddTenantOpen(false); setTenantFormError(""); setExpandedPlan("Start"); }}
                className="w-8 h-8 rounded-xl hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-gray-500 block mb-1.5">
                    Company Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    value={tenantForm.company_name}
                    onChange={(e) => setTenantForm({ ...tenantForm, company_name: e.target.value })}
                    placeholder="Acme Corporation"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1.5">Owner Name <span className="text-red-400">*</span></label>
                  <input value={tenantForm.full_name} onChange={e => setTenantForm(f => ({ ...f, full_name: e.target.value }))}
                    placeholder="John Smith"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-400 transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1.5">Owner Email <span className="text-red-400">*</span></label>
                  <input value={tenantForm.email} onChange={e => setTenantForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="john@acme.com" type="email"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-400 transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1.5">Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="+91 9876543210"
                    value={tenantForm.mobile_number}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-400 transition-colors"
                    onChange={(e) => setTenantForm({ ...tenantForm, mobile_number: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1.5">Billing Cycle</label>
                  <select
                    value={tenantForm.billing_cycle}
                    onChange={(e) => setTenantForm({ ...tenantForm, billing_cycle: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="annual">Annual</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1.5">Timezone</label>
                  <select
                    value={tenantForm.timezone}
                    onChange={(e) => setTenantForm({ ...tenantForm, timezone: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5"
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata</option>
                    <option value="Asia/Dubai">Asia/Dubai</option>
                    <option value="Europe/London">Europe/London</option>
                    <option value="America/New_York">America/New_York</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1.5">Currency</label>
                  <select
                    value={tenantForm.currency}
                    onChange={(e) => setTenantForm({ ...tenantForm, currency: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5"
                  >
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                    <option value="AED">AED</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
              </div>

              {/* Plan Selection */}
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-3">Select Plan</label>
                <div className="space-y-3">
                  {["Start", "Grow", "Scale"].map(plan => {
                    const details = planDetails[plan];
                    const slugMap = {
                      Start: "starter",
                      Grow: "growth",
                      Scale: "scale",
                    };
                    const isSelected = tenantForm.plan_slug === slugMap[plan];
                    const isExpanded = expandedPlan === plan;
                    const Icon = details.icon;
                    
                    return (
                      <div key={plan} className="rounded-xl overflow-hidden">
                        <div 
                          className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                            isSelected 
                              ? `border-${plan === 'Start' ? 'cyan' : plan === 'Grow' ? 'emerald' : 'violet'}-500 shadow-lg bg-white` 
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                          onClick={() => handlePlanSelect(plan)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${details.gradient} flex items-center justify-center text-white shadow-md`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="text-sm font-bold text-gray-900">{plan}</div>
                                <div className="text-xs text-gray-400">{details.description}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <div
  className="text-sm font-bold"
  style={{ color: details.color }}
>
  {tenantForm.billing_cycle === "annual"
    ? `₹${details.annualPrice.toLocaleString()}/yr`
    : `₹${details.monthlyPrice.toLocaleString()}/mo`}
</div>
                                <div className="text-[10px] text-gray-400">{details.users} users</div>
                              </div>
                              {isSelected && (
                                <div className="bg-violet-500 text-white rounded-full p-1">
                                  <Check className="w-4 h-4" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {isExpanded && isSelected && (
                          <div className="mt-2 p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-inner animate-slide-down">
                            <div className="space-y-3">
                              <div>
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">What's Included</div>
                                <div className="space-y-1.5">
                                  {details.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                      <Check className="w-4 h-4" style={{ color: details.color }} />
                                      {feature}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="border-t border-gray-200" />
                              <div>
                                <label className="text-xs font-medium text-gray-500 block mb-2">Additional Call Users</label>
                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={() => {
                                      if (tenantForm.max_call_users > 0) {
                                        setTenantForm(prev => ({ ...prev, max_call_users: prev.max_call_users - 1 }));
                                      }
                                    }}
                                    className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                  <span className="text-lg font-mono min-w-[40px] text-center">{tenantForm.max_call_users}</span>
                                  <button
                                    onClick={() => {
                                      const limits = { Start: 6, Grow: 16, Scale: 36 };
                                      if (tenantForm.max_call_users < limits[plan]) {
                                        setTenantForm(prev => ({ ...prev, max_call_users: prev.max_call_users + 1 }));
                                      }
                                    }}
                                    className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-violet-50 border border-violet-200 rounded-xl px-4 py-3 flex items-center gap-3">
                <Clock className="w-4 h-4 text-violet-500 flex-shrink-0" />
                <div className="text-xs text-violet-700">
                  Trial starts today for <strong>14 days</strong>. No subscription charges apply during the trial period.
                </div>
              </div>

              {tenantFormError && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs text-red-600 font-mono">{tenantFormError}</div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white">
              <button onClick={() => { setAddTenantOpen(false); setTenantFormError(""); setExpandedPlan("Start"); }}
                className="px-4 py-2 rounded-xl text-sm border border-gray-200 text-gray-500 hover:text-gray-800 transition-colors">Cancel</button>
              <button onClick={submitAddTenant}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-violet-600 text-white hover:bg-violet-700 transition-colors">
                <Building2 className="w-4 h-4" /> Create Tenant
              </button>
            </div>
          </div>
        </div>
      )}

     

      {/* Tenant Detail Panel */}
      {selectedTenant && (

        
        
        <div className="fixed inset-0 z-50 flex" onClick={() => { setSelectedTenant(null); setAddCreditsOpen(false); setPendingPlan(null); }}>
          <div className="flex-1 bg-black/20 backdrop-blur-sm" />
          <div className="w-[90%] sm:w-[480px] bg-white border-l border-gray-200 overflow-y-auto shadow-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onClick={e => e.stopPropagation()}>
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-sm font-bold text-violet-700">
                  {selectedTenant.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{selectedTenant.name}</div>
                  <div className="text-xs font-mono text-gray-400">{selectedTenant.domain}</div>
                </div>
              </div>
              <button onClick={() => { setSelectedTenant(null); setAddCreditsOpen(false); setPendingPlan(null); }}
                className="w-8 h-8 rounded-xl hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <StatusBadge status={selectedTenant.status} />
                <button onClick={() => toggleStatus(selectedTenant)}
                  className={`flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-xl border transition-colors ${selectedTenant.status === "active" ? "border-red-200 text-red-500 hover:bg-red-50" : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"}`}>
                  {selectedTenant.status === "active" ? <PauseCircle className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
                  {selectedTenant.status === "active" ? "Suspend" : "Activate"}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { label: "Owner", value: selectedTenant.owner },
                  { label: "Email", value: selectedTenant.email },
                  { label: "Plan", value: selectedTenant.plan },
                  { label: "Billing", value: selectedTenant.billing },
                  { label: "Start Date", value: formatDate(selectedTenant.startDate) },
                  { label: "Users", value: `${selectedTenant.users}` },
                ].map(f => (
                  <div key={f.label} className="bg-gray-50 rounded-xl px-4 py-3">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">{f.label}</div>
                    <div className="text-sm font-medium text-gray-900 truncate">{f.value}</div>
                  </div>
                ))}
              </div>

              {selectedTenant.status === "trial" && selectedTenant.trialEnd && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-3">
                  <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-amber-700">Trial Period Active</div>
                    <div className="text-xs font-mono text-amber-500 mt-0.5">Expires {selectedTenant.trialEnd} · 14-day trial</div>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-violet-600" />
                    <span className="text-sm font-semibold text-gray-900">AI Credits</span>
                  </div>
                  <button onClick={() => setAddCreditsOpen(!addCreditsOpen)}
                    className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
                    <Plus className="w-3 h-3" /> Add Credits
                  </button>
                </div>
                <div className="flex justify-between text-sm font-mono">
                  <span className="text-gray-700">{selectedTenant.usedCredits?.toLocaleString() || 0} used</span>
                  <span className="text-gray-400">of {selectedTenant.aiCredits?.toLocaleString() || 0}</span>
                </div>
                <CreditBar used={selectedTenant.usedCredits || 0} total={selectedTenant.aiCredits || 0} />
                <div className="text-xs font-mono text-gray-400">{(selectedTenant.aiCredits - selectedTenant.usedCredits)?.toLocaleString() || 0} credits remaining</div>

                {addCreditsOpen && (
                  <div className="pt-3 border-t border-gray-200 space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      {[1000, 5000, 10000].map(amt => (
                        <button key={amt} onClick={() => setCreditInput(String(amt))}
                          className={`py-1.5 text-xs font-mono rounded-lg border transition-colors ${creditInput === String(amt) ? "border-violet-500 bg-violet-50 text-violet-700" : "border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-300"}`}>
                          +{(amt / 1000).toFixed(0)}K
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input type="number" value={creditInput} onChange={e => setCreditInput(e.target.value)}
                        placeholder="Custom amount"
                        className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-violet-400" />
                      <button  onClick={addCredits}
                        className="px-4 py-2 bg-violet-600 text-white text-sm font-mono rounded-lg hover:bg-violet-700 transition-colors">Add</button>
                    </div>
                  </div>
                )}
              </div>

              {/* <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-cyan-600" />
                  <span className="text-sm font-semibold text-gray-900">Change Plan</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {["Start", "Grow", "Scale"].map(p => {
                    const active = (pendingPlan ?? selectedTenant.plan) === p;
                    return (
                      <button key={p} onClick={() => setPendingPlan(p === selectedTenant.plan && !pendingPlan ? null : p)}
                        className={`py-2 text-xs font-mono rounded-xl border transition-colors ${active ? "border-violet-500 bg-violet-50 text-violet-700 font-semibold" : "border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-300"}`}>
                        {p}
                      </button>
                    );
                  })}
                </div>
                {pendingPlan && pendingPlan !== selectedTenant.plan && (
                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex-1 text-xs text-gray-400 font-mono">
                      {selectedTenant.plan} → <span className="text-violet-600 font-semibold">{pendingPlan}</span>
                    </div>
                    <button onClick={() => setPendingPlan(null)} className="px-3 py-1.5 text-xs font-mono border border-gray-200 text-gray-400 rounded-lg hover:text-gray-700 transition-colors">Cancel</button>
                    <button onClick={submitPlanChange} className="px-3 py-1.5 text-xs font-mono bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">Apply Change</button>
                  </div>
                )}
              </div> */}

              <div className="border border-red-100 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span className="text-sm font-semibold text-red-500">Danger Zone</span>
                </div>
                <button onClick={() => {
                  if (window.confirm(`Are you sure you want to delete ${selectedTenant.name}?`)) {
                    deleteTenant(selectedTenant.id);
                  }
                }} className="w-full py-2 text-xs font-mono border border-red-200 text-red-500 rounded-xl hover:bg-red-50 transition-colors">
                  Delete Tenant
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.25s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Tenants;
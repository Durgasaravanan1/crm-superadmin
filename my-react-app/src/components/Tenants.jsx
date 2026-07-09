import React, { useState,useEffect } from "react";
import { 
  Plus, Download, PauseCircle, CheckCircle, Building2, X, Clock, AlertTriangle, Package, Info, Sparkles,
  Minus, ChevronDown, ChevronUp, Phone, Users, Check, Zap, TrendingUp, Award
} from "lucide-react";
import axios from "axios";


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
  const s = map[status];
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

const Tenants = () => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPlan, setFilterPlan] = useState("all");
  const [selectedTenant, setSelectedTenant] = useState(null);
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
  const [expandedPlan, setExpandedPlan] = useState("Start"); // Start with Start expanded

  

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  //Fetch Tenant Details function
const fetchTenants = async () => {
  try {
    setLoading(true);

    const res = await axios.get(
      "http://localhost:5001/api/tenants/all-tenants"
    );

    setTenants(
      (res.data?.data || []).map((t) => ({
        id: t.tenant_id,
        name: t.org_name,
        domain: t.org_email,
        plan: t.plan_name,
        status: t.status,
        users: t.current_user_count,
        aiCredits: t.ai_credits,
        usedCredits: t.used_ai_credits,
        startDate: t.created_at,
        trialEnd: t.trial_end_date,
        billing: t.billing_cycle,
        email: t.org_email,
        owner: t.org_name,
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


//Function for delete tenant
const deleteTenant = async (tenantId) => {
  try {
    await axios.delete(
      `http://localhost:5001/api/tenants/delete/${tenantId}`
    );

    showToast("Tenant deleted successfully");

    setSelectedTenant(null);

    fetchTenants(); // Refresh table
  } catch (err) {
    console.error(err);
    showToast("Failed to delete tenant", "error");
  }
};

  const filtered = tenants.filter(t => {
    const q = search.toLowerCase();
    return (t.name.toLowerCase().includes(q) || t.domain.toLowerCase().includes(q) || t.id.toLowerCase().includes(q))
      && (filterStatus === "all" || t.status === filterStatus)
      && (filterPlan === "all" || t.plan === filterPlan);
  });

const toggleStatus = async (tenant) => {

    try {

        const newStatus =
            tenant.status === "active"
                ? "suspended"
                : "active";

        await axios.patch(
            `http://localhost:5001/api/tenants/status/${tenant.id}`,
            {
                status: newStatus,
            }
        );

        showToast(
            newStatus === "active"
                ? "Tenant activated successfully"
                : "Tenant suspended successfully"
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
  const addCredits = (id, amount) => {
    setTenants(prev => prev.map(t => t.id === id ? { ...t, aiCredits: t.aiCredits + amount } : t));
    setSelectedTenant(prev => prev && prev.id === id ? { ...prev, aiCredits: prev.aiCredits + amount } : prev);
    showToast(`${amount.toLocaleString()} credits added successfully!`, "success");
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
    await axios.post(
      "http://localhost:5001/api/subscription/create",
      tenantForm
    );

    showToast("Tenant created successfully");

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
  const trialCount = tenants.filter(t => t.status === "trial").length;
  const suspendedCount = tenants.filter(t => t.status === "suspended").length;

  const planDetails = {
    Start: { 
      users: 10, 
      defaultCalls: 0, 
      maxCalls: 6,
      color: "#0891b2",
      gradient: "from-cyan-500 to-blue-500",
      description: "Perfect for small teams getting started",
      price: "₹4,999/mo",
      icon: Zap,
      features: [ "10 Users", "Basic Support"]
    },
    Grow: { 
      users: 20, 
      defaultCalls: 0, 
      maxCalls: 16,
      color: "#059669",
      gradient: "from-emerald-500 to-teal-500",
      description: "Ideal for growing businesses",
      price: "₹8,999/mo",
      icon: TrendingUp,
      features: [ "20 Users", "Priority Support", "Advanced Analytics"]
    },
    Scale: { 
      users: 40, 
      defaultCalls: 0, 
      maxCalls: 36,
      color: "#7c5cfc",
      gradient: "from-violet-500 to-purple-500",
      description: "For large enterprises with high volume",
      price: "₹16,999/mo",
      icon: Award,
      features: ["40 Users", "24/7 Dedicated Support", "Custom Integrations", "Enterprise Security"]
    }
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
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono bg-white border border-gray-200 text-gray-500 rounded-lg hover:text-gray-800 hover:border-gray-300 transition-colors">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          <button onClick={() => setAddTenantOpen(true)} className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
            <Plus className="w-3.5 h-3.5" /> New Tenant
          </button>
        </div>
      </div>

      {/* Table */}
      
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[750px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              {["Tenant", "Plan", "Status", "AI Credits", "Users", "Start Date", "Billing", ""].map(h => (
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
                <td className="px-4 py-3.5 w-36">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-700">{t.usedCredits.toLocaleString()}</span>
                      <span className="text-gray-400">/ {t.aiCredits.toLocaleString()}</span>
                    </div>
                    <CreditBar used={t.usedCredits} total={t.aiCredits} />
                  </div>
                </td>
                <td className="px-4 py-3.5 text-sm font-mono text-gray-700">{t.users}</td>
                <td className="px-4 py-3.5 text-xs font-mono text-gray-400">{t.startDate}</td>
                <td className="px-4 py-3.5 text-xs font-mono text-gray-700">{t.billing}</td>
                <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
                  <button onClick={() => toggleStatus(t)}
                    className={`p-2 rounded-lg transition-colors ${
                      t.status === "active" 
                        ? "hover:bg-red-50 text-gray-400 hover:text-red-500" 
                        : "hover:bg-emerald-50 text-gray-400 hover:text-emerald-600"
                    }`}>
                    {t.status === "active" ? <PauseCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-gray-400 text-sm font-mono">No tenants match your filters</div>
        )}
      </div>

      {/* Add Tenant Modal with Auto-Expand on Select */}
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
    onChange={(e) =>
      setTenantForm({
        ...tenantForm,
        company_name: e.target.value,
      })
    }
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
onChange={(e)=>
setTenantForm({
...tenantForm,
mobile_number:e.target.value

})}
/>
</div>
<div>
<label className="text-xs font-medium text-gray-500 block mb-1.5">
Billing Cycle
</label>

<select
value={tenantForm.billing_cycle}
onChange={(e)=>
setTenantForm({
...tenantForm,
billing_cycle:e.target.value
})
}
className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5"
>
<option value="monthly">Monthly</option>
<option value="annual">Annual</option>
</select>
</div>
<div>
<label className="text-xs font-medium text-gray-500 block mb-1.5">
Timezone
</label>

<select
value={tenantForm.timezone}
onChange={(e)=>
setTenantForm({
...tenantForm,
timezone:e.target.value
})
}
className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5"
>
<option value="Asia/Kolkata">Asia/Kolkata</option>
<option value="Asia/Dubai">Asia/Dubai</option>
<option value="Europe/London">Europe/London</option>
<option value="America/New_York">America/New_York</option>
</select>
</div>
<div>
<label className="text-xs font-medium text-gray-500 block mb-1.5">
Currency
</label>

<select
value={tenantForm.currency}
onChange={(e)=>
setTenantForm({
...tenantForm,
currency:e.target.value
})
}
className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5"
>
<option value="INR">INR</option>
<option value="USD">USD</option>
<option value="AED">AED</option>
<option value="EUR">EUR</option>
</select>
</div>

              </div>

              {/* Plan Selection with Auto-Expand */}
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
                        {/* Plan Card */}
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
                                <div className="text-sm font-bold" style={{ color: details.color }}>{details.price}</div>
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

                        {/* Dropdown Content - Auto appears when selected */}
                        {isExpanded && isSelected && (
                          <div className="mt-2 p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-inner animate-slide-down">
                            <div className="space-y-3">
                              {/* Features */}
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

                              {/* Divider */}
                              <div className="border-t border-gray-200" />

                              {/* Call Limit Control */}
                             <div>
<label className="text-xs font-medium text-gray-500 block mb-2">
Additional Call Users
</label>

<div className="flex items-center gap-3">

<button
onClick={()=>{
if(tenantForm.max_call_users>0){
setTenantForm(prev=>({
...prev,
max_call_users:prev.max_call_users-1
}));
}
}}
>
-
</button>
<span>{tenantForm.max_call_users}</span>

<button
onClick={()=>{
const limits={
Start:6,
Grow:16,
Scale:36
};

if(tenantForm.max_call_users<limits[plan]){
setTenantForm(prev=>({
...prev,
max_call_users:prev.max_call_users+1
}));
}
}}
>
+
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
                  Trial starts today for <strong>14 days</strong>. Tenant will be set to <strong>Trial</strong> status with MRR = $0 until upgraded.
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
                  <div className="text-xs font-mono text-gray-400">{selectedTenant.id} · {selectedTenant.domain}</div>
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
                  { label: "Start Date", value: selectedTenant.startDate },
                  { label: "Country", value: selectedTenant.country },
                  { label: "Users", value: `${selectedTenant.users}` },
                  { label: "Last Active", value: selectedTenant.lastActive },
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
                  <span className="text-gray-700">{selectedTenant.usedCredits.toLocaleString()} used</span>
                  <span className="text-gray-400">of {selectedTenant.aiCredits.toLocaleString()}</span>
                </div>
                <CreditBar used={selectedTenant.usedCredits} total={selectedTenant.aiCredits} />
                <div className="text-xs font-mono text-gray-400">{(selectedTenant.aiCredits - selectedTenant.usedCredits).toLocaleString()} credits remaining</div>

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
                      <button onClick={() => { const n = parseInt(creditInput); if (n > 0) { addCredits(selectedTenant.id, n); setCreditInput(""); setAddCreditsOpen(false); } }}
                        className="px-4 py-2 bg-violet-600 text-white text-sm font-mono rounded-lg hover:bg-violet-700 transition-colors">Add</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
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
              </div>

              <div className="border border-red-100 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span className="text-sm font-semibold text-red-500">Danger Zone</span>
                </div>
               <button onClick={() => {
    if (window.confirm(`Are you sure you want to delete ${selectedTenant.name}?`)) {deleteTenant(selectedTenant.id);}}}
  className="w-full py-2 text-xs font-mono border border-red-200 text-red-500 rounded-xl hover:bg-red-50 transition-colors">
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
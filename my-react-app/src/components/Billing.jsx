import { 
  IndianRupee, TrendingUp, CreditCard, ArrowUpRight, ArrowDownRight, 
  Download, Mail, CheckCircle, AlertCircle, X, Info, FileText, Send,
  AlertTriangle
} from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";


// Custom Popup Component
const CustomPopup = ({ isOpen, type, title, message, onClose }) => {
  if (!isOpen) return null;

  const getColors = () => {
    switch(type) {
      case 'success': return { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: 'text-emerald-600', title: 'text-emerald-800', text: 'text-emerald-700', btn: 'bg-emerald-600 hover:bg-emerald-700' };
      case 'error': return { bg: 'bg-red-50', border: 'border-red-200', icon: 'text-red-600', title: 'text-red-800', text: 'text-red-700', btn: 'bg-red-600 hover:bg-red-700' };
      case 'warning': return { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-600', title: 'text-amber-800', text: 'text-amber-700', btn: 'bg-amber-600 hover:bg-amber-700' };
      default: return { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600', title: 'text-blue-800', text: 'text-blue-700', btn: 'bg-blue-600 hover:bg-blue-700' };
    }
  };

  const getIcon = () => {
    switch(type) {
      case 'success': return <CheckCircle className="w-6 h-6" />;
      case 'error': return <AlertTriangle className="w-6 h-6" />;
      case 'warning': return <AlertCircle className="w-6 h-6" />;
      default: return <Info className="w-6 h-6" />;
    }
  };

  const colors = getColors();

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className={`bg-white rounded-2xl shadow-2xl max-w-md w-full border ${colors.border} animate-scale-in`}>
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className={`flex-shrink-0 w-12 h-12 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center`}>
              <div className={colors.icon}>{getIcon()}</div>
            </div>
            <div className="flex-1">
              <h3 className={`text-lg font-semibold ${colors.title} mb-1`}>{title}</h3>
              <p className={`text-sm ${colors.text}`}>{message}</p>
            </div>
            <button onClick={onClose} className="flex-shrink-0 p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-3 mt-6 justify-end">
            <button onClick={onClose} className={`px-5 py-2 text-sm font-medium text-white rounded-xl transition-all shadow-sm hover:shadow-md ${colors.btn}`}>
              Got it
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
        .animate-scale-in { animation: scale-in 0.3s ease-out; }
      `}</style>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, delta, deltaUp, sub, accent = "#7c5cfc" }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-3 hover:shadow-sm transition-shadow">
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">{label}</span>
      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: accent + "15" }}>
        <Icon className="w-4 h-4" style={{ color: accent }} />
      </div>
    </div>
    <div>
      <div className="text-2xl font-semibold text-gray-900 tracking-tight">{value}</div>
      {sub && <div className="text-xs text-gray-400 mt-0.5 font-mono">{sub}</div>}
    </div>
    {delta && (
      <div className={`flex items-center gap-1 text-xs font-mono ${deltaUp ? "text-emerald-600" : "text-red-500"}`}>
        {deltaUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {delta} vs last month
      </div>
    )}
  </div>
);

const Billing = () => {
  const [popup, setPopup] = useState({ isOpen: false, type: "info", title: "", message: "" });
  const [selectedTenant, setSelectedTenant] = useState(null);
 

  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState({this_month_revenue: 0,total_crm_sales_value: 0,});
  const [billingData, setBillingData] = useState([]);
   const totalMRR = tenants.reduce(
  (sum, tenant) => sum + Number(tenant.total_plan_amount || 0),0);

  useEffect(() => {
  fetchBilling();
  fetchOverview();
}, []);

const fetchBilling = async () => {
  try {
    setLoading(true);

    const [tenantRes, invoiceRes] = await Promise.all([
      axios.get("http://localhost:5001/api/tenants/all-tenants"),
      axios.get("http://localhost:5001/api/invoices"),
    ]);

    const tenants = tenantRes.data.data;
    const invoices = invoiceRes.data.data;

   const merged = invoices.map((invoice) => {
  const tenant = tenants.find(
    (t) => t.tenant_id === invoice.tenant_id
  );

  return {
    ...tenant,
    ...invoice,
    tenant_status: tenant?.status,
    tenant_payment_status: tenant?.payment_status,
    invoice_status: invoice.status,
  };
});
console.log(merged);
    setBillingData(merged);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

const fetchOverview = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5001/api/subscriptionPayment/overview"
    );

    if (res.data.success) {
      setOverview(res.data.data);
    }
  } catch (err) {
    console.log(err);
  }
};

const fetchTenants = async () => {
  try {
    setLoading(true);

    const res = await axios.get(
      `http://localhost:5001/api/invoices`
    );

    if (res.data.success) {
      setTenants(res.data.data);
    }
  } catch (err) {
    console.error(err);
    showPopup(
      "error",
      "Error",
      "Failed to fetch billing data."
    );
  } finally {
    setLoading(false);
  }
};

  const showPopup = (type, title, message) => {
    setPopup({ isOpen: true, type, title, message });
  };

  const closePopup = () => {
    setPopup({ ...popup, isOpen: false });
  };

  const downloadBillingCSV = () => {
    try {
      const rows = [
        ["Tenant", "Plan", "MRR", "Status", "Next Invoice"],
        ...tenants.filter(t => t.mrr > 0).map(t => [
          t.org_name, t.plan_name, `$${t.mrr}`, t.invoice_status === "suspended" ? "Failed" : "Current", "Jul 1, 2025"
        ])
      ];
      const csv = rows.map(r => r.map(c => `"${c}"`).join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = "wynsync-billing.csv"; a.click();
      URL.revokeObjectURL(url);
      showPopup("success", "Downloaded!", "CSV downloaded successfully!");
    } catch (error) {
      showPopup("error", "Download Failed", "Failed to download CSV. Please try again.");
    }
  };

  const downloadIndividualInvoice = (tenant) => {
    try {
      const rows = [
        ["Tenant", "Plan", "MRR", "Status", "Next Invoice", "Invoice Date"],
        [
          tenant.org_name, 
          tenant.plan_name, 
          `₹${Number(tenant.total_plan_amount).toLocaleString("en-IN")}`, 
          tenant.invoice_status === "suspended" ? "Failed" : "Current", 
          "Jul 1, 2025",
          new Date().toISOString().split("T")[0]
        ]
      ];
      const csv = rows.map(r => r.map(c => `"${c}"`).join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `${tenant.name.replace(/\s/g, '_')}_invoice.csv`;
      a.click();
      URL.revokeObjectURL(url);
      showPopup("success", "Downloaded!", `Invoice for ${tenant.name} downloaded successfully!`);
    } catch (error) {
      showPopup("error", "Download Failed", "Failed to download invoice. Please try again.");
    }
  };

  const failedPayments = tenants.filter(
    t => t.invoice_status !== "paid"
).length;

  const sendEmailInvoice = (tenant) => {
    // Simulate sending email
    showPopup("info", "Sending Email", `Preparing to send invoice to ${t.org_email}...`);
    
    // Simulate email send delay
    setTimeout(() => {
      showPopup("success", "Email Sent!", `Invoice sent successfully to ${t.org_email}`);
    }, 1500);
  };

const handleMarkAsPaid = async (tenant) => {
  try {
    const res = await axios.post(
      "http://localhost:5001/api/subscriptionPayment/record",
      {
        tenant_id: tenant.tenant_id,
        amount: Number(tenant.total_plan_amount),
        payment_method: "manual"
      }
    );

    if (res.data.success) {
      showPopup(
        "success",
        "Payment Recorded",
        `${tenant.org_name} invoice marked as paid.`
      );

      fetchTenants();
    }
  } catch (err) {
    console.error(err);

    showPopup(
      "error",
      "Payment Failed",
      err.response?.data?.message || "Unable to mark invoice as paid."
    );
  }
};

  if (loading) {
  return (
    <div className="flex justify-center items-center h-80">
      Loading...
    </div>
  );
}

  return (
    <div className="space-y-5">
      <CustomPopup
        isOpen={popup.isOpen}
        type={popup.type}
        title={popup.title}
        message={popup.message}
        onClose={closePopup}
      />

      <div>
        <h2 className="text-2xl font-bold text-gray-900">Billing Overview</h2>
        <p className="text-sm text-gray-400 mt-1">Monitor your revenue and billing status</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard 
          icon={IndianRupee} 
          label="This Month Revenue" 
          value={`₹${Number(
  overview.this_month_revenue
).toLocaleString("en-IN")}`}
          // delta="+11.5%" 
          deltaUp 
          sub="Paid amounts received this month" 
          accent="#059669" 
        />
        <StatCard 
          icon={TrendingUp} 
          label="Total CRM Sales Value" 
          value={`₹${Number(
  overview.total_crm_sales_value
).toLocaleString("en-IN")}`}
          sub="Total value of all tenants (including trial)" 
        />
        {/* <StatCard 
          icon={CreditCard} 
          label="Failed Payments" 
          value={failedPayments}
          sub="Arco Retail Group" 
          accent="#dc2626" 
        /> */}
      </div>
      
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden overflow-x-auto">
        <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm font-semibold text-gray-900">Billing Overview</div>
          <button onClick={downloadBillingCSV} className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono bg-white border border-gray-200 text-gray-500 rounded-lg hover:text-gray-800 hover:border-gray-300 transition-colors">
            <Download className="w-3.5 h-3.5" /> Download All
          </button>
        </div>
        <table className="w-full min-w-[750px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              {["Tenant", "Plan", "MRR", "Next Invoice", "Payment Status", ""].map(h => (
                <th key={h} className="px-5 py-3 text-left text-[10px] font-mono uppercase tracking-widest text-gray-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {billingData
  .filter(t => !t.is_trial_active)
  .map(t => (
              <tr key={t.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-100 to-violet-200 flex items-center justify-center text-xs font-bold text-violet-700">
                      {t.org_name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{t.org_name}</div>
                      <div className="text-[10px] font-mono text-gray-400">{t.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`text-xs font-mono px-2 py-0.5 rounded-lg border ${t.plan_name === "Scale" ? "text-violet-700 bg-violet-50 border-violet-200" : t.plan_name === "Grow" ? "text-cyan-700 bg-cyan-50 border-cyan-200" : "text-gray-600 bg-gray-50 border-gray-200"}`}>
                    {t.plan_name}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-sm font-mono text-emerald-600 font-semibold">₹{Number(t.total_plan_amount || 0).toLocaleString()}</td>
                <td className="px-5 py-3.5 text-xs font-mono text-gray-400">Jul 1, 2025</td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                    t.invoice_status === "pending" 
                      ? "text-red-600 bg-red-50 border-red-200" 
                      : "text-emerald-600 bg-emerald-50 border-emerald-200"
                  }`}>
                    {t.invoice_status === "pending" ? <AlertCircle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                    {t.invoice_status === "pending" ? "Unpaid" : "Paid"}
                  </span>
                </td>
               
                <td className="px-5 py-3.5">
  <div className="flex items-center gap-2">

    <button
      onClick={() => downloadIndividualInvoice(t)}
      className="p-2 rounded-lg hover:bg-violet-50 text-gray-400 hover:text-violet-600"
      title="Download Invoice"
    >
      <Download className="w-4 h-4" />
    </button>

    <button
      onClick={() => sendEmailInvoice(t)}
      className="p-2 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600"
      title="Send Invoice"
    >
      <Mail className="w-4 h-4" />
    </button>

    {t.invoice_status === "pending" ? (
      <button
        onClick={() => handleMarkAsPaid(t)}
        className="px-3 py-2 rounded-lg bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 transition"
      >
        Mark as Paid
      </button>
    ) : (
      <button
        disabled
        className="px-3 py-2 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-medium cursor-not-allowed"
      >
        Paid
      </button>
    )}

  </div>
</td>
              </tr>
            ))}
          </tbody>
        </table>
        {billingData.filter(t => Number(t.total_plan_amount) > 0).length === 0 && (
          <div className="py-16 text-center">
            <CreditCard className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <div className="text-gray-400 text-sm font-medium">No active billing records</div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
        .animate-scale-in { animation: scale-in 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default Billing;
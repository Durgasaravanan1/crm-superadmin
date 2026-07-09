import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Building2,
  IndianRupee,
  Sparkles,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import {
  AreaChart,
  Area,
 XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

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

const Overview = () => {

  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
const activeCount = tenants.filter(
  t => t.status === "active"
).length;

const suspendedCount = tenants.filter(
  t => t.status === "suspended"
).length;

const trialCount = tenants.filter(
  t => t.is_trial_active
).length;

const totalMRR = tenants.reduce(
  (sum, t) => sum + Number(t.total_plan_amount || t.plan_price || 0),
  0
);

const totalAiCredits = tenants.reduce(
  (sum, t) => sum + Number(t.used_ai_credits || 0),
  0
);
  

  useEffect(() => {
  fetchOverview();
}, []);

const fetchOverview = async () => {
  try {
    setLoading(true);

    const res = await axios.get(
      `http://localhost:5001/api/tenants/all-tenants`
    );

    if (res.data.success) {
      setTenants(res.data.data);
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

const revenueData = useMemo(() => {
  const months = {};

  tenants.forEach((tenant) => {
    const month = new Date(tenant.created_at).toLocaleString("default", {
      month: "short",
    });

    if (!months[month]) months[month] = 0;

    months[month] += Number(
      tenant.total_plan_amount || tenant.plan_price || 0
    );
  });

  return Object.keys(months).map((m) => ({
    month: m,
    mrr: months[m],
  }));
}, [tenants]);

const creditUsageData = useMemo(() => {
  return tenants.slice(0, 7).map((tenant, index) => ({
    day: `T${index + 1}`,
    used: tenant.used_ai_credits || 0,
  }));
}, [tenants]);

if (loading) {
  return (
    <div className="flex justify-center items-center h-96">
      Loading...
    </div>
  );
}

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard 
          icon={Building2} 
          label="Total Tenants" 
          value={`${tenants.length}`} 
          // delta="+2 this month" 
          deltaUp 
          sub={`${activeCount} active · ${trialCount} trial`} 
        />
        <StatCard 
          icon={IndianRupee} 
          label="Monthly Revenue" 
          value={`₹${totalMRR.toLocaleString()}`} 
          // delta="+11.5%" 
          deltaUp 
          sub="MRR across all plans" 
          accent="#059669" 
        />
        <StatCard 
          icon={Sparkles} 
          label="AI Credits Used" 
          value={totalAiCredits.toLocaleString()}
          // delta="+22%" 
          deltaUp 
          sub="7-day rolling average" 
          accent="#0891b2" 
        />
        <StatCard 
          icon={AlertTriangle} 
          label="Suspended" 
          value={`${suspendedCount}`} 
          sub={`${trialCount} trials expiring soon`} 
          accent="#dc2626" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 bg-white border border-gray-100 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-sm font-semibold text-gray-900">Revenue Trend</div>
              <div className="text-xs font-mono text-gray-400 mt-0.5">Monthly recurring revenue</div>
            </div>
            <span className="text-xs font-mono text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-full">+70% YTD</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c5cfc" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#7c5cfc" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 11, fontFamily: "JetBrains Mono" }} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, fontSize: 12, fontFamily: "JetBrains Mono", color: "#111827" }} formatter={(v) => [`$${v.toLocaleString()}`, "MRR"]} />
              <Area type="monotone" dataKey="mrr" stroke="#7c5cfc" strokeWidth={2} fill="url(#rg)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-5">
          <div className="mb-5">
            <div className="text-sm font-semibold text-gray-900">AI Credit Usage</div>
            <div className="text-xs font-mono text-gray-400 mt-0.5">Last 7 days</div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={creditUsageData} barSize={18}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 11, fontFamily: "JetBrains Mono" }} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, fontSize: 12, fontFamily: "JetBrains Mono", color: "#111827" }} formatter={(v) => [v.toLocaleString(), "Credits"]} />
              <Bar dataKey="used" fill="#7c5cfc" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <div className="text-sm font-semibold text-gray-900 mb-4">Recent Activity</div>
        <div className="space-y-0">
          {[
            { event: "Pinnacle Analytics exceeded 60% credit quota", time: "2 min ago", type: "warning" },
            { event: "New trial started — Cobalt Studio (Starter plan)", time: "5 hr ago", type: "info" },
            { event: "Arco Retail Group suspended due to failed payment", time: "3 days ago", type: "error" },
            { event: "Nexus Dynamics upgraded to Enterprise", time: "5 days ago", type: "success" },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-3 text-sm py-3 border-b border-gray-50 last:border-0">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${a.type === "warning" ? "bg-amber-400" : a.type === "error" ? "bg-red-400" : a.type === "success" ? "bg-emerald-400" : "bg-violet-400"}`} />
              <span className="text-gray-700 flex-1">{a.event}</span>
              <span className="text-xs font-mono text-gray-400">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Overview;
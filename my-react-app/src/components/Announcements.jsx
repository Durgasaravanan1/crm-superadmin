// // import React, { useState } from "react";
// // import { 
// //   Megaphone, Plus, X, Pin, Globe, Send, Edit2, Trash2, Info, 
// //   CheckCircle, AlertTriangle, Settings
// // } from "lucide-react";

// // const initialAnnouncements = [
// //   { id: "A-001", title: "Scheduled Maintenance — July 6, 02:00–04:00 UTC", body: "We will be performing infrastructure upgrades on July 6. Expect brief interruptions to the API and dashboard. AI credit processing will resume automatically after the window.", type: "maintenance", audience: "all", pinned: true, published: true, date: "2025-06-28", author: "Super Admin", views: 312 },
// //   { id: "A-002", title: "New Feature: AI Credit Usage Alerts", body: "Tenant admins can now set custom thresholds for AI credit usage and receive email alerts when approaching their quota. Available in account settings.", type: "success", audience: "all", pinned: false, published: true, date: "2025-06-24", author: "Super Admin", views: 218 },
// //   { id: "A-003", title: "Trial Plan Limits Update — Effective July 1", body: "Starting July 1, new trial accounts will receive 2,500 AI credits (up from 2,000). Existing trials will be grandfathered with their original allocation.", type: "info", audience: "trial", pinned: false, published: true, date: "2025-06-20", author: "Super Admin", views: 94 },
// //   { id: "A-004", title: "Action Required: Update Billing Details", body: "One or more of your payment methods on file will expire before the next billing cycle. Please update your billing information to avoid service interruption.", type: "warning", audience: "grow", pinned: false, published: false, date: "2025-06-18", author: "Super Admin", views: 0 },
// // ];

// // // Custom Popup Component
// // const CustomPopup = ({ isOpen, type, title, message, onClose, onConfirm, confirmText = "Yes", cancelText = "Cancel", showConfirm = false }) => {
// //   if (!isOpen) return null;

// //   const getColors = () => {
// //     switch(type) {
// //       case 'success': return { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: 'text-emerald-600', title: 'text-emerald-800', text: 'text-emerald-700', btn: 'bg-emerald-600 hover:bg-emerald-700' };
// //       case 'error': return { bg: 'bg-red-50', border: 'border-red-200', icon: 'text-red-600', title: 'text-red-800', text: 'text-red-700', btn: 'bg-red-600 hover:bg-red-700' };
// //       case 'warning': return { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-600', title: 'text-amber-800', text: 'text-amber-700', btn: 'bg-amber-600 hover:bg-amber-700' };
// //       default: return { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600', title: 'text-blue-800', text: 'text-blue-700', btn: 'bg-blue-600 hover:bg-blue-700' };
// //     }
// //   };

// //   const getIcon = () => {
// //     switch(type) {
// //       case 'success': return <CheckCircle className="w-6 h-6" />;
// //       case 'error': return <AlertTriangle className="w-6 h-6" />;
// //       case 'warning': return <AlertCircle className="w-6 h-6" />;
// //       default: return <Info className="w-6 h-6" />;
// //     }
// //   };

// //   const colors = getColors();

// //   return (
// //     <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
// //       <div className={`bg-white rounded-2xl shadow-2xl max-w-md w-full border ${colors.border} animate-scale-in`}>
// //         <div className="p-6">
// //           <div className="flex items-start gap-4">
// //             <div className={`flex-shrink-0 w-12 h-12 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center`}>
// //               <div className={colors.icon}>{getIcon()}</div>
// //             </div>
// //             <div className="flex-1">
// //               <h3 className={`text-lg font-semibold ${colors.title} mb-1`}>{title}</h3>
// //               <p className={`text-sm ${colors.text}`}>{message}</p>
// //             </div>
// //             <button onClick={onClose} className="flex-shrink-0 p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
// //               <X className="w-4 h-4" />
// //             </button>
// //           </div>
// //           <div className="flex gap-3 mt-6 justify-end">
// //             {showConfirm && (
// //               <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
// //                 {cancelText}
// //               </button>
// //             )}
// //             <button onClick={onConfirm || onClose} className={`px-5 py-2 text-sm font-medium text-white rounded-xl transition-all shadow-sm hover:shadow-md ${colors.btn}`}>
// //               {showConfirm ? confirmText : "Got it"}
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //       <style>{`
// //         @keyframes fade-in {
// //           from { opacity: 0; }
// //           to { opacity: 1; }
// //         }
// //         @keyframes scale-in {
// //           from { opacity: 0; transform: scale(0.9) translateY(20px); }
// //           to { opacity: 1; transform: scale(1) translateY(0); }
// //         }
// //         .animate-fade-in { animation: fade-in 0.2s ease-out; }
// //         .animate-scale-in { animation: scale-in 0.3s ease-out; }
// //       `}</style>
// //     </div>
// //   );
// // };

// // // Toast Component
// // const Toast = ({ message, type, onClose }) => {
// //   const getStyles = () => {
// //     switch(type) {
// //       case 'success': return 'bg-emerald-50 border-emerald-200 text-emerald-800';
// //       case 'error': return 'bg-red-50 border-red-200 text-red-800';
// //       case 'warning': return 'bg-amber-50 border-amber-200 text-amber-800';
// //       default: return 'bg-blue-50 border-blue-200 text-blue-800';
// //     }
// //   };

// //   const getIcon = () => {
// //     switch(type) {
// //       case 'success': return <CheckCircle className="w-5 h-5 text-emerald-600" />;
// //       case 'error': return <AlertTriangle className="w-5 h-5 text-red-600" />;
// //       case 'warning': return <AlertCircle className="w-5 h-5 text-amber-600" />;
// //       default: return <Info className="w-5 h-5 text-blue-600" />;
// //     }
// //   };

// //   return (
// //     <div className="fixed top-4 right-4 z-[9999] animate-slide-in">
// //       <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${getStyles()}`}>
// //         {getIcon()}
// //         <span className="text-sm font-medium">{message}</span>
// //         <button onClick={onClose} className="ml-2 hover:opacity-70 transition-opacity">
// //           <X className="w-4 h-4" />
// //         </button>
// //       </div>
// //       <style>{`
// //         @keyframes slide-in {
// //           from { opacity: 0; transform: translateX(20px); }
// //           to { opacity: 1; transform: translateX(0); }
// //         }
// //         .animate-slide-in { animation: slide-in 0.3s ease-out; }
// //       `}</style>
// //     </div>
// //   );
// // };

// // const Announcements = () => {
// //   const [announcements, setAnnouncements] = useState(initialAnnouncements);
// //   const [annCompose, setAnnCompose] = useState(false);
// //   const [annEdit, setAnnEdit] = useState(null);
// //   const [annForm, setAnnForm] = useState({ title: "", body: "", type: "info", audience: "all", pinned: false });
// //   const [annFilter, setAnnFilter] = useState("all");
// //   const [toast, setToast] = useState(null);
// //   const [popup, setPopup] = useState({ isOpen: false, type: "info", title: "", message: "", onConfirm: null, showConfirm: false });

// //   const publishedAnn = announcements.filter(a => a.published).length;
// //   const draftAnn = announcements.filter(a => !a.published).length;

// //   const showToast = (message, type = "success") => {
// //     setToast({ message, type });
// //     setTimeout(() => setToast(null), 3000);
// //   };

// //   const showPopup = (type, title, message, onConfirm = null, showConfirm = false) => {
// //     setPopup({ isOpen: true, type, title, message, onConfirm, showConfirm });
// //   };

// //   const closePopup = () => {
// //     setPopup({ ...popup, isOpen: false });
// //   };

// //   const saveAnnouncement = () => {
// //     if (!annForm.title.trim() || !annForm.body.trim()) {
// //       showPopup("error", "Validation Error", "Please fill in both title and body");
// //       return;
// //     }
    
// //     if (annEdit) {
// //       setAnnouncements(prev => prev.map(a => a.id === annEdit.id ? { ...a, ...annForm } : a));
// //       showPopup("success", "Updated!", "Announcement updated successfully!");
// //     } else {
// //       setAnnouncements(prev => [{
// //         id: `A-${String(prev.length + 1).padStart(3, "0")}`,
// //         ...annForm, published: false,
// //         date: new Date().toISOString().split("T")[0],
// //         author: "Super Admin", views: 0,
// //       }, ...prev]);
// //       showPopup("success", "Created!", "New announcement created successfully!");
// //     }
// //     setAnnCompose(false); 
// //     setAnnEdit(null);
// //     setAnnForm({ title: "", body: "", type: "info", audience: "all", pinned: false });
// //   };

// //   const openEdit = (ann) => {
// //     setAnnEdit(ann);
// //     setAnnForm({ title: ann.title, body: ann.body, type: ann.type, audience: ann.audience, pinned: ann.pinned });
// //     setAnnCompose(true);
// //   };

// //   const deleteAnnouncement = (id) => {
// //     showPopup("warning", "Delete Announcement", "Are you sure you want to delete this announcement? This action cannot be undone.", () => {
// //       setAnnouncements(prev => prev.filter(a => a.id !== id));
// //       showPopup("info", "Deleted!", "Announcement deleted successfully!");
// //     }, true);
// //   };

// //   const togglePublish = (id) => {
// //     setAnnouncements(prev => prev.map(a => {
// //       if (a.id === id) {
// //         const newPublished = !a.published;
// //         showToast(newPublished ? "Announcement published!" : "Announcement unpublished", "info");
// //         return { ...a, published: newPublished };
// //       }
// //       return a;
// //     }));
// //   };

// //   const togglePin = (id) => {
// //     setAnnouncements(prev => prev.map(a => {
// //       if (a.id === id) {
// //         showToast(a.pinned ? "Unpinned from top" : "Pinned to top", "info");
// //         return { ...a, pinned: !a.pinned };
// //       }
// //       return a;
// //     }));
// //   };

// //   const typeMap = {
// //     info: { bg: "#eff6ff", border: "#bfdbfe", icon: Info, ic: "#3b82f6", tag: "Info", tagBg: "#dbeafe", tagColor: "#1d4ed8" },
// //     success: { bg: "#f0fdf4", border: "#bbf7d0", icon: CheckCircle, ic: "#22c55e", tag: "Update", tagBg: "#dcfce7", tagColor: "#15803d" },
// //     warning: { bg: "#fffbeb", border: "#fde68a", icon: AlertTriangle, ic: "#f59e0b", tag: "Action Required", tagBg: "#fef3c7", tagColor: "#92400e" },
// //     maintenance: { bg: "#faf5ff", border: "#e9d5ff", icon: Settings, ic: "#7c5cfc", tag: "Maintenance", tagBg: "#ede9fe", tagColor: "#5b21b6" },
// //   };

// //   const audienceLabel = { all: "All Tenants", trial: "Trial", start: "Start", grow: "Grow", scale: "Scale" };

// //   return (
// //     <div className="space-y-5">
// //       {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      
// //       <CustomPopup
// //         isOpen={popup.isOpen}
// //         type={popup.type}
// //         title={popup.title}
// //         message={popup.message}
// //         onClose={closePopup}
// //         onConfirm={popup.onConfirm}
// //         showConfirm={popup.showConfirm}
// //         confirmText="Yes, Delete"
// //         cancelText="Cancel"
// //       />

// //       <div className="flex flex-wrap items-start justify-between gap-3">
// //         <div>
// //           <div className="flex items-center gap-2.5">
// //             <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center">
// //               <Megaphone className="w-4 h-4 text-white" />
// //             </div>
// //             <h2 className="text-lg font-semibold text-gray-900">Announcements</h2>
// //           </div>
// //           <p className="text-sm text-gray-400 mt-1 ml-10">
// //             Broadcast messages to tenants — maintenance windows, new features, billing notices.
// //           </p>
// //         </div>
// //         <button
// //           onClick={() => { setAnnCompose(true); setAnnEdit(null); setAnnForm({ title: "", body: "", type: "info", audience: "all", pinned: false }); }}
// //           className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-violet-600 text-white hover:bg-violet-700 transition-colors shadow-sm hover:shadow-md"
// //         >
// //           <Plus className="w-4 h-4" /> New Announcement
// //         </button>
// //       </div>

// //       <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
// //         {[
// //           { label: "Total", value: announcements.length, color: "#111827" },
// //           { label: "Published", value: publishedAnn, color: "#059669" },
// //           { label: "Drafts", value: draftAnn, color: "#d97706" },
// //           { label: "Pinned", value: announcements.filter(a => a.pinned).length, color: "#7c5cfc" },
// //         ].map(s => (
// //           <div key={s.label} className="bg-white border border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between">
// //             <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{s.label}</span>
// //             <span className="text-xl font-bold font-mono" style={{ color: s.color }}>{s.value}</span>
// //           </div>
// //         ))}
// //       </div>

// //       <div className="flex flex-wrap items-center gap-1 border-b border-gray-200">
// //         {(["all", "published", "draft"]).map(f => (
// //           <button key={f} onClick={() => setAnnFilter(f)}
// //             className="px-4 py-2.5 text-sm font-medium transition-all"
// //             style={{ color: annFilter === f ? "#7c5cfc" : "#6b7280", borderBottom: annFilter === f ? "2px solid #7c5cfc" : "2px solid transparent", marginBottom: "-1px" }}>
// //             {f.charAt(0).toUpperCase() + f.slice(1)}
// //           </button>
// //         ))}
// //       </div>

// //       {annCompose && (
// //         <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
// //           <div className="flex items-center justify-between">
// //             <h3 className="font-semibold text-gray-900">{annEdit ? "Edit Announcement" : "New Announcement"}</h3>
// //             <button onClick={() => { setAnnCompose(false); setAnnEdit(null); }} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
// //               <X className="w-4 h-4 text-gray-400" />
// //             </button>
// //           </div>
// //           <input value={annForm.title} onChange={e => setAnnForm(f => ({ ...f, title: e.target.value }))}
// //             placeholder="Announcement title…"
// //             className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-400" />
// //           <textarea value={annForm.body} onChange={e => setAnnForm(f => ({ ...f, body: e.target.value }))}
// //             placeholder="Write your announcement message here…" rows={4}
// //             className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-violet-400 resize-none" />
// //           <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
// //             <div>
// //               <label className="text-xs font-medium text-gray-500 block mb-1.5">Type</label>
// //               <select value={annForm.type} onChange={e => setAnnForm(f => ({ ...f, type: e.target.value }))}
// //                 className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-violet-400">
// //                 <option value="info">Info</option>
// //                 <option value="success">Success</option>
// //                 <option value="warning">Warning</option>
// //                 <option value="maintenance">Maintenance</option>
// //               </select>
// //             </div>
// //             <div>
// //               <label className="text-xs font-medium text-gray-500 block mb-1.5">Audience</label>
// //               <select value={annForm.audience} onChange={e => setAnnForm(f => ({ ...f, audience: e.target.value }))}
// //                 className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-violet-400">
// //                 <option value="all">All Tenants</option>
// //                 <option value="trial">Trial Only</option>
// //                 <option value="start">Start</option>
// //                 <option value="grow">Grow</option>
// //                 <option value="scale">Scale</option>
// //               </select>
// //             </div>
// //             <div className="flex items-end pb-0.5">
// //               <label className="flex items-center gap-2 cursor-pointer select-none">
// //                 <div onClick={() => setAnnForm(f => ({ ...f, pinned: !f.pinned }))}
// //                   className="w-10 h-5 rounded-full flex items-center px-0.5 transition-colors cursor-pointer"
// //                   style={{ background: annForm.pinned ? "#7c5cfc" : "#d1d5db" }}>
// //                   <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${annForm.pinned ? "translate-x-5" : "translate-x-0"}`} />
// //                 </div>
// //                 <span className="text-sm text-gray-600">Pin to top</span>
// //               </label>
// //             </div>
// //           </div>
// //           <div className="flex flex-wrap justify-end gap-3">
// //             <button onClick={() => { setAnnCompose(false); setAnnEdit(null); }}
// //               className="px-4 py-2 rounded-xl text-sm border border-gray-200 text-gray-500 hover:text-gray-800 transition-colors">Cancel</button>
// //             <button onClick={saveAnnouncement}
// //               className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium bg-violet-600 text-white hover:bg-violet-700 transition-colors shadow-sm hover:shadow-md">
// //               <Send className="w-3.5 h-3.5" />{annEdit ? "Save Changes" : "Save Draft"}
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       <div className="space-y-3">
// //         {announcements
// //           .filter(a => annFilter === "all" ? true : annFilter === "published" ? a.published : !a.published)
// //           .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
// //           .map(ann => {
// //             const t = typeMap[ann.type];
// //             const TypeIcon = t.icon;
// //             return (
// //               <div key={ann.id} className="rounded-2xl border p-5 transition-all hover:shadow-sm" style={{ background: t.bg, borderColor: t.border }}>
// //                 <div className="flex flex-col sm:flex-row items-start gap-4">
// //                   <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-white" style={{ border: `1px solid ${t.border}` }}>
// //                     <TypeIcon className="w-4 h-4" style={{ color: t.ic }} />
// //                   </div>
// //                   <div className="flex-1 min-w-0">
// //                     <div className="flex flex-wrap items-center gap-2 mb-1.5">
// //                       {ann.pinned && (
// //                         <span className="flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-violet-600 text-white">
// //                           <Pin className="w-2.5 h-2.5" /> Pinned
// //                         </span>
// //                       )}
// //                       <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full" style={{ background: t.tagBg, color: t.tagColor }}>{t.tag}</span>
// //                       <span className="text-[10px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1 bg-white/70 text-gray-500 border border-gray-200">
// //                         <Globe className="w-2.5 h-2.5" /> {audienceLabel[ann.audience]}
// //                       </span>
// //                       {!ann.published && (
// //                         <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Draft</span>
// //                       )}
// //                     </div>
// //                     <h3 className="font-semibold text-sm text-gray-900 mb-1">{ann.title}</h3>
// //                     <p className="text-sm text-gray-600 leading-relaxed">{ann.body}</p>
// //                     <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-gray-400 font-mono">
// //                       <span>{ann.date}</span>
// //                       <span>by {ann.author}</span>
// //                       {ann.published && <span>{ann.views} views</span>}
// //                     </div>
// //                   </div>
// //                   <div className="flex flex-wrap items-center gap-1 flex-shrink-0">
// //                     <button onClick={() => togglePin(ann.id)}
// //                       className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-black/5"
// //                       style={{ color: ann.pinned ? "#7c5cfc" : "#9ca3af" }}>
// //                       <Pin className="w-3.5 h-3.5" />
// //                     </button>
// //                     <button onClick={() => openEdit(ann)} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-black/5 text-gray-400">
// //                       <Edit2 className="w-3.5 h-3.5" />
// //                     </button>
// //                     <button onClick={() => togglePublish(ann.id)}
// //                       className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
// //                       style={ann.published ? { background: "#fee2e2", color: "#dc2626" } : { background: "#7c5cfc", color: "#fff" }}>
// //                       {ann.published ? "Unpublish" : <><Send className="w-3 h-3" /> Publish</>}
// //                     </button>
// //                     <button onClick={() => deleteAnnouncement(ann.id)}
// //                       className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-red-50 text-gray-400 hover:text-red-500">
// //                       <Trash2 className="w-3.5 h-3.5" />
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         {announcements.filter(a => annFilter === "all" ? true : annFilter === "published" ? a.published : !a.published).length === 0 && (
// //           <div className="py-20 text-center text-gray-400">
// //             <Megaphone className="w-10 h-10 mx-auto mb-3 opacity-20" />
// //             <div className="text-sm font-medium">No announcements here</div>
// //             <div className="text-xs mt-1">Create one to broadcast a message to your tenants</div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Announcements;



// import React, { useState } from "react";
// import { 
//   Megaphone, Plus, X, Pin, Globe, Send, Edit2, Trash2, Info, 
//   CheckCircle, AlertTriangle, Settings, Image, Link
// } from "lucide-react";

// const initialAnnouncements = [
//   { 
//     id: "A-001", 
//     title: "Scheduled Maintenance — July 6, 02:00–04:00 UTC", 
//     body: "We will be performing infrastructure upgrades on July 6. Expect brief interruptions to the API and dashboard. AI credit processing will resume automatically after the window.", 
//     type: "maintenance", 
//     audience: "all", 
//     pinned: true, 
//     published: true, 
//     date: "2025-06-28", 
//     author: "Super Admin", 
//     views: 312,
//     imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop"
//   },
//   { 
//     id: "A-002", 
//     title: "New Feature: AI Credit Usage Alerts", 
//     body: "Tenant admins can now set custom thresholds for AI credit usage and receive email alerts when approaching their quota. Available in account settings.", 
//     type: "success", 
//     audience: "all", 
//     pinned: false, 
//     published: true, 
//     date: "2025-06-24", 
//     author: "Super Admin", 
//     views: 218,
//     imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop"
//   },
//   { 
//     id: "A-003", 
//     title: "Trial Plan Limits Update — Effective July 1", 
//     body: "Starting July 1, new trial accounts will receive 2,500 AI credits (up from 2,000). Existing trials will be grandfathered with their original allocation.", 
//     type: "info", 
//     audience: "trial", 
//     pinned: false, 
//     published: true, 
//     date: "2025-06-20", 
//     author: "Super Admin", 
//     views: 94,
//     imageUrl: null
//   },
//   { 
//     id: "A-004", 
//     title: "Action Required: Update Billing Details", 
//     body: "One or more of your payment methods on file will expire before the next billing cycle. Please update your billing information to avoid service interruption.", 
//     type: "warning", 
//     audience: "grow", 
//     pinned: false, 
//     published: false, 
//     date: "2025-06-18", 
//     author: "Super Admin", 
//     views: 0,
//     imageUrl: null
//   },
// ];

// // Custom Popup Component
// const CustomPopup = ({ isOpen, type, title, message, onClose, onConfirm, confirmText = "Yes", cancelText = "Cancel", showConfirm = false }) => {
//   if (!isOpen) return null;

//   const getColors = () => {
//     switch(type) {
//       case 'success': return { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: 'text-emerald-600', title: 'text-emerald-800', text: 'text-emerald-700', btn: 'bg-emerald-600 hover:bg-emerald-700' };
//       case 'error': return { bg: 'bg-red-50', border: 'border-red-200', icon: 'text-red-600', title: 'text-red-800', text: 'text-red-700', btn: 'bg-red-600 hover:bg-red-700' };
//       case 'warning': return { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-600', title: 'text-amber-800', text: 'text-amber-700', btn: 'bg-amber-600 hover:bg-amber-700' };
//       default: return { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600', title: 'text-blue-800', text: 'text-blue-700', btn: 'bg-blue-600 hover:bg-blue-700' };
//     }
//   };

//   const getIcon = () => {
//     switch(type) {
//       case 'success': return <CheckCircle className="w-6 h-6" />;
//       case 'error': return <AlertTriangle className="w-6 h-6" />;
//       case 'warning': return <AlertCircle className="w-6 h-6" />;
//       default: return <Info className="w-6 h-6" />;
//     }
//   };

//   const colors = getColors();

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
//       <div className={`bg-white rounded-2xl shadow-2xl max-w-md w-full border ${colors.border} animate-scale-in`}>
//         <div className="p-6">
//           <div className="flex items-start gap-4">
//             <div className={`flex-shrink-0 w-12 h-12 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center`}>
//               <div className={colors.icon}>{getIcon()}</div>
//             </div>
//             <div className="flex-1">
//               <h3 className={`text-lg font-semibold ${colors.title} mb-1`}>{title}</h3>
//               <p className={`text-sm ${colors.text}`}>{message}</p>
//             </div>
//             <button onClick={onClose} className="flex-shrink-0 p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//           <div className="flex gap-3 mt-6 justify-end">
//             {showConfirm && (
//               <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
//                 {cancelText}
//               </button>
//             )}
//             <button onClick={onConfirm || onClose} className={`px-5 py-2 text-sm font-medium text-white rounded-xl transition-all shadow-sm hover:shadow-md ${colors.btn}`}>
//               {showConfirm ? confirmText : "Got it"}
//             </button>
//           </div>
//         </div>
//       </div>
//       <style>{`
//         @keyframes fade-in {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes scale-in {
//           from { opacity: 0; transform: scale(0.9) translateY(20px); }
//           to { opacity: 1; transform: scale(1) translateY(0); }
//         }
//         .animate-fade-in { animation: fade-in 0.2s ease-out; }
//         .animate-scale-in { animation: scale-in 0.3s ease-out; }
//       `}</style>
//     </div>
//   );
// };

// // Toast Component
// const Toast = ({ message, type, onClose }) => {
//   const getStyles = () => {
//     switch(type) {
//       case 'success': return 'bg-emerald-50 border-emerald-200 text-emerald-800';
//       case 'error': return 'bg-red-50 border-red-200 text-red-800';
//       case 'warning': return 'bg-amber-50 border-amber-200 text-amber-800';
//       default: return 'bg-blue-50 border-blue-200 text-blue-800';
//     }
//   };

//   const getIcon = () => {
//     switch(type) {
//       case 'success': return <CheckCircle className="w-5 h-5 text-emerald-600" />;
//       case 'error': return <AlertTriangle className="w-5 h-5 text-red-600" />;
//       case 'warning': return <AlertCircle className="w-5 h-5 text-amber-600" />;
//       default: return <Info className="w-5 h-5 text-blue-600" />;
//     }
//   };

//   return (
//     <div className="fixed top-4 right-4 z-[9999] animate-slide-in">
//       <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${getStyles()}`}>
//         {getIcon()}
//         <span className="text-sm font-medium">{message}</span>
//         <button onClick={onClose} className="ml-2 hover:opacity-70 transition-opacity">
//           <X className="w-4 h-4" />
//         </button>
//       </div>
//       <style>{`
//         @keyframes slide-in {
//           from { opacity: 0; transform: translateX(20px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
//         .animate-slide-in { animation: slide-in 0.3s ease-out; }
//       `}</style>
//     </div>
//   );
// };

// const Announcements = () => {
//   const [announcements, setAnnouncements] = useState(initialAnnouncements);
//   const [annCompose, setAnnCompose] = useState(false);
//   const [annEdit, setAnnEdit] = useState(null);
//   const [annForm, setAnnForm] = useState({ 
//     title: "", 
//     body: "", 
//     type: "info", 
//     audience: "all", 
//     pinned: false,
//     imageUrl: ""
//   });
//   const [annFilter, setAnnFilter] = useState("all");
//   const [toast, setToast] = useState(null);
//   const [popup, setPopup] = useState({ isOpen: false, type: "info", title: "", message: "", onConfirm: null, showConfirm: false });

//   const publishedAnn = announcements.filter(a => a.published).length;
//   const draftAnn = announcements.filter(a => !a.published).length;

//   const showToast = (message, type = "success") => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 3000);
//   };

//   const showPopup = (type, title, message, onConfirm = null, showConfirm = false) => {
//     setPopup({ isOpen: true, type, title, message, onConfirm, showConfirm });
//   };

//   const closePopup = () => {
//     setPopup({ ...popup, isOpen: false });
//   };

//   const saveAnnouncement = () => {
//     if (!annForm.title.trim() || !annForm.body.trim()) {
//       showPopup("error", "Validation Error", "Please fill in both title and body");
//       return;
//     }
    
//     const newData = {
//       ...annForm,
//       imageUrl: annForm.imageUrl.trim() || null
//     };

//     if (annEdit) {
//       setAnnouncements(prev => prev.map(a => a.id === annEdit.id ? { ...a, ...newData } : a));
//       showPopup("success", "Updated!", "Announcement updated successfully!");
//     } else {
//       setAnnouncements(prev => [{
//         id: `A-${String(prev.length + 1).padStart(3, "0")}`,
//         ...newData,
//         published: false,
//         date: new Date().toISOString().split("T")[0],
//         author: "Super Admin",
//         views: 0,
//       }, ...prev]);
//       showPopup("success", "Created!", "New announcement created successfully!");
//     }
//     setAnnCompose(false); 
//     setAnnEdit(null);
//     setAnnForm({ title: "", body: "", type: "info", audience: "all", pinned: false, imageUrl: "" });
//   };

//   const openEdit = (ann) => {
//     setAnnEdit(ann);
//     setAnnForm({ 
//       title: ann.title, 
//       body: ann.body, 
//       type: ann.type, 
//       audience: ann.audience, 
//       pinned: ann.pinned,
//       imageUrl: ann.imageUrl || ""
//     });
//     setAnnCompose(true);
//   };

//   const deleteAnnouncement = (id) => {
//     showPopup("warning", "Delete Announcement", "Are you sure you want to delete this announcement? This action cannot be undone.", () => {
//       setAnnouncements(prev => prev.filter(a => a.id !== id));
//       showPopup("info", "Deleted!", "Announcement deleted successfully!");
//     }, true);
//   };

//   const togglePublish = (id) => {
//     setAnnouncements(prev => prev.map(a => {
//       if (a.id === id) {
//         const newPublished = !a.published;
//         showToast(newPublished ? "Announcement published!" : "Announcement unpublished", "info");
//         return { ...a, published: newPublished };
//       }
//       return a;
//     }));
//   };

//   const togglePin = (id) => {
//     setAnnouncements(prev => prev.map(a => {
//       if (a.id === id) {
//         showToast(a.pinned ? "Unpinned from top" : "Pinned to top", "info");
//         return { ...a, pinned: !a.pinned };
//       }
//       return a;
//     }));
//   };

//   const typeMap = {
//     info: { bg: "#eff6ff", border: "#bfdbfe", icon: Info, ic: "#3b82f6", tag: "Info", tagBg: "#dbeafe", tagColor: "#1d4ed8" },
//     success: { bg: "#f0fdf4", border: "#bbf7d0", icon: CheckCircle, ic: "#22c55e", tag: "Update", tagBg: "#dcfce7", tagColor: "#15803d" },
//     warning: { bg: "#fffbeb", border: "#fde68a", icon: AlertTriangle, ic: "#f59e0b", tag: "Action Required", tagBg: "#fef3c7", tagColor: "#92400e" },
//     maintenance: { bg: "#faf5ff", border: "#e9d5ff", icon: Settings, ic: "#7c5cfc", tag: "Maintenance", tagBg: "#ede9fe", tagColor: "#5b21b6" },
//   };

//   const audienceLabel = { all: "All Tenants", trial: "Trial", start: "Start", grow: "Grow", scale: "Scale" };

//   return (
//     <div className="space-y-5">
//       {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      
//       <CustomPopup
//         isOpen={popup.isOpen}
//         type={popup.type}
//         title={popup.title}
//         message={popup.message}
//         onClose={closePopup}
//         onConfirm={popup.onConfirm}
//         showConfirm={popup.showConfirm}
//         confirmText="Yes, Delete"
//         cancelText="Cancel"
//       />

//       <div className="flex flex-wrap items-start justify-between gap-3">
//         <div>
//           <div className="flex items-center gap-2.5">
//             <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center">
//               <Megaphone className="w-4 h-4 text-white" />
//             </div>
//             <h2 className="text-lg font-semibold text-gray-900">Announcements</h2>
//           </div>
//           <p className="text-sm text-gray-400 mt-1 ml-10">
//             Broadcast messages to tenants — maintenance windows, new features, billing notices.
//           </p>
//         </div>
//         <button
//           onClick={() => { setAnnCompose(true); setAnnEdit(null); setAnnForm({ title: "", body: "", type: "info", audience: "all", pinned: false, imageUrl: "" }); }}
//           className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-violet-600 text-white hover:bg-violet-700 transition-colors shadow-sm hover:shadow-md"
//         >
//           <Plus className="w-4 h-4" /> New Announcement
//         </button>
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//         {[
//           { label: "Total", value: announcements.length, color: "#111827" },
//           { label: "Published", value: publishedAnn, color: "#059669" },
//           { label: "Drafts", value: draftAnn, color: "#d97706" },
//           { label: "Pinned", value: announcements.filter(a => a.pinned).length, color: "#7c5cfc" },
//         ].map(s => (
//           <div key={s.label} className="bg-white border border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between">
//             <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{s.label}</span>
//             <span className="text-xl font-bold font-mono" style={{ color: s.color }}>{s.value}</span>
//           </div>
//         ))}
//       </div>

//       <div className="flex flex-wrap items-center gap-1 border-b border-gray-200">
//         {(["all", "published", "draft"]).map(f => (
//           <button key={f} onClick={() => setAnnFilter(f)}
//             className="px-4 py-2.5 text-sm font-medium transition-all"
//             style={{ color: annFilter === f ? "#7c5cfc" : "#6b7280", borderBottom: annFilter === f ? "2px solid #7c5cfc" : "2px solid transparent", marginBottom: "-1px" }}>
//             {f.charAt(0).toUpperCase() + f.slice(1)}
//           </button>
//         ))}
//       </div>

//       {annCompose && (
//         <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
//           <div className="flex items-center justify-between">
//             <h3 className="font-semibold text-gray-900">{annEdit ? "Edit Announcement" : "New Announcement"}</h3>
//             <button onClick={() => { setAnnCompose(false); setAnnEdit(null); }} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
//               <X className="w-4 h-4 text-gray-400" />
//             </button>
//           </div>
//           <input value={annForm.title} onChange={e => setAnnForm(f => ({ ...f, title: e.target.value }))}
//             placeholder="Announcement title…"
//             className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-400" />
          
//           <textarea value={annForm.body} onChange={e => setAnnForm(f => ({ ...f, body: e.target.value }))}
//             placeholder="Write your announcement message here…" rows={4}
//             className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-violet-400 resize-none" />
          
//           {/* Image URL Input */}
//           <div>
//             <label className="text-xs font-medium text-gray-500 block mb-1.5">Brand Image URL (Optional)</label>
//             <div className="relative">
//               <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input 
//                 value={annForm.imageUrl} 
//                 onChange={e => setAnnForm(f => ({ ...f, imageUrl: e.target.value }))}
//                 placeholder="https://example.com/image.jpg"
//                 className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-400"
//               />
//             </div>
//             <p className="text-[10px] text-gray-400 mt-1">Add a brand image URL to make your announcement more engaging</p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//             <div>
//               <label className="text-xs font-medium text-gray-500 block mb-1.5">Type</label>
//               <select value={annForm.type} onChange={e => setAnnForm(f => ({ ...f, type: e.target.value }))}
//                 className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-violet-400">
//                 <option value="info">Info</option>
//                 <option value="success">Success</option>
//                 <option value="warning">Warning</option>
//                 <option value="maintenance">Maintenance</option>
//                 <option value="wishes">Wishes</option>
//                 <option value="features">Features</option>
//               </select>
//             </div>
//             <div>
//               <label className="text-xs font-medium text-gray-500 block mb-1.5">Audience</label>
//               <select value={annForm.audience} onChange={e => setAnnForm(f => ({ ...f, audience: e.target.value }))}
//                 className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-violet-400">
//                 <option value="all">All Tenants</option>
//                 <option value="trial">Trial Only</option>
//                 <option value="start">Start</option>
//                 <option value="grow">Grow</option>
//                 <option value="scale">Scale</option>
//               </select>
//             </div>
           
//           </div>
//           <div className="flex flex-wrap justify-end gap-3">
//             <button onClick={() => { setAnnCompose(false); setAnnEdit(null); }}
//               className="px-4 py-2 rounded-xl text-sm border border-gray-200 text-gray-500 hover:text-gray-800 transition-colors">Cancel</button>
//             <button onClick={saveAnnouncement}
//               className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium bg-violet-600 text-white hover:bg-violet-700 transition-colors shadow-sm hover:shadow-md">
//               <Send className="w-3.5 h-3.5" />{annEdit ? "Save Changes" : "Save Draft"}
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="space-y-3">
//         {announcements
//           .filter(a => annFilter === "all" ? true : annFilter === "published" ? a.published : !a.published)
//           .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
//           .map(ann => {
//             const t = typeMap[ann.type];
//             const TypeIcon = t.icon;
//             return (
//               <div key={ann.id} className="rounded-2xl border overflow-hidden transition-all hover:shadow-md" style={{ background: t.bg, borderColor: t.border }}>
//                 {/* Image Banner */}
//                 {ann.imageUrl && (
//                   <div className="w-full h-48 overflow-hidden">
//                     <img 
//                       src={ann.imageUrl} 
//                       alt={ann.title}
//                       className="w-full h-full object-cover"
//                       onError={(e) => {
//                         e.target.style.display = 'none';
//                       }}
//                     />
//                   </div>
//                 )}
                
//                 <div className="p-5">
//                   <div className="flex flex-col sm:flex-row items-start gap-4">
//                     <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-white" style={{ border: `1px solid ${t.border}` }}>
//                       <TypeIcon className="w-4 h-4" style={{ color: t.ic }} />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <div className="flex flex-wrap items-center gap-2 mb-1.5">
//                         {ann.pinned && (
//                           <span className="flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-violet-600 text-white">
//                             <Pin className="w-2.5 h-2.5" /> Pinned
//                           </span>
//                         )}
//                         <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full" style={{ background: t.tagBg, color: t.tagColor }}>{t.tag}</span>
//                         <span className="text-[10px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1 bg-white/70 text-gray-500 border border-gray-200">
//                           <Globe className="w-2.5 h-2.5" /> {audienceLabel[ann.audience]}
//                         </span>
//                         {!ann.published && (
//                           <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Draft</span>
//                         )}
//                       </div>
//                       <h3 className="font-semibold text-sm text-gray-900 mb-1">{ann.title}</h3>
//                       <p className="text-sm text-gray-600 leading-relaxed">{ann.body}</p>
//                       <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-gray-400 font-mono">
//                         <span>{ann.date}</span>
//                         <span>by {ann.author}</span>
//                         {ann.published && <span>{ann.views} views</span>}
//                       </div>
//                     </div>
//                     <div className="flex flex-wrap items-center gap-1 flex-shrink-0">
//                       <button onClick={() => togglePin(ann.id)}
//                         className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-black/5"
//                         style={{ color: ann.pinned ? "#7c5cfc" : "#9ca3af" }}>
//                         <Pin className="w-3.5 h-3.5" />
//                       </button>
//                       <button onClick={() => openEdit(ann)} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-black/5 text-gray-400">
//                         <Edit2 className="w-3.5 h-3.5" />
//                       </button>
//                       <button onClick={() => togglePublish(ann.id)}
//                         className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
//                         style={ann.published ? { background: "#fee2e2", color: "#dc2626" } : { background: "#7c5cfc", color: "#fff" }}>
//                         {ann.published ? "Unpublish" : <><Send className="w-3 h-3" /> Publish</>}
//                       </button>
//                       <button onClick={() => deleteAnnouncement(ann.id)}
//                         className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-red-50 text-gray-400 hover:text-red-500">
//                         <Trash2 className="w-3.5 h-3.5" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         {announcements.filter(a => annFilter === "all" ? true : annFilter === "published" ? a.published : !a.published).length === 0 && (
//           <div className="py-20 text-center text-gray-400">
//             <Megaphone className="w-10 h-10 mx-auto mb-3 opacity-20" />
//             <div className="text-sm font-medium">No announcements here</div>
//             <div className="text-xs mt-1">Create one to broadcast a message to your tenants</div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Announcements;


import React, { useState } from "react";
import { 
  Megaphone, Plus, X, Pin, Globe, Send, Edit2, Trash2, Info, 
  CheckCircle, AlertTriangle, Settings, Image, Calendar, Clock, 
  CalendarDays, Timer
} from "lucide-react";

const initialAnnouncements = [
  { 
    id: "A-001", 
    title: "Scheduled Maintenance — July 6, 02:00–04:00 UTC", 
    body: "We will be performing infrastructure upgrades on July 6. Expect brief interruptions to the API and dashboard. AI credit processing will resume automatically after the window.", 
    type: "maintenance", 
    audience: "all", 
    pinned: true, 
    published: true, 
    date: "2025-06-28", 
    author: "Super Admin", 
    views: 312,
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
    scheduledDate: null
  },
  { 
    id: "A-002", 
    title: "New Feature: AI Credit Usage Alerts", 
    body: "Tenant admins can now set custom thresholds for AI credit usage and receive email alerts when approaching their quota. Available in account settings.", 
    type: "success", 
    audience: "all", 
    pinned: false, 
    published: true, 
    date: "2025-06-24", 
    author: "Super Admin", 
    views: 218,
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    scheduledDate: null
  },
  { 
    id: "A-003", 
    title: "Trial Plan Limits Update — Effective July 1", 
    body: "Starting July 1, new trial accounts will receive 2,500 AI credits (up from 2,000). Existing trials will be grandfathered with their original allocation.", 
    type: "info", 
    audience: "trial", 
    pinned: false, 
    published: true, 
    date: "2025-06-20", 
    author: "Super Admin", 
    views: 94,
    imageUrl: null,
    scheduledDate: null
  },
  { 
    id: "A-004", 
    title: "Action Required: Update Billing Details", 
    body: "One or more of your payment methods on file will expire before the next billing cycle. Please update your billing information to avoid service interruption.", 
    type: "warning", 
    audience: "grow", 
    pinned: false, 
    published: false, 
    date: "2025-06-18", 
    author: "Super Admin", 
    views: 0,
    imageUrl: null,
    scheduledDate: null
  },
];

// Custom Popup Component
const CustomPopup = ({ isOpen, type, title, message, onClose, onConfirm, confirmText = "Yes", cancelText = "Cancel", showConfirm = false }) => {
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
            {showConfirm && (
              <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                {cancelText}
              </button>
            )}
            <button onClick={onConfirm || onClose} className={`px-5 py-2 text-sm font-medium text-white rounded-xl transition-all shadow-sm hover:shadow-md ${colors.btn}`}>
              {showConfirm ? confirmText : "Got it"}
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

// Toast Component
const Toast = ({ message, type, onClose }) => {
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

// Schedule Popup Component
const SchedulePopup = ({ isOpen, onClose, onSchedule, scheduledDate, scheduledTime }) => {
  const [date, setDate] = useState(scheduledDate || "");
  const [time, setTime] = useState(scheduledTime || "");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSchedule = () => {
    if (!date || !time) {
      setError("Please select both date and time");
      return;
    }

    const selectedDateTime = new Date(`${date}T${time}`);
    const now = new Date();

    if (selectedDateTime <= now) {
      setError("Please select a future date and time");
      return;
    }

    setError("");
    onSchedule(date, time);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-gray-200 animate-scale-in">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-violet-600" />
            <h3 className="text-lg font-semibold text-gray-900">Schedule Announcement</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="text-center mb-2">
            <CalendarDays className="w-12 h-12 mx-auto text-violet-500 mb-2" />
            <p className="text-sm text-gray-500">Choose when you want this announcement to be published</p>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1.5 flex items-center gap-1">
              <CalendarDays className="w-3.5 h-3.5" /> Select Date
            </label>
            <input 
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setError("");
              }}
              min={new Date().toISOString().split("T")[0]}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1.5 flex items-center gap-1">
              <Timer className="w-3.5 h-3.5" /> Select Time
            </label>
            <input 
              type="time"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
                setError("");
              }}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-red-600">{error}</p>
            </div>
          )}

          <div className="bg-violet-50 border border-violet-200 rounded-xl px-4 py-3 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-violet-700">The announcement will be automatically published on the selected date and time.</p>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-sm border border-gray-200 text-gray-500 hover:text-gray-800 transition-colors">
            Cancel
          </button>
          <button onClick={handleSchedule} className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-violet-600 text-white hover:bg-violet-700 transition-all shadow-sm hover:shadow-md">
            <Calendar className="w-4 h-4" /> Schedule
          </button>
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

const Announcements = () => {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [annCompose, setAnnCompose] = useState(false);
  const [annEdit, setAnnEdit] = useState(null);
  const [annForm, setAnnForm] = useState({ 
    title: "", 
    body: "", 
    type: "info", 
    audience: "all", 
    pinned: false,
    imageUrl: "",
    scheduledDate: "",
    scheduledTime: ""
  });
  const [annFilter, setAnnFilter] = useState("all");
  const [toast, setToast] = useState(null);
  const [popup, setPopup] = useState({ isOpen: false, type: "info", title: "", message: "", onConfirm: null, showConfirm: false });
  const [showSchedulePopup, setShowSchedulePopup] = useState(false);

  const publishedAnn = announcements.filter(a => a.published).length;
  const draftAnn = announcements.filter(a => !a.published).length;

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const showPopup = (type, title, message, onConfirm = null, showConfirm = false) => {
    setPopup({ isOpen: true, type, title, message, onConfirm, showConfirm });
  };

  const closePopup = () => {
    setPopup({ ...popup, isOpen: false });
  };

  const publishNow = () => {
    if (!annForm.title.trim() || !annForm.body.trim()) {
      showPopup("error", "Validation Error", "Please fill in both title and body");
      return;
    }
    
    const newData = {
      ...annForm,
      imageUrl: annForm.imageUrl.trim() || null,
      published: true,
      date: new Date().toISOString().split("T")[0],
      scheduledDate: null,
      scheduledTime: null
    };

    if (annEdit) {
      setAnnouncements(prev => prev.map(a => a.id === annEdit.id ? { ...a, ...newData } : a));
      showPopup("success", "Published!", "Announcement published successfully!");
    } else {
      setAnnouncements(prev => [{
        id: `A-${String(prev.length + 1).padStart(3, "0")}`,
        ...newData,
        author: "Super Admin",
        views: 0,
      }, ...prev]);
      showPopup("success", "Published!", "New announcement published successfully!");
    }
    resetForm();
  };

  const handleSchedule = (date, time) => {
    if (!annForm.title.trim() || !annForm.body.trim()) {
      showPopup("error", "Validation Error", "Please fill in both title and body");
      return;
    }

    const scheduledDateTime = `${date} ${time}`;
    const newData = {
      ...annForm,
      imageUrl: annForm.imageUrl.trim() || null,
      published: false,
      date: new Date().toISOString().split("T")[0],
      scheduledDate: scheduledDateTime,
      scheduledTime: time
    };

    if (annEdit) {
      setAnnouncements(prev => prev.map(a => a.id === annEdit.id ? { ...a, ...newData } : a));
      showPopup("success", "Scheduled!", `Announcement scheduled for ${scheduledDateTime}`);
    } else {
      setAnnouncements(prev => [{
        id: `A-${String(prev.length + 1).padStart(3, "0")}`,
        ...newData,
        author: "Super Admin",
        views: 0,
      }, ...prev]);
      showPopup("success", "Scheduled!", `New announcement scheduled for ${scheduledDateTime}`);
    }
    resetForm();
  };

  const resetForm = () => {
    setAnnCompose(false); 
    setAnnEdit(null);
    setAnnForm({ 
      title: "", 
      body: "", 
      type: "info", 
      audience: "all", 
      pinned: false, 
      imageUrl: "",
      scheduledDate: "",
      scheduledTime: ""
    });
  };

  const openEdit = (ann) => {
    setAnnEdit(ann);
    setAnnForm({ 
      title: ann.title, 
      body: ann.body, 
      type: ann.type, 
      audience: ann.audience, 
      pinned: ann.pinned,
      imageUrl: ann.imageUrl || "",
      scheduledDate: ann.scheduledDate || "",
      scheduledTime: ann.scheduledTime || ""
    });
    setAnnCompose(true);
  };

  const deleteAnnouncement = (id) => {
    showPopup("warning", "Delete Announcement", "Are you sure you want to delete this announcement? This action cannot be undone.", () => {
      setAnnouncements(prev => prev.filter(a => a.id !== id));
      showPopup("info", "Deleted!", "Announcement deleted successfully!");
    }, true);
  };

  const togglePublish = (id) => {
    setAnnouncements(prev => prev.map(a => {
      if (a.id === id) {
        const newPublished = !a.published;
        showToast(newPublished ? "Announcement published!" : "Announcement unpublished", "info");
        return { ...a, published: newPublished };
      }
      return a;
    }));
  };

  const togglePin = (id) => {
    setAnnouncements(prev => prev.map(a => {
      if (a.id === id) {
        showToast(a.pinned ? "Unpinned from top" : "Pinned to top", "info");
        return { ...a, pinned: !a.pinned };
      }
      return a;
    }));
  };

  const typeMap = {
    info: { bg: "#eff6ff", border: "#bfdbfe", icon: Info, ic: "#3b82f6", tag: "Info", tagBg: "#dbeafe", tagColor: "#1d4ed8" },
    success: { bg: "#f0fdf4", border: "#bbf7d0", icon: CheckCircle, ic: "#22c55e", tag: "Update", tagBg: "#dcfce7", tagColor: "#15803d" },
    warning: { bg: "#fffbeb", border: "#fde68a", icon: AlertTriangle, ic: "#f59e0b", tag: "Action Required", tagBg: "#fef3c7", tagColor: "#92400e" },
    maintenance: { bg: "#faf5ff", border: "#e9d5ff", icon: Settings, ic: "#7c5cfc", tag: "Maintenance", tagBg: "#ede9fe", tagColor: "#5b21b6" },
  };

  const audienceLabel = { all: "All Tenants", trial: "Trial", start: "Start", grow: "Grow", scale: "Scale" };

  return (
    <div className="space-y-5">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      
      <CustomPopup
        isOpen={popup.isOpen}
        type={popup.type}
        title={popup.title}
        message={popup.message}
        onClose={closePopup}
        onConfirm={popup.onConfirm}
        showConfirm={popup.showConfirm}
        confirmText="Yes, Delete"
        cancelText="Cancel"
      />

      <SchedulePopup
        isOpen={showSchedulePopup}
        onClose={() => setShowSchedulePopup(false)}
        onSchedule={handleSchedule}
        scheduledDate={annForm.scheduledDate}
        scheduledTime={annForm.scheduledTime}
      />

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center">
              <Megaphone className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Announcements</h2>
          </div>
          <p className="text-sm text-gray-400 mt-1 ml-10">
            Broadcast messages to tenants — maintenance windows, new features, billing notices.
          </p>
        </div>
        <button
          onClick={() => { setAnnCompose(true); setAnnEdit(null); setAnnForm({ title: "", body: "", type: "info", audience: "all", pinned: false, imageUrl: "", scheduledDate: "", scheduledTime: "" }); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-violet-600 text-white hover:bg-violet-700 transition-colors shadow-sm hover:shadow-md"
        >
          <Plus className="w-4 h-4" /> New Announcement
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total", value: announcements.length, color: "#111827" },
          { label: "Published", value: publishedAnn, color: "#059669" },
          { label: "Drafts", value: draftAnn, color: "#d97706" },
          { label: "Pinned", value: announcements.filter(a => a.pinned).length, color: "#7c5cfc" },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{s.label}</span>
            <span className="text-xl font-bold font-mono" style={{ color: s.color }}>{s.value}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-1 border-b border-gray-200">
        {(["all", "published", "draft"]).map(f => (
          <button key={f} onClick={() => setAnnFilter(f)}
            className="px-4 py-2.5 text-sm font-medium transition-all"
            style={{ color: annFilter === f ? "#7c5cfc" : "#6b7280", borderBottom: annFilter === f ? "2px solid #7c5cfc" : "2px solid transparent", marginBottom: "-1px" }}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {annCompose && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">{annEdit ? "Edit Announcement" : "New Announcement"}</h3>
            <button onClick={resetForm} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <input value={annForm.title} onChange={e => setAnnForm(f => ({ ...f, title: e.target.value }))}
            placeholder="Announcement title…"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-400" />
          
          <textarea value={annForm.body} onChange={e => setAnnForm(f => ({ ...f, body: e.target.value }))}
            placeholder="Write your announcement message here…" rows={4}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-violet-400 resize-none" />
          
          {/* Image URL Input */}
          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1.5">Brand Image URL (Optional)</label>
            <div className="relative">
              <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                value={annForm.imageUrl} 
                onChange={e => setAnnForm(f => ({ ...f, imageUrl: e.target.value }))}
                placeholder="https://example.com/image.jpg"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-400"
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-1">Add a brand image URL to make your announcement more engaging</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1.5">Type</label>
              <select value={annForm.type} onChange={e => setAnnForm(f => ({ ...f, type: e.target.value }))}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-violet-400">
                <option value="info">Info</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="maintenance">Maintenance</option>
                <option value="wishes">Wishes</option>
                <option value="features">Features</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1.5">Audience</label>
              <select value={annForm.audience} onChange={e => setAnnForm(f => ({ ...f, audience: e.target.value }))}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-violet-400">
                <option value="all">All Tenants</option>
                <option value="trial">Trial Only</option>
                <option value="start">Start</option>
                <option value="grow">Grow</option>
                <option value="scale">Scale</option>
              </select>
            </div>
          </div>

          {/* Pin Toggle */}
         

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-end gap-3 pt-2 border-t border-gray-100">
            <button onClick={resetForm}
              className="px-4 py-2 rounded-xl text-sm border border-gray-200 text-gray-500 hover:text-gray-800 transition-colors">
              Cancel
            </button>
            <button onClick={publishNow}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm hover:shadow-md">
              <Send className="w-4 h-4" /> Publish Now
            </button>
            <button onClick={() => setShowSchedulePopup(true)}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium bg-violet-600 text-white hover:bg-violet-700 transition-colors shadow-sm hover:shadow-md">
              <Calendar className="w-4 h-4" /> Publish Later
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {announcements
          .filter(a => annFilter === "all" ? true : annFilter === "published" ? a.published : !a.published)
          .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
          .map(ann => {
            const t = typeMap[ann.type];
            const TypeIcon = t.icon;
            const isScheduled = ann.scheduledDate && !ann.published;
            
            return (
              <div key={ann.id} className="rounded-2xl border overflow-hidden transition-all hover:shadow-md" style={{ background: t.bg, borderColor: t.border }}>
                {/* Image Banner */}
                {ann.imageUrl && (
                  <div className="w-full h-48 overflow-hidden">
                    <img 
                      src={ann.imageUrl} 
                      alt={ann.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                
                <div className="p-5">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-white" style={{ border: `1px solid ${t.border}` }}>
                      <TypeIcon className="w-4 h-4" style={{ color: t.ic }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        {ann.pinned && (
                          <span className="flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-violet-600 text-white">
                            <Pin className="w-2.5 h-2.5" /> Pinned
                          </span>
                        )}
                        {isScheduled && (
                          <span className="flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                            <Calendar className="w-2.5 h-2.5" /> Scheduled
                          </span>
                        )}
                        <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full" style={{ background: t.tagBg, color: t.tagColor }}>{t.tag}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1 bg-white/70 text-gray-500 border border-gray-200">
                          <Globe className="w-2.5 h-2.5" /> {audienceLabel[ann.audience]}
                        </span>
                        {!ann.published && !isScheduled && (
                          <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Draft</span>
                        )}
                        {isScheduled && (
                          <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                            {ann.scheduledDate}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-sm text-gray-900 mb-1">{ann.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{ann.body}</p>
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-gray-400 font-mono">
                        <span>{ann.date}</span>
                        <span>by {ann.author}</span>
                        {ann.published && <span>{ann.views} views</span>}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-1 flex-shrink-0">
                      <button onClick={() => togglePin(ann.id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-black/5"
                        style={{ color: ann.pinned ? "#7c5cfc" : "#9ca3af" }}>
                        <Pin className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => openEdit(ann)} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-black/5 text-gray-400">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => togglePublish(ann.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                        style={ann.published ? { background: "#fee2e2", color: "#dc2626" } : { background: "#7c5cfc", color: "#fff" }}>
                        {ann.published ? "Unpublish" : <><Send className="w-3 h-3" /> Publish</>}
                      </button>
                      <button onClick={() => deleteAnnouncement(ann.id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-red-50 text-gray-400 hover:text-red-500">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        {announcements.filter(a => annFilter === "all" ? true : annFilter === "published" ? a.published : !a.published).length === 0 && (
          <div className="py-20 text-center text-gray-400">
            <Megaphone className="w-10 h-10 mx-auto mb-3 opacity-20" />
            <div className="text-sm font-medium">No announcements here</div>
            <div className="text-xs mt-1">Create one to broadcast a message to your tenants</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
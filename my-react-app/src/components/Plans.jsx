// // import React, { useState } from "react";
// // import { Package, CheckCircle, X, AlertTriangle, Info } from "lucide-react";
// // import { tenants, plans, planFeatures } from "../data/mockData";

// // // Custom Popup Component
// // const CustomPopup = ({ isOpen, type, title, message, onClose }) => {
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
// //             <button onClick={onClose} className={`px-5 py-2 text-sm font-medium text-white rounded-xl transition-all shadow-sm hover:shadow-md ${colors.btn}`}>
// //               Got it
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

// // const Plans = () => {
// //   const [popup, setPopup] = useState({ isOpen: false, type: "info", title: "", message: "" });
// //   const [editPlanOpen, setEditPlanOpen] = useState(false);
// //   const [editingPlan, setEditingPlan] = useState(null);
// //   const [planForm, setPlanForm] = useState({ price: "", credits: "", users: "" });

// //   const showPopup = (type, title, message) => {
// //     setPopup({ isOpen: true, type, title, message });
// //   };

// //   const closePopup = () => {
// //     setPopup({ ...popup, isOpen: false });
// //   };

// //   const submitPlanEdit = () => {
// //     setEditPlanOpen(false);
// //     setEditingPlan(null);
// //     showPopup("success", "Updated!", `${editingPlan?.name} plan updated successfully!`);
// //   };

// //   return (
// //     <div className="space-y-5">
// //       <CustomPopup
// //         isOpen={popup.isOpen}
// //         type={popup.type}
// //         title={popup.title}
// //         message={popup.message}
// //         onClose={closePopup}
// //       />

// //       <div className="flex items-center justify-between">
// //         <div>
// //           <h2 className="text-2xl font-bold text-gray-900">Plans & Packages</h2>
// //           <p className="text-sm text-gray-400 mt-1">Subscription plans and feature breakdown.</p>
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
// //         {plans.map(plan => {
// //           const count = tenants.filter(t => t.plan === plan.name).length;
// //           return (
// //             <div key={plan.name} className="bg-white border border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between">
// //               <div className="flex items-center gap-2">
// //                 <div className="w-2.5 h-2.5 rounded-full" style={{ background: plan.color }} />
// //                 <span className="text-sm font-semibold text-gray-800">{plan.name}</span>
// //                 <span className="text-xs font-mono text-gray-400">{plan.price}</span>
// //               </div>
// //               <div className="flex items-center gap-2">
// //                 <span className="text-xs text-gray-400 font-mono">{count} tenants</span>
// //                 <button
// //                   onClick={() => { setEditingPlan({ ...plan, users: plan.totalUsers }); setPlanForm({ price: plan.price, credits: plan.credits, users: plan.totalUsers }); setEditPlanOpen(true); }}
// //                   className="text-[10px] font-mono px-2 py-1 border border-gray-200 rounded-lg text-gray-400 hover:text-violet-600 hover:border-violet-300 hover:bg-violet-50 transition-colors"
// //                 >
// //                   Edit
// //                 </button>
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>

// //       <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden overflow-x-auto">
// //         <div className="grid grid-cols-4 min-w-[600px]" style={{ background: "#1e3a5f" }}>
// //           <div className="px-5 py-3.5 text-xs font-semibold text-white">Feature</div>
// //           {plans.map(p => (
// //             <div key={p.name} className="px-4 py-3.5 text-center text-xs font-semibold text-white">{p.name}</div>
// //           ))}
// //         </div>

// //         {planFeatures.map((row, i) => (
// //           <div key={row.label} className={`grid grid-cols-4 min-w-[600px] border-b border-gray-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}>
// //             <div className="px-5 py-3 text-sm text-gray-700">{row.label}</div>
// //             {row.values.map((val, vi) => {
// //               const planColor = plans[vi].color;
// //               let cell;
// //               if (row.isYesNo) {
// //                 cell = (
// //                   <span className={`text-sm font-medium ${val === "Yes" ? "text-emerald-600" : "text-red-500"}`}>
// //                     {val}
// //                   </span>
// //                 );
// //               } else if (i === 0) {
// //                 cell = <span className="text-sm font-bold" style={{ color: planColor }}>{val}</span>;
// //               } else {
// //                 cell = <span className="text-sm font-mono text-gray-800">{val}</span>;
// //               }
// //               return (
// //                 <div key={vi} className="px-4 py-3 text-center flex items-center justify-center">
// //                   {cell}
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         ))}
// //       </div>

// //       {editPlanOpen && editingPlan && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setEditPlanOpen(false)}>
// //           <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
// //           <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 w-[90%] max-w-[440px]"
// //             onClick={e => e.stopPropagation()}>
// //             <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
// //               <div className="flex items-center gap-3">
// //                 <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: editingPlan.color + "20" }}>
// //                   <Package className="w-4 h-4" style={{ color: editingPlan.color }} />
// //                 </div>
// //                 <div>
// //                   <h2 className="text-base font-semibold text-gray-900">Edit {editingPlan.name} Plan</h2>
// //                   <p className="text-xs text-gray-400">Changes apply to all tenants on this plan.</p>
// //                 </div>
// //               </div>
// //               <button onClick={() => setEditPlanOpen(false)}
// //                 className="w-8 h-8 rounded-xl hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors">
// //                 <X className="w-4 h-4" />
// //               </button>
// //             </div>

// //             <div className="px-6 py-5 space-y-4">
// //               <div>
// //                 <label className="text-xs font-medium text-gray-500 block mb-1.5">Price</label>
// //                 <input value={planForm.price} onChange={e => setPlanForm(f => ({ ...f, price: e.target.value }))}
// //                   className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-violet-400 transition-colors" />
// //               </div>
// //               <div>
// //                 <label className="text-xs font-medium text-gray-500 block mb-1.5">AI Credits Included</label>
// //                 <input value={planForm.credits} onChange={e => setPlanForm(f => ({ ...f, credits: e.target.value }))}
// //                   className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-violet-400 transition-colors" />
// //               </div>
// //               <div>
// //                 <label className="text-xs font-medium text-gray-500 block mb-1.5">Team Size Limit</label>
// //                 <input value={planForm.users} onChange={e => setPlanForm(f => ({ ...f, users: e.target.value }))}
// //                   className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-violet-400 transition-colors" />
// //               </div>
// //               <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-2.5">
// //                 <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
// //                 <p className="text-xs text-amber-700">Plan changes affect future billing cycles. Existing tenants keep their current allocation until renewal.</p>
// //               </div>
// //             </div>

// //             <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
// //               <button onClick={() => setEditPlanOpen(false)}
// //                 className="px-4 py-2 rounded-xl text-sm border border-gray-200 text-gray-500 hover:text-gray-800 transition-colors">Cancel</button>
// //               <button onClick={submitPlanEdit}
// //                 className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-violet-600 text-white hover:bg-violet-700 transition-colors">
// //                 <CheckCircle className="w-4 h-4" /> Save Plan
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Plans;


// import React, { useState } from "react";
// import { Package, CheckCircle, X, AlertTriangle, Info, Phone, Users, Minus, Plus, Save, Edit2 } from "lucide-react";
// import { tenants, plans, planFeatures } from "../data/mockData";

// // Custom Popup Component
// const CustomPopup = ({ isOpen, type, title, message, onClose }) => {
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
//             <button onClick={onClose} className={`px-5 py-2 text-sm font-medium text-white rounded-xl transition-all shadow-sm hover:shadow-md ${colors.btn}`}>
//               Got it
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

// const Plans = () => {
//   const [popup, setPopup] = useState({ isOpen: false, type: "info", title: "", message: "" });
//   const [editPlanOpen, setEditPlanOpen] = useState(false);
//   const [editingPlan, setEditingPlan] = useState(null);
//   const [planForm, setPlanForm] = useState({ 
//     price: "", 
//     credits: "", 
//     users: "",
//     callLimit: 0,
//     maxCallLimit: 0
//   });

//   const showPopup = (type, title, message) => {
//     setPopup({ isOpen: true, type, title, message });
//   };

//   const closePopup = () => {
//     setPopup({ ...popup, isOpen: false });
//   };

//   const openEditPlan = (plan) => {
//     // Set max call limit based on plan
//     let maxCalls = 0;
//     if (plan.name === "Start") maxCalls = 10;
//     else if (plan.name === "Grow") maxCalls = 20;
//     else if (plan.name === "Scale") maxCalls = 40;
    
//     setEditingPlan(plan);
//     setPlanForm({ 
//       price: plan.price, 
//       credits: plan.credits, 
//       users: plan.totalUsers,
//       callLimit: 0,
//       maxCallLimit: maxCalls
//     });
//     setEditPlanOpen(true);
//   };

//   const updateCallLimit = (increment) => {
//     const newValue = planForm.callLimit + increment;
//     if (newValue >= 0 && newValue <= planForm.maxCallLimit) {
//       setPlanForm(prev => ({ ...prev, callLimit: newValue }));
//     }
//   };

//   const submitPlanEdit = () => {
//     setEditPlanOpen(false);
//     setEditingPlan(null);
//     showPopup("success", "Updated!", `${editingPlan?.name} plan updated successfully with ${planForm.callLimit} calls!`);
//   };

//   return (
//     <div className="space-y-5">
//       <CustomPopup
//         isOpen={popup.isOpen}
//         type={popup.type}
//         title={popup.title}
//         message={popup.message}
//         onClose={closePopup}
//       />

//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900">Plans & Packages</h2>
//           <p className="text-sm text-gray-400 mt-1">Subscription plans and feature breakdown.</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
//         {plans.map(plan => {
//           const count = tenants.filter(t => t.plan === plan.name).length;
//           return (
//             <div key={plan.name} className="bg-white border border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <div className="w-2.5 h-2.5 rounded-full" style={{ background: plan.color }} />
//                 <span className="text-sm font-semibold text-gray-800">{plan.name}</span>
//                 <span className="text-xs font-mono text-gray-400">{plan.price}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="text-xs text-gray-400 font-mono">{count} tenants</span>
//                 <button
//                   onClick={() => openEditPlan(plan)}
//                   className="text-[10px] font-mono px-2 py-1 border border-gray-200 rounded-lg text-gray-400 hover:text-violet-600 hover:border-violet-300 hover:bg-violet-50 transition-colors"
//                 >
//                   Edit
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden overflow-x-auto">
//         <div className="grid grid-cols-4 min-w-[600px]" style={{ background: "#1e3a5f" }}>
//           <div className="px-5 py-3.5 text-xs font-semibold text-white">Feature</div>
//           {plans.map(p => (
//             <div key={p.name} className="px-4 py-3.5 text-center text-xs font-semibold text-white">{p.name}</div>
//           ))}
//         </div>

//         {planFeatures.map((row, i) => (
//           <div key={row.label} className={`grid grid-cols-4 min-w-[600px] border-b border-gray-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}>
//             <div className="px-5 py-3 text-sm text-gray-700">{row.label}</div>
//             {row.values.map((val, vi) => {
//               const planColor = plans[vi].color;
//               let cell;
//               if (row.isYesNo) {
//                 cell = (
//                   <span className={`text-sm font-medium ${val === "Yes" ? "text-emerald-600" : "text-red-500"}`}>
//                     {val}
//                   </span>
//                 );
//               } else if (i === 0) {
//                 cell = <span className="text-sm font-bold" style={{ color: planColor }}>{val}</span>;
//               } else {
//                 cell = <span className="text-sm font-mono text-gray-800">{val}</span>;
//               }
//               return (
//                 <div key={vi} className="px-4 py-3 text-center flex items-center justify-center">
//                   {cell}
//                 </div>
//               );
//             })}
//           </div>
//         ))}
//       </div>

//       {editPlanOpen && editingPlan && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setEditPlanOpen(false)}>
//           <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
//           <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 w-[90%] max-w-[480px]"
//             onClick={e => e.stopPropagation()}>
//             <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: editingPlan.color + "20" }}>
//                   <Package className="w-4 h-4" style={{ color: editingPlan.color }} />
//                 </div>
//                 <div>
//                   <h2 className="text-base font-semibold text-gray-900">Edit {editingPlan.name} Plan</h2>
//                   <p className="text-xs text-gray-400">Changes apply to all tenants on this plan.</p>
//                 </div>
//               </div>
//               <button onClick={() => setEditPlanOpen(false)}
//                 className="w-8 h-8 rounded-xl hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors">
//                 <X className="w-4 h-4" />
//               </button>
//             </div>

//             <div className="px-6 py-5 space-y-4">
//               <div>
//                 <label className="text-xs font-medium text-gray-500 block mb-1.5">Price</label>
//                 <input value={planForm.price} onChange={e => setPlanForm(f => ({ ...f, price: e.target.value }))}
//                   className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-violet-400 transition-colors" />
//               </div>
//               <div>
//                 <label className="text-xs font-medium text-gray-500 block mb-1.5">AI Credits Included</label>
//                 <input value={planForm.credits} onChange={e => setPlanForm(f => ({ ...f, credits: e.target.value }))}
//                   className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-violet-400 transition-colors" />
//               </div>
//               <div>
//                 <label className="text-xs font-medium text-gray-500 block mb-1.5">Team Size Limit</label>
//                 <input value={planForm.users} onChange={e => setPlanForm(f => ({ ...f, users: e.target.value }))}
//                   className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-violet-400 transition-colors" />
//               </div>

//               {/* Call Limit Section */}
//               <div className="border-t border-gray-200 pt-4">
//                 <div className="flex items-center justify-between mb-3">
//                   <div className="flex items-center gap-2">
//                     <Phone className="w-4 h-4 text-violet-500" />
//                     <span className="text-sm font-semibold text-gray-700">Call Limit</span>
//                   </div>
//                   <span className="text-xs text-gray-400">Max: {planForm.maxCallLimit}</span>
//                 </div>
                
//                 <div className="flex items-center gap-4">
//                   <div className="flex-1">
//                     <div className="flex items-center justify-between gap-3">
//                       <button
//                         onClick={() => updateCallLimit(-1)}
//                         className={`w-10 h-10 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center transition-colors ${
//                           planForm.callLimit <= 0 ? "opacity-40 cursor-not-allowed" : ""
//                         }`}
//                         disabled={planForm.callLimit <= 0}
//                       >
//                         <Minus className="w-4 h-4 text-gray-600" />
//                       </button>
                      
//                       <div className="flex-1 text-center">
//                         <span className="text-2xl font-bold text-gray-900">{planForm.callLimit}</span>
//                         <div className="text-xs text-gray-400">calls</div>
//                       </div>
                      
//                       <button
//                         onClick={() => updateCallLimit(1)}
//                         className={`w-10 h-10 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center transition-colors ${
//                           planForm.callLimit >= planForm.maxCallLimit ? "opacity-40 cursor-not-allowed" : ""
//                         }`}
//                         disabled={planForm.callLimit >= planForm.maxCallLimit}
//                       >
//                         <Plus className="w-4 h-4 text-gray-600" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Progress Bar */}
//                 <div className="mt-3">
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div 
//                       className="h-2 rounded-full transition-all" 
//                       style={{ 
//                         width: `${(planForm.callLimit / planForm.maxCallLimit) * 100}%`,
//                         background: editingPlan.color 
//                       }}
//                     />
//                   </div>
//                   <div className="flex justify-between text-xs text-gray-400 mt-1">
//                     <span>0</span>
//                     <span>{planForm.maxCallLimit}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-2.5">
//                 <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
//                 <p className="text-xs text-amber-700">Plan changes affect future billing cycles. Existing tenants keep their current allocation until renewal.</p>
//               </div>
//             </div>

//             <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
//               <button onClick={() => setEditPlanOpen(false)}
//                 className="px-4 py-2 rounded-xl text-sm border border-gray-200 text-gray-500 hover:text-gray-800 transition-colors">Cancel</button>
//               <button onClick={submitPlanEdit}
//                 className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-violet-600 text-white hover:bg-violet-700 transition-colors">
//                 <Save className="w-4 h-4" /> Save Plan
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Plans;




import React, { useState } from "react";
import { 
  Package, CheckCircle, X, AlertTriangle, Info, Phone, Users, 
  Minus, Plus, Save, Edit2 
} from "lucide-react";
import { tenants, plans, planFeatures } from "../data/mockData";

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

const Plans = () => {
  const [popup, setPopup] = useState({ isOpen: false, type: "info", title: "", message: "" });
  const [editPlanOpen, setEditPlanOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [planForm, setPlanForm] = useState({ 
    price: "", 
    credits: "", 
    users: "",
    callLimit: 0,
    maxCallLimit: 0
  });

  const showPopup = (type, title, message) => {
    setPopup({ isOpen: true, type, title, message });
  };

  const closePopup = () => {
    setPopup({ ...popup, isOpen: false });
  };

  const openEditPlan = (plan) => {
    // Extract numeric value from users (remove * if present)
    const userValue = parseInt(plan.totalUsers.replace('*', ''));
    
    // Calculate max call limit: users - 4
    // 10 users -> 6 calls, 20 users -> 16 calls, 40 users -> 36 calls
    const maxCalls = Math.max(0, userValue - 4);
    
    setEditingPlan(plan);
    setPlanForm({ 
      price: plan.price, 
      credits: plan.credits, 
      users: plan.totalUsers,
      callLimit: 0,
      maxCallLimit: maxCalls
    });
    setEditPlanOpen(true);
  };

  const updateCallLimit = (increment) => {
    const newValue = planForm.callLimit + increment;
    if (newValue >= 0 && newValue <= planForm.maxCallLimit) {
      setPlanForm(prev => ({ ...prev, callLimit: newValue }));
    }
  };

  const updateTeamSize = (value) => {
    // Allow only numbers and * symbol
    const sanitized = value.replace(/[^0-9*]/g, '');
    const numericValue = parseInt(sanitized.replace('*', ''));
    
    // Only update if it's a valid number and not empty
    if (!isNaN(numericValue) && numericValue > 0) {
      // Calculate max call limit: users - 4
      const newMaxCallLimit = Math.max(0, numericValue - 4);
      
      // If current call limit exceeds new max, reset to new max
      const newCallLimit = planForm.callLimit > newMaxCallLimit ? newMaxCallLimit : planForm.callLimit;
      
      setPlanForm(prev => ({ 
        ...prev, 
        users: sanitized,
        maxCallLimit: newMaxCallLimit,
        callLimit: newCallLimit
      }));
    } else if (sanitized === '') {
      setPlanForm(prev => ({ ...prev, users: '' }));
    }
  };

  const submitPlanEdit = () => {
    setEditPlanOpen(false);
    setEditingPlan(null);
    showPopup("success", "Updated!", `${editingPlan?.name} plan updated successfully with ${planForm.callLimit} calls!`);
  };

  return (
    <div className="space-y-5">
      <CustomPopup
        isOpen={popup.isOpen}
        type={popup.type}
        title={popup.title}
        message={popup.message}
        onClose={closePopup}
      />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Plans & Packages</h2>
          <p className="text-sm text-gray-400 mt-1">Subscription plans and feature breakdown.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {plans.map(plan => {
          const count = tenants.filter(t => t.plan === plan.name).length;
          return (
            <div key={plan.name} className="bg-white border border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: plan.color }} />
                <span className="text-sm font-semibold text-gray-800">{plan.name}</span>
                <span className="text-xs font-mono text-gray-400">{plan.price}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-mono">{count} tenants</span>
                <button
                  onClick={() => openEditPlan(plan)}
                  className="text-[10px] font-mono px-2 py-1 border border-gray-200 rounded-lg text-gray-400 hover:text-violet-600 hover:border-violet-300 hover:bg-violet-50 transition-colors"
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden overflow-x-auto">
        <div className="grid grid-cols-4 min-w-[600px]" style={{ background: "#1e3a5f" }}>
          <div className="px-5 py-3.5 text-xs font-semibold text-white">Feature</div>
          {plans.map(p => (
            <div key={p.name} className="px-4 py-3.5 text-center text-xs font-semibold text-white">{p.name}</div>
          ))}
        </div>

        {planFeatures.map((row, i) => (
          <div key={row.label} className={`grid grid-cols-4 min-w-[600px] border-b border-gray-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}>
            <div className="px-5 py-3 text-sm text-gray-700">{row.label}</div>
            {row.values.map((val, vi) => {
              const planColor = plans[vi].color;
              let cell;
              if (row.isYesNo) {
                cell = (
                  <span className={`text-sm font-medium ${val === "Yes" ? "text-emerald-600" : "text-red-500"}`}>
                    {val}
                  </span>
                );
              } else if (i === 0) {
                cell = <span className="text-sm font-bold" style={{ color: planColor }}>{val}</span>;
              } else {
                cell = <span className="text-sm font-mono text-gray-800">{val}</span>;
              }
              return (
                <div key={vi} className="px-4 py-3 text-center flex items-center justify-center">
                  {cell}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {editPlanOpen && editingPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setEditPlanOpen(false)}>
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 w-[90%] max-w-[480px]"
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: editingPlan.color + "20" }}>
                  <Package className="w-4 h-4" style={{ color: editingPlan.color }} />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Edit {editingPlan.name} Plan</h2>
                  <p className="text-xs text-gray-400">Changes apply to all tenants on this plan.</p>
                </div>
              </div>
              <button onClick={() => setEditPlanOpen(false)}
                className="w-8 h-8 rounded-xl hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1.5">Price</label>
                <input value={planForm.price} onChange={e => setPlanForm(f => ({ ...f, price: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-violet-400 transition-colors" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1.5">AI Credits Included</label>
                <input value={planForm.credits} onChange={e => setPlanForm(f => ({ ...f, credits: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-violet-400 transition-colors" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1.5">Team Size Limit</label>
                <input 
                  value={planForm.users} 
                  onChange={(e) => updateTeamSize(e.target.value)}
                  placeholder="Enter team size (e.g., 10, 20, 40)"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-violet-400 transition-colors" 
                />
                <p className="text-[10px] text-gray-400 mt-1">* Call limit will be (Team Size - 4). Max: {planForm.maxCallLimit}</p>
              </div>

              {/* Call Limit Section - Dynamically updates based on Team Size */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-violet-500" />
                    <span className="text-sm font-semibold text-gray-700">Call Limit</span>
                  </div>
                  <span className="text-xs text-gray-400">Max: {planForm.maxCallLimit}</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <button
                        onClick={() => updateCallLimit(-1)}
                        className={`w-10 h-10 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center transition-colors ${
                          planForm.callLimit <= 0 ? "opacity-40 cursor-not-allowed" : ""
                        }`}
                        disabled={planForm.callLimit <= 0}
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      
                      <div className="flex-1 text-center">
                        <span className="text-2xl font-bold text-gray-900">{planForm.callLimit}</span>
                        <div className="text-xs text-gray-400">calls</div>
                      </div>
                      
                      <button
                        onClick={() => updateCallLimit(1)}
                        className={`w-10 h-10 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center transition-colors ${
                          planForm.callLimit >= planForm.maxCallLimit ? "opacity-40 cursor-not-allowed" : ""
                        }`}
                        disabled={planForm.callLimit >= planForm.maxCallLimit}
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all" 
                      style={{ 
                        width: `${(planForm.callLimit / planForm.maxCallLimit) * 100}%`,
                        background: editingPlan.color 
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0</span>
                    <span>{planForm.maxCallLimit}</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-700">Plan changes affect future billing cycles. Existing tenants keep their current allocation until renewal.</p>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
              <button onClick={() => setEditPlanOpen(false)}
                className="px-4 py-2 rounded-xl text-sm border border-gray-200 text-gray-500 hover:text-gray-800 transition-colors">Cancel</button>
              <button onClick={submitPlanEdit}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-violet-600 text-white hover:bg-violet-700 transition-colors">
                <Save className="w-4 h-4" /> Save Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plans;
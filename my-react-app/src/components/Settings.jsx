import React, { useState } from "react";
import { 
  Settings as SettingsIcon, Edit2, Save, X, Globe, Mail, Clock, 
  Bell, CheckCircle, AlertCircle, Send, KeyRound
} from "lucide-react";

// Custom Popup Component (Same as above)
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

const Settings = () => {
  const [editing, setEditing] = useState(null);
  const [settings, setSettings] = useState([
    { id: "platform", label: "Platform Name", value: "WynSync CRM", icon: Globe, description: "The name displayed across the platform" },
    { id: "trial", label: "Default Trial Duration", value: "14 days", icon: Clock, description: "How long new tenants have to try the platform" },
    { id: "email", label: "Admin Email", value: "admin@wynsync.io", icon: Mail, description: "Primary contact email for platform notifications" },
  ]);

  const [editValue, setEditValue] = useState("");
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [popup, setPopup] = useState({ isOpen: false, type: "info", title: "", message: "" });
  const [emailVerification, setEmailVerification] = useState({
    newEmail: "",
    otp: "",
    step: "email",
    isVerified: false,
    error: "",
    isLoading: false,
  });

  const showPopup = (type, title, message) => {
    setPopup({ isOpen: true, type, title, message });
  };

  const closePopup = () => {
    setPopup({ ...popup, isOpen: false });
  };

  const startEdit = (id) => {
    const setting = settings.find(s => s.id === id);
    setEditing(id);
    setEditValue(setting.value);
    
    if (id === "email") {
      setShowEmailPopup(true);
      setEmailVerification({
        newEmail: setting.value,
        otp: "",
        step: "email",
        isVerified: false,
        error: "",
        isLoading: false,
      });
    }
  };

  const saveEdit = (id) => {
    setSettings(prev => prev.map(s => 
      s.id === id ? { ...s, value: editValue } : s
    ));
    setEditing(null);
    showPopup("success", "Updated!", `${settings.find(s => s.id === id).label} updated successfully!`);
  };

  const cancelEdit = () => {
    setEditing(null);
    setShowEmailPopup(false);
    setEmailVerification({
      newEmail: "",
      otp: "",
      step: "email",
      isVerified: false,
      error: "",
      isLoading: false,
    });
  };

  const handleSendOTP = () => {
    if (!emailVerification.newEmail || !emailVerification.newEmail.includes('@')) {
      setEmailVerification(prev => ({ ...prev, error: "Please enter a valid email address" }));
      return;
    }

    setEmailVerification(prev => ({ ...prev, isLoading: true, error: "" }));

    setTimeout(() => {
      setEmailVerification(prev => ({ 
        ...prev, 
        isLoading: false, 
        step: "otp",
      }));
      showPopup("info", "OTP Sent!", `OTP sent to ${emailVerification.newEmail}`);
    }, 1500);
  };

  const handleVerifyOTP = () => {
    if (!emailVerification.otp || emailVerification.otp.length < 4) {
      setEmailVerification(prev => ({ ...prev, error: "Please enter a valid OTP (4+ digits)" }));
      return;
    }

    setEmailVerification(prev => ({ ...prev, isLoading: true, error: "" }));

    setTimeout(() => {
      if (emailVerification.otp.length >= 4) {
        setEmailVerification(prev => ({ 
          ...prev, 
          isLoading: false, 
          step: "success",
          isVerified: true,
        }));
        
        setTimeout(() => {
          setSettings(prev => prev.map(s => 
            s.id === "email" ? { ...s, value: emailVerification.newEmail } : s
          ));
          setEditing(null);
          showPopup("success", "Verified!", "Email verified and updated successfully!");
          setTimeout(() => {
            setShowEmailPopup(false);
          }, 1500);
        }, 1000);
      } else {
        setEmailVerification(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: "Invalid OTP. Please try again." 
        }));
        showPopup("error", "Verification Failed", "Invalid OTP. Please try again.");
      }
    }, 1500);
  };

  const handleResendOTP = () => {
    setEmailVerification(prev => ({ ...prev, isLoading: true, error: "" }));
    
    setTimeout(() => {
      setEmailVerification(prev => ({ 
        ...prev, 
        isLoading: false,
        otp: "",
      }));
      showPopup("info", "OTP Resent!", `New OTP sent to ${prev.newEmail}`);
    }, 1000);
  };

  const closeEmailPopup = () => {
    if (emailVerification.step === "success") {
      setShowEmailPopup(false);
      setEmailVerification({
        newEmail: "",
        otp: "",
        step: "email",
        isVerified: false,
        error: "",
        isLoading: false,
      });
    } else {
      if (window.confirm("Are you sure you want to cancel? Your changes will not be saved.")) {
        setShowEmailPopup(false);
        setEmailVerification({
          newEmail: "",
          otp: "",
          step: "email",
          isVerified: false,
          error: "",
          isLoading: false,
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <CustomPopup
        isOpen={popup.isOpen}
        type={popup.type}
        title={popup.title}
        message={popup.message}
        onClose={closePopup}
      />

      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-sm text-gray-400 mt-1">Manage your platform configuration and preferences</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-violet-600" />
            <h3 className="text-sm font-semibold text-gray-900">General Settings</h3>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {settings.map(s => (
            <div key={s.id} className="px-6 py-4 hover:bg-gray-50/50 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-[200px]">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <s.icon className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{s.label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{s.description}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {editing === s.id ? (
                    <>
                      <input 
                        value={editValue} 
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-48 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                      />
                      <button onClick={() => saveEdit(s.id)}
                        className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-all">
                        <Save className="w-4 h-4" />
                      </button>
                      <button onClick={cancelEdit}
                        className="p-2 rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100 transition-all">
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="text-sm font-medium text-gray-700">{s.value}</span>
                      <button onClick={() => startEdit(s.id)}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-violet-600 transition-all">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <Bell className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
        <div>
          <div className="text-sm font-medium text-amber-700">Need to customize more settings?</div>
          <div className="text-xs text-amber-600 mt-0.5">Contact your system administrator for advanced configuration options.</div>
        </div>
      </div>

      {/* Email Verification Popup */}
      {showEmailPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeEmailPopup} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Verify Email</h2>
                <p className="text-xs text-gray-400 mt-0.5">Secure your account with email verification</p>
              </div>
              <button onClick={closeEmailPopup}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {emailVerification.step === "email" && (
                <>
                  <div className="text-center mb-4">
                    <Mail className="w-12 h-12 mx-auto text-violet-500 mb-2" />
                    <h3 className="text-sm font-semibold text-gray-900">Enter New Email Address</h3>
                    <p className="text-xs text-gray-400 mt-1">We'll send a verification code to this email</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 block mb-1.5">New Email Address</label>
                    <input 
                      type="email"
                      value={emailVerification.newEmail} 
                      onChange={(e) => setEmailVerification(prev => ({ 
                        ...prev, 
                        newEmail: e.target.value,
                        error: "" 
                      }))}
                      placeholder="Enter new email address"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                    />
                  </div>
                  {emailVerification.error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-red-600">{emailVerification.error}</p>
                    </div>
                  )}
                  <button 
                    onClick={handleSendOTP}
                    disabled={emailVerification.isLoading}
                    className="w-full py-2.5 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {emailVerification.isLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send Verification Code
                      </>
                    )}
                  </button>
                </>
              )}

              {emailVerification.step === "otp" && (
                <>
                  <div className="text-center mb-4">
                    <KeyRound className="w-12 h-12 mx-auto text-violet-500 mb-2" />
                    <h3 className="text-sm font-semibold text-gray-900">Enter Verification Code</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      We sent a 4-digit code to <span className="font-medium text-gray-700">{emailVerification.newEmail}</span>
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 block mb-1.5">OTP Code</label>
                    <input 
                      type="text"
                      value={emailVerification.otp} 
                      onChange={(e) => setEmailVerification(prev => ({ 
                        ...prev, 
                        otp: e.target.value.replace(/\D/g, '').slice(0, 6),
                        error: "" 
                      }))}
                      placeholder="Enter 4-6 digit code"
                      maxLength="6"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all text-center text-2xl font-mono tracking-widest"
                    />
                  </div>
                  {emailVerification.error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-red-600">{emailVerification.error}</p>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <button 
                      onClick={handleResendOTP}
                      disabled={emailVerification.isLoading}
                      className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Resend Code
                    </button>
                    <button 
                      onClick={handleVerifyOTP}
                      disabled={emailVerification.isLoading || !emailVerification.otp}
                      className="flex-1 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {emailVerification.isLoading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" /> Verify
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}

              {emailVerification.step === "success" && (
                <div className="text-center py-6">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Email Verified!</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Your email has been successfully updated to <br />
                    <span className="font-semibold text-gray-700">{emailVerification.newEmail}</span>
                  </p>
                  <button 
                    onClick={closeEmailPopup}
                    className="mt-6 px-6 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 transition-all shadow-sm hover:shadow-md"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
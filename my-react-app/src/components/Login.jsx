// import React, { useState } from "react";
// import { Zap, Mail, Lock, Eye, EyeOff } from "lucide-react";

// const Login = ({ onLogin }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");
    
//     if (!email || !password) {
//       setError("Please fill in all fields");
//       return;
//     }

//     setIsLoading(true);
    
//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false);
//       if (email === "admin@wynsync.io" && password === "admin123") {
//         onLogin();
//       } else {
//         setError("Invalid email or password");
//       }
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#f5f4f0] p-4">
//       <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
//         {/* Logo */}
//         <div className="flex flex-col items-center mb-8">
//           <div className="w-14 h-14 rounded-2xl bg-violet-600 flex items-center justify-center mb-3">
//             <Zap className="w-7 h-7 text-white" />
//           </div>
//           <h1 className="text-2xl font-semibold text-gray-900">WynSync</h1>
//           <p className="text-sm text-gray-400 mt-1">Admin Dashboard</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="text-sm font-medium text-gray-700 block mb-1.5">Email Address</label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="admin@wynsync.io"
//                 className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="text-sm font-medium text-gray-700 block mb-1.5">Password</label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-12 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//               </button>
//             </div>
//           </div>

//           {error && (
//             <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
//               {error}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full py-3 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isLoading ? (
//               <span className="flex items-center justify-center gap-2">
//                 <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 Signing in...
//               </span>
//             ) : (
//               "Sign In"
//             )}
//           </button>

//           <p className="text-center text-xs text-gray-400 mt-4">
//             Demo credentials: admin@wynsync.io / admin123
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (email === "admin@wynsync.io" && password === "admin123") {
        onLogin();
      } else {
        setError("Invalid email or password");
      }
    }, 1000);
  };

  const fillDemo = () => {
    setEmail("admin@wynsync.io");
    setPassword("admin123");
    setError("");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#f5f4f0] p-4">
      {/* animated gradient orbs - soft white/gray theme */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-200/40 blur-[110px] animate-pulse" style={{ animationDuration: "6s" }} />
      <div className="absolute bottom-[-15%] right-[-10%] w-[480px] h-[480px] rounded-full bg-indigo-200/30 blur-[110px] animate-pulse" style={{ animationDuration: "8s" }} />
      <div className="absolute top-1/3 right-1/4 w-[320px] h-[320px] rounded-full bg-purple-200/20 blur-[100px]" />

      {/* faint grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 w-full max-w-[420px]">
        {/* card */}
        <div className="rounded-[28px] border border-gray-200/60 bg-white/80 backdrop-blur-2xl shadow-[0_8px_60px_rgba(0,0,0,0.08)] p-8 sm:p-9">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(124,92,252,0.25)]">
              <Zap className="w-7 h-7 text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">WynSync</h1>
            <p className="text-sm text-gray-400 mt-1">Admin Dashboard</p>
          </div>

          {/* demo credentials chip */}
          <button
            type="button"
            onClick={fillDemo}
            className="w-full flex items-center justify-center gap-2 mb-6 rounded-xl border border-violet-200/60 bg-violet-50/60 hover:bg-violet-100/60 text-violet-600 text-xs font-medium py-2.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Use demo credentials
          </button>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@wynsync.io"
                  className="w-full rounded-xl border border-gray-200 bg-white/50 pl-10 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-200 bg-white/50 pl-10 pr-12 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 accent-violet-500" />
                Remember me
              </label>
              <a href="#" className="text-violet-500 hover:text-violet-600 font-medium">
                Forgot password?
              </a>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 text-white text-sm font-bold hover:from-violet-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group shadow-[0_4px_20px_rgba(124,92,252,0.3)]"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          © 2026 WynSync, Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
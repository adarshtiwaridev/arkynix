"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Lock, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API Call
    setTimeout(() => {
      toast.success("Access Granted 🚀");
      setLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center transition-colors duration-500 bg-slate-50 dark:bg-[#0a0a0a] px-4 overflow-hidden relative">
      
      {/* 🌌 Background Accents (Visible in both themes) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 dark:bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 dark:bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-700" />

      {/* 📦 The Login Box */}
      <div className="w-full max-w-md z-10 animate-in fade-in zoom-in duration-700">
        <div className="bg-white/80 dark:bg-white/[0.03] backdrop-blur-2xl border border-slate-200 dark:border-white/10 p-8 rounded-[2rem] shadow-xl dark:shadow-2xl">
          
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-black mb-4 shadow-lg">
              <ShieldCheck size={28} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Admin Login
            </h1>
            <p className="text-slate-500 dark:text-gray-400 text-sm mt-2 font-medium">
              Please enter your details to proceed
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@company.com"
                  onChange={handleChange}
                  className="w-full bg-slate-100 dark:bg-white/[0.05] border border-transparent focus:border-blue-500/50 dark:focus:border-blue-400/50 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600 outline-none focus:ring-4 focus:ring-blue-500/5 dark:focus:ring-blue-400/10 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest ml-1">
                Secure Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="w-full bg-slate-100 dark:bg-white/[0.05] border border-transparent focus:border-blue-500/50 dark:focus:border-blue-400/50 rounded-2xl py-3.5 pl-12 pr-12 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600 outline-none focus:ring-4 focus:ring-blue-500/5 dark:focus:ring-blue-400/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 dark:bg-white text-white dark:text-black font-bold py-4 rounded-2xl shadow-lg hover:opacity-90 transition-all active:scale-[0.97] disabled:opacity-50 flex items-center justify-center gap-3 mt-4"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Bottom Security Badge */}
          <div className="mt-8 flex items-center justify-center gap-2 opacity-50 dark:opacity-30">
            <div className="h-[1px] w-8 bg-slate-400" />
            <span className="text-[10px] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-tighter">
              Secure Session
            </span>
            <div className="h-[1px] w-8 bg-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );
} 
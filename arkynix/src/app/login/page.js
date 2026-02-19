"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
   if (data.token) {
    localStorage.setItem("auth_token", data.token);
    console.log("token saved ")
   }
   else {    console.log("No token received");
   }
      toast.success("Welcome back 🚀");
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">

      {/* 🔮 Gradient Glow Background */}
      <div className="absolute -top-40 -left-40 h-96 w-96 bg-blue-600/30 blur-3xl rounded-full" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 bg-purple-600/30 blur-3xl rounded-full" />

      {/* 🧊 Glass Card */}
      <div className="relative hover:border-b-amber-400 z-10 grid w-full max-w-5xl grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border border-border bg-card/70 backdrop-blur-xl shadow-2xl">

        {/* 🖼️ Left Image Section */}
        <div className="relative hidden md:block">
          <Image
            src="/photos/image02.avif" // replace with your image
            alt="Login Visual"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute bottom-10 left-10 right-10 text-white">
            <h2 className="text-3xl font-extrabold leading-tight">
              Build. Manage. Scale.
            </h2>
            <p className="mt-2 text-sm text-white/80">
              Access your dashboard and control everything from one place.
            </p>
          </div>
        </div>

        {/* 🔐 Right Login Form */}
        <div className="p-8 sm:p-12">
          {/* Logo */}
          <div className="mb-6">
            <div className="h-12 w-12 rounded-xl bg-accent text-white flex items-center justify-center font-black text-lg">
              AK
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-foreground">
            Welcome back Admin!
          </h1>
          <p className="mt-1 text-sm text-foreground/70">
            Only Admin Login to continue
          </p>

          {error && (
            <p className="mt-4 text-sm text-red-500">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-foreground/80">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl px-4 py-3 bg-background border border-border focus:ring-2 focus:ring-accent outline-none transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-foreground/80">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-xl px-4 py-3 pr-12 bg-background border border-border focus:ring-2 focus:ring-accent outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl py-3 bg-accent text-white font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

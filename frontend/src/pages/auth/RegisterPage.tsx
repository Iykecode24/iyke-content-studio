import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Clapperboard, Mail, Lock, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) { setError("Please accept the terms to continue"); return; }
    if (form.password !== form.confirm) { setError("Passwords do not match"); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters"); return; }
    setIsLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate("/dashboard");
    } catch { setError("Registration failed. Please try again."); }
    finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: "hsl(220,25%,4%)" }}>
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #fbbf24, #d97706)" }}>
            <Clapperboard className="w-5 h-5 text-black" />
          </div>
          <span className="text-base font-black tracking-widest text-gold-gradient">IYKE CONTENT STUDIO</span>
        </div>
        <h1 className="text-3xl font-black text-white mb-2">Create your account</h1>
        <p className="text-white/50 mb-8">Start creating AI-powered videos today</p>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl text-sm text-red-300" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input type="text" placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              className="input-studio pl-10" required />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input type="email" placeholder="Email address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              className="input-studio pl-10" required />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input type={showPw ? "text" : "password"} placeholder="Password (min 8 chars)" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
              className="input-studio pl-10 pr-10" required />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input type="password" placeholder="Confirm password" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })}
              className="input-studio pl-10" required />
          </div>

          <div className="glass rounded-xl p-3 text-xs text-white/50 flex gap-2">
            <span className="text-amber-400 mt-0.5">ⓘ</span>
            <span>AI-generated content may be subject to platform disclosure requirements. You confirm you will not use this platform for non-consensual deepfakes, impersonation, or illegal content.</span>
          </div>

          <label className="flex items-start gap-2 text-sm text-white/60 cursor-pointer">
            <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 rounded" />
            <span>I agree to the <a href="#" className="text-amber-400">Terms of Service</a> and <a href="#" className="text-amber-400">Privacy Policy</a></span>
          </label>

          <button type="submit" disabled={isLoading || !agreed}
            className="w-full py-3 rounded-xl font-bold text-base btn-gold disabled:opacity-60 flex items-center justify-center gap-2">
            {isLoading ? <><div className="w-5 h-5 rounded-full border-2 border-black/30 border-t-black animate-spin" /> Creating account...</> : "Create Account Free"}
          </button>
        </form>
        <p className="text-center mt-6 text-sm text-white/50">
          Already have an account? <Link to="/login" className="text-amber-400 hover:text-amber-300 font-semibold">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

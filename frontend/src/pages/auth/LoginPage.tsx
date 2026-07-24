import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Clapperboard, Mail, Lock, Film } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields"); return; }
    setIsLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "hsl(220,25%,4%)" }}>
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(220,25%,6%) 0%, hsl(220,30%,3%) 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, rgba(251,191,36,0.2) 0%, transparent 70%)", filter: "blur(60px)" }} />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)", filter: "blur(40px)" }} />
        </div>
        <div className="relative z-10 text-center px-8">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl"
            style={{ background: "linear-gradient(135deg, #fbbf24, #d97706)" }}>
            <Clapperboard className="w-10 h-10 text-black" />
          </div>
          <h2 className="text-4xl font-black mb-4 text-gold-gradient">IYKE CONTENT STUDIO</h2>
          <p className="text-xl font-light text-white/60 mb-8">Create. Generate. Inspire.</p>
          <div className="flex flex-col gap-3 text-left max-w-sm mx-auto">
            {["AI Movie & Cartoon Generation", "ElevenLabs Voice Synthesis", "RunPod GPU Rendering", "Multi-Platform Publishing"].map(f => (
              <div key={f} className="flex items-center gap-3 text-sm text-white/60">
                <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #fbbf24, #d97706)" }}>
              <Clapperboard className="w-5 h-5 text-black" />
            </div>
            <span className="text-base font-black tracking-widest text-gold-gradient">IYKE CONTENT STUDIO</span>
          </div>

          <h1 className="text-3xl font-black text-white mb-2">Welcome back</h1>
          <p className="text-white/50 mb-8">Sign in to your creative studio</p>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl text-sm text-red-300"
              style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}
                className="input-studio pl-10" required />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input type={showPw ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
                className="input-studio pl-10 pr-10" required />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-white/50 cursor-pointer">
                <input type="checkbox" className="rounded" /> Remember me
              </label>
              <Link to="/forgot-password" className="text-amber-400 hover:text-amber-300 transition-colors">
                Forgot password?
              </Link>
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full py-3 rounded-xl font-bold text-base btn-gold disabled:opacity-60 flex items-center justify-center gap-2">
              {isLoading ? (
                <><div className="w-5 h-5 rounded-full border-2 border-black/30 border-t-black animate-spin" /> Signing in...</>
              ) : "Sign In to Studio"}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-white/50">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
              Create one free
            </Link>
          </p>

          <p className="text-center mt-8 text-xs text-white/25">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

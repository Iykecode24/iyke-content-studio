import { useState } from "react";
import { Link } from "react-router-dom";
import { Clapperboard, Mail, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setSent(true);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "hsl(220,25%,4%)" }}>
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #fbbf24, #d97706)" }}>
            <Clapperboard className="w-5 h-5 text-black" />
          </div>
          <span className="text-base font-black tracking-widest text-gold-gradient">IYKE CONTENT STUDIO</span>
        </div>
        <div className="glass rounded-3xl p-8">
          {!sent ? (
            <>
              <h1 className="text-2xl font-black text-white mb-2">Reset your password</h1>
              <p className="text-white/50 text-sm mb-6">Enter your email and we will send you a reset link</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}
                    className="input-studio pl-10" required />
                </div>
                <button type="submit" disabled={isLoading} className="w-full py-3 rounded-xl font-bold btn-gold disabled:opacity-60 flex items-center justify-center gap-2">
                  {isLoading ? <><div className="w-5 h-5 rounded-full border-2 border-black/30 border-t-black animate-spin" /> Sending...</> : "Send Reset Link"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(34,197,94,0.1)" }}>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Check your email</h2>
              <p className="text-white/50 text-sm">We sent a password reset link to <span className="text-white">{email}</span></p>
            </div>
          )}
          <Link to="/login" className="block text-center mt-6 text-sm text-amber-400 hover:text-amber-300">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

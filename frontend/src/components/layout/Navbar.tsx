import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clapperboard, Menu, X, Film } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg"
              style={{ background: "linear-gradient(135deg, #fbbf24, #d97706)" }}>
              <Clapperboard className="w-5 h-5 text-black" />
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-black tracking-widest text-gold-gradient">IYKE CONTENT STUDIO</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Features", "Studios", "Pricing", "About"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="px-4 py-2 rounded-xl text-sm font-semibold btn-ghost text-white/80">
              Login
            </Link>
            <Link to="/register" className="px-5 py-2 rounded-xl text-sm btn-gold">
              Get Started Free
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/8 transition-all"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden glass rounded-2xl mb-4 p-4 space-y-2">
            {["Features", "Studios", "Pricing", "About"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="block px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/8 transition-all"
                onClick={() => setMobileOpen(false)}>
                {item}
              </a>
            ))}
            <div className="separator-gold my-2" />
            <Link to="/login" className="block px-3 py-2 rounded-lg text-sm text-center btn-ghost" onClick={() => setMobileOpen(false)}>
              Login
            </Link>
            <Link to="/register" className="block px-3 py-2 rounded-xl text-sm text-center btn-gold" onClick={() => setMobileOpen(false)}>
              Get Started Free
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

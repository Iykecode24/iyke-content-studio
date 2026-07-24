import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Bell, Plus, ChevronDown, Cpu, User, Settings, LogOut, Film, Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface TopBarProps {
  pageTitle: string;
  breadcrumb?: string[];
  onMenuToggle?: () => void;
}

export default function TopBar({ pageTitle, breadcrumb, onMenuToggle }: TopBarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <header className="fixed top-0 right-0 left-0 z-20 h-16 flex items-center px-4 gap-4"
      style={{ background: "rgba(10,11,15,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      
      {/* Mobile menu toggle */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden text-white/50 hover:text-white p-1.5 rounded-lg hover:bg-white/8 transition-all"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Breadcrumb / Title */}
      <div className="flex items-center gap-2 min-w-0">
        {breadcrumb && breadcrumb.length > 0 ? (
          <div className="flex items-center gap-1 text-sm">
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <span className="text-white/20">/</span>}
                <span className={i === breadcrumb.length - 1 ? "text-white font-semibold" : "text-white/40"}>
                  {crumb}
                </span>
              </span>
            ))}
          </div>
        ) : (
          <h1 className="text-base font-bold text-white truncate">{pageTitle}</h1>
        )}
      </div>

      {/* Search */}
      <div className="hidden md:flex flex-1 max-w-sm mx-auto relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input
          type="text"
          placeholder="Search projects..."
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none transition-all"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* GPU Status */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium"
          style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
          <Cpu className="w-3.5 h-3.5 text-green-400" />
          <span className="text-green-400">1 GPU Active</span>
        </div>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-white/50 hover:text-white transition-all"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400" />
        </button>

        {/* New Project */}
        <Link to="/studio/movie"
          className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm btn-gold">
          <Plus className="w-4 h-4" />
          New
        </Link>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-white/8 transition-all"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.3), rgba(168,85,247,0.3))", border: "1px solid rgba(255,255,255,0.15)" }}>
              {user?.name?.charAt(0) || "U"}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-white/40 hidden sm:block" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-12 w-52 rounded-xl overflow-hidden shadow-2xl z-50"
              style={{ background: "hsl(220,25%,7%)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="px-4 py-3 border-b border-white/8">
                <p className="text-sm font-semibold text-white">{user?.name}</p>
                <p className="text-xs text-white/40">{user?.email}</p>
              </div>
              <div className="p-1.5 space-y-0.5">
                <button onClick={() => { setShowUserMenu(false); navigate("/admin/settings"); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/8 transition-all">
                  <Settings className="w-4 h-4" /> Settings
                </button>
                <button onClick={() => { setShowUserMenu(false); logout(); navigate("/"); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-all">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

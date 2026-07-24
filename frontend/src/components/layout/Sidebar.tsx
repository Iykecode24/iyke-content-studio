import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Film, Clapperboard, Baby, BookOpen, Newspaper, ImageIcon, Megaphone,
  Users, Mic, FolderOpen, Cpu, Video, CheckSquare, Share2, Link2,
  Settings, ChevronLeft, ChevronRight, LogOut, Crown, Zap, Bell
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
  adminOnly?: boolean;
}

const navSections: NavSection[] = [
  {
    title: "STUDIOS",
    items: [
      { label: "Movie Studio", icon: <Film className="w-4 h-4" />, href: "/studio/movie" },
      { label: "Cartoon Studio", icon: <Baby className="w-4 h-4" />, href: "/studio/cartoon" },
      { label: "Explainer Studio", icon: <BookOpen className="w-4 h-4" />, href: "/studio/explainer" },
      { label: "News Studio", icon: <Newspaper className="w-4 h-4" />, href: "/studio/news" },
      { label: "Image to Video", icon: <ImageIcon className="w-4 h-4" />, href: "/studio/image-to-video" },
      { label: "Ad Studio", icon: <Megaphone className="w-4 h-4" />, href: "/studio/ads" },
    ],
  },
  {
    title: "LIBRARY",
    items: [
      { label: "Character Library", icon: <Users className="w-4 h-4" />, href: "/library/characters" },
      { label: "Voice Library", icon: <Mic className="w-4 h-4" />, href: "/library/voices" },
      { label: "Media Library", icon: <FolderOpen className="w-4 h-4" />, href: "/library/media" },
    ],
  },
  {
    title: "PRODUCTION",
    items: [
      { label: "Render Queue", icon: <Cpu className="w-4 h-4" />, href: "/render/queue", badge: "2" },
      { label: "Video Editor", icon: <Video className="w-4 h-4" />, href: "/editor" },
      { label: "Completed Videos", icon: <CheckSquare className="w-4 h-4" />, href: "/library/media" },
    ],
  },
  {
    title: "PUBLISH",
    items: [
      { label: "Social Publisher", icon: <Share2 className="w-4 h-4" />, href: "/social/publish" },
      { label: "Connected Accounts", icon: <Link2 className="w-4 h-4" />, href: "/social/accounts" },
    ],
  },
  {
    title: "ADMIN",
    adminOnly: true,
    items: [
      { label: "Admin Settings", icon: <Settings className="w-4 h-4" />, href: "/admin/settings" },
    ],
  },
];

const planColors: Record<string, string> = {
  free: "bg-slate-500/20 text-slate-300",
  pro: "bg-blue-500/20 text-blue-300",
  studio: "bg-amber-500/20 text-amber-300",
};

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const { user, logout, isAdmin } = useAuth();

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + "/");

  return (
    <aside
      className="fixed left-0 top-0 h-full flex flex-col z-30 transition-all duration-300"
      style={{ width: isCollapsed ? "72px" : "256px" }}
    >
      <div className="h-full flex flex-col glass border-r border-white/8">
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-white/8">
          <Link to="/dashboard" className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg">
              <Clapperboard className="w-5 h-5 text-black" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="text-xs font-black tracking-widest text-gold-gradient truncate">IYKE</p>
                <p className="text-[9px] font-semibold tracking-wider text-white/40 truncate">CONTENT STUDIO</p>
              </div>
            )}
          </Link>
          <button
            onClick={onToggle}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white hover:bg-white/8 transition-all flex-shrink-0"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* New Project Button */}
        {!isCollapsed && (
          <div className="px-3 py-3">
            <Link
              to="/studio/movie"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl btn-gold text-sm"
            >
              <Film className="w-4 h-4" />
              New Project
            </Link>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-4">
          {navSections.map((section) => {
            if (section.adminOnly && !isAdmin) return null;
            return (
              <div key={section.title}>
                {!isCollapsed && (
                  <p className="px-3 py-1 text-[10px] font-bold tracking-widest text-white/25 uppercase">
                    {section.title}
                  </p>
                )}
                <div className="space-y-0.5">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`sidebar-item ${isActive(item.href) ? "active" : ""} ${isCollapsed ? "justify-center" : ""}`}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                      {!isCollapsed && item.badge && (
                        <span className="ml-auto flex-shrink-0 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300">
                          {item.badge}
                        </span>
                      )}
                      {isCollapsed && item.badge && (
                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400" />
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="border-t border-white/8 p-3">
          {isCollapsed ? (
            <button
              onClick={logout}
              className="w-full flex items-center justify-center p-2 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400/30 to-purple-600/30 border border-white/15 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-white">
                  {user?.name?.charAt(0) || "U"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{user?.name || "User"}</p>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${planColors[user?.plan || "free"]} capitalize`}>
                  {user?.plan || "free"}
                </span>
              </div>
              <button
                onClick={logout}
                className="text-white/30 hover:text-red-400 transition-colors p-1 rounded"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

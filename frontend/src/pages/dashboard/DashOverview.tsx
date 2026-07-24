import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Film, Baby, BookOpen, Newspaper, ImageIcon, Megaphone,
  Plus, Cpu, DollarSign, CheckCircle, Clock, TrendingUp,
  MoreVertical, Eye, Edit, Copy, Trash2, Play, AlertCircle
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useMockProjects, type Project, type ContentType } from "../../store/projectStore";
import { MOCK_JOBS } from "../../store/renderStore";

const typeConfig: Record<ContentType, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  movie: { label: "Movie", color: "text-purple-300", bg: "bg-purple-500/15 border-purple-500/25", icon: <Film className="w-3.5 h-3.5" /> },
  cartoon: { label: "Cartoon", color: "text-pink-300", bg: "bg-pink-500/15 border-pink-500/25", icon: <Baby className="w-3.5 h-3.5" /> },
  explainer: { label: "Explainer", color: "text-blue-300", bg: "bg-blue-500/15 border-blue-500/25", icon: <BookOpen className="w-3.5 h-3.5" /> },
  news: { label: "News", color: "text-cyan-300", bg: "bg-cyan-500/15 border-cyan-500/25", icon: <Newspaper className="w-3.5 h-3.5" /> },
  "image-to-video": { label: "Image-to-Video", color: "text-orange-300", bg: "bg-orange-500/15 border-orange-500/25", icon: <ImageIcon className="w-3.5 h-3.5" /> },
  advertisement: { label: "Ad", color: "text-green-300", bg: "bg-green-500/15 border-green-500/25", icon: <Megaphone className="w-3.5 h-3.5" /> },
};

const statusConfig: Record<string, { label: string; color: string; pulse?: boolean }> = {
  planning: { label: "Planning", color: "badge-planning" },
  scripting: { label: "Scripting", color: "badge-scripting" },
  characters: { label: "Characters", color: "badge-scripting" },
  storyboard: { label: "Storyboard", color: "badge-scripting" },
  voice: { label: "Voice Gen", color: "badge-scripting" },
  scenes: { label: "Scenes", color: "badge-rendering" },
  lipsync: { label: "Lip-Sync", color: "badge-rendering" },
  editing: { label: "Editing", color: "badge-rendering" },
  upscaling: { label: "Upscaling", color: "badge-rendering" },
  rendering: { label: "Rendering", color: "badge-rendering", pulse: true },
  uploading: { label: "Uploading", color: "badge-uploading" },
  completed: { label: "Completed", color: "badge-completed" },
  failed: { label: "Failed", color: "badge-failed" },
  queued: { label: "Queued", color: "badge-queued" },
};

const studioShortcuts = [
  { icon: <Film className="w-6 h-6" />, label: "Movie Studio", href: "/studio/movie", color: "text-purple-400", bg: "rgba(168,85,247,0.1)" },
  { icon: <Baby className="w-6 h-6" />, label: "Cartoon Studio", href: "/studio/cartoon", color: "text-pink-400", bg: "rgba(236,72,153,0.1)" },
  { icon: <BookOpen className="w-6 h-6" />, label: "Explainer", href: "/studio/explainer", color: "text-blue-400", bg: "rgba(59,130,246,0.1)" },
  { icon: <Newspaper className="w-6 h-6" />, label: "News Studio", href: "/studio/news", color: "text-cyan-400", bg: "rgba(6,182,212,0.1)" },
  { icon: <ImageIcon className="w-6 h-6" />, label: "Image-to-Video", href: "/studio/image-to-video", color: "text-orange-400", bg: "rgba(249,115,22,0.1)" },
  { icon: <Megaphone className="w-6 h-6" />, label: "Ad Studio", href: "/studio/ads", color: "text-green-400", bg: "rgba(34,197,94,0.1)" },
];

function ProjectCard({ project }: { project: Project }) {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const t = typeConfig[project.type];
  const s = statusConfig[project.status] || statusConfig.planning;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl overflow-hidden group hover:border-white/20 transition-all duration-300">
      {/* Thumbnail */}
      <div className="h-36 relative flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, hsl(220,25%,8%) 0%, hsl(220,30%,5%) 100%)" }}>
        <div className="text-white/10 group-hover:text-white/20 transition-colors">
          {t.icon && <div className="w-12 h-12">{t.icon}</div>}
          <Film className="w-12 h-12" />
        </div>
        {project.status === "rendering" && (
          <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold badge-rendering animate-pulse">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" /> RENDERING
          </div>
        )}
        {project.status === "completed" && (
          <div className="absolute top-2 right-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
        )}
        {project.duration && (
          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono text-white/70"
            style={{ background: "rgba(0,0,0,0.6)" }}>{project.duration}</div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold text-white truncate">{project.title}</h3>
          <div className="relative flex-shrink-0">
            <button onClick={() => setShowMenu(!showMenu)}
              className="text-white/30 hover:text-white p-1 rounded transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-6 w-40 rounded-xl z-10 overflow-hidden shadow-xl"
                style={{ background: "hsl(220,25%,9%)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-white/70 hover:bg-white/8 transition-all"
                  onClick={() => { setShowMenu(false); navigate("/editor"); }}>
                  <Eye className="w-3.5 h-3.5" /> Preview
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-white/70 hover:bg-white/8 transition-all">
                  <Edit className="w-3.5 h-3.5" /> Edit Script
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-white/70 hover:bg-white/8 transition-all">
                  <Copy className="w-3.5 h-3.5" /> Duplicate
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 transition-all">
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${t.bg} ${t.color}`}>
            {t.icon} {t.label}
          </span>
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${s.color}`}>
            {s.label}
          </span>
        </div>

        {/* Progress */}
        {project.progress > 0 && project.progress < 100 && (
          <div className="mb-3">
            <div className="flex justify-between text-[10px] text-white/40 mb-1">
              <span>Progress</span><span>{project.progress}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${project.progress}%` }} />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-[10px] text-white/35">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(project.createdAt).toLocaleDateString()}</span>
          <span className="flex items-center gap-1">
            <DollarSign className="w-3 h-3" />
            {project.actualCost > 0 ? `$${project.actualCost.toFixed(2)}` : `~$${project.estimatedCost.toFixed(2)}`}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function DashOverview() {
  const { user } = useAuth();
  const { projects } = useMockProjects();
  const activeJobs = MOCK_JOBS.filter(j => ["rendering", "processing_audio", "lip_syncing", "stitching", "upscaling", "uploading"].includes(j.status));
  const totalSpent = projects.reduce((a, p) => a + p.actualCost, 0);
  const completed = projects.filter(p => p.status === "completed").length;
  const rendering = projects.filter(p => p.status === "rendering").length;
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">{greeting}, {user?.name?.split(" ")[0]} 👋</h1>
          <p className="text-white/45 mt-1">{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
        <Link to="/studio/movie" className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl btn-gold text-sm">
          <Plus className="w-4 h-4" /> New Project
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Projects", value: projects.length, icon: <Film className="w-5 h-5" />, color: "text-purple-400", bg: "rgba(168,85,247,0.1)" },
          { label: "Completed", value: completed, icon: <CheckCircle className="w-5 h-5" />, color: "text-green-400", bg: "rgba(34,197,94,0.1)" },
          { label: "Rendering", value: rendering, icon: <Cpu className="w-5 h-5" />, color: "text-amber-400", bg: "rgba(251,191,36,0.1)" },
          { label: "Total Spent", value: `$${totalSpent.toFixed(2)}`, icon: <DollarSign className="w-5 h-5" />, color: "text-cyan-400", bg: "rgba(6,182,212,0.1)" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="glass-card p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: stat.bg }}>
                <span className={stat.color}>{stat.icon}</span>
              </div>
            </div>
            <div className="text-2xl font-black text-white">{stat.value}</div>
            <div className="text-xs text-white/45 mt-0.5">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Create */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Quick Create</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {studioShortcuts.map(s => (
            <Link key={s.label} to={s.href}
              className="glass-card p-4 flex flex-col items-center gap-2 text-center group">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ background: s.bg }}>
                <span className={s.color}>{s.icon}</span>
              </div>
              <span className="text-xs font-semibold text-white/70 group-hover:text-white transition-colors">{s.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Active Renders */}
      {activeJobs.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-amber-400" /> Active Renders
          </h2>
          <div className="space-y-3">
            {activeJobs.map(job => (
              <div key={job.id} className="glass rounded-xl p-4">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div>
                    <span className="text-sm font-semibold text-white">{job.projectTitle}</span>
                    <span className="ml-2 text-xs text-white/40">{job.model} on {job.gpuType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="badge-rendering text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                      {job.status.replace(/_/g, " ").toUpperCase()}
                    </span>
                    <span className="text-xs text-white/50">{job.progress}%</span>
                  </div>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${job.progress}%` }} />
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-white/35">
                  <span>Est. cost: ${job.estimatedCost.toFixed(2)}</span>
                  <Link to="/render/queue" className="text-amber-400 hover:text-amber-300">View Details</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Recent Projects</h2>
          <Link to="/library/media" className="text-sm text-amber-400 hover:text-amber-300 transition-colors">View all</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

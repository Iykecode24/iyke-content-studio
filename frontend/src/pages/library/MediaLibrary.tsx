import { useState } from "react";
import { FolderOpen, Search, Filter, Film, Upload, Grid, List } from "lucide-react";
import { useMockProjects } from "../../store/projectStore";

type MediaType = "all" | "video" | "image" | "audio";

export default function MediaLibrary() {
  const { projects } = useMockProjects();
  const [search, setSearch] = useState("");
  const [mediaType, setMediaType] = useState<MediaType>("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const completed = projects.filter(p => p.status === "completed");
  const FILTERS: MediaType[] = ["all", "video", "image", "audio"];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3">
            <FolderOpen className="w-8 h-8 text-amber-400" /> Media Library
          </h1>
          <p className="text-white/45 text-sm">All rendered videos, images, and audio assets</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl btn-gold text-sm">
          <Upload className="w-4 h-4" /> Upload
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input className="input-studio pl-9" placeholder="Search media..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-1.5">
          {FILTERS.map(t => (
            <button key={t} onClick={() => setMediaType(t)} className={`px-3 py-2 rounded-xl text-sm capitalize font-medium transition-all ${mediaType === t ? "btn-gold" : "btn-ghost text-white/50"}`}>{t}</button>
          ))}
        </div>
        <div className="flex gap-1 glass p-1 rounded-xl">
          <button onClick={() => setView("grid")} className={`p-2 rounded-lg transition-all ${view === "grid" ? "bg-white/15 text-white" : "text-white/30"}`}>
            <Grid className="w-4 h-4" />
          </button>
          <button onClick={() => setView("list")} className={`p-2 rounded-lg transition-all ${view === "list" ? "bg-white/15 text-white" : "text-white/30"}`}>
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {completed.map(p => (
            <div key={p.id} className="glass rounded-2xl overflow-hidden group cursor-pointer hover:border-white/20 transition-all">
              <div className="h-36 flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(220,25%,8%), hsl(220,30%,5%))" }}>
                <Film className="w-10 h-10 text-white/10 group-hover:text-white/20 transition-colors" />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-white truncate mb-1">{p.title}</h3>
                <div className="flex gap-2 text-xs text-white/35 mb-3">
                  <span>{p.type}</span>
                  {p.duration && <><span>·</span><span>{p.duration}</span></>}
                  <span>·</span><span>{p.resolution}</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 rounded-lg text-xs btn-ghost text-white/60">Download</button>
                  <button className="flex-1 py-1.5 rounded-lg text-xs btn-gold">Publish</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {completed.map(p => (
            <div key={p.id} className="glass rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:border-white/20 transition-all">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(168,85,247,0.15)" }}>
                <Film className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-white truncate mb-1">{p.title}</h3>
                <div className="flex gap-2 text-xs text-white/35">
                  <span>{p.type}</span>
                  {p.duration && <><span>·</span><span>{p.duration}</span></>}
                  <span>·</span><span>{p.resolution}</span>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button className="text-xs btn-ghost text-white/60 px-3 py-1.5 rounded-lg">Download</button>
                <button className="text-xs btn-gold px-3 py-1.5 rounded-lg">Publish</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {completed.length === 0 && (
        <div className="glass rounded-2xl p-16 text-center">
          <FolderOpen className="w-16 h-16 text-white/10 mx-auto mb-4" />
          <p className="text-white/40">No completed videos yet. Create your first project!</p>
        </div>
      )}
    </div>
  );
}

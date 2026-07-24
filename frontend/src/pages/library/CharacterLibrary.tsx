import { useState } from "react";
import { Link } from "react-router-dom";
import { Users, Search, Plus, Filter, Edit, Trash2, Eye } from "lucide-react";

const MOCK_CHARS = [
  { id: "1", name: "Alex Carter", desc: "Determined investigator, early 30s", style: "Cinematic Realism", projects: 2, created: "2026-07-20" },
  { id: "2", name: "Amara", desc: "Curious 5-year-old girl who loves learning", style: "Classic 2D Cartoon", projects: 1, created: "2026-07-18" },
  { id: "3", name: "Dr. Jordan Wells", desc: "Tech entrepreneur, brilliant but ruthless", style: "Cinematic Realism", projects: 1, created: "2026-07-22" },
];

export default function CharacterLibrary() {
  const [search, setSearch] = useState("");
  const filtered = MOCK_CHARS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <div><h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3"><Users className="w-8 h-8 text-amber-400" /> Character Library</h1><p className="text-white/45 text-sm">Reusable characters with consistent identity across projects</p></div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl btn-gold text-sm"><Plus className="w-4 h-4" /> New Character</button>
      </div>
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" /><input className="input-studio pl-9" placeholder="Search characters..." value={search} onChange={e => setSearch(e.target.value)} /></div>
        <button className="px-4 py-2.5 rounded-xl btn-ghost text-white/60 flex items-center gap-2 text-sm"><Filter className="w-4 h-4" /> Filter</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(char => (
          <div key={char.id} className="glass-card group">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-black" style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.2), rgba(168,85,247,0.2))", border: "2px solid rgba(255,255,255,0.1)" }}>{char.name[0]}</div>
            <h3 className="text-sm font-bold text-white text-center mb-1">{char.name}</h3>
            <p className="text-xs text-white/45 text-center mb-3 leading-relaxed">{char.desc}</p>
            <div className="flex items-center justify-between text-xs text-white/35 mb-4">
              <span>{char.style}</span><span>{char.projects} project{char.projects !== 1 ? "s" : ""}</span>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-1.5 rounded-lg btn-ghost text-white/60 text-xs flex items-center justify-center gap-1"><Eye className="w-3 h-3" /> View</button>
              <button className="flex-1 py-1.5 rounded-lg btn-ghost text-white/60 text-xs flex items-center justify-center gap-1"><Edit className="w-3 h-3" /> Edit</button>
              <button className="py-1.5 px-2 rounded-lg text-red-400 hover:bg-red-500/10 text-xs transition-all"><Trash2 className="w-3 h-3" /></button>
            </div>
          </div>
        ))}
        <div className="glass rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-3 p-8 min-h-48 hover:border-amber-400/30 transition-colors cursor-pointer" onClick={() => {}}>
          <Plus className="w-8 h-8 text-white/20" />
          <p className="text-sm text-white/40 text-center">Create New Character</p>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Share2, CheckCircle, Send } from "lucide-react";
import { useMockProjects } from "../../store/projectStore";

const PLATFORMS = [
  { id: "youtube", name: "YouTube", icon: "YT", color: "#FF0000", connected: false },
  { id: "instagram", name: "Instagram", icon: "IG", color: "#E1306C", connected: true },
  { id: "tiktok", name: "TikTok", icon: "TK", color: "#000000", connected: false },
  { id: "facebook", name: "Facebook", icon: "FB", color: "#1877F2", connected: false },
  { id: "linkedin", name: "LinkedIn", icon: "LI", color: "#0A66C2", connected: false },
  { id: "twitter", name: "X (Twitter)", icon: "X", color: "#000000", connected: false },
];

export default function SocialPublisher() {
  const { projects } = useMockProjects();
  const completed = projects.filter(p => p.status === "completed");
  const [selectedProject, setSelectedProject] = useState(completed[0]?.id || "");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [publishing, setPublishing] = useState(false);

  const togglePlatform = (id: string) => setSelectedPlatforms(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);

  const handlePublish = async () => {
    if (!selectedProject || selectedPlatforms.length === 0) return;
    setPublishing(true);
    await new Promise(r => setTimeout(r, 2000));
    setPublishing(false);
    alert("Connect social media accounts in the Connected Accounts tab to publish.");
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in space-y-6">
      <div><h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3"><Share2 className="w-8 h-8 text-amber-400" /> Social Publisher</h1><p className="text-white/45 text-sm">Publish completed videos directly to social media platforms</p></div>

      <div className="glass rounded-2xl p-6 space-y-5">
        <div>
          <label className="text-sm font-semibold text-white/70 mb-2 block">Select Video</label>
          <select className="input-studio" value={selectedProject} onChange={e => setSelectedProject(e.target.value)}>
            <option value="">Choose completed project...</option>
            {completed.map(p => <option key={p.id} value={p.id}>{p.title} ({p.duration})</option>)}
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-white/70 mb-3 block">Select Platforms</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {PLATFORMS.map(p => (
              <button key={p.id} onClick={() => togglePlatform(p.id)}
                className={"p-4 rounded-xl border text-center transition-all " + (selectedPlatforms.includes(p.id) ? "border-amber-400/50 bg-amber-500/10" : "border-white/10 hover:border-white/20")}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 text-white text-sm font-black" style={{ background: p.color }}>{p.icon}</div>
                <div className={"text-sm font-semibold " + (selectedPlatforms.includes(p.id) ? "text-amber-400" : "text-white")}>{p.name}</div>
                {!p.connected && <div className="text-[10px] text-white/30 mt-1">Not connected</div>}
                {p.connected && <div className="text-[10px] text-green-400 mt-1 flex items-center justify-center gap-1"><CheckCircle className="w-2.5 h-2.5" /> Connected</div>}
              </button>
            ))}
          </div>
        </div>

        {selectedPlatforms.length > 0 && (
          <div className="space-y-3">
            <div><label className="text-xs text-white/50 mb-1 block">Title</label><input className="input-studio" placeholder="Video title" /></div>
            <div><label className="text-xs text-white/50 mb-1 block">Description</label><textarea rows={3} className="input-studio" placeholder="Add a description..." /></div>
            <div><label className="text-xs text-white/50 mb-1 block">Hashtags</label><input className="input-studio" placeholder="#AIMovie #ShortFilm" /></div>
            <label className="flex items-center gap-2 text-sm text-white/60 cursor-pointer"><input type="checkbox" defaultChecked className="rounded" /> Include AI content disclosure label</label>
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={handlePublish} disabled={!selectedProject || selectedPlatforms.length === 0 || publishing}
            className="flex items-center gap-2 px-6 py-3 rounded-xl btn-gold font-bold disabled:opacity-50">
            {publishing ? <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
            {publishing ? "Publishing..." : "Publish Now"}
          </button>
          <button className="px-6 py-3 rounded-xl btn-ghost text-white/60 font-semibold">Schedule for Later</button>
        </div>
      </div>
    </div>
  );
}

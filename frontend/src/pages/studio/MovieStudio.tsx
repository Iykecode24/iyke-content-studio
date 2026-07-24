import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Film, Upload, User, DollarSign, Cpu, Share2,
  ChevronRight, ChevronLeft, Lock, RefreshCw, Play,
  Plus, AlertTriangle, CheckCircle, Loader2
} from "lucide-react";
import WizardStepper from "../../components/studio/WizardStepper";

const STEPS = ["Concept", "Settings", "Characters", "Generating", "Script", "Scenes", "Voices", "Sound", "Cost", "Render", "Review", "Publish"];

const GENRES = ["Action", "Drama", "Sci-Fi", "Horror", "Comedy", "Romance", "Thriller", "Documentary", "Animation", "Fantasy", "Adventure", "Mystery"];
const DURATIONS = ["30 seconds", "1 minute", "2 minutes", "3 minutes", "5 minutes", "10 minutes", "20 minutes", "Custom"];
const LANGUAGES = ["English", "Spanish", "French", "German", "Portuguese", "Arabic", "Yoruba", "Igbo", "Hausa", "Swahili", "Hindi", "Mandarin"];
const ORIENTATIONS = ["16:9 (Landscape)", "9:16 (Portrait)", "1:1 (Square)"];
const STYLES = ["Cinematic Realism", "Anime", "Stylized 3D", "Documentary", "Watercolor", "Comic Book"];
const RESOLUTIONS = ["720p", "1080p (HD)", "1440p (2K)", "4K"];
const VOICES = ["Rachel - Female, American", "Adam - Male, American", "Dorothy - Female, British", "Josh - Male, American", "Bella - Female, Soft", "Antoni - Male, Warm"];
const MUSIC_GENRES = ["Cinematic Orchestral", "Electronic", "Ambient", "Jazz", "African Rhythms", "Hip-Hop", "Classical", "Pop"];
const PLATFORMS = ["YouTube", "Instagram", "TikTok", "Facebook", "LinkedIn", "X (Twitter)"];

const MOCK_SCENES = [
  { id: "s1", n: 1, title: "Opening - City at Dawn", location: "City streets", time: "Dawn", desc: "We open on a sweeping aerial shot of the city waking up...", status: "draft" },
  { id: "s2", n: 2, title: "Inciting Incident", location: "Corporate tower", time: "Midday", desc: "Alex receives an urgent message that changes everything...", status: "draft" },
  { id: "s3", n: 3, title: "Rising Action", location: "Underground lab", time: "Night", desc: "With time running out, the team assembles their plan...", status: "approved" },
  { id: "s4", n: 4, title: "Confrontation", location: "Rooftop", time: "Dusk", desc: "Face to face with the antagonist, nothing is as expected...", status: "draft" },
  { id: "s5", n: 5, title: "Dark Night of Soul", location: "Safe house", time: "Night", desc: "Alone and doubting, Alex must find the strength to continue...", status: "draft" },
  { id: "s6", n: 6, title: "Revelation", location: "Archive room", time: "Day", desc: "A crucial discovery changes everything we thought we knew...", status: "draft" },
  { id: "s7", n: 7, title: "Climax", location: "Control center", time: "Night", desc: "The final confrontation where everything is at stake...", status: "draft" },
  { id: "s8", n: 8, title: "Resolution", location: "City park", time: "Golden hour", desc: "In the aftermath, new understanding is reached...", status: "draft" },
];

const INPUT = "input-studio";
const SEL = "input-studio";

function StepContent({ step, data, setData, onNext }: { step: number; data: any; setData: any; onNext: () => void }) {
  const [generating, setGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);
  const [genStage, setGenStage] = useState("");

  const GEN_STAGES = ["Analyzing concept...", "Developing story structure...", "Writing character arcs...", "Crafting dialogue...", "Creating scene descriptions...", "Adding camera directions...", "Generating visual prompts...", "Building social package..."];

  if (step === 3) {
    if (!generating && genProgress === 0) {
      setTimeout(() => {
        setGenerating(true);
        let s = 0;
        const iv = setInterval(() => {
          s++;
          setGenProgress(Math.round((s / GEN_STAGES.length) * 100));
          setGenStage(GEN_STAGES[s - 1] || "Finalizing...");
          if (s >= GEN_STAGES.length) {
            clearInterval(iv);
            setTimeout(() => { setGenerating(false); setGenProgress(100); onNext(); }, 600);
          }
        }, 600);
      }, 100);
    }
    return (
      <div className="flex flex-col items-center justify-center min-h-96 text-center">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 relative"
          style={{ background: "rgba(251,191,36,0.1)", border: "2px solid rgba(251,191,36,0.3)" }}>
          <Film className="w-12 h-12 text-amber-400" />
          <div className="absolute inset-0 rounded-full border-2 border-amber-400/30 border-t-amber-400 animate-spin" />
        </div>
        <h2 className="text-2xl font-black text-white mb-2">Generating Your Screenplay</h2>
        <p className="text-white/50 mb-8">Our AI is crafting your complete movie production package...</p>
        <div className="w-80 mb-4">
          <div className="progress-bar mb-2"><div className="progress-fill" style={{ width: `${genProgress}%` }} /></div>
          <div className="text-xs text-white/40">{genProgress}% — {genStage}</div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-white/40 max-w-xs">
          {GEN_STAGES.map((s, i) => (
            <div key={i} className={`flex items-center gap-1.5 ${genProgress > (i / GEN_STAGES.length) * 100 ? "text-green-400" : ""}`}>
              {genProgress > (i / GEN_STAGES.length) * 100 ? <CheckCircle className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-white/20" />}
              {s}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === 9) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 text-center">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 relative"
          style={{ background: "rgba(251,191,36,0.1)", border: "2px solid rgba(251,191,36,0.3)" }}>
          <Cpu className="w-12 h-12 text-amber-400" />
          <div className="absolute inset-0 rounded-full border-2 border-amber-400/30 border-t-amber-400 animate-spin" />
        </div>
        <h2 className="text-2xl font-black text-white mb-2">Rendering Your Movie</h2>
        <p className="text-white/50 mb-8">GPU rendering in progress on RunPod A100 80GB...</p>
        <div className="w-80 mb-6">
          <div className="progress-bar mb-2"><div className="progress-fill" style={{ width: "34%" }} /></div>
          <div className="text-xs text-white/40">34% — Scene 3 of 8 rendering</div>
        </div>
        <div className="glass rounded-xl p-4 w-80 text-left text-xs space-y-2 font-mono text-white/50">
          <div className="text-green-400">[GPU] A100 80GB started successfully</div>
          <div className="text-green-400">[MODEL] WanVideo-14B loaded in 38s</div>
          <div className="text-green-400">[RENDER] Scene 1/8 - completed (720p)</div>
          <div className="text-green-400">[RENDER] Scene 2/8 - completed (720p)</div>
          <div className="text-amber-400 render-active">[RENDER] Scene 3/8 - in progress (34%)...</div>
        </div>
        <div className="glass-gold rounded-xl p-3 mt-4 text-xs text-amber-400/80 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          GPU will automatically stop after all scenes are saved. Current cost: $2.14
        </div>
      </div>
    );
  }

  switch (step) {
    case 0:
      return (
        <div className="space-y-6 max-w-2xl mx-auto">
          <div>
            <label className="text-sm font-semibold text-white/70 mb-2 block">Movie Title *</label>
            <input className={INPUT} placeholder="e.g. The Last Horizon" value={data.title || ""} onChange={e => setData({ ...data, title: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-semibold text-white/70 mb-2 block">Story Idea *</label>
            <textarea rows={5} className={INPUT} placeholder="Describe your story in a few sentences. The AI will develop it into a full screenplay..." value={data.idea || ""} onChange={e => setData({ ...data, idea: e.target.value })} />
            <p className="text-xs text-white/30 mt-1">Min. 20 characters. Be as creative as you want — the AI handles the rest.</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-white/70 mb-2 block">Genre</label>
            <div className="flex flex-wrap gap-2">
              {GENRES.map(g => (
                <button key={g} onClick={() => setData({ ...data, genre: g })}
                  className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${data.genre === g ? "btn-gold" : "btn-ghost text-white/60"}`}>{g}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-white/70 mb-2 block">Target Audience</label>
            <input className={INPUT} placeholder="e.g. Adults 18-35, families, young professionals" value={data.audience || ""} onChange={e => setData({ ...data, audience: e.target.value })} />
          </div>
        </div>
      );
    case 1:
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div>
            <label className="text-sm font-semibold text-white/70 mb-2 block">Duration</label>
            <select className={SEL} value={data.duration || ""} onChange={e => setData({ ...data, duration: e.target.value })}>
              <option value="">Select duration</option>
              {DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-white/70 mb-2 block">Language</label>
            <select className={SEL} value={data.language || "English"} onChange={e => setData({ ...data, language: e.target.value })}>
              {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-white/70 mb-2 block">Video Orientation</label>
            <select className={SEL} value={data.orientation || ""} onChange={e => setData({ ...data, orientation: e.target.value })}>
              {ORIENTATIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-white/70 mb-2 block">Visual Style</label>
            <select className={SEL} value={data.style || ""} onChange={e => setData({ ...data, style: e.target.value })}>
              {STYLES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-white/70 mb-2 block">Time Period / Setting</label>
            <input className={INPUT} placeholder="e.g. Near future 2040, Victorian England, Modern day" value={data.timePeriod || ""} onChange={e => setData({ ...data, timePeriod: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-semibold text-white/70 mb-2 block">Country / Location</label>
            <input className={INPUT} placeholder="e.g. Nigeria, New York, Mars" value={data.location || ""} onChange={e => setData({ ...data, location: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-semibold text-white/70 mb-2 block">Resolution</label>
            <div className="flex gap-2 flex-wrap">
              {RESOLUTIONS.map(r => (
                <button key={r} onClick={() => setData({ ...data, resolution: r })}
                  className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${data.resolution === r ? "btn-gold" : "btn-ghost text-white/60"}`}>{r}</button>
              ))}
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="glass-gold rounded-2xl p-5">
            <h3 className="font-bold text-white mb-1 flex items-center gap-2"><Upload className="w-4 h-4 text-amber-400" /> Upload Main Character Photo</h3>
            <p className="text-sm text-white/50 mb-4">Upload a photo to maintain consistent character identity across all scenes</p>
            <div className="border-2 border-dashed border-white/15 rounded-xl p-8 text-center hover:border-amber-400/40 transition-colors cursor-pointer"
              style={{ background: "rgba(251,191,36,0.03)" }}>
              <User className="w-12 h-12 text-white/20 mx-auto mb-3" />
              <p className="text-sm text-white/50 mb-1">Drop photo here or <span className="text-amber-400">browse</span></p>
              <p className="text-xs text-white/30">PNG, JPG up to 10MB · Front-facing recommended</p>
            </div>
            <label className="flex items-start gap-2 mt-3 text-xs text-white/50 cursor-pointer">
              <input type="checkbox" className="mt-0.5 rounded" />
              <span>I confirm I own this image or have written permission from the person to use their likeness for AI generation. I will not use this for deceptive impersonation.</span>
            </label>
          </div>
          <div>
            <label className="text-sm font-semibold text-white/70 mb-2 block">Number of Main Characters</label>
            <div className="flex gap-2">
              {[1,2,3,4,5,6].map(n => (
                <button key={n} onClick={() => setData({ ...data, numChars: n })}
                  className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${data.numChars === n ? "btn-gold" : "btn-ghost text-white/60"}`}>{n}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-white/70 mb-2 block">Main Character Name</label>
            <input className={INPUT} placeholder="Character name" value={data.charName || ""} onChange={e => setData({ ...data, charName: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-semibold text-white/70 mb-2 block">Voice Preference</label>
              <select className={SEL} value={data.charVoice || ""} onChange={e => setData({ ...data, charVoice: e.target.value })}>
                <option value="">Default / Auto</option>
                <optgroup label="Cloned Voices">
                  <option value="voice_rachel">Rachel (Clone)</option>
                  <option value="voice_adam">Adam (Clone)</option>
                </optgroup>
                <optgroup label="Standard Voices">
                  {VOICES.map(v => <option key={v} value={v}>{v}</option>)}
                </optgroup>
              </select>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="glass rounded-2xl p-5">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-white">Generated Script</h3>
              <button className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 border border-amber-400/30 px-2 py-1 rounded-lg transition-colors">
                <RefreshCw className="w-3 h-3" /> Regenerate
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Logline</label>
                <textarea rows={2} className={INPUT} defaultValue={`When ${data.charName || "Alex"}, a determined investigator, uncovers a conspiracy that reaches the highest levels of power, they must choose between safety and truth in a race against time.`} />
              </div>
              <div>
                <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Synopsis</label>
                <textarea rows={4} className={INPUT} defaultValue={`${data.title || "The Story"} follows ${data.charName || "Alex"} through a gripping ${data.genre || "thriller"} narrative set in ${data.location || "a bustling metropolis"}. When a routine investigation uncovers evidence of systemic corruption, our protagonist is thrust into a world where no one can be trusted and every decision carries life-or-death consequences.`} />
              </div>
              <div>
                <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Characters</label>
                <div className="space-y-2">
                  {["Alex (Protagonist) — Determined investigator, early 30s, driven by justice", "Jordan (Antagonist) — Powerful executive, late 40s, charming but ruthless", "Sam (Ally) — Tech expert, 20s, loyal and brilliant"].map(c => (
                    <div key={c} className="text-sm text-white/70 px-3 py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }}>{c}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case 5:
      return (
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-white/50">{MOCK_SCENES.length} scenes generated · Click a scene to edit</p>
            <button className="flex items-center gap-1.5 text-xs text-amber-400 border border-amber-400/30 px-3 py-1.5 rounded-lg">
              <Plus className="w-3 h-3" /> Add Scene
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_SCENES.map(scene => (
              <div key={scene.id} className={`glass rounded-xl p-4 cursor-pointer transition-all hover:border-amber-400/25 ${scene.status === "approved" ? "border-green-500/25" : ""}`}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-amber-400 text-xs font-bold">Scene {scene.n}</span>
                    <h4 className="text-sm font-semibold text-white">{scene.title}</h4>
                  </div>
                  {scene.status === "approved" && <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />}
                </div>
                <div className="flex gap-2 text-xs text-white/40 mb-2">
                  <span>{scene.location}</span>·<span>{scene.time}</span>
                </div>
                <p className="text-xs text-white/50 leading-relaxed line-clamp-2">{scene.desc}</p>
                <div className="flex gap-2 mt-3">
                  <button className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1"><RefreshCw className="w-3 h-3" />Regen</button>
                  <button className="text-xs text-white/40 hover:text-white flex items-center gap-1"><Lock className="w-3 h-3" />Lock</button>
                  <button className="text-xs text-white/40 hover:text-white flex items-center gap-1"><Play className="w-3 h-3" />Preview</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case 6:
      return (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="glass rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-white/60">Voice generation requires an <span className="text-amber-400 font-semibold">ElevenLabs API key</span>. Configure it in Admin Settings. Sample voices shown below.</p>
          </div>
          {["Alex (Protagonist)", "Jordan (Antagonist)", "Sam (Ally)", "Narrator"].map(char => (
            <div key={char} className="glass rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-white">{char}</h4>
                <button className="text-xs border border-white/15 px-2 py-1 rounded-lg text-white/50 flex items-center gap-1">
                  <Play className="w-3 h-3" /> Test Voice
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <select className={SEL}>
                  {VOICES.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
                <select className={SEL}>
                  {["English", "Spanish", "French", "German"].map(l => <option key={l}>{l}</option>)}
                </select>
                <select className={SEL}>
                  <option>Conversational</option><option>Dramatic</option><option>News</option><option>Narration</option>
                </select>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  Speed: <input type="range" min="0.5" max="2" step="0.1" defaultValue="1" className="flex-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    case 7:
      return (
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <label className="text-sm font-semibold text-white/70 mb-3 block">Background Music Genre</label>
            <div className="flex flex-wrap gap-2">
              {MUSIC_GENRES.map(g => (
                <button key={g} onClick={() => setData({ ...data, music: g })}
                  className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${data.music === g ? "btn-gold" : "btn-ghost text-white/60"}`}>{g}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-white/70 mb-2 block">Music Intensity</label>
            <input type="range" min="1" max="10" defaultValue="6" className="w-full accent-amber-400" />
            <div className="flex justify-between text-xs text-white/30 mt-1"><span>Subtle</span><span>Dramatic</span></div>
          </div>
          <div className="flex items-center justify-between glass rounded-xl p-4">
            <div>
              <div className="text-sm font-semibold text-white">Sound Effects</div>
              <div className="text-xs text-white/50">Ambient sounds, footsteps, city noise, impacts</div>
            </div>
            <div className="w-12 h-6 rounded-full relative cursor-pointer" style={{ background: "rgba(251,191,36,0.3)" }}>
              <div className="w-5 h-5 rounded-full bg-amber-400 absolute right-0.5 top-0.5 shadow" />
            </div>
          </div>
          <div className="flex items-center justify-between glass rounded-xl p-4">
            <div>
              <div className="text-sm font-semibold text-white">AI Narration</div>
              <div className="text-xs text-white/50">Add narrator voice for scene transitions</div>
            </div>
            <div className="w-12 h-6 rounded-full relative cursor-pointer" style={{ background: "rgba(255,255,255,0.1)" }}>
              <div className="w-5 h-5 rounded-full bg-white/40 absolute left-0.5 top-0.5 shadow" />
            </div>
          </div>
        </div>
      );
    case 8:
      return (
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2"><DollarSign className="w-5 h-5 text-amber-400" />Cost Estimate</h3>
            <div className="space-y-3">
              {[
                { label: "GPU Rendering (A100 80GB × ~45min)", min: 4.50, max: 8.00 },
                { label: "ElevenLabs Voice Generation", min: 0.80, max: 1.50 },
                { label: "Image Generation (8 scenes)", min: 0.40, max: 1.20 },
                { label: "Upscaling to 1080p", min: 0.60, max: 1.00 },
                { label: "Cloud Storage (R2)", min: 0.10, max: 0.20 },
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/6 text-sm">
                  <span className="text-white/60">{item.label}</span>
                  <span className="text-white font-medium">${item.min.toFixed(2)} — ${item.max.toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2 text-base font-bold">
                <span className="text-white">Total Estimate</span>
                <span className="text-gold-gradient">$6.40 — $11.90</span>
              </div>
            </div>
            <div className="glass-gold rounded-xl p-3 mt-4 text-xs text-amber-400/80 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>GPU instance will auto-terminate after all rendered files are confirmed saved to cloud storage. You will not be billed for idle time.</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-white/70 mb-2 block">Quality Preset</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[{p:"Draft",c:"$2-4"},{p:"Standard",c:"$5-8"},{p:"High",c:"$8-12"},{p:"Cinematic",c:"$12-20"}].map(q => (
                <button key={q.p} onClick={() => setData({ ...data, quality: q.p })}
                  className={`p-3 rounded-xl text-center transition-all border ${data.quality === q.p ? "border-amber-400/50 bg-amber-500/10" : "border-white/10 hover:border-white/20"}`}>
                  <div className="text-sm font-bold text-white">{q.p}</div>
                  <div className="text-xs text-white/40">{q.c}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="glass rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-white/60">No RunPod API key configured. <span className="text-amber-400">Configure in Admin Settings</span> to start actual rendering. The mock render progress will be shown.</p>
          </div>
        </div>
      );
    case 10:
      return (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="aspect-video rounded-2xl flex items-center justify-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, hsl(220,25%,6%), hsl(220,30%,3%))" }}>
            <div className="text-center">
              <Play className="w-16 h-16 text-white/20 mx-auto mb-3" />
              <p className="text-white/40 text-sm">Preview will appear here after rendering</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 py-3 rounded-xl btn-gold font-bold">Download MP4</button>
            <button className="flex-1 py-3 rounded-xl btn-ghost font-semibold text-white/70">Open in Editor</button>
          </div>
        </div>
      );
    case 11:
      return (
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className="font-bold text-white">Select Publishing Platforms</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {PLATFORMS.map(p => (
              <button key={p} onClick={() => {
                const sel = data.platforms || [];
                setData({ ...data, platforms: sel.includes(p) ? sel.filter((x: string) => x !== p) : [...sel, p] });
              }}
                className={`p-4 rounded-xl border text-center transition-all ${(data.platforms || []).includes(p) ? "border-amber-400/50 bg-amber-500/10" : "border-white/10 hover:border-white/20"}`}>
                <div className="text-sm font-semibold text-white">{p}</div>
              </button>
            ))}
          </div>
          {(data.platforms || []).length > 0 && (
            <div className="glass rounded-xl p-4 space-y-4">
              <div>
                <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Title</label>
                <input className={INPUT} defaultValue={`${data.title || "My Movie"} | Official Short Film`} />
              </div>
              <div>
                <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Description</label>
                <textarea rows={3} className={INPUT} defaultValue="Created with IYKE Content Studio. AI-generated content." />
              </div>
              <div>
                <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Hashtags</label>
                <input className={INPUT} defaultValue="#AIMovie #ShortFilm #IykeContentStudio" />
              </div>
              <label className="flex items-center gap-2 text-sm text-white/60 cursor-pointer">
                <input type="checkbox" defaultChecked /> AI Content Disclosure (Recommended)
              </label>
              <button className="w-full py-3 rounded-xl btn-gold font-bold">Publish Now</button>
            </div>
          )}
        </div>
      );
    default:
      return <div className="text-white/50 text-center py-12">Step {step + 1} content</div>;
  }
}

export default function MovieStudio() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<any>({ genre: "Action", duration: "5 minutes", resolution: "1080p (HD)", quality: "Standard", language: "English", numChars: 2 });
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const canAdvance = () => {
    if (step === 0) return (data.title?.length >= 3) && (data.idea?.length >= 20);
    return true;
  };

  const handleNext = () => {
    if (!canAdvance()) return;
    setCompletedSteps(prev => prev.includes(step) ? prev : [...prev, step]);
    if (step < STEPS.length - 1) setStep(step + 1);
    else navigate("/dashboard");
  };

  const handleBack = () => { if (step > 0) setStep(step - 1); };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3">
          <Film className="w-8 h-8 text-amber-400" /> Movie Studio
        </h1>
        <p className="text-white/45 text-sm">AI-powered full movie production from idea to final render</p>
      </div>

      <WizardStepper steps={STEPS} currentStep={step} completedSteps={completedSteps} />

      <div className="glass rounded-3xl p-6 md:p-8 min-h-96">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
            <h2 className="text-xl font-bold text-white mb-6">{STEPS[step]}</h2>
            <StepContent step={step} data={data} setData={setData} onNext={handleNext} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      {step !== 3 && step !== 9 && (
        <div className="flex justify-between items-center mt-6">
          <button onClick={handleBack} disabled={step === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl btn-ghost text-white/60 disabled:opacity-30 disabled:cursor-not-allowed">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <div className="text-xs text-white/30">Step {step + 1} of {STEPS.length}</div>
          <button onClick={handleNext} disabled={!canAdvance()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl btn-gold disabled:opacity-50 disabled:cursor-not-allowed">
            {step === STEPS.length - 1 ? "Finish" : step === 8 ? "Approve & Render" : "Continue"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

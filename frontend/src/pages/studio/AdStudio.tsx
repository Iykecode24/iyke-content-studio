import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Megaphone, ChevronRight, ChevronLeft } from "lucide-react";
import WizardStepper from "../../components/studio/WizardStepper";

const STEPS = ["Product", "Platform", "Script", "Visuals", "Voice", "Cost", "Render", "Publish"];

const AD_PLATFORMS = [
  { p: "YouTube", fmt: "16:9 Horizontal" },
  { p: "Instagram", fmt: "1:1 Square" },
  { p: "TikTok", fmt: "9:16 Vertical" },
  { p: "Facebook", fmt: "16:9 or 1:1" },
  { p: "LinkedIn", fmt: "16:9 Horizontal" },
  { p: "X (Twitter)", fmt: "16:9 or 1:1" },
];

const DURATIONS = ["15 seconds", "30 seconds", "45 seconds", "60 seconds"];
const TONES = ["Exciting and Energetic", "Premium and Luxurious", "Friendly and Approachable", "Professional and Trustworthy", "Funny and Playful"];

export default function AdStudio() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<any>({ platform: "YouTube", duration: "30 seconds" });
  const [completed, setCompleted] = useState<number[]>([]);
  const next = () => { setCompleted(p => p.includes(step) ? p : [...p, step]); if (step < STEPS.length - 1) setStep(step + 1); else navigate("/dashboard"); };
  const back = () => { if (step > 0) setStep(step - 1); };

  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div className="space-y-5 max-w-2xl mx-auto">
          <div>
            <label className="text-sm font-semibold text-white/70 mb-2 block">Product Name</label>
            <input className="input-studio" placeholder="e.g. SmartGlow Skin Serum" value={data.product || ""} onChange={e => setData({...data, product: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-semibold text-white/70 mb-2 block">Product Description</label>
            <textarea rows={3} className="input-studio" placeholder="What does it do? Who is it for? Key benefits?" value={data.desc || ""} onChange={e => setData({...data, desc: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-semibold text-white/70 mb-2 block">Call to Action</label>
            <input className="input-studio" placeholder='e.g. Shop now at example.com or Download the app' value={data.cta || ""} onChange={e => setData({...data, cta: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-semibold text-white/70 mb-2 block">Ad Tone</label>
            <div className="flex gap-2 flex-wrap">
              {TONES.map(t => (
                <button key={t} onClick={() => setData({...data, tone: t})} className={`px-3 py-1.5 rounded-xl text-sm transition-all ${data.tone === t ? "btn-gold" : "btn-ghost text-white/60"}`}>{t}</button>
              ))}
            </div>
          </div>
        </div>
      );
      case 1: return (
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <label className="text-sm font-semibold text-white/70 mb-3 block">Platform</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {AD_PLATFORMS.map(({p, fmt}) => (
                <button key={p} onClick={() => setData({...data, platform: p})} className={`p-3 rounded-xl border text-center transition-all ${data.platform === p ? "border-amber-400/50 bg-amber-500/10" : "border-white/10 hover:border-white/20"}`}>
                  <div className={`text-sm font-semibold ${data.platform === p ? "text-amber-400" : "text-white"}`}>{p}</div>
                  <div className="text-xs text-white/40 mt-1">{fmt}</div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-white/70 mb-2 block">Ad Duration</label>
            <div className="flex gap-2 flex-wrap">
              {DURATIONS.map(d => (
                <button key={d} onClick={() => setData({...data, duration: d})} className={`px-4 py-2 rounded-xl text-sm transition-all ${data.duration === d ? "btn-gold" : "btn-ghost text-white/60"}`}>{d}</button>
              ))}
            </div>
          </div>
        </div>
      );
      default: return <div className="text-white/50 text-center py-12">Step {step + 1}: {STEPS[step]}</div>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3">
          <Megaphone className="w-8 h-8 text-green-400" /> Ad Studio
        </h1>
        <p className="text-white/45 text-sm">Create platform-optimized AI product advertisements</p>
      </div>
      <WizardStepper steps={STEPS} currentStep={step} completedSteps={completed} />
      <div className="glass rounded-3xl p-6 md:p-8 min-h-96">
        <h2 className="text-xl font-bold text-white mb-6">{STEPS[step]}</h2>
        {renderStep()}
      </div>
      <div className="flex justify-between items-center mt-6">
        <button onClick={back} disabled={step === 0} className="flex items-center gap-2 px-5 py-2.5 rounded-xl btn-ghost text-white/60 disabled:opacity-30">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <span className="text-xs text-white/30">Step {step + 1} of {STEPS.length}</span>
        <button onClick={next} className="flex items-center gap-2 px-5 py-2.5 rounded-xl btn-gold">
          Continue <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, ChevronRight, ChevronLeft } from "lucide-react";
import WizardStepper from "../../components/studio/WizardStepper";

const STEPS = ["Topic", "Settings", "Script", "Visuals", "Narration", "Music", "Cost", "Render", "Publish"];

export default function ExplainerStudio() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<any>({ style: "Whiteboard Animation" });
  const [completed, setCompleted] = useState<number[]>([]);
  const next = () => { setCompleted(p => p.includes(step) ? p : [...p, step]); if (step < STEPS.length - 1) setStep(step + 1); else navigate("/dashboard"); };
  const back = () => { if (step > 0) setStep(step - 1); };

  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div className="space-y-5 max-w-2xl mx-auto">
          <div>
            <label className="text-sm font-semibold text-white/70 mb-2 block">Topic or Title</label>
            <input className="input-studio" placeholder="e.g. How Does Blockchain Work?" value={data.title || ""} onChange={e => setData({...data, title: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-semibold text-white/70 mb-2 block">What to Explain</label>
            <textarea rows={4} className="input-studio" placeholder="Describe the concept you want explained..." value={data.idea || ""} onChange={e => setData({...data, idea: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-semibold text-white/70 mb-2 block">Complexity Level</label>
            <div className="flex gap-2 flex-wrap">
              {["Beginner", "Intermediate", "Advanced", "Expert"].map(l => (
                <button key={l} onClick={() => setData({...data, level: l})} className={`px-4 py-2 rounded-xl text-sm transition-all ${data.level === l ? "btn-gold" : "btn-ghost text-white/60"}`}>{l}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-white/70 mb-2 block">Explainer Style</label>
            <div className="flex gap-2 flex-wrap">
              {["Whiteboard Animation", "2D Motion Graphics", "3D Animation", "Screen Recording", "Character Explainer"].map(s => (
                <button key={s} onClick={() => setData({...data, style: s})} className={`px-3 py-1.5 rounded-xl text-sm transition-all ${data.style === s ? "btn-gold" : "btn-ghost text-white/60"}`}>{s}</button>
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
          <BookOpen className="w-8 h-8 text-blue-400" /> Explainer Studio
        </h1>
        <p className="text-white/45 text-sm">Create professional explainer and tutorial videos</p>
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

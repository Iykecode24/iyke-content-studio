import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Newspaper, ChevronRight, ChevronLeft } from "lucide-react";
import WizardStepper from "../../components/studio/WizardStepper";

const STEPS = ["Topic", "Anchor", "Script", "Background", "Narration", "Render", "Publish"];

export default function NewsStudio() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<any>({ bias: "Neutral" });
  const [completed, setCompleted] = useState<number[]>([]);
  const next = () => { setCompleted(p => p.includes(step) ? p : [...p, step]); if (step < STEPS.length - 1) setStep(step + 1); else navigate("/dashboard"); };
  const back = () => { if (step > 0) setStep(step - 1); };

  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div className="space-y-5 max-w-2xl mx-auto">
          <div>
            <label className="text-sm font-semibold text-white/70 mb-2 block">News Topic or Article URL</label>
            <input className="input-studio" placeholder="Paste article URL or describe the news story..." value={data.topic || ""} onChange={e => setData({...data, topic: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-semibold text-white/70 mb-2 block">Or paste article text</label>
            <textarea rows={5} className="input-studio" placeholder="Paste news article text here..." value={data.article || ""} onChange={e => setData({...data, article: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-semibold text-white/70 mb-2 block">News Category</label>
            <div className="flex gap-2 flex-wrap">
              {["Breaking News", "Politics", "Technology", "Business", "Sports", "Entertainment", "Science", "Health"].map(c => (
                <button key={c} onClick={() => setData({...data, category: c})} className={`px-3 py-1.5 rounded-xl text-sm transition-all ${data.category === c ? "btn-gold" : "btn-ghost text-white/60"}`}>{c}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-white/70 mb-2 block">Editorial Bias</label>
            <div className="flex gap-2">
              {["Neutral", "Slightly Left", "Slightly Right"].map(b => (
                <button key={b} onClick={() => setData({...data, bias: b})} className={`px-3 py-1.5 rounded-xl text-sm transition-all ${data.bias === b ? "btn-gold" : "btn-ghost text-white/60"}`}>{b}</button>
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
          <Newspaper className="w-8 h-8 text-cyan-400" /> News Studio
        </h1>
        <p className="text-white/45 text-sm">Turn news articles into AI anchor-led video summaries</p>
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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Baby, ChevronRight, ChevronLeft, CheckCircle } from "lucide-react";
import WizardStepper from "../../components/studio/WizardStepper";

const STEPS = ["Concept", "Art Style", "Characters", "Settings", "Voices", "Music", "Cost", "Render", "Publish"];
const STYLES = ["Classic 2D Cartoon", "Disney / Pixar 3D", "Japanese Anime", "Flat Vector Animation", "Paper Cut-Out", "Watercolor Hand-Drawn", "African Art Style", "Comic Book"];
const AUDIENCES = ["Ages 2-4 (Toddlers)", "Ages 4-6 (Pre-school)", "Ages 6-8 (Early School)", "Ages 8-12 (Tweens)", "Family (All Ages)"];

export default function CartoonStudio() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<any>({ style: "Classic 2D Cartoon", audience: "Ages 4-6 (Pre-school)", language: "English" });
  const [completed, setCompleted] = useState<number[]>([]);
  const next = () => { setCompleted(p => p.includes(step) ? p : [...p, step]); if (step < STEPS.length - 1) setStep(step + 1); else navigate("/dashboard"); };
  const back = () => { if (step > 0) setStep(step - 1); };

  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div className="space-y-5 max-w-2xl mx-auto">
          <div><label className="text-sm font-semibold text-white/70 mb-2 block">Cartoon Title</label><input className="input-studio" placeholder="e.g. Amara and the Magic Drum" value={data.title || ""} onChange={e => setData({...data, title: e.target.value})} /></div>
          <div><label className="text-sm font-semibold text-white/70 mb-2 block">Story Idea</label><textarea rows={4} className="input-studio" placeholder="What is this cartoon about? What lesson does it teach?" value={data.idea || ""} onChange={e => setData({...data, idea: e.target.value})} /></div>
          <div><label className="text-sm font-semibold text-white/70 mb-2 block">Target Audience</label>
            <div className="flex flex-wrap gap-2">{AUDIENCES.map(a => <button key={a} onClick={() => setData({...data, audience: a})} className={`px-3 py-1.5 rounded-xl text-sm transition-all ${data.audience === a ? "btn-gold" : "btn-ghost text-white/60"}`}>{a}</button>)}</div>
          </div>
          <div><label className="text-sm font-semibold text-white/70 mb-2 block">Educational Theme</label>
            <div className="flex flex-wrap gap-2">{["Sharing", "Counting", "ABCs", "Empathy", "Nature", "Culture", "Science", "Problem Solving"].map(t => <button key={t} onClick={() => setData({...data, theme: t})} className={`px-3 py-1.5 rounded-xl text-sm transition-all ${data.theme === t ? "btn-gold" : "btn-ghost text-white/60"}`}>{t}</button>)}</div>
          </div>
          <div className="glass rounded-xl p-4 flex items-start gap-3"><CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" /><p className="text-xs text-white/50">Child-safe AI filtering is automatically applied. All content will be age-appropriate and free from violence, adult themes, or harmful messaging.</p></div>
        </div>
      );
      case 1: return (
        <div className="max-w-2xl mx-auto space-y-6">
          <div><label className="text-sm font-semibold text-white/70 mb-3 block">Art Style</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{STYLES.map(s => <button key={s} onClick={() => setData({...data, style: s})} className={`p-3 rounded-xl border text-center text-sm transition-all ${data.style === s ? "border-amber-400/50 bg-amber-500/10 text-amber-400" : "border-white/10 text-white/50 hover:border-white/20"}`}>{s}</button>)}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm font-semibold text-white/70 mb-2 block">Color Palette</label><select className="input-studio"><option>Bright and Vibrant</option><option>Pastel Soft</option><option>Earth Tones</option><option>Monochromatic</option></select></div>
            <div><label className="text-sm font-semibold text-white/70 mb-2 block">Animation Speed</label><select className="input-studio"><option>Slow (2-3 fps)</option><option>Medium (12 fps)</option><option>Smooth (24 fps)</option></select></div>
          </div>
        </div>
      );
      default: return <div className="text-white/50 text-center py-12">Step {step + 1}: {STEPS[step]}</div>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="mb-6"><h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3"><Baby className="w-8 h-8 text-pink-400" /> Cartoon Studio</h1><p className="text-white/45 text-sm">Create safe, educational animated cartoons for children</p></div>
      <WizardStepper steps={STEPS} currentStep={step} completedSteps={completed} />
      <div className="glass rounded-3xl p-6 md:p-8 min-h-96">
        <h2 className="text-xl font-bold text-white mb-6">{STEPS[step]}</h2>
        {renderStep()}
      </div>
      <div className="flex justify-between items-center mt-6">
        <button onClick={back} disabled={step === 0} className="flex items-center gap-2 px-5 py-2.5 rounded-xl btn-ghost text-white/60 disabled:opacity-30"><ChevronLeft className="w-4 h-4" /> Back</button>
        <span className="text-xs text-white/30">Step {step + 1} of {STEPS.length}</span>
        <button onClick={next} className="flex items-center gap-2 px-5 py-2.5 rounded-xl btn-gold">Continue <ChevronRight className="w-4 h-4" /></button>
      </div>
    </div>
  );
}

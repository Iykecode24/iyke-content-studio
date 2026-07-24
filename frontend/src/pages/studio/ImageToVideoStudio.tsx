import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImageIcon, ChevronRight, ChevronLeft, Upload } from "lucide-react";
import WizardStepper from "../../components/studio/WizardStepper";

const STEPS = ["Upload", "Motion Style", "Audio", "Duration", "Render", "Publish"];

const MOTION_STYLES = [
  "Subtle pan and zoom",
  "Ken Burns Effect",
  "Dynamic camera",
  "Parallax depth",
  "Static with glow",
  "Timelapse effect",
];

export default function ImageToVideoStudio() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<any>({ motion: "Subtle pan and zoom" });
  const [completed, setCompleted] = useState<number[]>([]);
  const next = () => { setCompleted(p => p.includes(step) ? p : [...p, step]); if (step < STEPS.length - 1) setStep(step + 1); else navigate("/dashboard"); };
  const back = () => { if (step > 0) setStep(step - 1); };

  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div className="max-w-2xl mx-auto space-y-5">
          <div
            className="border-2 border-dashed border-white/15 rounded-2xl p-12 text-center hover:border-amber-400/40 transition-colors cursor-pointer"
            style={{ background: "rgba(251,191,36,0.03)" }}
          >
            <Upload className="w-16 h-16 text-white/15 mx-auto mb-4" />
            <p className="text-white/60 text-sm mb-2">Drop images or video here</p>
            <p className="text-white/30 text-xs">PNG, JPG, MP4, MOV up to 100MB</p>
            <button className="mt-4 px-5 py-2 rounded-xl btn-gold text-sm">Browse Files</button>
          </div>
          <div>
            <label className="text-sm font-semibold text-white/70 mb-2 block">Caption / Overlay Text (optional)</label>
            <input className="input-studio" placeholder="Text to overlay on video..." value={data.caption || ""} onChange={e => setData({...data, caption: e.target.value})} />
          </div>
        </div>
      );
      case 1: return (
        <div className="max-w-2xl mx-auto space-y-5">
          <div>
            <label className="text-sm font-semibold text-white/70 mb-3 block">Motion Style</label>
            <div className="grid grid-cols-2 gap-3">
              {MOTION_STYLES.map(m => (
                <button
                  key={m}
                  onClick={() => setData({...data, motion: m})}
                  className={`p-3 rounded-xl border text-sm text-center transition-all ${data.motion === m ? "border-amber-400/50 bg-amber-500/10 text-amber-400" : "border-white/10 text-white/50 hover:border-white/20"}`}
                >
                  {m}
                </button>
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
          <ImageIcon className="w-8 h-8 text-orange-400" /> Image to Video Studio
        </h1>
        <p className="text-white/45 text-sm">Animate photos and images with AI motion and voice</p>
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

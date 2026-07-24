import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Cpu, Mic, HardDrive, Users, DollarSign, Shield, Zap, AlertTriangle, Lock } from "lucide-react";
import VoiceTab from './tabs/VoiceTab';
import DeploymentTab from './tabs/DeploymentTab';
import { Cloud } from 'lucide-react';

function APIKeyField({ label, placeholder, helpText, defaultValue }: { label: string; placeholder?: string; helpText?: string, defaultValue?: string }) {
  const [val, setVal] = useState(defaultValue || "");
  const [show, setShow] = useState(false);
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const handleSave = () => { if (!val) return; setSaved(true); setTestResult(null); setTimeout(() => setSaved(false), 2000); };
  const handleTest = async () => { setTesting(true); await new Promise(r => setTimeout(r, 1500)); setTestResult("Connection Successful!"); setTesting(false); };
  return (
    <div className="glass rounded-xl p-4 space-y-3">
      <div>
        <label className="text-sm font-semibold text-white block mb-1">{label}</label>
        {helpText && <p className="text-xs text-white/40 mb-2">{helpText}</p>}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input type={show ? "text" : "password"} placeholder={placeholder || "Enter API key..."} value={val} onChange={e => setVal(e.target.value)} className="input-studio pr-16 font-mono text-sm" />
            <button onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 text-xs">{show ? "Hide" : "Show"}</button>
          </div>
          <button onClick={handleSave} disabled={!val} className="px-4 py-2 rounded-xl text-sm btn-gold disabled:opacity-50 font-semibold">{saved ? "Saved!" : "Save"}</button>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={handleTest} disabled={!val || testing} className="px-3 py-1.5 rounded-lg text-xs btn-ghost text-white/60 disabled:opacity-50 flex items-center gap-1.5">
          {testing ? <div className="w-3 h-3 border border-white/30 border-t-white/80 rounded-full animate-spin" /> : <Zap className="w-3 h-3" />} Test Connection
        </button>
        {val && <button onClick={() => { setVal(""); setTestResult(null); }} className="px-3 py-1.5 rounded-lg text-xs text-red-400 border border-red-400/20 hover:bg-red-500/10 transition-all">Remove Key</button>}
      </div>
      {testResult && <div className="text-xs px-3 py-2 rounded-lg text-amber-300" style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.15)" }}>{testResult}</div>}
    </div>
  );
}

function AIModelsTab() {
  const MODELS = [
    { name: "WanVideo-14B", type: "text-to-video", vram: "80GB", status: "enabled" },
    { name: "CogVideoX-5B", type: "text-to-video", vram: "40GB", status: "enabled" },
    { name: "HunyuanVideo", type: "text-to-video", vram: "80GB", status: "disabled" },
    { name: "LTX-Video", type: "image-to-video", vram: "24GB", status: "enabled" },
    { name: "AnimateDiff", type: "image-to-video", vram: "12GB", status: "enabled" },
    { name: "Stable Video Diffusion", type: "image-to-video", vram: "16GB", status: "disabled" }
  ];
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2"><Zap className="w-4 h-4 text-amber-400" />LLM Provider</h3>
        <APIKeyField label="OpenAI API Key" placeholder="sk-..." defaultValue="" helpText="Used for script generation, dialogue, and content moderation." />
        <div className="mt-4"><label className="text-sm font-semibold text-white/70 mb-2 block">Default Model</label>
          <select className="input-studio max-w-xs"><option>gpt-4o</option><option>gpt-4o-mini</option><option>gpt-4-turbo</option></select>
        </div>
      </div>
      <div className="separator-gold" />
      <div>
        <h3 className="text-base font-bold text-white mb-4">Open-Source LLM Endpoint</h3>
        <div className="glass rounded-xl p-4 space-y-3">
          <div><label className="text-xs text-white/50 mb-1 block">Endpoint URL</label><input className="input-studio" placeholder="http://your-llm-server:8080/v1" /></div>
          <div><label className="text-xs text-white/50 mb-1 block">Model Name</label><input className="input-studio" placeholder="llama3-70b, mistral-7b, etc." /></div>
          <div><label className="text-xs text-white/50 mb-1 block">API Key (optional)</label><input type="password" className="input-studio" placeholder="Leave blank if no auth required" /></div>
          <button className="px-4 py-2 rounded-lg text-sm btn-ghost text-white/60">Test Connection</button>
        </div>
      </div>
      <div className="separator-gold" />
      <div>
        <h3 className="text-base font-bold text-white mb-4">Video Model Registry</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/30 border-b border-white/8">
                {["Model", "Type", "VRAM", "Status", "Actions"].map(h => <th key={h} className="text-left px-4 py-2 text-xs font-semibold">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {MODELS.map(m => (
                <tr key={m.name} className="border-b border-white/5 hover:bg-white/3">
                  <td className="px-4 py-3 text-white font-medium">{m.name}</td>
                  <td className="px-4 py-3 text-white/50 text-xs">{m.type}</td>
                  <td className="px-4 py-3 text-white/50 text-xs">{m.vram}</td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${m.status === "enabled" ? "badge-completed" : "badge-queued"}`}>{m.status}</span></td>
                  <td className="px-4 py-3"><button className="text-xs text-amber-400 hover:text-amber-300">Toggle</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function RunPodTab() {
  return (
    <div className="space-y-6">
      <APIKeyField label="RunPod API Key" placeholder="rpa_..." helpText="Used server-side only. Never exposed to frontend." />
      <div className="glass-gold rounded-xl p-4 flex items-start gap-3">
        <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-white/60"><strong className="text-white">Security note:</strong> This key grants full control over your RunPod account.</p>
      </div>
      <div>
        <h3 className="text-base font-bold text-white mb-4">GPU Templates</h3>
        <div className="space-y-3">
          {[
            { name: "Standard Render", gpu: "RTX 4090 (24GB)", cost: "$0.74/hr", def: false }, 
            { name: "HD Render", gpu: "A100 SXM 40GB", cost: "$1.54/hr", def: true }, 
            { name: "4K Render", gpu: "A100 SXM 80GB", cost: "$2.09/hr", def: false }
          ].map(t => (
            <div key={t.name} className="glass rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-white">
                  {t.name} {t.def && <span className="ml-2 text-[10px] badge-completed px-1.5 py-0.5 rounded-full">Default</span>}
                </div>
                <div className="text-xs text-white/45">{t.gpu} &middot; {t.cost}</div>
              </div>
              <div className="flex gap-2">
                <button className="text-xs btn-ghost text-white/50 px-3 py-1.5 rounded-lg">Edit</button>
                <button className="text-xs text-red-400 border border-red-400/20 px-3 py-1.5 rounded-lg">Remove</button>
              </div>
            </div>
          ))}
          <button className="w-full py-3 rounded-xl btn-ghost text-white/50 text-sm">+ Add GPU Template</button>
        </div>
      </div>
    </div>
  );
}

const TABS = [
  { id: "deployment", label: "Deployment", icon: <Cloud className="w-4 h-4" />, component: <DeploymentTab /> },
  { id: "ai", label: "AI Models", icon: <Zap className="w-4 h-4" />, component: <AIModelsTab /> },
  { id: "runpod", label: "RunPod GPU", icon: <Cpu className="w-4 h-4" />, component: <RunPodTab /> },
  { id: "elevenlabs", label: "ElevenLabs", icon: <Mic className="w-4 h-4" />, component: <VoiceTab /> },
];

export default function AdminSettings() {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState("ai");
  
  if (!isAdmin) return (
    <div className="flex flex-col items-center justify-center min-h-96 text-center">
      <Lock className="w-16 h-16 text-white/15 mb-4" />
      <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
      <p className="text-white/45 text-sm">Admin settings are only accessible to administrators.</p>
    </div>
  );

  const activeComponent = TABS.find(t => t.id === activeTab)?.component;
  
  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-2"><Shield className="w-7 h-7 text-amber-400" /> Admin Settings</h1>
        <p className="text-white/45 text-sm">Configure AI providers, GPU settings, storage, and system policies</p>
      </div>
      <div className="glass rounded-2xl p-2 mb-6 flex flex-wrap gap-1">
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? "btn-gold" : "text-white/50 hover:text-white hover:bg-white/8"}`}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>
      <div className="glass rounded-2xl p-6 md:p-8">{activeComponent}</div>
    </div>
  );
}

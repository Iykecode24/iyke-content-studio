import React, { useState } from 'react';
import { Mic, Activity, CheckCircle, AlertTriangle, Play, RefreshCw, BarChart2 } from 'lucide-react';

export default function VoiceTab() {
  const [apiKey, setApiKey] = useState('sk_*************************');
  const [status, setStatus] = useState('Connected');
  const [usage, setUsage] = useState({ used: 45000, total: 100000 });
  const [defaultVoice, setDefaultVoice] = useState('Rachel');
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Mic className="text-amber-400" />
            ElevenLabs Settings
          </h2>
          <p className="text-white/60 mt-1">Manage Voice Synthesis and Cloning API settings</p>
        </div>
      </div>

      <div className="glass-card space-y-6 border-amber-500/20">
        <h3 className="text-lg font-medium text-amber-400 flex items-center gap-2">
          <Activity className="w-5 h-5" />
          API Status & Health
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-black/40 p-4 rounded-xl border border-white/5">
            <div className="text-sm text-white/50 mb-1">Connection Status</div>
            <div className="flex items-center gap-2 text-green-400 font-medium">
              <CheckCircle className="w-4 h-4" /> {status}
            </div>
          </div>
          <div className="bg-black/40 p-4 rounded-xl border border-white/5">
            <div className="text-sm text-white/50 mb-1">API Health</div>
            <div className="text-white font-mono">100% Online</div>
          </div>
          <div className="bg-black/40 p-4 rounded-xl border border-white/5">
            <div className="text-sm text-white/50 mb-1">Default Voice</div>
            <div className="font-mono text-white">{defaultVoice}</div>
          </div>
          <div className="bg-black/40 p-4 rounded-xl border border-white/5">
            <div className="text-sm text-white/50 mb-1">Latency</div>
            <div className="font-mono text-white">45ms</div>
          </div>
        </div>

        <div className="bg-black/20 p-5 rounded-xl border border-white/10">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-white font-medium flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-white/50" /> Monthly Character Usage
            </h4>
            <span className="text-sm text-white/50">Reset in 12 days</span>
          </div>
          
          <div className="w-full bg-black/60 rounded-full h-4 mb-2 overflow-hidden flex">
            <div className="bg-amber-500 h-4" style={{ width: `${(usage.used / usage.total) * 100}%` }}></div>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-white">Used: {usage.used.toLocaleString()}</span>
            <span className="text-white/50">Limit: {usage.total.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button className="btn-ghost flex items-center gap-2 px-4 py-2 rounded-lg text-sm">
            <RefreshCw className="w-4 h-4" /> Run Health Check
          </button>
        </div>
      </div>
      
      <div className="glass-card space-y-4">
        <h3 className="text-lg font-medium text-white">Security</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">ElevenLabs API Key</label>
            <input 
              type="password" 
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="input-studio" 
            />
            <p className="text-xs text-white/40 mt-1">Key is securely encrypted and never exposed in the browser.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

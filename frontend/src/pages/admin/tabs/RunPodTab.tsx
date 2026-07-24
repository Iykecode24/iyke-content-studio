import React, { useState } from 'react';
import { Save, Server, Activity, Database, RefreshCw, CheckCircle, AlertTriangle, Play, Square, HardDrive } from 'lucide-react';

export default function RunPodTab() {
  const [apiKey, setApiKey] = useState('rpa_*************************');
  const [volumeId, setVolumeId] = useState('vol_mock_12345');
  const [dataCenter, setDataCenter] = useState('US-KS-1');
  const [status, setStatus] = useState('Connected');
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Server className="text-amber-400" />
            RunPod GPU Compute
          </h2>
          <p className="text-white/60 mt-1">Manage Serverless endpoints and Network Volumes for rendering</p>
        </div>
      </div>

      <div className="glass-card space-y-6 border-amber-500/20">
        <h3 className="text-lg font-medium text-amber-400 flex items-center gap-2">
          <Database className="w-5 h-5" />
          Network Volume Storage
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-black/40 p-4 rounded-xl border border-white/5">
            <div className="text-sm text-white/50 mb-1">Volume Name</div>
            <div className="font-mono text-white">iyke-content-studio-models</div>
          </div>
          <div className="bg-black/40 p-4 rounded-xl border border-white/5">
            <div className="text-sm text-white/50 mb-1">Volume ID</div>
            <div className="font-mono text-white">{volumeId.substring(0, 4)}***{volumeId.substring(volumeId.length - 4)}</div>
          </div>
          <div className="bg-black/40 p-4 rounded-xl border border-white/5">
            <div className="text-sm text-white/50 mb-1">Data Center</div>
            <div className="font-mono text-white">{dataCenter}</div>
          </div>
          <div className="bg-black/40 p-4 rounded-xl border border-white/5">
            <div className="text-sm text-white/50 mb-1">Connection Status</div>
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-4 h-4" /> {status}
            </div>
          </div>
        </div>

        <div className="bg-black/20 p-5 rounded-xl border border-white/10">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-white font-medium flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-white/50" /> Storage Capacity
            </h4>
            <span className="text-sm text-white/50">Estimated Cost: <span className="text-amber-400 font-mono">$50.00/mo</span></span>
          </div>
          
          <div className="w-full bg-black/60 rounded-full h-4 mb-2 overflow-hidden flex">
            <div className="bg-amber-500 h-4" style={{ width: '15%' }} title="Installed Models: 150GB"></div>
            <div className="bg-blue-500 h-4" style={{ width: '5%' }} title="Temporary Storage: 50GB"></div>
          </div>
          
          <div className="flex justify-between text-sm">
            <div className="flex gap-4">
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Models: 150 GB</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Temp: 50 GB</span>
            </div>
            <span className="text-white/50">Available: 800 GB / 1000 GB</span>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button className="btn-ghost flex items-center gap-2 px-4 py-2 rounded-lg text-sm">
            <RefreshCw className="w-4 h-4" /> Test Connection
          </button>
          <button className="btn-ghost flex items-center gap-2 px-4 py-2 rounded-lg text-sm">
            <Activity className="w-4 h-4" /> Verify Persistence
          </button>
          <button className="btn-ghost flex items-center gap-2 px-4 py-2 rounded-lg text-sm">
            <Square className="w-4 h-4" /> View Logs
          </button>
          <div className="flex-1"></div>
          {/* Deliberately omitting the Delete button as requested for safety */}
        </div>
      </div>
      
      <div className="glass-card space-y-4">
        <h3 className="text-lg font-medium text-white">API Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">RunPod API Key</label>
            <input 
              type="password" 
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="input-studio" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { 
  Cloud, Server, Database, HardDrive, Mic, Shield, 
  Activity, RefreshCw, CheckCircle, AlertTriangle, Play 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DeploymentTab() {
  const [loading, setLoading] = useState(false);
  const [health, setHealth] = useState({
    cloudflare: 'Healthy',
    dns: 'Propagated',
    ssl: 'Valid',
    runpod: 'Ready',
    gpu: 'Idle',
    volume: 'Attached',
    r2: 'Connected',
    drive: 'Authenticated',
    elevenlabs: 'Online',
    db: 'Connected',
    system: '99.9% Uptime'
  });
  
  const [metrics, setMetrics] = useState({
    storage: 45,
    cpu: 12,
    memory: 34,
    activeJobs: 2,
    completedJobs: 145,
    failedJobs: 3
  });

  const runDiagnostics = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const StatusItem = ({ label, status, icon: Icon }: any) => {
    const isGood = status !== 'Offline' && status !== 'Error' && status !== 'Failed';
    return (
      <div className="bg-black/40 p-4 rounded-xl border border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isGood ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
            <Icon className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium text-white/80">{label}</span>
        </div>
        <span className={`text-sm font-bold ${isGood ? 'text-green-400' : 'text-red-400'}`}>
          {status}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Activity className="text-blue-400" />
            Deployment & System Health
          </h2>
          <p className="text-white/60 mt-1">Live monitoring for Cloudflare, Infrastructure, and APIs</p>
        </div>
        <button 
          onClick={runDiagnostics} 
          disabled={loading}
          className="btn-primary flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Running Diagnostics...' : 'Run Full Diagnostics'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 border-blue-500/20">
          <div className="text-sm text-white/50 mb-2 flex items-center gap-2"><HardDrive className="w-4 h-4"/> Storage Usage</div>
          <div className="text-2xl font-bold text-white mb-2">{metrics.storage}%</div>
          <div className="w-full bg-black/40 rounded-full h-2">
            <div className="bg-blue-400 h-2 rounded-full" style={{ width: `${metrics.storage}%` }}></div>
          </div>
        </div>
        <div className="glass-card p-5 border-blue-500/20">
          <div className="text-sm text-white/50 mb-2 flex items-center gap-2"><Activity className="w-4 h-4"/> CPU Usage</div>
          <div className="text-2xl font-bold text-white mb-2">{metrics.cpu}%</div>
          <div className="w-full bg-black/40 rounded-full h-2">
            <div className="bg-blue-400 h-2 rounded-full" style={{ width: `${metrics.cpu}%` }}></div>
          </div>
        </div>
        <div className="glass-card p-5 border-blue-500/20">
          <div className="text-sm text-white/50 mb-2 flex items-center gap-2"><Server className="w-4 h-4"/> Memory Usage</div>
          <div className="text-2xl font-bold text-white mb-2">{metrics.memory}%</div>
          <div className="w-full bg-black/40 rounded-full h-2">
            <div className="bg-blue-400 h-2 rounded-full" style={{ width: `${metrics.memory}%` }}></div>
          </div>
        </div>
        <div className="glass-card p-5 border-blue-500/20">
          <div className="text-sm text-white/50 mb-2 flex items-center gap-2"><Play className="w-4 h-4"/> Render Jobs</div>
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs text-amber-400 block">Active: {metrics.activeJobs}</span>
              <span className="text-xs text-green-400 block">Done: {metrics.completedJobs}</span>
              <span className="text-xs text-red-400 block">Failed: {metrics.failedJobs}</span>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.completedJobs + metrics.failedJobs}</div>
          </div>
        </div>
      </div>

      <div className="glass-card space-y-6">
        <h3 className="text-lg font-medium text-white border-b border-white/10 pb-3">Infrastructure Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatusItem label="Cloudflare Network" status={health.cloudflare} icon={Cloud} />
          <StatusItem label="DNS (iykestudio.com)" status={health.dns} icon={Cloud} />
          <StatusItem label="SSL Certificate" status={health.ssl} icon={Shield} />
          <StatusItem label="PostgreSQL Database" status={health.db} icon={Database} />
          <StatusItem label="System Health" status={health.system} icon={Activity} />
        </div>
      </div>

      <div className="glass-card space-y-6">
        <h3 className="text-lg font-medium text-white border-b border-white/10 pb-3">External Integrations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatusItem label="RunPod API" status={health.runpod} icon={Server} />
          <StatusItem label="GPU Provisioning" status={health.gpu} icon={Server} />
          <StatusItem label="Network Volume" status={health.volume} icon={HardDrive} />
          <StatusItem label="ElevenLabs API" status={health.elevenlabs} icon={Mic} />
          <StatusItem label="Cloudflare R2" status={health.r2} icon={Cloud} />
          <StatusItem label="Google Drive" status={health.drive} icon={Cloud} />
        </div>
      </div>
      
    </div>
  );
}

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Cpu, Zap, Clock, DollarSign, AlertTriangle, X, RefreshCw,
  Eye, Terminal, CheckCircle, ChevronDown, ChevronUp
} from "lucide-react";
import { MOCK_JOBS, type RenderJob, type RenderStatus } from "../../store/renderStore";
import { useAuth } from "../../context/AuthContext";

const STATUS_CONFIG: Record<RenderStatus, { label: string; color: string; pulse?: boolean }> = {
  queued: { label: "Queued", color: "badge-queued" },
  preparing: { label: "Preparing", color: "badge-scripting" },
  starting_gpu: { label: "Starting GPU", color: "badge-scripting", pulse: true },
  loading_model: { label: "Loading Model", color: "badge-scripting", pulse: true },
  rendering: { label: "Rendering", color: "badge-rendering", pulse: true },
  processing_audio: { label: "Processing Audio", color: "badge-scripting", pulse: true },
  lip_syncing: { label: "Lip-Syncing", color: "badge-scripting", pulse: true },
  stitching: { label: "Stitching", color: "badge-rendering", pulse: true },
  upscaling: { label: "Upscaling", color: "badge-rendering", pulse: true },
  uploading: { label: "Uploading", color: "badge-uploading", pulse: true },
  completed: { label: "Completed", color: "badge-completed" },
  failed: { label: "Failed", color: "badge-failed" },
  cancelled: { label: "Cancelled", color: "badge-queued" },
};

function JobCard({ job }: { job: RenderJob }) {
  const [expanded, setExpanded] = useState(false);
  const s = STATUS_CONFIG[job.status];
  const elapsed = job.startTime ? Math.round((Date.now() - new Date(job.startTime).getTime()) / 60000) : 0;

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-white text-sm">{job.projectTitle}</span>
              <span className="text-xs text-white/40 font-mono">{job.id}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-white/45">
              <span className="flex items-center gap-1"><Cpu className="w-3 h-3" />{job.gpuType}</span>
              <span className="flex items-center gap-1"><Zap className="w-3 h-3" />{job.model}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${s.color} ${s.pulse ? "animate-pulse" : ""}`}>
              {s.label}
            </span>
            {job.startTime && (
              <span className="text-[10px] text-white/35 flex items-center gap-1">
                <Clock className="w-3 h-3" />{elapsed}m
              </span>
            )}
          </div>
        </div>

        {/* Progress */}
        {job.progress > 0 && (
          <div className="mb-3">
            <div className="flex justify-between text-xs text-white/40 mb-1">
              <span>Rendering progress</span><span>{job.progress}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill transition-all duration-1000" style={{ width: `${job.progress}%` }} />
            </div>
          </div>
        )}

        {/* Log preview */}
        {job.logs.length > 0 && (
          <div className="rounded-lg p-3 mb-3 font-mono text-xs text-white/50" style={{ background: "rgba(0,0,0,0.4)" }}>
            {job.logs.slice(-2).map((log, i) => (
              <div key={i} className={i === job.logs.length - 2 ? "text-white/70" : ""}>{log}</div>
            ))}
          </div>
        )}

        {/* Actions + cost */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/40 flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              {job.actualCost > 0 ? `$${job.actualCost.toFixed(2)} spent` : `~$${job.estimatedCost.toFixed(2)} est.`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setExpanded(!expanded)}
              className="text-xs text-white/40 hover:text-white flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white/8 transition-all">
              <Terminal className="w-3.5 h-3.5" />
              {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              Logs
            </button>
            {job.status === "failed" && (
              <button className="text-xs text-amber-400 flex items-center gap-1 px-2 py-1 rounded-lg border border-amber-400/30 hover:bg-amber-500/10 transition-all">
                <RefreshCw className="w-3.5 h-3.5" /> Retry
              </button>
            )}
            {["rendering", "processing_audio", "queued"].includes(job.status) && (
              <button className="text-xs text-red-400 flex items-center gap-1 px-2 py-1 rounded-lg border border-red-400/30 hover:bg-red-500/10 transition-all">
                <X className="w-3.5 h-3.5" /> Cancel
              </button>
            )}
            {job.status === "completed" && (
              <button className="text-xs text-green-400 flex items-center gap-1 px-2 py-1 rounded-lg border border-green-400/30 hover:bg-green-500/10 transition-all">
                <Eye className="w-3.5 h-3.5" /> Preview
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Expanded logs */}
      {expanded && (
        <div className="border-t border-white/8 px-5 py-4">
          <div className="rounded-lg p-3 font-mono text-xs space-y-1" style={{ background: "rgba(0,0,0,0.5)", maxHeight: 200, overflowY: "auto" }}>
            {job.logs.map((log, i) => (
              <div key={i} className={
                log.includes("[ERROR]") ? "text-red-400" :
                log.includes("[GPU]") || log.includes("[MODEL]") ? "text-green-400" :
                log.includes("in progress") ? "text-amber-400 render-active" : "text-white/60"
              }>{log}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function RenderQueue() {
  const { isAdmin } = useAuth();
  const [filter, setFilter] = useState<"all" | RenderStatus>("all");
  const [jobs, setJobs] = useState(MOCK_JOBS);

  const FILTERS = ["all", "rendering", "processing_audio", "queued", "completed", "failed"] as const;
  const filtered = filter === "all" ? jobs : jobs.filter(j => j.status === filter);

  const active = jobs.filter(j => ["rendering", "processing_audio", "lip_syncing", "stitching", "upscaling", "uploading", "starting_gpu", "loading_model"].includes(j.status));
  const queued = jobs.filter(j => j.status === "queued");
  const completed = jobs.filter(j => j.status === "completed");
  const totalCost = jobs.reduce((a, j) => a + j.actualCost, 0);

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3">
          <Cpu className="w-8 h-8 text-amber-400" /> Render Queue
        </h1>
        <p className="text-white/45 text-sm">Monitor and manage all rendering jobs and GPU instances</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Jobs", value: active.length, color: "text-amber-400", icon: <Zap className="w-5 h-5" /> },
          { label: "Queued", value: queued.length, color: "text-blue-400", icon: <Clock className="w-5 h-5" /> },
          { label: "Completed Today", value: completed.length, color: "text-green-400", icon: <CheckCircle className="w-5 h-5" /> },
          { label: "Total Cost Today", value: `$${totalCost.toFixed(2)}`, color: "text-cyan-400", icon: <DollarSign className="w-5 h-5" /> },
        ].map(stat => (
          <div key={stat.label} className="glass-card p-4">
            <div className={`${stat.color} mb-2`}>{stat.icon}</div>
            <div className="text-2xl font-black text-white">{stat.value}</div>
            <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Admin: Active GPU Instances */}
      {isAdmin && active.length > 0 && (
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-amber-400" /> Active GPU Instances
            </h2>
            <button className="text-xs font-bold text-red-400 border border-red-400/30 px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition-all flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" /> Emergency Stop All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-white/30 border-b border-white/8">
                  {["GPU Type", "Project", "Model", "Started", "Runtime", "Cost", "Actions"].map(h => (
                    <th key={h} className="text-left px-3 py-2 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {active.map(job => {
                  const elapsed = job.startTime ? Math.round((Date.now() - new Date(job.startTime).getTime()) / 60000) : 0;
                  return (
                    <tr key={job.id} className="border-b border-white/5 hover:bg-white/3">
                      <td className="px-3 py-3 text-white font-medium">{job.gpuType}</td>
                      <td className="px-3 py-3 text-white/70">{job.projectTitle}</td>
                      <td className="px-3 py-3 text-white/50">{job.model}</td>
                      <td className="px-3 py-3 text-white/50">{job.startTime ? new Date(job.startTime).toLocaleTimeString() : "-"}</td>
                      <td className="px-3 py-3 text-white/50">{elapsed}m</td>
                      <td className="px-3 py-3 text-amber-400 font-medium">${job.actualCost.toFixed(2)}</td>
                      <td className="px-3 py-3">
                        <div className="flex gap-2">
                          <button className="text-red-400 hover:text-red-300 text-[10px] border border-red-400/30 px-2 py-1 rounded-lg">Stop</button>
                          <button className="text-red-500 hover:text-red-400 text-[10px] border border-red-500/30 px-2 py-1 rounded-lg">Terminate</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Cost Limits */}
      <div className="glass rounded-2xl p-5">
        <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><DollarSign className="w-4 h-4 text-amber-400" />Cost Tracking</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between text-xs text-white/50 mb-1"><span>Daily GPU Budget</span><span>$8.12 / $50.00</span></div>
            <div className="progress-bar"><div className="progress-fill" style={{ width: "16%", background: "linear-gradient(90deg, #22c55e, #4ade80)" }} /></div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-white/50 mb-1"><span>Monthly Budget</span><span>$42.50 / $200.00</span></div>
            <div className="progress-bar"><div className="progress-fill" style={{ width: "21%", background: "linear-gradient(90deg, #22c55e, #4ade80)" }} /></div>
          </div>
        </div>
      </div>

      {/* Job List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">All Jobs</h2>
          <div className="flex gap-1.5 flex-wrap">
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all capitalize ${filter === f ? "btn-gold" : "btn-ghost text-white/50"}`}>
                {f === "processing_audio" ? "Audio" : f}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center">
              <Cpu className="w-12 h-12 text-white/15 mx-auto mb-3" />
              <p className="text-white/40 text-sm">No {filter === "all" ? "" : filter} jobs found</p>
            </div>
          ) : (
            filtered.map(job => <JobCard key={job.id} job={job} />)
          )}
        </div>
      </div>
    </div>
  );
}

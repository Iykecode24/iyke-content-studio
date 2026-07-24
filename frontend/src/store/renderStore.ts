export type RenderStatus =
  | "queued" | "preparing" | "starting_gpu" | "loading_model"
  | "rendering" | "processing_audio" | "lip_syncing" | "stitching"
  | "upscaling" | "uploading" | "completed" | "failed" | "cancelled";

export interface RenderJob {
  id: string;
  projectId: string;
  projectTitle: string;
  type: string;
  model: string;
  gpuType: string;
  status: RenderStatus;
  progress: number;
  retryCount: number;
  startTime?: string;
  endTime?: string;
  estimatedCost: number;
  actualCost: number;
  logs: string[];
  outputUrl?: string;
  userId: string;
}

export const MOCK_JOBS: RenderJob[] = [
  {
    id: "job-001", projectId: "1", projectTitle: "The Last Horizon", type: "movie",
    model: "WanVideo-14B", gpuType: "A100 80GB", status: "rendering",
    progress: 72, retryCount: 0, startTime: new Date(Date.now() - 45 * 60000).toISOString(),
    estimatedCost: 8.40, actualCost: 6.02,
    logs: ["[GPU] Instance started: A100 80GB", "[MODEL] WanVideo-14B loaded in 42s", "[RENDER] Scene 1/8 - completed", "[RENDER] Scene 2/8 - completed", "[RENDER] Scene 3/8 - completed", "[RENDER] Scene 4/8 - in progress (68%)"],
    userId: "1",
  },
  {
    id: "job-002", projectId: "5", projectTitle: "How Quantum Computing Works", type: "explainer",
    model: "ElevenLabs TTS", gpuType: "CPU", status: "processing_audio",
    progress: 55, retryCount: 0, startTime: new Date(Date.now() - 12 * 60000).toISOString(),
    estimatedCost: 4.50, actualCost: 0,
    logs: ["[SCRIPT] Approved", "[VOICE] Generating scene 1 audio...", "[VOICE] Scene 1 audio done", "[VOICE] Generating scene 2 audio..."],
    userId: "1",
  },
  {
    id: "job-003", projectId: "6", projectTitle: "Village Tales Episode 1", type: "cartoon",
    model: "CogVideoX-5B", gpuType: "A100 40GB", status: "queued",
    progress: 0, retryCount: 0,
    estimatedCost: 5.20, actualCost: 0,
    logs: ["[QUEUE] Job queued - waiting for GPU availability"],
    userId: "1",
  },
];

export async function getRenderJobs(): Promise<RenderJob[]> {
  return MOCK_JOBS;
}

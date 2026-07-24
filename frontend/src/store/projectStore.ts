import { useState } from "react";

export type ProjectStatus =
  | "planning" | "scripting" | "characters" | "storyboard"
  | "voice" | "scenes" | "lipsync" | "editing"
  | "upscaling" | "rendering" | "uploading" | "completed" | "failed" | "queued";

export type ContentType =
  | "movie" | "cartoon" | "explainer" | "news" | "image-to-video" | "advertisement";

export interface Project {
  id: string;
  title: string;
  type: ContentType;
  status: ProjectStatus;
  progress: number;
  thumbnail?: string;
  duration?: string;
  createdAt: string;
  updatedAt: string;
  estimatedCost: number;
  actualCost: number;
  publishedTo: string[];
  genre?: string;
  language: string;
  resolution: string;
}

export const MOCK_PROJECTS: Project[] = [
  {
    id: "1", title: "The Last Horizon", type: "movie", status: "rendering",
    progress: 72, duration: "5:32", createdAt: "2026-07-20T10:00:00Z",
    updatedAt: "2026-07-24T09:00:00Z", estimatedCost: 8.40, actualCost: 6.02,
    publishedTo: [], genre: "Sci-Fi", language: "English", resolution: "1080p",
  },
  {
    id: "2", title: "Amara Learns Colours", type: "cartoon", status: "completed",
    progress: 100, duration: "3:15", createdAt: "2026-07-18T14:00:00Z",
    updatedAt: "2026-07-22T16:00:00Z", estimatedCost: 3.20, actualCost: 2.85,
    publishedTo: ["youtube"], genre: "Educational", language: "English", resolution: "1080p",
  },
  {
    id: "3", title: "AI Product Launch Ad", type: "advertisement", status: "scripting",
    progress: 25, duration: "0:30", createdAt: "2026-07-24T08:00:00Z",
    updatedAt: "2026-07-24T11:00:00Z", estimatedCost: 1.80, actualCost: 0,
    publishedTo: [], genre: "Advertisement", language: "English", resolution: "1080p",
  },
  {
    id: "4", title: "Global Tech News Roundup", type: "news", status: "completed",
    progress: 100, duration: "2:45", createdAt: "2026-07-23T07:00:00Z",
    updatedAt: "2026-07-23T14:00:00Z", estimatedCost: 2.10, actualCost: 1.95,
    publishedTo: ["youtube", "instagram"], genre: "News", language: "English", resolution: "1080p",
  },
  {
    id: "5", title: "How Quantum Computing Works", type: "explainer", status: "voice",
    progress: 55, duration: "4:00", createdAt: "2026-07-21T12:00:00Z",
    updatedAt: "2026-07-24T10:30:00Z", estimatedCost: 4.50, actualCost: 0,
    publishedTo: [], genre: "Educational", language: "English", resolution: "1080p",
  },
  {
    id: "6", title: "Village Tales Episode 1", type: "cartoon", status: "queued",
    progress: 0, duration: "5:00", createdAt: "2026-07-24T11:00:00Z",
    updatedAt: "2026-07-24T11:00:00Z", estimatedCost: 5.20, actualCost: 0,
    publishedTo: [], genre: "African Stories", language: "English", resolution: "1080p",
  },
];

export function useMockProjects() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const addProject = (p: Omit<Project, "id" | "createdAt" | "updatedAt">) => {
    const newP: Project = {
      ...p, id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProjects(prev => [newP, ...prev]);
    return newP;
  };
  return { projects, addProject, setProjects };
}

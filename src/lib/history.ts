"use client";

const KEY = "pfb_download_history_v1";
const MAX_ENTRIES = 20;

export type DownloadEntry = {
  templateId: string;
  templateName: string;
  tier: "free" | "premium";
  projectName: string;
  clientName: string;
  at: number;
};

export function readHistory(): DownloadEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e): e is DownloadEntry =>
        typeof e === "object" &&
        e !== null &&
        typeof (e as DownloadEntry).templateId === "string"
    );
  } catch {
    return [];
  }
}

export function recordDownload(entry: DownloadEntry) {
  if (typeof window === "undefined") return;
  try {
    const prev = readHistory();
    const next = [entry, ...prev].slice(0, MAX_ENTRIES);
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}

export function clearHistory() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}

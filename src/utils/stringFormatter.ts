import { ProjectMetadata } from "@/types";

const tokenPattern = /\{\{\s*(projectName|clientName|clientId|projectDate|editorName)\s*\}\}/g;

export function sanitizeSegment(value: string, fallback = "Untitled"): string {
  const cleaned = value
    .trim()
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "-")
    .replace(/[.\s]+$/g, "")
    .replace(/\s+/g, " ")
    .replace(/-{2,}/g, "-");

  return cleaned.length > 0 ? cleaned : fallback;
}

export function slugifySegment(value: string, fallback = "untitled"): string {
  const cleaned = sanitizeSegment(value, fallback)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return cleaned.length > 0 ? cleaned : fallback;
}

export function safeDate(value: string): string {
  if (!value) return new Date().toISOString().slice(0, 10);
  const date = new Date(value + "T00:00:00");
  if (Number.isNaN(date.getTime())) return new Date().toISOString().slice(0, 10);
  return date.toISOString().slice(0, 10);
}

export function normalizeMetadata(metadata: ProjectMetadata): ProjectMetadata {
  return {
    projectName: sanitizeSegment(metadata.projectName, "Untitled Project"),
    clientName: sanitizeSegment(metadata.clientName, "Client"),
    clientId: slugifySegment(metadata.clientId || metadata.clientName || "client", "client"),
    projectDate: safeDate(metadata.projectDate),
    editorName: sanitizeSegment(metadata.editorName, "Editor")
  };
}

export function formatPath(input: string, metadata: ProjectMetadata): string {
  const safe = normalizeMetadata(metadata);

  return input
    .replace(tokenPattern, (_, key: keyof ProjectMetadata) => safe[key])
    .split("/")
    .map((segment) => sanitizeSegment(segment, "Folder"))
    .join("/");
}

export function makeRootFolderName(metadata: ProjectMetadata): string {
  const safe = normalizeMetadata(metadata);
  return `${safe.projectDate}_${slugifySegment(safe.clientId)}_${slugifySegment(safe.projectName)}`;
}

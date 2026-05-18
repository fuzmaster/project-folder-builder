"use client";

import { ProjectMetadata } from "@/types";

type Props = {
  metadata: ProjectMetadata;
  onChange: (metadata: ProjectMetadata) => void;
};

export function ProjectMetadataForm({ metadata, onChange }: Props) {
  function update<K extends keyof ProjectMetadata>(key: K, value: ProjectMetadata[K]) {
    onChange({ ...metadata, [key]: value });
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
      <h2 className="font-semibold">Project Details</h2>
      <p className="mt-1 text-sm text-slate-400">These fields are sanitized and applied across folders and files.</p>

      <div className="mt-4 grid gap-4">
        <label className="grid gap-2 text-sm">
          <span className="text-slate-300">Project Name</span>
          <input
            value={metadata.projectName}
            onChange={(e) => update("projectName", e.target.value)}
            className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 outline-none focus:border-emerald-400"
            placeholder="Example: Summer Launch Video"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="text-slate-300">Client or Channel Name</span>
          <input
            value={metadata.clientName}
            onChange={(e) => update("clientName", e.target.value)}
            className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 outline-none focus:border-emerald-400"
            placeholder="Example: Good Feels"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm">
            <span className="text-slate-300">Client ID</span>
            <input
              value={metadata.clientId}
              onChange={(e) => update("clientId", e.target.value)}
              className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 outline-none focus:border-emerald-400"
              placeholder="good-feels"
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="text-slate-300">Date</span>
            <input
              type="date"
              value={metadata.projectDate}
              onChange={(e) => update("projectDate", e.target.value)}
              className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 outline-none focus:border-emerald-400"
            />
          </label>
        </div>
        <label className="grid gap-2 text-sm">
          <span className="text-slate-300">Editor Name</span>
          <input
            value={metadata.editorName}
            onChange={(e) => update("editorName", e.target.value)}
            className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 outline-none focus:border-emerald-400"
            placeholder="Your name"
          />
        </label>
      </div>
    </div>
  );
}

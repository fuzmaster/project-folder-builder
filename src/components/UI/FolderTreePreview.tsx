"use client";

import { TemplateSpec, ProjectMetadata } from "@/types";
import { formatPath, makeRootFolderName } from "@/utils/stringFormatter";

type Props = {
  template: TemplateSpec;
  metadata: ProjectMetadata;
};

export function FolderTreePreview({ template, metadata }: Props) {
  const rows = [
    ...template.folders.map((path) => ({ type: "folder", path })),
    ...template.files.map((file) => ({ type: "file", path: file.path }))
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-semibold">Folder Preview</h2>
        <span className="text-xs text-slate-500">{rows.length} items</span>
      </div>
      <div className="max-h-[520px] overflow-auto rounded-xl bg-black/60 p-4 font-mono text-xs leading-6 text-slate-300">
        <div className="text-emerald-300">{makeRootFolderName(metadata)}/</div>
        {rows.map((row) => {
          const formatted = formatPath(row.path, metadata);
          const depth = formatted.split("/").length;
          const name = formatted.split("/").pop();

          return (
            <div key={`${row.type}-${formatted}`} style={{ paddingLeft: `${depth * 12}px` }}>
              <span className={row.type === "folder" ? "text-sky-300" : "text-slate-300"}>
                {row.type === "folder" ? "📁 " : "📄 "}
                {name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, FileText } from "lucide-react";
import { TemplateSpec, ProjectMetadata } from "@/types";
import { formatPath, makeRootFolderName, normalizeMetadata } from "@/utils/stringFormatter";

type Props = {
  template: TemplateSpec;
  metadata: ProjectMetadata;
};

type Node = {
  name: string;
  type: "folder" | "file";
  fullPath?: string;
  children: Record<string, Node>;
  order: string[];
};

type Row = {
  prefix: string;
  connector: string;
  name: string;
  type: "folder" | "file";
  fullPath?: string;
};

function buildTree(template: TemplateSpec, metadata: ProjectMetadata): Node {
  const root: Node = {
    name: makeRootFolderName(metadata),
    type: "folder",
    children: {},
    order: []
  };

  function insert(segments: string[], isFile: boolean, fullPath?: string) {
    let node = root;
    segments.forEach((seg, i) => {
      const last = i === segments.length - 1;
      if (!node.children[seg]) {
        node.children[seg] = {
          name: seg,
          type: last && isFile ? "file" : "folder",
          fullPath: last && isFile ? fullPath : undefined,
          children: {},
          order: []
        };
        node.order.push(seg);
      }
      node = node.children[seg];
    });
  }

  template.folders.forEach((f) => insert(formatPath(f, metadata).split("/"), false));
  template.files.forEach((f) => {
    const formatted = formatPath(f.path, metadata);
    insert(formatted.split("/"), true, f.path);
  });
  return root;
}

function flattenTree(root: Node): Row[] {
  const rows: Row[] = [];
  function walk(node: Node, prefix: string) {
    node.order.forEach((key, i) => {
      const child = node.children[key];
      const last = i === node.order.length - 1;
      rows.push({
        prefix,
        connector: last ? "└── " : "├── ",
        name: child.name,
        type: child.type,
        fullPath: child.fullPath
      });
      walk(child, prefix + (last ? "    " : "│   "));
    });
  }
  walk(root, "");
  return rows;
}

function applyTokens(content: string, metadata: ProjectMetadata): string {
  const safe = normalizeMetadata(metadata);
  return content.replace(
    /\{\{\s*(projectName|clientName|clientId|projectDate|editorName)\s*\}\}/g,
    (_, key) => safe[key as keyof ProjectMetadata]
  );
}

export function FolderTreePreview({ template, metadata }: Props) {
  const root = useMemo(() => buildTree(template, metadata), [template, metadata]);
  const rows = useMemo(() => flattenTree(root), [root]);
  const folderCount = template.folders.length;
  const fileCount = template.files.length;

  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null);

  useEffect(() => {
    setSelectedFilePath(template.files[0]?.path ?? null);
  }, [template.id, template.files]);

  const selectedFile = useMemo(
    () => template.files.find((f) => f.path === selectedFilePath) ?? null,
    [template.files, selectedFilePath]
  );

  const previewContent = useMemo(
    () => (selectedFile ? applyTokens(selectedFile.content, metadata) : ""),
    [selectedFile, metadata]
  );

  const previewPath = useMemo(
    () => (selectedFile ? formatPath(selectedFile.path, metadata) : ""),
    [selectedFile, metadata]
  );

  return (
    <div className="pfb-tree">
      <div className="pfb-tree-bar">
        <div className="pfb-tree-bar-left">
          <span className="pfb-tree-label">TREE</span>
          <span className="pfb-tree-root">{root.name}/</span>
        </div>
        <span className="pfb-tree-count">
          {folderCount} dir · {fileCount} files
        </span>
      </div>
      <div className="pfb-tree-body" key={template.id}>
        <div className="pfb-tree-pre">
          <div className="pfb-tree-line pfb-tree-rootline">
            <span className="pfb-ln">1</span>
            <span className="pfb-tree-text">
              <span className="t-root">{root.name}/</span>
            </span>
          </div>
          {rows.map((r, i) => {
            const isClickable = r.type === "file" && Boolean(r.fullPath);
            const isActive = isClickable && r.fullPath === selectedFilePath;
            return (
              <div
                className={
                  "pfb-tree-line" +
                  (isClickable ? " is-clickable" : "") +
                  (isActive ? " is-active" : "")
                }
                key={i}
                onClick={isClickable ? () => setSelectedFilePath(r.fullPath!) : undefined}
                role={isClickable ? "button" : undefined}
                tabIndex={isClickable ? 0 : undefined}
                onKeyDown={
                  isClickable
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedFilePath(r.fullPath!);
                        }
                      }
                    : undefined
                }
              >
                <span className="pfb-ln">{i + 2}</span>
                <span className="pfb-tree-text">
                  <span className="t-guide">
                    {r.prefix}
                    {r.connector}
                  </span>
                  <span className={r.type === "folder" ? "t-folder" : "t-file"}>
                    {r.name}
                    {r.type === "folder" ? "/" : ""}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {selectedFile && (
        <details className="pfb-tree-preview" open>
          <summary>
            <FileText size={13} />
            <span className="pfb-tree-preview-path">{previewPath}</span>
            <ChevronDown size={14} className="pfb-tree-preview-chev" />
          </summary>
          <pre className="pfb-tree-preview-body">{previewContent}</pre>
        </details>
      )}
    </div>
  );
}

"use client";

import { useMemo } from "react";
import { TemplateSpec, ProjectMetadata } from "@/types";
import { formatPath, makeRootFolderName } from "@/utils/stringFormatter";

type Props = {
  template: TemplateSpec;
  metadata: ProjectMetadata;
};

type Node = {
  name: string;
  type: "folder" | "file";
  children: Record<string, Node>;
  order: string[];
};

type Row = {
  prefix: string;
  connector: string;
  name: string;
  type: "folder" | "file";
  depth: number;
};

function buildTree(template: TemplateSpec, metadata: ProjectMetadata): Node {
  const root: Node = {
    name: makeRootFolderName(metadata),
    type: "folder",
    children: {},
    order: []
  };

  function insert(segments: string[], isFile: boolean) {
    let node = root;
    segments.forEach((seg, i) => {
      const last = i === segments.length - 1;
      if (!node.children[seg]) {
        node.children[seg] = {
          name: seg,
          type: last && isFile ? "file" : "folder",
          children: {},
          order: []
        };
        node.order.push(seg);
      }
      node = node.children[seg];
    });
  }

  template.folders.forEach((f) => insert(formatPath(f, metadata).split("/"), false));
  template.files.forEach((f) => insert(formatPath(f.path, metadata).split("/"), true));
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
        depth: prefix.length
      });
      walk(child, prefix + (last ? "    " : "│   "));
    });
  }
  walk(root, "");
  return rows;
}

export function FolderTreePreview({ template, metadata }: Props) {
  const root = useMemo(() => buildTree(template, metadata), [template, metadata]);
  const rows = useMemo(() => flattenTree(root), [root]);
  const folderCount = template.folders.length;
  const fileCount = template.files.length;

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
          {rows.map((r, i) => (
            <div className="pfb-tree-line" key={i}>
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
          ))}
        </div>
      </div>
    </div>
  );
}

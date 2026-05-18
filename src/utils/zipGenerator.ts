"use client";

import JSZip from "jszip";
import { saveAs } from "file-saver";
import { ProjectMetadata, TemplateSpec } from "@/types";
import { formatPath, makeRootFolderName, normalizeMetadata } from "@/utils/stringFormatter";

export async function generateProjectZip(template: TemplateSpec, metadata: ProjectMetadata): Promise<Blob> {
  const zip = new JSZip();
  const normalized = normalizeMetadata(metadata);
  const rootFolderName = makeRootFolderName(normalized);
  const root = zip.folder(rootFolderName);

  if (!root) {
    throw new Error("Unable to create root folder.");
  }

  for (const folderPath of template.folders) {
    root.folder(formatPath(folderPath, normalized));
  }

  for (const file of template.files) {
    const formattedPath = formatPath(file.path, normalized);
    const formattedContent = file.content.replace(/\{\{\s*(projectName|clientName|clientId|projectDate|editorName)\s*\}\}/g, (_, key) => {
      return normalized[key as keyof ProjectMetadata];
    });

    root.file(formattedPath, formattedContent);
  }

  return zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: 3 }
  });
}

export async function downloadProjectZip(template: TemplateSpec, metadata: ProjectMetadata): Promise<void> {
  const blob = await generateProjectZip(template, metadata);
  saveAs(blob, `${makeRootFolderName(metadata)}.zip`);
}

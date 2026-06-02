"use client";

import { useState } from "react";
import { Download, Lock } from "lucide-react";
import { ProjectMetadata, TemplateSpec } from "@/types";
import { downloadProjectZip } from "@/utils/zipGenerator";
import { validateMetadata } from "@/utils/validation";

type Props = {
  template: TemplateSpec;
  metadata: ProjectMetadata;
  premiumUnlocked: boolean;
  onValidationError: (message: string) => void;
};

export function DownloadButton({ template, metadata, premiumUnlocked, onValidationError }: Props) {
  const [downloading, setDownloading] = useState(false);
  const locked = template.tier === "premium" && !premiumUnlocked;

  async function handleDownload() {
    if (locked) {
      onValidationError("Pro template — sign in and verify your Gumroad license to unlock.");
      return;
    }

    const validation = validateMetadata(metadata);
    if (!validation.valid) {
      onValidationError(Object.values(validation.errors)[0] || "Check your project details.");
      return;
    }

    setDownloading(true);
    try {
      await downloadProjectZip(template, metadata);
    } catch (error) {
      onValidationError(error instanceof Error ? error.message : "Unable to generate ZIP.");
    } finally {
      setDownloading(false);
    }
  }

  if (locked) {
    return (
      <button type="button" className="pfb-download is-locked" onClick={handleDownload}>
        <span className="pfb-dl-chip">PRO</span>
        <span className="pfb-dl-main">
          <Lock size={17} />
          Pro — sign in to unlock
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className="pfb-download"
      onClick={handleDownload}
      disabled={downloading}
    >
      <Download size={18} strokeWidth={2} />
      {downloading ? "Building ZIP…" : "Download folder ZIP"}
    </button>
  );
}

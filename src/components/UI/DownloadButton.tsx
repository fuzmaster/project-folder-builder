"use client";

import { useState } from "react";
import { Download, Lock } from "lucide-react";
import { ProjectMetadata, TemplateSpec } from "@/types";
import { downloadProjectZip } from "@/utils/zipGenerator";
import { validateMetadata } from "@/utils/validation";
import { trackEvent } from "@/lib/analytics";
import { recordDownload } from "@/lib/history";

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
      onValidationError("Pro template. Buy the one-time unlock, then sign in and verify your Gumroad license.");
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
      recordDownload({
        templateId: template.id,
        templateName: template.name,
        tier: template.tier,
        projectName: metadata.projectName,
        clientName: metadata.clientName,
        at: Date.now()
      });
      trackEvent("zip_downloaded", { id: template.id, tier: template.tier, source: "main" });
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
          Pro template
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

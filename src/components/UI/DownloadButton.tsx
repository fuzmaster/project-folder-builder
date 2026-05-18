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
    const validation = validateMetadata(metadata);
    if (!validation.valid) {
      onValidationError(Object.values(validation.errors)[0] || "Check your project details.");
      return;
    }

    if (locked) {
      onValidationError("Sign in and verify your Gumroad license to unlock Pro templates.");
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

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={downloading}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-black transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {locked ? <Lock size={18} /> : <Download size={18} />}
      {locked ? "Unlock Pro to Download" : downloading ? "Building ZIP..." : "Download Folder ZIP"}
    </button>
  );
}

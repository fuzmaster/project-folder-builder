"use client";

import { InputHTMLAttributes } from "react";
import { ProjectMetadata } from "@/types";

type Props = {
  metadata: ProjectMetadata;
  onChange: (metadata: ProjectMetadata) => void;
};

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  mono?: boolean;
  hint?: string;
};

function Field({ label, mono, hint, className, ...rest }: FieldProps) {
  return (
    <label className="pfb-field">
      <span className="pfb-field-label">
        {label}
        {hint && <em className="pfb-field-hint">{hint}</em>}
      </span>
      <input
        className={["pfb-input", mono ? "pfb-mono-input" : "", className || ""].filter(Boolean).join(" ")}
        {...rest}
      />
    </label>
  );
}

export function ProjectMetadataForm({ metadata, onChange }: Props) {
  function update<K extends keyof ProjectMetadata>(key: K, value: ProjectMetadata[K]) {
    onChange({ ...metadata, [key]: value });
  }

  return (
    <div className="pfb-panel">
      <div className="pfb-panel-head">
        <h2 className="pfb-panel-title">Project details</h2>
        <span className="pfb-panel-tag">sanitized</span>
      </div>
      <p className="pfb-panel-sub">Applied across every folder and file name in the ZIP.</p>
      <div className="pfb-form-grid">
        <Field
          label="Project name"
          value={metadata.projectName}
          onChange={(e) => update("projectName", e.target.value)}
          placeholder="Summer Launch Video"
        />
        <Field
          label="Client or channel"
          value={metadata.clientName}
          onChange={(e) => update("clientName", e.target.value)}
          placeholder="Good Feels"
        />
        <div className="pfb-form-row">
          <Field
            label="Client ID"
            mono
            value={metadata.clientId}
            onChange={(e) => update("clientId", e.target.value)}
            placeholder="good-feels"
          />
          <Field
            label="Date"
            mono
            type="date"
            value={metadata.projectDate}
            onChange={(e) => update("projectDate", e.target.value)}
          />
        </div>
        <Field
          label="Editor"
          value={metadata.editorName}
          onChange={(e) => update("editorName", e.target.value)}
          placeholder="Your name"
        />
      </div>
    </div>
  );
}

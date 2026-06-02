"use client";

import { Lock } from "lucide-react";
import { TemplateSpec } from "@/types";
import { estimateZip } from "@/utils/stringFormatter";

type Props = {
  template: TemplateSpec;
  selected: boolean;
  onSelect: () => void;
  premiumUnlocked: boolean;
  tabIndex?: number;
  role?: string;
  index?: number;
};

export function TemplateCard({
  template,
  selected,
  onSelect,
  premiumUnlocked,
  tabIndex,
  role,
  index
}: Props) {
  const locked = template.tier === "premium" && !premiumUnlocked;
  const folders = template.folders.length;
  const files = template.files.length;

  const classes = ["pfb-card"];
  if (selected) classes.push("is-selected");
  if (locked) classes.push("is-locked");

  return (
    <button
      type="button"
      onClick={onSelect}
      className={classes.join(" ")}
      aria-pressed={selected}
      aria-checked={role === "radio" ? selected : undefined}
      role={role}
      tabIndex={tabIndex}
      data-index={index}
      aria-label={`${template.name}${locked ? " (Pro, locked)" : ""}`}
    >
      <div className="pfb-card-top">
        <span className={"pfb-chip " + (template.tier === "premium" ? "pfb-chip-pro" : "pfb-chip-free")}>
          {template.tier === "premium" ? (locked ? "PRO · LOCKED" : "PRO") : "FREE"}
        </span>
        <span className="pfb-card-cat">{template.category}</span>
      </div>
      <h3 className="pfb-card-name">{template.name}</h3>
      <p className="pfb-card-desc">{template.description}</p>
      <div className="pfb-card-meta">
        <span>{folders} folders</span>
        <i className="pfb-dot" />
        <span>{files} files</span>
        <i className="pfb-dot" />
        <span>{estimateZip(template)} ZIP</span>
        {locked && (
          <span className="pfb-card-locktag">
            <Lock size={12} strokeWidth={1.8} />
          </span>
        )}
      </div>
    </button>
  );
}

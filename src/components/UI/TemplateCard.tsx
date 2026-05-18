"use client";

import { TemplateSpec } from "@/types";
import { Crown, FolderOpen } from "lucide-react";

type Props = {
  template: TemplateSpec;
  selected: boolean;
  onSelect: () => void;
  premiumUnlocked: boolean;
};

export function TemplateCard({ template, selected, onSelect, premiumUnlocked }: Props) {
  const locked = template.tier === "premium" && !premiumUnlocked;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        "group rounded-2xl border p-4 text-left transition",
        selected
          ? "border-emerald-400 bg-emerald-400/10 shadow-glow"
          : "border-white/10 bg-white/[0.035] hover:border-white/25 hover:bg-white/[0.06]"
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
          {template.tier === "premium" ? <Crown size={18} /> : <FolderOpen size={18} />}
        </div>
        <span className={[
          "rounded-full px-2 py-1 text-xs",
          template.tier === "premium" ? "bg-amber-400/15 text-amber-200" : "bg-emerald-400/15 text-emerald-200"
        ].join(" ")}>
          {template.tier === "premium" ? (locked ? "Premium locked" : "Premium") : "Free"}
        </span>
      </div>
      <h3 className="mt-4 text-base font-semibold text-white">{template.name}</h3>
      <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">{template.description}</p>
      <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">{template.category}</p>
    </button>
  );
}

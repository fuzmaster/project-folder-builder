"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Sparkles, X } from "lucide-react";
import { freeTemplates } from "@/config/templates";
import { ProjectMetadata, TemplateSpec } from "@/types";
import { trackEvent } from "@/lib/analytics";

const STORAGE_KEY = "pfb_wizard_seen_v1";

const CATEGORIES: { id: string; label: string; description: string; match: string[] }[] = [
  { id: "creator", label: "YouTube / Creator", description: "Long-form, vlogs, essays, channel uploads.", match: ["Creator"] },
  { id: "social", label: "Reels / Shorts / TikTok", description: "Vertical clips, captions, multi-channel exports.", match: ["Social"] },
  { id: "podcast", label: "Podcast", description: "Multi-cam podcast cuts, transcripts, reels.", match: ["Podcast"] },
  { id: "event", label: "Wedding / Event", description: "Highlight films, ceremony edits, deliverables.", match: ["Event"] },
  { id: "music", label: "Music video", description: "Performance takes, b-roll, color, VFX.", match: ["Music"] },
  { id: "client", label: "Client / Commercial", description: "Brand ads, social spots, quick client jobs.", match: ["Commercial"] },
  { id: "student", label: "Student / Class", description: "Coursework, short films, school projects.", match: ["Education"] }
];

type Props = {
  metadata: ProjectMetadata;
  onMetadataChange: (m: ProjectMetadata) => void;
  onSelectTemplate: (id: string) => void;
  onDownload: () => Promise<void> | void;
};

export function Wizard({ metadata, onMetadataChange, onSelectTemplate, onDownload }: Props) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [recommendedId, setRecommendedId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // listen for manual open events from elsewhere (e.g. header)
  useEffect(() => {
    function handler() {
      setStep(0);
      setOpen(true);
      trackEvent("wizard_opened", { source: "manual" });
    }
    window.addEventListener("pfb:open-wizard", handler);
    return () => window.removeEventListener("pfb:open-wizard", handler);
  }, []);

  // esc to close
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close("skipped");
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function markSeen() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  }

  function close(reason: "completed" | "skipped") {
    setOpen(false);
    markSeen();
    trackEvent(reason === "completed" ? "wizard_completed" : "wizard_skipped");
  }

  const recommended: TemplateSpec[] = useMemo(() => {
    if (!categoryId) return [];
    const cat = CATEGORIES.find((c) => c.id === categoryId);
    if (!cat) return [];
    return freeTemplates.filter((t) => cat.match.includes(t.category));
  }, [categoryId]);

  useEffect(() => {
    if (recommended.length > 0) {
      setRecommendedId(recommended[0].id);
    } else if (categoryId) {
      setRecommendedId(freeTemplates[0].id);
    }
  }, [recommended, categoryId]);

  if (!open) return null;

  const canNext =
    (step === 0 && Boolean(categoryId)) ||
    (step === 1 && metadata.projectName.trim().length > 0 && metadata.clientName.trim().length > 0) ||
    (step === 2 && Boolean(recommendedId));

  function next() {
    if (step === 2 && recommendedId) {
      onSelectTemplate(recommendedId);
    }
    if (step < 3) setStep(step + 1);
  }

  function back() {
    if (step > 0) setStep(step - 1);
  }

  async function finish() {
    try {
      await onDownload();
      close("completed");
    } catch {
      // The page-level notice explains the validation or ZIP error.
    }
  }

  return (
    <div
      className="pfb-wiz-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pfb-wiz-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) close("skipped");
      }}
    >
      <div className="pfb-wiz-dialog" ref={dialogRef}>
        <button
          type="button"
          className="pfb-wiz-close"
          onClick={() => close("skipped")}
          aria-label="Close wizard"
        >
          <X size={16} />
        </button>

        <div className="pfb-wiz-head">
          <span className="pfb-eyebrow">
            <Sparkles size={11} style={{ verticalAlign: "-1px", marginRight: 4 }} />
            quick start
          </span>
          <h2 id="pfb-wiz-title" className="pfb-wiz-title">
            {step === 0 && "What are you editing?"}
            {step === 1 && "Tell us about the project."}
            {step === 2 && "Here's your starting structure."}
            {step === 3 && "Ready when you are."}
          </h2>
          <p className="pfb-wiz-sub">
            {step === 0 && "Pick a category so we can recommend a template."}
            {step === 1 && "These names go into every folder and file in the ZIP."}
            {step === 2 && "You can switch templates anytime from the main grid."}
            {step === 3 && "Download the ZIP and unzip it into your projects folder."}
          </p>
        </div>

        <div className="pfb-wiz-steps">
          {[0, 1, 2, 3].map((n) => (
            <span
              key={n}
              className={"pfb-wiz-dot" + (step >= n ? " is-active" : "")}
              aria-hidden="true"
            />
          ))}
        </div>

        <div className="pfb-wiz-body">
          {step === 0 && (
            <div className="pfb-wiz-cats">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={"pfb-wiz-cat" + (categoryId === c.id ? " is-selected" : "")}
                  onClick={() => setCategoryId(c.id)}
                >
                  <span className="pfb-wiz-cat-label">{c.label}</span>
                  <span className="pfb-wiz-cat-desc">{c.description}</span>
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="pfb-form-grid">
              <label className="pfb-field">
                <span className="pfb-field-label">Project name</span>
                <input
                  className="pfb-input"
                  value={metadata.projectName}
                  onChange={(e) => onMetadataChange({ ...metadata, projectName: e.target.value })}
                  placeholder="Summer Launch Video"
                  autoFocus
                />
              </label>
              <label className="pfb-field">
                <span className="pfb-field-label">Client or channel</span>
                <input
                  className="pfb-input"
                  value={metadata.clientName}
                  onChange={(e) => onMetadataChange({ ...metadata, clientName: e.target.value })}
                  placeholder="Good Feels"
                />
              </label>
              <div className="pfb-form-row">
                <label className="pfb-field">
                  <span className="pfb-field-label">Client ID</span>
                  <input
                    className="pfb-input pfb-mono-input"
                    value={metadata.clientId}
                    onChange={(e) => onMetadataChange({ ...metadata, clientId: e.target.value })}
                    placeholder="good-feels"
                  />
                </label>
                <label className="pfb-field">
                  <span className="pfb-field-label">Date</span>
                  <input
                    type="date"
                    className="pfb-input pfb-mono-input"
                    value={metadata.projectDate}
                    onChange={(e) => onMetadataChange({ ...metadata, projectDate: e.target.value })}
                  />
                </label>
              </div>
              <label className="pfb-field">
                <span className="pfb-field-label">Editor</span>
                <input
                  className="pfb-input"
                  value={metadata.editorName}
                  onChange={(e) => onMetadataChange({ ...metadata, editorName: e.target.value })}
                  placeholder="Your name"
                />
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="pfb-wiz-recs">
              {(recommended.length > 0 ? recommended : freeTemplates.slice(0, 3)).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={"pfb-wiz-rec" + (recommendedId === t.id ? " is-selected" : "")}
                  onClick={() => setRecommendedId(t.id)}
                >
                  <div className="pfb-wiz-rec-top">
                    <span className="pfb-chip pfb-chip-free">FREE</span>
                    <span className="pfb-card-cat">{t.category}</span>
                  </div>
                  <h3 className="pfb-card-name">{t.name}</h3>
                  <p className="pfb-card-desc">{t.description}</p>
                  <div className="pfb-card-meta">
                    <span>{t.folders.length} folders</span>
                    <i className="pfb-dot" />
                    <span>{t.files.length} files</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="pfb-wiz-finish">
              <div className="pfb-wiz-finish-check">
                <Check size={28} strokeWidth={2.5} />
              </div>
              <p className="pfb-wiz-finish-text">
                Your project folder is set up and named. Click the button below to download the ZIP
                and unzip it into your projects folder. You can re-open this wizard anytime from
                the header.
              </p>
            </div>
          )}
        </div>

        <div className="pfb-wiz-foot">
          {step > 0 ? (
            <button type="button" className="pfb-btn pfb-btn-ghost" onClick={back}>
              <ArrowLeft size={14} />
              Back
            </button>
          ) : (
            <button type="button" className="pfb-btn pfb-btn-ghost" onClick={() => close("skipped")}>
              Skip
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              className="pfb-btn pfb-btn-accent"
              onClick={next}
              disabled={!canNext}
            >
              Next
              <ArrowRight size={14} />
            </button>
          ) : (
            <button type="button" className="pfb-btn pfb-btn-accent" onClick={finish}>
              Download ZIP
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

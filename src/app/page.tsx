"use client";

import { useCallback, useEffect, useMemo, useRef, useState, KeyboardEvent } from "react";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { freeTemplates } from "@/config/templates";
import { premiumTemplates } from "@/config/premiumTemplates";
import { ProjectMetadata, TemplateSpec } from "@/types";
import { TemplateCard } from "@/components/UI/TemplateCard";
import { FolderTreePreview } from "@/components/UI/FolderTreePreview";
import { ProjectMetadataForm } from "@/components/forms/ProjectMetadataForm";
import { DownloadButton } from "@/components/UI/DownloadButton";
import { AuthPanel } from "@/components/forms/AuthPanel";
import { AccountProfile } from "@/lib/firebaseClient";
import { Wizard } from "@/components/Wizard/Wizard";
import { trackEvent } from "@/lib/analytics";
import { downloadProjectZip } from "@/utils/zipGenerator";
import { makeRootFolderName } from "@/utils/stringFormatter";
import { validateMetadata } from "@/utils/validation";
import { recordDownload } from "@/lib/history";

function heroTreeLines(template: TemplateSpec) {
  const tops = new Map<string, string[]>();
  for (const path of template.folders) {
    const [first, second] = path.split("/");
    if (!tops.has(first)) tops.set(first, []);
    if (second && !tops.get(first)!.includes(second)) tops.get(first)!.push(second);
  }
  const topKeys = [...tops.keys()];
  const firstKey = topKeys[0];
  const firstChildren = (tops.get(firstKey) || []).slice(0, 4);
  const secondKey = topKeys[1];
  const lines: string[] = [`├─ ${firstKey}/`];
  firstChildren.forEach((c, i) => {
    const last = i === firstChildren.length - 1 && !secondKey;
    lines.push(`│  ${last ? "└─" : "├─"} ${c}/`);
  });
  if (secondKey) lines.push(`└─ ${secondKey}/`);
  return lines;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

export default function HomePage() {
  const templates = useMemo<TemplateSpec[]>(
    () => [...freeTemplates, ...premiumTemplates],
    []
  );
  const [selectedId, setSelectedId] = useState(freeTemplates[0].id);
  const [notice, setNotice] = useState("");
  const [profile, setProfile] = useState<AccountProfile | null>(null);
  const [metadata, setMetadata] = useState<ProjectMetadata>({
    projectName: "First Client Edit",
    clientName: "Demo Client",
    clientId: "demo-client",
    projectDate: today(),
    editorName: "Editor"
  });

  const premiumUnlocked = Boolean(profile?.isPro);
  const selected = templates.find((t) => t.id === selectedId) || templates[0];

  const freeCount = freeTemplates.length;
  const proCount = premiumTemplates.length;
  const gumroadUrl = process.env.NEXT_PUBLIC_GUMROAD_PRODUCT_URL || "#pricing";

  const gridRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(2);

  useEffect(() => {
    function measure() {
      setColumns(window.innerWidth <= 620 ? 1 : 2);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const selectTemplate = useCallback(
    (id: string) => {
      setSelectedId(id);
      const tpl = templates.find((t) => t.id === id);
      if (tpl) trackEvent("template_selected", { id: tpl.id, tier: tpl.tier });
    },
    [templates]
  );

  function handleGridKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const idx = templates.findIndex((t) => t.id === selectedId);
    if (idx < 0) return;
    let next = idx;
    switch (e.key) {
      case "ArrowRight":
        next = Math.min(templates.length - 1, idx + 1);
        break;
      case "ArrowLeft":
        next = Math.max(0, idx - 1);
        break;
      case "ArrowDown":
        next = Math.min(templates.length - 1, idx + columns);
        break;
      case "ArrowUp":
        next = Math.max(0, idx - columns);
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = templates.length - 1;
        break;
      default:
        return;
    }
    if (next !== idx) {
      e.preventDefault();
      selectTemplate(templates[next].id);
      const buttons = gridRef.current?.querySelectorAll<HTMLButtonElement>("button.pfb-card");
      buttons?.[next]?.focus();
    }
  }

  return (
    <main id="top">
      {/* HERO */}
      <section className="pfb-shell pfb-hero">
        <div className="pfb-hero-grid">
          <div>
            <div className="pfb-hero-eyebrow">
              <span className="pfb-hero-eyebrow-num">01 / the tool</span>
              <span className="pfb-hero-eyebrow-desc">Project Folder Builder</span>
            </div>
            <h1 className="pfb-hero-title">Folders before footage.</h1>
            <p className="pfb-hero-sub">
              Generate clean video editing project folders as ready-to-use ZIPs in seconds.
            </p>
            <div className="pfb-hero-cta-row">
              <a href="#workspace" className="pfb-hero-cta">
                Build a free project folder <ArrowRight size={14} />
              </a>
              <a href="#pricing" className="pfb-hero-cta pfb-hero-cta-secondary">
                See Pro templates
              </a>
            </div>
            <p className="pfb-hero-trust">Runs in your browser. Free templates need no login.</p>
          </div>
          <aside className="pfb-hero-tree" aria-hidden>
            <div className="pfb-hero-tree-head">
              <span>02 tree · preview</span>
              <span className="pfb-hero-tree-meta">
                {selected.folders.length} dir · {selected.files.length} files
              </span>
            </div>
            <div className="pfb-hero-tree-body">
              <div className="pfb-hero-tree-root">{makeRootFolderName(metadata)}/</div>
              {heroTreeLines(selected).map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
            <div className="pfb-hero-tree-caption">↑ live preview, updates as you type</div>
          </aside>
        </div>
      </section>

      <section className="pfb-shell pfb-story" aria-label="Why it helps">
        <div className="pfb-story-copy">
          <p>
            Most editing projects start messy: footage in Downloads, exports on the desktop,
            captions in random folders, and final files named final_FINAL_v3_realfinal.mp4.
          </p>
          <p>
            Pick a project type, enter the job details, and download a clean folder starter before
            the chaos starts.
          </p>
        </div>
        <figure className="pfb-story-art">
          <img
            src="/Folder%20Tree%20Visual.png"
            alt="An organized folder tree with source media, project files, assets, exports, client notes, and archive folders."
          />
        </figure>
      </section>

      {/* TEMPLATES BILLBOARD */}
      <section className="pfb-shell pfb-tplhead" id="templates">
        <div className="pfb-tplhead-eyebrow">
          <span className="pfb-tplhead-eyebrow-num">03 / the templates</span>
          <span className="pfb-tplhead-eyebrow-desc">
            {freeCount} free · {proCount} pro
          </span>
        </div>
        <h2 className="pfb-tplhead-title">Choose a template.</h2>
      </section>

      {/* WORKSPACE */}
      <section id="workspace" className="pfb-shell pfb-workspace">
        <div className="pfb-col-templates">
          <div
            className="pfb-grid"
            ref={gridRef}
            role="radiogroup"
            aria-label="Project templates"
            onKeyDown={handleGridKeyDown}
          >
            {templates.map((tpl, i) => (
              <TemplateCard
                key={tpl.id}
                template={tpl}
                selected={tpl.id === selected.id}
                premiumUnlocked={premiumUnlocked}
                onSelect={() => selectTemplate(tpl.id)}
                tabIndex={tpl.id === selected.id ? 0 : -1}
                role="radio"
                index={i}
              />
            ))}
          </div>
        </div>

        <aside className="pfb-col-side">
          <div className="pfb-side-sticky">
            <AuthPanel onProfileChange={setProfile} />
            <ProjectMetadataForm metadata={metadata} onChange={setMetadata} />
            {notice && (
              <div className="pfb-notice">
                <AlertTriangle size={15} />
                <span>{notice}</span>
              </div>
            )}
            <DownloadButton
              template={selected}
              metadata={metadata}
              premiumUnlocked={premiumUnlocked}
              onValidationError={setNotice}
            />
            <FolderTreePreview template={selected} metadata={metadata} />
          </div>
        </aside>
      </section>

      <Wizard
        metadata={metadata}
        onMetadataChange={setMetadata}
        onSelectTemplate={selectTemplate}
        onDownload={async () => {
          const validation = validateMetadata(metadata);
          if (!validation.valid) {
            setNotice(Object.values(validation.errors)[0] || "Check your project details.");
            throw new Error(Object.values(validation.errors)[0] || "Check your project details.");
          }
          try {
            await downloadProjectZip(selected, metadata);
            recordDownload({
              templateId: selected.id,
              templateName: selected.name,
              tier: selected.tier,
              projectName: metadata.projectName,
              clientName: metadata.clientName,
              at: Date.now()
            });
            trackEvent("zip_downloaded", { id: selected.id, tier: selected.tier, source: "wizard" });
          } catch (error) {
            setNotice(error instanceof Error ? error.message : "Unable to generate ZIP.");
            throw error;
          }
        }}
      />

      {/* PRICING (prose) */}
      <section id="pricing" className="pfb-shell pfb-pricing">
        <div className="pfb-pricing-eyebrow">
          <span className="pfb-pricing-eyebrow-num">04 / pro</span>
          <span className="pfb-pricing-eyebrow-desc">free to start. one-time unlock when it helps</span>
        </div>
        <div className="pfb-plan-grid">
          <div className="pfb-plan">
            <span className="pfb-plan-kicker">Free</span>
            <h2 className="pfb-plan-title">$0</h2>
            <ul>
              <li>8 starter templates</li>
              <li>ZIP download</li>
              <li>Clean folder names</li>
              <li>README/checklist files</li>
              <li>No account required</li>
            </ul>
          </div>
          <div className="pfb-plan pfb-plan-pro">
            <span className="pfb-plan-kicker">Pro</span>
            <h2 className="pfb-plan-title">$9 one-time unlock</h2>
            <ul>
              <li>Agency Video Campaign</li>
              <li>Professional Podcast Network</li>
              <li>Freelancer Client System</li>
              <li>Future template updates</li>
              <li>Supports development</li>
            </ul>
          </div>
        </div>
        <div className="pfb-pricing-cta-row">
          <a href={gumroadUrl} className="pfb-hero-cta">
            Unlock Pro templates <ArrowRight size={14} />
          </a>
        </div>
        <p className="pfb-pricing-foot">
          You only need an account for Pro. Free ZIPs work without signing in.
        </p>
      </section>
    </main>
  );
}

"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Check, Minus, AlertTriangle } from "lucide-react";
import { freeTemplates } from "@/config/templates";
import { premiumTemplates } from "@/config/premiumTemplates";
import { ProjectMetadata, TemplateSpec } from "@/types";
import { TemplateCard } from "@/components/UI/TemplateCard";
import { FolderTreePreview } from "@/components/UI/FolderTreePreview";
import { ProjectMetadataForm } from "@/components/forms/ProjectMetadataForm";
import { DownloadButton } from "@/components/UI/DownloadButton";
import { AuthPanel } from "@/components/forms/AuthPanel";
import { AccountProfile } from "@/lib/firebaseClient";

function today() {
  return new Date().toISOString().slice(0, 10);
}

type PricingRow = {
  label: string;
  free: string | boolean;
  pro: string | boolean;
};

const PRICING_ROWS: PricingRow[] = [
  { label: "Starter + project templates", free: "8", pro: "11" },
  { label: "Browser-side ZIP generation", free: true, pro: true },
  { label: "Naming sanitizer", free: true, pro: true },
  { label: "Markdown checklists", free: true, pro: true },
  { label: "Premium agency templates", free: false, pro: true },
  { label: "Premiere / DaVinci starter files", free: false, pro: true },
  { label: "Client admin + billing folders", free: false, pro: true },
  { label: "Revision & delivery systems", free: false, pro: true }
];

function PriceCell({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <span className="pfb-pc-yes">
        <Check size={15} strokeWidth={2} />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="pfb-pc-no">
        <Minus size={15} strokeWidth={2} />
      </span>
    );
  }
  return <span className="pfb-pc-num">{value}</span>;
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

  return (
    <main id="top">
      {/* HERO */}
      <section className="pfb-shell pfb-hero">
        <span className="pfb-eyebrow">v1.0 / for editors</span>
        <h1 className="pfb-hero-title">Folders before footage.</h1>
        <p className="pfb-hero-sub">
          Pick a project type, drop in the job details, and pull down a clean, named ZIP —
          folders, checklists, and naming rules already in place.
        </p>
        <div className="pfb-hero-meta">
          <span>
            <b>{freeCount}</b> free templates
          </span>
          <i className="pfb-dot" />
          <span>
            <b>{proCount}</b> pro packs
          </span>
          <i className="pfb-dot" />
          <span>browser-side ZIP</span>
        </div>
      </section>

      {/* WORKSPACE */}
      <section className="pfb-shell pfb-workspace">
        <div className="pfb-col-templates">
          <div className="pfb-col-head">
            <h2 className="pfb-col-title">Choose a template</h2>
            <span className="pfb-col-count">
              {freeCount} free · {proCount} pro
            </span>
          </div>
          <div className="pfb-grid">
            {templates.map((tpl) => (
              <TemplateCard
                key={tpl.id}
                template={tpl}
                selected={tpl.id === selected.id}
                premiumUnlocked={premiumUnlocked}
                onSelect={() => setSelectedId(tpl.id)}
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

      {/* PRICING */}
      <section id="pricing" className="pfb-shell pfb-pricing">
        <div className="pfb-pricing-head">
          <span className="pfb-eyebrow">pricing / two tiers</span>
          <h2 className="pfb-section-title">Free to start. Pro when it pays.</h2>
        </div>
        <div className="pfb-compare" role="table" aria-label="Free versus Pro comparison">
          <div className="pfb-compare-header" role="row">
            <div className="pfb-compare-feat" role="columnheader" />
            <div className="pfb-compare-col" role="columnheader">
              <span className="pfb-tier-name">FREE</span>
              <span className="pfb-tier-price">$0</span>
              <span className="pfb-tier-sub">students &amp; new editors</span>
            </div>
            <div className="pfb-compare-col pfb-compare-col-pro" role="columnheader">
              <span className="pfb-tier-name">PRO</span>
              <span className="pfb-tier-price">
                $9<em>/mo</em>
              </span>
              <span className="pfb-tier-sub">freelancers &amp; agencies</span>
            </div>
          </div>
          {PRICING_ROWS.map((row, i) => (
            <div className="pfb-compare-row" role="row" key={i}>
              <div className="pfb-compare-feat" role="cell">
                {row.label}
              </div>
              <div className="pfb-compare-col" role="cell">
                <PriceCell value={row.free} />
              </div>
              <div className="pfb-compare-col pfb-compare-col-pro" role="cell">
                <PriceCell value={row.pro} />
              </div>
            </div>
          ))}
          <div className="pfb-compare-foot" role="row">
            <div className="pfb-compare-feat" role="cell" />
            <div className="pfb-compare-col" role="cell">
              <a href="#top" className="pfb-btn pfb-btn-ghost pfb-btn-sm">
                Use free
              </a>
            </div>
            <div className="pfb-compare-col pfb-compare-col-pro" role="cell">
              <a href={gumroadUrl} className="pfb-btn pfb-btn-accent pfb-btn-sm">
                Get Pro
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useMemo, useState } from "react";
import { Check, Sparkles } from "lucide-react";
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

export default function HomePage() {
  const templates = useMemo<TemplateSpec[]>(() => [...freeTemplates, ...premiumTemplates], []);
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
  const selected = templates.find((template) => template.id === selectedId) || templates[0];

  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-200">
            <Sparkles size={14} />
            Video project setup in one click
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Build clean project folders before the edit gets messy.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Pick a project type, enter the job details, and download a ready-to-use ZIP with professional folders, checklists, and naming rules.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Choose a template</h2>
              <span className="text-sm text-slate-400">{freeTemplates.length} free, {premiumTemplates.length} premium</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {templates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  selected={template.id === selected.id}
                  onSelect={() => setSelectedId(template.id)}
                  premiumUnlocked={premiumUnlocked}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <AuthPanel onProfileChange={setProfile} />
            <ProjectMetadataForm metadata={metadata} onChange={setMetadata} />
            {notice && (
              <div className="rounded-xl border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
                {notice}
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
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
            <h2 className="text-2xl font-bold">Free</h2>
            <p className="mt-2 text-slate-400">For students and new editors getting organized.</p>
            <p className="mt-5 text-4xl font-bold">$0</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              {["8 starter templates", "Browser-side ZIP generation", "Naming sanitizer", "Markdown checklists"].map((item) => (
                <li key={item} className="flex items-center gap-2"><Check size={16} className="text-emerald-300" />{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-6 shadow-glow">
            <h2 className="text-2xl font-bold">Pro</h2>
            <p className="mt-2 text-slate-300">For freelancers and agency-style workflows.</p>
            <p className="mt-5 text-4xl font-bold">$9<span className="text-base font-normal text-slate-400">/mo</span></p>
            <ul className="mt-6 space-y-3 text-sm text-slate-200">
              {["Premium agency templates", "Premiere and DaVinci starter assets", "Client admin folders", "Revision and delivery systems"].map((item) => (
                <li key={item} className="flex items-center gap-2"><Check size={16} className="text-emerald-300" />{item}</li>
              ))}
            </ul>
            <a
              href={process.env.NEXT_PUBLIC_GUMROAD_PRODUCT_URL || "/dashboard"}
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-slate-100"
            >
              Buy Pro on Gumroad
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BadgeCheck, ExternalLink, LogOut, ShieldCheck, Trash2 } from "lucide-react";
import {
  AccountProfile,
  auth,
  isFirebaseConfigured,
  readAccountProfile,
  signOutUser,
  subscribeToAuthState
} from "@/lib/firebaseClient";
import { clearHistory, DownloadEntry, readHistory } from "@/lib/history";

function maskKey(key: string | undefined): string {
  if (!key) return "—";
  const trimmed = key.trim();
  if (trimmed.length <= 8) return "•••• " + trimmed.slice(-4);
  return trimmed.slice(0, 4) + " •••• •••• " + trimmed.slice(-4);
}

function formatWhen(ms: number): string {
  const d = new Date(ms);
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<AccountProfile | null>(null);
  const [history, setHistory] = useState<DownloadEntry[]>([]);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const gumroadProductUrl = process.env.NEXT_PUBLIC_GUMROAD_PRODUCT_URL;

  useEffect(() => {
    setHistory(readHistory());
  }, []);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }
    return subscribeToAuthState(async (user) => {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }
      try {
        const p = await readAccountProfile(user.uid);
        setProfile(p);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  async function handleSignOut() {
    try {
      await signOutUser();
    } catch {
      // ignore
    }
  }

  function handleClearHistory() {
    clearHistory();
    setHistory([]);
  }

  const isPro = Boolean(profile?.isPro);

  return (
    <main className="pfb-shell" style={{ paddingTop: 64, paddingBottom: 96, maxWidth: 880 }}>
      <span className="pfb-eyebrow">dashboard / account</span>
      <h1
        style={{
          margin: "12px 0 0",
          fontSize: "clamp(32px, 5vw, 48px)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1.05
        }}
      >
        Your account.
      </h1>
      <p
        style={{
          marginTop: 16,
          fontSize: 16,
          lineHeight: 1.6,
          color: "var(--text-2)",
          maxWidth: "56ch"
        }}
      >
        Pro status, Gumroad license, and the last 20 ZIPs you generated on this device.
      </p>

      {/* Account panel */}
      <div className="pfb-panel" style={{ marginTop: 32 }}>
        <div className="pfb-panel-head">
          <h2 className="pfb-panel-title">Account</h2>
          <span className={"pfb-account-badge " + (isPro ? "is-pro" : "")}>
            {isPro ? <BadgeCheck size={13} /> : <ShieldCheck size={13} />}
            {isPro ? "PRO" : "FREE"}
          </span>
        </div>

        {!isFirebaseConfigured ? (
          <p className="pfb-panel-sub" style={{ marginTop: 12 }}>
            Firebase is not configured. Account sign-in is disabled in this build.
          </p>
        ) : loading ? (
          <p className="pfb-panel-sub" style={{ marginTop: 12 }}>Checking session…</p>
        ) : !profile ? (
          <div style={{ marginTop: 14 }}>
            <p className="pfb-panel-sub">You&rsquo;re not signed in.</p>
            <Link href="/" className="pfb-btn pfb-btn-accent" style={{ marginTop: 14 }}>
              Go to sign-in
            </Link>
          </div>
        ) : (
          <div className="pfb-dash-grid">
            <DashRow label="Email" value={profile.email || "—"} />
            <DashRow label="UID" mono value={auth?.currentUser?.uid || "—"} />
            <DashRow
              label="License key"
              mono
              value={isPro ? maskKey(profile.gumroadLicenseKey) : "Not verified"}
            />
            <DashRow
              label="Pro product"
              value={profile.gumroadProductName || (isPro ? "Project Folder Builder Pro" : "—")}
            />
            <div className="pfb-dash-actions">
              {gumroadProductUrl && isPro && (
                <a
                  href={gumroadProductUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="pfb-btn pfb-btn-ghost"
                >
                  <ExternalLink size={14} />
                  Open Gumroad purchase
                </a>
              )}
              <button type="button" className="pfb-btn pfb-btn-ghost" onClick={handleSignOut}>
                <LogOut size={14} />
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Download history */}
      <div className="pfb-panel" style={{ marginTop: 18 }}>
        <div className="pfb-panel-head">
          <h2 className="pfb-panel-title">Recent downloads</h2>
          <span className="pfb-panel-tag">
            local · last {history.length || 0}
          </span>
        </div>
        <p className="pfb-panel-sub" style={{ marginTop: 6 }}>
          Stored in your browser only. Up to 20 entries.
        </p>

        {history.length === 0 ? (
          <p
            style={{
              marginTop: 18,
              padding: "20px 16px",
              borderRadius: 10,
              border: "1px dashed var(--hairline)",
              fontSize: 13,
              color: "var(--text-3)",
              textAlign: "center"
            }}
          >
            No downloads yet — your ZIPs will show up here.
          </p>
        ) : (
          <>
            <div className="pfb-dash-table" role="table">
              <div className="pfb-dash-thead" role="row">
                <div role="columnheader">Template</div>
                <div role="columnheader">Project</div>
                <div role="columnheader">When</div>
              </div>
              {history.map((entry, i) => (
                <div className="pfb-dash-trow" role="row" key={i}>
                  <div role="cell">
                    <span className="pfb-dash-tier">
                      <span
                        className={
                          "pfb-chip " + (entry.tier === "premium" ? "pfb-chip-pro" : "pfb-chip-free")
                        }
                      >
                        {entry.tier === "premium" ? "PRO" : "FREE"}
                      </span>
                      <span>{entry.templateName}</span>
                    </span>
                  </div>
                  <div role="cell" className="pfb-dash-cell-mono">
                    {entry.projectName} <span style={{ color: "var(--text-3)" }}>·</span>{" "}
                    {entry.clientName}
                  </div>
                  <div role="cell" className="pfb-dash-cell-mono pfb-dash-cell-dim">
                    {formatWhen(entry.at)}
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="pfb-btn pfb-btn-ghost"
              onClick={handleClearHistory}
              style={{ marginTop: 16 }}
            >
              <Trash2 size={14} />
              Clear history
            </button>
          </>
        )}
      </div>

      <Link
        href="/"
        style={{
          marginTop: 26,
          display: "inline-block",
          fontFamily: "var(--mono)",
          fontSize: 12,
          letterSpacing: "0.06em",
          color: "var(--text-3)",
          textDecoration: "none"
        }}
      >
        ← Back to the builder
      </Link>
    </main>
  );
}

function DashRow({
  label,
  value,
  mono
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="pfb-dash-row">
      <span className="pfb-dash-row-label">{label}</span>
      <span className={"pfb-dash-row-value" + (mono ? " is-mono" : "")}>{value}</span>
    </div>
  );
}

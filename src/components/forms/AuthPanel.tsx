"use client";

import { FormEvent, useEffect, useState } from "react";
import { AlertTriangle, BadgeCheck, Check, Key, LogOut, ShieldCheck } from "lucide-react";
import {
  AccountProfile,
  auth,
  createAccountWithEmail,
  isFirebaseConfigured,
  readAccountProfile,
  signInWithEmail,
  signInWithGoogle,
  signOutUser,
  subscribeToAuthState
} from "@/lib/firebaseClient";
import { trackEvent } from "@/lib/analytics";

type Props = {
  onProfileChange: (profile: AccountProfile | null) => void;
};

function GoogleGlyph({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#0A0C10"
        d="M21.35 11.1H12v3.8h5.35c-.23 1.5-1.6 4.4-5.35 4.4a6.3 6.3 0 0 1 0-12.6c1.8 0 3 .77 3.7 1.43l2.5-2.42C16.6 3.9 14.5 3 12 3a9 9 0 1 0 0 18c5.2 0 8.6-3.65 8.6-8.8 0-.6-.06-1.04-.15-1.5z"
      />
    </svg>
  );
}

function StepNum({ n, done }: { n: number; done?: boolean }) {
  return (
    <span className={"pfb-step-num" + (done ? " is-done" : "")}>
      {done ? <Check size={13} strokeWidth={2.2} /> : n}
    </span>
  );
}

export function AuthPanel({ onProfileChange }: Props) {
  const gumroadProductUrl = process.env.NEXT_PUBLIC_GUMROAD_PRODUCT_URL;
  const [profile, setProfile] = useState<AccountProfile | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [licenseKey, setLicenseKey] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    return subscribeToAuthState(async (user) => {
      setMessage("");

      if (!user) {
        setProfile(null);
        onProfileChange(null);
        return;
      }

      try {
        const accountProfile = await readAccountProfile(user.uid);
        setProfile(accountProfile);
        onProfileChange(accountProfile);
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Unable to load account profile.");
      }
    });
  }, [onProfileChange]);

  async function refreshProfile() {
    const user = auth?.currentUser;
    if (!user) return;
    const accountProfile = await readAccountProfile(user.uid);
    setProfile(accountProfile);
    onProfileChange(accountProfile);
  }

  async function runAuthAction(action: () => Promise<unknown>, successMessage: string, kind?: string) {
    setBusy(true);
    setMessage("");
    if (kind) trackEvent("signin_started", { kind });
    try {
      await action();
      await refreshProfile();
      setMessage(successMessage);
      if (kind) trackEvent("signin_succeeded", { kind });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Account action failed.");
      if (kind) trackEvent("signin_failed", { kind });
    } finally {
      setBusy(false);
    }
  }

  async function handleEmailSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await runAuthAction(() => signInWithEmail(email.trim(), password), "Signed in.", "email");
  }

  async function handleCreateAccount() {
    await runAuthAction(
      () => createAccountWithEmail(email.trim(), password),
      "Account created.",
      "email-create"
    );
  }

  async function verifyLicense() {
    const trimmedLicenseKey = licenseKey.trim();
    if (!trimmedLicenseKey) {
      setMessage("Enter your Gumroad license key.");
      return;
    }
    const user = auth?.currentUser;
    if (!user) {
      setMessage("Sign in before verifying your Gumroad license.");
      return;
    }
    setBusy(true);
    setMessage("");
    try {
      const token = await user.getIdToken();
      const response = await fetch("/api/gumroad/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ licenseKey: trimmedLicenseKey })
      });
      const result = (await response.json()) as { error?: string; productName?: string };

      if (!response.ok) {
        throw new Error(result.error || "Unable to verify Gumroad license.");
      }

      await refreshProfile();
      setMessage(`Pro unlocked${result.productName ? ` for ${result.productName}` : ""}.`);
      trackEvent("license_verified", { productName: result.productName ?? null });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to verify Gumroad license.");
      trackEvent("license_verify_failed");
    } finally {
      setBusy(false);
    }
  }

  if (!isFirebaseConfigured) {
    return (
      <div className="pfb-panel">
        <div className="pfb-panel-head">
          <h2 className="pfb-panel-title">Pro unlock</h2>
          <span className="pfb-panel-tag">offline</span>
        </div>
        <div className="pfb-notice" style={{ marginTop: 14 }}>
          <AlertTriangle size={15} />
          <span>
            Free templates still work without sign-in. Add Firebase public environment variables to
            enable account sign-in and Gumroad Pro unlocks.
          </span>
        </div>
      </div>
    );
  }

  const signedIn = Boolean(profile);
  const isPro = Boolean(profile?.isPro);

  return (
    <div className="pfb-panel">
      <div className="pfb-panel-head">
        <h2 className="pfb-panel-title">Pro unlock</h2>
        <span className={"pfb-account-badge " + (isPro ? "is-pro" : "")}>
          {isPro ? <BadgeCheck size={13} /> : <ShieldCheck size={13} />}
          {isPro ? "PRO" : "FREE"}
        </span>
      </div>
      <p className="pfb-panel-sub">
        {signedIn
          ? profile?.email
          : "Free ZIPs need no account. Sign in only to verify a Pro license."}
      </p>

      {!signedIn && (
        <div className="pfb-step">
          <div className="pfb-step-head">
            <StepNum n={1} />
            <span>Sign in for Pro</span>
          </div>
          <div className="pfb-step-body">
            <button
              type="button"
              className="pfb-btn pfb-btn-light"
              onClick={() => runAuthAction(signInWithGoogle, "Signed in with Google.", "google")}
              disabled={busy}
            >
              <GoogleGlyph size={17} />
              Continue with Google
            </button>
            <div className="pfb-or">
              <span>or email</span>
            </div>
            <form className="pfb-stack" onSubmit={handleEmailSignIn}>
              <input
                className="pfb-input"
                type="email"
                placeholder="Email"
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="pfb-input"
                type="password"
                placeholder="Password"
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="pfb-form-row">
                <button type="submit" className="pfb-btn pfb-btn-accent" disabled={busy}>
                  Sign in
                </button>
                <button
                  type="button"
                  className="pfb-btn pfb-btn-ghost"
                  onClick={handleCreateAccount}
                  disabled={busy}
                >
                  Create account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {signedIn && !isPro && (
        <div className="pfb-step">
          <div className="pfb-step-head">
            <StepNum n={1} done />
            <span>Signed in</span>
          </div>
          <div className="pfb-step-head pfb-step-head-2">
            <StepNum n={2} />
            <span>Verify Gumroad license</span>
          </div>
          <div className="pfb-step-body">
            {gumroadProductUrl ? (
              <a
                href={gumroadProductUrl}
                target="_blank"
                rel="noreferrer"
                className="pfb-btn pfb-btn-light"
              >
                Buy one-time Pro unlock
              </a>
            ) : (
              <button type="button" className="pfb-btn pfb-btn-ghost" disabled>
                Gumroad URL not configured
              </button>
            )}
            <div className="pfb-license">
              <span className="pfb-license-ic">
                <Key size={15} />
              </span>
              <input
                className="pfb-input pfb-mono-input pfb-license-input"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value.toUpperCase())}
              />
            </div>
            <button
              type="button"
              className="pfb-btn pfb-btn-accent"
              onClick={verifyLicense}
              disabled={busy}
            >
              Verify license
            </button>
          </div>
        </div>
      )}

      {isPro && (
        <div className="pfb-step">
          <div className="pfb-step-head">
            <StepNum n={1} done />
            <span>Signed in</span>
          </div>
          <div className="pfb-step-head pfb-step-head-2">
            <StepNum n={2} done />
            <span>Pro verified</span>
          </div>
        </div>
      )}

      {signedIn && (
        <button
          type="button"
          className="pfb-btn pfb-btn-ghost pfb-signout"
          onClick={() => runAuthAction(signOutUser, "Signed out.")}
          disabled={busy}
          style={{ width: "100%" }}
        >
          <LogOut size={15} />
          Sign out
        </button>
      )}

      {message && <p className="pfb-auth-msg">{message}</p>}
    </div>
  );
}

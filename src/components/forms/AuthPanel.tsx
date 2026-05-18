"use client";

import { FormEvent, useEffect, useState } from "react";
import { AlertTriangle, BadgeCheck, LogOut, Mail, ShieldCheck } from "lucide-react";
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

type Props = {
  onProfileChange: (profile: AccountProfile | null) => void;
};

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
    if (!user) {
      return;
    }

    const accountProfile = await readAccountProfile(user.uid);
    setProfile(accountProfile);
    onProfileChange(accountProfile);
  }

  async function runAuthAction(action: () => Promise<unknown>, successMessage: string) {
    setBusy(true);
    setMessage("");

    try {
      await action();
      await refreshProfile();
      setMessage(successMessage);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Account action failed.");
    } finally {
      setBusy(false);
    }
  }

  async function handleEmailAuth(event: FormEvent<HTMLFormElement>, mode: "signIn" | "create") {
    event.preventDefault();
    const action =
      mode === "create"
        ? () => createAccountWithEmail(email.trim(), password)
        : () => signInWithEmail(email.trim(), password);

    await runAuthAction(action, mode === "create" ? "Account created." : "Signed in.");
  }

  async function handleCreateAccount() {
    await runAuthAction(
      () => createAccountWithEmail(email.trim(), password),
      "Account created."
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
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to verify Gumroad license.");
    } finally {
      setBusy(false);
    }
  }

  if (!isFirebaseConfigured) {
    return (
      <section className="rounded-2xl border border-amber-400/25 bg-amber-400/10 p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-1 text-amber-200" size={18} />
          <div>
            <h2 className="font-semibold text-amber-100">Accounts are not configured</h2>
            <p className="mt-2 text-sm leading-6 text-amber-50/80">
              Add the Firebase public environment variables to enable sign-in and Gumroad Pro unlocks.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Account</h2>
          <p className="mt-1 text-sm text-slate-400">
            {profile?.email || "Sign in to unlock Pro templates."}
          </p>
        </div>
        <span className={[
          "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
          profile?.isPro ? "bg-emerald-400/15 text-emerald-200" : "bg-white/10 text-slate-300"
        ].join(" ")}>
          {profile?.isPro ? <BadgeCheck size={14} /> : <ShieldCheck size={14} />}
          {profile?.isPro ? "Pro" : "Free"}
        </span>
      </div>

      {!profile ? (
        <div className="mt-5 space-y-4">
          <button
            type="button"
            onClick={() => runAuthAction(signInWithGoogle, "Signed in with Google.")}
            disabled={busy}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white px-4 py-3 font-semibold text-black transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Mail size={17} />
            Sign in with Google
          </button>

          <form className="space-y-3" onSubmit={(event) => handleEmailAuth(event, "signIn")}>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              autoComplete="email"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none ring-emerald-400/40 transition focus:ring-2"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none ring-emerald-400/40 transition focus:ring-2"
              required
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="submit"
                disabled={busy}
                className="rounded-xl bg-emerald-400 px-4 py-3 font-semibold text-black transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-70"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={handleCreateAccount}
                disabled={busy}
                className="rounded-xl border border-white/10 px-4 py-3 font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          {!profile.isPro && (
            <>
              {gumroadProductUrl ? (
                <a
                  href={gumroadProductUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-3 font-semibold text-black transition hover:bg-slate-100"
                >
                  Buy Pro on Gumroad
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="w-full cursor-not-allowed rounded-xl bg-white/20 px-4 py-3 font-semibold text-slate-400"
                >
                  Gumroad URL not configured
                </button>
              )}
              <div className="space-y-3">
                <input
                  type="text"
                  value={licenseKey}
                  onChange={(event) => setLicenseKey(event.target.value)}
                  placeholder="Gumroad license key"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none ring-emerald-400/40 transition focus:ring-2"
                />
                <button
                  type="button"
                  onClick={verifyLicense}
                  disabled={busy}
                  className="w-full rounded-xl bg-emerald-400 px-4 py-3 font-semibold text-black transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  Verify License
                </button>
              </div>
            </>
          )}

          <button
            type="button"
            onClick={() => runAuthAction(signOutUser, "Signed out.")}
            disabled={busy}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <LogOut size={17} />
            Sign Out
          </button>
        </div>
      )}

      {message && (
        <p className="mt-4 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300">
          {message}
        </p>
      )}
    </section>
  );
}

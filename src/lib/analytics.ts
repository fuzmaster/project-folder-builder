"use client";

import { track } from "@vercel/analytics";

type EventName =
  | "template_selected"
  | "zip_downloaded"
  | "signin_started"
  | "signin_succeeded"
  | "signin_failed"
  | "license_verified"
  | "license_verify_failed"
  | "wizard_opened"
  | "wizard_completed"
  | "wizard_skipped"
  | "pricing_cta_clicked";

export function trackEvent(name: EventName, props?: Record<string, string | number | boolean | null>) {
  try {
    track(name, props ?? {});
  } catch {
    // analytics is best-effort
  }
}

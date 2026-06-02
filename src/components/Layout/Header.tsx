"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <span className="pfb-logo" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      >
        <rect x="2.5" y="2.5" width="19" height="19" rx="4" />
        <path d="M6.5 9.5a1 1 0 0 1 1-1H10l1.2 1.4H16.5a1 1 0 0 1 1 1v4.6a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1z" />
      </svg>
    </span>
  );
}

function openWizard() {
  window.dispatchEvent(new CustomEvent("pfb:open-wizard"));
}

export function Header() {
  return (
    <header className="pfb-header">
      <div className="pfb-shell pfb-header-inner">
        <Link href="/" className="pfb-wordmark">
          <LogoMark size={30} />
          <span className="pfb-wordmark-text">PROJECT FOLDER BUILDER</span>
        </Link>
        <nav className="pfb-nav">
          <button
            type="button"
            onClick={openWizard}
            className="pfb-nav-quick"
            aria-label="Open quick-start wizard"
          >
            <Sparkles size={12} />
            Quick start
          </button>
          <span className="pfb-nav-ver">v1.0</span>
          <Link href="/dashboard">Dashboard</Link>
          <a href="#pricing">Pricing</a>
        </nav>
      </div>
    </header>
  );
}

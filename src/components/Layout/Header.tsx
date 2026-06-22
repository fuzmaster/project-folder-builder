"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <span className="pfb-logo" style={{ width: size, height: size }}>
      <img
        src="/logo-mark.svg"
        alt=""
        width={size}
        height={size}
        className="pfb-logo-img"
      />
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

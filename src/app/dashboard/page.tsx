export default function DashboardPage() {
  return (
    <main className="pfb-shell" style={{ paddingTop: 64, paddingBottom: 96, maxWidth: 760 }}>
      <span className="pfb-eyebrow">dashboard / pro flow</span>
      <h1
        style={{
          margin: "12px 0 0",
          fontSize: "clamp(32px, 5vw, 48px)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1.05
        }}
      >
        Pro unlocks &amp; account.
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
        Firebase handles accounts, Firestore stores Pro status, and Gumroad handles payment and
        license keys. The free generator still works fully in the browser without authentication.
      </p>

      <div className="pfb-panel" style={{ marginTop: 32 }}>
        <div className="pfb-panel-head">
          <h2 className="pfb-panel-title">Pro unlock flow</h2>
          <span className="pfb-panel-tag">gumroad</span>
        </div>
        <p className="pfb-panel-sub" style={{ marginTop: 10 }}>
          Buy Pro on Gumroad, sign in with Firebase, paste your Gumroad license key. The server
          verifies the Firebase ID token and the Gumroad license, then writes{" "}
          <code
            style={{
              fontFamily: "var(--mono)",
              fontSize: 12,
              background: "var(--surface-2)",
              padding: "2px 6px",
              borderRadius: 5,
              border: "1px solid var(--hairline)"
            }}
          >
            users/&#123;uid&#125;.isPro
          </code>{" "}
          so premium templates unlock.
        </p>
        <a
          href={process.env.NEXT_PUBLIC_GUMROAD_PRODUCT_URL || "/"}
          className="pfb-btn pfb-btn-accent"
          style={{ marginTop: 18 }}
        >
          Buy Pro on Gumroad
        </a>
      </div>
    </main>
  );
}

export function Footer() {
  return (
    <footer
      className="jbd-backlink-footer"
      style={{
        boxSizing: "border-box",
        width: "100%",
        background: "#050607",
        borderTop: "1px solid rgba(0,255,200,0.18)",
        padding: "1.5rem 1.25rem",
        fontFamily:
          "'JetBrains Mono','SF Mono',Consolas,monospace"
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: ".6rem 1.5rem",
          flexWrap: "wrap"
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: ".72rem",
            letterSpacing: ".06em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,.5)"
          }}
        >
          Built by{" "}
          <a
            href="https://jacobbritten.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#00FFC8", textDecoration: "none" }}
          >
            Jacob Britten
          </a>{" "}
          &mdash; Media Systems Architect
        </p>
        <nav
          aria-label="Jacob Britten"
          style={{
            display: "flex",
            gap: "1.25rem",
            flexWrap: "wrap"
          }}
        >
          {[
            { href: "https://jacobbritten.com", label: "Portfolio" },
            { href: "https://jacobbritten.com/projects.html", label: "Projects" },
            { href: "https://jacobbritten.com/lab.html", label: "The Lab" },
            { href: "https://ko-fi.com/jacobbritten", label: "Ko-fi" },
            {
              href: "https://www.paypal.com/donate/?hosted_button_id=47A4JJ4WNBY9U",
              label: "PayPal"
            }
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: ".68rem",
                letterSpacing: ".07em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,.72)",
                textDecoration: "none",
                transition: "color .2s"
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

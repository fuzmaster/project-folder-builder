import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Project Folder Builder — Folders before footage.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TREE_LINES: { indent: number; connector: string; name: string; type: "folder" | "file" }[] = [
  { indent: 0, connector: "",      name: "2026-06_demo-client_first-client-edit/", type: "folder" },
  { indent: 1, connector: "├── ",  name: "01_SOURCE_MEDIA/", type: "folder" },
  { indent: 2, connector: "│   ├── ", name: "01_CAMERA/", type: "folder" },
  { indent: 2, connector: "│   ├── ", name: "02_AUDIO/", type: "folder" },
  { indent: 2, connector: "│   └── ", name: "03_SCREEN/", type: "folder" },
  { indent: 1, connector: "├── ",  name: "02_PROJECT_FILES/", type: "folder" },
  { indent: 1, connector: "├── ",  name: "03_ASSETS/", type: "folder" },
  { indent: 1, connector: "├── ",  name: "06_EXPORTS/", type: "folder" },
  { indent: 1, connector: "├── ",  name: "07_CLIENT_NOTES/", type: "folder" },
  { indent: 2, connector: "│   └── ", name: "delivery-checklist.md", type: "file" },
  { indent: 1, connector: "└── ",  name: "README.md", type: "file" }
];

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "radial-gradient(800px 500px at 12% 0%, rgba(0,255,200,0.18), transparent 60%), #050607",
          color: "#F8FAFC",
          fontFamily: "system-ui, sans-serif",
          padding: "72px 80px",
          position: "relative"
        }}
      >
        {/* Hairline grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            opacity: 0.6
          }}
        />

        {/* Top bar */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 80,
            right: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: "0.22em",
            color: "rgba(255,255,255,0.55)",
            textTransform: "uppercase"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#00FFC8" strokeWidth="1.5" strokeLinejoin="round">
              <rect x="2.5" y="2.5" width="19" height="19" rx="4" />
              <path d="M6.5 9.5a1 1 0 0 1 1-1H10l1.2 1.4H16.5a1 1 0 0 1 1 1v4.6a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1z" />
            </svg>
            <span style={{ color: "#F8FAFC" }}>PROJECT FOLDER BUILDER</span>
          </div>
          <span style={{ color: "#00FFC8" }}>V1.0 / FOR EDITORS</span>
        </div>

        {/* Left: title block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "58%",
            marginTop: 40,
            position: "relative"
          }}
        >
          <span style={{ fontSize: 18, letterSpacing: "0.22em", color: "#00FFC8", textTransform: "uppercase", marginBottom: 18 }}>
            video editors · zip generator
          </span>
          <div
            style={{
              fontSize: 116,
              fontWeight: 700,
              lineHeight: 0.96,
              letterSpacing: "-0.04em",
              color: "#F8FAFC",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <span>Folders</span>
            <span>before</span>
            <span>footage.</span>
          </div>
          <p
            style={{
              fontSize: 24,
              color: "#94A3B8",
              maxWidth: 540,
              marginTop: 32,
              lineHeight: 1.4
            }}
          >
            Generate clean video editing project folders as ready-to-use ZIPs in seconds. Free templates need no login.
          </p>
        </div>

        {/* Right: tree silhouette card */}
        <div
          style={{
            position: "absolute",
            top: 130,
            right: 80,
            width: 440,
            display: "flex",
            flexDirection: "column",
            background: "#06080D",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 18,
            overflow: "hidden",
            boxShadow: "0 0 80px -20px rgba(0,255,200,0.35)"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 20px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              fontSize: 14,
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.4)",
              textTransform: "uppercase"
            }}
          >
            <span
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 6,
                padding: "3px 9px",
                fontSize: 12,
                color: "rgba(255,255,255,0.5)"
              }}
            >
              TREE
            </span>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>18 dir · 3 files</span>
          </div>
          <div style={{ padding: "18px 20px 22px", display: "flex", flexDirection: "column" }}>
            {TREE_LINES.map((line, i) => (
              <div key={i} style={{ display: "flex", alignItems: "baseline", fontSize: 18, lineHeight: 1.7, whiteSpace: "pre" }}>
                <span style={{ color: "#2C3645", width: 28, fontSize: 14, textAlign: "right", marginRight: 12 }}>{i + 1}</span>
                <span style={{ color: "#2F3A49" }}>{line.connector}</span>
                <span style={{ color: line.indent === 0 ? "#00FFC8" : line.type === "folder" ? "#CBD5E1" : "#5B677A", fontWeight: line.indent === 0 ? 600 : 400 }}>
                  {line.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer line */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 80,
            right: 80,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 16,
            letterSpacing: "0.14em",
            color: "rgba(255,255,255,0.4)",
            textTransform: "uppercase",
            borderTop: "1px solid rgba(0,255,200,0.18)",
            paddingTop: 22
          }}
        >
          <span>8 free templates · 3 pro packs · browser-side ZIP</span>
          <span style={{ color: "#00FFC8" }}>jacobbritten.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

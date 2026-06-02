import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#050607",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 36
        }}
      >
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#00FFC8" strokeWidth="1.7" strokeLinejoin="round">
          <rect x="2.5" y="2.5" width="19" height="19" rx="4" />
          <path d="M6.5 9.5a1 1 0 0 1 1-1H10l1.2 1.4H16.5a1 1 0 0 1 1 1v4.6a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1z" />
        </svg>
      </div>
    ),
    { ...size }
  );
}

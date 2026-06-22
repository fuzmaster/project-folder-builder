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
        <svg width="124" height="124" viewBox="0 0 64 64" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M8 18.5c0-3 2.4-5.5 5.5-5.5h11.2l5.1 6h20.7c3 0 5.5 2.4 5.5 5.5v22c0 3-2.4 5.5-5.5 5.5h-37C10.4 52 8 49.6 8 46.5z"
            stroke="#edece2"
            strokeWidth="4.5"
          />
          <path
            d="M19.5 29.5v13l10.5-6.5z"
            fill="#edece2"
            stroke="#edece2"
            strokeWidth="2"
          />
          <path d="M34 31h11" stroke="#46b06a" strokeWidth="4" />
          <path d="M34 39h16" stroke="#edece2" strokeWidth="4" />
          <path d="M42 27v18" stroke="#46b06a" strokeWidth="3" />
          <path d="M42 35h8" stroke="#46b06a" strokeWidth="3" />
          <path d="M42 43h6" stroke="#46b06a" strokeWidth="3" />
        </svg>
      </div>
    ),
    { ...size }
  );
}

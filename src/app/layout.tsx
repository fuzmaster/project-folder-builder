import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap"
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap"
});

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://project-folder-builder.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Project Folder Builder - Folders before footage",
    template: "%s | Project Folder Builder"
  },
  description:
    "Generate clean video editing project folders as ready-to-use ZIPs in seconds. Free templates need no login.",
  keywords: [
    "video editing folder structure",
    "project folder template",
    "Premiere Pro folder template",
    "DaVinci Resolve project structure",
    "Final Cut Pro folder template",
    "video project organization",
    "freelance video editor tools",
    "YouTube editing workflow",
    "podcast editing folders",
    "wedding film project folder",
    "video editor template generator"
  ],
  authors: [{ name: "Jacob Britten", url: "https://jacobbritten.com" }],
  creator: "Jacob Britten",
  publisher: "Jacob Britten",
  category: "Productivity",
  applicationName: "Project Folder Builder",
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Project Folder Builder",
    title: "Project Folder Builder - Folders before footage",
    description:
      "Generate clean video editing project folders as ready-to-use ZIPs in seconds. Runs in your browser, and free templates need no login.",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Folder Builder - Folders before footage",
    description:
      "Generate clean video editing project folders as ready-to-use ZIPs in seconds.",
    creator: "@jacobbritten"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

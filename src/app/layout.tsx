import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
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

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://project-folder-builder.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Project Folder Builder — Professional Video Editing Folder Templates",
    template: "%s | Project Folder Builder"
  },
  description:
    "Generate professional video editing project folders as a ZIP in seconds. Free templates for YouTube, podcasts, weddings, students, and clients. Pro templates for agencies and freelancers.",
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
    title: "Project Folder Builder — Professional Video Editing Folder Templates",
    description:
      "Pick a project type, enter the job details, and download a ready-to-use ZIP with professional folders, checklists, and naming rules.",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Folder Builder",
    description:
      "Free + Pro video editing folder templates. Download a clean project structure as a ZIP in one click.",
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
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Project Folder Builder",
    short_name: "Folder Builder",
    description:
      "Generate clean video editing project folders as ready-to-use ZIPs in seconds.",
    start_url: "/",
    display: "standalone",
    background_color: "#050607",
    theme_color: "#050607",
    icons: [
      {
        src: "/logo-mark.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any"
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  };
}

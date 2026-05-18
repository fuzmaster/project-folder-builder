import { TemplateSpec } from "@/types";

const premiumReadme = `# Premium Template: {{projectName}}

Client: {{clientName}}
Client ID: {{clientId}}
Project Date: {{projectDate}}
Editor: {{editorName}}

This premium folder pack includes expanded delivery, review, billing, and NLE starter-file folders.
`;

const nleNotice = `This is a lightweight starter marker file.

In production, replace this file with your real .prproj or .drp starter project.
This app gates these premium starter assets behind the paid session check.
`;

export const premiumTemplates: TemplateSpec[] = [
  {
    id: "agency-video-campaign",
    name: "Agency Video Campaign",
    shortName: "Agency",
    tier: "premium",
    category: "Premium",
    description: "A full campaign structure for agencies handling briefs, production assets, approval rounds, exports, and billing.",
    idealFor: "Small agencies, freelancers moving upmarket, and client-facing editors.",
    includesNleFiles: true,
    folders: [
      "00_ADMIN/01_CONTRACT",
      "00_ADMIN/02_SCOPE",
      "00_ADMIN/03_INVOICE",
      "01_BRIEF/01_CLIENT_INPUT",
      "01_BRIEF/02_CREATIVE_DIRECTION",
      "01_BRIEF/03_APPROVALS",
      "02_SOURCE_MEDIA/01_CAMERA",
      "02_SOURCE_MEDIA/02_AUDIO",
      "02_SOURCE_MEDIA/03_STOCK",
      "02_SOURCE_MEDIA/04_CLIENT_ASSETS",
      "03_PROJECT_FILES/01_PREMIERE",
      "03_PROJECT_FILES/02_DAVINCI",
      "03_PROJECT_FILES/03_AFTER_EFFECTS",
      "04_ASSETS/01_BRAND",
      "04_ASSETS/02_MUSIC",
      "04_ASSETS/03_SFX",
      "04_ASSETS/04_GRAPHICS",
      "05_REVIEW/01_INTERNAL",
      "05_REVIEW/02_CLIENT",
      "06_EXPORTS/01_DRAFTS",
      "06_EXPORTS/02_FINAL_16x9",
      "06_EXPORTS/03_FINAL_9x16",
      "06_EXPORTS/04_FINAL_1x1",
      "06_EXPORTS/05_ARCHIVE_MASTER",
      "07_REPORTING",
      "08_ARCHIVE"
    ],
    files: [
      { path: "README.md", content: premiumReadme },
      { path: "03_PROJECT_FILES/01_PREMIERE/{{projectDate}}_{{clientId}}_{{projectName}}_starter.prproj", content: nleNotice },
      { path: "03_PROJECT_FILES/02_DAVINCI/{{projectDate}}_{{clientId}}_{{projectName}}_starter.drp", content: nleNotice },
      { path: "05_REVIEW/client-review-log.md", content: "# Client Review Log\n\n| Round | Date | Feedback | Done |\n|---|---|---|---|\n" },
      { path: "07_REPORTING/campaign-delivery-report.md", content: "# Campaign Delivery Report\n\n## Delivered Files\n\n## Notes\n\n## Next Steps\n" }
    ]
  },
  {
    id: "professional-podcast-network",
    name: "Professional Podcast Network",
    shortName: "Podcast Pro",
    tier: "premium",
    category: "Premium",
    description: "A serious podcast production system for full episodes, reels, thumbnails, transcripts, lower thirds, and sponsorships.",
    idealFor: "Podcast teams, production houses, and recurring client shows.",
    includesNleFiles: true,
    folders: [
      "00_SHOW_ADMIN/01_BRIEF",
      "00_SHOW_ADMIN/02_SPONSORS",
      "01_RAW_MEDIA/01_CAMERA_A",
      "01_RAW_MEDIA/02_CAMERA_B",
      "01_RAW_MEDIA/03_CAMERA_C",
      "01_RAW_MEDIA/04_AUDIO_ISO",
      "01_RAW_MEDIA/05_AUDIO_MIXED",
      "01_RAW_MEDIA/06_RIVERSIDE_OR_REMOTE",
      "02_EDIT/01_AUTOCUT_OR_STRINGOUT",
      "02_EDIT/02_CLEAN_EDIT",
      "02_EDIT/03_MASTER_SEQUENCE",
      "03_PROJECT_FILES/Premiere",
      "03_PROJECT_FILES/DaVinci",
      "04_GRAPHICS/01_LOGOS",
      "04_GRAPHICS/02_LOWER_THIRDS",
      "04_GRAPHICS/03_TITLE_CARDS",
      "05_TRANSCRIPTS/01_RAW",
      "05_TRANSCRIPTS/02_CLEAN",
      "05_TRANSCRIPTS/03_SRT",
      "06_REELS/01_CANDIDATES",
      "06_REELS/02_EDIT_PROJECTS",
      "06_REELS/03_FINAL_EXPORTS",
      "07_FULL_EPISODE/01_DRAFTS",
      "07_FULL_EPISODE/02_FINAL",
      "08_PUBLISHING/YouTube",
      "08_PUBLISHING/Spotify",
      "08_PUBLISHING/Social",
      "09_ARCHIVE"
    ],
    files: [
      { path: "README.md", content: premiumReadme },
      { path: "03_PROJECT_FILES/Premiere/{{projectDate}}_{{clientId}}_{{projectName}}_podcast.prproj", content: nleNotice },
      { path: "03_PROJECT_FILES/DaVinci/{{projectDate}}_{{clientId}}_{{projectName}}_podcast.drp", content: nleNotice },
      { path: "08_PUBLISHING/publishing-checklist.md", content: "# Publishing Checklist\n\n- [ ] YouTube title\n- [ ] YouTube description\n- [ ] Thumbnail\n- [ ] Shorts/Reels selected\n- [ ] SRT checked\n- [ ] Final upload tested\n" }
    ]
  },
  {
    id: "freelancer-client-system",
    name: "Freelancer Client System",
    shortName: "Freelancer Pro",
    tier: "premium",
    category: "Premium",
    description: "A client-ready structure with quote, notes, source media, working files, revisions, delivery, and archive.",
    idealFor: "New editors who want to look professional with paying clients.",
    includesNleFiles: true,
    folders: [
      "00_CLIENT_ADMIN/01_QUOTE",
      "00_CLIENT_ADMIN/02_CONTRACT",
      "00_CLIENT_ADMIN/03_INVOICE",
      "00_CLIENT_ADMIN/04_MESSAGES",
      "01_BRIEF",
      "02_SOURCE_MEDIA",
      "03_WORKING_FILES/Premiere",
      "03_WORKING_FILES/DaVinci",
      "03_WORKING_FILES/After_Effects",
      "04_ASSETS/Brand",
      "04_ASSETS/Music",
      "04_ASSETS/SFX",
      "04_ASSETS/Graphics",
      "05_REVISIONS/Round_01",
      "05_REVISIONS/Round_02",
      "05_REVISIONS/Round_03",
      "06_EXPORTS/Drafts",
      "06_EXPORTS/Final",
      "07_DELIVERY",
      "08_ARCHIVE"
    ],
    files: [
      { path: "README.md", content: premiumReadme },
      { path: "03_WORKING_FILES/Premiere/{{projectDate}}_{{clientId}}_{{projectName}}_client.prproj", content: nleNotice },
      { path: "03_WORKING_FILES/DaVinci/{{projectDate}}_{{clientId}}_{{projectName}}_client.drp", content: nleNotice },
      { path: "00_CLIENT_ADMIN/01_QUOTE/quote-outline.md", content: "# Quote Outline\n\n## Scope\n\n## Deliverables\n\n## Price\n\n## Revision Limit\n" }
    ]
  }
];

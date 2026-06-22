import { TemplateSpec } from "@/types";

const commonReadme = `# {{projectName}}

Client: {{clientName}}
Client ID: {{clientId}}
Project Date: {{projectDate}}
Editor: {{editorName}}

## Workflow
1. Ingest source media into 01_SOURCE_MEDIA.
2. Keep project files in 02_PROJECT_FILES.
3. Store graphics, music, and stock assets in 03_ASSETS.
4. Export drafts into 06_EXPORTS/01_DRAFTS.
5. Move approved finals into 06_EXPORTS/02_FINALS.
6. Archive the finished project only after client delivery is confirmed.

## Naming Rule
{{projectDate}}_{{clientId}}_{{projectName}}_v01
`;

const deliveryChecklist = `# Delivery Checklist

- [ ] Footage copied from cards or camera drives
- [ ] Backup created before formatting cards
- [ ] Audio synced and checked
- [ ] Project file saved in the correct folder
- [ ] First draft exported
- [ ] Client notes logged
- [ ] Final export checked for spelling, audio, black frames, and safe zones
- [ ] Final files delivered
- [ ] Project archived
`;

export const freeTemplates: TemplateSpec[] = [
  {
    id: "youtube-video",
    name: "YouTube Video Project",
    shortName: "YouTube",
    tier: "free",
    category: "Creator",
    description: "A clean structure for talking-head videos, vlogs, essays, tutorials, and channel uploads.",
    idealFor: "YouTubers, student creators, and beginner editors.",
    folders: [
      "01_SOURCE_MEDIA/01_CAMERA",
      "01_SOURCE_MEDIA/02_SCREEN_RECORDINGS",
      "01_SOURCE_MEDIA/03_AUDIO",
      "01_SOURCE_MEDIA/04_PHONE_CLIPS",
      "02_PROJECT_FILES/Premiere",
      "02_PROJECT_FILES/DaVinci",
      "02_PROJECT_FILES/After_Effects",
      "03_ASSETS/01_MUSIC",
      "03_ASSETS/02_SFX",
      "03_ASSETS/03_GRAPHICS",
      "03_ASSETS/04_STOCK",
      "04_TRANSCRIPTS",
      "05_THUMBNAILS",
      "06_EXPORTS/01_DRAFTS",
      "06_EXPORTS/02_FINALS",
      "06_EXPORTS/03_SHORTS",
      "07_CLIENT_NOTES",
      "08_ARCHIVE"
    ],
    files: [
      { path: "README.md", content: commonReadme },
      { path: "07_CLIENT_NOTES/delivery-checklist.md", content: deliveryChecklist },
      { path: "04_TRANSCRIPTS/transcript-notes.md", content: "# Transcript Notes\n\nPaste cleaned transcript notes here.\n" }
    ]
  },
  {
    id: "podcast-episode",
    name: "Podcast Episode Edit",
    shortName: "Podcast",
    tier: "free",
    category: "Podcast",
    description: "Organizes multi-camera podcast footage, isolated audio, transcripts, reels, and final exports.",
    idealFor: "Podcast editors and social clip editors.",
    folders: [
      "01_SOURCE_MEDIA/01_CAMERA_A",
      "01_SOURCE_MEDIA/02_CAMERA_B",
      "01_SOURCE_MEDIA/03_CAMERA_C",
      "01_SOURCE_MEDIA/04_AUDIO_ISO",
      "01_SOURCE_MEDIA/05_AUDIO_MIXED",
      "01_SOURCE_MEDIA/06_REMOTE_RECORDINGS",
      "02_PROJECT_FILES/Premiere",
      "02_PROJECT_FILES/DaVinci",
      "03_ASSETS/01_LOGOS",
      "03_ASSETS/02_LOWER_THIRDS",
      "03_ASSETS/03_MUSIC",
      "03_ASSETS/04_SFX",
      "04_TRANSCRIPTS/01_RAW",
      "04_TRANSCRIPTS/02_CLEANED",
      "04_TRANSCRIPTS/03_SRT",
      "05_REELS/01_CANDIDATES",
      "05_REELS/02_EXPORTS",
      "06_EXPORTS/01_FULL_EPISODE_DRAFTS",
      "06_EXPORTS/02_FULL_EPISODE_FINAL",
      "07_PACKAGING/YouTube",
      "07_PACKAGING/Social",
      "08_ARCHIVE"
    ],
    files: [
      { path: "README.md", content: commonReadme },
      { path: "07_PACKAGING/episode-packaging.md", content: "# Episode Packaging\n\n## Title Options\n\n## Description\n\n## Tags\n\n## Thumbnail Notes\n" },
      { path: "05_REELS/reel-candidate-log.md", content: "# Reel Candidate Log\n\n| Timecode | Hook | Why it works | Status |\n|---|---|---|---|\n" }
    ]
  },
  {
    id: "tiktok-reels-shorts",
    name: "Short-Form Reel Pack",
    shortName: "Reels",
    tier: "free",
    category: "Social",
    description: "A simple structure for vertical clips, captions, thumbnails, music, and channel exports.",
    idealFor: "TikTok, Reels, Shorts, and LinkedIn clip editors.",
    folders: [
      "01_SOURCE_MEDIA/01_RAW_CLIPS",
      "01_SOURCE_MEDIA/02_SCREEN_RECORDINGS",
      "01_SOURCE_MEDIA/03_PHONE_ASSETS",
      "02_PROJECT_FILES/Premiere",
      "02_PROJECT_FILES/CapCut",
      "02_PROJECT_FILES/DaVinci",
      "03_ASSETS/01_CAPTIONS",
      "03_ASSETS/02_MUSIC",
      "03_ASSETS/03_SFX",
      "03_ASSETS/04_BROLL",
      "04_EXPORTS/01_TIKTOK",
      "04_EXPORTS/02_INSTAGRAM_REELS",
      "04_EXPORTS/03_YOUTUBE_SHORTS",
      "04_EXPORTS/04_LINKEDIN",
      "05_THUMBNAILS",
      "06_COPY_AND_HASHTAGS",
      "07_ARCHIVE"
    ],
    files: [
      { path: "README.md", content: commonReadme },
      { path: "06_COPY_AND_HASHTAGS/social-copy.md", content: "# Social Copy\n\n## TikTok\n\n## Instagram Reels\n\n## YouTube Shorts\n\n## LinkedIn\n" }
    ]
  },
  {
    id: "wedding-film",
    name: "Wedding Film Project",
    shortName: "Wedding",
    tier: "free",
    category: "Event",
    description: "A practical folder system for wedding highlight films, ceremony edits, speeches, and deliverables.",
    idealFor: "Wedding videographers and assistants.",
    folders: [
      "01_SOURCE_MEDIA/01_PREP",
      "01_SOURCE_MEDIA/02_CEREMONY",
      "01_SOURCE_MEDIA/03_RECEPTION",
      "01_SOURCE_MEDIA/04_SPEECHES",
      "01_SOURCE_MEDIA/05_AUDIO",
      "01_SOURCE_MEDIA/06_DRONE",
      "02_PROJECT_FILES/Premiere",
      "02_PROJECT_FILES/DaVinci",
      "03_ASSETS/01_MUSIC",
      "03_ASSETS/02_TITLES",
      "03_ASSETS/03_LOGOS",
      "04_EXPORTS/01_HIGHLIGHT_FILM_DRAFTS",
      "04_EXPORTS/02_HIGHLIGHT_FILM_FINAL",
      "04_EXPORTS/03_CEREMONY",
      "04_EXPORTS/04_SPEECHES",
      "05_CLIENT_NOTES",
      "06_DELIVERY",
      "07_ARCHIVE"
    ],
    files: [
      { path: "README.md", content: commonReadme },
      { path: "05_CLIENT_NOTES/wedding-delivery-checklist.md", content: deliveryChecklist + "\n- [ ] Couple names spelled correctly\n- [ ] Licensed music confirmed\n" }
    ]
  },
  {
    id: "music-video",
    name: "Music Video Project",
    shortName: "Music Video",
    tier: "free",
    category: "Music",
    description: "Separates performance takes, b-roll, playback audio, color, VFX, and final exports.",
    idealFor: "Music video editors, artists, and directors.",
    folders: [
      "01_SOURCE_MEDIA/01_PERFORMANCE_TAKES",
      "01_SOURCE_MEDIA/02_BROLL",
      "01_SOURCE_MEDIA/03_AUDIO_PLAYBACK",
      "01_SOURCE_MEDIA/04_BTS",
      "02_PROJECT_FILES/Premiere",
      "02_PROJECT_FILES/DaVinci",
      "02_PROJECT_FILES/After_Effects",
      "03_ASSETS/01_ARTWORK",
      "03_ASSETS/02_VFX",
      "03_ASSETS/03_FONTS",
      "04_COLOR/01_LUTS",
      "04_COLOR/02_STILLS",
      "05_EXPORTS/01_DRAFTS",
      "05_EXPORTS/02_FINAL_MASTER",
      "05_EXPORTS/03_SOCIAL_CUTDOWNS",
      "06_CLIENT_NOTES",
      "07_ARCHIVE"
    ],
    files: [
      { path: "README.md", content: commonReadme },
      { path: "06_CLIENT_NOTES/performance-selects.md", content: "# Performance Selects\n\n| Timecode | Take | Note |\n|---|---|---|\n" }
    ]
  },
  {
    id: "school-project",
    name: "Student Video Project",
    shortName: "Student",
    tier: "free",
    category: "Education",
    description: "A beginner-proof structure for class videos, documentaries, and group projects.",
    idealFor: "High school, college, and first-time editors.",
    folders: [
      "01_SOURCE_MEDIA/01_VIDEO",
      "01_SOURCE_MEDIA/02_AUDIO",
      "01_SOURCE_MEDIA/03_IMAGES",
      "02_PROJECT_FILES",
      "03_RESEARCH_AND_SCRIPT",
      "04_ASSETS/01_MUSIC",
      "04_ASSETS/02_GRAPHICS",
      "05_EXPORTS/01_DRAFT",
      "05_EXPORTS/02_FINAL",
      "06_TEACHER_FEEDBACK",
      "07_ARCHIVE"
    ],
    files: [
      { path: "README.md", content: commonReadme },
      { path: "03_RESEARCH_AND_SCRIPT/script.md", content: "# Script\n\n## Intro\n\n## Main Points\n\n## Outro\n" },
      { path: "06_TEACHER_FEEDBACK/rubric-notes.md", content: "# Rubric Notes\n\nPaste assignment requirements here before editing.\n" }
    ]
  },
  {
    id: "gaming-video",
    name: "Gaming Video Project",
    shortName: "Gaming",
    tier: "free",
    category: "Creator",
    description: "Built for gameplay captures, voiceover, facecam, memes, graphics, and Shorts cutdowns.",
    idealFor: "Gaming creators and stream highlight editors.",
    folders: [
      "01_SOURCE_MEDIA/01_GAMEPLAY",
      "01_SOURCE_MEDIA/02_FACECAM",
      "01_SOURCE_MEDIA/03_VOICEOVER",
      "01_SOURCE_MEDIA/04_STREAM_VODS",
      "02_PROJECT_FILES/Premiere",
      "02_PROJECT_FILES/DaVinci",
      "03_ASSETS/01_MEMES",
      "03_ASSETS/02_SFX",
      "03_ASSETS/03_MUSIC",
      "03_ASSETS/04_OVERLAYS",
      "04_EXPORTS/01_DRAFTS",
      "04_EXPORTS/02_FINAL_YOUTUBE",
      "04_EXPORTS/03_SHORTS",
      "05_THUMBNAILS",
      "06_COPY",
      "07_ARCHIVE"
    ],
    files: [
      { path: "README.md", content: commonReadme },
      { path: "06_COPY/youtube-upload-copy.md", content: "# YouTube Upload Copy\n\n## Title\n\n## Description\n\n## Tags\n" }
    ]
  },
  {
    id: "client-ad",
    name: "Client Ad Project",
    shortName: "Client Ad",
    tier: "free",
    category: "Commercial",
    description: "Organizes briefs, brand assets, ad versions, cutdowns, approvals, and final delivery files.",
    idealFor: "Freelance editors and small agency projects.",
    folders: [
      "00_BRIEF_AND_APPROVALS",
      "01_SOURCE_MEDIA/01_VIDEO",
      "01_SOURCE_MEDIA/02_AUDIO",
      "01_SOURCE_MEDIA/03_LOGOS",
      "01_SOURCE_MEDIA/04_PRODUCT_IMAGES",
      "02_PROJECT_FILES/Premiere",
      "02_PROJECT_FILES/DaVinci",
      "03_ASSETS/01_BRAND_GUIDE",
      "03_ASSETS/02_FONTS",
      "03_ASSETS/03_MUSIC",
      "03_ASSETS/04_SFX",
      "04_EXPORTS/01_DRAFTS",
      "04_EXPORTS/02_FINAL_16x9",
      "04_EXPORTS/03_FINAL_9x16",
      "04_EXPORTS/04_FINAL_1x1",
      "05_CLIENT_NOTES",
      "06_INVOICES",
      "07_ARCHIVE"
    ],
    files: [
      { path: "README.md", content: commonReadme },
      { path: "00_BRIEF_AND_APPROVALS/client-brief.md", content: "# Client Brief\n\n## Goal\n\n## Audience\n\n## Offer\n\n## CTA\n\n## Required Deliverables\n" },
      { path: "05_CLIENT_NOTES/revision-log.md", content: "# Revision Log\n\n| Date | Request | Status |\n|---|---|---|\n" }
    ]
  }
];

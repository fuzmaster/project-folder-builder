# Project Folder Builder

Generate clean video editing project folder structures as ready-to-use ZIP files in seconds.

> Pick a project type, enter the job details, and download a ready-to-use ZIP with clean folders, starter checklists, and naming rules — built for new editors, freelancers, creators, and students.

**Live app:** [project-folder-builder.vercel.app](https://project-folder-builder.vercel.app)

---

## Why

New editors burn hours every project naming folders, recreating the same structure, and forgetting checklists. This tool removes that friction: pick a template, enter project metadata, and get a clean ZIP. No login is required for free templates.

## Features

- One-page Next.js app — no backend round-trip for free templates
- 8 free editing templates (creator, student, event, client)
- 3 Pro templates available through a $9 one-time Gumroad unlock
- Metadata-aware folder names, README files, checklists, notes, and upload-copy docs
- Browser-side ZIP generation with JSZip + FileSaver (works offline after first load)
- Filename sanitization for cross-platform safety
- Firebase Auth (Google + email/password) for Pro accounts
- Gumroad license verification for Pro unlocks
- Firebase Admin server route for trusted profile updates

## Templates

**Free**

| Template | For |
| --- | --- |
| YouTube Video Project | Creators publishing weekly long-form |
| Podcast Episode Edit | Solo + interview podcasters |
| Short-Form Reel Pack | Reels, Shorts, TikTok batches |
| Wedding Film Project | Wedding videographers |
| Music Video Project | Music video editors |
| Student Video Project | Film school + class assignments |
| Gaming Video Project | Gameplay creators |
| Client Ad Project | Quick freelance ad jobs |

**Pro**

| Template | For |
| --- | --- |
| Agency Video Campaign | Multi-deliverable agency campaigns |
| Professional Podcast Network | Multi-show podcast networks |
| Freelancer Client System | Full client-management folder system |

## Tech Stack

Next.js · TypeScript · Tailwind CSS · JSZip · FileSaver · Firebase Auth · Firestore · Firebase Admin SDK · Gumroad license verification

## Getting Started

```bash
git clone https://github.com/fuzmaster/project-folder-builder.git
cd project-folder-builder
npm install
npm run dev
```

The app runs at `http://localhost:3000`. Free ZIP generation works without any environment variables. Only Pro unlocks need Firebase and Gumroad config.

## Environment

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

GUMROAD_PRODUCT_ID=
GUMROAD_PRODUCT_PERMALINK=
NEXT_PUBLIC_GUMROAD_PRODUCT_URL=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

These variables are only needed for Pro sign-in and Gumroad license verification. Do not commit `.env.local` or real secret values. If `FIREBASE_PRIVATE_KEY` is stored with escaped line breaks, the server normalizes it with `replace(/\\n/g, "\n")`.

## Firebase Setup

1. Create a Firebase project.
2. Enable Authentication providers for Google and email/password.
3. Create a Firestore database.
4. Add the web-app values to the `NEXT_PUBLIC_FIREBASE_*` variables.
5. Create a service account and add `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY`.

### Firestore rules

Signed-in users read only their own profile. Client writes are disabled — the server route updates Pro status via Firebase Admin after Gumroad verification.

```txt
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if false;
    }
  }
}
```

## Gumroad Setup

1. Create a $9 one-time Gumroad product for Project Folder Builder Pro.
2. Set `NEXT_PUBLIC_GUMROAD_PRODUCT_URL` to the public product URL.
3. Set `GUMROAD_PRODUCT_ID` for license verification.
4. Optionally set `GUMROAD_PRODUCT_PERMALINK` as a fallback when no product ID is available.

Gumroad recommends `product_id` for products created on or after January 9, 2023. The app sends `GUMROAD_PRODUCT_ID` first and only falls back to `GUMROAD_PRODUCT_PERMALINK` when no product ID is provided.

## Pro Unlock Flow

1. User buys Pro on Gumroad.
2. User signs in with Firebase.
3. User pastes their Gumroad license key.
4. `/api/gumroad/verify` verifies the Firebase ID token with Firebase Admin.
5. The server verifies the license with Gumroad using `increment_uses_count=false`.
6. The server rejects refunded, disputed, chargebacked, cancelled, or failed license states.
7. On success, Firebase Admin writes `users/{uid}.isPro = true` in Firestore.
8. The client refreshes the profile and unlocks Pro template downloads.

## Scripts

```bash
npm run dev        # local dev server
npm run build      # production build
npm run start      # run the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Deployment

Built for Vercel. Set the env vars in the project's Vercel dashboard and deploy from `main`.

## License

MIT

## Credits

Built by [Jacob Britten](https://jacobbritten.com) — Media Systems Architect.

- [Portfolio](https://jacobbritten.com)
- [Projects](https://jacobbritten.com/projects.html)
- [The Lab](https://jacobbritten.com/lab.html)
- Support: [Ko-fi](https://ko-fi.com/jacobbritten) · [PayPal](https://www.paypal.com/donate/?hosted_button_id=47A4JJ4WNBY9U)

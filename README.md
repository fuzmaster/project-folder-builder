# Project Folder Builder

Project Folder Builder is a lightweight Next.js utility for new video editors, freelancers, creators, and students. Users choose a video project type, enter project metadata, and instantly download a clean, professional folder structure as a ZIP file.

Free templates generate ZIP files fully in the browser with JSZip and FileSaver, so visitors can use the core product without creating an account. Pro templates stay visible but locked until a user signs in with Firebase and verifies a Gumroad license key.

## Features

- One-page Next.js app for generating project folder ZIP files
- 8 free video editing templates for creator, student, event, and client workflows
- 3 Pro templates for agency, podcast network, and freelancer workflows
- Metadata-aware folder names, starter README files, checklists, notes, and upload copy docs
- Firebase Auth for Google and email/password accounts
- Firestore account profiles with Pro status
- Firebase Admin server route for trusted account updates
- Gumroad license verification for Pro unlocks

## Templates

### Free

- YouTube Video Project
- Podcast Episode Edit
- Short-Form Reel Pack
- Wedding Film Project
- Music Video Project
- Student Video Project
- Gaming Video Project
- Client Ad Project

### Pro

- Agency Video Campaign
- Professional Podcast Network
- Freelancer Client System

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- JSZip
- FileSaver
- Firebase Auth
- Firestore
- Firebase Admin SDK
- Gumroad license verification

## Environment

Copy `.env.example` to `.env.local`.

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

Free ZIP generation works without Firebase or Gumroad configuration. Account sign-in and Pro unlocks require Firebase and Gumroad environment variables.

## Firebase Setup

1. Create a Firebase project.
2. Enable Authentication providers for Google and email/password.
3. Create a Firestore database.
4. Add the public Firebase web app values to the `NEXT_PUBLIC_FIREBASE_*` variables.
5. Create a Firebase service account and add `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY`.

If the private key is stored with escaped line breaks, the server normalizes it with `replace(/\\n/g, "\n")`.

## Firestore Rules

Use rules that let signed-in users read only their own profile. Client writes are disabled because the server route grants Pro access through Firebase Admin after Gumroad verification.

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

1. Create a Gumroad product for Project Folder Builder Pro.
2. Add the public product URL to `NEXT_PUBLIC_GUMROAD_PRODUCT_URL`.
3. Add `GUMROAD_PRODUCT_ID` for license verification.
4. Optionally add `GUMROAD_PRODUCT_PERMALINK` as a fallback only when a product ID is not available.

Gumroad recommends `product_id` for products created on or after January 9, 2023. This app sends `GUMROAD_PRODUCT_ID` first and only falls back to `GUMROAD_PRODUCT_PERMALINK` when no product ID is provided.

## Pro Unlock Flow

1. User buys Pro on Gumroad.
2. User signs in with Firebase.
3. User pastes their Gumroad license key.
4. `/api/gumroad/verify` verifies the Firebase ID token with Firebase Admin.
5. The server verifies the license with Gumroad using `increment_uses_count=false`.
6. The server rejects refunded, disputed, chargebacked, cancelled, or failed subscription purchases.
7. On success, Firebase Admin writes `users/{uid}.isPro = true` in Firestore.
8. The client refreshes the profile and unlocks Pro template downloads.

## Repository Topics

`video-editing` `nextjs` `typescript` `tailwindcss` `jszip` `freelancer-tools` `creator-tools` `project-management` `premiere-pro` `davinci-resolve` `student-editors`

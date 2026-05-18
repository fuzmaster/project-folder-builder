# Project Folder Builder

Project Folder Builder is a lightweight Next.js utility for new video editors, freelancers, creators, and students. Users choose a video project type, enter project metadata, and instantly download a clean, professional folder structure as a ZIP file.

It includes free templates for YouTube videos, podcasts, reels, wedding films, music videos, school projects, gaming videos, and client ads. Premium templates are scaffolded for agency, podcast network, and freelancer workflows using Supabase and Stripe.

## Features

- One-page Next.js app for generating project folder ZIP files
- Free video editing templates for common creator, student, event, and client workflows
- Metadata-aware folder names, starter README files, checklists, notes, and upload copy docs
- Browser-side ZIP generation with JSZip
- Premium template scaffolding for Supabase account checks and Stripe payments
- Tailwind CSS interface with reusable template, form, preview, and download components

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

### Premium Scaffolded

- Agency Video Campaign
- Professional Podcast Network
- Freelancer Client System

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- JSZip
- Supabase
- Stripe

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment

Copy `.env.example` to `.env.local` and fill in Supabase and Stripe values when enabling paid accounts.

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PAYMENT_LINK=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Free ZIP generation works client-side without Supabase or Stripe.

## Supabase Table

```sql
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  is_pro boolean not null default false,
  stripe_customer_id text,
  updated_at timestamptz default now()
);
```

## Repository Topics

`video-editing` `nextjs` `typescript` `tailwindcss` `jszip` `freelancer-tools` `creator-tools` `project-management` `premiere-pro` `davinci-resolve` `student-editors`

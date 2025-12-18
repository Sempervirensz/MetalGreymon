# WorldPulse - Digital Product Passport Platform

A unified platform for creating beautiful, interactive Digital Product Passports (DPPs).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Route Structure

### Landing Page (Public)
- `/` - Homepage with phone carousel and product info

### Auth (Public)
- `/login` - Sign in
- `/signup` - Create account

### Dashboard (Protected - requires login)
- `/dashboard` - Dashboard home (list of experiences)
- `/dashboard/plans` - Plan selection (subscription tiers)
- `/dashboard/content` - Content form (create/edit experience)
- `/dashboard/preview` - Preview experience before publishing
- `/dashboard/published` - Published experiences list
- `/dashboard/analytics/:id` - Analytics for specific experience

### Public Experience Page
- `/sku/:slug` - Public experience page (shared via QR/link)

### Marketing Pages
- `/pricing` - Pricing page with plans and add-ons
- `/examples` - Example DPPs gallery
- `/examples/[slug]` - Individual example detail

### Redirects
- `/create` → `/dashboard/content` (if logged in) or `/signup?next=...`
- `/plans` → `/dashboard/plans` (if logged in) or `/pricing`

### Dev/Test Routes (moved under /_dev)
- `/_dev/test-route` - Test route
- `/_dev/diagnostics` - Diagnostics page

Legacy routes `/test-route` and `/diagnostics` redirect to `/_dev/*`

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Auth**: Supabase (ready to integrate)
- **Payments**: Stripe (ready to integrate)

## Features

- Dark theme landing page with phone carousel
- Clean, minimal dashboard design
- AI content generation (simulated, ready for OpenAI integration)
- Plan-based access control
- Public DPP viewer with verification badge

## Migrating from Original Repos

This unified repo combines:
1. Landing/marketing site → `/`, `/pricing`, `/examples`
2. Dashboard/Create flow → `/dashboard/*`
3. Public viewer → `/sku/:slug`

The original Vite/React patterns have been converted to Next.js App Router conventions.

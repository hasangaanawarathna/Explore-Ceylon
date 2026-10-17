# Explore Ceylon

A premium travel platform for discovering Sri Lanka.

## Features

- Discover destinations
- Tour packages
- Hidden places
- Blog
- Gallery
- Booking
- Contact
- Responsive Design
- SEO Ready
- Fast Performance

## Tech Stack

Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS

Backend

- Next.js Route Handlers on Node.js
- Supabase Auth with server-validated administrator sessions
- Supabase PostgreSQL with Row Level Security

Database

- Supabase PostgreSQL in configured environments
- Local JSON remains only as a development fallback when Supabase variables are absent

Deployment

- Vercel for frontend
- Render for backend

## Project Structure

- `app/` route groups and pages
- `components/` reusable UI pieces
- `lib/` constants and utilities
- `types/` shared TypeScript types
- `hooks/` reusable client hooks
- `public/` static assets

## Installation

```bash
npm install
```

## Configure

Set these values locally and in the hosting provider's encrypted environment settings:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://ttdlyhasckupbzngcrez.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-project-publishable-key
```

The publishable key is designed for browser use; never add a Supabase secret/service-role key to this application. Database writes remain protected by RLS and server-side administrator checks.

## Supabase setup and safe migration

1. In the Supabase SQL Editor, run `supabase/migrations/001_initial_schema.sql` and then `002_seed_existing_content.sql`.
2. In Authentication > Users, create the administrator account. Do not put its password in SQL or an environment variable.
3. Edit the placeholder email in `supabase/ADMIN_SETUP.sql`, run it once, and verify a row exists in `admin_profiles`.
4. Add the two environment variables above to `.env.local` and the deployment provider, then restart/redeploy.
5. Verify public catalog reads and form submissions, then verify `/admin` sign-in and CRUD/status operations.

The seed migration uses `ON CONFLICT DO NOTHING`: it never updates or deletes an existing destination, package, or settings row. The existing ignored `data/explore-ceylon.json` file remains untouched as a rollback/reference copy. If it later contains live enquiries or bookings, export and review them before importing; do not rerun them as blind inserts.

## Run

```bash
npm run dev
```

Production builds require a Node.js host rather than static GitHub Pages hosting:

```bash
npm run build
npm start
```

No persistent filesystem is required after Supabase is configured. The deployment runtime must support Next.js Route Handlers and cookies (for example, Vercel or a Node.js host); static export hosting is not supported.

## Backend API

- `POST /api/enquiries` creates a customer enquiry.
- `GET /api/enquiries` lists enquiries for an authenticated administrator.
- `PATCH /api/enquiries/:id` changes an enquiry status.
- `POST /api/bookings` creates a booking request.
- `GET /api/bookings` lists bookings for an authenticated administrator.
- `PATCH /api/bookings/:id` changes a booking status.
- `POST /api/auth/login` and `/api/auth/logout` manage the admin session.
- `GET /api/admin/dashboard` returns live operational totals and recent records.
- `GET /api/catalog` returns destinations and packages.
- `GET/PATCH /api/settings` reads and updates protected admin settings.

The admin dashboard is available at `/admin`; unauthenticated visitors are redirected to `/admin/login`.

## Future Production Integrations

- Payment Gateway
- Weather API
- Google Maps
- Reviews
- Wishlist
- AI Trip Planner

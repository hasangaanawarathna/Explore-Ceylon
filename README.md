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

Data and authentication

- Supabase browser authentication
- Supabase PostgreSQL with Row Level Security

Database

- Supabase PostgreSQL, accessed directly with the publishable key under RLS

Deployment

- GitHub Pages static hosting
- GitHub Actions static export deployment

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

Set these values locally and as GitHub repository variables under Settings > Secrets and variables > Actions > Variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://ttdlyhasckupbzngcrez.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-project-publishable-key
```

The publishable key is designed for browser use; never add a Supabase secret/service-role key. Authentication plus RLS protect administrator reads and writes.

## Supabase setup and safe migration

1. In the Supabase SQL Editor, run `supabase/migrations/001_initial_schema.sql` and then `002_seed_existing_content.sql`.
2. In Authentication > Users, create the administrator account. Do not put its password in SQL or an environment variable.
3. Edit the placeholder email in `supabase/ADMIN_SETUP.sql`, run it once, and verify a row exists in `admin_profiles`.
4. Add the two environment variables above to `.env.local` and GitHub repository variables, then redeploy.
5. Verify public catalog reads and form submissions, then verify `/admin` sign-in and CRUD/status operations.

### Catalog image uploads

Run `supabase/migrations/003_destination_images_storage.sql` once in the Supabase SQL Editor. It creates the public `destination-images` bucket with a 5 MB limit, restricts files to JPG/PNG/WebP, permits public reads, and restricts inserts, replacements, and deletions to active administrators through `public.is_admin()`.

In Admin > Supabase catalog, select or create a destination/package, choose **Upload image** (or **Replace image**), review the preview, and select **Confirm upload**. Existing records are updated immediately. For a new unsaved record, upload first and then select **Save record**. **Remove image** asks for confirmation, restores the bundled fallback image, and removes managed Storage objects without touching bundled website assets.

The seed migration uses `ON CONFLICT DO NOTHING`: it never updates or deletes an existing destination, package, or settings row. The existing ignored `data/explore-ceylon.json` file remains untouched as a rollback/reference copy. If it later contains live enquiries or bookings, export and review them before importing; do not rerun them as blind inserts.

## Run

```bash
npm run dev
```

Create the production server build:

```bash
npm run build
```

Run it with `npm start`. Admin authentication requires a server-capable Next.js host; GitHub Pages cannot execute the API routes.

## Admin development/testing authentication

The shared-password login is development/testing only. Copy the admin variables from `.env.example` into `.env.local`. To keep the existing RLS-protected editing features available, set `ADMIN_SUPABASE_EMAIL` to an existing Supabase Auth user with an active `admin_profiles` row and set that account's password to the same value as `ADMIN_PASSWORD`. If that optional bridge is unavailable, login still succeeds but Supabase-protected edits are not available.

The admin dashboard is available at `/admin`; unauthenticated visitors are redirected to `/admin/login`.

## Future Production Integrations

- Payment Gateway
- Weather API
- Google Maps
- Reviews
- Wishlist
- AI Trip Planner

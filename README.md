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

Create the GitHub Pages static export:

```bash
npm run build
```

The output is written to `out/`. The workflow deploys that directory to GitHub Pages.

## Static-host architecture

- Public catalog/settings reads and booking/enquiry inserts use the Supabase browser client.
- Admin sign-in uses Supabase Auth. The dashboard also verifies an active `admin_profiles` row.
- Admin catalog, settings, booking, and enquiry changes are enforced by RLS.
- GitHub Pages cannot securely provide server-side rate limiting, CAPTCHA secret verification, email sending, webhooks, or secret-key operations. Those require a separate trusted runtime or a Supabase Edge Function.
- New dynamic destination/package detail paths require a rebuild because GitHub Pages serves only files generated during export. List pages update directly from Supabase without a rebuild.

The admin dashboard is available at `/admin`; unauthenticated visitors are redirected to `/admin/login`.

## Future Production Integrations

- Payment Gateway
- Weather API
- Google Maps
- Reviews
- Wishlist
- AI Trip Planner

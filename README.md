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
- Signed, HTTP-only admin sessions
- Persistent JSON repository (replaceable with PostgreSQL)

Database

- Local persistent JSON for the current deployment
- PostgreSQL is recommended before multi-instance production scaling

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

Copy `.env.example` to `.env.local` and replace the admin password and authentication secret. Never deploy with the development credentials.

## Run

```bash
npm run dev
```

Production builds require a Node.js host rather than static GitHub Pages hosting:

```bash
npm run build
npm start
```

The data directory must be writable and persistent. Set `DATA_DIRECTORY` to the mounted storage path on the production host.

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
- PostgreSQL or another managed database
- Weather API
- Google Maps
- Reviews
- Wishlist
- AI Trip Planner

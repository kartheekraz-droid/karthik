# NALAMS — Real-Time National Land Acquisition & Management System

React + TypeScript + Tailwind CSS frontend (Vite), Supabase backend, deployed on Vercel.
Converted from the original static HTML/CSS tricolor-themed prototype into a routed React app.

## Stack
- **Frontend**: React 19 + TypeScript, Vite, Tailwind CSS
- **Routing**: react-router-dom
- **Maps**: react-leaflet (OpenStreetMap tiles)
- **Backend / DB / Auth**: Supabase (`@supabase/supabase-js`)
- **Deployment**: Vercel

## Pages → Routes
| Route | Page | Purpose |
|---|---|---|
| `/` | Home | Public landing — flag-language explainer |
| `/login` | Login | Officer / citizen role gate (stubbed — wire to `supabase.auth`) |
| `/dashboard` | Dashboard | Collector command view — KPIs, pipeline, alerts |
| `/map` | Live Map | GIS view of parcels with status-coloured markers |
| `/parcel` | Parcel | Single case file — timeline + compensation |
| `/citizen` | Citizen | Landowner portal — track a case |

## Getting started
```bash
npm install
cp .env.example .env   # fill in your Supabase project URL + anon key
npm run dev
```

## Supabase setup
Create these tables in the Supabase SQL editor (see `src/lib/supabaseClient.ts` for the suggested shape):
- `parcels` — survey_no, village, district, project, stage, lat, lng, owner_name, area_ha
- `cases` — parcel_id, status, notice_date, hearing_date, award_amount
- `documents` — case_id, file_url, uploaded_by, uploaded_at
- `profiles` — id, role (`collector` | `field` | `citizen`), linked to `auth.users`

Currently all page data (parcel counts, the Gat 112 case, map markers) is hard-coded as sample/demo
data inside each page component — swap those for `supabase.from(...).select(...)` calls once your
tables are seeded.

## Deploying to Vercel
1. Push this repo to GitHub.
2. Import it in Vercel — framework preset **Vite** is auto-detected.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under Project → Settings → Environment Variables.
4. Deploy. Build command `npm run build`, output dir `dist` (Vercel's Vite preset sets these automatically).

## Design system
Colours and type live in `tailwind.config.js` (`saffron`, `green`, `navy`, `paper`, `ink`, `muted`, `line`)
and shared component classes (`.btn`, `.card`, `.tag`, `.step`, `.wrap`) live in `src/index.css`.
Saffron = needs action, white/navy = the record, green = closed — this status language is used
consistently across the dashboard, map, and citizen views.

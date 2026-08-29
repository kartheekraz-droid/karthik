# NALAMS-BHARAT — Real-Time National Land Acquisition & Management System

React + TypeScript + Tailwind CSS frontend (Vite), Supabase backend, deployed on Vercel.
Six role-based portals on one codebase, same tricolor design language throughout, plus a
built-in English / Hindi / Telugu language switcher.

## Stack (unchanged from earlier build)
- **Frontend**: React 19 + TypeScript, Vite, Tailwind CSS
- **Routing**: react-router-dom
- **Maps**: react-leaflet (OpenStreetMap tiles)
- **Backend / DB / Auth**: Supabase (`@supabase/supabase-js`)
- **i18n**: custom `LanguageContext` (EN / HI / TE), no extra runtime deps
- **Deployment**: Vercel

## The six portals

| Portal | Base route | Screens built |
|---|---|---|
| **Central Government** | `/central` | National command center (summary cards + ticker), state performance grid (grades A–D, drill-down) |
| **State Government** | `/state` | State command center, district performance grid |
| **District / Collector** | `/collector` | Command center, GIS acquisition map, risk-scored pending approvals queue, individual file view with fairness engine |
| **Project Implementing Agency** | `/pia` | Dashboard (totals/compensation/disputes), project management list, land identification + map, landowner list, documents vault, grievances |
| **Field Officer** | `/field` | Verification queue with one-click approve/reject/dispute, geo-tagged inspection form (GPS capture, photo dropzone, signature canvas), boundary map viewer |
| **Citizen / Landowner** | `/citizen` | My Lands, 7-step timeline tracker, compensation breakdown + fairness check, documents vault, notifications, raise-a-grievance form |

`/` is a portal picker (keeps the original public-facing home content above it). `/login` has a
role switcher for all six portals and redirects to the right dashboard (currently client-side only
— see Auth below).

Screens marked "Planned" in the sidebar (National GIS, Budget Oversight, Policy Compliance,
Integration Hub, District Analytics, etc.) render a `ComingSoon` placeholder — they're in the spec
but intentionally not built out yet so the MUST-have screens per the hackathon brief got full
attention first.

## Getting started
```bash
npm install
cp .env.example .env   # fill in your Supabase project URL + anon key
npm run dev
```

## Data — currently mocked, wired for Supabase next
Every list/table on every portal reads from `src/data/mockData.ts` (state grid, district grid,
approval queue + risk scores, PIA projects, landowners, field queue, citizen parcels). Each export
there has a comment showing the equivalent `supabase.from(...).select(...)` call — swap them in
once your tables are seeded. Suggested table shapes are in `src/lib/supabaseClient.ts`:
- `parcels` — survey_no, village, district, project, stage, lat, lng, owner_name, area_ha
- `cases` — parcel_id, status, notice_date, hearing_date, award_amount
- `documents` — case_id, file_url, uploaded_by, uploaded_at
- `grievances` — case_id, category, description, status, assigned_to
- `profiles` — id, role (`central` | `state` | `collector` | `pia` | `field` | `citizen`), linked to `auth.users`

## Auth
`Login.tsx` currently picks a role from a local list and just navigates — it does not call
Supabase yet. Wire `supabase.auth.signInWithPassword({ email, password })` in the `handleSubmit`
of `src/pages/Login.tsx`, then look up the signed-in user's role from `profiles` instead of the
radio buttons, and gate each portal's routes with that role (e.g. redirect a `citizen` away from
`/collector/*`).

## Language switcher
`src/context/LanguageContext.tsx` + `src/i18n/translations.ts` cover the public Home/Login and the
Citizen portal in English, Hindi, and Telugu. The five other portals (Central, State, Collector,
PIA, Field) are English-only for now — the switcher UI still renders on their sidebars (via
`PortalShell`) for consistency, but their copy isn't in `translations.ts` yet. Add `central.*`,
`state.*`, `pia.*`, `field.*` keys following the existing pattern to extend it.

## Deploying to Vercel
1. Push this repo to GitHub.
2. Import it in Vercel — framework preset **Vite** is auto-detected.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under Project → Settings → Environment Variables.
4. Deploy. Build command `npm run build`, output dir `dist`.

## Design system
Colours and type live in `tailwind.config.js` (`saffron`, `green`, `navy`, `paper`, `ink`, `muted`,
`line`) and shared component classes (`.btn`, `.card`, `.tag`, `.step`, `.wrap`) live in
`src/index.css` — unchanged from the original prototype, reused across all six portals.
`PortalShell` (sidebar layout) and `SiteHeader`/`SiteFooter` (public pages) are the two layout
wrappers; `StatCard`, `Badge`, and `GradeBadge` are the shared data-display primitives.

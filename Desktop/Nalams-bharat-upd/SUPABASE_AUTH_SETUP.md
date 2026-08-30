# NALAMS Supabase Authentication Setup

This version uses Supabase Auth for all six portal roles without adding another application table.

## Roles

- `central` — Central Government Officer — Officer ID + Password — Sign In / Sign Up
- `state` — State Government Officer — Officer ID + Password — Sign In / Sign Up
- `collector` — District / Collector Officer — Officer ID + Password — Sign In / Sign Up
- `pia` — Project Implementing Agency — Officer ID + Password — Sign In / Sign Up
- `field` — Field Officer — Officer ID + Password — Sign In / Sign Up
- `citizen` — Citizen / Landowner — Parcel ID + Password — Sign In only

## Environment variables

Create `.env` in the project root:

```env
VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLIC_ANON_KEY
```

Use the public/anon key in the Vite frontend. Never place the Supabase service-role key in this project.

## Important Supabase setting for the hackathon

The UI intentionally asks for Officer ID instead of email. Internally, the app converts an ID into an auth email such as:

`central-OFF-001` -> `central-off-001@nalams.local`

Because these are internal placeholder emails, in Supabase Dashboard go to Authentication settings and turn OFF email confirmation for this demo. Otherwise an officer signup may be created but will not receive a usable confirmation email.

## Citizen accounts

Citizens have no signup screen. A citizen account must be provisioned by an administrator/demo setup process using the same internal pattern:

`PAR-AP-GNT-0001` -> `citizen-par-ap-gnt-0001@nalams.local`

The auth user's metadata must contain:

```json
{
  "role": "citizen",
  "parcel_id": "PAR-AP-GNT-0001",
  "display_id": "PAR-AP-GNT-0001"
}
```

For a hackathon demo, create these citizen users through a trusted admin process. Do not expose a service-role key in React.

## Run

```bash
npm install
npm run dev
```

The portal routes are protected. A user must be signed in with the role matching the requested portal.

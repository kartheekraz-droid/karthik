# NALAMS — Start Here (9 Supabase Tables)

This codebase is designed to use exactly these 9 tables:

1. profiles
2. projects
3. parcels
4. landowners
5. acquisition_cases
6. compensation
7. grievances
8. field_tasks
9. approvals

## 1. Add environment variables

Create `.env.local` in the project root:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

Do not put the service_role/secret key in the frontend.

## 2. Confirm your table column names

The React code expects the exact column names listed in your 9-table design. In particular:

- projects: id, project_code, project_name, project_type, state, district, acquiring_agency, total_land, acquired_land, estimated_cost, status, progress, start_date, target_date, created_at
- parcels: id, parcel_no, project_id, survey_no, village, mandal, district, state, area, land_type, latitude, longitude, status, created_at
- landowners: id, parcel_id, owner_name, phone, address, ownership_percentage, verification_status, created_at
- acquisition_cases: id, case_no, parcel_id, project_id, stage, status, notification_date, award_date, remarks, created_at, updated_at
- compensation: id, case_id, landowner_id, market_value, compensation_amount, payment_status, payment_date, transaction_ref, created_at
- grievances: id, grievance_no, citizen_id, parcel_id, category, description, status, priority, assigned_to, resolution, created_at, resolved_at
- field_tasks: id, parcel_id, officer_id, task_type, description, status, priority, assigned_date, due_date, completed_at, remarks
- approvals: id, case_id, approval_type, requested_by, assigned_to, status, remarks, requested_at, reviewed_at

## 3. Add demo data

Open Supabase -> SQL Editor and run:

`supabase/seed_9_tables.sql`

Run it only once on an empty/demo database. It adds synthetic project, parcel, landowner, case, compensation, grievance, field-task and approval records.

## 4. Test the connection

From the project directory:

```bash
npm install
npm run dev
```

Open the PIA Projects page first. It directly reads from `projects` and `parcels`.

## 5. Understand the data flow

Example: `src/pages/pia/Projects.tsx`

-> calls `usePiaProjects()`

-> `src/hooks/useNalamsData.ts`

-> queries `projects` + `parcels`

-> returns UI-friendly data

-> the existing page design renders it.

This keeps database code in one place instead of writing Supabase calls in every page.

## 6. Current portal mapping

- Central State Performance -> calculated from projects + grievances
- State District Performance -> calculated from projects
- Collector Pending Approvals -> approvals + acquisition_cases + parcels + projects + landowners
- PIA Projects -> projects + parcels
- PIA Landowners -> landowners + parcels + projects + acquisition_cases + compensation
- Field Dashboard -> field_tasks + parcels + projects
- Citizen My Lands -> parcels + projects + acquisition_cases + compensation
- Citizen Grievance -> inserts into grievances

## 7. Important demo limitation

Citizen My Lands currently shows a small demo set of parcels because real user-to-land ownership filtering should be added after Supabase Auth is connected. Do not treat this as production authorization.

## 8. After the data works

Next development order:

1. Supabase Auth
2. connect auth user to profile/role
3. route by role
4. Row Level Security policies
5. citizen-specific ownership filtering
6. create/update buttons
7. document uploads with Supabase Storage
8. Realtime subscriptions
9. Vercel deployment

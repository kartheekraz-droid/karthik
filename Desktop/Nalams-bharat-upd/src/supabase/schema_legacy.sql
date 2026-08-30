-- NALAMS hackathon schema for Supabase/Postgres.
-- All names and records in seed.sql are synthetic demo data.

create extension if not exists pgcrypto;

create table if not exists public.state_metrics (
  id uuid primary key default gen_random_uuid(),
  state text not null unique,
  integration text not null check (integration in ('Connected','In Progress','Not Started')),
  active_projects integer not null default 0,
  acres_cleared_q3 integer not null default 0,
  avg_days integer not null default 0,
  dispute_rate numeric(5,2) not null default 0,
  budget_utilization numeric(5,2) not null default 0,
  grade text not null check (grade in ('A','B','C','D')),
  lat double precision,
  lng double precision,
  updated_at timestamptz not null default now()
);

create table if not exists public.district_metrics (
  id uuid primary key default gen_random_uuid(),
  state text not null,
  district text not null unique,
  active_projects integer not null default 0,
  acres_cleared_q3 integer not null default 0,
  avg_days integer not null default 0,
  dispute_rate numeric(5,2) not null default 0,
  budget_utilization numeric(5,2) not null default 0,
  grade text not null check (grade in ('A','B','C','D')),
  lat double precision,
  lng double precision,
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id text primary key,
  name text not null,
  state text not null,
  district text not null,
  implementing_agency text,
  parcels integer not null default 0,
  acquired integer not null default 0,
  pending integer not null default 0,
  status text not null check (status in ('On Track','Delayed','Critical')),
  budget_inr_crore numeric(12,2),
  created_at timestamptz not null default now()
);

create table if not exists public.landowners (
  id text primary key,
  name text not null,
  phone text,
  village text not null,
  district text not null,
  state text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.parcels (
  id text primary key,
  survey_no text not null unique,
  village text not null,
  district text not null,
  state text not null,
  project_id text not null references public.projects(id) on delete cascade,
  landowner_id text references public.landowners(id) on delete set null,
  area_ha numeric(10,3) not null default 0,
  lat double precision,
  lng double precision,
  status text not null check (status in ('Under Survey','Compensation Calculated','Payment Released','Dispute Raised')),
  stage text,
  updated_at timestamptz not null default now()
);

create table if not exists public.approval_queue (
  id uuid primary key default gen_random_uuid(),
  parcel_id text not null references public.parcels(id) on delete cascade,
  stage text not null,
  days_pending integer not null default 0,
  risk_score integer not null check (risk_score between 1 and 10),
  status text not null default 'Pending' check (status in ('Pending','Approved','Rejected','Escalated')),
  created_at timestamptz not null default now()
);

create table if not exists public.field_tasks (
  id uuid primary key default gen_random_uuid(),
  parcel_id text not null references public.parcels(id) on delete cascade,
  status text not null check (status in ('Pending Visit','Visited — Awaiting Decision','Escalated')),
  assigned_to uuid references auth.users(id),
  notes text,
  updated_at timestamptz not null default now()
);

create table if not exists public.compensation (
  id uuid primary key default gen_random_uuid(),
  parcel_id text not null unique references public.parcels(id) on delete cascade,
  market_value_inr numeric(14,2) not null default 0,
  multiplier numeric(6,2) not null default 1,
  solatium_inr numeric(14,2) not null default 0,
  total_award_inr numeric(14,2) not null default 0,
  payment_status text not null default 'Pending' check (payment_status in ('Pending','Approved','Released')),
  payment_date date
);

create table if not exists public.grievances (
  id uuid primary key default gen_random_uuid(),
  grievance_no text not null unique default ('G-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8))),
  parcel_id text references public.parcels(id) on delete set null,
  user_id uuid references auth.users(id) on delete set null,
  category text not null,
  description text not null,
  status text not null default 'Submitted' check (status in ('Submitted','Under Review','Resolved','Rejected')),
  created_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  parcel_id text references public.parcels(id) on delete cascade,
  grievance_id uuid references public.grievances(id) on delete cascade,
  title text not null,
  file_url text not null,
  uploaded_by uuid references auth.users(id),
  uploaded_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('central','state','collector','pia','field','citizen')),
  display_name text,
  state text,
  district text,
  created_at timestamptz not null default now()
);

-- UI-friendly views keep React queries small and readable.
create or replace view public.pia_projects_view as
select id, name, district, parcels, acquired, pending, status
from public.projects;

create or replace view public.landowners_view as
select l.id, l.name, p.village, p.survey_no, pr.name as project, p.status
from public.parcels p
join public.landowners l on l.id = p.landowner_id
join public.projects pr on pr.id = p.project_id;

create or replace view public.approval_queue_view as
select a.id, pr.name as project, p.survey_no, coalesce(l.name, 'Government / common land') as owner,
       a.stage, a.days_pending, a.risk_score, a.status
from public.approval_queue a
join public.parcels p on p.id = a.parcel_id
join public.projects pr on pr.id = p.project_id
left join public.landowners l on l.id = p.landowner_id;

create or replace view public.field_tasks_view as
select f.id, p.survey_no, p.village, pr.name as project, f.status, f.notes
from public.field_tasks f
join public.parcels p on p.id = f.parcel_id
join public.projects pr on pr.id = p.project_id;

create or replace view public.citizen_parcels_view as
select p.id, p.survey_no, p.village, pr.name as project, p.status, p.landowner_id
from public.parcels p
join public.projects pr on pr.id = p.project_id;

-- DEMO RLS: synthetic read-only data is publicly readable for the hackathon portal.
-- Before production, replace these broad policies with role/state/district/owner-specific policies.
alter table public.state_metrics enable row level security;
alter table public.district_metrics enable row level security;
alter table public.projects enable row level security;
alter table public.landowners enable row level security;
alter table public.parcels enable row level security;
alter table public.approval_queue enable row level security;
alter table public.field_tasks enable row level security;
alter table public.compensation enable row level security;
alter table public.grievances enable row level security;
alter table public.documents enable row level security;
alter table public.profiles enable row level security;

create policy "demo read state metrics" on public.state_metrics for select to anon, authenticated using (true);
create policy "demo read district metrics" on public.district_metrics for select to anon, authenticated using (true);
create policy "demo read projects" on public.projects for select to anon, authenticated using (true);
create policy "demo read landowners" on public.landowners for select to anon, authenticated using (true);
create policy "demo read parcels" on public.parcels for select to anon, authenticated using (true);
create policy "demo read approvals" on public.approval_queue for select to anon, authenticated using (true);
create policy "demo read field tasks" on public.field_tasks for select to anon, authenticated using (true);
create policy "demo read compensation" on public.compensation for select to anon, authenticated using (true);
create policy "demo read grievances" on public.grievances for select to anon, authenticated using (true);

-- Allows the public demo form to submit synthetic grievances. Tighten this before real deployment.
create policy "demo submit grievance" on public.grievances for insert to anon, authenticated with check (true);

create policy "users read own profile" on public.profiles for select to authenticated using ((select auth.uid()) = id);

-- Explicit grants for Supabase Data API.
grant select on public.state_metrics, public.district_metrics, public.projects, public.landowners,
  public.parcels, public.approval_queue, public.field_tasks, public.compensation, public.grievances
  to anon, authenticated;
grant insert on public.grievances to anon, authenticated;
grant select on public.profiles to authenticated;
grant select on public.pia_projects_view, public.landowners_view, public.approval_queue_view,
  public.field_tasks_view, public.citizen_parcels_view to anon, authenticated;

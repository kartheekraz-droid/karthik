import { createClient } from '@supabase/supabase-js'

// Set these in a local .env file (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY)
// and as Environment Variables in the Vercel project settings.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase env vars are missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env',
  )
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '')

// ---- Suggested table shapes (create these in the Supabase SQL editor) ----
// parcels(id, survey_no, village, district, project, stage, lat, lng, owner_name, area_ha)
// cases(id, parcel_id, status, notice_date, hearing_date, award_amount)
// documents(id, case_id, file_url, uploaded_by, uploaded_at)
// profiles(id, role) -- role: 'collector' | 'field' | 'citizen', linked to auth.users

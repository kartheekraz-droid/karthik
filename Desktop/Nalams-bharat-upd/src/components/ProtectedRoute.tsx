import { useEffect, useState, type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabaseClient'

export type PortalRole = 'central' | 'state' | 'collector' | 'pia' | 'field' | 'citizen'

export default function ProtectedRoute({ role, children }: { role: PortalRole; children: ReactNode }) {
  const [session, setSession] = useState<Session | null | undefined>(undefined)
  const location = useLocation()

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) setSession(data.session)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (mounted) setSession(nextSession)
    })

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  if (session === undefined) {
    return (
      <div className="min-h-screen grid place-items-center bg-paper">
        <div className="card text-center max-w-sm">
          <img src="/chakra.svg" alt="" className="w-12 h-12 mx-auto mb-3 chakra-spin" />
          <p className="mb-0 font-semibold text-navy">Checking secure access…</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return <Navigate to={`/login?role=${role}`} replace state={{ from: location.pathname }} />
  }

  const signedInRole = session.user.user_metadata?.role as PortalRole | undefined
  if (signedInRole !== role) {
    return <Navigate to={`/login?role=${role}&error=role`} replace />
  }

  return <>{children}</>
}

import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import FlagBar from '../components/FlagBar'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { supabase } from '../lib/supabaseClient'
import type { PortalRole } from '../components/ProtectedRoute'

type Role = PortalRole

const ROLES: { code: Role; label: string; to: string; officer: boolean }[] = [
  { code: 'central', label: 'Central Government Officer', to: '/central', officer: true },
  { code: 'state', label: 'State Government Officer', to: '/state', officer: true },
  { code: 'collector', label: 'District / Collector Officer', to: '/collector', officer: true },
  { code: 'pia', label: 'Project Implementing Agency', to: '/pia', officer: true },
  { code: 'field', label: 'Field Officer', to: '/field', officer: true },
  { code: 'citizen', label: 'Citizen / Landowner', to: '/citizen', officer: false },
]

function safeId(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9._-]/g, '-')
}

function authEmail(identifier: string, role: Role) {
  const id = safeId(identifier)
  return `${role}-${id}@nalams.local`
}

export default function Login({ mode = 'signin' }: { mode?: 'signin' | 'signup' }) {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  const requestedRole = searchParams.get('role') as Role | null
  const allowedRoles = useMemo(() => mode === 'signup' ? ROLES.filter((r) => r.officer) : ROLES, [mode])
  const initialRole = allowedRoles.some((r) => r.code === requestedRole) ? requestedRole! : (mode === 'signup' ? 'central' : 'collector')

  const [role, setRole] = useState<Role>(initialRole)
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const selected = ROLES.find((r) => r.code === role) ?? ROLES[0]
  const isCitizen = role === 'citizen'

  useEffect(() => {
    if (searchParams.get('error') === 'role') {
      setError('This account does not have access to the selected portal. Sign in with the correct role.')
    }
  }, [searchParams])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setMessage('')

    if (!identifier.trim() || !password) {
      setError(`Enter your ${isCitizen ? 'Parcel ID' : 'Officer ID'} and password.`)
      return
    }
    if (mode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (mode === 'signup' && password.length < 6) {
      setError('Password must contain at least 6 characters.')
      return
    }

    setLoading(true)
    const email = authEmail(identifier, role)

    if (mode === 'signup') {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role,
            officer_id: identifier.trim(),
            display_id: identifier.trim(),
          },
        },
      })

      if (signUpError) {
        setError(signUpError.message)
        setLoading(false)
        return
      }

      if (!data.session) {
        setMessage('Officer account created. If email confirmation is enabled in Supabase, disable it for this ID-based hackathon login or confirm the user from the Supabase dashboard.')
        setLoading(false)
        return
      }

      navigate(selected.to, { replace: true })
      return
    }

    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    if (signInError) {
      setError('Invalid ID or password. Please check your credentials and selected role.')
      setLoading(false)
      return
    }

    const actualRole = data.user.user_metadata?.role as Role | undefined
    if (actualRole !== role) {
      await supabase.auth.signOut()
      setError('The selected role does not match this account.')
      setLoading(false)
      return
    }

    const state = location.state as { from?: string } | null
    navigate(state?.from || selected.to, { replace: true })
  }

  return (
    <>
      <FlagBar />
      <div className="flex justify-between items-center gap-3 p-3 bg-navy flex-wrap">
        <Link to="/" className="text-white no-underline font-bold">← NALAMS Home</Link>
        <div className="flex items-center gap-2">
          {mode === 'signin' ? (
            <Link to="/signup" className="btn btn-saffron !py-2 !px-4 text-sm">Sign Up</Link>
          ) : (
            <Link to="/login" className="btn btn-line !border-white !text-white !py-2 !px-4 text-sm">Sign In</Link>
          )}
          <LanguageSwitcher variant="dark" />
        </div>
      </div>

      <div className="grid grid-cols-2 min-h-[calc(100vh-66px)] max-[900px]:grid-cols-1">
        <section className="bg-navy text-white p-14 flex flex-col justify-end max-[900px]:p-9">
          <p className="kicker !text-[#ffb14d]">SUPABASE SECURE ACCESS</p>
          <h1 className="text-white">{mode === 'signin' ? 'Sign in to your NALAMS portal' : 'Create an officer account'}</h1>
          <p className="text-[#c9d2ff]">
            {mode === 'signin'
              ? 'Choose your role and use the ID issued for that portal.'
              : 'Officer registration is available for government and implementation roles. Citizens do not self-register.'}
          </p>
          <div className="mt-4 rounded-2xl border border-white/15 bg-white/5 p-4 transition hover:-translate-y-1 hover:bg-white/10">
            <strong className="text-[#ffb14d]">Citizen access</strong>
            <p className="text-[#c9d2ff] mb-0 mt-1 text-sm">Citizen / Landowner users sign in with Parcel ID + Password. There is no citizen Sign Up option.</p>
          </div>
        </section>

        <section className="grid place-items-center p-8 max-[600px]:p-4">
          <form onSubmit={handleSubmit} className="w-[min(580px,100%)] bg-white border border-line rounded-[18px] p-7 shadow-card auth-card">
            <div className="flex justify-between items-start gap-4 mb-2">
              <div>
                <p className="kicker mb-1">{mode === 'signin' ? 'WELCOME BACK' : 'OFFICER REGISTRATION'}</p>
                <h2 className="mb-1">{mode === 'signin' ? 'Sign In' : 'Sign Up'}</h2>
              </div>
              <span className="tag tag-s">Supabase Auth</span>
            </div>

            <label className="block text-[13px] font-bold mt-4 mb-2">Select role</label>
            <div className="grid grid-cols-2 gap-2 max-[520px]:grid-cols-1">
              {allowedRoles.map((r) => (
                <label key={r.code} className={`auth-role ${role === r.code ? 'auth-role-active' : ''}`}>
                  <input type="radio" name="role" className="hidden" checked={role === r.code} onChange={() => { setRole(r.code); setError(''); setMessage('') }} />
                  <span>{r.label}</span>
                </label>
              ))}
            </div>

            <label htmlFor="auth-id" className="block text-[13px] font-bold mt-4 mb-2">
              {isCitizen ? 'Parcel ID' : 'Officer ID'}
            </label>
            <input
              id="auth-id"
              required
              autoComplete="username"
              placeholder={isCitizen ? 'e.g. PAR-AP-GNT-0001' : 'e.g. OFF-AP-1042'}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-3 py-3 border border-line rounded-[10px] bg-paper outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20"
            />

            <label htmlFor="auth-password" className="block text-[13px] font-bold mt-4 mb-2">Password</label>
            <input
              id="auth-password"
              required
              minLength={6}
              type="password"
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-3 border border-line rounded-[10px] bg-paper outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20"
            />

            {mode === 'signup' && (
              <>
                <label htmlFor="auth-confirm" className="block text-[13px] font-bold mt-4 mb-2">Confirm Password</label>
                <input
                  id="auth-confirm"
                  required
                  minLength={6}
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-3 border border-line rounded-[10px] bg-paper outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                />
              </>
            )}

            {error && <div className="mt-4 rounded-xl border border-red/25 bg-[#fff1ef] p-3 text-sm font-semibold text-red">{error}</div>}
            {message && <div className="mt-4 rounded-xl border border-green/25 bg-green-tint p-3 text-sm font-semibold text-green-deep">{message}</div>}

            <button className="btn btn-saffron w-full mt-5" type="submit" disabled={loading}>
              {loading ? 'Please wait…' : mode === 'signin' ? `Sign In as ${selected.label}` : `Create ${selected.label} Account`}
            </button>

            <p className="mt-4 mb-0 text-sm text-center">
              {mode === 'signin' ? (
                <>Officer without an account? <Link to="/signup" className="font-bold text-saffron-deep">Sign Up</Link></>
              ) : (
                <>Already registered? <Link to="/login" className="font-bold text-saffron-deep">Sign In</Link></>
              )}
            </p>
          </form>
        </section>
      </div>
    </>
  )
}

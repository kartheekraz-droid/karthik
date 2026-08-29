import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FlagBar from '../components/FlagBar'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { useLanguage } from '../context/LanguageContext'

type Role = 'collector' | 'field' | 'citizen'

export default function Login() {
  const { t } = useLanguage()
  const [role, setRole] = useState<Role>('collector')
  const [employeeId, setEmployeeId] = useState('collector.pune@gov.in')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // TODO: wire up supabase.auth.signInWithPassword({ email: employeeId, password })
    navigate(role === 'citizen' ? '/citizen' : '/dashboard')
  }

  return (
    <>
      <FlagBar />
      <div className="flex justify-end p-3 bg-navy">
        <LanguageSwitcher variant="dark" />
      </div>
      <div className="grid grid-cols-2 min-h-[calc(100vh-58px)] max-[900px]:grid-cols-1">
        <section className="bg-navy text-white p-14 flex flex-col justify-end max-[900px]:p-9">
          <p className="kicker !text-[#ffb14d]">{t('login.secure')}</p>
          <h1 className="text-white">{t('login.title')}</h1>
          <p className="text-[#c9d2ff]">{t('login.desc')}</p>
          <p>
            <Link to="/" className="text-[#ffb14d]">{t('login.back')}</Link>
          </p>
        </section>
        <section className="grid place-items-center p-10">
          <form
            onSubmit={handleSubmit}
            className="w-[min(420px,100%)] bg-white border border-line rounded-[18px] p-7 shadow-card"
          >
            <h2>{t('login.signIn')}</h2>
            <p>{t('login.choose')}</p>

            <label htmlFor="id" className="block text-[13px] font-bold my-3">{t('login.idLabel')}</label>
            <input
              id="id"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="w-full px-3 py-3 border border-line rounded-[10px] bg-paper"
            />

            <label htmlFor="pw" className="block text-[13px] font-bold my-3">{t('login.pwLabel')}</label>
            <input
              id="pw"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-3 border border-line rounded-[10px] bg-paper"
            />

            <label className="block text-[13px] font-bold my-3">{t('login.roleLabel')}</label>
            <div className="grid grid-cols-3 gap-2">
              {(['collector', 'field', 'citizen'] as Role[]).map((r) => (
                <label
                  key={r}
                  className={
                    'text-center border-2 rounded-[10px] px-1.5 py-2.5 cursor-pointer capitalize ' +
                    (role === r ? 'border-navy text-navy' : 'border-line')
                  }
                >
                  <input
                    type="radio"
                    name="role"
                    className="hidden"
                    checked={role === r}
                    onChange={() => setRole(r)}
                  />
                  <span>{t(`login.role.${r}`)}</span>
                </label>
              ))}
            </div>

            <button className="btn btn-navy w-full mt-4" type="submit">{t('login.continue')}</button>
            <p className="mt-3.5 text-sm">
              <Link to="/citizen">{t('login.citizenInstead')}</Link>
            </p>
          </form>
        </section>
      </div>
    </>
  )
}

import { Link, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '../context/LanguageContext'

const SIDE_LINKS = [
  { key: 'nav.commandDashboard', to: '/dashboard' },
  { key: 'nav.liveMap', to: '/map' },
  { key: 'nav.parcelFile', to: '/parcel' },
  { key: 'nav.landowner', to: '/citizen' },
  { key: 'nav.publicHome', to: '/' },
]

export default function AppShell({
  topbarLeft,
  topbarRight,
  children,
}: {
  topbarLeft: ReactNode
  topbarRight?: ReactNode
  children: ReactNode
}) {
  const { t } = useLanguage()
  const { pathname } = useLocation()

  return (
    <div className="grid grid-cols-[240px_1fr] min-h-[calc(100vh-10px)] max-[900px]:grid-cols-1">
      <aside className="bg-navy-2 text-[#eef1ff] p-[20px_14px]">
        <Link to="/" className="flex items-center gap-3 text-white no-underline font-bold tracking-[0.04em] m-[8px_8px_20px] p-0">
          <img className="w-10 h-10 shrink-0" src="/chakra.svg" alt="" />
          <span>NALAMS</span>
        </Link>
        {SIDE_LINKS.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={
              'block text-[#d5dcff] no-underline px-3 py-2.5 rounded-[10px] text-sm font-semibold hover:bg-white/10 hover:text-white ' +
              (l.to === pathname ? 'bg-white/10 text-white' : '')
            }
          >
            {t(l.key)}
          </Link>
        ))}
        <div className="m-[18px_12px]">
          <LanguageSwitcher variant="dark" />
        </div>
        <p className="text-[#9eacde] text-xs m-[10px_12px]">{t('nav.legend')}</p>
      </aside>
      <div className="min-w-0">
        <div className="bg-white border-b border-line px-6 py-3.5 flex justify-between items-center gap-3">
          {topbarLeft}
          {topbarRight}
        </div>
        <div className="p-[28px_24px_48px]">{children}</div>
      </div>
    </div>
  )
}

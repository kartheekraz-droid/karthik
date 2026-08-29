import { Link, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import LanguageSwitcher from './LanguageSwitcher'

export interface PortalNavItem {
  label: string
  to: string
}

export default function PortalShell({
  portalLabel,
  portalHome,
  navItems,
  topbarLeft,
  topbarRight,
  children,
}: {
  portalLabel: string
  portalHome: string
  navItems: PortalNavItem[]
  topbarLeft: ReactNode
  topbarRight?: ReactNode
  children: ReactNode
}) {
  const { pathname } = useLocation()

  return (
    <div className="grid grid-cols-[240px_1fr] min-h-[calc(100vh-10px)] max-[900px]:grid-cols-1">
      <aside className="bg-navy-2 text-[#eef1ff] p-[20px_14px] flex flex-col">
        <Link to="/" className="flex items-center gap-3 text-white no-underline font-bold tracking-[0.04em] m-[8px_8px_20px] p-0">
          <img className="w-10 h-10 shrink-0" src="/chakra.svg" alt="" />
          <span>NALAMS</span>
        </Link>
        <p className="text-[#ffb14d] text-[11px] font-bold uppercase tracking-[0.1em] mx-3 mb-2">
          {portalLabel}
        </p>
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={
              'block text-[#d5dcff] no-underline px-3 py-2.5 rounded-[10px] text-sm font-semibold hover:bg-white/10 hover:text-white ' +
              (item.to === pathname ? 'bg-white/10 text-white' : '')
            }
          >
            {item.label}
          </Link>
        ))}
        <div className="mt-auto pt-4">
          <div className="m-[0_12px_12px]">
            <LanguageSwitcher variant="dark" />
          </div>
          <Link to={portalHome === pathname ? '/' : '/'} className="block text-[#9eacde] text-xs mx-3 no-underline hover:text-white">
            ← All portals
          </Link>
        </div>
      </aside>
      <div className="min-w-0">
        <div className="bg-white border-b border-line px-6 py-3.5 flex justify-between items-center gap-3 flex-wrap">
          {topbarLeft}
          {topbarRight}
        </div>
        <div className="p-[28px_24px_48px]">{children}</div>
      </div>
    </div>
  )
}

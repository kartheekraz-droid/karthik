import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

const SIDE_LINKS = [
  { label: 'Command dashboard', to: '/dashboard' },
  { label: 'Live GIS map', to: '/map' },
  { label: 'Parcel case file', to: '/parcel' },
  { label: 'Landowner portal', to: '/citizen' },
  { label: 'Public home', to: '/' },
]

export default function AppShell({
  active,
  topbarLeft,
  topbarRight,
  children,
}: {
  active: string
  topbarLeft: ReactNode
  topbarRight?: ReactNode
  children: ReactNode
}) {
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
              (l.label === active ? 'bg-white/10 text-white' : '')
            }
          >
            {l.label}
          </Link>
        ))}
        <p className="text-[#9eacde] text-xs m-[18px_12px]">
          Saffron = needs action. Green = closed. Navy = inventory.
        </p>
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

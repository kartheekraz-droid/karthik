import { Link } from 'react-router-dom'

interface NavLink {
  label: string
  to: string
}

export default function SiteHeader({
  active,
  subtitle = 'भारत सरकार · PROTOTYPE',
  links,
}: {
  active: string
  subtitle?: string
  links: NavLink[]
}) {
  return (
    <header className="bg-navy text-white">
      <div className="wrap flex items-center justify-between gap-4 min-h-[72px]">
        <Link to="/" className="flex items-center gap-3 text-white no-underline font-bold tracking-[0.04em]">
          <img className="w-10 h-10 shrink-0" src="/chakra.svg" alt="" />
          <span>
            NALAMS
            <small className="block font-medium opacity-80 text-[11px] tracking-[0.12em]">
              {subtitle}
            </small>
          </span>
        </Link>
        <nav className="flex gap-1.5 flex-wrap items-center">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={
                'text-[#dce3ff] no-underline px-3 py-2 rounded-full text-sm font-semibold hover:bg-white/10 hover:text-white ' +
                (link.label === active ? 'bg-white/10 text-white' : '') +
                (link.label === 'Officer login'
                  ? ' !bg-saffron !text-[#2a1400] hover:!bg-[#ffb14d]'
                  : '')
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

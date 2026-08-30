import { Link } from 'react-router-dom'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '../context/LanguageContext'

interface NavLink {
  key: string
  to: string
  cta?: boolean
}

export default function SiteHeader({
  activeTo,
  subtitle,
  links,
}: {
  activeTo: string
  subtitle?: string
  links: NavLink[]
}) {
  const { t } = useLanguage()
  return (
    <header className="bg-navy text-white">
      <div className="wrap flex items-center justify-between gap-4 min-h-[72px] flex-wrap py-2">
        <Link to="/" className="flex items-center gap-3 text-white no-underline font-bold tracking-[0.04em]">
          <img className="w-10 h-10 shrink-0" src="/chakra.svg" alt="" />
          <span>
            NALAMS
            <small className="block font-medium opacity-80 text-[11px] tracking-[0.12em]">
              {subtitle ?? 'भारत सरकार · PROTOTYPE'}
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
                (link.to === activeTo ? 'bg-white/10 text-white' : '') +
                (link.cta ? ' !bg-saffron !text-[#2a1400] hover:!bg-[#ffb14d]' : '')
              }
            >
              {t(link.key)}
            </Link>
          ))}
          <Link to="/login" className="text-[#dce3ff] no-underline px-3 py-2 rounded-full text-sm font-semibold hover:bg-white/10 hover:text-white">Sign In</Link>
          <Link to="/signup" className="btn btn-saffron !py-2 !px-4 text-sm">Sign Up</Link>
          <LanguageSwitcher variant="dark" />
        </nav>
      </div>
    </header>
  )
}

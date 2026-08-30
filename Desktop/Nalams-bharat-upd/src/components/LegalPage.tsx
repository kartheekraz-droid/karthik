import { Link } from 'react-router-dom'
import FlagBar from './FlagBar'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import { useLanguage } from '../context/LanguageContext'

const NAV = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.features', to: '/#features' },
  { key: 'nav.pricing', to: '/#pricing' },
  { key: 'nav.about', to: '/#about-us' },
]

export default function LegalPage({ titleKey, bodyKey }: { titleKey: string; bodyKey: string }) {
  const { t } = useLanguage()
  return (
    <>
      <FlagBar />
      <SiteHeader activeTo="/legal" links={NAV} />

      <section className="py-16">
        <div className="wrap max-w-[760px]">
          <Link to="/" className="text-sm no-underline text-muted hover:text-ink">{t('legal.back')}</Link>
          <h1 className="mt-3">{t(titleKey)}</h1>
          <p className="text-lg">{t(bodyKey)}</p>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}

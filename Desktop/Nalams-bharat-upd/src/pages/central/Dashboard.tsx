import PortalShell from '../../components/PortalShell'
import StatCard from '../../components/StatCard'
import CompensationCalculator from '../../components/CompensationCalculator'
import { useLanguage } from '../../context/LanguageContext'

export default function CentralDashboard() {
  const { t } = useLanguage()

  const TICKER = [t('central.dash.ticker1'), t('central.dash.ticker2'), t('central.dash.ticker3')]

  const NAV = [
    { label: t('central.nav.command'), to: '/central' },
    { label: t('central.nav.states'), to: '/central/states' },
    { label: t('central.nav.gis'), to: '/central/gis' },
    { label: t('central.nav.budget'), to: '/central/budget' },
    { label: t('central.nav.compliance'), to: '/central/compliance' },
    { label: t('central.nav.integration'), to: '/central/integration' },
  ]

  return (
    <PortalShell
      portalLabel={t('portal.central')}
      portalHome="/central"
      navItems={NAV}
      topbarLeft={<strong>{t('central.dash.topbarTitle')}</strong>}
      topbarRight={<span className="tag tag-s">{t('central.dash.topbarTag')}</span>}
    >
      <h1>{t('central.dash.title')}</h1>
      <p>{t('central.dash.desc')}</p>

      <div className="grid grid-cols-3 gap-3 my-5 max-[900px]:grid-cols-1">
        <StatCard label={t('central.dash.stat.land')} value="1,24,500 acres" />
        <StatCard label={t('central.dash.stat.projects')} value="342" />
        <StatCard label={t('central.dash.stat.compensation')} value="₹12,450 Cr" tone="green" />
        <StatCard label={t('central.dash.stat.disputeRate')} value="8.5%" tone="saffron" />
        <StatCard label={t('central.dash.stat.statesDelay')} value="4 flagged" tone="red" />
        <StatCard label={t('central.dash.stat.integration')} value="18 / 28 states" tone="navy" />
      </div>

      <section className="card">
        <h3>{t('central.dash.tickerTitle')}</h3>
        <ul className="space-y-2 mt-2">
          {TICKER.map((line) => (
            <li key={line} className="text-sm text-muted border-b border-[#ece8df] pb-2 last:border-0">
              {line}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-3.5">
        <CompensationCalculator
          variant="officer"
          title="National compensation benchmark"
          note="Benchmark a state's reported figures against the standard LARR Act, 2013 formula for policy compliance reviews."
        />
      </div>
    </PortalShell>
  )
}

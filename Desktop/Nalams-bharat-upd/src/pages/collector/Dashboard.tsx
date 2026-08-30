import { Link } from 'react-router-dom'
import PortalShell from '../../components/PortalShell'
import StatCard from '../../components/StatCard'
import CompensationCalculator from '../../components/CompensationCalculator'
import { useLanguage } from '../../context/LanguageContext'

export default function CollectorDashboard() {
  const { t } = useLanguage()

  const NAV = [
    { label: t('collector.nav.command'), to: '/collector' },
    { label: t('collector.nav.map'), to: '/collector/map' },
    { label: t('collector.nav.approvals'), to: '/collector/approvals' },
    { label: t('collector.nav.budget'), to: '/collector/budget' },
    { label: t('collector.nav.alerts'), to: '/collector/alerts' },
    { label: t('collector.nav.analytics'), to: '/collector/analytics' },
  ]

  const PIPELINE = [
    { n: 47, key: 'home.step.identified', tone: 'step-n' },
    { n: 41, key: 'home.step.surveyed', tone: 'step-n' },
    { n: 29, key: 'home.step.notified', tone: 'step-s' },
    { n: 12, key: 'home.step.objection', tone: 'step-s' },
    { n: 18, key: 'home.step.awarded', tone: 'step-g' },
    { n: 18, key: 'home.step.possession', tone: 'step-g' },
  ]

  return (
    <PortalShell
      portalLabel={t('portal.collector')}
      portalHome="/collector"
      navItems={NAV}
      topbarLeft={<strong>{t('collector.dash.topbarTitle')}</strong>}
      topbarRight={<span className="tag tag-s">{t('collector.dash.topbarTag')}</span>}
    >
      <h1>{t('collector.dash.title')}</h1>
      <p>{t('collector.dash.desc')}</p>

      <div className="grid grid-cols-4 gap-3 my-5 max-[900px]:grid-cols-1">
        <StatCard label={t('collector.dash.stat.actionRequired')} value="6 files" tone="saffron" />
        <StatCard label={t('collector.dash.stat.delayAlerts')} value="3 overdue" tone="red" />
        <StatCard label={t('collector.dash.stat.compPending')} value="₹6.1 Cr" />
        <StatCard label={t('collector.dash.stat.disputes')} value="12" tone="saffron" />
      </div>

      <div className="grid grid-cols-[1.4fr_0.8fr] gap-3.5 max-[900px]:grid-cols-1">
        <section className="card">
          <h3>{t('collector.dash.pipeline')}</h3>
          <div className="grid grid-cols-6 gap-2 my-3 max-[900px]:grid-cols-1">
            {PIPELINE.map((step) => (
              <div key={step.key} className={`step ${step.tone}`}><b>{step.n}</b>{t(step.key)}</div>
            ))}
          </div>
        </section>
        <section className="card">
          <h3>{t('collector.dash.decisionTitle')}</h3>
          <p>{t('collector.dash.decisionDesc')}</p>
          <div className="flex gap-2.5 mt-2 flex-wrap">
            <Link className="btn btn-saffron" to="/collector/map">{t('collector.dash.seeMap')}</Link>
            <Link className="btn btn-line" to="/collector/approvals">{t('collector.dash.openApprovals')}</Link>
          </div>
        </section>
      </div>

      <div className="mt-3.5">
        <CompensationCalculator
          variant="officer"
          note="Cross-check a PIA's compensation award before you sign off on it — same LARR Act, 2013 formula the landowner sees."
        />
      </div>
    </PortalShell>
  )
}

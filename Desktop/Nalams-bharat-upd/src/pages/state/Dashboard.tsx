import { Link } from 'react-router-dom'
import PortalShell from '../../components/PortalShell'
import StatCard from '../../components/StatCard'
import GradeBadge from '../../components/GradeBadge'
import CompensationCalculator from '../../components/CompensationCalculator'
import { DISTRICT_PERFORMANCE } from '../../data/mockData'
import { useLanguage } from '../../context/LanguageContext'

export default function StateDashboard() {
  const { t } = useLanguage()

  const NAV = [
    { label: t('state.nav.command'), to: '/state' },
    { label: t('state.nav.districts'), to: '/state/districts' },
    { label: t('state.nav.gis'), to: '/state/gis' },
    { label: t('state.nav.budget'), to: '/state/budget' },
  ]

  return (
    <PortalShell
      portalLabel={t('portal.state')}
      portalHome="/state"
      navItems={NAV}
      topbarLeft={<strong>{t('state.dash.topbarTitle')}</strong>}
      topbarRight={<span className="tag tag-s">{t('state.dash.topbarTag')}</span>}
    >
      <h1>{t('state.dash.title')}</h1>
      <p>{t('state.dash.desc')}</p>

      <div className="grid grid-cols-4 gap-3 my-5 max-[900px]:grid-cols-1">
        <StatCard label={t('state.dash.stat.activeProjects')} value="52" />
        <StatCard label={t('state.dash.stat.acresCleared')} value="4,800" tone="green" />
        <StatCard label={t('state.dash.stat.disputeRate')} value="9.8%" tone="saffron" />
        <StatCard label={t('state.dash.stat.budgetUtil')} value="72.0%" tone="navy" />
      </div>

      <section className="card">
        <div className="flex justify-between items-center mb-2">
          <h3 className="mb-0">{t('state.dash.topDistricts')}</h3>
          <Link className="btn btn-line" to="/state/districts">{t('state.dash.seeAll')}</Link>
        </div>
        <table className="w-full border-collapse text-[14px]">
          <thead>
            <tr>
              <th className="text-left py-2.5 px-2 text-muted text-xs border-b border-[#ece8df]">{t('state.dash.th.district')}</th>
              <th className="text-left py-2.5 px-2 text-muted text-xs border-b border-[#ece8df]">{t('state.dash.th.activeProjects')}</th>
              <th className="text-left py-2.5 px-2 text-muted text-xs border-b border-[#ece8df]">{t('state.dash.th.disputeRate')}</th>
              <th className="text-left py-2.5 px-2 text-muted text-xs border-b border-[#ece8df]">{t('state.dash.th.grade')}</th>
            </tr>
          </thead>
          <tbody>
            {DISTRICT_PERFORMANCE.map((d) => (
              <tr key={d.district}>
                <td className="py-2.5 px-2 border-b border-[#ece8df] font-semibold">
                  <Link to="/collector" className="text-navy no-underline hover:underline">{d.district}</Link>
                </td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">{d.activeProjects}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">{d.disputeRate}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]"><GradeBadge grade={d.grade} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="mt-3.5">
        <CompensationCalculator
          variant="officer"
          title="State-level compensation sanity check"
          note="Spot-check whether a district's awards line up with the LARR Act, 2013 formula before they raise a flag."
        />
      </div>
    </PortalShell>
  )
}

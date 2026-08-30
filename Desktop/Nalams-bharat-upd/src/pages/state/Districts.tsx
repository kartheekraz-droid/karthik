import { Link } from 'react-router-dom'
import PortalShell from '../../components/PortalShell'
import GradeBadge from '../../components/GradeBadge'
import { DISTRICT_PERFORMANCE } from '../../data/mockData'
import { useLanguage } from '../../context/LanguageContext'

export default function StateDistricts() {
  const { t } = useLanguage()

  const NAV = [
    { label: t('state.nav.command'), to: '/state' },
    { label: t('state.nav.districts'), to: '/state/districts' },
    { label: t('state.nav.gis'), to: '/state/gis' },
    { label: t('state.nav.budget'), to: '/state/budget' },
  ]

  const HEADERS = [
    t('state.districts.th.district'),
    t('state.districts.th.activeProjects'),
    t('state.districts.th.acresCleared'),
    t('state.districts.th.avgDays'),
    t('state.districts.th.disputeRate'),
    t('state.districts.th.budgetUse'),
    t('state.districts.th.grade'),
  ]

  return (
    <PortalShell
      portalLabel={t('portal.state')}
      portalHome="/state"
      navItems={NAV}
      topbarLeft={<strong>{t('state.districts.topbarTitle')}</strong>}
      topbarRight={<Link className="btn btn-line" to="/state">{t('state.districts.back')}</Link>}
    >
      <h1>{t('state.districts.title')}</h1>
      <p>{t('state.districts.desc')}</p>

      <section className="card overflow-x-auto">
        <table className="w-full border-collapse text-[14px] min-w-[720px]">
          <thead>
            <tr>
              {HEADERS.map((h) => (
                <th key={h} className="text-left py-2.5 px-2 text-muted text-xs border-b border-[#ece8df]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DISTRICT_PERFORMANCE.map((d) => (
              <tr key={d.district}>
                <td className="py-2.5 px-2 border-b border-[#ece8df] font-semibold">
                  <Link to="/collector" className="text-navy no-underline hover:underline">{d.district}</Link>
                </td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">{d.activeProjects}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">{d.acresClearedQ3.toLocaleString('en-IN')}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">{d.avgDays}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">{d.disputeRate}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">{d.budgetUtilization}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]"><GradeBadge grade={d.grade} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PortalShell>
  )
}

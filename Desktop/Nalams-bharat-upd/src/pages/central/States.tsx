import { Link } from 'react-router-dom'
import PortalShell from '../../components/PortalShell'
import GradeBadge from '../../components/GradeBadge'
import Badge from '../../components/Badge'
import { STATE_PERFORMANCE } from '../../data/mockData'
import { useLanguage } from '../../context/LanguageContext'

export default function CentralStates() {
  const { t } = useLanguage()

  const NAV = [
    { label: t('central.nav.command'), to: '/central' },
    { label: t('central.nav.states'), to: '/central/states' },
    { label: t('central.nav.gis'), to: '/central/gis' },
    { label: t('central.nav.budget'), to: '/central/budget' },
    { label: t('central.nav.compliance'), to: '/central/compliance' },
    { label: t('central.nav.integration'), to: '/central/integration' },
  ]

  const HEADERS = [
    t('central.states.th.state'),
    t('central.states.th.integration'),
    t('central.states.th.activeProjects'),
    t('central.states.th.acresCleared'),
    t('central.states.th.avgDays'),
    t('central.states.th.disputeRate'),
    t('central.states.th.budgetUse'),
    t('central.states.th.grade'),
  ]

  return (
    <PortalShell
      portalLabel={t('portal.central')}
      portalHome="/central"
      navItems={NAV}
      topbarLeft={<strong>{t('central.states.topbarTitle')}</strong>}
      topbarRight={<Link className="btn btn-line" to="/central">{t('central.states.back')}</Link>}
    >
      <h1>{t('central.states.title')}</h1>
      <p>{t('central.states.desc')}</p>

      <section className="card overflow-x-auto">
        <table className="w-full border-collapse text-[14px] min-w-[820px]">
          <thead>
            <tr>
              {HEADERS.map((h) => (
                <th key={h} className="text-left py-2.5 px-2 text-muted text-xs border-b border-[#ece8df]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {STATE_PERFORMANCE.map((row) => (
              <tr key={row.state}>
                <td className="py-2.5 px-2 border-b border-[#ece8df] font-semibold">
                  <Link to="/state" className="text-navy no-underline hover:underline">{row.state}</Link>
                </td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">
                  <Badge tone={row.integration === 'Connected' ? 'green' : row.integration === 'In Progress' ? 'saffron' : 'red'}>
                    {row.integration}
                  </Badge>
                </td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">{row.activeProjects}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">{row.acresClearedQ3.toLocaleString('en-IN')}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">{row.avgDays}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">{row.disputeRate}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">{row.budgetUtilization}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]"><GradeBadge grade={row.grade} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PortalShell>
  )
}

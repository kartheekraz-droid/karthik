import { Link } from 'react-router-dom'
import PortalShell from '../../components/PortalShell'
import GradeBadge from '../../components/GradeBadge'
import { DISTRICT_PERFORMANCE } from '../../data/mockData'

const NAV = [
  { label: 'State Command Center', to: '/state' },
  { label: 'District Performance', to: '/state/districts' },
  { label: 'State GIS', to: '/state/gis' },
  { label: 'State Budget', to: '/state/budget' },
]

export default function StateDistricts() {
  return (
    <PortalShell
      portalLabel="State Government"
      portalHome="/state"
      navItems={NAV}
      topbarLeft={<strong>All Districts — Maharashtra</strong>}
      topbarRight={<Link className="btn btn-line" to="/state">← Command Center</Link>}
    >
      <h1>District performance grid</h1>
      <p>Click a district to open its Collector command center.</p>

      <section className="card overflow-x-auto">
        <table className="w-full border-collapse text-[14px] min-w-[720px]">
          <thead>
            <tr>
              {['District', 'Active Projects', 'Acres Cleared (Q3)', 'Avg. Days', 'Dispute Rate', 'Budget Use', 'Grade'].map((h) => (
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

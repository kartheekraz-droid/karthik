import { Link } from 'react-router-dom'
import PortalShell from '../../components/PortalShell'
import GradeBadge from '../../components/GradeBadge'
import Badge from '../../components/Badge'
import { STATE_PERFORMANCE } from '../../data/mockData'

const NAV = [
  { label: 'Command Center', to: '/central' },
  { label: 'State Performance', to: '/central/states' },
  { label: 'National GIS', to: '/central/gis' },
  { label: 'Budget Oversight', to: '/central/budget' },
  { label: 'Policy Compliance', to: '/central/compliance' },
  { label: 'Integration Hub', to: '/central/integration' },
]

export default function CentralStates() {
  return (
    <PortalShell
      portalLabel="Central Government"
      portalHome="/central"
      navItems={NAV}
      topbarLeft={<strong>State-wise Performance Grid</strong>}
      topbarRight={<Link className="btn btn-line" to="/central">← Command Center</Link>}
    >
      <h1>The Centre manages states, not files</h1>
      <p>Click through to a state to see its districts and active projects (drill-down demo below links to the District/Collector portal).</p>

      <section className="card overflow-x-auto">
        <table className="w-full border-collapse text-[14px] min-w-[820px]">
          <thead>
            <tr>
              {['State/UT', 'Integration', 'Active Projects', 'Acres Cleared (Q3)', 'Avg. Days', 'Dispute Rate', 'Budget Use', 'Grade'].map((h) => (
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

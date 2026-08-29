import { Link } from 'react-router-dom'
import PortalShell from '../../components/PortalShell'
import StatCard from '../../components/StatCard'
import GradeBadge from '../../components/GradeBadge'
import { DISTRICT_PERFORMANCE } from '../../data/mockData'

const NAV = [
  { label: 'State Command Center', to: '/state' },
  { label: 'District Performance', to: '/state/districts' },
  { label: 'State GIS', to: '/state/gis' },
  { label: 'State Budget', to: '/state/budget' },
]

export default function StateDashboard() {
  return (
    <PortalShell
      portalLabel="State Government"
      portalHome="/state"
      navItems={NAV}
      topbarLeft={<strong>Maharashtra · State Command Center</strong>}
      topbarRight={<span className="tag tag-s">3 districts need support</span>}
    >
      <h1>State at a glance</h1>
      <p>The Centre manages states; the state manages districts. Same national playbook, one level down.</p>

      <div className="grid grid-cols-4 gap-3 my-5 max-[900px]:grid-cols-1">
        <StatCard label="Active projects" value="52" />
        <StatCard label="Acres cleared (Q3)" value="4,800" tone="green" />
        <StatCard label="Dispute rate" value="9.8%" tone="saffron" />
        <StatCard label="Budget utilization" value="72.0%" tone="navy" />
      </div>

      <section className="card">
        <div className="flex justify-between items-center mb-2">
          <h3 className="mb-0">Top districts by grade</h3>
          <Link className="btn btn-line" to="/state/districts">See all districts</Link>
        </div>
        <table className="w-full border-collapse text-[14px]">
          <thead>
            <tr>
              <th className="text-left py-2.5 px-2 text-muted text-xs border-b border-[#ece8df]">District</th>
              <th className="text-left py-2.5 px-2 text-muted text-xs border-b border-[#ece8df]">Active Projects</th>
              <th className="text-left py-2.5 px-2 text-muted text-xs border-b border-[#ece8df]">Dispute Rate</th>
              <th className="text-left py-2.5 px-2 text-muted text-xs border-b border-[#ece8df]">Grade</th>
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
    </PortalShell>
  )
}

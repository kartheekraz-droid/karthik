import PortalShell from '../../components/PortalShell'
import StatCard from '../../components/StatCard'

const TICKER = [
  'Collector of Guntur approved compensation award for Hyderabad Metro Phase 2',
  'Maharashtra crossed 10,000 acres cleared this quarter',
  'Grievance #G-8842 in Bihar escalated beyond 30 days — Central review triggered',
]

const NAV = [
  { label: 'Command Center', to: '/central' },
  { label: 'State Performance', to: '/central/states' },
  { label: 'National GIS', to: '/central/gis' },
  { label: 'Budget Oversight', to: '/central/budget' },
  { label: 'Policy Compliance', to: '/central/compliance' },
  { label: 'Integration Hub', to: '/central/integration' },
]

export default function CentralDashboard() {
  return (
    <PortalShell
      portalLabel="Central Government"
      portalHome="/central"
      navItems={NAV}
      topbarLeft={<strong>National Command Center · India at a Glance</strong>}
      topbarRight={<span className="tag tag-s">8.5% national dispute rate</span>}
    >
      <h1>India at a glance</h1>
      <p>Every state, every project, one screen — the highest level of end-to-end digital monitoring.</p>

      <div className="grid grid-cols-3 gap-3 my-5 max-[900px]:grid-cols-1">
        <StatCard label="Land under acquisition" value="1,24,500 acres" />
        <StatCard label="Active national projects" value="342" />
        <StatCard label="Compensation disbursed (FY26)" value="₹12,450 Cr" tone="green" />
        <StatCard label="National dispute rate" value="8.5%" tone="saffron" />
        <StatCard label="States with critical delays" value="4 flagged" tone="red" />
        <StatCard label="Platform integration" value="18 / 28 states" tone="navy" />
      </div>

      <section className="card">
        <h3>Real-time national ticker</h3>
        <ul className="space-y-2 mt-2">
          {TICKER.map((line) => (
            <li key={line} className="text-sm text-muted border-b border-[#ece8df] pb-2 last:border-0">
              {line}
            </li>
          ))}
        </ul>
      </section>
    </PortalShell>
  )
}

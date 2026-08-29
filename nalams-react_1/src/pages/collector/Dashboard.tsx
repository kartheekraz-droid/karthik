import { Link } from 'react-router-dom'
import PortalShell from '../../components/PortalShell'
import StatCard from '../../components/StatCard'

const NAV = [
  { label: 'Command Center', to: '/collector' },
  { label: 'GIS Acquisition Map', to: '/collector/map' },
  { label: 'Pending Approvals', to: '/collector/approvals' },
  { label: 'Budget Tracker', to: '/collector/budget' },
  { label: 'Alerts & Disputes', to: '/collector/alerts' },
  { label: 'District Analytics', to: '/collector/analytics' },
]

export default function CollectorDashboard() {
  return (
    <PortalShell
      portalLabel="District / Collector"
      portalHome="/collector"
      navItems={NAV}
      topbarLeft={<strong>Pune district · NH-48 widening</strong>}
      topbarRight={<span className="tag tag-s">9 SLA at risk</span>}
    >
      <h1>My district at a glance</h1>
      <p>Not a list of files — a cockpit that tells you what needs your decision right now.</p>

      <div className="grid grid-cols-4 gap-3 my-5 max-[900px]:grid-cols-1">
        <StatCard label="Action required today" value="6 files" tone="saffron" />
        <StatCard label="Delay alerts" value="3 overdue" tone="red" />
        <StatCard label="Compensation pending" value="₹6.1 Cr" />
        <StatCard label="Active disputes" value="12" tone="saffron" />
      </div>

      <div className="grid grid-cols-[1.4fr_0.8fr] gap-3.5 max-[900px]:grid-cols-1">
        <section className="card">
          <h3>Pipeline</h3>
          <div className="grid grid-cols-6 gap-2 my-3 max-[900px]:grid-cols-1">
            <div className="step step-n"><b>47</b>Identified</div>
            <div className="step step-n"><b>41</b>Surveyed</div>
            <div className="step step-s"><b>29</b>Notified</div>
            <div className="step step-s"><b>12</b>Objection</div>
            <div className="step step-g"><b>18</b>Awarded</div>
            <div className="step step-g"><b>18</b>Possession</div>
          </div>
        </section>
        <section className="card">
          <h3>Today's decision</h3>
          <p>Unblock the forest belt first. That releases most of the remaining right-of-way into award.</p>
          <div className="flex gap-2.5 mt-2 flex-wrap">
            <Link className="btn btn-saffron" to="/collector/map">See on map</Link>
            <Link className="btn btn-line" to="/collector/approvals">Open approvals</Link>
          </div>
        </section>
      </div>
    </PortalShell>
  )
}

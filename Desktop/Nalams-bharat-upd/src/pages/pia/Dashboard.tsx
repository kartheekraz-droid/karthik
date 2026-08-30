import PortalShell from '../../components/PortalShell'
import StatCard from '../../components/StatCard'
import CompensationCalculator from '../../components/CompensationCalculator'

const NAV = [
  { label: 'Dashboard', to: '/pia' },
  { label: 'Projects', to: '/pia/projects' },
  { label: 'Land Identification', to: '/pia/land' },
  { label: 'Landowners', to: '/pia/landowners' },
  { label: 'Documents', to: '/pia/documents' },
  { label: 'Grievances', to: '/pia/grievances' },
]

export default function PiaDashboard() {
  return (
    <PortalShell
      portalLabel="Project Implementing Agency"
      portalHome="/pia"
      navItems={NAV}
      topbarLeft={<strong>PIA Dashboard</strong>}
      topbarRight={<span className="tag tag-s">3 approvals pending</span>}
    >
      <h1>Total projects &amp; land status</h1>
      <p>Everything a PIA needs to run acquisition day-to-day — from identifying land to tracking compensation.</p>

      <div className="grid grid-cols-4 gap-3 my-5 max-[900px]:grid-cols-1">
        <StatCard label="Total projects" value="4" />
        <StatCard label="Total land parcels" value="260" />
        <StatCard label="Acquired" value="151" tone="green" />
        <StatCard label="Pending" value="109" tone="saffron" />
        <StatCard label="Compensation status" value="₹42.6 Cr paid" tone="navy" />
        <StatCard label="Pending approvals" value="3" tone="saffron" />
        <StatCard label="Disputes & grievances" value="7 open" tone="red" />
      </div>

      <section className="card">
        <h3>Acquisition process shortcuts</h3>
        <div className="flex flex-wrap gap-2.5">
          <button className="btn btn-navy" type="button">Initiate acquisition</button>
          <button className="btn btn-line" type="button">Issue notices</button>
          <button className="btn btn-line" type="button">Record objections</button>
        </div>
      </section>

      <div className="mt-3.5">
        <CompensationCalculator
          variant="officer"
          title="Draft compensation calculator"
          note="Prepare a defensible draft award before it goes to the Collector — every line item visible to the landowner too."
        />
      </div>
    </PortalShell>
  )
}

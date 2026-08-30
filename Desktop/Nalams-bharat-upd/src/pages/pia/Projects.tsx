import { Link } from 'react-router-dom'
import PortalShell from '../../components/PortalShell'
import Badge from '../../components/Badge'
import { PIA_PROJECTS } from '../../data/mockData'

const NAV = [
  { label: 'Dashboard', to: '/pia' },
  { label: 'Projects', to: '/pia/projects' },
  { label: 'Land Identification', to: '/pia/land' },
  { label: 'Landowners', to: '/pia/landowners' },
  { label: 'Documents', to: '/pia/documents' },
  { label: 'Grievances', to: '/pia/grievances' },
]

const STATUS_TONE = { 'On Track': 'green', Delayed: 'saffron', Critical: 'red' } as const

export default function PiaProjects() {
  return (
    <PortalShell
      portalLabel="Project Implementing Agency"
      portalHome="/pia"
      navItems={NAV}
      topbarLeft={<strong>Project Management</strong>}
      topbarRight={<button className="btn btn-navy" type="button">+ Create new project</button>}
    >
      <h1>All projects</h1>
      <p>View progress, update details, and track the pipeline for every project this agency runs.</p>

      <section className="card overflow-x-auto">
        <table className="w-full border-collapse text-[14px] min-w-[640px]">
          <thead>
            <tr>
              {['Project', 'District', 'Parcels', 'Acquired', 'Pending', 'Status'].map((h) => (
                <th key={h} className="text-left py-2.5 px-2 text-muted text-xs border-b border-[#ece8df]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PIA_PROJECTS.map((p) => (
              <tr key={p.name}>
                <td className="py-2.5 px-2 border-b border-[#ece8df] font-semibold">{p.name}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">{p.district}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">{p.parcels}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df] text-green-deep">{p.acquired}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df] text-saffron-deep">{p.pending}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]"><Badge tone={STATUS_TONE[p.status]}>{p.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <p className="mt-4">
        <Link to="/pia" className="text-navy">← Back to dashboard</Link>
      </p>
    </PortalShell>
  )
}

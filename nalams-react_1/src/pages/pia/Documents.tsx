import PortalShell from '../../components/PortalShell'
import Badge from '../../components/Badge'

const NAV = [
  { label: 'Dashboard', to: '/pia' },
  { label: 'Projects', to: '/pia/projects' },
  { label: 'Land Identification', to: '/pia/land' },
  { label: 'Landowners', to: '/pia/landowners' },
  { label: 'Documents', to: '/pia/documents' },
  { label: 'Grievances', to: '/pia/grievances' },
]

const DOCS = [
  { name: 'Land acquisition notice — Gat 112', type: 'Notice', status: 'Verified' as const },
  { name: 'Survey report — Gat 41', type: 'Survey', status: 'Pending' as const },
  { name: 'Valuation report — Gat 204', type: 'Valuation', status: 'Verified' as const },
  { name: 'Approval order — Metro Phase 2', type: 'Approval', status: 'Rejected' as const },
]

const STATUS_TONE = { Verified: 'green', Pending: 'saffron', Rejected: 'red' } as const

export default function PiaDocuments() {
  return (
    <PortalShell
      portalLabel="Project Implementing Agency"
      portalHome="/pia"
      navItems={NAV}
      topbarLeft={<strong>Documents</strong>}
      topbarRight={<button className="btn btn-navy" type="button">Upload document</button>}
    >
      <h1>Land documents, notices &amp; reports</h1>
      <p>Everything filed against a project — notices, survey reports, valuation reports, approvals.</p>

      <section className="card overflow-x-auto">
        <table className="w-full border-collapse text-[14px] min-w-[560px]">
          <thead>
            <tr>
              {['Document', 'Type', 'Status'].map((h) => (
                <th key={h} className="text-left py-2.5 px-2 text-muted text-xs border-b border-[#ece8df]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DOCS.map((d) => (
              <tr key={d.name}>
                <td className="py-2.5 px-2 border-b border-[#ece8df] font-semibold">{d.name}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">{d.type}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]"><Badge tone={STATUS_TONE[d.status]}>{d.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PortalShell>
  )
}

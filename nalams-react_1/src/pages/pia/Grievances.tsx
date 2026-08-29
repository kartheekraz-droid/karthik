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

const CASES = [
  { id: 'G-4421', surveyNo: 'Gat 112', issue: 'Compensation too low', assignedTo: 'SDO West', status: 'Under Review' as const },
  { id: 'G-4425', surveyNo: 'Gat 89', issue: 'Wrong measurement', assignedTo: 'Surveyor B', status: 'Officer Assigned' as const },
  { id: 'G-4430', surveyNo: 'Gat 56', issue: 'R&R not provided', assignedTo: 'R&R Officer', status: 'Resolved' as const },
]

const STATUS_TONE = { 'Under Review': 'saffron', 'Officer Assigned': 'navy', Resolved: 'green' } as const

export default function PiaGrievances() {
  return (
    <PortalShell
      portalLabel="Project Implementing Agency"
      portalHome="/pia"
      navItems={NAV}
      topbarLeft={<strong>Grievances &amp; Disputes</strong>}
    >
      <h1>Complaints &amp; case tracking</h1>
      <p>Register disputes, assign cases to officers, and track resolution end to end.</p>

      <section className="card overflow-x-auto">
        <table className="w-full border-collapse text-[14px] min-w-[600px]">
          <thead>
            <tr>
              {['Grievance ID', 'Survey No.', 'Issue', 'Assigned To', 'Status'].map((h) => (
                <th key={h} className="text-left py-2.5 px-2 text-muted text-xs border-b border-[#ece8df]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CASES.map((c) => (
              <tr key={c.id}>
                <td className="py-2.5 px-2 border-b border-[#ece8df] font-semibold">{c.id}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">{c.surveyNo}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">{c.issue}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">{c.assignedTo}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]"><Badge tone={STATUS_TONE[c.status]}>{c.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PortalShell>
  )
}

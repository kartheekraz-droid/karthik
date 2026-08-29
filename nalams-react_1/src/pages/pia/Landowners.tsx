import PortalShell from '../../components/PortalShell'
import Badge from '../../components/Badge'
import { LANDOWNERS } from '../../data/mockData'

const NAV = [
  { label: 'Dashboard', to: '/pia' },
  { label: 'Projects', to: '/pia/projects' },
  { label: 'Land Identification', to: '/pia/land' },
  { label: 'Landowners', to: '/pia/landowners' },
  { label: 'Documents', to: '/pia/documents' },
  { label: 'Grievances', to: '/pia/grievances' },
]

const STATUS_TONE = {
  'Under Survey': 'saffron',
  'Compensation Calculated': 'navy',
  'Payment Released': 'green',
  'Dispute Raised': 'red',
} as const

export default function PiaLandowners() {
  return (
    <PortalShell
      portalLabel="Project Implementing Agency"
      portalHome="/pia"
      navItems={NAV}
      topbarLeft={<strong>Landowner Management</strong>}
    >
      <h1>Landowners</h1>
      <p>Contact details, ownership, documents, and acquisition status in one list.</p>

      <section className="card overflow-x-auto">
        <table className="w-full border-collapse text-[14px] min-w-[640px]">
          <thead>
            <tr>
              {['Name', 'Village', 'Survey No.', 'Project', 'Status'].map((h) => (
                <th key={h} className="text-left py-2.5 px-2 text-muted text-xs border-b border-[#ece8df]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LANDOWNERS.map((l) => (
              <tr key={l.surveyNo}>
                <td className="py-2.5 px-2 border-b border-[#ece8df] font-semibold">{l.name}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">{l.village}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">{l.surveyNo}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">{l.project}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]"><Badge tone={STATUS_TONE[l.status]}>{l.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PortalShell>
  )
}

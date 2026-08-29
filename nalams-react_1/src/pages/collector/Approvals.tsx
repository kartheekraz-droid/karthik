import { Link } from 'react-router-dom'
import PortalShell from '../../components/PortalShell'
import Badge from '../../components/Badge'
import { APPROVAL_QUEUE, riskTone } from '../../data/mockData'

const NAV = [
  { label: 'Command Center', to: '/collector' },
  { label: 'GIS Acquisition Map', to: '/collector/map' },
  { label: 'Pending Approvals', to: '/collector/approvals' },
  { label: 'Budget Tracker', to: '/collector/budget' },
  { label: 'Alerts & Disputes', to: '/collector/alerts' },
  { label: 'District Analytics', to: '/collector/analytics' },
]

export default function CollectorApprovals() {
  return (
    <PortalShell
      portalLabel="District / Collector"
      portalHome="/collector"
      navItems={NAV}
      topbarLeft={<strong>Pending Approvals · My Inbox</strong>}
      topbarRight={<Link className="btn btn-line" to="/collector">← Command Center</Link>}
    >
      <h1>Sorted by risk, not by date</h1>
      <p>The Risk Score is the decision-support engine — it tells you which files are most likely to end up in court.</p>

      <section className="card overflow-x-auto">
        <table className="w-full border-collapse text-[14px] min-w-[720px]">
          <thead>
            <tr>
              {['Project', 'Survey No.', 'Owner', 'Stage', 'Days Pending', 'Risk', 'Action'].map((h) => (
                <th key={h} className="text-left py-2.5 px-2 text-muted text-xs border-b border-[#ece8df]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {APPROVAL_QUEUE.sort((a, b) => b.riskScore - a.riskScore).map((f) => (
              <tr key={f.surveyNo}>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">{f.project}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df] font-semibold">
                  <Link to="/collector/parcel" className="text-navy no-underline hover:underline">{f.surveyNo}</Link>
                </td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">{f.owner}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">{f.stage}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">{f.daysPending}d</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]"><Badge tone={riskTone(f.riskScore)}>{f.riskScore}/10</Badge></td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">
                  {f.riskScore <= 3 ? (
                    <button className="btn btn-green !py-1.5 !px-3 text-xs" type="button">Quick approve</button>
                  ) : (
                    <Link to="/collector/parcel" className="btn btn-line !py-1.5 !px-3 text-xs">Review</Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PortalShell>
  )
}

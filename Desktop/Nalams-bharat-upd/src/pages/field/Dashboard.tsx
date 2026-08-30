import { Link } from 'react-router-dom'
import PortalShell from '../../components/PortalShell'
import Badge from '../../components/Badge'
import CompensationCalculator from '../../components/CompensationCalculator'
import { FIELD_QUEUE } from '../../data/mockData'

const NAV = [
  { label: 'Verification Queue', to: '/field' },
  { label: 'Field Inspection', to: '/field/inspection' },
  { label: 'Boundary Map', to: '/field/map' },
]

const STATUS_TONE = {
  'Pending Visit': 'saffron',
  'Visited — Awaiting Decision': 'navy',
  Escalated: 'red',
} as const

export default function FieldDashboard() {
  return (
    <PortalShell
      portalLabel="Field Officer"
      portalHome="/field"
      navItems={NAV}
      topbarLeft={<strong>Verification Queue</strong>}
      topbarRight={<span className="tag tag-r">1 escalated</span>}
    >
      <h1>Parcels waiting for your on-site call</h1>
      <p>Approve, reject, or flag a dispute — based on what you see standing on the land.</p>

      <div className="grid grid-cols-1 gap-3">
        {FIELD_QUEUE.map((task) => (
          <div key={task.surveyNo} className="card flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="mb-1"><Badge tone={STATUS_TONE[task.status]}>{task.status}</Badge></p>
              <h3 className="mb-0.5">{task.surveyNo} · {task.village}</h3>
              <p className="mb-0 text-sm">{task.project}</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button className="btn btn-green !py-1.5 !px-3 text-xs" type="button">Approve plot</button>
              <button className="btn btn-line !py-1.5 !px-3 text-xs" type="button">Reject listing</button>
              <button className="btn btn-saffron !py-1.5 !px-3 text-xs" type="button">Mark disputed</button>
              <Link className="btn btn-navy !py-1.5 !px-3 text-xs" to="/field/inspection">Inspect</Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3.5">
        <CompensationCalculator
          variant="officer"
          title="On-site compensation calculator"
          note="Walk a landowner through the numbers on the spot during your visit, instead of leaving them waiting for an office visit."
        />
      </div>
    </PortalShell>
  )
}

import { Link } from 'react-router-dom'
import FlagBar from '../../components/FlagBar'
import SiteHeader from '../../components/SiteHeader'
import SiteFooter from '../../components/SiteFooter'
import Badge from '../../components/Badge'
import { CITIZEN_PARCELS } from '../../data/mockData'

const NAV = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.myCase', to: '/citizen' },
  { key: 'nav.login', to: '/login', cta: true },
]

const STATUS_TONE = {
  'Under Survey': 'saffron',
  'Compensation Calculated': 'navy',
  'Payment Released': 'green',
  'Dispute Raised': 'red',
} as const

export default function MyLands() {
  return (
    <>
      <FlagBar />
      <SiteHeader activeTo="/citizen" subtitle="PUBLIC PORTAL" links={NAV} />

      <section className="py-16">
        <div className="wrap max-w-[860px]">
          <p className="kicker">भूमि मालिक · Landowner</p>
          <h1>My lands</h1>
          <p>Every parcel under acquisition, in one place — no Tehsil visit required.</p>

          <div className="grid grid-cols-1 gap-3">
            {CITIZEN_PARCELS.map((p) => (
              <div key={p.surveyNo} className="card flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="mb-1"><Badge tone={STATUS_TONE[p.status]}>{p.status}</Badge></p>
                  <h3 className="mb-0.5">{p.surveyNo} · {p.village}</h3>
                  <p className="mb-0 text-sm">{p.project}</p>
                </div>
                <Link className="btn btn-navy" to="/citizen/timeline">Track this case</Link>
              </div>
            ))}
          </div>

          <div className="flex gap-2.5 mt-6 flex-wrap">
            <Link className="btn btn-line" to="/citizen/documents">My documents</Link>
            <Link className="btn btn-line" to="/citizen/notifications">Notifications</Link>
            <Link className="btn btn-saffron" to="/citizen/grievance">Raise a grievance</Link>
          </div>
        </div>
      </section>

      <SiteFooter noteKey="footer.noteCitizen" />
    </>
  )
}

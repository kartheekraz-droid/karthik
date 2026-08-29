import { Link } from 'react-router-dom'
import FlagBar from '../../components/FlagBar'
import SiteHeader from '../../components/SiteHeader'
import SiteFooter from '../../components/SiteFooter'
import Badge from '../../components/Badge'

const NAV = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.myCase', to: '/citizen' },
  { key: 'nav.login', to: '/login', cta: true },
]

const DOCS = [
  { name: 'Ownership proof (Patta / RoR)', status: 'Verified' as const },
  { name: 'Aadhaar linkage', status: 'Verified' as const },
  { name: 'Survey report', status: 'Pending' as const },
  { name: 'Compensation award letter', status: 'Pending' as const },
  { name: 'Payment receipt', status: 'Rejected' as const },
]

const STATUS_TONE = { Verified: 'green', Pending: 'saffron', Rejected: 'red' } as const

export default function CitizenDocuments() {
  return (
    <>
      <FlagBar />
      <SiteHeader activeTo="/citizen" subtitle="PUBLIC PORTAL" links={NAV} />

      <section className="py-16">
        <div className="wrap max-w-[760px]">
          <p className="kicker">My documents</p>
          <h1>Documents vault</h1>
          <p>No more "your file is missing in the Tehsil." Everything lives here, verified and timestamped.</p>

          <div className="card">
            <ul className="divide-y divide-[#ece8df]">
              {DOCS.map((d) => (
                <li key={d.name} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <span>{d.name}</span>
                  <Badge tone={STATUS_TONE[d.status]}>{d.status}</Badge>
                </li>
              ))}
            </ul>
            <button className="btn btn-navy mt-4" type="button">Upload document</button>
          </div>

          <Link className="btn btn-line mt-4 inline-block" to="/citizen">← Back to my lands</Link>
        </div>
      </section>

      <SiteFooter noteKey="footer.noteCitizen" />
    </>
  )
}

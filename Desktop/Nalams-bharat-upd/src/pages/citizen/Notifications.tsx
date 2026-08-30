import { Link } from 'react-router-dom'
import FlagBar from '../../components/FlagBar'
import SiteHeader from '../../components/SiteHeader'
import SiteFooter from '../../components/SiteFooter'

const NAV = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.myCase', to: '/citizen' },
  { key: 'nav.login', to: '/login', cta: true },
]

const NOTIFICATIONS = [
  { icon: '💰', text: 'Compensation award approved by District Collector on 28 Aug, 2:34 PM' },
  { icon: '🏦', text: '₹81,50,000 credited to your linked bank account ending in 4532' },
  { icon: '📍', text: 'Survey team scheduled visit on 30 Aug, 10:00 AM. Be present at the land parcel.' },
  { icon: '⚠️', text: 'Step 4 (Compensation Award) is 12 days overdue. Auto-grievance raised: #G-4421' },
  { icon: '✅', text: 'Grievance #G-4421 resolved. Status updated to Payment Released.' },
]

export default function CitizenNotifications() {
  return (
    <>
      <FlagBar />
      <SiteHeader activeTo="/citizen" subtitle="PUBLIC PORTAL" links={NAV} />

      <section className="py-16">
        <div className="wrap max-w-[760px]">
          <p className="kicker">Notifications</p>
          <h1>Everything, the moment it happens</h1>
          <p>The moment a Collector clicks "Approve," you know. No waiting months for a letter.</p>

          <div className="card">
            <ul className="divide-y divide-[#ece8df]">
              {NOTIFICATIONS.map((n, i) => (
                <li key={i} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                  <span className="text-xl leading-none">{n.icon}</span>
                  <span className="text-sm">{n.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link className="btn btn-line mt-4 inline-block" to="/citizen">← Back to my lands</Link>
        </div>
      </section>

      <SiteFooter noteKey="footer.noteCitizen" />
    </>
  )
}

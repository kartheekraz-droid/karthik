import { Link } from 'react-router-dom'
import FlagBar from '../../components/FlagBar'
import SiteHeader from '../../components/SiteHeader'
import SiteFooter from '../../components/SiteFooter'

const NAV = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.myCase', to: '/citizen' },
  { key: 'nav.login', to: '/login', cta: true },
]

const STEPS = [
  { title: 'Notification issued', detail: 'Govt announced acquisition on 12 Jan 2026', done: true },
  { title: 'Social Impact Assessment done', detail: 'SIA report submitted and approved', done: true },
  { title: 'Land survey', detail: 'Survey team visited on 15 Feb. Awaiting final report.', done: true },
  { title: 'Compensation award', detail: 'Expected by 30 Mar 2026', done: false, current: true },
  { title: 'Payment disbursement', detail: 'Awaiting Collector approval', done: false },
  { title: 'Physical possession', detail: 'Handover scheduled post-payment', done: false },
  { title: 'Rehabilitation & Resettlement', detail: 'R&R site allocation pending', done: false },
]

export default function CitizenTimeline() {
  return (
    <>
      <FlagBar />
      <SiteHeader activeTo="/citizen" subtitle="PUBLIC PORTAL" links={NAV} />

      <section className="py-16">
        <div className="wrap max-w-[760px]">
          <p className="kicker">Gat 112 · Wadgaon</p>
          <h1>Track your land case</h1>
          <p className="tag tag-r inline-block mb-4">This step is 12 days overdue. Grievance auto-raised.</p>

          <div className="border-l-[3px] border-navy ml-2 pl-[18px]">
            {STEPS.map((step, i) => (
              <div key={step.title} className="mb-6 relative">
                <span
                  className="absolute -left-[25px] top-1.5 w-3 h-3 rounded-full ring-[3px] ring-white"
                  style={{
                    background: step.done ? '#138808' : step.current ? '#ff9933' : '#d6d0c4',
                    boxShadow: '0 0 0 3px #fff, 0 0 0 5px #000080',
                  }}
                />
                <strong>{i + 1}. {step.title}</strong>
                <p>{step.detail}</p>
              </div>
            ))}
          </div>

          <Link className="btn btn-line" to="/citizen">← Back to my lands</Link>
        </div>
      </section>

      <SiteFooter noteKey="footer.noteCitizen" />
    </>
  )
}

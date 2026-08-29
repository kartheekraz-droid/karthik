import { Link } from 'react-router-dom'
import FlagBar from '../components/FlagBar'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Live map', to: '/map' },
  { label: 'Landowner', to: '/citizen' },
  { label: 'Officer login', to: '/login' },
]

export default function Home() {
  return (
    <>
      <FlagBar />
      <SiteHeader active="Home" links={NAV} />

      <section className="bg-white border-b border-line bg-[linear-gradient(90deg,#ff9933_0_10px,transparent_10px)]">
        <div className="wrap grid grid-cols-[1.15fr_0.85fr] gap-12 items-center py-16 max-[900px]:grid-cols-1 max-[900px]:py-9">
          <div>
            <p className="kicker">Saffron · White · Green · Navy Chakra</p>
            <h1>See every land case clearly — in real time.</h1>
            <p className="text-lg max-w-[46ch]">
              National Land Acquisition &amp; Management System. One map, one timeline, and one
              status language so officers decide faster and landowners are not left in the dark.
            </p>
            <div className="flex flex-wrap gap-2.5 mt-2">
              <Link className="btn btn-navy" to="/dashboard">Open command view</Link>
              <Link className="btn btn-saffron" to="/citizen">Track my land</Link>
              <Link className="btn btn-line" to="/map">View GIS map</Link>
            </div>
          </div>
          <aside className="bg-paper border border-line rounded-[20px] p-[22px] shadow-card">
            <h3 className="text-base font-sans">NH-48 widening · Pune (demo)</h3>
            <p className="mb-3.5">Live snapshot. Colors match the flag so status is obvious at a glance.</p>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-white rounded-xl p-3.5 border-l-4 border-navy">
                <b className="block text-2xl text-ink">47</b>
                <span className="text-[13px] text-muted">Parcels on file</span>
              </div>
              <div className="bg-white rounded-xl p-3.5 border-l-4 border-saffron">
                <b className="block text-2xl text-ink">12</b>
                <span className="text-[13px] text-muted">Under objection</span>
              </div>
              <div className="bg-white rounded-xl p-3.5 border-l-4 border-green">
                <b className="block text-2xl text-ink">18</b>
                <span className="text-[13px] text-muted">Paid &amp; possession</span>
              </div>
              <div className="bg-white rounded-xl p-3.5 border-l-4 border-saffron">
                <b className="block text-2xl text-ink">9</b>
                <span className="text-[13px] text-muted">SLA at risk</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-16">
        <div className="wrap">
          <p className="kicker">How to read the system</p>
          <h2>Three colours. One meaning.</h2>
          <p>
            The flag is used as a status language, not as a background image. Text stays dark on
            light paper so everything is readable.
          </p>
          <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-1">
            <article className="card">
              <div className="w-9 h-1.5 rounded-full mb-3.5 bg-saffron" />
              <h3 className="text-xl">Saffron — in motion</h3>
              <p>Notice issued, objection open, hearing due, or a decision waiting. Something still needs an officer.</p>
            </article>
            <article className="card">
              <div className="w-9 h-1.5 rounded-full mb-3.5 bg-navy" />
              <h3 className="text-xl">White &amp; navy — the record</h3>
              <p>Clean paper for reading. Navy is the Chakra: navigation, primary actions, identified parcels.</p>
            </article>
            <article className="card">
              <div className="w-9 h-1.5 rounded-full mb-3.5 bg-green" />
              <h3 className="text-xl">Green — closed</h3>
              <p>Award passed, compensation paid, or possession taken. Green is never used for “maybe”.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-line">
        <div className="wrap">
          <p className="kicker">End to end</p>
          <h2>From survey to possession on one line</h2>
          <p>Every parcel walks the same path. You always know which step is stuck.</p>
          <div className="grid grid-cols-6 gap-2 max-[900px]:grid-cols-1">
            <div className="step step-n"><b>1</b>Identified</div>
            <div className="step step-n"><b>2</b>Surveyed</div>
            <div className="step step-s"><b>3</b>Notified</div>
            <div className="step step-s"><b>4</b>Objection</div>
            <div className="step step-g"><b>5</b>Awarded</div>
            <div className="step step-g"><b>6</b>Possession</div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="wrap">
          <p className="kicker">Who it is for</p>
          <h2>Clear views for each role</h2>
          <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-1">
            <article className="card">
              <h3 className="text-xl">District collector</h3>
              <p>KPIs, SLA alerts, and one recommended action for the day — not a pile of spreadsheets.</p>
              <Link className="btn btn-navy" to="/dashboard">Dashboard</Link>
            </article>
            <article className="card">
              <h3 className="text-xl">Field / GIS officer</h3>
              <p>Live map. Click a parcel. Open the case. Status colour is the same as the dashboard.</p>
              <Link className="btn btn-navy" to="/map">Live map</Link>
            </article>
            <article className="card">
              <h3 className="text-xl">Landowner</h3>
              <p>Notice, hearing date, and payment in plain language. Saffron while open, green when done.</p>
              <Link className="btn btn-saffron" to="/citizen">Public portal</Link>
            </article>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}

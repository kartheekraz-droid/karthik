import { Link } from 'react-router-dom'
import FlagBar from '../components/FlagBar'
import AppShell from '../components/AppShell'

const ALERTS = [
  { tag: 'SLA', tagClass: 'tag-r', where: 'Gat 112, Wadgaon', why: 'Hearing overdue' },
  { tag: 'Forest', tagClass: 'tag-s', where: 'Gat 88–91', why: 'Stage-I pending' },
  { tag: 'Pay', tagClass: 'tag-n', where: 'Gat 204', why: 'Account mismatch' },
]

export default function Dashboard() {
  return (
    <>
      <FlagBar />
      <AppShell
        active="Command dashboard"
        topbarLeft={<strong>Pune district · NH-48 widening</strong>}
        topbarRight={<span className="tag tag-s">9 SLA at risk</span>}
      >
        <h1>Command view</h1>
        <p>One screen for decisions. Open the map or a stuck case from here.</p>

        <div className="grid grid-cols-4 gap-3 my-5 max-[900px]:grid-cols-1">
          <div className="bg-white border border-line rounded-2xl p-4 shadow-card">
            <small className="text-muted text-xs font-bold tracking-wide uppercase">Parcels</small>
            <strong className="block text-[28px] mt-1.5">47</strong>
          </div>
          <div className="bg-white border border-line rounded-2xl p-4 shadow-card">
            <small className="text-muted text-xs font-bold tracking-wide uppercase">Under objection</small>
            <strong className="block text-[28px] mt-1.5 text-saffron-deep">12</strong>
          </div>
          <div className="bg-white border border-line rounded-2xl p-4 shadow-card">
            <small className="text-muted text-xs font-bold tracking-wide uppercase">Paid &amp; possession</small>
            <strong className="block text-[28px] mt-1.5 text-green-deep">18</strong>
          </div>
          <div className="bg-white border border-line rounded-2xl p-4 shadow-card">
            <small className="text-muted text-xs font-bold tracking-wide uppercase">Pending pay</small>
            <strong className="block text-[28px] mt-1.5">₹6.1 Cr</strong>
          </div>
        </div>

        <div className="grid grid-cols-[1.4fr_0.8fr] gap-3.5 max-[900px]:grid-cols-1">
          <section className="card">
            <h3>Pipeline</h3>
            <div className="grid grid-cols-6 gap-2 my-3 mb-4 max-[900px]:grid-cols-1">
              <div className="step step-n"><b>47</b>Identified</div>
              <div className="step step-n"><b>41</b>Surveyed</div>
              <div className="step step-s"><b>29</b>Notified</div>
              <div className="step step-s"><b>12</b>Objection</div>
              <div className="step step-g"><b>18</b>Awarded</div>
              <div className="step step-g"><b>18</b>Possession</div>
            </div>
            <table className="w-full border-collapse text-[15px]">
              <thead>
                <tr>
                  <th className="text-left py-2.5 px-2 text-muted text-xs border-b border-[#ece8df]">Alert</th>
                  <th className="text-left py-2.5 px-2 text-muted text-xs border-b border-[#ece8df]">Where</th>
                  <th className="text-left py-2.5 px-2 text-muted text-xs border-b border-[#ece8df]">Why</th>
                </tr>
              </thead>
              <tbody>
                {ALERTS.map((a) => (
                  <tr key={a.where}>
                    <td className="py-2.5 px-2 border-b border-[#ece8df]"><span className={`tag ${a.tagClass}`}>{a.tag}</span></td>
                    <td className="py-2.5 px-2 border-b border-[#ece8df]">{a.where}</td>
                    <td className="py-2.5 px-2 border-b border-[#ece8df]">{a.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section className="card">
            <h3>Today’s decision</h3>
            <p>Unblock the forest belt first. That releases most of the remaining right-of-way into award.</p>
            <p><span className="tag tag-s">Priority</span> Escalate 4 forest parcels</p>
            <div className="flex gap-2.5 mt-4 flex-wrap">
              <Link className="btn btn-saffron" to="/map">See on map</Link>
              <Link className="btn btn-line" to="/parcel">Open Gat 112</Link>
            </div>
          </section>
        </div>
      </AppShell>
    </>
  )
}

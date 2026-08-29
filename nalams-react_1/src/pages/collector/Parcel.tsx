import PortalShell from '../../components/PortalShell'

const NAV = [
  { label: 'Command Center', to: '/collector' },
  { label: 'GIS Acquisition Map', to: '/collector/map' },
  { label: 'Pending Approvals', to: '/collector/approvals' },
  { label: 'Budget Tracker', to: '/collector/budget' },
  { label: 'Alerts & Disputes', to: '/collector/alerts' },
  { label: 'District Analytics', to: '/collector/analytics' },
]

const TIMELINE = [
  { title: 'Identified', detail: '4 Jun · alignment freeze', done: true },
  { title: 'Survey & valuation', detail: '22 Jun · joint measurement', done: true },
  { title: 'Notification', detail: '12 Aug · Section 11', done: true },
  { title: 'Objection window', detail: 'Hearing overdue by 2 days', done: false },
  { title: 'Award & payment', detail: 'Not started', done: false },
]

export default function CollectorParcel() {
  return (
    <PortalShell
      portalLabel="District / Collector"
      portalHome="/collector"
      navItems={NAV}
      topbarLeft={<strong>Wadgaon · Gat 112</strong>}
      topbarRight={<span className="tag tag-s">Under objection</span>}
    >
      <h1>Suresh Patil · 2.14 ha</h1>
      <p>Section 11 notice on 12 Aug. Hearing is overdue.</p>

      <div className="grid grid-cols-[1.1fr_0.9fr] gap-3.5 max-[900px]:grid-cols-1">
        <section className="card">
          <h3>Statutory timeline</h3>
          <div className="border-l-[3px] border-navy ml-2 mt-2 pl-[18px]">
            {TIMELINE.map((step) => (
              <div key={step.title} className="mb-4 relative">
                <span
                  className="absolute -left-[25px] top-1.5 w-3 h-3 rounded-full ring-[3px] ring-white"
                  style={{ background: step.done ? '#138808' : '#ff9933', boxShadow: '0 0 0 3px #fff, 0 0 0 5px #000080' }}
                />
                <strong>{step.title}</strong>
                <p>{step.detail}</p>
              </div>
            ))}
          </div>

          <h3>Documents</h3>
          <ul className="text-sm text-muted space-y-1.5">
            <li>Section 4 Notification</li>
            <li>Social Impact Assessment report</li>
            <li>Land survey report (geo-tagged photos)</li>
            <li>Ownership proof (auto-verified)</li>
            <li>Compensation calculation sheet</li>
          </ul>

          <div className="flex gap-2.5 mt-4 flex-wrap">
            <button className="btn btn-navy" type="button">Approve compensation award</button>
            <button className="btn btn-line" type="button">Send back / re-survey</button>
          </div>
        </section>

        <section className="card">
          <h3>Decision support</h3>
          <div className="space-y-3 text-sm">
            <p><span className="tag tag-g">Fairness</span> Market rate ₹16,00,000/acre. Offered ₹15,00,000. Status: FAIR.</p>
            <p><span className="tag tag-r">Bottleneck</span> At Survey stage for 58 days. Legal limit 60 days — act now.</p>
            <p><span className="tag tag-s">Dispute predictor</span> 75% chance of legal challenge based on 50 similar cases. Suggest increasing solatium or early mediation.</p>
            <p><span className="tag tag-n">Neighbouring awards</span> 5 nearby landowners accepted ₹16,50,000/acre — this offer is consistent.</p>
          </div>

          <h3 className="mt-4">Draft compensation</h3>
          <table className="w-full border-collapse text-[15px]">
            <tbody>
              <tr><td className="py-2 px-2 border-b border-[#ece8df]">Market value</td><td className="py-2 px-2 border-b border-[#ece8df]">₹48,20,000</td></tr>
              <tr><td className="py-2 px-2 border-b border-[#ece8df]">Solatium (100%)</td><td className="py-2 px-2 border-b border-[#ece8df]">₹48,20,000</td></tr>
              <tr><td className="py-2 px-2">Indicative award</td><td className="py-2 px-2"><strong>₹97,50,000</strong></td></tr>
            </tbody>
          </table>
        </section>
      </div>
    </PortalShell>
  )
}

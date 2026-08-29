import FlagBar from '../components/FlagBar'
import AppShell from '../components/AppShell'

const TIMELINE = [
  { title: 'Identified', detail: '4 Jun · alignment freeze', done: true },
  { title: 'Survey & valuation', detail: '22 Jun · joint measurement', done: true },
  { title: 'Notification', detail: '12 Aug · Section 11', done: true },
  { title: 'Objection window', detail: 'Hearing overdue by 2 days', done: false },
  { title: 'Award & payment', detail: 'Not started', done: false },
]

export default function Parcel() {
  return (
    <>
      <FlagBar />
      <AppShell
        active="Parcel case file"
        topbarLeft={<strong>Wadgaon · Gat 112</strong>}
        topbarRight={<span className="tag tag-s">Under objection</span>}
      >
        <h1>Suresh Patil · 2.14 ha</h1>
        <p>Section 11 notice on 12 Aug. Hearing is overdue. This is the stuck case from the dashboard.</p>

        <div className="grid grid-cols-[1.4fr_0.8fr] gap-3.5 max-[900px]:grid-cols-1">
          <section className="card">
            <h3>Statutory timeline</h3>
            <div className="border-l-[3px] border-navy ml-2 mt-2 pl-[18px]">
              {TIMELINE.map((step) => (
                <div key={step.title} className="mb-4 relative">
                  <span
                    className="absolute -left-[25px] top-1.5 w-3 h-3 rounded-full ring-[3px] ring-white"
                    style={{
                      background: step.done ? '#138808' : '#ff9933',
                      boxShadow: '0 0 0 3px #fff, 0 0 0 5px #000080',
                    }}
                  />
                  <strong>{step.title}</strong>
                  <p>{step.detail}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="card">
            <h3>Draft compensation</h3>
            <table className="w-full border-collapse text-[15px]">
              <tbody>
                <tr>
                  <td className="py-2.5 px-2 border-b border-[#ece8df]">Market value</td>
                  <td className="py-2.5 px-2 border-b border-[#ece8df]">₹48,20,000</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-2 border-b border-[#ece8df]">Solatium (100%)</td>
                  <td className="py-2.5 px-2 border-b border-[#ece8df]">₹48,20,000</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-2 border-b border-[#ece8df]">Trees / structures</td>
                  <td className="py-2.5 px-2 border-b border-[#ece8df]">₹1,10,000</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-2"><strong>Indicative award</strong></td>
                  <td className="py-2.5 px-2"><strong>₹97,50,000</strong></td>
                </tr>
              </tbody>
            </table>
            <div className="flex gap-2.5 mt-4 flex-wrap">
              <button className="btn btn-navy" type="button">Schedule hearing</button>
              <button className="btn btn-line" type="button">Upload order</button>
            </div>
          </section>
        </div>
      </AppShell>
    </>
  )
}

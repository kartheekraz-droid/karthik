import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import FlagBar from '../../components/FlagBar'
import SiteHeader from '../../components/SiteHeader'
import SiteFooter from '../../components/SiteFooter'

const NAV = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.myCase', to: '/citizen' },
  { key: 'nav.login', to: '/login', cta: true },
]

const CATEGORIES = [
  'Compensation too low',
  'Wrong land measurement',
  'Delay in payment',
  'R&R not provided',
  'Other',
]

export default function CitizenGrievance() {
  const [submitted, setSubmitted] = useState<string | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // TODO: supabase.from('grievances').insert({...}) and return the generated id
    setSubmitted('#G-' + Math.floor(4000 + Math.random() * 999))
  }

  return (
    <>
      <FlagBar />
      <SiteHeader activeTo="/citizen" subtitle="PUBLIC PORTAL" links={NAV} />

      <section className="py-16">
        <div className="wrap max-w-[600px]">
          <p className="kicker">Raise a grievance</p>
          <h1>Report an issue</h1>
          <p>No middlemen. No lawyer fees. Just direct digital redressal.</p>

          {submitted ? (
            <div className="card">
              <p className="tag tag-g inline-block mb-2">Submitted</p>
              <h3>Grievance {submitted} registered</h3>
              <p>Track its status any time from your notifications.</p>
              <Link className="btn btn-navy" to="/citizen">Back to my lands</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card">
              <label className="block text-[13px] font-bold my-2">Category</label>
              <select className="w-full px-3 py-3 border border-line rounded-[10px] bg-paper" defaultValue={CATEGORIES[0]}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>

              <label className="block text-[13px] font-bold my-2">Describe the issue</label>
              <textarea rows={4} className="w-full px-3 py-3 border border-line rounded-[10px] bg-paper" placeholder="Tell us what happened" />

              <label className="block border-2 border-dashed border-line rounded-xl p-5 text-center text-muted text-sm cursor-pointer mt-3">
                Upload supporting documents (photos, scans)
                <input type="file" multiple className="hidden" />
              </label>

              <button className="btn btn-saffron w-full mt-4" type="submit">Submit grievance</button>
            </form>
          )}
        </div>
      </section>

      <SiteFooter noteKey="footer.noteCitizen" />
    </>
  )
}

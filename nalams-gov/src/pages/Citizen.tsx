import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import FlagBar from '../components/FlagBar'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'My case', to: '/citizen' },
  { label: 'Officer login', to: '/login' },
]

export default function Citizen() {
  const [query, setQuery] = useState('Gat 112, Wadgaon')

  function handleSearch(e: FormEvent) {
    e.preventDefault()
    // TODO: supabase.from('cases').select('*').ilike('survey_no', `%${query}%`)
  }

  return (
    <>
      <FlagBar />
      <SiteHeader active="My case" subtitle="PUBLIC PORTAL" links={NAV} />

      <section className="py-16">
        <div className="wrap max-w-[760px]">
          <p className="kicker">भूमि मालिक · Landowner</p>
          <h1>Track your land case</h1>
          <p>Enter survey number or mobile. Status is saffron while the case is open and green when payment is done.</p>

          <form onSubmit={handleSearch} className="card mb-4">
            <label htmlFor="q" className="block text-[13px] font-bold my-3">Survey number / village</label>
            <div className="flex gap-2.5">
              <input
                id="q"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 min-w-0 px-3 py-3 border border-line rounded-[10px] bg-paper"
              />
              <button type="submit" className="btn btn-navy">Find</button>
            </div>
          </form>

          <article className="card">
            <p><span className="tag tag-s">Hearing in progress</span></p>
            <h2>Gat 112 · Wadgaon</h2>
            <p>Project: NH-48 widening. Next date: 29 Aug, Collectorate, 11:00.</p>
            <div className="grid grid-cols-4 gap-2 my-2 mb-4 max-[900px]:grid-cols-1">
              <div className="step step-g"><b>1</b>Notice</div>
              <div className="step step-s"><b>2</b>Hearing</div>
              <div className="step step-n"><b>3</b>Award</div>
              <div className="step step-n"><b>4</b>Payment</div>
            </div>
            <p>You can upload papers here. You do not need to visit three counters to know the date.</p>
            <div className="flex flex-wrap gap-2.5">
              <button className="btn btn-saffron" type="button">Upload document</button>
              <Link className="btn btn-line" to="/">Back to home</Link>
            </div>
          </article>
        </div>
      </section>

      <SiteFooter note="Hackathon prototype · not official GoI" />
    </>
  )
}

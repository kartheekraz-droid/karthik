import { Link } from 'react-router-dom'
import FlagBar from '../../components/FlagBar'
import SiteHeader from '../../components/SiteHeader'
import SiteFooter from '../../components/SiteFooter'

const NAV = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.myCase', to: '/citizen' },
  { key: 'nav.login', to: '/login', cta: true },
]

export default function CitizenCompensation() {
  return (
    <>
      <FlagBar />
      <SiteHeader activeTo="/citizen" subtitle="PUBLIC PORTAL" links={NAV} />

      <section className="py-16">
        <div className="wrap max-w-[760px]">
          <p className="kicker">Gat 112 · Wadgaon</p>
          <h1>Compensation breakdown</h1>
          <p>No more "trust the officer." Every rupee is explained.</p>

          <div className="card mb-4">
            <p className="text-sm mb-1">Total compensation</p>
            <p className="text-[36px] font-bold text-ink mb-4">₹81,50,000</p>
            <table className="w-full border-collapse text-[15px]">
              <tbody>
                <tr><td className="py-2 px-2 border-b border-[#ece8df]">Land value — 2.5 acres × ₹15,00,000/acre</td><td className="py-2 px-2 border-b border-[#ece8df] text-right">₹37,50,000</td></tr>
                <tr><td className="py-2 px-2 border-b border-[#ece8df]">Structure value — house + shop assessment</td><td className="py-2 px-2 border-b border-[#ece8df] text-right">₹5,00,000</td></tr>
                <tr><td className="py-2 px-2 border-b border-[#ece8df]">Crop / trees — mango trees + standing crop</td><td className="py-2 px-2 border-b border-[#ece8df] text-right">₹1,50,000</td></tr>
                <tr><td className="py-2 px-2 border-b border-[#ece8df]">Solatium (100%) — mandatory under LARR Act 2013</td><td className="py-2 px-2 border-b border-[#ece8df] text-right">₹37,50,000</td></tr>
                <tr><td className="py-2 px-2 font-bold">Total compensation</td><td className="py-2 px-2 text-right font-bold">₹81,50,000</td></tr>
              </tbody>
            </table>
          </div>

          <div className="card">
            <h3>Fairness check</h3>
            <p><span className="tag tag-g">FAIR</span> Market rate in your village: ₹16,00,000/acre. Your offer matches it.</p>
            <p className="mb-0">5 landowners in your village received similar compensation.</p>
          </div>

          <Link className="btn btn-line mt-4 inline-block" to="/citizen">← Back to my lands</Link>
        </div>
      </section>

      <SiteFooter noteKey="footer.noteCitizen" />
    </>
  )
}

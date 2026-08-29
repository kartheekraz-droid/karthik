import { Link } from 'react-router-dom'
import FlagBar from '../components/FlagBar'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import { useLanguage } from '../context/LanguageContext'

const NAV = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.dashboard', to: '/collector' },
  { key: 'nav.map', to: '/collector/map' },
  { key: 'nav.landowner', to: '/citizen' },
  { key: 'nav.login', to: '/login', cta: true },
]

const PORTALS = [
  { title: 'Central Government', desc: 'National command centre, state performance grid, cross-state corridors.', to: '/central', btn: 'btn-navy' },
  { title: 'State Government', desc: 'State-level command centre and district performance grid.', to: '/state', btn: 'btn-navy' },
  { title: 'District / Collector', desc: 'GIS war room, risk-scored approvals queue, individual case files.', to: '/collector', btn: 'btn-navy' },
  { title: 'Project Implementing Agency', desc: 'Projects, land identification, landowners, documents, grievances.', to: '/pia', btn: 'btn-saffron' },
  { title: 'Field Officer', desc: 'Verification queue, geo-tagged inspection, boundary map.', to: '/field', btn: 'btn-saffron' },
  { title: 'Citizen / Landowner', desc: 'Track your case, compensation breakdown, documents, grievances.', to: '/citizen', btn: 'btn-green' },
]

export default function Home() {
  const { t } = useLanguage()
  return (
    <>
      <FlagBar />
      <SiteHeader activeTo="/" links={NAV} />

      <section className="bg-white border-b border-line bg-[linear-gradient(90deg,#ff9933_0_10px,transparent_10px)]">
        <div className="wrap grid grid-cols-[1.15fr_0.85fr] gap-12 items-center py-16 max-[900px]:grid-cols-1 max-[900px]:py-9">
          <div>
            <p className="kicker">{t('home.kicker')}</p>
            <h1>{t('home.title')}</h1>
            <p className="text-lg max-w-[46ch]">{t('home.desc')}</p>
            <div className="flex flex-wrap gap-2.5 mt-2">
              <Link className="btn btn-navy" to="/collector">{t('home.openCommand')}</Link>
              <Link className="btn btn-saffron" to="/citizen">{t('home.trackLand')}</Link>
              <Link className="btn btn-line" to="/collector/map">{t('home.viewMap')}</Link>
            </div>
          </div>
          <aside className="bg-paper border border-line rounded-[20px] p-[22px] shadow-card">
            <h3 className="text-base font-sans">{t('home.snapshotTitle')}</h3>
            <p className="mb-3.5">{t('home.snapshotDesc')}</p>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-white rounded-xl p-3.5 border-l-4 border-navy">
                <b className="block text-2xl text-ink">47</b>
                <span className="text-[13px] text-muted">{t('home.stat.parcels')}</span>
              </div>
              <div className="bg-white rounded-xl p-3.5 border-l-4 border-saffron">
                <b className="block text-2xl text-ink">12</b>
                <span className="text-[13px] text-muted">{t('home.stat.objection')}</span>
              </div>
              <div className="bg-white rounded-xl p-3.5 border-l-4 border-green">
                <b className="block text-2xl text-ink">18</b>
                <span className="text-[13px] text-muted">{t('home.stat.paid')}</span>
              </div>
              <div className="bg-white rounded-xl p-3.5 border-l-4 border-saffron">
                <b className="block text-2xl text-ink">9</b>
                <span className="text-[13px] text-muted">{t('home.stat.sla')}</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-16">
        <div className="wrap">
          <p className="kicker">Six roles, one platform</p>
          <h2>Choose your portal</h2>
          <p>Every level of government — and every citizen — reads from the same source of truth.</p>
          <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-1">
            {PORTALS.map((p) => (
              <article key={p.to} className="card flex flex-col">
                <h3 className="text-xl">{p.title}</h3>
                <p className="flex-1">{p.desc}</p>
                <Link className={`btn ${p.btn}`} to={p.to}>Open portal</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-line">
        <div className="wrap">
          <p className="kicker">{t('home.endKicker')}</p>
          <h2>{t('home.endTitle')}</h2>
          <p>{t('home.endDesc')}</p>
          <div className="grid grid-cols-6 gap-2 max-[900px]:grid-cols-1">
            <div className="step step-n"><b>1</b>{t('home.step.identified')}</div>
            <div className="step step-n"><b>2</b>{t('home.step.surveyed')}</div>
            <div className="step step-s"><b>3</b>{t('home.step.notified')}</div>
            <div className="step step-s"><b>4</b>{t('home.step.objection')}</div>
            <div className="step step-g"><b>5</b>{t('home.step.awarded')}</div>
            <div className="step step-g"><b>6</b>{t('home.step.possession')}</div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}

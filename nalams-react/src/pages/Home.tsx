import { Link } from 'react-router-dom'
import FlagBar from '../components/FlagBar'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import { useLanguage } from '../context/LanguageContext'

const NAV = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.dashboard', to: '/dashboard' },
  { key: 'nav.map', to: '/map' },
  { key: 'nav.landowner', to: '/citizen' },
  { key: 'nav.login', to: '/login', cta: true },
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
              <Link className="btn btn-navy" to="/dashboard">{t('home.openCommand')}</Link>
              <Link className="btn btn-saffron" to="/citizen">{t('home.trackLand')}</Link>
              <Link className="btn btn-line" to="/map">{t('home.viewMap')}</Link>
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
          <p className="kicker">{t('home.howKicker')}</p>
          <h2>{t('home.howTitle')}</h2>
          <p>{t('home.howDesc')}</p>
          <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-1">
            <article className="card">
              <div className="w-9 h-1.5 rounded-full mb-3.5 bg-saffron" />
              <h3 className="text-xl">{t('home.saffronTitle')}</h3>
              <p>{t('home.saffronDesc')}</p>
            </article>
            <article className="card">
              <div className="w-9 h-1.5 rounded-full mb-3.5 bg-navy" />
              <h3 className="text-xl">{t('home.navyTitle')}</h3>
              <p>{t('home.navyDesc')}</p>
            </article>
            <article className="card">
              <div className="w-9 h-1.5 rounded-full mb-3.5 bg-green" />
              <h3 className="text-xl">{t('home.greenTitle')}</h3>
              <p>{t('home.greenDesc')}</p>
            </article>
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

      <section className="py-16">
        <div className="wrap">
          <p className="kicker">{t('home.whoKicker')}</p>
          <h2>{t('home.whoTitle')}</h2>
          <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-1">
            <article className="card">
              <h3 className="text-xl">{t('home.collectorTitle')}</h3>
              <p>{t('home.collectorDesc')}</p>
              <Link className="btn btn-navy" to="/dashboard">{t('home.dashboardBtn')}</Link>
            </article>
            <article className="card">
              <h3 className="text-xl">{t('home.fieldTitle')}</h3>
              <p>{t('home.fieldDesc')}</p>
              <Link className="btn btn-navy" to="/map">{t('home.liveMapBtn')}</Link>
            </article>
            <article className="card">
              <h3 className="text-xl">{t('home.landownerTitle')}</h3>
              <p>{t('home.landownerDesc')}</p>
              <Link className="btn btn-saffron" to="/citizen">{t('home.portalBtn')}</Link>
            </article>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}

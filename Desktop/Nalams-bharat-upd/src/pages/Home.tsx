import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FlagBar from '../components/FlagBar'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import Reveal from '../components/Reveal'
import { useLanguage } from '../context/LanguageContext'

const NAV = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.features', to: '/#features' },
  { key: 'nav.howItWorks', to: '/#how-it-works' },
  { key: 'nav.pricing', to: '/#pricing' },
  { key: 'nav.blog', to: '/blog' },
  { key: 'nav.howToUse', to: '/how-to-use' },
  { key: 'nav.about', to: '/#about-us' },
]

const PORTALS = [
  { title: 'Central Government', desc: 'National command centre, state performance grid, cross-state corridors.', to: '/login?role=central', btn: 'btn-navy', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=480' },
  { title: 'State Government', desc: 'State-level command centre and district performance grid.', to: '/login?role=state', btn: 'btn-navy', image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=480' },
  { title: 'District / Collector', desc: 'GIS war room, risk-scored approvals queue, individual case files.', to: '/login?role=collector', btn: 'btn-navy', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=480' },
  { title: 'Project Implementing Agency', desc: 'Projects, land identification, landowners, documents, grievances.', to: '/login?role=pia', btn: 'btn-saffron', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=480' },
  { title: 'Field Officer', desc: 'Verification queue, geo-tagged inspection, boundary map.', to: '/login?role=field', btn: 'btn-saffron', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=480' },
  { title: 'Citizen / Landowner', desc: 'Track your case, compensation breakdown, documents, grievances.', to: '/login?role=citizen', btn: 'btn-green', image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=480' },
]

const FEATURE_IMAGES = [
  'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=480',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=480',
  'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=480',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=480',
]

const BLOG_IMAGES = [
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=480',
  'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=480', 
  'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=480', 
]

export default function Home() {
  const { t } = useLanguage()
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [hash])

  return (
    <>
      <FlagBar />
      <SiteHeader activeTo="/" links={NAV} />

      <section className="relative bg-white border-b border-line bg-[linear-gradient(90deg,#ff9933_0_10px,transparent_10px)] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1532375810709-75b1d3166113?auto=format&fit=crop&q=80&w=900"
          alt=""
          aria-hidden="true"
          className="hidden lg:block float-slow absolute -right-24 -top-16 w-[420px] h-[420px] object-cover rounded-full opacity-[0.10] pointer-events-none select-none"
        />
        <div className="wrap grid grid-cols-[1.15fr_0.85fr] gap-12 items-center py-16 max-[900px]:grid-cols-1 max-[900px]:py-9 relative">
          <Reveal>
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
          </Reveal>
          <Reveal delay={2}>
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
          </Reveal>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-16 scroll-mt-20">
        <div className="wrap">
          <Reveal><p className="kicker">{t('home.features.kicker')}</p></Reveal>
          <Reveal delay={1}><h2>{t('home.features.title')}</h2></Reveal>
          <Reveal delay={1}><p className="max-w-[64ch]">{t('home.features.desc')}</p></Reveal>
          <div className="grid grid-cols-4 gap-4 mt-6 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
            <Reveal delay={1} className="img-pop">
              <article className="card h-full">
                <div className="thumb-wrap h-[120px]">
                  <img src={FEATURE_IMAGES[0]} alt="" loading="lazy" />
                </div>
                <h3 className="text-lg">{t('home.features.f1.title')}</h3>
                <p className="mb-0 text-sm">{t('home.features.f1.desc')}</p>
              </article>
            </Reveal>
            <Reveal delay={2} className="img-pop">
              <article className="card h-full">
                <div className="thumb-wrap h-[120px]">
                  <img src={FEATURE_IMAGES[1]} alt="" loading="lazy" />
                </div>
                <h3 className="text-lg">{t('home.features.f2.title')}</h3>
                <p className="mb-0 text-sm">{t('home.features.f2.desc')}</p>
              </article>
            </Reveal>
            <Reveal delay={3} className="img-pop">
              <article className="card h-full">
                <div className="thumb-wrap h-[120px]">
                  <img src={FEATURE_IMAGES[2]} alt="" loading="lazy" />
                </div>
                <h3 className="text-lg">{t('home.features.f3.title')}</h3>
                <p className="mb-0 text-sm">{t('home.features.f3.desc')}</p>
              </article>
            </Reveal>
            <Reveal delay={4} className="img-pop">
              <article className="card h-full">
                <div className="thumb-wrap h-[120px]">
                  <img src={FEATURE_IMAGES[3]} alt="" loading="lazy" />
                </div>
                <h3 className="text-lg">{t('home.features.f4.title')}</h3>
                <p className="mb-0 text-sm">{t('home.features.f4.desc')}</p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PORTALS */}
      <section className="py-16 bg-white border-y border-line">
        <div className="wrap">
          <Reveal><p className="kicker">{t('home.portals.kicker')}</p></Reveal>
          <Reveal delay={1}><h2>{t('home.portals.title')}</h2></Reveal>
          <Reveal delay={1}><p>{t('home.portals.desc')}</p></Reveal>
          <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-1">
            {PORTALS.map((p, i) => (
              <Reveal key={p.to} delay={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5} className="img-pop">
                <article className="card flex flex-col h-full">
                  <div className="thumb-wrap h-[140px]">
                    <img src={p.image} alt="" loading="lazy" />
                  </div>
                  <h3 className="text-xl">{p.title}</h3>
                  <p className="flex-1">{p.desc}</p>
                  <Link className={`btn ${p.btn}`} to={p.to}>{t('home.portals.openBtn')}</Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-16 scroll-mt-20">
        <div className="wrap">
          <Reveal><p className="kicker">{t('home.howItWorks.kicker')}</p></Reveal>
          <Reveal delay={1}><h2>{t('home.howItWorks.title')}</h2></Reveal>
          <Reveal delay={1}><p>{t('home.howItWorks.desc')}</p></Reveal>
          <div className="grid grid-cols-6 gap-2 max-[900px]:grid-cols-1">
            <Reveal delay={1} className="step step-n"><b>1</b>{t('home.step.identified')}</Reveal>
            <Reveal delay={2} className="step step-n"><b>2</b>{t('home.step.surveyed')}</Reveal>
            <Reveal delay={3} className="step step-s"><b>3</b>{t('home.step.notified')}</Reveal>
            <Reveal delay={4} className="step step-s"><b>4</b>{t('home.step.objection')}</Reveal>
            <Reveal delay={5} className="step step-g"><b>5</b>{t('home.step.awarded')}</Reveal>
            <Reveal delay={5} className="step step-g"><b>6</b>{t('home.step.possession')}</Reveal>
          </div>
          <Reveal delay={1}>
            <p className="mt-4 mb-0">
              <Link className="btn btn-line" to="/how-to-use">{t('home.howItWorks.guideLink')}</Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-16 bg-white border-y border-line scroll-mt-20">
        <div className="wrap">
          <Reveal><p className="kicker">{t('home.pricing.kicker')}</p></Reveal>
          <Reveal delay={1}><h2>{t('home.pricing.title')}</h2></Reveal>
          <Reveal delay={1}><p className="max-w-[64ch]">{t('home.pricing.desc')}</p></Reveal>
          <div className="grid grid-cols-3 gap-4 mt-6 max-[900px]:grid-cols-1">
            <Reveal delay={1}>
              <article className="card flex flex-col h-full">
                <span className="kicker">{t('home.pricing.p1.price')}</span>
                <h3 className="text-xl">{t('home.pricing.p1.name')}</h3>
                <p className="flex-1 mb-0">{t('home.pricing.p1.desc')}</p>
              </article>
            </Reveal>
            <Reveal delay={2}>
              <article className="card flex flex-col h-full">
                <span className="kicker">{t('home.pricing.p2.price')}</span>
                <h3 className="text-xl">{t('home.pricing.p2.name')}</h3>
                <p className="flex-1 mb-0">{t('home.pricing.p2.desc')}</p>
              </article>
            </Reveal>
            <Reveal delay={3}>
              <article className="card flex flex-col h-full">
                <span className="kicker">{t('home.pricing.p3.price')}</span>
                <h3 className="text-xl">{t('home.pricing.p3.name')}</h3>
                <p className="flex-1 mb-0">{t('home.pricing.p3.desc')}</p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-16 scroll-mt-20">
        <div className="wrap">
          <Reveal><p className="kicker">{t('home.blog.kicker')}</p></Reveal>
          <Reveal delay={1}><h2>{t('home.blog.title')}</h2></Reveal>
          <Reveal delay={1}><p className="max-w-[64ch]">{t('home.blog.desc')}</p></Reveal>
          <div className="grid grid-cols-3 gap-4 mt-6 max-[900px]:grid-cols-1">
            <Reveal delay={1} className="img-pop">
              <article className="card h-full">
                <div className="thumb-wrap h-[140px]">
                  <img src={BLOG_IMAGES[0]} alt="" loading="lazy" />
                </div>
                <h3 className="text-lg">{t('home.blog.b1.title')}</h3>
                <p className="mb-0 text-sm">{t('home.blog.b1.excerpt')}</p>
              </article>
            </Reveal>
            <Reveal delay={2} className="img-pop">
              <article className="card h-full">
                <div className="thumb-wrap h-[140px]">
                  <img src={BLOG_IMAGES[1]} alt="" loading="lazy" />
                </div>
                <h3 className="text-lg">{t('home.blog.b2.title')}</h3>
                <p className="mb-0 text-sm">{t('home.blog.b2.excerpt')}</p>
              </article>
            </Reveal>
            <Reveal delay={3} className="img-pop">
              <article className="card h-full">
                <div className="thumb-wrap h-[140px]">
                  <img src={BLOG_IMAGES[2]} alt="" loading="lazy" />
                </div>
                <h3 className="text-lg">{t('home.blog.b3.title')}</h3>
                <p className="mb-0 text-sm">{t('home.blog.b3.excerpt')}</p>
              </article>
            </Reveal>
          </div>
          <Reveal delay={1}>
            <p className="mt-5 mb-0">
              <Link className="btn btn-navy" to="/blog">{t('home.blog.viewAll')}</Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ABOUT US */}
      <section id="about-us" className="py-16 bg-white border-y border-line scroll-mt-20">
        <div className="wrap max-w-[860px]">
          <Reveal><p className="kicker">{t('home.about.kicker')}</p></Reveal>
          <Reveal delay={1}><h2>{t('home.about.title')}</h2></Reveal>
          <Reveal delay={1}><p className="text-lg">{t('home.about.desc')}</p></Reveal>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
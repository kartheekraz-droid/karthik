import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FlagBar from '../components/FlagBar'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import Reveal from '../components/Reveal'
import Badge from '../components/Badge'
import { useLanguage } from '../context/LanguageContext'
import { PENDING_PROJECT_UPDATES, UPCOMING_PROJECT_UPDATES } from '../data/mockData'

const NAV = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.features', to: '/#features' },
  { key: 'nav.howItWorks', to: '/#how-it-works' },
  { key: 'nav.blog', to: '/blog' },
  { key: 'nav.howToUse', to: '/how-to-use' },
  { key: 'nav.about', to: '/#about-us' },
]

function statusTone(status: 'On Track' | 'Delayed' | 'Critical') {
  if (status === 'On Track') return 'green' as const
  if (status === 'Delayed') return 'saffron' as const
  return 'red' as const
}

function SkeletonCard() {
  return (
    <div className="card">
      <div className="thumb-wrap h-[180px]">
        <div className="skeleton w-full h-full" />
      </div>
      <div className="skeleton h-4 w-3/4 rounded mb-2" />
      <div className="skeleton h-3 w-full rounded mb-1.5" />
      <div className="skeleton h-3 w-5/6 rounded" />
    </div>
  )
}

export default function Blog() {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulates a live fetch — swap for a real query, e.g.
    // supabase.from('project_updates').select('*')
    const timer = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <FlagBar />
      <SiteHeader activeTo="/blog" links={NAV} />

      <section className="bg-white border-b border-line py-14">
        <div className="wrap">
          <p className="kicker">{t('blog.page.kicker')}</p>
          <h1 className="text-[36px]">{t('blog.page.title')}</h1>
          <p className="text-lg max-w-[62ch]">{t('blog.page.desc')}</p>
        </div>
      </section>

      {/* FEATURED READS */}
      <section className="py-16">
        <div className="wrap">
          <Reveal><p className="kicker">{t('home.blog.kicker')}</p></Reveal>
          <Reveal delay={1}><h2>{t('home.blog.title')}</h2></Reveal>
          <div className="grid grid-cols-3 gap-4 mt-6 max-[900px]:grid-cols-1">
            {loading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              <>
                <Reveal delay={1} className="img-pop">
                  <article className="card h-full">
                    <div className="thumb-wrap h-[180px]">
                      <img src="https://picsum.photos/seed/nalams-blog1/640/420" alt="" loading="lazy" />
                    </div>
                    <h3 className="text-lg">{t('home.blog.b1.title')}</h3>
                    <p className="mb-0 text-sm">{t('home.blog.b1.excerpt')}</p>
                  </article>
                </Reveal>
                <Reveal delay={2} className="img-pop">
                  <article className="card h-full">
                    <div className="thumb-wrap h-[180px]">
                      <img src="https://picsum.photos/seed/nalams-blog2/640/420" alt="" loading="lazy" />
                    </div>
                    <h3 className="text-lg">{t('home.blog.b2.title')}</h3>
                    <p className="mb-0 text-sm">{t('home.blog.b2.excerpt')}</p>
                  </article>
                </Reveal>
                <Reveal delay={3} className="img-pop">
                  <article className="card h-full">
                    <div className="thumb-wrap h-[180px]">
                      <img src="https://picsum.photos/seed/nalams-blog3/640/420" alt="" loading="lazy" />
                    </div>
                    <h3 className="text-lg">{t('home.blog.b3.title')}</h3>
                    <p className="mb-0 text-sm">{t('home.blog.b3.excerpt')}</p>
                  </article>
                </Reveal>
              </>
            )}
          </div>
        </div>
      </section>

      {/* PENDING PROJECT UPDATES */}
      <section className="py-16 bg-white border-y border-line">
        <div className="wrap">
          <Reveal><p className="kicker">{t('blog.pending.kicker')}</p></Reveal>
          <Reveal delay={1}><h2>{t('blog.pending.title')}</h2></Reveal>
          <Reveal delay={1}><p className="max-w-[64ch]">{t('blog.pending.desc')}</p></Reveal>

          <div className="grid grid-cols-2 gap-4 mt-6 max-[900px]:grid-cols-1">
            {loading
              ? [0, 1, 2, 3].map((i) => <SkeletonCard key={i} />)
              : PENDING_PROJECT_UPDATES.map((p, i) => (
                  <Reveal key={p.project} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className="img-pop">
                    <article className="card flex flex-col md:flex-row gap-4 h-full max-[560px]:flex-col">
                      <div className="thumb-wrap w-full md:w-[38%] h-[150px] shrink-0 mb-0 max-[560px]:w-full">
                        <img src={p.image} alt="" loading="lazy" />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                          <h3 className="text-lg mb-0">{p.project}</h3>
                          <Badge tone={statusTone(p.status)}>{p.status}</Badge>
                        </div>
                        <p className="text-sm mb-1">{p.district} · {p.stage}</p>
                        <div className="w-full h-2 rounded-full bg-line/60 overflow-hidden mb-2">
                          <div
                            className={
                              'h-full rounded-full ' +
                              (p.status === 'On Track' ? 'bg-green' : p.status === 'Delayed' ? 'bg-saffron' : 'bg-red')
                            }
                            style={{ width: `${p.progress}%` }}
                          />
                        </div>
                        <p className="text-sm flex-1 mb-1">{p.note}</p>
                        <small className="text-muted text-xs">{t('blog.updated')}: {p.updated}</small>
                      </div>
                    </article>
                  </Reveal>
                ))}
          </div>
        </div>
      </section>

      {/* UPCOMING PROJECT UPDATES */}
      <section className="py-16">
        <div className="wrap">
          <Reveal><p className="kicker">{t('blog.upcoming.kicker')}</p></Reveal>
          <Reveal delay={1}><h2>{t('blog.upcoming.title')}</h2></Reveal>
          <Reveal delay={1}><p className="max-w-[64ch]">{t('blog.upcoming.desc')}</p></Reveal>

          <div className="grid grid-cols-3 gap-4 mt-6 max-[900px]:grid-cols-1">
            {loading
              ? [0, 1, 2].map((i) => <SkeletonCard key={i} />)
              : UPCOMING_PROJECT_UPDATES.map((p, i) => (
                  <Reveal key={p.project} delay={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5} className="img-pop">
                    <article className="card h-full flex flex-col">
                      <div className="thumb-wrap h-[160px]">
                        <img src={p.image} alt="" loading="lazy" />
                      </div>
                      <span className="tag tag-n mb-2 inline-block w-fit">{t('blog.upcoming.tag')}</span>
                      <h3 className="text-lg">{p.project}</h3>
                      <p className="text-sm mb-1">{p.district} · {p.scope}</p>
                      <p className="text-sm flex-1">{p.note}</p>
                      <small className="text-muted text-xs">{p.targetStart}</small>
                    </article>
                  </Reveal>
                ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-line">
        <div className="wrap flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="kicker mb-1">{t('blog.cta.kicker')}</p>
            <h3 className="text-2xl mb-0">{t('blog.cta.title')}</h3>
          </div>
          <div className="flex gap-2.5 flex-wrap">
            <Link className="btn btn-navy" to="/how-to-use">{t('blog.cta.howToUse')}</Link>
            <Link className="btn btn-line" to="/">{t('blog.cta.backHome')}</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}

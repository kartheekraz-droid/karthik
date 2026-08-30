import { Link } from 'react-router-dom'
import FlagBar from '../components/FlagBar'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import Reveal from '../components/Reveal'
import { useLanguage } from '../context/LanguageContext'

const NAV = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.features', to: '/#features' },
  { key: 'nav.howItWorks', to: '/#how-it-works' },
  { key: 'nav.blog', to: '/blog' },
  { key: 'nav.howToUse', to: '/how-to-use' },
  { key: 'nav.about', to: '/#about-us' },
]

const ROLES = [
  {
    id: 'central',
    to: '/central',
    image: 'https://picsum.photos/seed/nalams-role-central/640/420',
    titleKey: 'howToUse.role.central.title',
    stepKeys: ['howToUse.role.central.s1', 'howToUse.role.central.s2', 'howToUse.role.central.s3'],
    btnKey: 'howToUse.role.central.btn',
  },
  {
    id: 'state',
    to: '/state',
    image: 'https://picsum.photos/seed/nalams-role-state/640/420',
    titleKey: 'howToUse.role.state.title',
    stepKeys: ['howToUse.role.state.s1', 'howToUse.role.state.s2', 'howToUse.role.state.s3'],
    btnKey: 'howToUse.role.state.btn',
  },
  {
    id: 'collector',
    to: '/collector',
    image: 'https://picsum.photos/seed/nalams-role-collector/640/420',
    titleKey: 'howToUse.role.collector.title',
    stepKeys: ['howToUse.role.collector.s1', 'howToUse.role.collector.s2', 'howToUse.role.collector.s3'],
    btnKey: 'howToUse.role.collector.btn',
  },
  {
    id: 'pia',
    to: '/pia',
    image: 'https://picsum.photos/seed/nalams-role-pia/640/420',
    titleKey: 'howToUse.role.pia.title',
    stepKeys: ['howToUse.role.pia.s1', 'howToUse.role.pia.s2', 'howToUse.role.pia.s3'],
    btnKey: 'howToUse.role.pia.btn',
  },
  {
    id: 'field',
    to: '/field',
    image: 'https://picsum.photos/seed/nalams-role-field/640/420',
    titleKey: 'howToUse.role.field.title',
    stepKeys: ['howToUse.role.field.s1', 'howToUse.role.field.s2', 'howToUse.role.field.s3'],
    btnKey: 'howToUse.role.field.btn',
  },
  {
    id: 'citizen',
    to: '/citizen',
    image: 'https://picsum.photos/seed/nalams-role-citizen/640/420',
    titleKey: 'howToUse.role.citizen.title',
    stepKeys: ['howToUse.role.citizen.s1', 'howToUse.role.citizen.s2', 'howToUse.role.citizen.s3'],
    btnKey: 'howToUse.role.citizen.btn',
  },
]

export default function HowToUse() {
  const { t } = useLanguage()

  return (
    <>
      <FlagBar />
      <SiteHeader activeTo="/how-to-use" links={NAV} />

      <section className="bg-white border-b border-line py-14">
        <div className="wrap grid grid-cols-[1.2fr_0.8fr] gap-10 items-center max-[900px]:grid-cols-1">
          <div>
            <p className="kicker">{t('howToUse.page.kicker')}</p>
            <h1 className="text-[36px]">{t('howToUse.page.title')}</h1>
            <p className="text-lg max-w-[56ch]">{t('howToUse.page.desc')}</p>
            <div className="flex flex-wrap gap-2.5 mt-2">
              <Link className="btn btn-navy" to="/login">{t('howToUse.page.loginBtn')}</Link>
              <Link className="btn btn-saffron" to="/citizen">{t('howToUse.page.citizenBtn')}</Link>
            </div>
          </div>
          <Reveal>
            <div className="thumb-wrap rounded-[20px] shadow-card h-[260px]">
              <img src="https://picsum.photos/seed/nalams-howto-hero/700/500" alt="" className="img-pop" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* QUICK START */}
      <section className="py-16">
        <div className="wrap">
          <Reveal><p className="kicker">{t('howToUse.quick.kicker')}</p></Reveal>
          <Reveal delay={1}><h2>{t('howToUse.quick.title')}</h2></Reveal>
          <div className="grid grid-cols-4 gap-2 mt-6 max-[900px]:grid-cols-1">
            <Reveal delay={1} className="step step-n"><b>1</b>{t('howToUse.quick.s1')}</Reveal>
            <Reveal delay={2} className="step step-n"><b>2</b>{t('howToUse.quick.s2')}</Reveal>
            <Reveal delay={3} className="step step-s"><b>3</b>{t('howToUse.quick.s3')}</Reveal>
            <Reveal delay={4} className="step step-g"><b>4</b>{t('howToUse.quick.s4')}</Reveal>
          </div>
        </div>
      </section>

      {/* PER-ROLE GUIDES */}
      <section className="py-16 bg-white border-y border-line">
        <div className="wrap">
          <Reveal><p className="kicker">{t('howToUse.roles.kicker')}</p></Reveal>
          <Reveal delay={1}><h2>{t('howToUse.roles.title')}</h2></Reveal>
          <Reveal delay={1}><p className="max-w-[64ch]">{t('howToUse.roles.desc')}</p></Reveal>

          <div className="grid grid-cols-2 gap-4 mt-6 max-[900px]:grid-cols-1">
            {ROLES.map((role, i) => (
              <Reveal key={role.id} delay={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5} className="img-pop">
                <article className="card flex flex-col md:flex-row gap-4 h-full max-[560px]:flex-col">
                  <div className="thumb-wrap w-full md:w-[42%] h-[150px] shrink-0 mb-0 max-[560px]:w-full">
                    <img src={role.image} alt="" loading="lazy" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-lg">{t(role.titleKey)}</h3>
                    <ol className="list-none p-0 m-0 space-y-1.5 mb-3 flex-1">
                      {role.stepKeys.map((k, idx) => (
                        <li key={k} className="text-sm text-muted flex gap-2">
                          <b className="text-navy shrink-0">{idx + 1}.</b>
                          <span>{t(k)}</span>
                        </li>
                      ))}
                    </ol>
                    <Link className="btn btn-line w-fit" to={role.to}>{t(role.btnKey)}</Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TIPS */}
      <section className="py-16">
        <div className="wrap">
          <Reveal><p className="kicker">{t('howToUse.tips.kicker')}</p></Reveal>
          <Reveal delay={1}><h2>{t('howToUse.tips.title')}</h2></Reveal>
          <div className="grid grid-cols-3 gap-4 mt-6 max-[900px]:grid-cols-1">
            <Reveal delay={1}>
              <article className="card h-full">
                <h3 className="text-lg">{t('howToUse.tips.t1.title')}</h3>
                <p className="mb-0 text-sm">{t('howToUse.tips.t1.desc')}</p>
              </article>
            </Reveal>
            <Reveal delay={2}>
              <article className="card h-full">
                <h3 className="text-lg">{t('howToUse.tips.t2.title')}</h3>
                <p className="mb-0 text-sm">{t('howToUse.tips.t2.desc')}</p>
              </article>
            </Reveal>
            <Reveal delay={3}>
              <article className="card h-full">
                <h3 className="text-lg">{t('howToUse.tips.t3.title')}</h3>
                <p className="mb-0 text-sm">{t('howToUse.tips.t3.desc')}</p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}

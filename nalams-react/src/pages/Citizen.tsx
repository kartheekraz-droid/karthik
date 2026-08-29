import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import FlagBar from '../components/FlagBar'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import { useLanguage } from '../context/LanguageContext'

const NAV = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.myCase', to: '/citizen' },
  { key: 'nav.login', to: '/login', cta: true },
]

export default function Citizen() {
  const { t } = useLanguage()
  const [query, setQuery] = useState('Gat 112, Wadgaon')

  function handleSearch(e: FormEvent) {
    e.preventDefault()
    // TODO: supabase.from('cases').select('*').ilike('survey_no', `%${query}%`)
  }

  return (
    <>
      <FlagBar />
      <SiteHeader activeTo="/citizen" subtitle="PUBLIC PORTAL" links={NAV} />

      <section className="py-16">
        <div className="wrap max-w-[760px]">
          <p className="kicker">{t('citizen.kicker')}</p>
          <h1>{t('citizen.title')}</h1>
          <p>{t('citizen.desc')}</p>

          <form onSubmit={handleSearch} className="card mb-4">
            <label htmlFor="q" className="block text-[13px] font-bold my-3">{t('citizen.searchLabel')}</label>
            <div className="flex gap-2.5">
              <input
                id="q"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 min-w-0 px-3 py-3 border border-line rounded-[10px] bg-paper"
              />
              <button type="submit" className="btn btn-navy">{t('citizen.find')}</button>
            </div>
          </form>

          <article className="card">
            <p><span className="tag tag-s">{t('citizen.status')}</span></p>
            <h2>{t('citizen.caseTitle')}</h2>
            <p>{t('citizen.caseDesc')}</p>
            <div className="grid grid-cols-4 gap-2 my-2 mb-4 max-[900px]:grid-cols-1">
              <div className="step step-g"><b>1</b>{t('citizen.step.notice')}</div>
              <div className="step step-s"><b>2</b>{t('citizen.step.hearing')}</div>
              <div className="step step-n"><b>3</b>{t('citizen.step.award')}</div>
              <div className="step step-n"><b>4</b>{t('citizen.step.payment')}</div>
            </div>
            <p>{t('citizen.uploadDesc')}</p>
            <div className="flex flex-wrap gap-2.5">
              <button className="btn btn-saffron" type="button">{t('citizen.uploadBtn')}</button>
              <Link className="btn btn-line" to="/">{t('citizen.backHome')}</Link>
            </div>
          </article>
        </div>
      </section>

      <SiteFooter noteKey="footer.noteCitizen" />
    </>
  )
}

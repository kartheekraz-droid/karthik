import PortalShell from '../../components/PortalShell'
import { useLanguage } from '../../context/LanguageContext'

export default function CollectorParcel() {
  const { t } = useLanguage()

  const NAV = [
    { label: t('collector.nav.command'), to: '/collector' },
    { label: t('collector.nav.map'), to: '/collector/map' },
    { label: t('collector.nav.approvals'), to: '/collector/approvals' },
    { label: t('collector.nav.budget'), to: '/collector/budget' },
    { label: t('collector.nav.alerts'), to: '/collector/alerts' },
    { label: t('collector.nav.analytics'), to: '/collector/analytics' },
  ]

  const TIMELINE = [
    { title: t('parcel.tl.identified'), detail: t('parcel.tl.identifiedDate'), done: true },
    { title: t('parcel.tl.survey'), detail: t('parcel.tl.surveyDate'), done: true },
    { title: t('parcel.tl.notification'), detail: t('parcel.tl.notificationDate'), done: true },
    { title: t('parcel.tl.objection'), detail: t('parcel.tl.objectionDate'), done: false },
    { title: t('parcel.tl.award'), detail: t('parcel.tl.awardDate'), done: false },
  ]

  const DOCS = [
    t('collector.parcel.doc1'),
    t('collector.parcel.doc2'),
    t('collector.parcel.doc3'),
    t('collector.parcel.doc4'),
    t('collector.parcel.doc5'),
  ]

  return (
    <PortalShell
      portalLabel={t('portal.collector')}
      portalHome="/collector"
      navItems={NAV}
      topbarLeft={<strong>{t('collector.parcel.topbarTitle')}</strong>}
      topbarRight={<span className="tag tag-s">{t('collector.parcel.topbarTag')}</span>}
    >
      <h1>{t('collector.parcel.title')}</h1>
      <p>{t('collector.parcel.desc')}</p>

      <div className="grid grid-cols-[1.1fr_0.9fr] gap-3.5 max-[900px]:grid-cols-1">
        <section className="card">
          <h3>{t('collector.parcel.timelineTitle')}</h3>
          <div className="border-l-[3px] border-navy ml-2 mt-2 pl-[18px]">
            {TIMELINE.map((step) => (
              <div key={step.title} className="mb-4 relative">
                <span
                  className="absolute -left-[25px] top-1.5 w-3 h-3 rounded-full ring-[3px] ring-white"
                  style={{ background: step.done ? '#138808' : '#ff9933', boxShadow: '0 0 0 3px #fff, 0 0 0 5px #000080' }}
                />
                <strong>{step.title}</strong>
                <p>{step.detail}</p>
              </div>
            ))}
          </div>

          <h3>{t('collector.parcel.documentsTitle')}</h3>
          <ul className="text-sm text-muted space-y-1.5">
            {DOCS.map((doc) => (
              <li key={doc}>{doc}</li>
            ))}
          </ul>

          <div className="flex gap-2.5 mt-4 flex-wrap">
            <button className="btn btn-navy" type="button">{t('collector.parcel.approveBtn')}</button>
            <button className="btn btn-line" type="button">{t('collector.parcel.sendBackBtn')}</button>
          </div>
        </section>

        <section className="card">
          <h3>{t('collector.parcel.decisionSupportTitle')}</h3>
          <div className="space-y-3 text-sm">
            <p><span className="tag tag-g">{t('collector.parcel.fairnessTag')}</span> {t('collector.parcel.fairnessText')}</p>
            <p><span className="tag tag-r">{t('collector.parcel.bottleneckTag')}</span> {t('collector.parcel.bottleneckText')}</p>
            <p><span className="tag tag-s">{t('collector.parcel.disputeTag')}</span> {t('collector.parcel.disputeText')}</p>
            <p><span className="tag tag-n">{t('collector.parcel.neighbourTag')}</span> {t('collector.parcel.neighbourText')}</p>
          </div>

          <h3 className="mt-4">{t('collector.parcel.compTitle')}</h3>
          <table className="w-full border-collapse text-[15px]">
            <tbody>
              <tr><td className="py-2 px-2 border-b border-[#ece8df]">{t('collector.parcel.comp.market')}</td><td className="py-2 px-2 border-b border-[#ece8df]">₹48,20,000</td></tr>
              <tr><td className="py-2 px-2 border-b border-[#ece8df]">{t('collector.parcel.comp.solatium')}</td><td className="py-2 px-2 border-b border-[#ece8df]">₹48,20,000</td></tr>
              <tr><td className="py-2 px-2">{t('collector.parcel.comp.total')}</td><td className="py-2 px-2"><strong>₹97,50,000</strong></td></tr>
            </tbody>
          </table>
        </section>
      </div>
    </PortalShell>
  )
}

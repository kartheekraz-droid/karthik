import FlagBar from '../components/FlagBar'
import AppShell from '../components/AppShell'
import { useLanguage } from '../context/LanguageContext'

const TIMELINE = [
  { titleKey: 'parcel.tl.identified', dateKey: 'parcel.tl.identifiedDate', done: true },
  { titleKey: 'parcel.tl.survey', dateKey: 'parcel.tl.surveyDate', done: true },
  { titleKey: 'parcel.tl.notification', dateKey: 'parcel.tl.notificationDate', done: true },
  { titleKey: 'parcel.tl.objection', dateKey: 'parcel.tl.objectionDate', done: false },
  { titleKey: 'parcel.tl.award', dateKey: 'parcel.tl.awardDate', done: false },
]

export default function Parcel() {
  const { t } = useLanguage()
  return (
    <>
      <FlagBar />
      <AppShell
        topbarLeft={<strong>{t('parcel.location')}</strong>}
        topbarRight={<span className="tag tag-s">{t('parcel.status')}</span>}
      >
        <h1>{t('parcel.title')}</h1>
        <p>{t('parcel.desc')}</p>

        <div className="grid grid-cols-[1.4fr_0.8fr] gap-3.5 max-[900px]:grid-cols-1">
          <section className="card">
            <h3>{t('parcel.timelineTitle')}</h3>
            <div className="border-l-[3px] border-navy ml-2 mt-2 pl-[18px]">
              {TIMELINE.map((step) => (
                <div key={step.titleKey} className="mb-4 relative">
                  <span
                    className="absolute -left-[25px] top-1.5 w-3 h-3 rounded-full ring-[3px] ring-white"
                    style={{
                      background: step.done ? '#138808' : '#ff9933',
                      boxShadow: '0 0 0 3px #fff, 0 0 0 5px #000080',
                    }}
                  />
                  <strong>{t(step.titleKey)}</strong>
                  <p>{t(step.dateKey)}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="card">
            <h3>{t('parcel.compTitle')}</h3>
            <table className="w-full border-collapse text-[15px]">
              <tbody>
                <tr>
                  <td className="py-2.5 px-2 border-b border-[#ece8df]">{t('parcel.comp.market')}</td>
                  <td className="py-2.5 px-2 border-b border-[#ece8df]">₹48,20,000</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-2 border-b border-[#ece8df]">{t('parcel.comp.solatium')}</td>
                  <td className="py-2.5 px-2 border-b border-[#ece8df]">₹48,20,000</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-2 border-b border-[#ece8df]">{t('parcel.comp.trees')}</td>
                  <td className="py-2.5 px-2 border-b border-[#ece8df]">₹1,10,000</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-2"><strong>{t('parcel.comp.total')}</strong></td>
                  <td className="py-2.5 px-2"><strong>₹97,50,000</strong></td>
                </tr>
              </tbody>
            </table>
            <div className="flex gap-2.5 mt-4 flex-wrap">
              <button className="btn btn-navy" type="button">{t('parcel.scheduleBtn')}</button>
              <button className="btn btn-line" type="button">{t('parcel.uploadBtn')}</button>
            </div>
          </section>
        </div>
      </AppShell>
    </>
  )
}

import { Link } from 'react-router-dom'
import FlagBar from '../components/FlagBar'
import AppShell from '../components/AppShell'
import { useLanguage } from '../context/LanguageContext'

const ALERT_KEYS = [
  { tagKey: 'dashboard.alert.sla', tagClass: 'tag-r', where: 'Gat 112, Wadgaon', whyKey: 'dashboard.alert.slaWhy' },
  { tagKey: 'dashboard.alert.forest', tagClass: 'tag-s', where: 'Gat 88–91', whyKey: 'dashboard.alert.forestWhy' },
  { tagKey: 'dashboard.alert.pay', tagClass: 'tag-n', where: 'Gat 204', whyKey: 'dashboard.alert.payWhy' },
]

export default function Dashboard() {
  const { t } = useLanguage()
  return (
    <>
      <FlagBar />
      <AppShell
        topbarLeft={<strong>{t('dashboard.district')}</strong>}
        topbarRight={<span className="tag tag-s">{t('dashboard.slaAlert')}</span>}
      >
        <h1>{t('dashboard.title')}</h1>
        <p>{t('dashboard.desc')}</p>

        <div className="grid grid-cols-4 gap-3 my-5 max-[900px]:grid-cols-1">
          <div className="bg-white border border-line rounded-2xl p-4 shadow-card">
            <small className="text-muted text-xs font-bold tracking-wide uppercase">{t('dashboard.kpi.parcels')}</small>
            <strong className="block text-[28px] mt-1.5">47</strong>
          </div>
          <div className="bg-white border border-line rounded-2xl p-4 shadow-card">
            <small className="text-muted text-xs font-bold tracking-wide uppercase">{t('dashboard.kpi.objection')}</small>
            <strong className="block text-[28px] mt-1.5 text-saffron-deep">12</strong>
          </div>
          <div className="bg-white border border-line rounded-2xl p-4 shadow-card">
            <small className="text-muted text-xs font-bold tracking-wide uppercase">{t('dashboard.kpi.paid')}</small>
            <strong className="block text-[28px] mt-1.5 text-green-deep">18</strong>
          </div>
          <div className="bg-white border border-line rounded-2xl p-4 shadow-card">
            <small className="text-muted text-xs font-bold tracking-wide uppercase">{t('dashboard.kpi.pending')}</small>
            <strong className="block text-[28px] mt-1.5">₹6.1 Cr</strong>
          </div>
        </div>

        <div className="grid grid-cols-[1.4fr_0.8fr] gap-3.5 max-[900px]:grid-cols-1">
          <section className="card">
            <h3>{t('dashboard.pipeline')}</h3>
            <div className="grid grid-cols-6 gap-2 my-3 mb-4 max-[900px]:grid-cols-1">
              <div className="step step-n"><b>47</b>{t('home.step.identified')}</div>
              <div className="step step-n"><b>41</b>{t('home.step.surveyed')}</div>
              <div className="step step-s"><b>29</b>{t('home.step.notified')}</div>
              <div className="step step-s"><b>12</b>{t('home.step.objection')}</div>
              <div className="step step-g"><b>18</b>{t('home.step.awarded')}</div>
              <div className="step step-g"><b>18</b>{t('home.step.possession')}</div>
            </div>
            <table className="w-full border-collapse text-[15px]">
              <thead>
                <tr>
                  <th className="text-left py-2.5 px-2 text-muted text-xs border-b border-[#ece8df]">{t('dashboard.alertHeader')}</th>
                  <th className="text-left py-2.5 px-2 text-muted text-xs border-b border-[#ece8df]">{t('dashboard.whereHeader')}</th>
                  <th className="text-left py-2.5 px-2 text-muted text-xs border-b border-[#ece8df]">{t('dashboard.whyHeader')}</th>
                </tr>
              </thead>
              <tbody>
                {ALERT_KEYS.map((a) => (
                  <tr key={a.where}>
                    <td className="py-2.5 px-2 border-b border-[#ece8df]"><span className={`tag ${a.tagClass}`}>{t(a.tagKey)}</span></td>
                    <td className="py-2.5 px-2 border-b border-[#ece8df]">{a.where}</td>
                    <td className="py-2.5 px-2 border-b border-[#ece8df]">{t(a.whyKey)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section className="card">
            <h3>{t('dashboard.decisionTitle')}</h3>
            <p>{t('dashboard.decisionDesc')}</p>
            <p><span className="tag tag-s">{t('dashboard.priority')}</span> {t('dashboard.priorityDesc')}</p>
            <div className="flex gap-2.5 mt-4 flex-wrap">
              <Link className="btn btn-saffron" to="/map">{t('dashboard.seeMap')}</Link>
              <Link className="btn btn-line" to="/parcel">{t('dashboard.openParcel')}</Link>
            </div>
          </section>
        </div>
      </AppShell>
    </>
  )
}

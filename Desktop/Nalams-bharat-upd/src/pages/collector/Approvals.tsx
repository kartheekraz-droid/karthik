import { Link } from 'react-router-dom'
import PortalShell from '../../components/PortalShell'
import Badge from '../../components/Badge'
import { APPROVAL_QUEUE, riskTone } from '../../data/mockData'
import { useLanguage } from '../../context/LanguageContext'

export default function CollectorApprovals() {
  const { t } = useLanguage()

  const NAV = [
    { label: t('collector.nav.command'), to: '/collector' },
    { label: t('collector.nav.map'), to: '/collector/map' },
    { label: t('collector.nav.approvals'), to: '/collector/approvals' },
    { label: t('collector.nav.budget'), to: '/collector/budget' },
    { label: t('collector.nav.alerts'), to: '/collector/alerts' },
    { label: t('collector.nav.analytics'), to: '/collector/analytics' },
  ]

  const HEADERS = [
    t('collector.approvals.th.project'),
    t('collector.approvals.th.surveyNo'),
    t('collector.approvals.th.owner'),
    t('collector.approvals.th.stage'),
    t('collector.approvals.th.daysPending'),
    t('collector.approvals.th.risk'),
    t('collector.approvals.th.action'),
  ]

  return (
    <PortalShell
      portalLabel={t('portal.collector')}
      portalHome="/collector"
      navItems={NAV}
      topbarLeft={<strong>{t('collector.approvals.topbarTitle')}</strong>}
      topbarRight={<Link className="btn btn-line" to="/collector">{t('collector.approvals.back')}</Link>}
    >
      <h1>{t('collector.approvals.title')}</h1>
      <p>{t('collector.approvals.desc')}</p>

      <section className="card overflow-x-auto">
        <table className="w-full border-collapse text-[14px] min-w-[720px]">
          <thead>
            <tr>
              {HEADERS.map((h) => (
                <th key={h} className="text-left py-2.5 px-2 text-muted text-xs border-b border-[#ece8df]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {APPROVAL_QUEUE.sort((a, b) => b.riskScore - a.riskScore).map((f) => (
              <tr key={f.surveyNo}>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">{f.project}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df] font-semibold">
                  <Link to="/collector/parcel" className="text-navy no-underline hover:underline">{f.surveyNo}</Link>
                </td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">{f.owner}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">{f.stage}</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">{f.daysPending}d</td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]"><Badge tone={riskTone(f.riskScore)}>{f.riskScore}/10</Badge></td>
                <td className="py-2.5 px-2 border-b border-[#ece8df]">
                  {f.riskScore <= 3 ? (
                    <button className="btn btn-green !py-1.5 !px-3 text-xs" type="button">{t('collector.approvals.quickApprove')}</button>
                  ) : (
                    <Link to="/collector/parcel" className="btn btn-line !py-1.5 !px-3 text-xs">{t('collector.approvals.review')}</Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PortalShell>
  )
}

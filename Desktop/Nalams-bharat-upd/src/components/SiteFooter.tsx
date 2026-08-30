import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function SiteFooter({ noteKey = 'footer.note' }: { noteKey?: string }) {
  const { t } = useLanguage()

  return (
    <footer className="bg-navy-2 text-[#c9d2ff] pt-12 pb-6 text-sm">
      <div className="wrap grid grid-cols-[1.3fr_1fr_1fr_1fr_1fr] gap-8 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
        <div>
          <Link to="/" className="flex items-center gap-3 text-white no-underline font-bold tracking-[0.04em] mb-3">
            <img className="w-9 h-9 shrink-0" src="/chakra.svg" alt="" />
            <span>NALAMS</span>
          </Link>
          <p className="text-[#9eacde] max-w-[26ch]">{t('footer.tagline')}</p>
        </div>

        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wide mb-3">{t('footer.products')}</h4>
          <ul className="space-y-2 list-none p-0 m-0">
            <li><Link className="text-[#c9d2ff] no-underline hover:text-white" to="/#features">{t('footer.products.features')}</Link></li>
            <li><Link className="text-[#c9d2ff] no-underline hover:text-white" to="/#how-it-works">{t('footer.products.howItWorks')}</Link></li>
            <li><Link className="text-[#c9d2ff] no-underline hover:text-white" to="/#pricing">{t('footer.products.pricing')}</Link></li>
            <li><Link className="text-[#c9d2ff] no-underline hover:text-white" to="/pia/documents">{t('footer.products.documentVault')}</Link></li>
            <li><Link className="text-[#c9d2ff] no-underline hover:text-white" to="/how-to-use">{t('footer.products.howToUse')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wide mb-3">{t('footer.resources')}</h4>
          <ul className="space-y-2 list-none p-0 m-0">
            <li><Link className="text-[#c9d2ff] no-underline hover:text-white" to="/blog">{t('footer.resources.blog')}</Link></li>
            <li><Link className="text-[#c9d2ff] no-underline hover:text-white" to="/blog">{t('footer.resources.surveyUpdates')}</Link></li>
            <li><Link className="text-[#c9d2ff] no-underline hover:text-white" to="/#about-us">{t('footer.resources.faqs')}</Link></li>
            <li><a className="text-[#c9d2ff] no-underline hover:text-white" href="mailto:hello@nalams.india">{t('footer.resources.contact')}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wide mb-3">{t('footer.company')}</h4>
          <ul className="space-y-2 list-none p-0 m-0">
            <li><Link className="text-[#c9d2ff] no-underline hover:text-white" to="/#about-us">{t('footer.company.about')}</Link></li>
            <li><Link className="text-[#c9d2ff] no-underline hover:text-white" to="/privacy-policy">{t('footer.company.privacy')}</Link></li>
            <li><Link className="text-[#c9d2ff] no-underline hover:text-white" to="/terms-and-conditions">{t('footer.company.terms')}</Link></li>
            <li><Link className="text-[#c9d2ff] no-underline hover:text-white" to="/refund-and-cancellation-policy">{t('footer.company.refund')}</Link></li>
            <li><Link className="text-[#c9d2ff] no-underline hover:text-white" to="/account-deletion-policy">{t('footer.company.accountDeletion')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wide mb-3">{t('footer.contact')}</h4>
          <ul className="space-y-2 list-none p-0 m-0">
            <li><a className="text-[#c9d2ff] no-underline hover:text-white" href="mailto:hello@nalams.india">{t('footer.contact.email')}</a></li>
            <li className="text-[#9eacde]">{t('footer.contact.location')}</li>
          </ul>
        </div>
      </div>

      <div className="wrap flex justify-between gap-3 flex-wrap mt-10 pt-5 border-t border-white/10">
        <span>
          <strong className="text-white">NALAMS</strong> · {t('footer.tagline')}
        </span>
        <span>{t(noteKey)}</span>
      </div>
    </footer>
  )
}

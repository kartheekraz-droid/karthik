import { useLanguage } from '../context/LanguageContext'

export default function SiteFooter({ noteKey = 'footer.note' }: { noteKey?: string }) {
  const { t } = useLanguage()
  return (
    <footer className="bg-navy-2 text-[#c9d2ff] py-7 text-sm">
      <div className="wrap flex justify-between gap-3 flex-wrap">
        <span>
          <strong className="text-white">NALAMS</strong> · {t('footer.tagline')}
        </span>
        <span>{t(noteKey)}</span>
      </div>
    </footer>
  )
}

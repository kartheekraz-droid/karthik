import { useLanguage } from '../context/LanguageContext'
import type { Lang } from '../i18n/translations'

const OPTIONS: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'hi', label: 'हिं' },
  { code: 'te', label: 'తె' },
]

export default function LanguageSwitcher({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const { lang, setLang } = useLanguage()

  const wrapClass =
    variant === 'dark'
      ? 'bg-white/10 border border-white/20'
      : 'bg-white border border-line'

  return (
    <div className={`inline-flex rounded-full p-0.5 gap-0.5 ${wrapClass}`}>
      {OPTIONS.map((opt) => (
        <button
          key={opt.code}
          type="button"
          onClick={() => setLang(opt.code)}
          className={
            'px-2.5 py-1 rounded-full text-xs font-bold transition-colors ' +
            (lang === opt.code
              ? 'bg-saffron text-[#2a1400]'
              : variant === 'dark'
                ? 'text-[#dce3ff] hover:text-white'
                : 'text-muted hover:text-ink')
          }
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

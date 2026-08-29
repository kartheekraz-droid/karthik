export default function StatCard({
  label,
  value,
  tone = 'ink',
}: {
  label: string
  value: string
  tone?: 'ink' | 'saffron' | 'green' | 'red' | 'navy'
}) {
  const toneClass =
    tone === 'saffron'
      ? 'text-saffron-deep'
      : tone === 'green'
        ? 'text-green-deep'
        : tone === 'red'
          ? 'text-red'
          : tone === 'navy'
            ? 'text-navy'
            : 'text-ink'
  return (
    <div className="bg-white border border-line rounded-2xl p-4 shadow-card">
      <small className="text-muted text-xs font-bold tracking-wide uppercase">{label}</small>
      <strong className={`block text-[26px] mt-1.5 ${toneClass}`}>{value}</strong>
    </div>
  )
}

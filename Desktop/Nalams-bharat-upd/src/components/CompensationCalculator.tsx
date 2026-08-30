import { useMemo, useState } from 'react'

type AreaType = 'urban' | 'rural-near' | 'rural-remote'

const MULTIPLIERS: Record<AreaType, { label: string; factor: number; hint: string }> = {
  urban: { label: 'Urban area', factor: 1, hint: '1× market value' },
  'rural-near': { label: 'Rural — near urban', factor: 1.5, hint: '1.5× market value' },
  'rural-remote': { label: 'Rural — remote', factor: 2, hint: '2× market value' },
}

const inr = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 })
function formatINR(n: number) {
  if (!Number.isFinite(n)) return '₹0'
  return `₹${inr.format(Math.round(n))}`
}

function Field({
  label,
  hint,
  value,
  onChange,
  suffix,
}: {
  label: string
  hint?: string
  value: number
  onChange: (v: number) => void
  suffix?: string
}) {
  return (
    <div>
      <label className="block text-[13px] font-bold mt-3 mb-1">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={0}
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => onChange(e.target.value === '' ? 0 : Number(e.target.value))}
          className="w-full px-3 py-2.5 border border-line rounded-[10px] bg-paper"
        />
        {suffix && <span className="text-sm text-muted whitespace-nowrap">{suffix}</span>}
      </div>
      {hint && <p className="mb-0 mt-1 text-xs text-muted">{hint}</p>}
    </div>
  )
}

export interface CompensationCalculatorProps {
  /** Frames the copy — a landowner exploring their own case vs. an official cross-checking a figure. */
  variant?: 'citizen' | 'officer'
  /** One line explaining why this role would use the tool, shown under the title. */
  note?: string
  title?: string
  defaults?: Partial<{
    areaAcres: number
    ratePerAcre: number
    areaType: AreaType
    structureValue: number
    treesCropsValue: number
    otherAssetsValue: number
  }>
  className?: string
}

export default function CompensationCalculator({
  variant = 'citizen',
  note,
  title,
  defaults,
  className = '',
}: CompensationCalculatorProps) {
  const [areaAcres, setAreaAcres] = useState(defaults?.areaAcres ?? 2.5)
  const [ratePerAcre, setRatePerAcre] = useState(defaults?.ratePerAcre ?? 1500000)
  const [areaType, setAreaType] = useState<AreaType>(defaults?.areaType ?? 'rural-near')
  const [structureValue, setStructureValue] = useState(defaults?.structureValue ?? 0)
  const [treesCropsValue, setTreesCropsValue] = useState(defaults?.treesCropsValue ?? 0)
  const [otherAssetsValue, setOtherAssetsValue] = useState(defaults?.otherAssetsValue ?? 0)

  const result = useMemo(() => {
    const multiplier = MULTIPLIERS[areaType].factor
    const landValue = areaAcres * ratePerAcre * multiplier
    const assetsValue = structureValue + treesCropsValue + otherAssetsValue
    const subtotal = landValue + assetsValue
    const solatium = subtotal * 1.0 // 100%, mandatory under Section 30(1), LARR Act 2013
    const total = subtotal + solatium
    return { multiplier, landValue, assetsValue, subtotal, solatium, total }
  }, [areaAcres, ratePerAcre, areaType, structureValue, treesCropsValue, otherAssetsValue])

  const heading =
    title ?? (variant === 'citizen' ? 'Estimate your compensation' : 'Compensation verification tool')
  const defaultNote =
    variant === 'citizen'
      ? 'Enter your land details to see how compensation is calculated under the LARR Act, 2013 — the same formula the government uses.'
      : 'Cross-check a compensation figure on the spot using the same LARR Act, 2013 formula shown to the landowner.'

  return (
    <section className={`card ${className}`}>
      <div className="flex items-center gap-3 mb-1">
        <img src="/calculator-icon.svg" alt="" className="w-10 h-10 shrink-0" />
        <div>
          <h3 className="mb-0.5">{heading}</h3>
          <p className="mb-0 text-sm">{note ?? defaultNote}</p>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_1fr] gap-6 mt-4 max-[820px]:grid-cols-1">
        <div>
          <Field label="Land area" suffix="acres" value={areaAcres} onChange={setAreaAcres} />
          <Field label="Market / circle rate" suffix="₹ per acre" value={ratePerAcre} onChange={setRatePerAcre} />

          <label className="block text-[13px] font-bold mt-3 mb-1">Area type (LARR multiplier factor)</label>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(MULTIPLIERS) as AreaType[]).map((key) => (
              <label
                key={key}
                className={
                  'text-center border-2 rounded-[10px] px-1.5 py-2 cursor-pointer text-xs font-semibold ' +
                  (areaType === key ? 'border-navy text-navy' : 'border-line text-muted')
                }
              >
                <input
                  type="radio"
                  name={`areaType-${variant}-${heading}`}
                  className="hidden"
                  checked={areaType === key}
                  onChange={() => setAreaType(key)}
                />
                <span className="block">{MULTIPLIERS[key].label}</span>
                <span className="block font-normal mt-0.5 opacity-80">{MULTIPLIERS[key].hint}</span>
              </label>
            ))}
          </div>

          <Field label="Structure value" suffix="₹" value={structureValue} onChange={setStructureValue} />
          <Field label="Trees / standing crop value" suffix="₹" value={treesCropsValue} onChange={setTreesCropsValue} />
          <Field label="Other assets" suffix="₹" value={otherAssetsValue} onChange={setOtherAssetsValue} />
        </div>

        <div>
          <p className="text-sm mb-1">Estimated total compensation</p>
          <p className="text-[32px] font-bold text-ink mb-3">{formatINR(result.total)}</p>
          <table className="w-full border-collapse text-[14px]">
            <tbody>
              <tr>
                <td className="py-2 px-2 border-b border-[#ece8df]">
                  Land value — {areaAcres || 0} acres × {formatINR(ratePerAcre)} × {result.multiplier}×
                </td>
                <td className="py-2 px-2 border-b border-[#ece8df] text-right whitespace-nowrap">{formatINR(result.landValue)}</td>
              </tr>
              <tr>
                <td className="py-2 px-2 border-b border-[#ece8df]">Structures, trees/crops &amp; other assets</td>
                <td className="py-2 px-2 border-b border-[#ece8df] text-right whitespace-nowrap">{formatINR(result.assetsValue)}</td>
              </tr>
              <tr>
                <td className="py-2 px-2 border-b border-[#ece8df]">Solatium (100%) — mandatory under LARR Act 2013</td>
                <td className="py-2 px-2 border-b border-[#ece8df] text-right whitespace-nowrap">{formatINR(result.solatium)}</td>
              </tr>
              <tr>
                <td className="py-2 px-2 font-bold">Total compensation</td>
                <td className="py-2 px-2 text-right font-bold whitespace-nowrap">{formatINR(result.total)}</td>
              </tr>
            </tbody>
          </table>
          <p className="mb-0 mt-3 text-xs text-muted">
            Simplified estimate under the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and
            Resettlement Act, 2013. Final awards may include Rehabilitation &amp; Resettlement benefits assessed separately.
          </p>
        </div>
      </div>
    </section>
  )
}

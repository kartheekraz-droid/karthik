const GRADE_COLOR: Record<string, string> = {
  A: '#138808',
  B: '#c56a00',
  C: '#ff9933',
  D: '#9b1c1c',
}

export default function GradeBadge({ grade }: { grade: 'A' | 'B' | 'C' | 'D' }) {
  return (
    <span
      className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white font-bold text-sm"
      style={{ background: GRADE_COLOR[grade] }}
    >
      {grade}
    </span>
  )
}

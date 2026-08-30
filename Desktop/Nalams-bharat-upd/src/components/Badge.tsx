type Tone = 'green' | 'saffron' | 'navy' | 'red'

const TONE_CLASS: Record<Tone, string> = {
  green: 'tag-g',
  saffron: 'tag-s',
  navy: 'tag-n',
  red: 'tag-r',
}

export default function Badge({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return <span className={`tag ${TONE_CLASS[tone]}`}>{children}</span>
}

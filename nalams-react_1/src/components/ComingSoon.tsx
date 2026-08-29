import { Link } from 'react-router-dom'
import PortalShell, { type PortalNavItem } from './PortalShell'

export default function ComingSoon({
  portalLabel,
  portalHome,
  navItems,
  title,
  description,
}: {
  portalLabel: string
  portalHome: string
  navItems: PortalNavItem[]
  title: string
  description: string
}) {
  return (
    <PortalShell
      portalLabel={portalLabel}
      portalHome={portalHome}
      navItems={navItems}
      topbarLeft={<strong>{title}</strong>}
      topbarRight={<Link className="btn btn-line" to={portalHome}>← Dashboard</Link>}
    >
      <div className="card max-w-[560px]">
        <span className="tag tag-s mb-3 inline-block">Planned</span>
        <h2>{title}</h2>
        <p>{description}</p>
        <p className="text-sm">This screen is scoped in the spec but not wired up yet — plug in the Supabase query and drop the UI in here.</p>
      </div>
    </PortalShell>
  )
}

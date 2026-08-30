import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import PortalShell from '../../components/PortalShell'
import GradeBadge from '../../components/GradeBadge'
import { DISTRICT_PERFORMANCE } from '../../data/mockData'
import { useLanguage } from '../../context/LanguageContext'

const GRADE_COLOR: Record<string, string> = {
  A: '#138808',
  B: '#c56a00',
  C: '#ff9933',
  D: '#9b1c1c',
}

const DISTRICT_COORDS: Record<string, [number, number]> = {
  Pune: [18.5204, 73.8567],
  Nagpur: [21.1458, 79.0882],
  Nashik: [19.9975, 73.7898],
  Aurangabad: [19.8762, 75.3433],
}

export default function StateGis() {
  const { t } = useLanguage()
  const navigate = useNavigate()

  const NAV = [
    { label: t('state.nav.command'), to: '/state' },
    { label: t('state.nav.districts'), to: '/state/districts' },
    { label: t('state.nav.gis'), to: '/state/gis' },
    { label: t('state.nav.budget'), to: '/state/budget' },
  ]

  return (
    <PortalShell
      portalLabel={t('portal.state')}
      portalHome="/state"
      navItems={NAV}
      topbarLeft={<strong>{t('state.gis.topbarTitle')}</strong>}
    >
      <h1>{t('state.gis.title')}</h1>
      <p>{t('state.gis.desc')}</p>

      <div className="h-[500px] w-full rounded-2xl border border-line overflow-hidden">
        <MapContainer center={[19.6, 76.2]} zoom={7} className="h-full w-full">
          <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {DISTRICT_PERFORMANCE.map((d) => {
            const coords = DISTRICT_COORDS[d.district]
            if (!coords) return null
            const color = GRADE_COLOR[d.grade]
            return (
              <CircleMarker
                key={d.district}
                center={coords}
                radius={14}
                pathOptions={{ color, fillColor: color, fillOpacity: 0.85, weight: 2 }}
                eventHandlers={{ click: () => navigate('/collector') }}
              >
                <Popup>
                  <strong>{d.district}</strong>
                  <br />
                  {d.activeProjects} active projects · {d.disputeRate} dispute rate
                  <br />
                  Grade: {d.grade}
                </Popup>
              </CircleMarker>
            )
          })}
        </MapContainer>
      </div>

      <div className="card mt-3">
        <h3 className="mb-2">Grades</h3>
        <div className="flex flex-wrap gap-4 items-center text-sm font-semibold">
          {DISTRICT_PERFORMANCE.map((d) => (
            <span key={d.district} className="flex items-center gap-2">
              <GradeBadge grade={d.grade} /> {d.district}
            </span>
          ))}
        </div>
      </div>
    </PortalShell>
  )
}

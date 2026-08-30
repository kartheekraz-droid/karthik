import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import PortalShell from '../../components/PortalShell'
import GradeBadge from '../../components/GradeBadge'
import { STATE_PERFORMANCE } from '../../data/mockData'
import { useLanguage } from '../../context/LanguageContext'

const GRADE_COLOR: Record<string, string> = {
  A: '#138808',
  B: '#c56a00',
  C: '#ff9933',
  D: '#9b1c1c',
}

const STATE_COORDS: Record<string, [number, number]> = {
  Karnataka: [15.3173, 75.7139],
  'Andhra Pradesh': [15.9129, 79.74],
  Telangana: [18.1124, 79.0193],
  Maharashtra: [19.7515, 75.7139],
  'Uttar Pradesh': [26.8467, 80.9462],
  'West Bengal': [22.9868, 87.855],
  Bihar: [25.0961, 85.3131],
}

export default function CentralGis() {
  const { t } = useLanguage()
  const navigate = useNavigate()

  const NAV = [
    { label: t('central.nav.command'), to: '/central' },
    { label: t('central.nav.states'), to: '/central/states' },
    { label: t('central.nav.gis'), to: '/central/gis' },
    { label: t('central.nav.budget'), to: '/central/budget' },
    { label: t('central.nav.compliance'), to: '/central/compliance' },
    { label: t('central.nav.integration'), to: '/central/integration' },
  ]

  return (
    <PortalShell
      portalLabel={t('portal.central')}
      portalHome="/central"
      navItems={NAV}
      topbarLeft={<strong>{t('central.gis.topbarTitle')}</strong>}
    >
      <h1>{t('central.gis.title')}</h1>
      <p>{t('central.gis.desc')}</p>

      <div className="h-[520px] w-full rounded-2xl border border-line overflow-hidden">
        <MapContainer center={[22.5, 80]} zoom={5} className="h-full w-full">
          <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {STATE_PERFORMANCE.map((s) => {
            const coords = STATE_COORDS[s.state]
            if (!coords) return null
            const color = GRADE_COLOR[s.grade]
            return (
              <CircleMarker
                key={s.state}
                center={coords}
                radius={14}
                pathOptions={{ color, fillColor: color, fillOpacity: 0.85, weight: 2 }}
                eventHandlers={{ click: () => navigate('/state') }}
              >
                <Popup>
                  <strong>{s.state}</strong>
                  <br />
                  {s.activeProjects} active projects · {s.disputeRate} dispute rate
                  <br />
                  Grade: {s.grade}
                </Popup>
              </CircleMarker>
            )
          })}
        </MapContainer>
      </div>

      <div className="card mt-3">
        <h3 className="mb-2">Grades</h3>
        <div className="flex flex-wrap gap-4 items-center text-sm font-semibold">
          {STATE_PERFORMANCE.map((s) => (
            <span key={s.state} className="flex items-center gap-2">
              <GradeBadge grade={s.grade} /> {s.state}
            </span>
          ))}
        </div>
      </div>
    </PortalShell>
  )
}

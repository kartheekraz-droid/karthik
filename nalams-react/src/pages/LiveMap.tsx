import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import FlagBar from '../components/FlagBar'
import AppShell from '../components/AppShell'
import { useLanguage } from '../context/LanguageContext'

const MARKERS: [number, number, string, string][] = [
  [18.531, 73.844, '#000080', 'Gat 41 · Surveyed'],
  [18.512, 73.87, '#FF9933', 'Gat 112 · Objection'],
  [18.498, 73.85, '#138808', 'Gat 77 · Possession'],
  [18.54, 73.88, '#9B1C1C', 'Gat 88 · Forest SLA'],
]

export default function LiveMap() {
  const { t } = useLanguage()
  return (
    <>
      <FlagBar />
      <AppShell
        topbarLeft={<strong>{t('map.corridor')}</strong>}
        topbarRight={
          <Link className="btn btn-navy" to="/parcel">{t('map.openSelected')}</Link>
        }
      >
        <h1>{t('map.title')}</h1>
        <p>{t('map.desc')}</p>

        <div className="h-[460px] w-full rounded-2xl border border-line overflow-hidden">
          <MapContainer center={[18.5204, 73.8567]} zoom={12} className="h-full w-full">
            <TileLayer
              attribution="&copy; OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {MARKERS.map(([lat, lng, color, title]) => (
              <CircleMarker
                key={title}
                center={[lat, lng]}
                radius={12}
                pathOptions={{ color, fillColor: color, fillOpacity: 0.9, weight: 2 }}
              >
                <Popup>{title}</Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        <div className="flex flex-wrap gap-3.5 mt-3 text-sm font-semibold">
          <span><i className="inline-block w-2.5 h-2.5 rounded-full mr-1.5" style={{ background: '#000080' }} />{t('map.legend.identified')}</span>
          <span><i className="inline-block w-2.5 h-2.5 rounded-full mr-1.5" style={{ background: '#FF9933' }} />{t('map.legend.notified')}</span>
          <span><i className="inline-block w-2.5 h-2.5 rounded-full mr-1.5" style={{ background: '#138808' }} />{t('map.legend.awarded')}</span>
          <span><i className="inline-block w-2.5 h-2.5 rounded-full mr-1.5" style={{ background: '#9B1C1C' }} />{t('map.legend.sla')}</span>
        </div>
      </AppShell>
    </>
  )
}

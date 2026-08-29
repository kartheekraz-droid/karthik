import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import PortalShell from '../../components/PortalShell'

const NAV = [
  { label: 'Command Center', to: '/collector' },
  { label: 'GIS Acquisition Map', to: '/collector/map' },
  { label: 'Pending Approvals', to: '/collector/approvals' },
  { label: 'Budget Tracker', to: '/collector/budget' },
  { label: 'Alerts & Disputes', to: '/collector/alerts' },
  { label: 'District Analytics', to: '/collector/analytics' },
]

const MARKERS: [number, number, string, string][] = [
  [18.531, 73.844, '#000080', 'Gat 41 · Surveyed'],
  [18.512, 73.87, '#FF9933', 'Gat 112 · Objection'],
  [18.498, 73.85, '#138808', 'Gat 77 · Possession'],
  [18.54, 73.88, '#9B1C1C', 'Gat 88 · Forest SLA'],
]

export default function CollectorMap() {
  return (
    <PortalShell
      portalLabel="District / Collector"
      portalHome="/collector"
      navItems={NAV}
      topbarLeft={<strong>GIS · NH-48 corridor</strong>}
      topbarRight={<Link className="btn btn-navy" to="/collector/parcel">Open selected parcel</Link>}
    >
      <h1>GIS acquisition map — the war room</h1>
      <p>Every parcel is a colour-coded polygon. Click a marker to open its file.</p>

      <div className="h-[460px] w-full rounded-2xl border border-line overflow-hidden">
        <MapContainer center={[18.5204, 73.8567]} zoom={12} className="h-full w-full">
          <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {MARKERS.map(([lat, lng, color, title]) => (
            <CircleMarker key={title} center={[lat, lng]} radius={12} pathOptions={{ color, fillColor: color, fillOpacity: 0.9, weight: 2 }}>
              <Popup>{title}</Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      <div className="flex flex-wrap gap-3.5 mt-3 text-sm font-semibold">
        <span><i className="inline-block w-2.5 h-2.5 rounded-full mr-1.5" style={{ background: '#138808' }} />Cleared</span>
        <span><i className="inline-block w-2.5 h-2.5 rounded-full mr-1.5" style={{ background: '#FFCC33' }} />Under survey</span>
        <span><i className="inline-block w-2.5 h-2.5 rounded-full mr-1.5" style={{ background: '#FF9933' }} />Awaiting award</span>
        <span><i className="inline-block w-2.5 h-2.5 rounded-full mr-1.5" style={{ background: '#9B1C1C' }} />Disputed / delayed</span>
      </div>
    </PortalShell>
  )
}

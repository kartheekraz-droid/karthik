import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import PortalShell from '../../components/PortalShell'

const NAV = [
  { label: 'Verification Queue', to: '/field' },
  { label: 'Field Inspection', to: '/field/inspection' },
  { label: 'Boundary Map', to: '/field/map' },
]

const RECORDED_BOUNDARY: [number, number][] = [
  [18.5115, 73.869],
  [18.5125, 73.8705],
  [18.5118, 73.8715],
  [18.511, 73.8698],
]

export default function FieldMap() {
  return (
    <PortalShell
      portalLabel="Field Officer"
      portalHome="/field"
      navItems={NAV}
      topbarLeft={<strong>Boundary Adjuster — Gat 112</strong>}
    >
      <h1>Live map &amp; polygon boundary</h1>
      <p>Recorded cadastral boundary shown below. Drawing/editing on-site boundaries (Leaflet.draw) is next on the build list.</p>

      <div className="h-[440px] w-full rounded-2xl border border-line overflow-hidden">
        <MapContainer center={[18.512, 73.87]} zoom={17} className="h-full w-full">
          <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Polygon positions={RECORDED_BOUNDARY} pathOptions={{ color: '#000080', fillColor: '#000080', fillOpacity: 0.25 }}>
            <Popup>Gat 112 · recorded cadastral boundary</Popup>
          </Polygon>
        </MapContainer>
      </div>

      <div className="card mt-3">
        <span className="tag tag-s mb-2 inline-block">Planned</span>
        <p className="mb-0">
          Wire up <code>leaflet-draw</code> here so the officer can adjust vertices on-site when the physical
          markers differ from the recorded dimensions, then save the corrected polygon back to the{' '}
          <code>parcels</code> table.
        </p>
      </div>
    </PortalShell>
  )
}

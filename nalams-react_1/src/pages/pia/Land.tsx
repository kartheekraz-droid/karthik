import { useState, type FormEvent } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import PortalShell from '../../components/PortalShell'

const NAV = [
  { label: 'Dashboard', to: '/pia' },
  { label: 'Projects', to: '/pia/projects' },
  { label: 'Land Identification', to: '/pia/land' },
  { label: 'Landowners', to: '/pia/landowners' },
  { label: 'Documents', to: '/pia/documents' },
  { label: 'Grievances', to: '/pia/grievances' },
]

export default function PiaLand() {
  const [query, setQuery] = useState('')

  function handleSearch(e: FormEvent) {
    e.preventDefault()
    // TODO: supabase.from('parcels').select('*').ilike('survey_no', `%${query}%`)
  }

  return (
    <PortalShell
      portalLabel="Project Implementing Agency"
      portalHome="/pia"
      navItems={NAV}
      topbarLeft={<strong>Land Identification</strong>}
    >
      <h1>Find and select land for a project</h1>
      <p>Search by survey number, then mark the parcels required for the project on the map.</p>

      <form onSubmit={handleSearch} className="card mb-4 flex gap-2.5">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search survey number / village"
          className="flex-1 min-w-0 px-3 py-3 border border-line rounded-[10px] bg-paper"
        />
        <button type="submit" className="btn btn-navy">Search</button>
      </form>

      <div className="h-[420px] w-full rounded-2xl border border-line overflow-hidden">
        <MapContainer center={[18.5204, 73.8567]} zoom={12} className="h-full w-full">
          <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[18.512, 73.87]}>
            <Popup>Gat 112 · available for selection</Popup>
          </Marker>
        </MapContainer>
      </div>
    </PortalShell>
  )
}

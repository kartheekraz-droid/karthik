import { useRef, useState, type FormEvent } from 'react'
import PortalShell from '../../components/PortalShell'

const NAV = [
  { label: 'Verification Queue', to: '/field' },
  { label: 'Field Inspection', to: '/field/inspection' },
  { label: 'Boundary Map', to: '/field/map' },
]

export default function FieldInspection() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [locError, setLocError] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)

  function fetchLocation() {
    if (!navigator.geolocation) {
      setLocError('Geolocation is not supported on this device.')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setLocError(null)
      },
      () => setLocError('Could not fetch location. Check permissions.'),
    )
  }

  function startDraw(e: React.MouseEvent<HTMLCanvasElement>) {
    drawing.current = true
    const ctx = canvasRef.current?.getContext('2d')
    ctx?.beginPath()
    ctx?.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
  }
  function draw(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!drawing.current) return
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    ctx.strokeStyle = '#000080'
    ctx.lineWidth = 2
    ctx.stroke()
  }
  function endDraw() {
    drawing.current = false
  }
  function clearSignature() {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // TODO: upload photo(s) + coords + signature to Supabase storage / `documents` table,
    // then generate the PDF "Field Verification Report".
  }

  return (
    <PortalShell
      portalLabel="Field Officer"
      portalHome="/field"
      navItems={NAV}
      topbarLeft={<strong>Geo-Tagged Field Inspection — Gat 112</strong>}
    >
      <h1>On-site inspection</h1>
      <p>Capture your GPS position, ground photos, legal case notes, and your sign-off — all in one form.</p>

      <form onSubmit={handleSubmit} className="grid grid-cols-[1.1fr_0.9fr] gap-3.5 max-[900px]:grid-cols-1">
        <section className="card">
          <h3>GPS location verification</h3>
          <p>Confirms you are physically on the parcel before your decision is accepted.</p>
          <button type="button" onClick={fetchLocation} className="btn btn-navy">Fetch my location</button>
          {coords && (
            <p className="mt-2 text-sm">
              Lat {coords.lat.toFixed(5)}, Lng {coords.lng.toFixed(5)} — <span className="text-green-deep font-semibold">captured</span>
            </p>
          )}
          {locError && <p className="mt-2 text-sm text-red">{locError}</p>}

          <h3 className="mt-5">On-site photo upload</h3>
          <label className="block border-2 border-dashed border-line rounded-xl p-6 text-center text-muted text-sm cursor-pointer">
            Drop photos here or click to capture from camera
            <input type="file" accept="image/*" capture="environment" multiple className="hidden" />
          </label>

          <h3 className="mt-5">Legal case &amp; encumbrance</h3>
          <label className="flex items-center gap-2 text-sm mb-2">
            <input type="checkbox" /> Flag active court case / stay order
          </label>
          <textarea
            placeholder="Case number / dispute notes"
            className="w-full px-3 py-2.5 border border-line rounded-[10px] bg-paper text-sm"
            rows={3}
          />
          <div className="flex gap-2 mt-2 flex-wrap">
            <span className="tag tag-g">Clear title</span>
            <span className="tag tag-s">Mortgage active</span>
            <span className="tag tag-r">Tax dues pending</span>
          </div>
        </section>

        <section className="card">
          <h3>Digital sign-off</h3>
          <p>Draw your verification signature below.</p>
          <canvas
            ref={canvasRef}
            width={340}
            height={140}
            className="border border-line rounded-xl bg-white w-full touch-none"
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
          />
          <button type="button" onClick={clearSignature} className="btn btn-line mt-2 !py-1.5 !px-3 text-xs">Clear</button>

          <div className="mt-5">
            <button type="submit" className="btn btn-navy w-full">Generate inspection certificate (PDF)</button>
            <p className="text-xs text-muted mt-2">
              Bundles the map snapshot, GPS coordinates, legal status, and signature into a downloadable
              Field Verification Report.
            </p>
          </div>
        </section>
      </form>
    </PortalShell>
  )
}

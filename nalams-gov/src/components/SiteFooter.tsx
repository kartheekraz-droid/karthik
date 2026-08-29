export default function SiteFooter({ note = 'Hackathon prototype · not an official Government of India website' }: { note?: string }) {
  return (
    <footer className="bg-navy-2 text-[#c9d2ff] py-7 text-sm">
      <div className="wrap flex justify-between gap-3 flex-wrap">
        <span>
          <strong className="text-white">NALAMS</strong> · Real-Time National Land Acquisition &amp;
          Management System
        </span>
        <span>{note}</span>
      </div>
    </footer>
  )
}

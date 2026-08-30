export default function PageLoader({ hide }: { hide: boolean }) {
  return (
    <div
      aria-hidden={hide}
      className={
        'fixed inset-0 z-[999] flex flex-col items-center justify-center gap-4 bg-paper ' +
        (hide ? 'loader-hide pointer-events-none' : '')
      }
    >
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-line" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-saffron border-r-green chakra-spin" />
        <img src="/chakra.svg" alt="" className="absolute inset-0 m-auto w-8 h-8 opacity-80" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <strong className="text-ink font-serif tracking-[0.04em]">NALAMS</strong>
        <span className="grid grid-cols-3 w-16 h-1.5 rounded-full overflow-hidden">
          <i className="bg-saffron not-italic" />
          <i className="bg-white not-italic" />
          <i className="bg-green not-italic" />
        </span>
        <small className="text-muted text-[11px] tracking-[0.12em] uppercase mt-1">Loading records…</small>
      </div>
    </div>
  )
}

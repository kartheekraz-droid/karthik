import { createElement, useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Wraps children in a div (or another tag) that fades/slides into view the
 * first time it scrolls into the viewport. Purely additive (no layout
 * change) — it only adds opacity/transform via CSS classes in index.css.
 */
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  className = '',
}: {
  children: ReactNode
  as?: string
  delay?: 0 | 1 | 2 | 3 | 4 | 5
  className?: string
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const delayClass = delay ? `reveal-delay-${delay}` : ''

  return createElement(
    as,
    { ref, className: `reveal ${delayClass} ${visible ? 'is-visible' : ''} ${className}`.trim() },
    children,
  )
}

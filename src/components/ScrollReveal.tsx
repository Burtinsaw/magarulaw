'use client'

import { useEffect, useRef, type ReactNode } from 'react'

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return // stays visible (default)

    // Hide element, then animate in when scrolled into view
    el.classList.add('pending')

    const show = () => {
      el.classList.remove('pending')
      el.classList.add('visible')
    }

    // If already near viewport, show immediately
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 1.3) {
      requestAnimationFrame(show)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show()
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '100px 0px 0px 0px', threshold: 0.01 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  )
}

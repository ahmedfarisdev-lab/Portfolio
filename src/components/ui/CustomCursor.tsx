'use client'
import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dot  = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mx = 0, my = 0, fx = 0, fy = 0
    let raf: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (dot.current) { dot.current.style.left = mx + 'px'; dot.current.style.top = my + 'px' }
    }
    const tick = () => {
      fx += (mx - fx) * 0.13; fy += (my - fy) * 0.13
      if (ring.current) { ring.current.style.left = fx + 'px'; ring.current.style.top = fy + 'px' }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onEnter = () => { dot.current?.classList.add('big'); ring.current?.classList.add('big') }
    const onLeave = () => { dot.current?.classList.remove('big'); ring.current?.classList.remove('big') }

    document.addEventListener('mousemove', onMove)
    const els = document.querySelectorAll('a, button, [role="button"]')
    els.forEach(el => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave) })

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <>
      <div ref={dot}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
    </>
  )
}

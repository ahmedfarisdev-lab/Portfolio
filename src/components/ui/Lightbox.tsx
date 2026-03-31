'use client'
import { useEffect, useState, useCallback } from 'react'
import NextImage from 'next/image'
import type { WorkItem } from '@/types'
import { useLang } from '@/hooks/useLang'

const CAT: Record<string, { color: string; en: string; ar: string }> = {
  brand: { color: '#e8c547', en: 'Brand Identity', ar: 'هوية بصرية' },
  poster: { color: '#ff6b35', en: 'Social Post', ar: 'بوست' },
  logo: { color: '#4fc3f7', en: 'Logo Design', ar: 'تصميم شعار' },
  print: { color: '#34d399', en: 'Print Design', ar: 'مطبوعات' },
}

function LbArt({ item }: { item: WorkItem }) {
  const c = item.color
  const p = item.id % 6
  const shared = { className: "absolute inset-0 w-full h-full", preserveAspectRatio: "xMidYMid slice" as const }
  if (p === 0) return <svg viewBox="0 0 400 400" {...shared}><circle cx="200" cy="200" r="140" fill="none" stroke={c} strokeWidth=".5" opacity=".2" /><circle cx="200" cy="200" r="90" fill="none" stroke={c} strokeWidth=".4" opacity=".14" /><circle cx="200" cy="200" r="40" fill={c} opacity=".06" /></svg>
  if (p === 1) return <svg viewBox="0 0 400 400" {...shared}><rect x="60" y="60" width="280" height="280" fill="none" stroke={c} strokeWidth=".7" opacity=".18" transform="rotate(10,200,200)" /><rect x="100" y="100" width="200" height="200" fill={c} opacity=".04" /></svg>
  if (p === 2) return <svg viewBox="0 0 400 400" {...shared}><polygon points="200,40 360,320 40,320" fill="none" stroke={c} strokeWidth=".8" opacity=".22" /></svg>
  if (p === 3) return <svg viewBox="0 0 400 400" {...shared}><circle cx="200" cy="200" r="100" fill="none" stroke={c} strokeWidth=".6" opacity=".2" /></svg>
  if (p === 4) return <svg viewBox="0 0 400 400" {...shared}><path d="M200,50 Q310,100 350,200 Q310,300 200,350 Q90,300 50,200 Q90,100 200,50Z" fill="none" stroke={c} strokeWidth=".7" opacity=".22" /></svg>
  return <svg viewBox="0 0 400 400" {...shared}><circle cx="200" cy="200" r="160" fill="none" stroke={c} strokeWidth=".4" opacity=".12" strokeDasharray="8,5" /><circle cx="200" cy="200" r="60" fill="none" stroke={c} strokeWidth=".6" opacity=".18" /></svg>
}

interface Props {
  item: WorkItem | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function Lightbox({ item, onClose, onPrev, onNext }: Props) {
  const { lang, isAR, tr } = useLang()
  const [activeImg, setActiveImg] = useState(0)

  // ── كل الـ hooks أولاً بدون استثناء ──────────────────────────

  useEffect(() => {
    setActiveImg(0)
  }, [item?.id])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!item) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [item, onClose, onPrev, onNext])

  useEffect(() => {
    document.body.style.overflow = item ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [item])

  const cat = item ? (CAT[item.category] ?? CAT.brand) : CAT.brand
  const isBrand = item?.category === 'brand'
  const images = isBrand && item?.images?.length
    ? item.images
    : item?.image ? [item.image] : []
  const hasMulti = images.length > 1

  const prevImg = useCallback(() =>
    setActiveImg(i => (i - 1 + images.length) % images.length),
    [images.length])

  const nextImg = useCallback(() =>
    setActiveImg(i => (i + 1) % images.length),
    [images.length])

  // ── الآن يمكن الـ early return ───────────────────────────────
  if (!item) return null

  // ════════════════════════════════════════════════════════════
  // BRAND — fullscreen
  // ════════════════════════════════════════════════════════════
  if (isBrand) {
    return (
      <div
        className="fixed inset-0 z-[9000] flex flex-col"
        style={{ background: '#060606' }}
      >
        {/* Top Bar */}
        <div
          className="flex-shrink-0 flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 border-b border-border"
          style={{ background: 'rgba(6,6,6,.95)', backdropFilter: 'blur(12px)' }}
        >
          <div className={`flex items-center gap-3 sm:gap-4 min-w-0 ${isAR ? 'flex-row-reverse' : ''}`}>
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-accent" />
            <div className="min-w-0">
              <div className="font-mono text-[7px] sm:text-[8px] tracking-[3px] uppercase text-accent mb-0.5">
                {lang === 'ar' ? cat.ar : cat.en} · {item.year}
              </div>
              <h2
                className="font-display leading-none text-text-primary truncate"
                style={{ fontSize: 'clamp(14px,3vw,24px)', letterSpacing: '2px' }}
              >
                {lang === 'ar' ? item.titleAr : item.titleEn}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
            {hasMulti && (
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[2px] text-muted">
                {String(activeImg + 1).padStart(2, '0')}
                <span className="text-border mx-1">/</span>
                {String(images.length).padStart(2, '0')}
              </span>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-9 sm:h-9 border border-border flex items-center justify-center text-muted hover:border-accent hover:text-accent transition-colors cursor-pointer clip-chamfer-sm text-sm"
            >✕</button>
          </div>
        </div>

        {/* الصورة الرئيسية */}
        <div
          className="flex-1 relative overflow-hidden flex items-center justify-center"
          style={{ background: '#040404' }}
        >
          {images.length > 0 ? (
            <div key={activeImg} className="relative w-full h-full" style={{ animation: 'fadeImg .3s ease forwards' }}>
              <NextImage
                src={images[activeImg]}
                alt={item.titleEn || 'Work'}
                fill
                sizes="100vw"
                className="object-contain"
                priority={activeImg === 0}
              />
            </div>
          ) : (
            <div className={`absolute inset-0 ${item.bgClass}`}>
              <LbArt item={item} />
            </div>
          )}

          {/* أزرار التنقل بين الصور */}
          {hasMulti && (
            <>
              <button
                onClick={prevImg}
                className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 border border-border bg-bg/70 flex items-center justify-center text-muted hover:border-accent hover:text-accent transition-all cursor-pointer clip-chamfer-sm backdrop-blur-sm text-sm"
              >←</button>
              <button
                onClick={nextImg}
                className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 border border-border bg-bg/70 flex items-center justify-center text-muted hover:border-accent hover:text-accent transition-all cursor-pointer clip-chamfer-sm backdrop-blur-sm text-sm"
              >→</button>
            </>
          )}

          {/* Dots */}
          {hasMulti && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`transition-all cursor-pointer rounded-full ${i === activeImg
                      ? 'w-5 h-1.5 bg-accent'
                      : 'w-1.5 h-1.5 bg-muted/50 hover:bg-muted'
                    }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info + Thumbnails */}
        <div
          className="flex-shrink-0 border-t border-border"
          style={{ background: 'rgba(6,6,6,.97)' }}
        >
          {/* Thumbnails */}
          {hasMulti && (
            <div className="flex gap-1.5 sm:gap-2 px-4 sm:px-6 pt-3 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`flex-shrink-0 overflow-hidden border-2 transition-all cursor-pointer clip-chamfer-sm ${i === activeImg
                      ? 'border-accent opacity-100'
                      : 'border-border opacity-40 hover:opacity-70 hover:border-muted'
                    }`}
                  style={{ width: 'clamp(44px,8vw,64px)', height: 'clamp(44px,8vw,64px)' }}
                >
                  <div className="relative w-full h-full">
                    <NextImage src={img} alt="" fill sizes="80px" className="object-cover" loading="lazy" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Description + Tags + Nav */}
          <div className={`px-4 sm:px-8 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3 ${isAR ? 'text-right' : ''}`}>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] sm:text-[12px] text-accent2 italic mb-1">
                {lang === 'ar' ? item.clientAr : item.clientEn}
              </div>
              <p className="text-[11px] sm:text-[12px] text-muted leading-[1.7] line-clamp-2 sm:line-clamp-none max-w-[600px]">
                {lang === 'ar' ? item.descAr : item.descEn}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {item.tags.map(tag => (
                  <span
                    key={tag}
                    className="font-mono text-[7px] sm:text-[8px] tracking-[2px] uppercase text-muted border border-border px-2 py-1"
                  >{tag}</span>
                ))}
              </div>
            </div>

            {/* Prev / Next بين البراندات */}
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={onPrev}
                className="border border-border px-4 py-2 font-mono text-[8px] tracking-[2px] uppercase text-muted hover:border-accent hover:text-accent transition-colors cursor-pointer clip-chamfer-sm whitespace-nowrap"
              >← {tr('Prev', 'السابق')}</button>
              <button
                onClick={onNext}
                className="border border-border px-4 py-2 font-mono text-[8px] tracking-[2px] uppercase text-muted hover:border-accent hover:text-accent transition-colors cursor-pointer clip-chamfer-sm whitespace-nowrap"
              >{tr('Next', 'التالي')} →</button>
            </div>
          </div>
        </div>

        <style jsx global>{`
          @keyframes fadeImg {
            from { opacity:0; transform:scale(1.02) }
            to   { opacity:1; transform:scale(1) }
          }
        `}</style>
      </div>
    )
  }

  // ════════════════════════════════════════════════════════════
  // POSTER / PRINT — Lightbox عادي
  // ════════════════════════════════════════════════════════════
  return (
    <div
      className="fixed inset-0 z-[9000] flex items-center justify-center p-3 sm:p-5"
      style={{ background: 'rgba(4,4,4,.96)', backdropFilter: 'blur(12px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-[860px] max-h-[90vh] flex flex-col sm:flex-row overflow-hidden border border-border clip-chamfer-lg">

        {/* Visual */}
        <div
          className={`relative overflow-hidden flex-shrink-0 sm:flex-[0_0_54%] ${item.bgClass}`}
          style={{ minHeight: '220px' }}
        >
          {item.image ? (
            <NextImage
              src={item.image}
              alt={item.titleEn || 'Work'}
              fill
              sizes="(max-width: 640px) 100vw, 54vw"
              className="object-cover"
              priority
            />
          ) : (
            <LbArt item={item} />
          )}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(135deg,rgba(6,6,6,.25) 0%,transparent 60%)' }}
          />
        </div>

        {/* Info */}
        <div className={`flex-1 bg-bg2 flex flex-col overflow-y-auto relative p-5 sm:p-8 ${isAR ? 'text-right' : ''}`}>
          <button
            onClick={onClose}
            className={`absolute top-3 ${isAR ? 'left-3' : 'right-3'} w-8 h-8 bg-bg3 border border-border flex items-center justify-center text-muted hover:border-accent hover:text-accent transition-colors cursor-pointer clip-chamfer-sm text-sm`}
          >✕</button>

          <div className={`flex items-center gap-2 mb-3 ${isAR ? 'flex-row-reverse' : ''}`}>
            <span className="w-[6px] h-[6px] rounded-full flex-shrink-0" style={{ background: cat.color }} />
            <span
              className="font-mono text-[7px] sm:text-[8px] tracking-[4px] uppercase"
              style={{ color: cat.color }}
            >
              {lang === 'ar' ? cat.ar : cat.en}
            </span>
          </div>

          <h2
            className="font-display tracking-[2px] text-text-primary leading-none mb-2"
            style={{ fontSize: 'clamp(20px,3.5vw,40px)' }}
          >
            {lang === 'ar' ? item.titleAr : item.titleEn}
          </h2>

          <p className="text-[11px] sm:text-[12px] text-accent2 italic mb-4">
            {lang === 'ar' ? item.clientAr : item.clientEn}
          </p>

          <div className="h-px bg-border mb-4" />

          <p className="text-[12px] sm:text-[13px] text-muted leading-[1.85] mb-5">
            {lang === 'ar' ? item.descAr : item.descEn}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {item.tags.map(tag => (
              <span
                key={tag}
                className="font-mono text-[7px] sm:text-[8px] tracking-[2px] uppercase text-muted border border-border px-2 py-1"
              >{tag}</span>
            ))}
          </div>

          <div className="font-mono text-[8px] tracking-[2px] text-muted2 uppercase mt-auto pt-4 border-t border-border">
            {tr('Year:', 'السنة:')} {item.year}
          </div>

          <div className="flex gap-2 mt-3">
            <button
              onClick={onPrev}
              className="flex-1 border border-border py-2 font-mono text-[8px] tracking-[2px] uppercase text-muted hover:border-accent hover:text-accent transition-colors cursor-pointer flex items-center justify-center gap-1"
            >← {tr('Prev', 'السابق')}</button>
            <button
              onClick={onNext}
              className="flex-1 border border-border py-2 font-mono text-[8px] tracking-[2px] uppercase text-muted hover:border-accent hover:text-accent transition-colors cursor-pointer flex items-center justify-center gap-1"
            >{tr('Next', 'التالي')} →</button>
          </div>
        </div>
      </div>
    </div>
  )
}
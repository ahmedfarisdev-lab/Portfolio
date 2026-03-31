'use client'
import NextImage from 'next/image'
import { useLang } from '@/hooks/useLang'
import type { WorkItem } from '@/types'

const CAT: Record<string, { color: string; dot: string; en: string; ar: string }> = {
  brand: { color: '#e8c547', dot: '#e8c547', en: 'Brand Identity', ar: 'هوية بصرية' },
  poster: { color: '#ff6b35', dot: '#ff6b35', en: 'Social Post', ar: 'بوست' },
  print: { color: '#34d399', dot: '#34d399', en: 'Print Design', ar: 'مطبوعات' },
}

function ArtSVG({ item, index }: { item: WorkItem; index: number }) {
  const c = item.color
  const p = index % 8
  const shared = { className: "absolute inset-0 w-full h-full", preserveAspectRatio: "xMidYMid slice" as const }
  if (p === 0) return <svg viewBox="0 0 400 400" {...shared}><circle cx="200" cy="200" r="120" fill="none" stroke={c} strokeWidth=".6" opacity=".22" /><circle cx="200" cy="200" r="70" fill="none" stroke={c} strokeWidth=".4" opacity=".14" /><circle cx="200" cy="200" r="28" fill={c} opacity=".07" /></svg>
  if (p === 1) return <svg viewBox="0 0 400 400" {...shared}><rect x="80" y="80" width="240" height="240" fill="none" stroke={c} strokeWidth=".7" opacity=".2" transform="rotate(15,200,200)" /><rect x="110" y="110" width="180" height="180" fill="none" stroke={c} strokeWidth=".5" opacity=".14" transform="rotate(30,200,200)" /><rect x="140" y="140" width="120" height="120" fill={c} opacity=".04" /></svg>
  if (p === 2) return <svg viewBox="0 0 400 400" {...shared}><polygon points="200,50 350,300 50,300" fill="none" stroke={c} strokeWidth=".8" opacity=".22" /><polygon points="200,100 300,280 100,280" fill="none" stroke={c} strokeWidth=".5" opacity=".14" /><circle cx="200" cy="220" r="40" fill="none" stroke={c} strokeWidth=".5" opacity=".18" /></svg>
  if (p === 3) return <svg viewBox="0 0 400 400" {...shared}><line x1="0" y1="0" x2="400" y2="400" stroke={c} strokeWidth=".4" opacity=".1" /><line x1="400" y1="0" x2="0" y2="400" stroke={c} strokeWidth=".4" opacity=".1" /><circle cx="200" cy="200" r="80" fill="none" stroke={c} strokeWidth=".6" opacity=".2" /></svg>
  if (p === 4) return <svg viewBox="0 0 400 500" {...shared}><rect x="130" y="60" width="140" height="220" rx="14" fill="none" stroke={c} strokeWidth=".8" opacity=".28" /><rect x="168" y="296" width="64" height="8" rx="3" fill={c} opacity=".18" /></svg>
  if (p === 5) return <svg viewBox="0 0 400 400" {...shared}><circle cx="130" cy="200" r="100" fill="none" stroke={c} strokeWidth=".6" opacity=".18" /><circle cx="270" cy="200" r="100" fill="none" stroke={c} strokeWidth=".6" opacity=".18" /><circle cx="200" cy="200" r="60" fill={c} opacity=".04" /></svg>
  if (p === 6) return <svg viewBox="0 0 400 400" {...shared}><path d="M200,60 Q300,100 340,200 Q300,300 200,340 Q100,300 60,200 Q100,100 200,60Z" fill="none" stroke={c} strokeWidth=".7" opacity=".22" /><path d="M200,100 Q270,130 290,200 Q270,270 200,300 Q130,270 110,200 Q130,130 200,100Z" fill={c} opacity=".04" /></svg>
  return <svg viewBox="0 0 400 400" {...shared}><circle cx="200" cy="200" r="150" fill="none" stroke={c} strokeWidth=".4" opacity=".12" strokeDasharray="8,5" /><circle cx="200" cy="200" r="100" fill="none" stroke={c} strokeWidth=".4" opacity=".1" /><circle cx="200" cy="200" r="50" fill="none" stroke={c} strokeWidth=".6" opacity=".18" /><circle cx="200" cy="200" r="16" fill={c} opacity=".1" /></svg>
}

interface Props { item: WorkItem; index: number; onClick: (item: WorkItem) => void; delay?: number }

export function WorkCard({ item, index, onClick, delay = 0 }: Props) {
  const { lang, isAR } = useLang()
  const cat = CAT[item.category] ?? CAT.brand
  const isBrand = item.category === 'brand'

  return (
    <div
      className={`work-card group${isBrand ? ' brand-full' : ''}${item.wide && !isBrand ? ' wide' : ''}`}
      data-cat={item.category}
      style={{ animationDelay: `${delay}s` }}
      onClick={() => onClick(item)}
    >

      {/* الخلفية والصورة */}
      <div className={`w-full h-full relative overflow-hidden transition-transform duration-[600ms] group-hover:scale-[1.02] ${item.bgClass}`}>
        {item.image ? (
          <NextImage
            src={item.image}
            alt={item.titleEn || 'Work'}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            loading="lazy"
          />
        ) : (
          <ArtSVG item={item} index={index} />
        )}

        {/* تدرج فوق الصورة */}
        <div className="absolute inset-0"
          style={{
            background: isBrand
              ? 'linear-gradient(to right, rgba(6,6,6,.85) 0%, rgba(6,6,6,.2) 50%, transparent 100%)'
              : 'linear-gradient(to top, rgba(6,6,6,.7) 0%, transparent 60%)'
          }}
        />

        {/* رقم الكارد */}
        <span className={`absolute bottom-4 ${isAR ? 'left-6' : 'right-6'} font-display text-[80px] text-white/[.04] leading-none select-none pointer-events-none`}>
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Overlay للـ poster:
          - على الشاشات الكبيرة: يظهر عند hover فقط (opacity-0 → opacity-100)
          - على الموبايل (md:): يظهر دائماً عبر CSS في globals.css */}
      {!isBrand && (
        <div
          className="poster-overlay absolute inset-0 opacity-0 md:opacity-0 group-hover:opacity-100 transition-opacity duration-[380ms]"
          style={{ background: 'linear-gradient(to top,rgba(6,6,6,.95) 0%,rgba(6,6,6,.4) 50%,transparent 100%)' }}
        >
          <div className={`absolute bottom-0 ${isAR ? 'right-0' : 'left-0'} p-5`}>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: cat.dot }} />
              <span className="font-mono text-[8px] tracking-[3px] uppercase" style={{ color: cat.color }}>
                {lang === 'ar' ? cat.ar : cat.en}
              </span>
            </div>
            <div className="font-display text-[18px] tracking-[2px] text-text-primary leading-[1.1] mb-1.5">
              {lang === 'ar' ? item.titleAr : item.titleEn}
            </div>
            <div className="text-[11px] text-muted italic">
              {lang === 'ar' ? item.clientAr : item.clientEn} · {item.year}
            </div>
          </div>
          <div className={`absolute top-4 ${isAR ? 'left-4' : 'right-4'} w-8 h-8 border border-accent/40 flex items-center justify-center text-accent text-sm`}>↗</div>
        </div>
      )}

      {/* محتوى Brand:
          - يظهر دائماً (عنوان + عميل)
          - CTA: مخفي على الكبير إلى أن يصبح hover، ويظهر دائماً على الموبايل */}
      {isBrand && (
        <div className={`absolute inset-0 flex items-center ${isAR ? 'justify-end pr-8 md:pr-16' : 'justify-start pl-8 md:pl-16'}`}>
          <div className="max-w-[480px]">
            {/* Category label */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-accent inline-block" />
              <span className="font-mono text-[8px] tracking-[3px] uppercase text-accent">
                {lang === 'ar' ? cat.ar : cat.en}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display leading-none tracking-[2px] text-text-primary mb-2"
              style={{ fontSize: 'clamp(16px, 2.5vw, 38px)' }}>
              {lang === 'ar' ? item.titleAr : item.titleEn}
            </h3>

            {/* Client & Year */}
            <div className="font-mono text-[9px] tracking-[2px] text-muted uppercase mb-4">
              {lang === 'ar' ? item.clientAr : item.clientEn} · {item.year}
            </div>

            {/* Tags — مخفية على الموبايل */}
            <div className="hidden sm:flex flex-wrap gap-1.5 mb-5">
              {item.tags.map(tag => (
                <span key={tag}
                  className="font-mono text-[7px] tracking-[2px] uppercase border border-accent/30 text-muted px-2.5 py-1">
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA — مخفي على الكبير حتى hover، ويظهر دائماً على الموبايل */}
            <div className="brand-cta flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              <div className="w-8 h-8 border border-accent flex items-center justify-center text-accent text-sm">↗</div>
              <span className="font-mono text-[9px] tracking-[3px] uppercase text-accent">
                {lang === 'ar' ? 'عرض التفاصيل' : 'View Details'}
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
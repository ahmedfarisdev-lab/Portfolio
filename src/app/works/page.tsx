'use client'
import { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { useLang } from '@/hooks/useLang'
import { allWorks, workCounts } from '@/data/works'
import { WorkCard } from '@/components/ui/WorkCard'
import { Lightbox } from '@/components/ui/Lightbox'
import type { WorkItem, WorkCategory } from '@/types'

type Filter = WorkCategory | 'all'

const FILTERS = [
  { key:'all'    as Filter, en:'All',           ar:'الكل' },
  { key:'brand'  as Filter, en:'Brand Identity', ar:'هوية بصرية' },
  { key:'poster' as Filter, en:'Social Posts',   ar:'بوستات' },
]

export default function WorksPage() {
  const { tr, lang, isAR, toggle } = useLang()
  const [filter, setFilter] = useState<Filter>('all')
  const [listView, setListView] = useState(false)
  const [active,  setActive]  = useState<WorkItem | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t) }, [])

  const anim = (i: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(32px)',
    transition: `opacity .9s cubic-bezier(.16,1,.3,1) ${i * 0.12}s, transform .9s cubic-bezier(.16,1,.3,1) ${i * 0.12}s`,
  })

  const filtered = useMemo(() =>
    filter === 'all' ? allWorks : allWorks.filter(w => w.category === filter),
  [filter])

  const handleOpen  = useCallback((item: WorkItem) => setActive(item), [])
  const handleClose = useCallback(() => setActive(null), [])
  const handlePrev  = useCallback(() => setActive(prev => {
    if (!prev) return null
    const i = filtered.findIndex(w => w.id === prev.id)
    return filtered[(i - 1 + filtered.length) % filtered.length]
  }), [filtered])
  const handleNext  = useCallback(() => setActive(prev => {
    if (!prev) return null
    const i = filtered.findIndex(w => w.id === prev.id)
    return filtered[(i + 1) % filtered.length]
  }), [filtered])

  return (
    <>
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-[200] px-14 py-5 flex justify-between items-center"
        style={{ background:'rgba(6,6,6,.97)', backdropFilter:'blur(14px)', borderBottom:'1px solid #1c1c1c' }}>
        <Link href="/" className="flex items-center gap-3.5">
          <div className="w-9 h-9 border border-accent flex items-center justify-center font-display text-[14px] text-accent clip-chamfer-sm">AF</div>
          <span className="font-display text-[18px] tracking-[3px] text-text-primary">
            {tr('Ahmed Faris','أحمد فارس')}
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="font-mono text-[9px] tracking-[2px] uppercase text-muted hover:text-accent transition-colors flex items-center gap-2">
            <span>←</span><span>{tr('Back to CV','العودة للسيرة')}</span>
          </Link>
          <button onClick={toggle}
            className="clip-chamfer-sm border border-muted2 px-4 py-[7px] font-mono text-[9px] tracking-[2px] text-muted uppercase hover:border-accent hover:text-accent transition-all cursor-pointer flex items-center gap-1.5">
            <span>{isAR ? '🇬🇧' : '🇮🇶'}</span>
            <span>{tr('العربية','English')}</span>
          </button>
        </div>
      </nav>

      {/* HERO */}
      <header className="pt-40 pb-20 px-14 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:'radial-gradient(ellipse 60% 50% at 80% 50%,rgba(232,197,71,.04) 0%,transparent 70%)' }} />
        <div className="relative z-10 max-w-[900px]">
          {/* Eyebrow */}
          <div style={anim(0)} className={`flex items-center gap-3 mb-4 font-mono text-[9px] tracking-[5px] uppercase text-accent ${isAR ? 'flex-row-reverse' : ''}`}>
            <span className="w-7 h-px bg-accent inline-block" />
            {tr('Creative Portfolio — Ahmed Faris','معرض الأعمال الإبداعية — أحمد فارس')}
          </div>

          {/* Heading */}
          <h1 className="font-display leading-[.88] tracking-[3px] text-text-primary mb-5 overflow-hidden"
            style={{ fontSize:'clamp(60px,10vw,130px)' }}>
            <span className="block" style={anim(1)}>
              {tr('WORKS','أعمالي')}
            </span>
            <span className="block text-accent" style={anim(2)}>
              {tr('GALLERY','المعرض')}
            </span>
          </h1>

          {/* Description */}
          <p style={anim(3)} className={`text-sm leading-[1.8] text-muted max-w-[520px] ${isAR ? 'border-r-2 border-accent2 pr-4' : 'border-l-2 border-accent2 pl-4'}`}>
            {tr(
              'A curated collection of brand identities, social media posts, logos, and print designs.',
              'مجموعة مختارة من هويات العلامات التجارية والبوستات والشعارات وتصاميم المطبوعات.'
            )}
          </p>

          {/* Stats */}
          <div style={anim(4)} className="flex mt-12 border border-border w-fit clip-chamfer-lg">
            {[
              [`${workCounts.all}+`, tr('Projects','مشروع')],
              ['10+', tr('Years','سنوات')],
              ['3',  tr('Categories','فئات')],
              ['10+',tr('Clients','عميل')],
            ].map(([n,l], i, arr) => (
              <div key={i} className={`px-8 py-4 flex flex-col gap-1 ${i < arr.length-1 ? 'border-r border-border' : ''}`}>
                <span className="font-display text-[38px] leading-none text-accent">{n}</span>
                <span className="font-mono text-[8px] tracking-[2px] text-muted uppercase">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* FILTERS */}
      <div className="sticky top-[60px] z-[400] border-b border-border"
        style={{ background:'rgba(6,6,6,.94)', backdropFilter:'blur(16px)' }}>
        <div className="px-14 flex items-center overflow-x-auto">
          {FILTERS.map(f => {
            const cnt = workCounts[f.key as keyof typeof workCounts] ?? filtered.length
            return (
              <button key={f.key} onClick={() => setFilter(f.key)}
                className={`flex-shrink-0 font-mono text-[9px] tracking-[2px] uppercase px-5 py-4 relative transition-colors cursor-pointer whitespace-nowrap ${filter === f.key ? 'text-accent' : 'text-muted hover:text-text-primary'}`}>
                <span className={`absolute bottom-0 left-0 right-0 h-[2px] bg-accent transition-transform ${filter === f.key ? 'scale-x-100' : 'scale-x-0'}`} />
                {lang === 'ar' ? f.ar : f.en}
                <span className={`inline-flex items-center justify-center w-5 h-4 rounded ml-1.5 font-mono text-[7px] ${filter === f.key ? 'bg-accent/15 text-accent' : 'bg-border text-muted'}`}>
                  {cnt}
                </span>
              </button>
            )
          })}
          <div className="ml-auto flex gap-1 py-3.5 flex-shrink-0">
            {[false,true].map(isListView => (
              <button key={String(isListView)} onClick={() => setListView(isListView)}
                className={`w-8 h-8 border flex items-center justify-center transition-all cursor-pointer ${listView === isListView ? 'border-accent text-accent' : 'border-border text-muted hover:border-accent'}`}>
                {!isListView
                  ? <svg viewBox="0 0 14 14" fill="currentColor" className="w-3.5 h-3.5"><rect x="0" y="0" width="6" height="6"/><rect x="8" y="0" width="6" height="6"/><rect x="0" y="8" width="6" height="6"/><rect x="8" y="8" width="6" height="6"/></svg>
                  : <svg viewBox="0 0 14 14" fill="currentColor" className="w-3.5 h-3.5"><rect x="0" y="0" width="14" height="2"/><rect x="0" y="6" width="14" height="2"/><rect x="0" y="12" width="14" height="2"/></svg>
                }
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* GALLERY */}
      <main className="px-14 pt-14 pb-24 min-h-[60vh]">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <div className="text-[48px] opacity-30">🔍</div>
            <div className="font-display text-[28px] tracking-[3px] text-muted">
              {tr('No works in this category','لا توجد أعمال في هذه الفئة')}
            </div>
          </div>
        ) : (
          <div className={`gallery-grid${listView ? ' list-view' : ''}`}>
            {filtered.map((item, i) => (
              <WorkCard key={item.id} item={item} index={i} onClick={handleOpen} delay={(i % 20) * 0.05} />
            ))}
          </div>
        )}
      </main>

      {/* CTA */}
      <div className="mx-14 mb-20 border border-dashed border-muted2 p-10 flex items-center justify-between gap-6 hover:border-accent hover:border-solid transition-all clip-chamfer-lg">
        <div>
          <div className="font-display text-[28px] tracking-[3px] text-text-primary mb-1.5">
            {tr('Have a project in mind?','هل لديك مشروع في ذهنك؟')}
          </div>
          <div className="text-[12px] text-muted">
            {tr("Let's collaborate and create something remarkable together.",'لنتعاون ونصنع شيئاً استثنائياً معاً.')}
          </div>
        </div>
        <Link href="/#contact"
          className="flex-shrink-0 clip-chamfer-sm bg-accent text-bg font-mono text-[9px] tracking-[2px] uppercase px-7 py-3.5 font-bold hover:bg-accent2 transition-colors">
          {tr('Get in Touch','تواصل معي')}
        </Link>
      </div>

      <footer className="border-t border-border px-14 py-7 flex justify-between items-center gap-4">
        <div className="font-display text-[16px] tracking-[4px] text-accent">AHMED FARIS</div>
        <div className="font-mono text-[8px] tracking-[2px] text-muted uppercase">
          {tr('Works Gallery · Lead Graphic Designer · Iraq','معرض الأعمال · مصمم جرافيك رئيسي · العراق')}
        </div>
      </footer>

      <Lightbox item={active} onClose={handleClose} onPrev={handlePrev} onNext={handleNext} />
    </>
  )
}

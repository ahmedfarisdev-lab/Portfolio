'use client'
import { useEffect, useRef } from 'react'
import { useLang } from '@/hooks/useLang'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { skills, softwareList } from '@/data/skills'

export function AboutSection() {
  const { tr, isAR, lang } = useLang()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.querySelectorAll<HTMLElement>('.skill-bar-fill').forEach((bar, i) => {
          setTimeout(() => bar.classList.add('animated'), i * 110)
        })
      }
    }, { threshold: 0.25 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="py-16 md:py-28 px-4 md:px-14" id="about">
      <SectionHeader num="01" title={tr('Skills & Tools', 'المهارات والأدوات')} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

        <div ref={ref} className="reveal">
          <h3 className="font-display text-[20px] tracking-[3px] text-muted mb-8 uppercase">
            {tr('Core Competencies', 'الكفاءات الأساسية')}
          </h3>
          <div className="flex flex-col gap-5">
            {skills.map(s => (
              <div key={s.nameEn}>
                <div className="flex justify-between mb-2">
                  <span className="font-mono text-[10px] tracking-[2px] uppercase text-text-primary">
                    {lang === 'ar' ? s.nameAr : s.nameEn}
                  </span>
                  <span className="font-display text-[17px] text-accent">{s.percent}</span>
                </div>
                <div className="h-[2px] bg-border overflow-hidden">
                  <div className="skill-bar-fill h-full"
                    style={{ background: 'linear-gradient(to right,var(--accent),var(--accent2))', width: `${s.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal">
          <h3 className="font-display text-[20px] tracking-[3px] text-muted mb-8 uppercase">
            {tr('Software', 'البرامج')}
          </h3>
          <div className="grid grid-cols-3 gap-3 mb-9">
            {softwareList.map((sw, i) => (
              <div key={i} className="clip-chamfer-sm bg-card border border-border p-4 text-center hover:border-accent hover:-translate-y-1 transition-all duration-300">
                <div className="text-[26px] mb-2">{sw.icon}</div>
                <div className="font-mono text-[8px] tracking-[1px] uppercase text-muted">
                  {lang === 'ar' ? sw.nameAr : sw.nameEn}
                </div>
              </div>
            ))}
          </div>
          <div className={`p-5 bg-card border border-border ${isAR ? 'border-r-[3px] border-r-accent' : 'border-l-[3px] border-l-accent'}`}>
            <p className="text-[13px] text-muted leading-[1.8]">
              {tr(
                "Bachelor's Degree in Information Technology — Software Department",
                'بكالوريوس في تكنولوجيا المعلومات — قسم البرمجيات'
              )}<br />
              <span className="font-mono text-[10px]">{tr('University of Nineveh', 'جامعة نينوى')}</span>
            </p>
            <div className="flex gap-5 mt-3">
              {([
                [tr('Arabic', 'العربية'), tr('Native', 'اللغة الأم')],
                [tr('English', 'الإنجليزية'), tr('Good', 'جيد')],
              ] as [string, string][]).map(([lang, level]) => (
                <div key={lang}>
                  <div className="font-mono text-[8px] tracking-[2px] text-muted uppercase">{lang}</div>
                  <div className="text-[12px] text-text-primary mt-0.5">{level}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

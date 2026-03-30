'use client'
import { useLang } from '@/hooks/useLang'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { experience } from '@/data/experience'

export function ExperienceSection() {
  const { tr, lang } = useLang()
  return (
    <section className="py-16 md:py-28 px-4 md:px-14 bg-bg2" id="experience">
      <SectionHeader num="02" title={tr('Experience', 'الخبرات المهنية')} />
      <div className="timeline">
        {experience.map((item, i) => (
          <div key={i} className="relative mb-14 reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="timeline-dot" />
            <div className="font-mono text-[9px] tracking-[2px] text-accent mb-1.5 uppercase">
              {lang === 'ar' ? item.dateAr : item.dateEn}
            </div>
            <div className="font-display text-[22px] md:text-[26px] tracking-[2px] text-text-primary mb-1">
              {lang === 'ar' ? item.roleAr : item.roleEn}
            </div>
            <div className="text-[12px] text-accent2 italic mb-4">
              {lang === 'ar' ? item.companyAr : item.companyEn}
            </div>
            <ul className="flex flex-col gap-2">
              {(lang === 'ar' ? item.pointsAr : item.pointsEn).map((p, j) => (
                <li key={j} className="relative text-[13px] text-muted leading-[1.65] pl-4">
                  <span className="absolute left-0 top-0 text-accent text-[9px]">—</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

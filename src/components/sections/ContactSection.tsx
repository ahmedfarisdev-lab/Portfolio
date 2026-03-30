'use client'
import { useLang } from '@/hooks/useLang'
import { SectionHeader } from '@/components/ui/SectionHeader'

export function ContactSection() {
  const { tr, isAR } = useLang()

  const rows = [
    { icon: '📞', labelEn: 'Phone', labelAr: 'الهاتف', value: '+964 772 111 3098', href: 'tel:+9647721113098' },
    { icon: '✉️', labelEn: 'Email', labelAr: 'البريد الإلكتروني', value: 'ahmedfaris.dev@gmail.com', href: 'mailto:ahmedfaris.dev@gmail.com' },
    { icon: '📍', labelEn: 'Location', labelAr: 'الموقع', value: tr('Iraq', 'العراق'), href: undefined },
  ]

  return (
    <section className="py-16 md:py-28 px-4 md:px-14 bg-bg2" id="contact">
      <SectionHeader num="05" title={tr('Contact', 'تواصل معي')} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <div className="reveal">
          <h3 className="font-display leading-none tracking-[2px] mb-6" style={{ fontSize: 'clamp(34px,5vw,68px)' }}>
            {isAR ? (<>لنصنع معاً<br /><span className="text-accent">شيئاً</span><br />استثنائياً.</>) : (<>Let&apos;s Create<br /><span className="text-accent">Something</span><br />Remarkable.</>)}
          </h3>
          <p className="text-[13px] text-muted leading-[1.85] max-w-[370px]">
            {tr(
              "Whether you need a complete brand identity, a marketing campaign, or expert design consultation — let's talk.",
              'سواء كنت بحاجة إلى هوية بصرية متكاملة أو حملة تسويقية أو استشارة — فلنتحدث.'
            )}
          </p>
        </div>
        <div className="flex flex-col gap-5 reveal">
          {rows.map(row => (
            <div key={row.labelEn}
              className={`flex items-center gap-4 p-4 bg-card border border-border hover:border-accent transition-colors clip-chamfer ${isAR ? 'flex-row-reverse' : ''}`}>
              <div className="w-10 h-10 flex items-center justify-center text-[15px] flex-shrink-0"
                style={{ background: 'rgba(232,197,71,.09)' }}>
                {row.icon}
              </div>
              <div className={`min-w-0 ${isAR ? 'text-right' : ''}`}>
                <div className="font-mono text-[8px] tracking-[2px] text-muted uppercase mb-0.5">
                  {tr(row.labelEn, row.labelAr)}
                </div>
                <div className="text-[13px] text-text-primary truncate">
                  {row.href
                    ? <a href={row.href} className="hover:text-accent transition-colors">{row.value}</a>
                    : row.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'
import { useLang } from '@/hooks/useLang'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { clientLogos, clientLogos2 } from '@/data/skills'  // ← أضف clientLogos2

export function ClientsSection() {
  const { tr, lang } = useLang()

  // كل شريط له بياناته الخاصة مكررة 3 مرات
  const row1 = [...clientLogos, ...clientLogos, ...clientLogos]
  const row2 = [...clientLogos2, ...clientLogos2, ...clientLogos2]

  return (
    <section className="py-28 overflow-hidden relative" id="clients">
      <div className="absolute top-0 bottom-0 left-0 w-40 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right,var(--bg),transparent)' }} />
      <div className="absolute top-0 bottom-0 right-0 w-40 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left,var(--bg),transparent)' }} />

      <div className="px-4 md:px-14 mb-14">
        <SectionHeader num="04" title={tr('Clients & Partners', 'العملاء والشركاء')} />
        <p className="font-mono text-[10px] tracking-[3px] uppercase text-muted text-center -mt-8">
          {tr(
            "Brands and organizations I've had the privilege to work with",
            'علامات تجارية ومؤسسات أُتيح لي شرف العمل معها'
          )}
        </p>
      </div>

      {/* Row 1 — شعارات المجموعة الأولى */}
      <div className="overflow-hidden mb-0.5">
        <div className="marquee-track marquee-left">
          {row1.map((c, i) => (
            <LogoCard key={i} logo={c} lang={lang} />
          ))}
        </div>
      </div>

      {/* Row 2 — شعارات المجموعة الثانية */}
      <div className="overflow-hidden">
        <div className="marquee-track marquee-right">
          {row2.map((c, i) => (
            <LogoCard key={i} logo={c} lang={lang} />
          ))}
        </div>
      </div>

    </section>
  )
}

function LogoCard({ logo, lang }: { logo: { nameEn: string; nameAr: string; color: string; logo?: string }; lang: string }) {
  return (
    <div
      className="flex-shrink-0 w-[200px] border-t border-b border-border hover:border-accent hover:bg-accent/5 transition-all group"
      style={{ margin: '0 1px' }}
    >
      <div className="h-20 flex items-center justify-center px-4 opacity-40 group-hover:opacity-100 transition-all duration-300">
        {logo.logo ? (
          <img
            src={logo.logo}
            alt={logo.nameEn}
            className="max-h-10 max-w-[140px] w-auto object-contain"
          />
        ) : (
          <span
            className="font-display text-[18px] tracking-[2px] text-center"
            style={{ color: logo.color }}
          >
            {lang === 'ar' ? logo.nameAr : logo.nameEn}
          </span>
        )}
      </div>
    </div>
  )
}
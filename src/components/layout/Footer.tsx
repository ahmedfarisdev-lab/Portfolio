'use client'
import { useLang } from '@/hooks/useLang'

export function Footer() {
  const { tr } = useLang()
  return (
    <footer className="border-t border-border px-14 py-7 flex justify-between items-center gap-4">
      <div className="font-display text-[16px] tracking-[4px] text-accent">AHMED FARIS</div>
      <div className="font-mono text-[8px] tracking-[2px] text-muted uppercase">
        {tr('© 2026 Ahmed Faris · Lead Graphic Designer · Iraq', '© 2026 أحمد فارس · مصمم جرافيك رئيسي · العراق')}
      </div>
    </footer>
  )
}

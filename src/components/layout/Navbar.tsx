'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useLang } from '@/hooks/useLang'

export function Navbar({ showWorksLink = false }: { showWorksLink?: boolean }) {
  const { tr, toggle, isAR } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { en: 'About', ar: 'عن أحمد', href: '/#about' },
    { en: 'Experience', ar: 'الخبرات', href: '/#experience' },
    { en: 'Portfolio', ar: 'أعمالي', href: '/#portfolio' },
    { en: 'Clients', ar: 'العملاء', href: '/#clients' },
    { en: 'Contact', ar: 'تواصل', href: '/#contact' },
  ]

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[200] px-4 md:px-14 py-5 flex justify-between items-center"
        style={{ background: 'rgba(6,6,6,.97)', backdropFilter: 'blur(14px)', borderBottom: '1px solid #1c1c1c' }}
      >
        <Link href="/" className="font-display text-[22px] tracking-[4px] text-accent no-underline">AF</Link>
        <div className="flex items-center gap-4 md:gap-6">
          {/* Desktop Links */}
          <div className="hidden md:flex gap-7">
            {links.map(l => (
              <Link key={l.en} href={l.href}
                className="font-mono text-[10px] tracking-[2px] uppercase text-muted hover:text-text-primary transition-colors relative group">
                {tr(l.en, l.ar)}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            {showWorksLink && (
              <Link href="/works" className="font-mono text-[10px] tracking-[2px] uppercase text-accent">
                {tr('Gallery', 'المعرض')}
              </Link>
            )}
          </div>

          {/* Language Toggle */}
          <button onClick={toggle}
            className="clip-chamfer-sm border border-accent px-3 md:px-5 py-2 font-mono text-[10px] tracking-[2px] text-accent uppercase hover:bg-accent hover:text-bg transition-all cursor-pointer flex items-center gap-2">
            <span>{isAR ? '🇬🇧' : '🇮🇶'}</span>
            <span className="hidden sm:inline">{tr('العربية', 'English')}</span>
          </button>

          {/* Hamburger Button — Mobile only */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-px bg-accent transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block w-6 h-px bg-accent transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-accent transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[190] flex flex-col justify-center items-center gap-8 md:hidden transition-all duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'rgba(6,6,6,.98)', backdropFilter: 'blur(20px)' }}
      >
        {links.map(l => (
          <Link key={l.en} href={l.href}
            onClick={() => setMenuOpen(false)}
            className="font-display text-[32px] tracking-[4px] uppercase text-muted hover:text-accent transition-colors">
            {tr(l.en, l.ar)}
          </Link>
        ))}
        {showWorksLink && (
          <Link href="/works" onClick={() => setMenuOpen(false)}
            className="font-display text-[32px] tracking-[4px] uppercase text-accent">
            {tr('Gallery', 'المعرض')}
          </Link>
        )}
      </div>
    </>
  )
}

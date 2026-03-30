'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useLang } from '@/hooks/useLang'

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()

      let v = 0
      const step = () => {
        v += Math.ceil(target / 40)
        if (v >= target) {
          setVal(target)
          return
        }
        setVal(v)
        requestAnimationFrame(step)
      }

      requestAnimationFrame(step)
    })

    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return (
    <div ref={ref}>
      {val}
      {suffix}
    </div>
  )
}

function FloatBadge({
  n,
  label,
  posClass,
  delay,
}: {
  n: string
  label: string
  posClass: string
  delay: string
}) {
  return (
    <div
      className={`absolute ${posClass} bg-card/80 border border-border/60 px-4 py-3 backdrop-blur-sm z-20`}
      style={{
        animation: 'heroFloat 4s ease-in-out infinite',
        animationDelay: delay,
        clipPath:
          'polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))',
      }}
    >
      <span className="font-display text-[28px] text-accent block leading-none">{n}</span>
      <span className="font-mono text-[8px] tracking-[2px] uppercase text-muted">{label}</span>
    </div>
  )
}

function TypedText({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0)
  const [txt, setTxt] = useState('')
  const [del, setDel] = useState(false)
  const [pause, setPause] = useState(false)

  useEffect(() => {
    if (pause) {
      const t = setTimeout(() => setPause(false), 1400)
      return () => clearTimeout(t)
    }

    const current = words[idx]
    const t = setTimeout(() => {
      if (!del) {
        const next = current.slice(0, txt.length + 1)
        setTxt(next)
        if (next === current) {
          setPause(true)
          setDel(true)
        }
      } else {
        const next = txt.slice(0, txt.length - 1)
        setTxt(next)
        if (next === '') {
          setDel(false)
          setIdx((i) => (i + 1) % words.length)
        }
      }
    }, del ? 45 : 90)

    return () => clearTimeout(t)
  }, [txt, del, idx, pause, words])

  return (
    <span className="text-accent">
      {txt}
      <span
        className="inline-block w-[2px] h-[0.85em] bg-accent ml-0.5 align-middle"
        style={{ animation: 'blink .7s step-end infinite' }}
      />
    </span>
  )
}

export function HeroSection() {
  const { tr, isAR, lang } = useLang()
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 14

      section.querySelectorAll<HTMLElement>('.hero-circle').forEach((c, i) => {
        const d = (i + 1) * 0.35
        c.style.marginLeft = `${-[260, 400, 540][i] / 2 + x * d}px`
        c.style.marginTop = `${-[260, 400, 540][i] / 2 + y * d}px`
      })
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const stagger = (i: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity .85s cubic-bezier(.16,1,.3,1) ${i * 0.11}s, transform .85s cubic-bezier(.16,1,.3,1) ${i * 0.11}s`,
  })

  const typedEn = [
    'Visual Identity',
    'Brand Design',
    'Creative Direction',
    'Logo Design',
    'Print Design',
  ]

  const typedAr = [
    'هوية بصرية',
    'تصميم علامة تجارية',
    'إخراج إبداعي',
    'تصميم شعارات',
    'مطبوعات',
  ]

  return (
    <section
      ref={sectionRef}
      className="min-h-screen grid relative overflow-hidden grid-cols-1 md:grid-cols-2"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(232,197,71,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(232,197,71,.03) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
          animation: 'gridMove 20s linear infinite',
        }}
      />

      {/* Glow spots */}
      <div
        className="absolute top-1/3 left-1/4 w-[480px] h-[480px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle,rgba(232,197,71,.055) 0%,transparent 70%)',
          animation: 'glowPulse 5s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/3 w-[380px] h-[380px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle,rgba(255,107,53,.04) 0%,transparent 70%)',
          animation: 'glowPulse 5s ease-in-out 2.5s infinite',
        }}
      />

      {/* ══ LEFT ══ */}
      <div
        className={`relative z-10 flex flex-col justify-center pt-[110px] md:pt-[130px] px-6 md:px-14 pb-16 md:pb-20 ${isAR ? 'items-center text-center' : ''
          }`}
      >
        {/* Eyebrow */}
        <div
          style={stagger(0)}
          className={`flex items-center gap-3 mb-7 ${isAR ? 'flex-row-reverse' : ''}`}
        >
          <div>
            <span className="block w-10 h-px bg-accent" />
            <span className="block w-7 h-px bg-accent mt-1 opacity-40" />
          </div>
          <span className="font-mono text-[10px] tracking-[4px] uppercase text-accent">
            {tr('Lead Graphic Designer · Iraq · 10+ Years', 'مصمم جرافيك رئيسي · العراق · +١٠ سنوات')}
          </span>
        </div>

        {/* Name */}
        <div style={stagger(1)} className="mb-5 overflow-hidden">
          <h1
            className={`font-display leading-[.85] tracking-[2px] text-text-primary ${isAR ? 'font-bold' : ''}`}
            style={{ fontSize: 'clamp(62px,9vw,122px)' }}
          >
            <span
              className="block"
              style={{
                animation: mounted
                  ? 'slideUp .9s cubic-bezier(.16,1,.3,1) .1s both'
                  : 'none',
              }}
            >
              {tr('Ahmed', 'أحمد')}
            </span>
            <span
              className="block text-accent"
              style={{
                animation: mounted
                  ? 'slideUp .9s cubic-bezier(.16,1,.3,1) .22s both'
                  : 'none',
                textShadow: '0 0 60px rgba(232,197,71,.25)',
              }}
            >
              {tr('Faris', 'فارس')}
            </span>
          </h1>
        </div>

        {/* Typed */}
        <div
          style={{ ...stagger(2), fontSize: 'clamp(14px,1.9vw,23px)' }}
          className="font-display tracking-[5px] text-muted mb-9 uppercase"
        >
          <TypedText words={lang === 'ar' ? typedAr : typedEn} />
        </div>

        {/* Description */}
        <p
          style={stagger(3)}
          className={`text-[13px] leading-[1.9] text-[#80786f] max-w-[420px] mb-10 ${isAR ? 'border-t-2 border-accent pt-4' : 'border-l-2 border-accent pl-5'
            }`}
        >
          {tr(
            '10+ years crafting powerful visual identities and brand experiences across healthcare, technology, and commercial sectors. Creative director. Mentor. Storyteller through design.',
            'أكثر من 10 سنوات في تصميم هويات بصرية قوية وتجارب علامات تجارية مؤثرة في الرعاية الصحية والتكنولوجيا والتجارة. مدير إبداعي. مدرّب.'
          )}
        </p>

        {/* Stats */}
        <div style={stagger(4)} className="flex gap-10 mb-11 flex-wrap">
          {([
            [10, '+', tr('Years Experience', 'سنوات خبرة')],
            [500, '+', tr('Students Graduated', 'طالب تخرّج')],
            [3, '', tr('Major Brands', 'علامات كبرى')],
          ] as [number, string, string][]).map(([n, s, l]) => (
            <div key={l} className="relative group cursor-default">
              <div
                className="font-display leading-none text-accent"
                style={{
                  fontSize: 'clamp(42px,5vw,58px)',
                  textShadow: '0 0 30px rgba(232,197,71,.25)',
                }}
              >
                <Counter target={n} suffix={s} />
              </div>
              <div className="font-mono text-[8px] tracking-[2px] text-muted uppercase mt-1.5">
                {l}
              </div>
              <div className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={stagger(5)} className="flex gap-5 items-center flex-wrap">
          <Link
            href="/works"
            className="relative overflow-hidden clip-chamfer font-mono text-[10px] tracking-[2px] uppercase px-8 py-4 font-bold group"
            style={{ background: 'var(--accent)', color: 'var(--bg)' }}
          >
            <span className="relative z-10 transition-colors duration-300">
              {tr('View Work', 'استعرض أعمالي')}
            </span>
            <span
              className="absolute inset-0 -translate-y-full group-hover:translate-y-0 transition-transform duration-300"
              style={{ background: 'var(--accent2)' }}
            />
          </Link>

          <Link
            href="#contact"
            className="flex items-center gap-2 font-mono text-[10px] tracking-[2px] uppercase text-muted hover:text-text-primary transition-colors group"
          >
            <span className="w-0 h-px bg-accent transition-all duration-400 group-hover:w-5" />
            {tr('Get in Touch', 'تواصل معي')}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div style={stagger(6)} className="mt-14 flex items-center gap-3">
          <div className="w-5 h-8 border border-muted/30 rounded-full flex justify-center pt-1.5">
            <div
              className="w-0.5 h-2 bg-accent rounded-full"
              style={{ animation: 'scrollDot 1.8s ease-in-out infinite' }}
            />
          </div>
          <span className="font-mono text-[8px] tracking-[3px] uppercase text-muted/50">
            {tr('Scroll', 'مرر للاسفل')}
          </span>
        </div>
      </div>

      {/* ══ RIGHT ══ (Hidden on mobile only) */}
      <div className="relative overflow-hidden bg-bg2 hidden md:block">
        {/* Profile image */}
        <img
          src="/profile.jpeg"
          alt="Ahmed Faris"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{
            opacity: mounted ? 1 : 0,
            transition: 'opacity 1.4s ease .4s',
            transform: 'scale(1.02)',
            filter: 'contrast(1.05)',
          }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right,var(--bg) 0%,rgba(6,6,6,.35) 35%,transparent 60%),linear-gradient(to top,var(--bg) 0%,transparent 32%)',
          }}
        />

        {/* Animated circles with parallax */}
        {[260, 400, 540].map((size, i) => (
          <div
            key={i}
            className="hero-circle absolute rounded-full pointer-events-none"
            style={{
              width: size,
              height: size,
              top: '50%',
              left: '50%',
              marginTop: -size / 2,
              marginLeft: -size / 2,
              border: `1px solid rgba(232,197,71,${i === 0 ? '.18' : i === 1 ? '.11' : '.06'
                })`,
              animation: `spin ${['22s', '38s', '55s'][i]} linear infinite ${i === 1 ? 'reverse' : ''
                }`,
              transition: 'margin .08s linear',
            }}
          />
        ))}

        {/* AF watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center font-display select-none pointer-events-none"
          style={{
            fontSize: '170px',
            color: 'rgba(232,197,71,.04)',
            letterSpacing: '-8px',
            animation: 'glowPulse 7s ease-in-out infinite',
          }}
        >
          AF
        </div>

        {/* Side line */}
        <div
          className="absolute top-0 bottom-0 left-0 w-[2px] pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom,transparent 0%,var(--accent) 40%,var(--accent) 60%,transparent 100%)',
            animation: 'linePulse 3s ease-in-out infinite',
          }}
        />

        {/* Float badges */}
        <FloatBadge
          n="10+"
          label={tr('Years in Industry', 'سنوات في المجال')}
          posClass="right-10 top-[24%]"
          delay="0s"
        />
        <FloatBadge
          n="500+"
          label={tr('Students Trained', 'طالب مُدرَّب')}
          posClass="right-24 top-[60%]"
          delay="2s"
        />

        {/* Dot grid decoration */}
        <div
          className="absolute bottom-14 left-8 pointer-events-none"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '6px' }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full"
              style={{
                background: 'rgba(232,197,71,.2)',
                animation: `dotPulse 2.5s ease-in-out ${i * 0.08}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Global keyframes */}
      <style jsx global>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes heroFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes glowPulse {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes linePulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.9;
          }
        }
        @keyframes scrollDot {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(10px);
            opacity: 0;
          }
        }
        @keyframes dotPulse {
          0%,
          100% {
            opacity: 0.15;
          }
          50% {
            opacity: 0.55;
          }
        }
        @keyframes gridMove {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 48px 48px;
          }
        }
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(105%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
}
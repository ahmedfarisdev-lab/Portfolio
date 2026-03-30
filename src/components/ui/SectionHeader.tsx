interface Props { num: string; title: string; className?: string }

export function SectionHeader({ num, title, className = '' }: Props) {
  return (
    <div className={`flex items-center gap-5 mb-16 reveal ${className}`}>
      <span className="font-mono text-[10px] tracking-[2px] text-accent">{num}</span>
      <h2 className="font-display text-[clamp(34px,5vw,62px)] tracking-[4px] text-text-primary leading-none">
        {title}
      </h2>
      <div className="flex-1 h-px bg-border" />
    </div>
  )
}

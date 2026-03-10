export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: { flags: 'text-base', text: 'text-lg' },
    md: { flags: 'text-xl', text: 'text-2xl' },
    lg: { flags: 'text-2xl', text: 'text-3xl' },
  }

  return (
    <div className="flex items-center gap-2 select-none">
      <span className={sizes[size].flags}>🇹🇳</span>
      <span className={sizes[size].flags}>🇮🇹</span>
      <span
        className={`${sizes[size].text} font-black tracking-tight`}
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Studi<span style={{ color: '#00BCD4' }}>Amo</span>
      </span>
    </div>
  )
}

import { cn } from '@/utils/cn'

interface LogoProps {
  variant?: 'principal' | 'complementar' | 'symbol'
  color?:   'dark' | 'light'
  className?: string
}

export default function Logo({ variant = 'complementar', color = 'dark', className }: LogoProps) {
  if (variant === 'symbol') {
    return (
      <span
        aria-label="mod.o"
        className={cn('font-display font-bold leading-none select-none', className)}
      >
        <span className={cn('block', color === 'light' ? 'text-white' : 'text-primary')}>mo</span>
        <span className={cn('block', color === 'light' ? 'text-white/50' : 'text-support/40')}>d.o</span>
      </span>
    )
  }

  return (
    <div className={cn('flex flex-col', className)}>
      {/* "mod" em vermelho da identidade, ".o" em preto com opacity — Brand Guideline: O de maior peso */}
      <span
        aria-label="mod.o Fashion Studio"
        className="font-display font-semibold tracking-tight leading-none select-none"
      >
        <span className="text-primary">mod</span>
        <span className={color === 'light' ? 'text-white/60' : 'text-primary'}>.o</span>
      </span>
      {variant === 'complementar' && (
        <span
          className={cn(
            'tracking-editorial font-body font-medium mt-0.5',
            color === 'light' ? 'text-white/60' : 'text-support/50'
          )}
        >
          FASHION STUDIO
        </span>
      )}
    </div>
  )
}

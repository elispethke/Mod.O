import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

interface SelectOption {
  value: string
  label: string
}

interface FloatingSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label:   string
  options: SelectOption[]
  error?:  string
}

const FloatingSelect = forwardRef<HTMLSelectElement, FloatingSelectProps>(
  ({ label, options, error, className, ...props }, ref) => {
    return (
      <div className={cn('group relative flex flex-col justify-center gap-2.5 px-7 py-6 sm:px-9 sm:py-7', className)}>
        <label className="tracking-editorial text-support/60 transition-colors duration-slow group-focus-within:text-primary select-none">
          {label}
        </label>

        <div className="relative flex items-center">
          <select
            ref={ref}
            {...props}
            className={cn(
              'peer w-full bg-transparent appearance-none border-none outline-none ring-0 p-0 pr-8 cursor-pointer',
              'font-body text-[0.95rem] text-support',
              '[&>option]:bg-base [&>option]:text-support',
            )}
          >
            <option value="" disabled hidden />
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Seta customizada */}
          <div className="absolute right-0 pointer-events-none transition-transform duration-base peer-focus:rotate-180" aria-hidden="true">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-support/60 group-focus-within:text-primary transition-colors duration-base" />
            </svg>
          </div>
        </div>

        {/* Glow de foco — nasce do vidro */}
        <span
          className="pointer-events-none absolute inset-0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-slow ease-out bg-gradient-to-b from-primary/[0.06] via-transparent to-transparent"
          aria-hidden="true"
        />

        {error && (
          <p role="alert" className="relative font-body text-[0.65rem] text-primary tracking-wide">
            {error}
          </p>
        )}
      </div>
    )
  }
)

FloatingSelect.displayName = 'FloatingSelect'
export default FloatingSelect

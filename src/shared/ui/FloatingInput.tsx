import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label:     string
  error?:    string
  optional?: boolean
}

const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, error, optional, className, ...props }, ref) => {
    return (
      <div className={cn('group relative flex flex-col justify-center gap-2.5 px-7 py-6 sm:px-9 sm:py-7', className)}>
        <label className="tracking-editorial text-support/40 transition-colors duration-500 group-focus-within:text-primary select-none">
          {label}
          {optional && (
            <span className="ml-1.5 opacity-60 normal-case tracking-normal text-[0.6rem]">opcional</span>
          )}
        </label>

        <input
          ref={ref}
          placeholder=" "
          {...props}
          className={cn(
            'w-full bg-transparent border-none outline-none ring-0 p-0',
            'font-body text-[0.95rem] text-support',
            'placeholder:text-support/25',
            'disabled:opacity-40 disabled:cursor-not-allowed',
          )}
        />

        {/* Glow de foco — nasce do vidro */}
        <span
          className="pointer-events-none absolute inset-0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 ease-out bg-gradient-to-b from-primary/[0.06] via-transparent to-transparent"
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

FloatingInput.displayName = 'FloatingInput'
export default FloatingInput

import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface SwitchProps {
  checked:      boolean
  onChange:     (checked: boolean) => void
  disabled?:    boolean
  label:        string
  id?:          string
}

export default function Switch({ checked, onChange, disabled, label, id }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative shrink-0 w-12 h-7 rounded-full transition-colors duration-500 ease-out',
        'focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2',
        disabled ? 'bg-support/15 cursor-not-allowed' : checked ? 'bg-primary cursor-pointer' : 'bg-support/20 cursor-pointer',
      )}
    >
      <motion.span
        className={cn(
          'absolute top-1 left-1 w-5 h-5 rounded-full shadow-md',
          disabled ? 'bg-white/80' : 'bg-white',
        )}
        animate={{ x: checked ? 20 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />
    </button>
  )
}

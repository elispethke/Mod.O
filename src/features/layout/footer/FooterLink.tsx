import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface FooterLinkProps {
  href?:      string
  onClick?:   () => void
  target?:    string
  rel?:       string
  'aria-label'?: string
  children:   ReactNode
  className?: string
}

/** Link autoral do rodapé — contraste total via cor sólida, hierarquia por peso/traço, nunca por opacidade. */
export default function FooterLink({ href, onClick, target, rel, children, className, ...rest }: FooterLinkProps) {
  const classes = cn(
    'group relative inline-flex items-center gap-2 w-fit',
    'font-body text-[0.95rem] font-medium text-white',
    'transition-[color,transform] duration-300 ease-out',
    'hover:text-base hover:translate-x-1',
    className,
  )

  const underline = (
    <span
      className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-400 ease-out group-hover:scale-x-100"
      aria-hidden="true"
    />
  )

  if (href) {
    return (
      <a href={href} target={target} rel={rel} onClick={onClick} className={classes} {...rest}>
        {children}
        {underline}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={classes} {...rest}>
      {children}
      {underline}
    </button>
  )
}

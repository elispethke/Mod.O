import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/utils/cn'

interface ImageRevealProps {
  src:       string
  alt:       string
  className?: string
  delay?:    number
  direction?: 'left' | 'right' | 'up'
}

export default function ImageReveal({ src, alt, className, delay = 0, direction = 'up' }: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })

  const clipStart = {
    left:  'inset(0 100% 0 0)',
    right: 'inset(0 0 0 100%)',
    up:    'inset(100% 0 0 0)',
  }[direction]

  return (
    <motion.div
      ref={ref}
      className={cn('overflow-hidden', className)}
      initial={{ clipPath: clipStart }}
      animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: clipStart }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
        initial={{ scale: 1.08 }}
        animate={isInView ? { scale: 1 } : { scale: 1.08 }}
        transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  )
}

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/utils/cn'

interface AnimatedTextProps {
  children:   string
  className?: string
  style?:     React.CSSProperties
  id?:        string
  delay?:     number
  as?:        'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  splitBy?:   'lines' | 'words'
}

export default function AnimatedText({
  children,
  className,
  style,
  id,
  delay = 0,
  as: Tag = 'p',
  splitBy = 'lines',
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  const items = splitBy === 'lines'
    ? children.split('\n')
    : children.split(' ')

  return (
    <Tag ref={ref as React.RefObject<HTMLElement & HTMLHeadingElement>} id={id} className={cn('overflow-hidden', className)} style={style}>
      {items.map((item, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: '105%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : { y: '105%', opacity: 0 }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {item}
            {splitBy === 'words' && i < items.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

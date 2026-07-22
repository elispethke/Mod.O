import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { EASE } from '@/config/motion'

export default function BrandBreak() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })

  return (
    <section
      ref={ref}
      className="relative bg-base overflow-hidden py-24 lg:py-40"
      aria-hidden="true"
    >
      <div className="container-brand flex items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: EASE }}
          className="font-display font-bold text-primary leading-none whitespace-nowrap select-none text-[clamp(3.5rem,16vw,13rem)] tracking-[-0.02em]"
        >
          mod.o
        </motion.span>
      </div>
    </section>
  )
}

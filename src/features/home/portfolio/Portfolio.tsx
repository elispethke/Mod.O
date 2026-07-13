import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { t } from '@/lib/i18n'
import AnimatedText from '@/shared/components/AnimatedText'
import GalleryGroup from './GalleryGroup'
import { GALLERIES } from './galleries'

export default function Portfolio() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })

  return (
    <section
      id="portfolio"
      ref={ref}
      className="relative bg-base overflow-hidden py-28 lg:py-40"
      aria-labelledby="portfolio-heading"
    >
      <div className="container-brand">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 lg:mb-20">
          <div className="flex flex-col gap-6">
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="rule-brand" aria-hidden="true" />
              <span className="tracking-editorial text-primary font-body">{t.portfolio.eyebrow}</span>
            </motion.div>

            <AnimatedText
              id="portfolio-heading"
              as="h2"
              delay={0.1}
              className="font-display font-bold text-primary"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5.5rem)', lineHeight: 1.0, letterSpacing: '-0.025em' } as React.CSSProperties}
            >
              {t.portfolio.headline}
            </AnimatedText>
          </div>
        </div>

        {/* Galerias premium — Alta Costura, Vestidos de Festa, Moda Casual */}
        <div className="flex flex-col gap-28 lg:gap-40">
          {GALLERIES.map((gallery) => (
            <GalleryGroup key={gallery.id} gallery={gallery} />
          ))}
        </div>

      </div>
    </section>
  )
}

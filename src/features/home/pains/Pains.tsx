import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { t } from '@/lib/i18n'
import AnimatedText from '@/shared/components/AnimatedText'
import { EASE } from '@/config/motion'

function ListItem({ text, index }: { text: string; index: number }) {
  return (
    <motion.li
      className="flex items-start gap-3"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: EASE }}
    >
      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
      <span className="font-body text-support/70 leading-relaxed text-sm">{text}</span>
    </motion.li>
  )
}

export default function Pains() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })

  return (
    <section
      id="diagnostico"
      ref={ref}
      className="relative bg-accent/20 overflow-hidden py-28 lg:py-40"
      aria-labelledby="pains-heading"
    >
      <div className="container-brand">

        <div className="flex flex-col gap-6 mb-16 lg:mb-20 max-w-3xl">
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="rule-brand" aria-hidden="true" />
            <span className="tracking-editorial text-primary font-body">{t.pains.eyebrow}</span>
          </motion.div>

          <AnimatedText
            id="pains-heading"
            as="h2"
            delay={0.1}
            className="font-display font-bold text-support text-[clamp(2rem,4.2vw,4rem)] leading-none tracking-[-0.02em]"
          >
            {t.pains.headline}
          </AnimatedText>

          <motion.p
            className="font-body text-support/60 leading-relaxed text-[clamp(0.9375rem,1.1vw,1.0625rem)]"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
          >
            {t.pains.intro}
          </motion.p>
        </div>

        {/* Desafios */}
        <div className="flex flex-col gap-6 mb-14 lg:mb-16">
          <motion.p
            className="font-body font-semibold text-support leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {t.pains.challengesLabel}
          </motion.p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4">
            {t.pains.challenges.map((challenge, i) => (
              <ListItem key={challenge} text={challenge} index={i} />
            ))}
          </ul>
        </div>

        {/* Transição */}
        <motion.p
          className="font-body font-semibold text-primary leading-relaxed mb-14 lg:mb-16 max-w-2xl text-[clamp(1.0625rem,1.3vw,1.25rem)]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -60px 0px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {t.pains.transition}
        </motion.p>

        {/* O que entregamos */}
        <div className="flex flex-col gap-6">
          <motion.h3
            className="font-display font-bold text-support text-[clamp(1.5rem,2.4vw,2rem)] leading-tight tracking-[-0.01em]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {t.pains.deliverablesLabel}
          </motion.h3>
          <motion.p
            className="font-body text-support/60 leading-relaxed text-sm max-w-2xl"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            {t.pains.deliverablesIntro}
          </motion.p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4">
            {t.pains.deliverables.map((item, i) => (
              <ListItem key={item} text={item} index={i} />
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}

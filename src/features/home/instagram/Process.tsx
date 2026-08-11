import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { t } from '@/lib/i18n'
import AnimatedText from '@/shared/components/AnimatedText'
import ImageReveal from '@/shared/components/ImageReveal'
import processo01 from '@/assets/process/processo-01.webp'
import { EASE } from '@/config/motion'

function ProcessStep({ step, index }: { step: typeof t.process.steps[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
    >
      <span className="tracking-editorial text-primary font-body">{step.index}</span>
      <h3 className="font-display font-bold text-support leading-snug text-[clamp(1.05rem,1.4vw,1.25rem)]">
        {step.title}
      </h3>
      <p className="font-body text-support/60 text-sm leading-relaxed">
        {step.description}
      </p>
    </motion.div>
  )
}

export default function Process() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })

  return (
    <section
      id="processo"
      ref={ref}
      className="relative bg-base overflow-hidden py-28 lg:py-40"
      aria-labelledby="processo-heading"
    >
      <div className="container-brand">

        <div className="flex flex-col items-center text-center gap-6 mb-16 lg:mb-24">
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: -12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="rule-brand" aria-hidden="true" />
            <span className="tracking-editorial text-primary font-body">{t.nav.processo}</span>
            <span className="rule-brand" aria-hidden="true" />
          </motion.div>

          <AnimatedText
            id="processo-heading"
            as="h2"
            delay={0.1}
            className="font-display font-bold text-primary text-[clamp(2rem,4.5vw,4rem)] leading-none tracking-[-0.02em] whitespace-pre-line"
          >
            {"Pesquisa. Referências.\nProcesso criativo."}
          </AnimatedText>

          <motion.p
            className="font-body text-support/60 max-w-2xl leading-relaxed text-[clamp(0.9375rem,1.1vw,1.0625rem)]"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          >
            {t.process.intro}
          </motion.p>
        </div>

        <motion.div
          className="mx-auto w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl 2xl:max-w-4xl mb-16 lg:mb-24"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        >
          <ImageReveal
            src={processo01}
            alt="Processo criativo — mod.o Fashion Studio"
            className="w-full aspect-[4/5] rounded-2xl shadow-xl"
            delay={0.35}
            direction="up"
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-10">
          {t.process.steps.map((step, i) => (
            <ProcessStep key={step.index} step={step} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}

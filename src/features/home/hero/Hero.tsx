import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { t } from '@/lib/i18n'
import AnimatedText from '@/shared/components/AnimatedText'
import ImageReveal from '@/shared/components/ImageReveal'
import editorial01 from '@/assets/editorial/editorial-01.webp'
import { EASE } from '@/config/motion'

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const bgY     = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-base pt-20"
      aria-label="Hero"
    >
      {/* Ghost watermark */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="font-display font-bold text-[28vw] leading-none text-ghost text-support whitespace-nowrap">
          mod.o
        </span>
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 w-full container-brand">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-6 items-center min-h-[calc(100vh-5rem)] py-24 lg:py-28">

          {/* Coluna principal */}
          <div className="lg:col-span-6 flex flex-col gap-8">

            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            >
              <span className="rule-brand" aria-hidden="true" />
              <span className="tracking-editorial text-primary font-body">{t.hero.eyebrow}</span>
            </motion.div>

            <AnimatedText
              as="h1"
              splitBy="lines"
              delay={0.2}
              className="font-display font-bold text-primary text-[clamp(2.75rem,6.5vw,6.5rem)] leading-none tracking-[-0.025em]"
            >
              {t.hero.headline}
            </AnimatedText>

            <motion.p
              className="font-body text-support/60 max-w-md leading-relaxed text-[clamp(1rem,1.1vw,1.125rem)]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
            >
              {t.hero.body}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: EASE }}
            >
              <a
                href="#sobre"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#sobre')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="group inline-flex items-center gap-4 font-body text-xs font-semibold tracking-[0.14em] uppercase text-support transition-all duration-base hover:text-primary"
              >
                {t.hero.cta}
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-support/20 transition-all duration-base group-hover:border-primary group-hover:bg-primary group-hover:text-white" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-base group-hover:translate-y-0.5">
                    <path d="M7 1v12M1 7l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </motion.div>
          </div>

          {/* Coluna visual */}
          <div className="lg:col-span-6 h-full">
            <ImageReveal
              src={editorial01}
              alt="Desfile editorial — mod.o Fashion Studio"
              className="w-full h-full min-h-[70vh] lg:min-h-[88vh]"
              delay={0.4}
              direction="up"
            />
          </div>

        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          aria-hidden="true"
        >
          <div className="relative w-px h-14 bg-support/15 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-primary"
              animate={{ height: ['0%', '100%', '0%'], top: ['0%', '0%', '100%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <span className="tracking-editorial text-support/35 font-body text-[0.6rem]">scroll</span>
        </motion.div>

      </motion.div>
    </section>
  )
}

import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { t } from '@/lib/i18n'
import AnimatedText from '@/shared/components/AnimatedText'
import { EASE } from '@/config/motion'

const GRAIN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

function ServiceCard({ item, index }: { item: typeof t.services.items[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springCfg = { stiffness: 260, damping: 24, mass: 0.6 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springCfg)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springCfg)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    mouseX.set(px - 0.5)
    mouseY.set(py - 0.5)
    e.currentTarget.style.setProperty('--x', `${px * 100}%`)
    e.currentTarget.style.setProperty('--y', `${py * 100}%`)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className="[perspective:1400px]"
      initial={{ opacity: 0, y: 56, scale: 0.94 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.9, delay: index * 0.12, ease: EASE }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ y: -10, scale: 1.015 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="
          group relative isolate flex flex-col gap-6 h-full min-h-[22rem]
          p-8 lg:p-10 overflow-hidden
          bg-gradient-to-b from-white via-base to-base
          border border-support/[0.08]
          shadow-lg
          transition-[box-shadow,border-color] duration-slow ease-elegant
          hover:border-primary/25 hover:shadow-red-lg
          cursor-default
        "
      >
        {/* Textura discreta — grain */}
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-multiply pointer-events-none"
          style={{ backgroundImage: GRAIN }}
          aria-hidden="true"
        />

        {/* Halo de luz — surge na hover */}
        <div
          className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-primary/0 blur-[90px] transition-colors duration-slower ease-elegant group-hover:bg-primary/25 pointer-events-none"
          aria-hidden="true"
        />

        {/* Spotlight — segue o cursor */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-slow ease-elegant group-hover:opacity-100 pointer-events-none"
          style={{ background: 'radial-gradient(380px circle at var(--x, 50%) var(--y, 50%), rgba(186,17,16,0.10), transparent 70%)' }}
          aria-hidden="true"
        />

        {/* Filete superior — brilho fino */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-support/[0.14] to-transparent" aria-hidden="true" />
        <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary/0 to-transparent transition-all duration-slow group-hover:from-primary/40" aria-hidden="true" />

        {/* Conteúdo — camada elevada */}
        <div className="relative flex flex-col gap-6 h-full [transform:translateZ(40px)]">
          <div className="w-8 h-px bg-primary/30 transition-all duration-slow group-hover:w-16 group-hover:bg-primary" aria-hidden="true" />

          <h3 className="font-display font-bold text-support leading-snug text-[clamp(1.1rem,1.5vw,1.375rem)]">
            {item.title}
          </h3>

          <p className="font-body text-support/60 leading-relaxed text-sm">
            {item.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })

  return (
    <section
      id="servicos"
      ref={ref}
      className="relative bg-base overflow-hidden py-28 lg:py-40"
      aria-labelledby="services-heading"
    >
      {/* Ambiente de fundo — halos e profundidade */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-24 -right-24 w-[420px] h-[420px] rounded-full bg-primary/[0.06] blur-[130px]" />
        <div className="absolute bottom-0 -left-24 w-[360px] h-[360px] rounded-full bg-accent/30 blur-[120px]" />
      </div>

      <div className="relative container-brand">

        {/* Header da seção */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 lg:mb-20">
          <div className="flex flex-col gap-6">
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="rule-brand" aria-hidden="true" />
              <span className="tracking-editorial text-primary font-body">{t.services.eyebrow}</span>
            </motion.div>

            {/* Título em vermelho — identidade da marca */}
            <AnimatedText
              id="services-heading"
              as="h2"
              delay={0.1}
              className="font-display font-bold text-primary text-[clamp(2.5rem,5vw,5.5rem)] leading-none tracking-[-0.025em]"
            >
              {t.services.headline}
            </AnimatedText>
          </div>

          <motion.p
            className="lg:max-w-xs font-body text-support/60 leading-relaxed text-sm"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Criatividade. Estratégia. Propósito. Inovação. Processo.
          </motion.p>
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {t.services.items.map((item, i) => (
            <ServiceCard key={item.index} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}

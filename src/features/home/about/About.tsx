import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { t } from '@/lib/i18n'
import ImageReveal from '@/shared/components/ImageReveal'
import founders from '@/assets/about/founders.webp'
import { EASE } from '@/config/motion'

const visionPillars = [
  {
    title:       'Criatividade + tecnologia',
    description: 'conectadas à presença internacional',
  },
  {
    title:       'Coleções que marcam o mercado',
    description: 'estético, comercial e estratégico',
  },
  {
    title:       'Referência global',
    description: 'com proximidade e personalização locais',
  },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })

  return (
    <section
      id="sobre"
      ref={ref}
      className="relative bg-accent/20 overflow-hidden py-20 lg:py-32"
      aria-labelledby="about-heading"
    >
      <div className="container-brand">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-0">

          {/* Coluna esquerda — layout editorial da página 8 do Brand Guideline */}
          <div className="lg:col-span-7 flex flex-col">

            {/* Headline — parte 1 */}
            <motion.h2
              id="about-heading"
              className="font-display font-medium text-support leading-[1.08] text-[clamp(1.75rem,3.6vw,3.75rem)] tracking-[-0.02em]"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            >
              O Studio <strong className="font-bold text-primary">mod.o</strong>
            </motion.h2>

            {/* Foto das fundadoras — embutida no fluxo do texto, exatamente como na página 8 */}
            <motion.div
              className="my-6 lg:my-8 w-full"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            >
              <ImageReveal
                src={founders}
                alt="As fundadoras da mod.o Fashion Studio"
                className="w-full aspect-[16/9] lg:aspect-[3/2] rounded-2xl shadow-xl"
                delay={0.3}
                direction="up"
              />
            </motion.div>

            {/* Headline — parte 2: continua abaixo da foto */}
            <motion.p
              className="font-display font-medium text-support leading-[1.08] text-[clamp(1.75rem,3.6vw,3.75rem)] tracking-[-0.02em]"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            >
              nasceu da parceria entre duas amigas apaixonadas por moda e por processo. Com Bruna baseada na Alemanha e Cris na Itália, atuamos entre Europa e Brasil apoiando marcas de moda no desenvolvimento criativo e estratégico de coleções.
            </motion.p>

            {/* Texto complementar oficial */}
            <motion.div
              className="flex flex-col gap-4 mt-8 max-w-xl"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.65, ease: EASE }}
            >
              {t.about.body.split('\n\n').map((paragraph, i) => (
                <p key={i} className="font-body text-support/60 leading-relaxed text-[clamp(0.9375rem,1.1vw,1.0625rem)]">
                  {paragraph}
                </p>
              ))}
            </motion.div>

          </div>

          {/* Coluna direita — pillars */}
          <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-8 lg:pt-20 mt-12 lg:mt-0">
            {visionPillars.map((pillar, i) => (
              <motion.div
                key={i}
                className="flex flex-col gap-0.5"
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: EASE }}
              >
                {pillar.title ? (
                  <>
                    <span className="font-body font-semibold text-primary text-sm leading-snug">
                      {pillar.title}
                    </span>
                    <span className="font-body text-support/60 text-sm italic leading-relaxed">
                      {pillar.description}
                    </span>
                  </>
                ) : (
                  <span className="font-body text-support/60 text-sm leading-relaxed italic">
                    {pillar.description}
                  </span>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

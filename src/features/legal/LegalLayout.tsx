import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { EASE } from '@/config/motion'

export interface LegalSection {
  slug:        string
  title:       string
  paragraphs:  string[]
  list?:       string[]
}

interface LegalLayoutProps {
  eyebrow:   string
  title:     string
  updatedAt: string
  intro:     string
  sections:  LegalSection[]
}

export default function LegalLayout({ eyebrow, title, updatedAt, intro, sections }: LegalLayoutProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })

  const handleTocClick = (slug: string) => {
    document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section ref={ref} className="relative bg-base pt-36 pb-28 lg:pt-44 lg:pb-36 overflow-hidden">
      <span className="absolute -top-[8vw] -right-[4vw] font-display font-bold text-[22vw] leading-none text-ghost text-support whitespace-nowrap select-none pointer-events-none" aria-hidden="true">
        mod.o
      </span>

      <div className="relative z-10 container-brand">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Link
            to={ROUTES.home}
            className="inline-flex items-center gap-3 font-body text-xs font-semibold tracking-[0.14em] uppercase text-support/70 transition-colors duration-base hover:text-primary mb-16"
          >
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="rotate-180" aria-hidden="true">
              <path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Voltar para o início
          </Link>
        </motion.div>

        <div className="max-w-3xl mb-20 lg:mb-28">
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="rule-brand" aria-hidden="true" />
            <span className="tracking-editorial text-primary font-body">{eyebrow}</span>
          </motion.div>

          <h1
            className="font-display font-bold text-primary leading-[0.95] mb-8 text-[clamp(2.5rem,6vw,5.5rem)] tracking-[-0.03em]"
          >
            {title}
          </h1>

          <p className="font-body text-support/60 text-xs tracking-[0.08em] uppercase mb-6">
            Última atualização em {updatedAt}
          </p>

          <p className="font-body text-support/65 text-base lg:text-lg leading-relaxed max-w-2xl">
            {intro}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-14 lg:gap-x-12">

          {/* TOC */}
          <nav aria-label="Sumário" className="lg:col-span-3 lg:sticky lg:top-32 lg:self-start">
            <span className="tracking-editorial text-support/60 font-body block mb-5">Sumário</span>
            <ol className="flex flex-col gap-1">
              {sections.map((s, i) => (
                <li key={s.slug}>
                  <button
                    type="button"
                    onClick={() => handleTocClick(s.slug)}
                    className="group flex items-baseline gap-3 py-2 text-left"
                  >
                    <span className="font-body text-[0.7rem] text-primary/85 tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-body text-sm text-support/70 group-hover:text-primary transition-colors duration-base">
                      {s.title}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>

          {/* Conteúdo */}
          <div className="lg:col-span-9 flex flex-col divide-y divide-support/[0.08]">
            {sections.map((s, i) => (
              <motion.article
                key={s.slug}
                id={s.slug}
                className="py-10 lg:py-12 first:pt-0 scroll-mt-32"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -80px 0px' }}
                transition={{ duration: 0.7, delay: Math.min(i * 0.04, 0.2), ease: EASE }}
              >
                <h2 className="font-display font-bold text-support text-2xl lg:text-3xl leading-snug mb-6">
                  <span className="text-primary mr-3">{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </h2>

                <div className="flex flex-col gap-4">
                  {s.paragraphs.map((p, pi) => (
                    <p key={pi} className="font-body text-support/65 text-[0.95rem] leading-relaxed max-w-3xl">
                      {p}
                    </p>
                  ))}
                </div>

                {s.list && (
                  <ul className="mt-5 flex flex-col gap-3">
                    {s.list.map((item, li) => (
                      <li key={li} className="flex items-start gap-3 font-body text-support/65 text-[0.95rem] leading-relaxed max-w-3xl">
                        <span className="mt-2.5 w-2.5 h-px bg-primary shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

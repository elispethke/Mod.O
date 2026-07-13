import { useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/cn'
import { t } from '@/lib/i18n'
import { SITE } from '@/constants/site'
import editorial01 from '@/assets/editorial/editorial-01.webp'
import FloatingInput    from '@/shared/ui/FloatingInput'
import FloatingTextarea from '@/shared/ui/FloatingTextarea'
import FloatingSelect   from '@/shared/ui/FloatingSelect'
import { useContactForm, SERVICE_OPTIONS } from './useContactForm'
import { EASE } from '@/config/motion'

const stagger = (i: number) => ({
  initial:    { opacity: 0, y: 16, filter: 'blur(6px)' },
  animate:    { opacity: 1, y: 0,  filter: 'blur(0px)' },
  transition: { duration: 0.7, delay: 0.15 + i * 0.07, ease: EASE },
})

const INFO_ITEMS = [
  { label: 'Atendimento', value: 'Segunda a sexta · 09h às 18h' },
  { label: 'Resposta',    value: 'Até 48 horas úteis' },
  { label: 'Localização', value: 'Brasil & Europa' },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: '0px 0px -120px 0px' })

  const { form, onSubmit, submitted, serverError } = useContactForm()
  const { register, watch, formState: { errors, isSubmitting } } = form

  const serviceValue = watch('service')

  return (
    <section
      id="contato"
      ref={sectionRef}
      className="relative bg-base overflow-hidden py-28 lg:py-0 lg:min-h-[100svh]"
      aria-labelledby="contact-heading"
    >

      {/* ── Cenário editorial de fundo ─────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.img
          src={editorial01}
          alt=""
          initial={{ opacity: 0, scale: 1.15 }}
          animate={isInView ? { opacity: 1, scale: 1.1 } : {}}
          transition={{ duration: 2.2, ease: EASE }}
          className="absolute inset-0 w-full h-full object-cover object-[70%_20%] blur-[60px] saturate-[1.08]"
        />

        {/* Gradiente de legibilidade — a esquerda sólida, a direita revela o cenário */}
        <div className="absolute inset-0 bg-gradient-to-r from-base from-[38%] via-base/75 via-[62%] to-base/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-base/40" />
        <div className="absolute inset-0 bg-primary/[0.05] mix-blend-multiply" />

        {/* Watermark tipográfico da marca */}
        <span className="absolute -bottom-[6vw] left-0 font-display font-bold text-[24vw] leading-none text-ghost text-support whitespace-nowrap select-none">
          mod.o
        </span>

        {/* Régua editorial + tagline vertical — borda direita */}
        <div className="hidden lg:block absolute top-0 bottom-0 right-14 w-px bg-support/[0.08]" />
        <span
          className="hidden lg:block absolute bottom-14 right-8 tracking-editorial text-support/30 font-body whitespace-nowrap [writing-mode:vertical-rl]"
        >
          {SITE.tagline}
        </span>
      </div>

      <div className="relative z-10 container-brand py-24 lg:py-0 lg:min-h-[100svh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-20 gap-x-10 w-full items-center">

          {/* ── Coluna editorial ──────────────────────────────────── */}
          <div className="lg:col-span-5 flex flex-col">
            <motion.div
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="rule-brand" aria-hidden="true" />
              <span className="tracking-editorial text-primary font-body">{t.contact.eyebrow}</span>
            </motion.div>

            <h2
              id="contact-heading"
              className="font-display font-bold text-primary leading-[0.92] text-[clamp(2.75rem,7.2vw,8rem)] tracking-[-0.03em]"
            >
              {t.contact.headline.split('\n').map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: '110%' }}
                    animate={isInView ? { y: '0%' } : {}}
                    transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease: EASE }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h2>

            <motion.div
              className="mt-10 h-px bg-support/[0.1] origin-left"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.45, ease: EASE }}
            />

            <motion.p
              className="font-body text-support/60 leading-relaxed mt-10 max-w-sm text-[clamp(0.9375rem,1.1vw,1.0625rem)]"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            >
              {t.contact.body}
            </motion.p>

            {/* Informações institucionais */}
            <motion.div
              className="grid grid-cols-3 gap-x-6 gap-y-8 lg:flex lg:flex-col lg:gap-7 lg:divide-y lg:divide-support/[0.08] mt-14"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {INFO_ITEMS.map((item, i) => (
                <div key={item.label} className={cn('flex flex-col gap-1.5', i > 0 && 'lg:pt-7')}>
                  <span className="tracking-editorial text-primary/85 font-body">{item.label}</span>
                  <span className="font-body text-support/65 text-sm leading-relaxed">{item.value}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-x-8 gap-y-2 mt-10"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.75 }}
            >
              <a href={`mailto:${SITE.email}`}
                className="font-body text-sm text-support/60 hover:text-primary transition-colors duration-base">
                {SITE.email}
              </a>
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="font-body text-sm text-support/60 hover:text-primary transition-colors duration-base">
                WhatsApp
              </a>
            </motion.div>
          </div>

          {/* ── Painel de vidro flutuante ─────────────────────────── */}
          <div className="lg:col-span-7 lg:col-start-6 relative">

            {/* Halo de luz atrás do vidro */}
            <div className="absolute -inset-x-8 -inset-y-10 pointer-events-none" aria-hidden="true">
              <div className="absolute -top-10 -right-10 w-[380px] h-[380px] rounded-full bg-primary/25 blur-[110px]" />
              <div className="absolute -bottom-12 left-4 w-[300px] h-[300px] rounded-full bg-accent/50 blur-[100px]" />
            </div>

            <motion.div
              className="relative isolate rounded-md border border-white/40 bg-white/60 backdrop-blur-2xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: 28, scale: 0.985 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
              whileHover={{ y: -3 }}
            >
              {/* Reflexo de vidro — sheen diagonal */}
              <div className="absolute -top-1/2 -left-1/4 w-[160%] h-full bg-gradient-to-br from-white/25 via-white/0 to-transparent rotate-[-9deg] pointer-events-none" aria-hidden="true" />
              {/* Bordas com leve brilho */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" aria-hidden="true" />
              <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-white/50 via-white/10 to-transparent" aria-hidden="true" />

              <div className="relative p-3 sm:p-4 lg:p-6">

                {/* Cabeçalho do painel */}
                <div className="flex items-center justify-between px-4 pt-4 pb-6 sm:px-5">
                  <span className="tracking-editorial text-support font-body">
                    Preencha o formulário
                  </span>
                  <span className="font-display text-primary text-lg leading-none select-none" aria-hidden="true">+</span>
                </div>


                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      className="flex flex-col items-start justify-center gap-8 px-4 py-20 sm:px-5"
                      initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                    >
                      <motion.div
                        className="w-14 h-14 rounded-full border border-primary/30 flex items-center justify-center"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
                      >
                        <svg width="18" height="13" viewBox="0 0 18 13" fill="none">
                          <motion.path
                            d="M1 6.5l5 5L17 1"
                            className="stroke-primary"
                            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                          />
                        </svg>
                      </motion.div>

                      <div className="flex flex-col gap-3">
                        <p className="font-display font-bold text-primary text-[clamp(1.75rem,4vw,3rem)] leading-[1.1]">
                          Mensagem recebida.
                        </p>
                        <p className="font-body text-support/60 text-sm leading-relaxed max-w-xs">
                          Entraremos em contato em breve. Obrigada pelo interesse na mod.o.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={onSubmit}
                      noValidate
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <div className="rounded-[3px] overflow-hidden border border-support/[0.08] divide-y divide-support/[0.08]">

                        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y divide-support/[0.08] sm:divide-y-0 sm:divide-x">
                          <motion.div {...stagger(0)} animate={isInView ? stagger(0).animate : stagger(0).initial}>
                            <FloatingInput
                              label={t.contact.fields.name}
                              type="text"
                              autoComplete="name"
                              error={errors.name?.message}
                              {...register('name')}
                            />
                          </motion.div>
                          <motion.div {...stagger(1)} animate={isInView ? stagger(1).animate : stagger(1).initial}>
                            <FloatingInput
                              label={t.contact.fields.email}
                              type="email"
                              autoComplete="email"
                              error={errors.email?.message}
                              {...register('email')}
                            />
                          </motion.div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y divide-support/[0.08] sm:divide-y-0 sm:divide-x">
                          <motion.div {...stagger(2)} animate={isInView ? stagger(2).animate : stagger(2).initial}>
                            <FloatingInput
                              label={t.contact.fields.phone}
                              type="tel"
                              autoComplete="tel"
                              error={errors.phone?.message}
                              {...register('phone')}
                            />
                          </motion.div>
                          <motion.div {...stagger(3)} animate={isInView ? stagger(3).animate : stagger(3).initial}>
                            <FloatingInput
                              label={t.contact.fields.company}
                              optional
                              type="text"
                              autoComplete="organization"
                              error={errors.company?.message}
                              {...register('company')}
                            />
                          </motion.div>
                        </div>

                        <motion.div {...stagger(4)} animate={isInView ? stagger(4).animate : stagger(4).initial}>
                          <FloatingSelect
                            label={t.contact.fields.service}
                            options={SERVICE_OPTIONS}
                            value={serviceValue}
                            error={errors.service?.message}
                            {...register('service')}
                          />
                        </motion.div>

                        <motion.div {...stagger(5)} animate={isInView ? stagger(5).animate : stagger(5).initial}>
                          <FloatingTextarea
                            label={t.contact.fields.message}
                            error={errors.message?.message}
                            {...register('message')}
                          />
                        </motion.div>
                      </div>

                      <AnimatePresence>
                        {serverError && (
                          <motion.p
                            role="alert"
                            className="font-body text-xs text-primary tracking-wide mt-4 px-1"
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                          >
                            {serverError}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      <motion.div
                        className="mt-6"
                        {...stagger(6)} animate={isInView ? stagger(6).animate : stagger(6).initial}
                      >
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.008 }}
                          whileTap={{ scale: 0.99 }}
                          className={cn(
                            'group relative w-full overflow-hidden',
                            'py-5 px-8',
                            'font-body text-xs font-semibold tracking-[0.22em] uppercase',
                            'bg-primary text-white rounded-[3px]',
                            'transition-[background-color,box-shadow] duration-slow ease-out',
                            'hover:bg-support hover:shadow-red-lg',
                            'disabled:opacity-40 disabled:cursor-not-allowed',
                            'focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2',
                          )}
                        >
                          <span
                            className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-slower group-hover:translate-x-[100%]"
                            aria-hidden="true"
                          />
                          <span className="relative flex items-center justify-center gap-3">
                            {isSubmitting ? (
                              <>
                                <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25" />
                                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                Enviando
                              </>
                            ) : (
                              <>
                                {t.contact.submit}
                                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="transition-transform duration-base group-hover:translate-x-1" aria-hidden="true">
                                  <path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </>
                            )}
                          </span>
                        </motion.button>
                      </motion.div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  )
}

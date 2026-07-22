import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { t } from '@/lib/i18n'
import { SITE } from '@/constants/site'
import AnimatedText from '@/shared/components/AnimatedText'
import { EASE } from '@/config/motion'
import { INSTAGRAM_POSTS } from './posts'

function ProcessTitle({ post, index }: { post: typeof INSTAGRAM_POSTS[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: (index % 4) * 0.08, ease: EASE }}
    >
      <a
        href={SITE.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={post.alt}
        className="group relative block aspect-[4/5] overflow-hidden bg-support/5 cursor-pointer"
      >
        <img
          src={post.src}
          alt={post.alt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-slower ease-elegant group-hover:scale-[1.05]"
        />
        <div
          className="absolute inset-0 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)] opacity-0 transition-opacity duration-slow ease-elegant group-hover:opacity-100"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-support/0 transition-colors duration-slow ease-elegant group-hover:bg-support/[0.04]"
          aria-hidden="true"
        />
        <span className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-white/90 text-support opacity-0 -translate-y-1 transition-all duration-slow ease-elegant group-hover:opacity-100 group-hover:translate-y-0" aria-hidden="true">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
          </svg>
        </span>
      </a>
    </motion.div>
  )
}

export default function Instagram() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })

  return (
    <section
      id="instagram"
      ref={ref}
      className="relative bg-base overflow-hidden py-28 lg:py-40"
      aria-labelledby="instagram-heading"
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
            id="instagram-heading"
            as="h2"
            delay={0.1}
            className="font-display font-bold text-primary text-[clamp(2rem,4.5vw,4rem)] leading-none tracking-[-0.02em] whitespace-pre-line"
          >
            {"Pesquisa. Referências.\nProcesso criativo."}
          </AnimatedText>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-3">
          {INSTAGRAM_POSTS.map((post, i) => (
            <ProcessTitle key={post.src} post={post} index={i} />
          ))}
        </div>

        <motion.div
          className="flex justify-center mt-16 lg:mt-20"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
        >
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-7 py-3.5 border border-support/20 rounded-sm font-body text-xs font-semibold tracking-[0.14em] uppercase text-support transition-all duration-base ease-reveal hover:border-primary hover:bg-primary hover:text-white"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
            </svg>
            Ver mais no Instagram
          </a>
        </motion.div>

      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { EASE } from '@/config/motion'

export default function BrandCards() {
  return (
    <section className="relative bg-base overflow-hidden mb-24 lg:mb-32">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">

        <motion.div
          className="relative bg-primary flex items-center overflow-hidden px-[6vw] sm:px-[5vw] lg:px-[3.5vw] min-h-[62vh] lg:min-h-[92vh]"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          transition={{ duration: 0.9, ease: EASE }}
          aria-hidden="true"
        >
          <span className="font-display font-bold text-white leading-none whitespace-nowrap select-none text-[clamp(3rem,18.5vw,42rem)] tracking-[-0.02em]">
            mod.o
          </span>
          <div className="absolute bottom-[6%] right-[5%] pointer-events-none" aria-hidden="true">
            <span className="font-display font-bold text-white/[0.08] text-[13vw] lg:text-[8vw] leading-none">o</span>
          </div>
        </motion.div>

        <motion.div
          className="bg-base border-t lg:border-t-0 lg:border-l border-support/[0.07] flex flex-col justify-center px-8 sm:px-12 lg:px-14 py-16 lg:py-0 min-h-[40vh] lg:min-h-[92vh]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
        >
          <div className="flex flex-col gap-6 max-w-sm">
            <p className="font-body text-support/60 leading-[1.15] text-[clamp(1.5rem,2.6vw,2.75rem)]">
              Duas amigas.<br />Dois países.<br />Um estúdio e uma <em>visão</em>.
            </p>
          </div>
        </motion.div>

      </div>
      </div>
    </section>
  )
}

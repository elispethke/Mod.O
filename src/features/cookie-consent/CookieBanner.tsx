import { AnimatePresence, motion } from 'framer-motion'
import { t } from '@/lib/i18n'
import { useCookieConsent } from './useCookieConsent'
import { EASE } from '@/config/motion'

export default function CookieBanner() {
  const { isBannerVisible, acceptAll, rejectOptional, openPreferences } = useCookieConsent()
  const copy = t.cookies.banner

  return (
    <AnimatePresence>
      {isBannerVisible && (
        <motion.div
          role="region"
          aria-label={copy.title}
          className="fixed z-banner left-4 right-4 bottom-4 sm:left-6 sm:right-6 sm:bottom-6 lg:left-8 lg:right-auto lg:bottom-8 lg:max-w-md"
          initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
        >
          <div className="relative isolate overflow-hidden rounded-md border border-white/30 bg-white/70 backdrop-blur-2xl shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" aria-hidden="true" />
            <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-primary/15 blur-[70px] pointer-events-none" aria-hidden="true" />

            <div className="relative p-6 sm:p-7 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <span className="rule-brand" aria-hidden="true" />
                <p className="font-display font-bold text-support text-lg leading-snug">
                  {copy.title}
                </p>
                <p className="font-body text-support/70 text-sm leading-relaxed">
                  {copy.body}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={acceptAll}
                  className="w-full py-3.5 px-6 font-body text-xs font-semibold tracking-[0.18em] uppercase bg-support text-white rounded-[3px] transition-colors duration-medium hover:bg-primary"
                >
                  {copy.acceptAll}
                </button>

                <div className="flex items-center gap-5">
                  <button
                    type="button"
                    onClick={rejectOptional}
                    className="font-body text-xs font-semibold tracking-[0.1em] uppercase text-support transition-colors duration-base hover:text-primary"
                  >
                    {copy.rejectOptional}
                  </button>

                  <span className="w-px h-3 bg-support/20" aria-hidden="true" />

                  <button
                    type="button"
                    onClick={openPreferences}
                    className="relative font-body text-xs font-semibold tracking-[0.1em] uppercase text-support transition-colors duration-base hover:text-primary after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-base hover:after:origin-left hover:after:scale-x-100"
                  >
                    {copy.customize}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

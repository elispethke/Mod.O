import * as Dialog from '@radix-ui/react-dialog'
import { t } from '@/lib/i18n'
import Switch from '@/shared/ui/Switch'
import { useCookieConsent } from './CookieConsentContext'
import type { CookieCategory } from './types'

const CATEGORY_ORDER: CookieCategory[] = ['necessary', 'analytics', 'marketing', 'preferences']

export default function CookiePreferencesModal() {
  const { consent, isPreferencesOpen, closePreferences, updateCategory, acceptAll, savePreferences } = useCookieConsent()
  const copy = t.cookies.preferences

  return (
    <Dialog.Root open={isPreferencesOpen} onOpenChange={(open) => !open && closePreferences()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-dialog-overlay bg-support/40 backdrop-blur-sm data-[state=open]:animate-fade-in" />

        <Dialog.Content
          className="fixed z-dialog-content left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-lg max-h-[85vh] overflow-y-auto rounded-md border border-white/30 bg-white/80 backdrop-blur-2xl shadow-2xl data-[state=open]:animate-scale-in focus:outline-none"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="relative p-7 sm:p-9 flex flex-col gap-7">
            <div className="flex items-start justify-between gap-6">
              <div className="flex flex-col gap-2.5">
                <span className="rule-brand" aria-hidden="true" />
                <Dialog.Title className="font-display font-bold text-support text-2xl leading-tight">
                  {copy.title}
                </Dialog.Title>
                <Dialog.Description className="font-body text-support/65 text-sm leading-relaxed max-w-sm">
                  {copy.body}
                </Dialog.Description>
              </div>

              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label={copy.close}
                  className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-support/15 text-support/60 transition-all duration-base hover:border-primary hover:text-primary hover:rotate-90"
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                    <path d="M1 1l11 11M12 1L1 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </button>
              </Dialog.Close>
            </div>

            <div className="flex flex-col divide-y divide-support/[0.08] border-t border-b border-support/[0.08]">
              {CATEGORY_ORDER.map((category) => {
                const categoryCopy = copy.categories[category]
                const isNecessary  = category === 'necessary'

                return (
                  <div key={category} className="flex items-start justify-between gap-6 py-5">
                    <div className="flex flex-col gap-1">
                      <span className="font-body font-semibold text-support text-sm">
                        {categoryCopy.title}
                      </span>
                      <span className="font-body text-support/60 text-xs leading-relaxed max-w-[32ch]">
                        {categoryCopy.description}
                      </span>
                    </div>
                    <Switch
                      id={`cookie-${category}`}
                      label={categoryCopy.title}
                      checked={consent[category]}
                      disabled={isNecessary}
                      onChange={(value) => updateCategory(category, value)}
                    />
                  </div>
                )
              })}
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3">
              <button
                type="button"
                onClick={savePreferences}
                className="flex-1 py-4 px-6 font-body text-xs font-semibold tracking-[0.18em] uppercase border border-support/20 text-support rounded-[3px] transition-colors duration-medium hover:border-primary hover:text-primary"
              >
                {copy.save}
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="flex-1 py-4 px-6 font-body text-xs font-semibold tracking-[0.18em] uppercase bg-support text-white rounded-[3px] transition-colors duration-medium hover:bg-primary"
              >
                {copy.acceptAll}
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

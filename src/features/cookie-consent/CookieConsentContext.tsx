import { useCallback, useMemo, useState, type ReactNode } from 'react'
import type { CookieCategory, CookieConsent } from './types'
import { readStoredConsent, writeStoredConsent } from './storage'
import { CookieConsentContext, type CookieConsentContextValue } from './context'

const DEFAULT_CONSENT: CookieConsent = {
  necessary:   true,
  analytics:   false,
  marketing:   false,
  preferences: false,
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  // Inicializadores lazy: o localStorage é lido de forma síncrona na primeira renderização,
  // então hasDecided já nasce com o valor real — sem depender de um efeito pós-montagem
  // para corrigi-lo (o que antes deixava o banner "decidido" por um instante mesmo para
  // visitantes que nunca deram consentimento).
  const [consent, setConsent] = useState<CookieConsent>(() => {
    const stored = readStoredConsent()
    return stored
      ? { necessary: true, analytics: stored.analytics, marketing: stored.marketing, preferences: stored.preferences }
      : DEFAULT_CONSENT
  })
  const [hasDecided, setHasDecided]             = useState(() => readStoredConsent() !== null)
  const [isPreferencesOpen, setPreferencesOpen] = useState(false)

  const persist = useCallback((next: CookieConsent) => {
    writeStoredConsent(next)
    setConsent(next)
    setHasDecided(true)
    setPreferencesOpen(false)
  }, [])

  const acceptAll       = useCallback(() => persist({ necessary: true, analytics: true,  marketing: true,  preferences: true }),  [persist])
  const rejectOptional  = useCallback(() => persist({ necessary: true, analytics: false, marketing: false, preferences: false }), [persist])
  const savePreferences = useCallback(() => persist(consent), [persist, consent])

  const updateCategory = useCallback((category: CookieCategory, value: boolean) => {
    if (category === 'necessary') return
    setConsent((prev) => ({ ...prev, [category]: value }))
  }, [])

  const openPreferences  = useCallback(() => setPreferencesOpen(true), [])
  const closePreferences = useCallback(() => setPreferencesOpen(false), [])

  const value = useMemo<CookieConsentContextValue>(() => ({
    consent,
    hasDecided,
    isBannerVisible: !hasDecided && !isPreferencesOpen,
    isPreferencesOpen,
    openPreferences,
    closePreferences,
    acceptAll,
    rejectOptional,
    updateCategory,
    savePreferences,
  }), [consent, hasDecided, isPreferencesOpen, openPreferences, closePreferences, acceptAll, rejectOptional, updateCategory, savePreferences])

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  )
}

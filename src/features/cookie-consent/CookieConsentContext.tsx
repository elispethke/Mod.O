import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { CookieCategory, CookieConsent } from './types'
import { readStoredConsent, writeStoredConsent } from './storage'

const DEFAULT_CONSENT: CookieConsent = {
  necessary:   true,
  analytics:   false,
  marketing:   false,
  preferences: false,
}

interface CookieConsentContextValue {
  consent:           CookieConsent
  hasDecided:        boolean
  isBannerVisible:   boolean
  isPreferencesOpen: boolean
  openPreferences:   () => void
  closePreferences:  () => void
  acceptAll:         () => void
  rejectOptional:    () => void
  updateCategory:    (category: CookieCategory, value: boolean) => void
  savePreferences:   () => void
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null)

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

  const persist = (next: CookieConsent) => {
    writeStoredConsent(next)
    setConsent(next)
    setHasDecided(true)
    setPreferencesOpen(false)
  }

  const acceptAll      = () => persist({ necessary: true, analytics: true,  marketing: true,  preferences: true })
  const rejectOptional = () => persist({ necessary: true, analytics: false, marketing: false, preferences: false })
  const savePreferences = () => persist(consent)

  const updateCategory = (category: CookieCategory, value: boolean) => {
    if (category === 'necessary') return
    setConsent((prev) => ({ ...prev, [category]: value }))
  }

  const value = useMemo<CookieConsentContextValue>(() => ({
    consent,
    hasDecided,
    isBannerVisible: !hasDecided && !isPreferencesOpen,
    isPreferencesOpen,
    openPreferences:  () => setPreferencesOpen(true),
    closePreferences: () => setPreferencesOpen(false),
    acceptAll,
    rejectOptional,
    updateCategory,
    savePreferences,
  }), [consent, hasDecided, isPreferencesOpen])

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  )
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext)
  if (!ctx) throw new Error('useCookieConsent deve ser usado dentro de CookieConsentProvider')
  return ctx
}

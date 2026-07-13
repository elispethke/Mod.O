import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
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
  const [consent, setConsent]                 = useState<CookieConsent>(DEFAULT_CONSENT)
  const [hasDecided, setHasDecided]           = useState(true)
  const [isPreferencesOpen, setPreferencesOpen] = useState(false)

  useEffect(() => {
    const stored = readStoredConsent()
    if (stored) {
      setConsent({
        necessary:   true,
        analytics:   stored.analytics,
        marketing:   stored.marketing,
        preferences: stored.preferences,
      })
      setHasDecided(true)
    } else {
      setHasDecided(false)
    }
  }, [])

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

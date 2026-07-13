import { createContext } from 'react'
import type { CookieCategory, CookieConsent } from './types'

export interface CookieConsentContextValue {
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

export const CookieConsentContext = createContext<CookieConsentContextValue | null>(null)

import { useContext } from 'react'
import { CookieConsentContext } from './context'

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext)
  if (!ctx) throw new Error('useCookieConsent deve ser usado dentro de CookieConsentProvider')
  return ctx
}

export type CookieCategory = 'necessary' | 'analytics' | 'marketing' | 'preferences'

export type CookieConsent = Record<CookieCategory, boolean>

export interface StoredCookieConsent extends CookieConsent {
  decidedAt: string
  version:   number
}

import type { CookieConsent, StoredCookieConsent } from './types'

const STORAGE_KEY     = 'modo:cookie-consent'
const STORAGE_VERSION = 1

export function readStoredConsent(): StoredCookieConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw) as StoredCookieConsent
    if (parsed.version !== STORAGE_VERSION) return null

    return parsed
  } catch {
    return null
  }
}

export function writeStoredConsent(consent: CookieConsent): StoredCookieConsent {
  const payload: StoredCookieConsent = {
    ...consent,
    decidedAt: new Date().toISOString(),
    version:   STORAGE_VERSION,
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  return payload
}

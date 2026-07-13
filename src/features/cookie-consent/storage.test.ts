import { beforeEach, describe, expect, it } from 'vitest'
import { readStoredConsent, writeStoredConsent } from './storage'
import type { CookieConsent } from './types'

const SAMPLE_CONSENT: CookieConsent = {
  necessary:   true,
  analytics:   true,
  marketing:   false,
  preferences: true,
}

describe('cookie-consent storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('retorna null quando nada foi salvo ainda', () => {
    expect(readStoredConsent()).toBeNull()
  })

  it('persiste e lê de volta o mesmo consentimento', () => {
    writeStoredConsent(SAMPLE_CONSENT)
    const stored = readStoredConsent()

    expect(stored).not.toBeNull()
    expect(stored?.necessary).toBe(true)
    expect(stored?.analytics).toBe(true)
    expect(stored?.marketing).toBe(false)
    expect(stored?.preferences).toBe(true)
  })

  it('grava a versão do payload e um timestamp de decisão', () => {
    const written = writeStoredConsent(SAMPLE_CONSENT)

    expect(written.version).toBe(1)
    expect(typeof written.decidedAt).toBe('string')
    expect(() => new Date(written.decidedAt).toISOString()).not.toThrow()
  })

  it('ignora e trata como "não decidido" um payload salvo com versão antiga', () => {
    localStorage.setItem('modo:cookie-consent', JSON.stringify({ ...SAMPLE_CONSENT, version: 0, decidedAt: new Date().toISOString() }))
    expect(readStoredConsent()).toBeNull()
  })

  it('não quebra com JSON corrompido no localStorage', () => {
    localStorage.setItem('modo:cookie-consent', '{not-valid-json')
    expect(readStoredConsent()).toBeNull()
  })
})
